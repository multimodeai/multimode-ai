import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Measure What a Read Gate Could Actually Save You | Multimode AI",
  description:
    "Step-by-step: install a size gate on Claude Code's Read tool, measure your own sessions from their transcripts, and compute the ceiling - the most a gate could ever save you - before you decide to enforce anything.",
  openGraph: {
    title: "Measure What a Read Gate Could Actually Save You",
    description:
      "Ten steps: read your own token numbers, compute the ceiling, test your threshold, run the gate in observe mode, and do the break-even arithmetic before enforcing.",
    url: "https://multimodeai.com/guides/token-tax",
    type: "article",
  },
};

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="text-sm bg-charcoal/5 px-1.5 py-0.5 rounded">{children}</code>
);
const Pre = ({ children }: { children: React.ReactNode }) => (
  <pre className="mt-5 overflow-x-auto rounded-lg bg-charcoal/5 p-4 text-sm leading-relaxed">
    {children}
  </pre>
);
const Step = ({
  n,
  of,
  title,
  children,
}: {
  n: number;
  of: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
    <p className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
      step {n} of {of}
    </p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
    <div className="mt-5 max-w-2xl text-warm-gray leading-relaxed">{children}</div>
  </section>
);

export default function TokenTaxGuide() {
  return (
    <main className="bg-cream text-charcoal">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10">
        <a
          href="/guides"
          className="text-sm text-warm-gray hover:text-sage-dark transition-colors"
        >
          ← Guides
        </a>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sage-dark font-medium">
          token tax · measurement guide
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
          Measure what a read gate{" "}
          <span className="text-sage-dark italic">could actually save you</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          Fifteen minutes. You need Claude Code, Node, and <C>jq</C> &mdash; you
          already have all three if Claude Code runs.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-warm-gray">
          Why this matters, and what measuring four of my own repos revealed →{" "}
          <a
            href="https://multimodeai.substack.com"
            className="text-sage-dark underline hover:no-underline"
          >
            the newsletter
          </a>
          . The method and full results →{" "}
          <a
            href="/papers/token-tax"
            className="text-sage-dark underline hover:no-underline"
          >
            the paper
          </a>
          . The tool →{" "}
          <a
            href="https://github.com/multimodeai/token-tax-kit"
            className="text-sage-dark underline hover:no-underline"
          >
            token-tax-kit
          </a>
          .
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 border-t border-charcoal/10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          what you&rsquo;ll end up with
        </h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          Four numbers from your own machine: what your sessions actually cost,
          what share of your reads a size gate would intercept, the ceiling on
          what blocking them could ever save, and the break-even point where a
          wrongly-refused read costs more than the gate saves. Then a decision
          you can defend either way.
        </p>
      </section>

      <Step n={1} of={10} title="Install">
        <Pre>{`git clone https://github.com/multimodeai/token-tax-kit
cd token-tax-kit
chmod +x hooks/size-gate.sh bin/token-tax`}</Pre>
        <p className="mt-5">No dependencies to install.</p>
      </Step>

      <Step n={2} of={10} title="Read your own numbers first">
        <p>Before installing any hook, look at what your sessions already cost.</p>
        <Pre>{`./bin/token-tax report --project /path/to/your/repo`}</Pre>
        <p className="mt-5">Track four fields:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5">
          <li>
            <C>cache read</C> &mdash; the conversation re-sent every turn
          </li>
          <li>
            <C>input</C> &mdash; genuinely new content
          </li>
          <li>
            <C>over threshold</C> &mdash; reads a gate would intercept
          </li>
          <li>
            <C>targeted</C> &mdash; reads already using offset/limit, which a
            gate ignores
          </li>
        </ul>
        <p className="mt-5">
          Divide <C>cache read</C> by the sum of all four token lines. On four
          measured repos this was above 99.99% every time.
        </p>
      </Step>

      <Step n={3} of={10} title="Get the ceiling">
        <Pre>{`./bin/token-tax ceiling --project /path/to/your/repo`}</Pre>
        <p className="mt-5">
          Two numbers print. Use the <strong>second</strong> &mdash; labelled{" "}
          <C>counted every re-read</C>, with an arrow reading{" "}
          <C>&lt;-- THE GENEROUS ONE</C>. It is the bound that favours the gate.
          Record the percentage and the dollar figure below it.
        </p>
      </Step>

      <Step n={4} of={10} title="Test whether your threshold matters">
        <Pre>{`./bin/token-tax ceiling --project /path/to/your/repo --threshold 100
./bin/token-tax ceiling --project /path/to/your/repo --threshold 700`}</Pre>
        <p className="mt-5">
          If the ceiling stays in the same order of magnitude across all three,
          your result does not depend on where you drew the line. Record all
          three.
        </p>
      </Step>

      <Step n={5} of={10} title="Install the gate in observe mode">
        <p>
          Create or edit <C>.claude/settings.local.json</C> in your repo. Use
          absolute paths.
        </p>
        <Pre>{`{
  "env": {
    "TOKEN_TAX_MODE": "observe",
    "TOKEN_TAX_MIN_LINES": "350",
    "TOKEN_TAX_LOG": "/absolute/path/to/your/home/.token-tax/gate-log.jsonl"
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read",
        "hooks": [
          {
            "type": "command",
            "command": "/absolute/path/to/token-tax-kit/hooks/size-gate.sh"
          }
        ]
      }
    ]
  }
}`}</Pre>
        <p className="mt-5">
          <strong>
            Add <C>.claude/settings.local.json</C> to your <C>.gitignore</C>.
          </strong>{" "}
          It contains machine-specific absolute paths. <C>observe</C> never
          blocks &mdash; it logs what it would have blocked and prints a line
          in-session when it fires.
        </p>
      </Step>

      <Step n={6} of={10} title="Work normally for a day, then read the log">
        <Pre>{`cat ~/.token-tax/gate-log.jsonl`}</Pre>
        <p className="mt-5">
          Each line is one read the gate would have intercepted, with its line
          count. Count them against your total reads from step 2.
        </p>
      </Step>

      <Step n={7} of={10} title="Do the break-even arithmetic before you enforce">
        <ol className="space-y-3 list-decimal pl-5">
          <li>
            <strong>Ceiling in dollars</strong> &mdash; from step 3. The most
            you can win.
          </li>
          <li>
            <strong>Cost of one wrong refusal</strong> &mdash;{" "}
            <C>
              (avg cache read per turn &divide; 1,000,000 &times; input rate
              &times; 0.1) + (avg output per turn &divide; 1,000,000 &times;
              output rate)
            </C>
            . Both averages are <C>report</C> totals divided by{" "}
            <C>assistant msgs</C>.
          </li>
          <li>
            <strong>Break-even</strong> &mdash; divide (1) by (2). That is how
            many wrong refusals per month wipe out your best case.
          </li>
        </ol>
        <p className="mt-5">
          If the break-even number is small, enforcing will cost you more than it
          saves.
        </p>
      </Step>

      <Step n={8} of={10} title="If you enforce, verify it in a live session">
        <p>
          Change <C>TOKEN_TAX_MODE</C> to <C>enforce</C> and save. In a Claude
          Code session in that repo, ask it to read a file you know is over your
          threshold. Two checks:
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5">
          <li>
            The gate must return a refusal, <strong>not</strong>{" "}
            <C>Hook JSON output validation failed</C>. That error means the hook
            is being rejected and reads are proceeding anyway.
          </li>
          <li>
            A read of the same file with an offset and limit must still go
            through.
          </li>
        </ul>
        <p className="mt-5">
          The refusal is easy to miss on screen &mdash; it passes quickly and the
          assistant recovers on its own. Confirm from the log rather than by eye:
        </p>
        <Pre>{`tail -3 ~/.token-tax/gate-log.jsonl`}</Pre>
        <p className="mt-5">
          The <C>mode</C> field on the newest line must read <C>enforce</C>.
        </p>
      </Step>

      <Step n={9} of={10} title="Measure the real before/after">
        <Pre>{`# gate off, after a normal working session:
./bin/token-tax snapshot before.json --project /path/to/your/repo

# turn the gate on, do comparable work, then:
./bin/token-tax snapshot after.json --project /path/to/your/repo

./bin/token-tax compare before.json after.json`}</Pre>
        <p className="mt-5">
          <strong>
            Read the <C>assistant msgs</C> row first.
          </strong>{" "}
          If turn count rose, a token saving on reads is being paid for in round
          trips. That row is the point of the command.
        </p>
      </Step>

      <Step n={10} of={10} title="Report a counter-example">
        <p>
          If your ceiling comes out materially above 0.32%, open an issue on{" "}
          <a
            href="https://github.com/multimodeai/token-tax-kit/issues"
            className="text-sage-dark underline hover:no-underline"
          >
            the repo
          </a>{" "}
          with your <C>ceiling</C> output and your stack. Four repositories is a
          small sample.
        </p>
      </Step>

      <section className="mx-auto max-w-4xl px-6 py-14 border-t border-charcoal/10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-sage-dark font-semibold">
          interpreting your numbers
        </h2>
        <p className="mt-5 max-w-2xl text-warm-gray leading-relaxed">
          Five prompts for reading your own output and auditing any tool&rsquo;s
          savings claim before you install it &mdash;{" "}
          <a
            href="https://multimodeai.com/promptkit/0f696867-7c29-48c9-aa26-af587b7c5fab?t=eyJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoiMGY2OTY4NjctN2MyOS00OGM5LWFhMjYtYWY1ODdiN2M1ZmFiIiwiaWF0IjoxNzg5NDExNDU4LCJleHAiOjE3OTcxODc0NTh9.7Y0yalvUhtT3PTGgT0ywcaLEBZlL7HlcgALybL_FHp4"
            className="text-sage-dark underline hover:no-underline"
          >
            grab them free
          </a>
          .
        </p>
      </section>
    </main>
  );
}
