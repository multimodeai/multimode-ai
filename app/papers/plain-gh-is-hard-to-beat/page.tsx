import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import "./paper.css";
import { CiteThis, PaperLinks } from "@/components/PaperCitation";
import { PAPERS, citationMeta } from "@/lib/papers";

const PAPER = PAPERS["plain-gh-is-hard-to-beat"];

const TITLE =
  "Plain gh Is Hard to Beat: What It Costs an AI Agent to Read GitHub Through gh, gh-axi, GitHub's MCP Server and a Drop-in Replacement";

export const metadata: Metadata = {
  title: `${TITLE} | Multimode AI`,
  description:
    "Some GitHub tools are now designed specially for agents, on the claim that they cost fewer tokens than the tools people use. We tested that claim. Our main finding is a negative one for tool builders: plain gh is already very good for agents.",
  openGraph: {
    title: TITLE,
    description:
      "The two agent-specific tools cost more than plain gh. Across tools, cost followed the number of round trips between the agent and the tool far more than the size of each output.",
    url: "https://multimodeai.com/papers/plain-gh-is-hard-to-beat",
    type: "article",
  },
  // Set here so the site-wide card title (which carries an em dash) is not inherited.
  twitter: {
    card: "summary",
    title: TITLE,
    description:
      "The two agent-specific tools cost more than plain gh. Across tools, cost followed the number of round trips between the agent and the tool far more than the size of each output.",
  },
  other: citationMeta(PAPER),
};

// Rendered once at build time. The body is the approved article's HTML, copied
// unchanged from its <main> element, so the text, tables, bolding, figures and
// references match the reviewed draft exactly. Styling lives in paper.css.
export const dynamic = "force-static";

const body = fs.readFileSync(
  path.join(process.cwd(), "app/papers/plain-gh-is-hard-to-beat/article-body.html"),
  "utf8",
);

// The PDF link goes right after the paper's header (title, byline, date); the
// article HTML itself is left unchanged.
const HEADER_END = "</header>";
const headerEnd = body.indexOf(HEADER_END) + HEADER_END.length;
const header = body.slice(0, headerEnd);
const article = body.slice(headerEnd);

export default function Page() {
  return (
    <div className="ghp">
      <main>
        <div dangerouslySetInnerHTML={{ __html: header }} />
        <PaperLinks paper={PAPER} />
        <div dangerouslySetInnerHTML={{ __html: article }} />
        <CiteThis paper={PAPER} />
      </main>
    </div>
  );
}
