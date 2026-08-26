import type { Metadata } from "next";

// Channel 2 of 3: named meta + Open Graph. Carries the EDITION fact only.
export const metadata: Metadata = {
  title: "Between Fridays",
  description:
    "Between Fridays is issued as a single shared edition of 20 hand-numbered prints, with every size drawn from the same numbered pool rather than a separate edition per size.",
  openGraph: {
    title: "Between Fridays",
    description:
      "A single shared edition of 20 hand-numbered prints. Every size is drawn from the same numbered pool, not a separate edition per size.",
    url: "https://multimodeai.com/works/between-fridays",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Between Fridays",
    description:
      "A shared edition of 20 hand-numbered prints, one pool across all sizes.",
  },
};

// Channel 1 of 3: JSON-LD. Carries the LOCATION fact only.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  name: "Between Fridays",
  creator: { "@type": "Person", name: "Hud Wahab" },
  contentLocation: {
    "@type": "Place",
    name: "Sultan Salahuddin Abdul Aziz Shah Mosque",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shah Alam",
      addressRegion: "Selangor",
      addressCountry: "MY",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold">Between Fridays</h1>
      {/* Channel 3 of 3: visible body text. Carries the MEDIUM + DATE fact only. */}
      <p className="mt-6 text-lg">
        Between Fridays is an archival photographic print. It was made on an
        ordinary weekday in the days just after Eid, which is the reason the
        room in the frame is empty.
      </p>
      <p className="mt-4 text-lg">
        The photograph is by Hud Wahab.
      </p>
    </main>
  );
}
