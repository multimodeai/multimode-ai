import * as fs from "fs";
import * as path from "path";
import { SignJWT } from "jose";

const SLUG_PATTERN =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const NINETY_DAYS_SECONDS = 90 * 24 * 60 * 60;
const DEFAULT_BASE_URL = "https://multimodeai.com";

function loadEnvLocal(): void {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main(): Promise<void> {
  loadEnvLocal();

  const slug = process.argv[2];
  if (!slug) {
    console.error(
      "Usage: npx tsx scripts/generate-promptkit-token.ts <uuid-slug>"
    );
    process.exit(1);
  }

  if (!SLUG_PATTERN.test(slug)) {
    console.error(`Slug '${slug}' is not a valid UUID v4 format.`);
    process.exit(1);
  }

  const secret = process.env.PROMPTKIT_TOKEN_SECRET;
  if (!secret) {
    console.error("PROMPTKIT_TOKEN_SECRET is not set in .env.local");
    process.exit(1);
  }

  const token = await new SignJWT({ slug })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${NINETY_DAYS_SECONDS}s`)
    .sign(new TextEncoder().encode(secret));

  const baseUrl = process.env.PROMPTKIT_BASE_URL ?? DEFAULT_BASE_URL;
  console.log(`${baseUrl}/promptkit/${slug}?t=${token}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
