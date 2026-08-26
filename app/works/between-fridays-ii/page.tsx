import type { Metadata } from "next";

// Control: unchanged from page one. Still carries the EDITION fact.
export const metadata: Metadata = {
  title: "Between Fridays II",
  description:
    "Between Fridays II is issued as a single shared edition of 20 hand-numbered prints, with every size drawn from the same numbered pool rather than a separate edition per size.",
  openGraph: {
    title: "Between Fridays II",
    description:
      "A single shared edition of 20 hand-numbered prints. Every size is drawn from the same numbered pool.",
    url: "https://multimodeai.com/works/between-fridays-ii",
    type: "article",
  },
};

// ROTATED: JSON-LD now carries the MEDIUM fact (was visible body on page one).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  name: "Between Fridays II",
  creator: { "@type": "Person", name: "Hud Wahab" },
  artMedium: "Archival photographic print",
  dateCreated: "an ordinary weekday in the days just after Eid",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold">Between Fridays II</h1>
      {/* ROTATED: visible body now carries the LOCATION fact (was JSON-LD on page one). */}
      <p className="mt-6 text-lg">
        Between Fridays II was photographed at the Sultan Salahuddin Abdul Aziz
        Shah Mosque in Shah Alam, Selangor.
      </p>
      <p className="mt-4 text-lg">The photograph is by Hud Wahab.</p>
    </main>
  );
}
