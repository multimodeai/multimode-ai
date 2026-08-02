import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Own Token Burn Dashboard | Multimode AI",
  description:
    "Step-by-step: parse your own local Claude Code and Codex token logs, build an honest estimate band for ChatGPT, and keep measured and estimated numbers in separate lanes that never get summed.",
  openGraph: {
    title: "Build Your Own Token Burn Dashboard",
    description:
      "Parse your own Claude Code and Codex logs, add an honest ChatGPT estimate, and keep measured and estimated tokens in separate lanes - never summed.",
    url: "https://multimodeai.com/guides/token-burn-dashboard",
    type: "article",
  },
};

export default function TokenBurnDashboardGuide() {
  return (
    <main className="bg-cream text-charcoal">
      {/* hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10">
        <a
          href="/guides"
          className="text-sm text-warm-gray hover:text-sage-dark transition-colors"
        >
          ← Guides
        </a>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          token burn dashboard · build guide
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Build your own{" "}
          <span className="text-sage-dark italic">token burn dashboard</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          Four steps to a daily view of your own AI usage across Claude Code, Codex, and ChatGPT -
          exact counts where your tools actually report them, and an honestly labeled estimate
          where one doesn&rsquo;t.
        </p>
      </section>

      {/* what you'll build */}
      <section className="mx-auto max-w-4xl px-6 py-10 border-t border-charcoal/10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          what you&rsquo;ll build
        </h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          A small daily tracker, three lanes wide. Claude Code and Codex both write local logs
          with real token counts in them, so those two lanes read exact numbers straight off your
          own disk. ChatGPT exposes no token data anywhere, so that lane counts what it actually
          can (conversations or messages) and turns it into a labeled estimate band instead of a
          number dressed up to look precise. No frameworks required - reading JSON lines off disk
          and adding numbers up is the whole job.
        </p>
      </section>

      {/* step 1 */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          step 1 of 4
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Find your local usage logs</h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          Claude Code writes one JSONL file per conversation under{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">
            ~/.claude/projects/&lt;project&gt;/*.jsonl
          </code>
          . Each line is one event; the lines that matter carry a <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">usage</code> object with{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">input_tokens</code>,{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">output_tokens</code>,{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">cache_creation_input_tokens</code>, and{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">cache_read_input_tokens</code>.
          Codex writes one file per session under{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">
            ~/.codex/sessions/&lt;year&gt;/&lt;month&gt;/&lt;day&gt;/rollout-*.jsonl
          </code>
          , and the lines that matter are token-count events, nested three levels down at{" "}
          <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">payload.info.total_token_usage</code>{" "}
          with a <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">total_tokens</code>{" "}
          field - it&rsquo;s already a running cumulative total for that session, so the last
          occurrence in the file is all you need.
        </p>
        <pre className="mt-6 max-w-2xl rounded-xl border border-charcoal/10 bg-charcoal text-cream text-sm p-5 overflow-x-auto">
{`$ find ~/.claude/projects -name "*.jsonl" | head -3
/Users/you/.claude/projects/-Users-you-myapp/f8c2ab18-....jsonl

$ find ~/.codex/sessions -name "rollout-*.jsonl" | head -3
/Users/you/.codex/sessions/2026/06/11/rollout-2026-06-11T13-28-55-....jsonl`}
        </pre>
        <p className="mt-4 max-w-2xl text-sm text-warm-gray leading-relaxed">
          Roughly what a line looks like in each (both field sets checked directly against real
          local log files while writing this):
        </p>
        <pre className="mt-3 max-w-2xl rounded-xl border border-charcoal/10 bg-charcoal text-cream text-xs p-5 overflow-x-auto">
{`// Claude Code line (shape)
{"timestamp":"2026-08-01T09:14:22Z","message":{"usage":
  {"input_tokens":3497,"output_tokens":131,
   "cache_creation_input_tokens":21923,"cache_read_input_tokens":0}}}

// Codex line (shape) - nested under payload.info, not top-level
{"type":"event_msg","payload":{"type":"token_count","info":
  {"total_token_usage":
    {"input_tokens":3571,"cached_input_tokens":3072,
     "output_tokens":171,"total_tokens":3742}}}}`}
        </pre>
      </section>

      {/* step 2 */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          step 2 of 4
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Sum tokens per day, per tool
        </h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          Walk both directories, parse each line as JSON, and bucket by day. For Claude Code, use
          each line&rsquo;s own timestamp and add up the four usage fields. For Codex, the
          session&rsquo;s date is already in its folder path or filename, and you only need the
          last <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">total_token_usage.total_tokens</code>{" "}
          per file - summing every line would double-count, since it&rsquo;s a running total, not
          a per-turn delta. Keep the two running totals separate for now; you&rsquo;ll want a
          clean measured-only combined number later, and it should never touch what ChatGPT
          reports.
        </p>
        <pre className="mt-6 max-w-2xl rounded-xl border border-charcoal/10 bg-charcoal text-cream text-xs p-5 overflow-x-auto">
{`// pseudocode - adapt to whatever language you're comfortable in
const claudeCodeByDay = {};
for (const file of walk("~/.claude/projects", "*.jsonl")) {
  for (const line of readLines(file)) {
    const event = JSON.parse(line);
    const usage = event?.message?.usage;
    if (!usage) continue;
    const day = event.timestamp.slice(0, 10);
    const tokens = usage.input_tokens + usage.output_tokens
      + usage.cache_creation_input_tokens + usage.cache_read_input_tokens;
    claudeCodeByDay[day] = (claudeCodeByDay[day] ?? 0) + tokens;
  }
}

const codexByDay = {};
for (const file of walk("~/.codex/sessions", "rollout-*.jsonl")) {
  const day = dayFromPath(file); // the path already has year/month/day
  let last = null;
  for (const line of readLines(file)) {
    const event = JSON.parse(line);
    const info = event?.payload?.info;
    if (info?.total_token_usage) last = info.total_token_usage;
  }
  if (last) codexByDay[day] = (codexByDay[day] ?? 0) + last.total_tokens;
}`}
        </pre>
      </section>

      {/* step 3 */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          step 3 of 4
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          For ChatGPT, count what you can - then label it an estimate
        </h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          ChatGPT gives you no token counts anywhere - not in the app, not in a data export. Don&rsquo;t
          fake precision it can&rsquo;t give you. Export your data (Settings → Data controls →
          Export) and you get a conversation history with timestamps and messages, no tokens.
          Count what&rsquo;s actually there - conversations or messages per day - and turn that
          into a low/high estimate band using two different tokens-per-message assumptions, rather
          than one invented number that looks as precise as the measured lanes. Which exact
          multipliers you pick matters far less than the number always carrying an
          &ldquo;estimated&rdquo; label everywhere it appears.
        </p>
        <pre className="mt-6 max-w-2xl rounded-xl border border-charcoal/10 bg-charcoal text-cream text-xs p-5 overflow-x-auto">
{`// pseudocode
const messagesPerDay = countMessages(chatgptExport, day);
const chatgptEstimate = {
  low: messagesPerDay * LOW_TOKENS_PER_MESSAGE,
  high: messagesPerDay * HIGH_TOKENS_PER_MESSAGE,
  label: "estimated", // never "measured" - this is the whole point
};
// keep this as its own object. it never gets added into
// claudeCodeByDay or codexByDay.`}
        </pre>
      </section>

      {/* step 4 */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10 bg-beige">
        <p className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          step 4 of 4
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Render three lanes - and never sum them into one
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm-gray">
          The simplest version is a table: one row per day, three columns - Claude Code, Codex,
          ChatGPT (estimated). Give the ChatGPT column something visually different - a dashed
          border, an asterisk, a different label style - so a reader&rsquo;s eye doesn&rsquo;t
          mistake it for the same kind of number as the other two. If you want a combined
          &ldquo;measured total,&rdquo; only add Claude Code and Codex together. Never fold the
          ChatGPT estimate into that total, and never show a grand total that pretends it did. A
          bar chart or heatmap is a nice upgrade later, but the table already gets the one rule
          that matters right: a measured number and an estimated number can sit side by side, and
          they can never share a sum.
        </p>
      </section>

      {/* see it in action */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <h2 className="text-3xl font-bold tracking-tight">See it in action</h2>
        <p className="mt-3 max-w-2xl text-warm-gray leading-relaxed">
          A live, running version of this - real numbers, my own usage, updated monthly:{" "}
          <a
            href="https://hudwahab.com/token-burn"
            className="text-sage-dark underline hover:no-underline"
          >
            hudwahab.com/token-burn
          </a>
          . The screenshots below are from that fuller version, which adds a few extra views on
          top of the basic three-lane setup above.
        </p>
        <figure className="mt-8 m-0">
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guides/token-burn-dashboard/dashboard-overview.png"
              alt="The live demo's daily heatmap view: three lanes (Claude Code, Codex, ChatGPT), measured totals, and a 90/180/1-year/all-time range selector"
              className="block w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-sm text-warm-gray">
            The daily heatmap this guide teaches you to build - three lanes, a measured total that
            never quietly absorbs an estimate.
          </figcaption>
        </figure>
        <figure className="mt-10 m-0">
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guides/token-burn-dashboard/model-phases.png"
              alt="An additional view on the live demo showing model mix and a work-phase breakdown"
              className="block w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-sm text-warm-gray">
            An extra view the live demo adds on top - model mix and a work-phase breakdown. That
            classification logic is outside the scope of this guide.
          </figcaption>
        </figure>
      </section>

      {/* footer / honesty note */}
      <footer className="mx-auto max-w-4xl px-6 py-12 border-t border-charcoal/10 text-sm text-warm-gray">
        <p className="rounded-lg border border-dashed border-charcoal/20 p-4">
          <span className="font-semibold text-charcoal">Scope note.</span> This guide covers one
          thing: reading real token counts off your own Claude Code and Codex logs, and handling
          ChatGPT honestly with a labeled estimate instead of a fake precise number. It doesn&rsquo;t
          cover how the live demo classifies work into phases, scores verification coverage, or
          scrubs anything before it goes public - that&rsquo;s the fuller, paid setup, not the
          basic build above. Want that version wired up for your own team? Email{" "}
          <a
            href="mailto:support@multimodeai.com"
            className="text-sage-dark underline hover:no-underline"
          >
            support@multimodeai.com
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
