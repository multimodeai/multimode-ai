import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE = "https://multimodeai.com";

// Not for search engines: the client review form, the "What AI models read" experiment
// pages (/works), gated prompt kits, and unlisted demos (dynamic and noindex anyway).
const EXCLUDE = [/^\/review$/, /^\/works(\/|$)/, /^\/promptkit(\/|$)/, /^\/d(\/|$)/];

// Every folder under app/ with a page file is a page. Read at build time, so a new guide
// or paper is listed without editing this file. Dynamic ([slug]) and private (_x) folders
// are skipped.
function pages(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || /^[[_]/.test(entry.name)) continue;
    const route = `${prefix}/${entry.name}`;
    const full = path.join(dir, entry.name);
    if (["page.tsx", "page.mdx", "page.ts"].some((f) => fs.existsSync(path.join(full, f)))) out.push(route);
    out.push(...pages(full, route));
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const found = pages(path.join(process.cwd(), "app")).filter((r) => !EXCLUDE.some((x) => x.test(r)));
  return ["", ...found.sort()].map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
