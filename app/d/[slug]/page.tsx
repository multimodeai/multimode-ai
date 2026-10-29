import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CallDemo from "./CallDemo";
import { TRADES } from "./scripts";

// Missed-call demo, one link per business. The business details live in a JSON
// file on R2, not in this public repo. Pages are unlisted (noindex).
const DATA_URL =
  "https://pub-51e7ecd47a73445c86f602cbae7029dd.r2.dev/demos/missed-call-v1.json";

type Entry = { name: string; trade: string; town?: string; time?: string; headline?: string; intro?: string; reply?: string };

async function getEntry(slug: string): Promise<Entry | null> {
  try {
    const res = await fetch(DATA_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, Entry>;
    return data[slug] ?? null;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Your missed calls, answered · Multimode AI",
  description: "A one-minute demo of a phone assistant for a local business.",
  robots: { index: false, follow: false },
};

export default async function DemoPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);
  const trade = entry ? TRADES[entry.trade] : undefined;
  if (!entry || !trade) notFound();

  const town = entry.town ?? "";
  const time = entry.time ?? "2:38 PM";

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <div className="max-w-md mx-auto px-5 py-10">
        <p className="text-xs text-warm-gray mb-6">
          A demo made for {entry.name} by Multimode AI. Not connected to your
          phone, nothing is live.
        </p>

        <h1 className="text-[28px] font-semibold tracking-tight leading-tight mb-3">
          {entry.headline ?? `A customer calls at ${time}. You're on a job.`}
        </h1>
        <p className="text-warm-gray leading-relaxed mb-8">
          {entry.intro ??
            `Today that call rings out, and the customer tries the next number on the list. Here is the same call with an assistant picking up for ${entry.name}.`}
        </p>

        <CallDemo
          lines={trade.call(entry.name, town)}
          ownerText={trade.ownerText(town, time)}
          steps={trade.after?.(entry.name, town, time)}
          footnote={trade.footnote}
          time={time}
          caller={trade.caller}
        />

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-3">What it does for you</h2>
          <ul className="space-y-2.5 text-[15px] leading-relaxed">
            <li>Answers every call you can&apos;t, in your business&apos;s name.</li>
            <li>Gets the job details and texts them to you, so you call back ready to quote.</li>
            <li>Texts the customer so they know they&apos;ve been heard and stop dialing around.</li>
            <li>Later, asks happy customers for a Google review.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">How it works</h2>
          <p className="text-[15px] leading-relaxed text-warm-gray">
            I set it up on your existing number and tune it to how you work: what
            you do, where you go, what to say when you&apos;re booked up. Then I
            keep it running and fix anything that comes up. You don&apos;t touch
            any software. Running it starts at $99 a month after setup.
          </p>
        </section>

        <section className="mt-10 rounded-2xl bg-beige p-5">
          <p className="text-[15px] leading-relaxed">
            Want to hear it on a real call for {entry.name}? Just reply to my{" "}
            {entry.reply ?? "text"} and I&apos;ll set up a number you can ring tonight. No cost.
          </p>
          <p className="mt-3 text-sm text-warm-gray">
            Hud Wahab · Multimode AI · Northern Colorado ·{" "}
            <a href="mailto:hud@multimodeai.com" className="underline underline-offset-4">
              hud@multimodeai.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
