import { promises as fs } from "fs";
import path from "path";
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

  const filePath = path.join(
    process.cwd(),
    "content/promptkits",
    `${params.slug}.md`
  );

  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
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
