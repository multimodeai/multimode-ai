import {
  type Paper,
  bibtex,
  paperPdfPath,
  plainReference,
} from "@/lib/papers";
import "./paper-citation.css";

// Both parts are hidden when printing, so the PDF copy holds the paper alone.

// One line under the byline: the PDF copy and a jump to the "Cite this" box.
export function PaperLinks({ paper }: { paper: Paper }) {
  return (
    <p className="paper-links mt-3 text-sm print:hidden">
      <a className="underline" href={paperPdfPath(paper)}>
        Download PDF
      </a>
      <span aria-hidden="true" className="px-2 opacity-50">
        ·
      </span>
      <a className="underline" href="#cite">
        Cite this paper
      </a>
    </p>
  );
}

// Boxed at the end of the page: a ready plain reference and a BibTeX entry.
export function CiteThis({ paper }: { paper: Paper }) {
  return (
    <section
      id="cite"
      aria-labelledby="cite-heading"
      className="cite-box mt-12 rounded border border-black/15 bg-beige px-5 py-4 print:hidden"
    >
      <h2 id="cite-heading" className="text-base font-semibold">
        Cite this paper
      </h2>
      <p className="mt-3 text-sm leading-relaxed">{plainReference(paper)}</p>
      {paper.doi ? (
        <p className="mt-2 text-sm">
          DOI:{" "}
          <a className="underline" href={`https://doi.org/${paper.doi}`}>
            {paper.doi}
          </a>
        </p>
      ) : null}
      <h3 className="mt-4 text-sm font-semibold">BibTeX</h3>
      <pre className="mt-2 overflow-x-auto rounded bg-black/5 p-3 text-xs leading-relaxed">
        <code>{bibtex(paper)}</code>
      </pre>
      <p className="mt-3 text-sm">
        <a className="underline" href={paperPdfPath(paper)}>
          Download the PDF
        </a>
      </p>
    </section>
  );
}
