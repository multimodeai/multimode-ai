import type { Metadata } from "next";

const R2 = "https://pub-51e7ecd47a73445c86f602cbae7029dd.r2.dev/guides/kaya-editor";

export const metadata: Metadata = {
  title: "Kaya Editor — Review an agent's work in your browser | Multimode AI",
  description:
    "Step-by-step guide: install Kaya, open an agent-written plan in your browser, annotate specific lines, and send the notes back as structured feedback. Runs entirely on your machine.",
  openGraph: {
    title: "Kaya Editor — Review an agent's work in your browser",
    description:
      "Install Kaya, open an agent-written artifact, annotate it, and hand the notes back to the agent. Local only, no account, no upload.",
    url: "https://multimodeai.com/guides/kaya-editor",
    type: "article",
  },
};

function Step({
  n,
  of,
  title,
  children,
}: {
  n: number;
  of: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
      <p className="text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
        step {n} of {of}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-4 rounded-lg border border-charcoal/10 bg-charcoal text-cream text-xs p-4 overflow-x-auto">
{children}
    </pre>
  );
}

function Shot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="mt-10 m-0">
      <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-[#0b0f16]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto" />
      </div>
      <figcaption className="mt-3 text-sm text-warm-gray">{caption}</figcaption>
    </figure>
  );
}

export default function KayaEditorGuide() {
  const TOTAL = 8;

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
          kaya editor · local review surface
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Stop reviewing plans{" "}
          <span className="text-sage-dark italic">in a terminal.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          An agent writes a plan, a spec, a report. Kaya serves that file as a page you can
          actually look at, lets you attach notes to specific parts of it, and hands those notes
          back to the agent as structured feedback. Everything runs on your machine - no account,
          no upload, no third-party host.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-warm-gray">
          Why I built it instead of using something else →{" "}
          <a
            href="https://multimodeai.substack.com"
            className="text-sage-dark underline hover:no-underline"
          >
            read the full newsletter post
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-warm-gray">
          Requires Node 22 or newer. Zero runtime dependencies.
        </p>
      </section>

      <Step n={1} of={TOTAL} title="Install">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          One global install. It gives you the <code>kaya</code> command.
        </p>
        <Code>npm i -g kaya-editor</Code>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">Check it landed:</p>
        <Code>kaya --help</Code>
      </Step>

      <Step n={2} of={TOTAL} title="Open a review">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Point it at any HTML or Markdown file. It prints a local URL and opens your browser.
        </p>
        <Code>{`kaya plan.html

Kaya serving /path/to/plan.html at http://127.0.0.1:57749/`}</Code>
        <Shot
          src={`${R2}/01-overview.png`}
          alt="A launch plan rendered in Kaya, with the Annotate toggle in the top bar and the Conversation panel on the right"
          caption="The page on the left is your artifact, unmodified. The top bar and the right-hand panel are Kaya's, injected at serve time. Your file on disk is never rewritten."
        />
      </Step>

      <Step n={3} of={TOTAL} title="Know what you get styled, and what you don't">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          This catches people out on their first HTML artifact.
        </p>
        <ul className="mt-4 max-w-2xl space-y-3 text-warm-gray leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-charcoal">Markdown</strong> is rendered by Kaya to a dark
            themed page. Typography, tables, code blocks and spacing come free. Your source file is
            never modified, so anything that parses the raw Markdown keeps working.
          </li>
          <li>
            <strong className="text-charcoal">HTML</strong> is served exactly as authored. Kaya
            themes its own chrome, not your document. An HTML file with no CSS renders as unstyled
            browser default: Times serif, borderless tables, text running edge to edge.
          </li>
        </ul>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          If you are asking an agent for an HTML artifact, tell it to include a{" "}
          <code>&lt;style&gt;</code> block. If you do not care about styling, ask for Markdown and
          let Kaya theme it.
        </p>
      </Step>

      <Step n={4} of={TOTAL} title="Annotate">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Flip <strong className="text-charcoal">Annotate</strong> on in the top bar. Then either
          click an element - a heading, a paragraph, a table row, a diagram node - or select text
          inside a paragraph to comment on that phrase specifically.
        </p>
        <Shot
          src={`${R2}/06-note-typed.png`}
          alt="Annotate mode on, a paragraph boxed in orange, and a composer showing the targeted text with a note being typed"
          caption="The composer quotes what you targeted, so you can confirm you hit the right thing before writing the note."
        />
        <p className="mt-6 max-w-2xl text-warm-gray leading-relaxed">
          Press <strong className="text-charcoal">Queue</strong> to stage it. Keyboard:{" "}
          <strong className="text-charcoal">Enter</strong> queues,{" "}
          <strong className="text-charcoal">⌘ + Enter</strong> sends the whole batch immediately.
        </p>
        <Shot
          src={`${R2}/07-queued.png`}
          alt="Queued notes collapsed to single lines above the send buttons"
          caption="Notes collapse to one line each. Hover to see the full text and its target. They go back as one batch, not one message per note."
        />
        <p className="mt-6 max-w-2xl text-warm-gray leading-relaxed">
          Queued notes survive a reload. They are staged in session storage and restored
          automatically, so a refresh or an accidental back-button does not destroy what you typed.
          Staging clears only after a send succeeds.
        </p>
      </Step>

      <Step n={5} of={TOTAL} title="Send, and run the loop">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          <strong className="text-charcoal">Send to Agent</strong> delivers the batch and keeps the
          review open. <strong className="text-charcoal">Send &amp; End</strong> delivers it and
          closes the review.
        </p>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          On the agent side, this is the blocking half. It waits until you send something:
        </p>
        <Code>{`kaya poll plan.html --agent-reply "Rewrote the risk table, dropped the unverified claim."`}</Code>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          The reply text appears in the Conversation panel, so you see what changed before you read
          the revision. Each agent reply is badged with its round number and the thread persists
          across rounds. When the agent rewrites the file, the open tab live-reloads in place - you
          do not reopen anything.
        </p>
      </Step>

      <Step n={6} of={TOTAL} title="Ask the reviewer a typed question">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Rather than asking a question in prose and parsing the answer, an artifact can declare a
          control and Kaya renders it:
        </p>
        <Code>{`<div data-kaya-ask="copy"
     data-kaya-label="How should the unverified claim be handled?"
     data-kaya-options="delete it|rewrite as edition note|leave and flag"></div>`}</Code>
        <Shot
          src={`${R2}/03-ask-widget.png`}
          alt="A rendered question control with three clickable options inside the artifact"
          caption="Clicking an option queues [ask] copy = rewrite as edition note. The answer comes back typed, so the agent never has to interpret a sentence."
        />
      </Step>

      <Step n={7} of={TOTAL} title="Diagrams, zoom and layout checks">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Put Mermaid in a fenced <code>mermaid</code> block (Markdown) or{" "}
          <code>&lt;pre class=&quot;mermaid&quot;&gt;</code> (HTML). Kaya renders it dark themed
          and hand drawn.
        </p>
        <Shot
          src={`${R2}/02-mermaid.png`}
          alt="A Mermaid flowchart rendered dark and hand-drawn inside the artifact, with a decision diamond and labelled edges"
          caption="Rendered server-side, so it looks the same in the exported copy."
        />
        <p className="mt-6 max-w-2xl text-warm-gray leading-relaxed">
          Hover any diagram, image or SVG for a zoom control. Wheel to zoom, drag to pan. With
          Annotate on, clicking a node inside the zoom comments on that node, not the whole
          diagram. Zoom is a hover affordance rather than a click, deliberately, so it never
          competes with annotating.
        </p>
        <Shot
          src={`${R2}/08-zoom-control.png`}
          alt="A zoom affordance appearing over a diagram on hover"
          caption="Hover to zoom. Click a node inside it, with Annotate on, to comment on that box specifically."
        />
        <p className="mt-6 max-w-2xl text-warm-gray leading-relaxed">
          The top bar carries a live count of layout problems and flags when the page scrolls
          sideways. Containers that scroll on purpose - a wide table you wrapped in{" "}
          <code>overflow-x: auto</code> - are not flagged. It reports real breakage, not intentional
          design.
        </p>
      </Step>

      <Step n={8} of={TOTAL} title="Export, end, reopen">
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Export a standalone copy from the ⋮ menu, or from the terminal:
        </p>
        <Code>kaya export plan.html --out plan-standalone.html</Code>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          Local assets are inlined - CSS, fonts, local scripts, and the vendored Mermaid runtime -
          so the result opens with no Kaya server running and no sibling files. Remote CDN
          references stay as links, so those still need network.
        </p>
        <p className="mt-6 max-w-2xl text-warm-gray leading-relaxed">
          Ending and stopping:
        </p>
        <Code>{`kaya end plan.html     # end it as the agent
kaya stop plan.html    # stop that one server
kaya stop              # stop all of them
kaya list              # show active sessions`}</Code>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          One asymmetry worth knowing: if <strong className="text-charcoal">you</strong> end a
          review from the browser, a plain <code>kaya &lt;file&gt;</code> refuses to reopen it and
          says why. An agent cannot wander back into a review you closed - it has to be asked.
        </p>
        <Code>kaya plan.html --reopen</Code>
        <p className="mt-4 max-w-2xl text-warm-gray leading-relaxed">
          An agent ending its own turn does not lock you out.
        </p>
      </Step>

      {/* command reference */}
      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <h2 className="text-3xl font-bold tracking-tight">Command reference</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/15">
                <th className="text-left font-semibold py-2 pr-6">Command</th>
                <th className="text-left font-semibold py-2">What it does</th>
              </tr>
            </thead>
            <tbody className="text-warm-gray">
              {[
                ["kaya <file>", "Open or resume a review"],
                ["kaya <file> --reopen", "Reopen a review you ended"],
                ["kaya poll <file> [--agent-reply \"...\"]", "Block until feedback or end"],
                ["kaya export <file> [--out <path>]", "Write a standalone HTML copy"],
                ["kaya end <file>", "End the review as the agent"],
                ["kaya list", "Show active sessions"],
                ["kaya stop [file]", "Stop one server, or all"],
              ].map(([cmd, desc]) => (
                <tr key={cmd} className="border-b border-charcoal/10">
                  <td className="py-2 pr-6 font-mono text-xs text-charcoal whitespace-nowrap">
                    {cmd}
                  </td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-sm text-warm-gray">
          Kaya serves your file through a local server rooted at that file&apos;s own directory. Put
          images, CSS and fonts next to the artifact and reference them with relative paths, never a
          leading slash.
        </p>
      </section>

      {/* close */}
      <section className="mx-auto max-w-4xl px-6 py-16 border-t border-charcoal/10">
        <p className="max-w-2xl text-warm-gray leading-relaxed">
          The store this was used to build is at{" "}
          <a
            href="https://hudphoto.com"
            className="text-sage-dark underline hover:no-underline"
          >
            hudphoto.com
          </a>
          . The reasoning behind the whole rebuild, and what happened when I asked five AI models to
          find it, is in{" "}
          <a
            href="https://multimodeai.substack.com"
            className="text-sage-dark underline hover:no-underline"
          >
            the newsletter
          </a>
          .
        </p>
      </section>
    </main>
  );
}
