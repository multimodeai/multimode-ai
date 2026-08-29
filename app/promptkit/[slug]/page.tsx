import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PromptKitLayout from "@/components/PromptKitLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return [];
}

const SLUG_PATTERN =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

// Prompt-kit markdown content now lives in a private companion repo
// (multimodeai/multimode-ai-promptkits), not in this public repo's git
// history. Fetched server-side via the GitHub REST Contents API using a
// read-only token. Access control is unchanged: this route is still only
// reachable through middleware.ts's JWT gate.
const CONTENT_OWNER = "multimodeai";
const CONTENT_REPO = "multimode-ai-promptkits";
const CONTENT_REF = "main";

async function fetchPromptKitMarkdown(slug: string): Promise<string | null> {
  const token = process.env.PROMPTKIT_CONTENT_TOKEN;
  if (!token) return null;

  const url = `https://api.github.com/repos/${CONTENT_OWNER}/${CONTENT_REPO}/contents/${slug}.md?ref=${CONTENT_REF}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;
  return res.text();
}

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

  const raw = await fetchPromptKitMarkdown(params.slug);
  if (raw === null) notFound();

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
