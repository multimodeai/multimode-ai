// Citation details for the papers under /papers. One entry per paper page.
// These feed three things: the Google Scholar citation tags in each page's
// <head>, the "Cite this" box at the end of each page, and the PDF link.
//
// DOI: each `doi` is empty until the paper's Zenodo DOI exists. Paste the bare
// DOI (for example "10.5281/zenodo.1234567", no https://doi.org/ prefix) and
// the page picks it up everywhere: the citation_doi tag, the plain reference,
// the BibTeX entry and a DOI link in the box. Nothing else needs changing.

import type { Metadata } from "next";

export type Paper = {
  slug: string;
  title: string;
  // As shown in the page byline, first name first.
  authors: { given: string; family: string }[];
  // ISO date, as shown in the page byline.
  date: string;
  institution: string;
  bibKey: string;
  doi: string;
};

const SITE = "https://multimodeai.com";
const INSTITUTION = "Multimode AI, LLC";

export const PAPERS = {
  "plain-gh-is-hard-to-beat": {
    slug: "plain-gh-is-hard-to-beat",
    title:
      "Plain gh Is Hard to Beat: What It Costs an AI Agent to Read GitHub Through gh, gh-axi, GitHub's MCP Server and a Drop-in Replacement",
    authors: [{ given: "Hud", family: "Wahab" }],
    date: "2026-11-26",
    institution: INSTITUTION,
    bibKey: "wahab2026plaingh",
    doi: "", // DOI: empty until the Zenodo DOI exists.
  },
  "token-tax": {
    slug: "token-tax",
    title:
      "The Token Tax: measuring the ceiling on read-gating in agentic coding sessions",
    authors: [{ given: "Hud", family: "Wahab" }],
    date: "2026-09-15",
    institution: INSTITUTION,
    bibKey: "wahab2026tokentax",
    doi: "", // DOI: empty until the Zenodo DOI exists.
  },
  "what-ai-models-read": {
    slug: "what-ai-models-read",
    title: "What AI models actually read on your page",
    authors: [{ given: "Hud", family: "Wahab" }],
    date: "2026-08-28",
    institution: INSTITUTION,
    bibKey: "wahab2026whatairead",
    doi: "", // DOI: empty until the Zenodo DOI exists.
  },
} satisfies Record<string, Paper>;

export const paperUrl = (p: Paper) => `${SITE}/papers/${p.slug}`;
export const paperPdfPath = (p: Paper) => `/papers/${p.slug}.pdf`;
export const paperPdfUrl = (p: Paper) => `${SITE}${paperPdfPath(p)}`;

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

// Google Scholar reads these <meta name="citation_*"> tags.
// See https://scholar.google.com/intl/en/scholar/inclusion.html#indexing
export function citationMeta(p: Paper): NonNullable<Metadata["other"]> {
  const meta: NonNullable<Metadata["other"]> = {
    citation_title: p.title,
    citation_author: p.authors.map((a) => `${a.given} ${a.family}`),
    citation_publication_date: p.date.split("-").join("/"),
    citation_publisher: p.institution,
    citation_technical_report_institution: p.institution,
    citation_abstract_html_url: paperUrl(p),
    citation_pdf_url: paperPdfUrl(p),
    citation_language: "en",
  };
  if (p.doi) meta.citation_doi = p.doi;
  return meta;
}

// Plain reference, APA-like: "Wahab, H. (2026). Title. Multimode AI, LLC. URL"
export function plainReference(p: Paper): string {
  const names = p.authors
    .map((a) => `${a.family}, ${a.given.charAt(0)}.`)
    .join(", ");
  const link = p.doi ? `https://doi.org/${p.doi}` : paperUrl(p);
  return `${names} (${p.date.slice(0, 4)}). ${p.title}. ${p.institution}. ${link}`;
}

export function bibtex(p: Paper): string {
  const month = MONTHS[Number(p.date.slice(5, 7)) - 1];
  const lines = [
    `  author = {${p.authors.map((a) => `${a.family}, ${a.given}`).join(" and ")}},`,
    // Double braces keep the title's capitalisation as written (e.g. "gh").
    `  title = {{${p.title}}},`,
    `  institution = {${p.institution}},`,
    `  type = {Technical Report},`,
    `  year = {${p.date.slice(0, 4)}},`,
    `  month = ${month},`,
    `  url = {${paperUrl(p)}},`,
  ];
  if (p.doi) lines.push(`  doi = {${p.doi}},`);
  return `@techreport{${p.bibKey},\n${lines.join("\n")}\n}`;
}
