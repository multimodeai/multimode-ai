import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides | Multimode AI",
  description:
    "Real tools, built in public, free to use and free to help extend - because the point is collaboration, not a paywall.",
  openGraph: {
    title: "Guides | Multimode AI",
    description:
      "Real tools, built in public, free to use and free to help extend.",
    url: "https://multimodeai.com/guides",
    type: "website",
  },
};

type Guide = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  kind: string;
  verdict: string;
};

const guides: Guide[] = [
  {
    slug: "ground-truth",
    title: "Ground Truth",
    tagline:
      "A Chrome extension and MCP server that check whether an AI's Quran citation actually exists, and whether the Arabic it quoted matches the real text.",
    image: "https://pub-51e7ecd47a73445c86f602cbae7029dd.r2.dev/guides/ground-truth/auto-scan-badges.png",
    kind: "Extension + MCP",
    verdict: "Deterministic, not an AI judgment call. Free. Open for anyone to help extend.",
  },
  {
    slug: "token-burn-dashboard",
    title: "Token Burn Dashboard",
    tagline:
      "A GitHub-style dashboard tracking real AI token usage across Claude Code, Codex, and ChatGPT - measured and estimated numbers kept honestly separate, never summed.",
    image: "https://pub-51e7ecd47a73445c86f602cbae7029dd.r2.dev/guides/token-burn-dashboard/dashboard-overview.png",
    kind: "Usage analytics",
    verdict: "Live on my own usage today. A build-your-own guide is coming.",
  },
];

export default function GuidesIndex() {
  return (
    <main className="bg-cream text-charcoal min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          Multimode AI · Guides
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Guides
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          Real tools, built in public. Read how they work, verify the claims yourself, and help
          extend them if you want to. Free, on purpose - a paywall would only get in the way of
          the second and third things.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {guides.map((g) => (
            <a
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group block rounded-2xl border border-charcoal/10 bg-beige overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="bg-[#0b0f16]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image}
                  alt={`${g.title} preview`}
                  className="block w-full h-auto"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-sage-dark transition-colors">
                    {g.title}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.12em] text-sage-dark font-medium whitespace-nowrap">
                    {g.kind}
                  </span>
                </div>
                <p className="mt-3 text-warm-gray leading-relaxed">{g.tagline}</p>
                <p className="mt-4 border-l-2 border-sage pl-3 text-sm text-charcoal">
                  {g.verdict}
                </p>
                <span className="mt-5 inline-block text-sm font-medium text-sage-dark">
                  Read the guide →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
