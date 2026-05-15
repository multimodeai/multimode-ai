# CLAUDE.md

Project instructions for Claude Code when working on multimode-ai.

> **Target location:** copy this file to `/Users/hfox/Developments/multimode-ai/CLAUDE.md` before starting the prompt-kit-hosting build.

## Project Overview

multimode-ai is the marketing site for Multimode AI LLC — a Next.js 14 App Router static site deployed on Vercel. Current functionality is a single-page landing (Hero → Services → HowItWorks → WhyUs → Contact → Footer) plus a contact form. The site drives consulting inquiries for solo-dev AI engineering work.

The current active build is **prompt-kit hosting** — adding a hardened `/promptkit/[slug]` dynamic route that serves gated lead-magnet content. The full spec is in `specs/promptkit-hosting.md`.

**Read `specs/promptkit-hosting.md` first** if you're working on the prompt-kit feature. It contains acceptance criteria, constraint architecture, task decomposition, and a verification script.

## Stack

- **Framework:** Next.js 14.2.18 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (auto-deploys from `main` branch via git push)
- **Node version:** managed by Vercel (LTS)

## Architecture

```
app/
  layout.tsx       — root layout
  page.tsx         — landing page (composed of components below)
  globals.css      — Tailwind base

components/
  Hero.tsx
  Services.tsx
  HowItWorks.tsx
  WhyUs.tsx
  Contact.tsx
  Footer.tsx

public/
  robots.txt
  sitemap.xml
  favicon.png
```

The site is intentionally small and fast. Don't introduce framework-level changes (no Remix, no Astro, no Pages Router) without explicit approval.

## Design Ethos

- **Spare, professional, minimal.** No unnecessary visual ornamentation.
- **Match existing component styling.** When adding a new component, mirror the Tailwind utility patterns used in Hero, Services, etc.
- **No client-side rendering by default.** Server components are the App Router norm; use them unless interactivity demands otherwise.
- **No new dependencies without consideration.** Each added package is a maintenance commitment. Prefer plain TypeScript / Tailwind / native browser APIs.

## Current Build Constraints (specifically for prompt-kit hosting)

When implementing `specs/promptkit-hosting.md`:

- **DO NOT** statically generate prompt-kit pages. `generateStaticParams` returns empty array. Pages must render on demand for token validation to work.
- **DO NOT** include any cross-prompt-kit navigation in the layout. Each prompt-kit page is an isolated island.
- **DO NOT** use enumerable slug patterns. Use UUIDs.
- **DO** validate JWT tokens in `middleware.ts` before any page renders.
- **DO** return generic 404 (not "token expired" or "invalid token") for all token failure modes — no information leak.
- **DO** add rate limiting on `/promptkit/*` requests.

The threat model: subscribers who get one prompt-kit URL must NOT be able to enumerate or scrape other prompt kits. Subscribers who unsubscribe must lose access after token expiry.

## Environment Variables (Vercel project settings)

Set these in the Vercel project's Environment Variables panel before deploying the prompt-kit feature:

- `PROMPTKIT_TOKEN_SECRET` — strong random string (32+ bytes hex). Used to sign and verify JWT tokens on `/promptkit/*` routes. Generate locally: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Add to both Production and Preview environments. Also mirror in `.env.local` for local dev (gitignored).

## Commands

```bash
npm install              # install dependencies
npm run dev              # local dev server on :3000
npm run build            # production build (must pass before deploy)
npm run lint             # ESLint check
npm start                # run production build locally

# Prompt-kit specific (after the build is implemented)
npx tsx scripts/generate-promptkit-token.ts <uuid-slug>
                         # mints a fresh 90-day JWT token for a given slug; outputs full URL
```

## Verification

After implementing any spec from `specs/`, run:

```bash
mm harness verify specs/<spec-name>.md
```

`mm` is the mm-cli binary from the sibling `/Users/hfox/Developments/mm-cli` repo. The verification reads the spec's acceptance criteria and confirms each is met against the current codebase.

## Git Commit Guidelines

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- No AI attribution in commits
- Keep messages clean and descriptive
- One feature per commit when possible; build steps may be split across multiple commits

## Things NOT to Do

- Do not modify existing landing-page components (Hero, Services, etc.) unless the spec explicitly requires it
- Do not link to `/promptkit/*` URLs from any indexed page on the site
- Do not include `/promptkit/*` URLs in the sitemap
- Do not commit any `PROMPTKIT_TOKEN_SECRET` value to git
- Do not commit `.env.local`
- Do not add a markdown library that the codebase doesn't already use (pick one: `react-markdown` OR `next-mdx-remote`, not both)
- Do not introduce a database, ORM, or auth provider for v1 — UUID slugs + JWT tokens + rate limiting are the v1 gate

## Cross-Repo Context

Source prompt-kit content lives in the sibling `mm-cli` repo at `/Users/hfox/Developments/mm-cli/drafts/`. Specifically:

- `mm-cli/drafts/six-layer-audit-prompt-kit.md` → copy to `content/promptkits/a8f3b2c1-7d4e-4f9a-b1c2-9d3e8f7a6b5c.md`
- `mm-cli/drafts/brand-in-agent-memory-prompt-kit.md` → copy to `content/promptkits/c4e9d7a2-3f8b-4c1a-9e5d-7f2b8a4c6d1e.md`

The two UUIDs above are the canonical slugs for these prompt kits — used in newsletters at `mm-cli/drafts/*-newsletter.md` and in the token-generation script.
