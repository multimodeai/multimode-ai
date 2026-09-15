import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PromptKitLayout from "@/components/PromptKitLayout";
import { decryptContent } from "@/lib/promptkit-crypto";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return [];
}

const SLUG_PATTERN =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n+/, "");
}

export default async function PromptKitPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!SLUG_PATTERN.test(params.slug)) notFound();

  const base = path.join(process.cwd(), "content/promptkits", params.slug);

  // Encrypted at rest. This repo is public, and committing plaintext made every
  // paid kit readable straight off raw.githubusercontent.com, bypassing the JWT
  // gate entirely. See lib/promptkit-crypto.ts.
  //
  // Plaintext is still accepted as a fallback so a kit that has not been
  // re-encrypted yet does not 404. Remove that branch once every kit ships
  // as .md.enc.
  // Encrypted-only. There is deliberately NO plaintext fallback: plaintext is
  // gitignored so it never deploys, which means a fallback could only ever
  // succeed on a developer's machine - letting someone add a kit, see it work
  // locally, commit, and ship a 404. Failing here instead means a missing
  // encrypt step is caught before it reaches production.
  //
  // After adding or editing a kit: npx tsx scripts/encrypt-promptkits.ts
  let raw: string;
  try {
    raw = decryptContent(await fs.readFile(`${base}.md.enc`, "utf8"));
  } catch {
    notFound();
  }

  let content: string;
  try {
    content = matter(raw).content;
  } catch {
    content = stripFrontmatter(raw);
  }

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1]?.trim() ?? "Prompt Kit";
  const body = content.replace(/^#\s+.+$/m, "").trimStart();

  return <PromptKitLayout title={title} content={body} />;
}
