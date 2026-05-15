import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Rate limiting: in-memory v1.
// Caveat: Vercel edge functions are stateless and distributed; this Map does NOT
// persist across instances or survive cold starts. The primary anti-scrape defenses
// are UUID slugs (kill enumeration) + JWT validation (kill access). Rate limiting
// here is defense-in-depth, best-effort. For real distributed rate limiting in
// production, swap this for Vercel KV or @upstash/ratelimit with Redis. v2.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Return a true HTTP 404 (no body, no info leak).
// Indistinguishable from any other 404 at the HTTP layer — same status code,
// no token-specific error messages, no rewrite leaking through a different status.
// All failure modes (missing token, malformed, expired, wrong slug, rate-limited,
// missing secret env var) funnel through this single deny() for status uniformity.
function deny(): NextResponse {
  return new NextResponse(null, { status: 404 });
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || req.ip || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
}

export async function middleware(req: NextRequest) {
  if (isRateLimited(getClientIp(req))) {
    return deny();
  }

  const secret = process.env.PROMPTKIT_TOKEN_SECRET;
  if (!secret) return deny();

  const token = req.nextUrl.searchParams.get("t");
  if (!token) return deny();

  const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  const slug = segments[1];
  if (!slug) return deny();

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    if (payload.slug !== slug) return deny();
  } catch {
    return deny();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/promptkit/:slug*"],
};
