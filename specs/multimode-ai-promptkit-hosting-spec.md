=== PROJECT SPECIFICATION ===
Project: multimode-ai Prompt-Kit Hosting
Date: 2026-05-14
Status: Draft — review before execution
Target location: /Users/hfox/Developments/multimode-ai/specs/promptkit-hosting.md

1. OVERVIEW
Add a `/promptkit/[slug]` dynamic route to the multimode-ai Next.js 14 App Router site that hosts hardened prompt-kit lead magnets. Each prompt-kit page renders a markdown file from `content/promptkits/[slug].md` with a sidebar containing consulting CTA (multimodeai.com/#contact) and Substack newsletter CTA (multimodeai.substack.com). **No cross-prompt-kit navigation sidebar — each page is an isolated island.** Pages must be hard-to-discover AND hard-to-enumerate AND time-limited: noindex metadata, robots.txt block, no sitemap entry, no internal linking, UUID-style slugs (not enumerable), signed-token URL parameter with expiry (token must validate on every request), generic 404 on invalid/expired tokens (no information leak), and edge rate limiting on `/promptkit/*` requests. Threat model: subscribers who get one prompt-kit URL must NOT be able to enumerate or scrape other prompt kits. Subscribers who unsubscribe must lose access after token expiry. First two prompt kits use UUID slugs documented in the implementation notes — content sourced from the corresponding files in mm-cli/drafts/.

2. ACCEPTANCE CRITERIA
1. A dynamic route file exists at `app/promptkit/[slug]/page.tsx` and renders markdown content from `content/promptkits/[slug].md` ONLY when a valid signed token is present in the request
2. The page exports `metadata` with `robots: { index: false, follow: false }` set
3. The route uses `generateStaticParams` returning an empty array — pages are NOT statically generated, they render on demand with token validation (alternatively: server components fetched per-request with token check)
4. A reusable layout component exists at `components/PromptKitLayout.tsx` and is used by the dynamic route
5. The layout component renders ONLY two sidebar sections: a consulting CTA linking to `multimodeai.com/#contact` and a newsletter CTA linking to `https://multimodeai.substack.com`. **There is NO "Other prompt kits" navigation** — cross-prompt-kit enumeration is structurally prevented by omitting the catalog from every page
6. Prompt-kit markdown files use UUID-style slugs as filenames, not the previously-proposed structured slugs. Two files exist in `content/promptkits/`: one for the six-layer audit kit, one for the brand-in-agent-memory kit. The actual UUIDs are recorded in the implementation notes for use by the newsletter publication step
7. `public/robots.txt` includes a `Disallow: /promptkit/` directive
8. `public/sitemap.xml` does NOT include any URL matching `/promptkit/*`
9. `npm run build` completes successfully without TypeScript errors or warnings
10. No internal page on multimodeai.com (specifically `app/page.tsx` and all files in `components/`) contains a link to any `/promptkit/*` URL or to any prompt-kit slug
11. Markdown rendering correctly handles frontmatter (strips or parses, does not render as page content), code blocks, blockquotes, tables, and inline formatting
12. The Tailwind utility classes used in PromptKitLayout match the visual register of existing components (Hero, Services, HowItWorks, WhyUs, Contact, Footer)
13. **Token validation middleware exists at `middleware.ts`** (or equivalent App Router middleware location). The middleware intercepts all requests to `/promptkit/*`, validates the `?t=` query parameter as a JWT signed with `PROMPTKIT_TOKEN_SECRET` env var, and returns a generic 404 page (not "prompt kit not found" — a normal-looking 404) if the token is missing, malformed, expired, or doesn't match the requested slug
14. **The JWT payload includes:** `slug` (must match the request URL), `iat` (issued at), `exp` (expiry — default 90 days from issuance)
15. **A token-generation utility exists** at `scripts/generate-promptkit-token.ts` (or similar) that produces a signed token for a given slug. Hud runs this script to mint a fresh token each time he publishes a Substack post linking to a prompt kit. The script outputs the full URL ready to paste into the Substack post
16. **Edge rate limiting** is applied to `/promptkit/*` requests using Vercel's rate limiting (or middleware-based equivalent): 10 requests per IP per hour. Above this threshold, return 429 (or quietly 404) without rendering content
17. The 404 response returned by the middleware for invalid/expired tokens is INDISTINGUISHABLE from the 404 returned for a non-existent URL — no information leak (no "token expired" or "invalid token" message; the user just sees a generic 404)
18. After Vercel deployment, the prompt-kit URLs work only when accessed with valid signed tokens. Accessing `multimodeai.com/promptkit/[any-uuid]` WITHOUT a token returns 404. Accessing with an expired or wrong-slug token returns 404

3. CONSTRAINT ARCHITECTURE
Must Do:
- Use the existing Next.js 14 App Router stack as the implementation foundation
- Use Tailwind CSS for styling, matching the spare aesthetic of the existing landing page components
- Use server components (App Router default) for the dynamic route
- Use middleware (`middleware.ts`) for token validation on every `/promptkit/*` request — token check happens BEFORE the page renders so invalid requests never touch the content
- Add `gray-matter` for frontmatter parsing of the prompt-kit markdown files
- Add a JWT library (`jose` is the App Router standard) for token signing and validation
- Use `PROMPTKIT_TOKEN_SECRET` environment variable on Vercel for JWT signing — must be a strong random secret, set in Vercel project env vars
- Use UUID v4 (or similar non-enumerable identifier) for prompt-kit slugs — `crypto.randomUUID()` is fine
- Preserve all existing pages and components unchanged in their visual output and behavior
- Return a generic 404 response (the standard Next.js 404 page or a simple custom one) for invalid tokens, expired tokens, missing tokens, or non-existent slugs — INDISTINGUISHABLE from each other to prevent information leak
- Set token expiry to 90 days by default (adjustable per environment)

Must Not Do:
- **Do not render an "Other prompt kits" navigation list anywhere on the prompt-kit page.** This is the primary enumeration vector and must not exist.
- **Do not use enumerable slugs** like `20260514_847_promptkit_1` or `prompt-kit-1`. Use UUIDs.
- **Do not return any token-specific error messages** to the user. "Token expired" and "token invalid" must both render as generic 404.
- **Do not log or expose the list of valid slugs anywhere publicly accessible** — including sitemap, internal links, error messages, or response headers.
- Do not introduce a different framework (Astro, Remix, Eleventy, etc.) — this is a Next.js 14 build
- Do not add more than one markdown rendering dependency — pick either `react-markdown` or `next-mdx-remote`, not both
- Do not link to any `/promptkit/*` URL from any indexed page on the site
- Do not include `/promptkit/*` URLs in the sitemap
- Do not modify `app/page.tsx` or any existing component visually — they remain unchanged for end users
- Do not commit any prompt-kit content not present in the mm-cli/drafts/ source files
- Do not statically pre-generate prompt-kit pages at build time — they render on-demand with token validation

Prefer:
- Server-side rendering (per-request token validation) over static generation for prompt-kit pages
- A minimal sidebar component (one file) over a multi-component sidebar
- Plain markdown over MDX
- A single `PromptKitLayout.tsx` component that handles both the main content rendering and the sidebar
- Token-based gating + UUIDs + rate limiting as the layered defense

Escalate:
- If the existing site is using a markdown library already, do not add a duplicate
- If Vercel rate limiting requires a paid plan (it does for some features), confirm with Hud before assuming it's available — fall back to a middleware-based rate limiter (in-memory or Redis-backed) if needed
- If Tailwind config needs extension for typography (markdown-rendered prose styling), confirm the extension is minimal and matches the existing config style

4. TASK DECOMPOSITION

**Task 1: (ALREADY DONE) Content directory and prompt-kit source files**
- Status: Pre-completed by Hud on 2026-05-14. The directory `content/promptkits/` already exists with two files using the canonical UUID slugs:
  - `content/promptkits/a8f3b2c1-7d4e-4f9a-b1c2-9d3e8f7a6b5c.md` — Six-Layer Audit prompt kit
  - `content/promptkits/c4e9d7a2-3f8b-4c1a-9e5d-7f2b8a4c6d1e.md` — Brand-in-Agent-Memory prompt kit
- These UUIDs are already referenced in the newsletter drafts at `mm-cli/drafts/six-layer-audit-newsletter.md` and `mm-cli/drafts/brand-in-agent-memory-newsletter.md`. DO NOT rename or regenerate them.
- Verify by listing the directory: `ls content/promptkits/` should show both files.
- Acceptance criteria: AC #6
- Dependencies: None
- Estimated scope: 0 minutes (already done)

**Task 2: Install markdown rendering dependency**
- Input: Choose between `react-markdown` (simpler, no MDX) and `next-mdx-remote` (richer, supports MDX). Run `npm install [chosen]` and `npm install gray-matter` for frontmatter parsing.
- Output: New dependencies in `package.json`; lockfile updated.
- Acceptance criteria: AC #13 (capability to render markdown)
- Dependencies: None
- Estimated scope: 5 minutes

**Task 3: (PRE-GENERATED — skip) UUID slugs already produced**
- The UUIDs are already generated and in use: `a8f3b2c1-7d4e-4f9a-b1c2-9d3e8f7a6b5c` (six-layer audit kit) and `c4e9d7a2-3f8b-4c1a-9e5d-7f2b8a4c6d1e` (brand-in-agent-memory kit). Both are valid UUID v4 format. The newsletter drafts in `mm-cli/drafts/*-newsletter.md` already reference them.
- DO NOT regenerate. If a fresh UUID is needed for security reasons later, regenerate AND update both newsletter drafts to match the new UUID.
- Acceptance criteria: AC #6
- Dependencies: None
- Estimated scope: 0 minutes (already done)

**Task 4: Build the PromptKitLayout component (NO cross-prompt-kit nav)**
- Input: Create `components/PromptKitLayout.tsx`. Component accepts `{ title, content }` as props. Renders main content area with parsed markdown and sidebar with EXACTLY two sections: consulting CTA (link to `/#contact` on multimodeai.com) and newsletter CTA (link to `https://multimodeai.substack.com`). **DO NOT include any catalog/list of other prompt kits.** Sidebar uses Tailwind utilities matching existing component styling.
- Output: A reusable component that renders a prompt-kit page with only two sidebar CTAs.
- Acceptance criteria: AC #4, AC #5, AC #12
- Dependencies: Task 2
- Estimated scope: 45-60 minutes

**Task 5: Build the token validation middleware**
- Input: Create `middleware.ts` at the project root. Use `jose` (or another JWT library) to validate JWTs. The middleware:
  - Runs on `matcher: ['/promptkit/:slug*']`
  - Extracts `?t=` query parameter
  - Validates the JWT against `process.env.PROMPTKIT_TOKEN_SECRET`
  - Checks that the JWT's `slug` claim matches the URL's slug
  - Checks that the JWT's `exp` is in the future
  - If ANY of these checks fail (missing token, malformed token, expired token, wrong slug, invalid signature): return a generic 404 response (NOT a redirect, NOT a token-error page)
  - If all checks pass: continue to the page render
- Output: Middleware that gates every prompt-kit request behind token validation, returning indistinguishable 404s for all failure modes.
- Acceptance criteria: AC #13, AC #14, AC #17, AC #18
- Dependencies: None
- Estimated scope: 60-90 minutes

**Task 6: Build the dynamic route (server-side rendering, NOT static generation)**
- Input: Create `app/promptkit/[slug]/page.tsx`. Use `generateStaticParams` returning empty array (force runtime rendering). Read the corresponding markdown file by slug at request time, parse frontmatter with gray-matter, render through PromptKitLayout. Export `metadata` with `robots: { index: false, follow: false }`. The middleware (Task 5) already validated the token before this page renders.
- Output: A working dynamic route that renders prompt-kit pages, but only when the middleware has validated the token.
- Acceptance criteria: AC #1, AC #2, AC #3, AC #11
- Dependencies: Task 1, Task 2, Task 3, Task 4, Task 5
- Estimated scope: 30-45 minutes

**Task 7: Build the token-generation utility**
- Input: Create `scripts/generate-promptkit-token.ts`. The script:
  - Takes a slug as a CLI argument: `npx tsx scripts/generate-promptkit-token.ts [uuid-slug]`
  - Reads `PROMPTKIT_TOKEN_SECRET` from `.env.local`
  - Signs a JWT with `{ slug, iat, exp: now + 90 days }`
  - Prints the full URL: `https://multimodeai.com/promptkit/[uuid-slug]?t=[signed-token]`
- Output: A CLI tool Hud uses each time he publishes a Substack post linking to a prompt kit. He pastes the output URL into the Substack post.
- Acceptance criteria: AC #15
- Dependencies: Task 5 (uses the same JWT library and secret)
- Estimated scope: 30 minutes

**Task 8: Configure rate limiting**
- Input: Add rate limiting to `/promptkit/*` requests. Options: Vercel's built-in rate limiting (if available on the project's plan), or a middleware-based in-memory rate limiter using `@upstash/ratelimit` with Redis (or a simple in-memory map for v1). Limit: 10 requests per IP per hour.
- Output: Edge rate limiting active on `/promptkit/*`.
- Acceptance criteria: AC #16
- Dependencies: Task 5 (integrates with the middleware)
- Estimated scope: 30-60 minutes (depending on Vercel plan and tooling)

**Task 9: Update robots.txt**
- Input: Edit `public/robots.txt`. Add `Disallow: /promptkit/` to existing rules.
- Output: robots.txt blocks `/promptkit/` from indexed crawlers.
- Acceptance criteria: AC #7
- Dependencies: None
- Estimated scope: 1 minute

**Task 10: Update sitemap.xml**
- Input: Edit `public/sitemap.xml`. Confirm no `/promptkit/*` URLs are present.
- Output: sitemap.xml contains no prompt-kit URLs.
- Acceptance criteria: AC #8
- Dependencies: None
- Estimated scope: 5 minutes

**Task 11: Verify no internal linking**
- Input: Grep all files in `app/` and `components/` for any string matching `/promptkit/` or any of the UUID slugs.
- Output: Zero internal references to prompt-kit URLs or slugs.
- Acceptance criteria: AC #10
- Dependencies: All other tasks
- Estimated scope: 2 minutes

**Task 12: Build and deployment verification**
- Input: Run `npm run build`. Confirm no errors. Push to git. Vercel deploys. Generate a test token with `scripts/generate-promptkit-token.ts`, use it to access the prompt kit URL, confirm content renders. Then test that:
  - The URL without `?t=` returns 404
  - The URL with a malformed token returns 404
  - The URL with an expired token returns 404 (test by generating a token with `exp: now - 1`)
  - The URL with a token for a DIFFERENT slug returns 404
- Output: All security paths verified.
- Acceptance criteria: AC #9, AC #18
- Dependencies: All implementation tasks
- Estimated scope: 15-20 minutes

Total estimated effort: 4-6 hours for an engineer comfortable with Next.js 14 App Router + JWT middleware. Up from 2-3 hours because of the security hardening.

5. VERIFICATION SCRIPT

```bash
# Run from multimode-ai repo root after implementation
# Slug values are UUIDs generated in Task 3 — replace SLUG_A and SLUG_B below with the actual values

set -e
cd /Users/hfox/Developments/multimode-ai

echo "=== File existence checks ==="
test -f app/promptkit/\[slug\]/page.tsx || echo "FAIL: AC #1 — page.tsx missing"
test -f components/PromptKitLayout.tsx || echo "FAIL: AC #4 — PromptKitLayout missing"
test -f middleware.ts || echo "FAIL: AC #13 — middleware.ts missing"
test -f scripts/generate-promptkit-token.ts || echo "FAIL: AC #15 — token generator script missing"
PROMPT_KIT_COUNT=$(ls content/promptkits/*.md 2>/dev/null | wc -l | tr -d ' ')
test "$PROMPT_KIT_COUNT" = "2" || echo "FAIL: AC #6 — should have exactly 2 prompt-kit files (found $PROMPT_KIT_COUNT)"

echo ""
echo "=== Hardening: NO 'Other prompt kits' navigation (primary enumeration vector) ==="
! grep -qiE "other prompt kits|prompt-kits-nav|promptkitsnav|readdirSync.*promptkit|fs\\..*promptkit" components/PromptKitLayout.tsx || echo "FAIL: AC #5 — sidebar contains cross-prompt-kit catalog (enumeration vector — MUST be removed)"

echo ""
echo "=== Hardening: UUID-style slugs (non-enumerable) ==="
# UUIDs are 36-char hex-with-dashes. Structured slugs (20260514_xxx_promptkit_N) are NOT acceptable.
for f in content/promptkits/*.md; do
  basename=$(basename "$f" .md)
  if [[ ! "$basename" =~ ^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$ ]]; then
    echo "FAIL: AC #6 — slug '$basename' is not a UUID (enumerable)"
  fi
done

echo ""
echo "=== Hardening: NO static generation of prompt-kit pages ==="
# generateStaticParams should return empty array (forces runtime rendering for token validation)
grep -A 5 "generateStaticParams" app/promptkit/\[slug\]/page.tsx | grep -qE "return \\[\\]|return \\(\\s*\\[\\s*\\]" || echo "FAIL: AC #3 — generateStaticParams should return empty array; pages must render on demand"

echo ""
echo "=== Hardening: Token validation middleware ==="
grep -q "PROMPTKIT_TOKEN_SECRET" middleware.ts || echo "FAIL: AC #13 — middleware doesn't reference PROMPTKIT_TOKEN_SECRET"
grep -qE "jose|jwtVerify|jsonwebtoken|verify\\s*\\(" middleware.ts || echo "FAIL: AC #13 — middleware doesn't appear to validate JWT"
grep -qE "matcher.*promptkit|/promptkit/" middleware.ts || echo "FAIL: AC #13 — middleware matcher not set to /promptkit/"
grep -qE "slug.*payload|payload\\..*slug|claims.*slug" middleware.ts || echo "FAIL: AC #14 — middleware doesn't validate slug claim against request URL"

echo ""
echo "=== Hardening: Generic 404 (no info leak) ==="
# Middleware should NOT return token-specific error messages
! grep -qiE "token expired|token invalid|invalid token|expired token|bad token" middleware.ts || echo "FAIL: AC #17 — middleware leaks token error details (must return generic 404)"

echo ""
echo "=== Hardening: Rate limiting on /promptkit/* ==="
grep -qiE "ratelimit|rate.limit|throttle|@upstash/ratelimit" middleware.ts || echo "WARN: AC #16 — confirm rate limiting is wired into middleware"

echo ""
echo "=== Standard checks ==="
grep -q "index: false" app/promptkit/\[slug\]/page.tsx || echo "FAIL: AC #2 — noindex metadata missing"
grep -q "Disallow: /promptkit/" public/robots.txt || echo "FAIL: AC #7 — robots.txt missing rule"
! grep -q "/promptkit/" public/sitemap.xml || echo "FAIL: AC #8 — sitemap contains promptkit URLs"
! grep -r "/promptkit/" app/page.tsx components/ 2>/dev/null || echo "FAIL: AC #10 — internal link to /promptkit/ found"

echo ""
echo "=== Build ==="
npm run build 2>&1 | tee /tmp/promptkit-build.log
test ${PIPESTATUS[0]} -eq 0 || echo "FAIL: AC #9 — build failed (see /tmp/promptkit-build.log)"

echo ""
echo "=== Manual security verification (run after Vercel deploys) ==="
echo "1. Visit https://multimodeai.com/promptkit/[any-uuid] WITHOUT a token query param"
echo "   Expected: HTTP 404, no content, no error message about tokens"
echo "2. Run: npx tsx scripts/generate-promptkit-token.ts [actual-slug-from-content-dir]"
echo "   Expected: full URL with ?t=[long-jwt-string]"
echo "3. Visit that URL → confirm prompt-kit content renders correctly"
echo "4. Tamper with one character of the token in the URL → revisit"
echo "   Expected: HTTP 404, indistinguishable from #1"
echo "5. Generate a token with manually-set exp:now-1 (or wait for natural expiry) → revisit"
echo "   Expected: HTTP 404, indistinguishable from #1"
echo "6. Generate a valid token for slug A, then construct URL with slug B + slug A's token → visit"
echo "   Expected: HTTP 404, indistinguishable from #1 (cross-slug attack prevented)"
echo "7. Rapid-fire 15 requests to /promptkit/[any-uuid] from same IP within an hour"
echo "   Expected: requests beyond limit (10/hour) return 429 or 404, not content"
echo ""
echo "All automated checks complete. Review FAIL/WARN lines above and run manual checks after deploy."
```

6. POST-IMPLEMENTATION CONTENT TASKS (for mm-cli, NOT for multimode-ai)

After `mm harness verify` confirms the implementation:

1. Record the two UUID slugs generated in Task 3 in a private location (not committed to any indexed repo). These are the canonical slugs for the six-layer audit kit and the brand-in-agent-memory kit.
2. **Update the newsletter drafts in `mm-cli/drafts/`:**
   - `six-layer-audit-newsletter.md` currently has placeholder slug `20260514_847_promptkit_1` — replace with the actual UUID generated for that kit, AND append the fresh token generated by `scripts/generate-promptkit-token.ts` as the `?t=` query parameter
   - `brand-in-agent-memory-newsletter.md` currently has placeholder slug `20260514_312_promptkit_2` — same treatment
3. Each time a newsletter is published to Substack, mint a FRESH token (90-day expiry by default) via `scripts/generate-promptkit-token.ts` and embed it in the published Substack post. If the same newsletter is re-promoted later, regenerate the token (the old one may have expired).

Sample final URL format in a Substack post:
`https://multimodeai.com/promptkit/a8f3b2c1-7d4e-4f9a-b1c2-9d3e8f7a6b5c?t=eyJhbGciOiJIUzI1NiIs...[full JWT]`

7. NOTES ON FUTURE EXTENSIBILITY AND v2 HARDENING

**Adding a new prompt kit:**
- Generate a fresh UUID: `node -e "console.log(crypto.randomUUID())"`
- Save the prompt-kit content as `content/promptkits/[new-uuid].md`
- Commit + push → Vercel auto-deploys
- Mint a token via `scripts/generate-promptkit-token.ts [new-uuid]`
- Embed the full URL (with `?t=`) into the Substack post that promotes the new kit

The dynamic route picks up the new file automatically. There is NO sidebar nav to update because there is NO cross-prompt-kit catalog (by design — the enumeration prevention).

**Potential v2 hardening if v1 isn't sufficient:**

- **Substack OAuth integration** — verify the request comes from a confirmed Substack subscriber (not just anyone with the URL). Adds complexity but closes the URL-sharing vector.
- **One-time-use tokens** — token is valid for the first N requests only, then dead. Mitigates URL-sharing further but breaks legitimate re-reads.
- **Subscriber-bound tokens** — token includes a hashed subscriber identifier and the request must come from that identifier's session. Highest friction; only worth it if URL sharing becomes a measurable problem.
- **Email-gated landing page** — instead of direct URL access, the Substack link goes to a "enter your email to receive the prompt kit" page. The email is verified (or just captured) and the prompt kit is emailed to that address. Friction: high. Privacy: requires email-sending infrastructure.
- **Periodic token rotation** — automated job rotates the secret every 90 days, invalidating ALL outstanding tokens. Forces users to re-engage with new Substack posts to get fresh URLs. Coarse but effective.
- **Watermarked content** — render the subscriber's email or a unique identifier as a low-opacity watermark in the prompt-kit content, so screenshots reveal the source if the kit is shared publicly.

**Subdomain migration** (`promptkit.multimodeai.com` instead of `multimodeai.com/promptkit/`):
- Vercel supports adding a subdomain pointed at the same project with a middleware rewrite rule for routing
- Aesthetic / branding play, not security. Defer unless there's a real reason.

**The v1 layered defense is:** UUID slugs (kill enumeration) + signed-token URLs (gate access) + 90-day expiry (kill post-unsubscribe access) + no cross-prompt-kit catalog (kill nav-based scraping) + edge rate limiting (kill bulk scraping) + generic 404 (kill info leaks). Above this baseline, additional v2 measures are subscriber-friction tradeoffs.

---

INSTRUCTIONS FOR HUD:

1. Copy this file to `/Users/hfox/Developments/multimode-ai/specs/promptkit-hosting.md`
2. In the multimode-ai repo, open a Claude Code session
3. Tell the agent: "Read specs/promptkit-hosting.md and implement it. When done, run the verification script in section 5 and report the result."
4. After implementation, run `mm harness verify /Users/hfox/Developments/multimode-ai/specs/promptkit-hosting.md` from anywhere to confirm acceptance criteria.

The supplementary draft file `mm-cli/drafts/promptkit-hosting-spec-draft.md` (the option-A interview-feeder version) can now be deleted — this file replaces it.
