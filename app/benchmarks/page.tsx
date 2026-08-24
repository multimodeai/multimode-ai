import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benchmarks | Multimode AI",
  description:
    "Honest tests of AI on hard, checkable problems. Every result here has been stress-tested, because the confident number is the thing to distrust.",
  openGraph: {
    title: "Benchmarks | Multimode AI",
    description:
      "Honest tests of AI on hard, checkable problems, stress-tested for measurement integrity.",
    url: "https://multimodeai.com/benchmarks",
    type: "website",
  },
};

type Benchmark = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  matchup: string;
  verdict: string;
};

const benchmarks: Benchmark[] = [
  {
    slug: "girih-bench",
    title: "girih-bench",
    tagline:
      "Can a frontier model rebuild a 1000-year-old Islamic quasicrystal? I scored it by physics, the way quasicrystals were actually discovered.",
    image: "/benchmarks/girih-bench/L4-fable.svg",
    matchup: "Fable 5 vs GPT-5.6 Sol",
    verdict: "A tie on the physics, and a lesson in measurement integrity.",
  },
];

export default function BenchmarksIndex() {
  return (
    <main className="bg-cream text-charcoal min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          Multimode AI · Benchmarks
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Benchmarks
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          Honest tests of AI on hard, checkable problems. Every number here has been
          stress-tested against its own method, because the confident number is the thing to
          distrust. Measurement is easy. Measurement integrity is the whole job.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benchmarks.map((b) => (
            <a
              key={b.slug}
              href={`/benchmarks/${b.slug}`}
              className="group block rounded-2xl border border-charcoal/10 bg-beige overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="bg-[#0b0f16]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.image}
                  alt={`${b.title} preview`}
                  className="block w-full h-auto"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-sage-dark transition-colors">
                    {b.title}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.12em] text-sage-dark font-medium whitespace-nowrap">
                    {b.matchup}
                  </span>
                </div>
                <p className="mt-3 text-warm-gray leading-relaxed">{b.tagline}</p>
                <p className="mt-4 border-l-2 border-sage pl-3 text-sm text-charcoal">
                  {b.verdict}
                </p>
                <span className="mt-5 inline-block text-sm font-medium text-sage-dark">
                  See the benchmark →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
