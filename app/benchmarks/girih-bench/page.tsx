import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "girih-bench — Looks right. Is it right? | Multimode AI",
  description:
    "I asked two frontier AI models to rebuild a 1000-year-old Islamic quasicrystal, and scored it by physics. The result humbled me. A benchmark about measurement integrity.",
  openGraph: {
    title: "girih-bench — Looks right. Is it right?",
    description:
      "Two frontier models, one 1453 Islamic quasicrystal, scored by diffraction. The dramatic result turned out to be a measurement artifact.",
    url: "https://multimodeai.com/benchmarks/girih-bench",
    type: "article",
  },
};

type Level = {
  id: string;
  name: string;
  sub: string;
  order: string;
  fable: string;
  sol: string;
  result: string;
  fableNote: string;
  solNote: string;
};

const levels: Level[] = [
  {
    id: "L2",
    name: "8-fold star-and-cross",
    sub: "periodic order — the warm-up",
    order: "8-fold",
    fable: "/benchmarks/girih-bench/L2-fable.svg",
    sol: "/benchmarks/girih-bench/L2-sol.svg",
    result:
      "Both build a clean 8-fold star on a repeating lattice. A tie, and the correct answer.",
    fableNote: "attempts the over-under weave",
    solNote: "crisper stars, no weave",
  },
  {
    id: "L3",
    name: "10-fold girih strapwork",
    sub: "forbidden symmetry begins",
    order: "10-fold",
    fable: "/benchmarks/girih-bench/L3-fable.svg",
    sol: "/benchmarks/girih-bench/L3-sol.svg",
    result:
      "Both hit clean 10-fold. But Fable fills the whole field with strapwork, while Sol builds one perfect medallion in the middle.",
    fableNote: "space-filling tiling",
    solNote: "a single centered rosette",
  },
  {
    id: "L4",
    name: "Darb-i Imam quasicrystal",
    sub: "aperiodic — the hardest rung",
    order: "10-fold",
    fable: "/benchmarks/girih-bench/L4-fable.svg",
    sol: "/benchmarks/girih-bench/L4-sol.svg",
    result:
      "Both produce clean 10-fold rosettes. Neither is provably the true aperiodic tiling the shrine actually uses — and telling the two apart is a genuinely open problem.",
    fableNote: "fills edge to edge",
    solNote: "rosette with gaps at the seams",
  },
];

function PatternPair({ level }: { level: Level }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { who: "Fable 5", src: level.fable, note: level.fableNote },
        { who: "GPT-5.6 Sol", src: level.sol, note: level.solNote },
      ].map((m) => (
        <figure key={m.who} className="m-0">
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={`${m.who} — ${level.name}`} className="block w-full h-auto" />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-3">
            <span className="font-semibold text-charcoal">{m.who}</span>
            <span className="text-sm text-warm-gray">{m.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function BenchmarksPage() {
  return (
    <main className="bg-cream text-charcoal">
      {/* hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10">
        <a
          href="/benchmarks"
          className="text-sm text-warm-gray hover:text-sage-dark transition-colors"
        >
          ← Benchmarks
        </a>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          girih-bench · a model benchmark
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Looks right.{" "}
          <span className="text-sage-dark italic">Is it right?</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          A thousand years ago, Muslim craftsmen were quietly building quasicrystals -
          aperiodic geometric order that Western physics would not describe until Penrose in
          1974, and would not win a Nobel for until 2011. I asked two frontier AI models to
          rebuild that order, and scored them the way quasicrystals were actually discovered:
          by diffraction. Because a pretty picture can lie. A diffraction pattern cannot.
        </p>
      </section>

      {/* the physics */}
      <section className="mx-auto max-w-4xl px-6 py-10 border-t border-charcoal/10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          The secret in the tilework
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {[
            {
              h: "Forbidden by nature",
              p: "A repeating pattern can only carry 2, 3, 4, or 6-fold symmetry. 5 and 10-fold are mathematically forbidden for anything periodic.",
            },
            {
              h: "Built anyway, in 1453",
              p: "The Darb-i Imam shrine in Isfahan does the forbidden thing: a 10-fold quasicrystal, five centuries before the math existed to explain it.",
            },
            {
              h: "The order under the surface",
              p: "Islamic geometry turned away from copying the world and toward the rule beneath it. The girih you see is generated by a hidden network you do not.",
            },
          ].map((c) => (
            <div key={c.h}>
              <h3 className="font-semibold text-charcoal">{c.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* the ladder */}
      <section className="mx-auto max-w-4xl px-6 py-10 border-t border-charcoal/10">
        <h2 className="text-3xl font-bold tracking-tight">Three rungs, climbing the physics of order</h2>
        <p className="mt-3 max-w-2xl text-warm-gray leading-relaxed">
          Each level is harder than the last: a periodic warm-up, then the forbidden 10-fold,
          then the aperiodic quasicrystal itself. Fable 5 and GPT-5.6 Sol got the exact same
          prompt at each rung. Look for yourself.
        </p>

        <div className="mt-10 space-y-16">
          {levels.map((level) => (
            <div key={level.id}>
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.14em] text-sage-dark font-medium">
                  {level.id} · {level.sub}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{level.name}</h3>
              </div>
              <PatternPair level={level} />
              <p className="mt-5 border-l-2 border-sage pl-4 text-lg leading-relaxed text-charcoal">
                {level.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* the twist */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <h2 className="text-3xl font-bold tracking-tight">The result that fooled me</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-warm-gray">
          <p>
            My first scorer rasterized each pattern to a small image and ran a Fourier
            transform. It handed me a dramatic answer: one model crushed the other on the
            hardest level. A clean headline.
          </p>
          <p>
            Then I stress-tested my own benchmark - re-ran it at higher resolution. The result{" "}
            <span className="font-semibold text-charcoal">reversed</span>. The &ldquo;winner&rdquo;
            flipped. The whole dramatic gap was an artifact of how I measured, not a fact about
            the models.
          </p>
          <p>
            When I threw out the rasterizer and read the geometry directly - resolution-free -
            the truth was quieter:{" "}
            <span className="font-semibold text-charcoal">
              both models tie on the physics.
            </span>{" "}
            Clean 10-fold symmetry, every level, both of them.
          </p>
        </div>
      </section>

      {/* what's left */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10 bg-beige">
        <h2 className="text-3xl font-bold tracking-tight">What is left is taste</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm-gray">
          Once the physics ties, the only difference is craft - and craft is your eye, not a
          number. Look back at Level 4. Fable fills the field and tries to weave the straps;
          Sol&rsquo;s rosette is gorgeous but leaves gaps at the seams. To my eye Fable is the
          better craftsman. But that is a judgment, not a measurement - and one sample is not a
          benchmark. So I am not going to tell you a winner. I am going to show you both and let
          you decide.
        </p>
      </section>

      {/* the lesson */}
      <section className="mx-auto max-w-4xl px-6 py-16 border-t border-charcoal/10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          the discipline
        </h2>
        <p className="mt-5 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-balance">
          Everyone tells you to test AI on your own work. True. But your own test can lie to you
          just as easily as the model can.
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          The confident number is the thing to distrust. This tradition was built on exactly
          that instinct - do not take the surface at face value, verify what sits underneath it.
          The benchmark that only checks the pretty picture misses the point. Measurement is
          easy. Measurement integrity is the whole job.
        </p>
      </section>

      {/* footer / method */}
      <footer className="mx-auto max-w-4xl px-6 py-12 border-t border-charcoal/10 text-sm text-warm-gray">
        <p className="rounded-lg border border-dashed border-charcoal/20 p-4">
          <span className="font-semibold text-charcoal">Honesty note.</span> These are single
          generations - one draw per model per level, not a statistical benchmark. Fable 5 ran
          via the Claude API; GPT-5.6 Sol via Codex, each in its native harness. The scorer is
          validated against synthetic controls and reads the vector geometry directly, so it
          does not move when you zoom.
        </p>
        <p className="mt-4">
          Physics: crystallographic restriction · Lu &amp; Steinhardt, <em>Science</em> (2007),
          on the Darb-i Imam tiling · Shechtman, Nobel Prize in Chemistry (2011).
        </p>
      </footer>
    </main>
  );
}
