import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ground Truth — Sounds right. Is it real? | Multimode AI",
  description:
    "Step-by-step setup guide: install the Ground Truth browser extension or MCP server, then check whether an AI's Quran citation actually exists and the Arabic matches the licensed text.",
  openGraph: {
    title: "Ground Truth — Sounds right. Is it real?",
    description:
      "Step-by-step: install the browser extension or MCP server, then check an AI's Quran citation against the real, licensed text.",
    url: "https://multimodeai.com/guides/ground-truth",
    type: "article",
  },
};

export default function GroundTruthGuide() {
  return (
    <main className="bg-cream text-charcoal">
      {/* hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-8">
        <a
          href="/guides"
          className="text-sm text-warm-gray hover:text-sage-dark transition-colors"
        >
          ← Guides
        </a>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          ground truth · chrome extension + mcp server
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Sounds right.{" "}
          <span className="text-sage-dark italic">Is it real?</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          An AI can quote a Quran verse mid-answer with total confidence whether or not the
          reference is real. Ground Truth checks it against the actual licensed text - free, two
          ways to run it. Install the browser extension for chat tabs, or the MCP server for your
          own agent. Same checking engine either way.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-warm-gray">
          {/* TODO: replace this line with a real <a href="..."> the moment the "Ground Truth"
              newsletter post is live on Substack - do not fabricate a URL before then. See
              mm-cli/drafts/ground-truth/newsletter-roadmap.md for the draft. */}
          Why this exists, and the real bugs found building it against itself → newsletter post
          landing soon.
        </p>
      </section>

      {/* step 1: install the browser extension */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          step 1 of 3
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Install the browser extension</h2>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Works today in Chrome, Edge, Brave - any Chromium browser. Not on the Chrome Web Store
          yet (submitted, in developer-account verification), so load it unpacked from source:
        </p>
        <ol className="mt-6 max-w-2xl space-y-3 text-warm-gray leading-relaxed list-decimal list-inside marker:font-semibold marker:text-sage-dark">
          <li>
            Clone the repo:{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              git clone https://github.com/multimodeai/ground-truth.git
            </code>
          </li>
          <li>
            Open{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              chrome://extensions
            </code>{" "}
            (or <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">edge://extensions</code>,{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">brave://extensions</code>)
          </li>
          <li>
            Toggle <span className="font-semibold text-charcoal">Developer mode</span> on, top
            right
          </li>
          <li>
            Click <span className="font-semibold text-charcoal">Load unpacked</span>
          </li>
          <li>
            Select the repo&rsquo;s{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">extension/</code>{" "}
            folder
          </li>
        </ol>
        <p className="mt-5 max-w-2xl text-sm text-warm-gray leading-relaxed">
          Also works without any of the seven supported sites: select any text on any page,
          right-click, choose &ldquo;Check with Ground Truth&rdquo; - or paste text directly into
          the toolbar popup.
        </p>
      </section>

      {/* step 2: install the mcp server */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          step 2 of 3 · optional, or alongside step 1
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Install the MCP server</h2>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Building with an agent instead of (or alongside) a browser? The MCP server exposes the
          exact same checking engine as a tool any MCP-compatible client can call on its own
          drafted answer, before a citation ever reaches you.
        </p>
        <ol className="mt-6 max-w-2xl space-y-4 text-warm-gray leading-relaxed list-decimal list-inside marker:font-semibold marker:text-sage-dark">
          <li>
            Already on npm as{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              @hududed/ground-truth-mcp
            </code>{" "}
            - no clone needed:
            <pre className="mt-2 rounded-lg border border-charcoal/10 bg-charcoal text-cream text-xs p-4 overflow-x-auto">
npx -y @hududed/ground-truth-mcp
            </pre>
          </li>
          <li>
            Claude Code, one line:
            <pre className="mt-2 rounded-lg border border-charcoal/10 bg-charcoal text-cream text-xs p-4 overflow-x-auto">
claude mcp add ground-truth -- npx -y @hududed/ground-truth-mcp
            </pre>
          </li>
          <li>
            Claude Desktop - add this to your config (
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              ~/Library/Application Support/Claude/claude_desktop_config.json
            </code>{" "}
            on macOS):
            <pre className="mt-2 rounded-lg border border-charcoal/10 bg-charcoal text-cream text-xs p-4 overflow-x-auto">
{`{
  "mcpServers": {
    "ground-truth": {
      "command": "npx",
      "args": ["-y", "@hududed/ground-truth-mcp"]
    }
  }
}`}
            </pre>
          </li>
          <li>Restart Claude Desktop (or reload Claude Code) - it&rsquo;s live.</li>
        </ol>
        <p className="mt-5 max-w-2xl text-sm text-warm-gray leading-relaxed">
          Working from a local checkout instead of the published package? Point{" "}
          <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">command</code> at{" "}
          <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
            node /absolute/path/to/ground-truth/mcp-server/server.js
          </code>
          . To verify it yourself against the real MCP transport:{" "}
          <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
            cd mcp-server &amp;&amp; npm install &amp;&amp; node test.js
          </code>
          .
        </p>
      </section>

      {/* step 3: try it */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          step 3 of 3
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Try it</h2>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          However you installed it, the test is the same: give an AI a reason to cite a verse,
          then watch what happens.
        </p>
        <div className="mt-6 max-w-2xl space-y-5 text-warm-gray leading-relaxed">
          <p>
            <span className="font-semibold text-charcoal">Installed the extension?</span> Ask
            ChatGPT, Claude, Gemini, Grok, Google AI Mode, Perplexity, or Meta AI to quote a Quran
            verse. Within a second or two a small mark lands right next to the citation - green if
            it checks out, red if it doesn&rsquo;t, amber if something more specific is going on
            (right verse, wrong number, that kind of thing). Click the mark for a word-level
            explanation.
          </p>
          <p>
            <span className="font-semibold text-charcoal">Installed the MCP server?</span> Ask
            your MCP-connected agent (Claude Desktop, Claude Code, Cursor) to quote a verse, then
            ask it to check its own citation with Ground Truth. It calls{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              check_quran_citation
            </code>{" "}
            (or{" "}
            <code className="text-sm bg-charcoal/5 rounded px-1.5 py-0.5 font-mono">
              check_hadith_citation
            </code>{" "}
            for a hadith) and reports the verdict back to you - before a bad citation ever gets
            presented as settled.
          </p>
        </div>

        <figure className="mt-10 m-0">
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guides/ground-truth/auto-scan-badges.png"
              alt="Ground Truth badges appearing inline next to five Quran citations in a chat response"
              className="block w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-sm text-warm-gray">
            What the extension looks like right after step 3 - five citations, badges appearing
            inline, no copy-paste.
          </figcaption>
        </figure>
        <figure className="mt-10 m-0">
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guides/ground-truth/mismatch-tooltip-expanded.png"
              alt="Expanded tooltip showing exactly which word differs between the quoted Arabic and the real ayah"
              className="block w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-sm text-warm-gray">
            Click a mark to see why - a word-level diff against the licensed source.
          </figcaption>
        </figure>

        <div className="mt-10 max-w-2xl">
          <h3 className="font-semibold text-charcoal">What green, red, and amber mean</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-warm-gray list-disc list-inside">
            <li>
              <span className="text-charcoal font-medium">Reference validity</span> - does the
              cited surah:ayah exist (&ldquo;Quran 2:290&rdquo; doesn&rsquo;t - Al-Baqarah only
              runs to 286).
            </li>
            <li>
              <span className="text-charcoal font-medium">Arabic exact-match</span> - if Arabic is
              quoted, diffed against the licensed Tanzil Uthmani text.
            </li>
            <li>
              <span className="text-charcoal font-medium">Name/number mismatch</span> - a real
              ayah cited under a surah name that doesn&rsquo;t match the stated number.
            </li>
            <li>
              <span className="text-charcoal font-medium">Hadith wording</span> (MCP server only,
              today) - if a hadith&rsquo;s wording is quoted, checked live against
              HadeethEnc&rsquo;s public Hadith Encyclopedia; confirming the exact collection+number
              is a stub until a licensed source is available.
            </li>
            <li>
              <span className="text-charcoal font-medium">Does not</span> grade hadith
              authenticity, rule on fiqh, interpret tafsir, or score an English paraphrase - none
              of those are shipped, on purpose.
            </li>
          </ul>
        </div>
      </section>

      {/* get it - compact reference, not the main content */}
      <section className="mx-auto max-w-4xl px-6 py-12 border-t border-charcoal/10 bg-beige">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          Get it
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3 text-sm">
          <div>
            <h3 className="font-semibold text-charcoal">MCP server</h3>
            <pre className="mt-2 rounded-lg border border-charcoal/10 bg-charcoal text-cream text-xs p-3 overflow-x-auto">
npx -y @hududed/ground-truth-mcp
            </pre>
            <p className="mt-2 text-warm-gray">
              <a
                href="https://www.npmjs.com/package/@hududed/ground-truth-mcp"
                className="text-sage-dark underline hover:no-underline"
              >
                npmjs.com/package/@hududed/ground-truth-mcp
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">Browser extension</h3>
            <p className="mt-2 text-warm-gray leading-relaxed">
              Chrome Web Store: submitted, in developer-account verification. Load unpacked from
              source until it clears (Step 1 above).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">Source code</h3>
            <p className="mt-2 text-warm-gray">
              <a
                href="https://github.com/multimodeai/ground-truth"
                className="text-sage-dark underline hover:no-underline"
              >
                github.com/multimodeai/ground-truth
              </a>
            </p>
            <p className="mt-1 text-warm-gray">FSL-1.1-MIT licensed.</p>
          </div>
        </div>
      </section>

      {/* footer / honesty note */}
      <footer className="mx-auto max-w-4xl px-6 py-12 border-t border-charcoal/10 text-sm text-warm-gray">
        <p className="rounded-lg border border-dashed border-charcoal/20 p-4">
          <span className="font-semibold text-charcoal">Honesty note.</span> Quran text is
          Tanzil Project&rsquo;s licensed Uthmani text (tanzil.net), used with attribution.
          Hadith checking is half-shipped: wording is checked live via HadeethEnc today;
          confirming a specific collection-and-number reference still needs a licensed source not
          yet granted.
        </p>
        <p className="mt-4">
          Found a miss, or want to help wire up the next data source (sunnah.com, dorar.net)?{" "}
          <a
            href="https://github.com/multimodeai/ground-truth/issues/new/choose"
            className="text-sage-dark underline hover:no-underline"
          >
            Open an issue
          </a>
          , or email{" "}
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
