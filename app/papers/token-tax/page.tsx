import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Token Tax: measuring the ceiling on read-gating | Multimode AI",
  description:
    "A plugin reported ~90% token savings. An independent benchmark of a comparable tool measured cost rising 7.6%. Four repositories, one clean-room gate, and an upper bound on what read-gating can ever save: 0.022%-0.319%.",
  openGraph: {
    title: "The Token Tax: measuring the ceiling on read-gating",
    description:
      "Cache reads are 99.99%+ of input tokens in all four repositories measured. The best case for a read gate is under a third of one percent. One gate-induced round trip costs 6.2x the read it prevented.",
    url: "https://multimodeai.com/papers/token-tax",
    type: "article",
  },
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 leading-relaxed">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 text-xl font-semibold">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 text-base font-semibold">{children}</h3>
);
const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="border-b px-3 py-2 text-left text-sm font-semibold">{children}</th>
);
const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="border-b px-3 py-2 text-sm align-top">{children}</td>
);
const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 overflow-x-auto">
    <table className="w-full border-collapse">{children}</table>
  </div>
);
const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-black/5 px-1.5 py-0.5 text-[0.9em]">{children}</code>
);

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold leading-tight">
        The Token Tax: measuring the ceiling on read-gating in agentic coding
        sessions
      </h1>
      <p className="mt-3 text-sm opacity-70">
        Hud Wahab · Multimode AI · 15 September 2026
      </p>

      <H2>Abstract</H2>
      <P>
        A published Claude Code plugin reports token savings of roughly 90%
        (~96 million tokens) by intercepting whole-file reads and delegating
        them to a cheaper model. An independent JetBrains benchmark of a
        comparable third-party tool (<Code>rtk</Code>) measured end-to-end cost{" "}
        <strong>increasing by 7.6%</strong>. We reproduce the structural cause
        of this discrepancy on four production repositories using a clean-room
        size gate and a transcript-derived measurement tool.
      </P>
      <P>
        We find that read-gating is bounded far below the reported figure. Reads
        a gate would intercept represent <strong>2.8&ndash;7.7%</strong> of all
        reads, while cache reads &mdash; the prior conversation re-sent on every
        turn &mdash; represent{" "}
        <strong>
          over 99.99% of input-side tokens in all four repositories, with no
          exceptions
        </strong>
        . We introduce a <em>ceiling</em> metric: an upper bound on what a gate
        could save, computed from sessions already run and deliberately
        constructed to favour the gate. The ceiling is{" "}
        <strong>0.022%&ndash;0.319% of all tokens</strong>.
      </P>
      <P>
        Against this, we measure the cost of a single gate-induced round trip at{" "}
        <strong>6.2x the saving from the read it prevented</strong>. We identify
        the dominant cost driver as conversation length rather than file
        content: a query in a fresh session costs $0.07 versus $0.43 in an
        established one (<strong>6.6x</strong>), an effect that plateaus under
        context compaction rather than growing without bound.
      </P>
      <P>
        We conclude that self-reported savings counters and billed cost are not
        measuring the same quantity, and that the discrepancy is structural
        rather than a defect in either measurement. Tooling is released under
        MIT at{" "}
        <a
          className="underline"
          href="https://github.com/multimodeai/token-tax-kit"
        >
          github.com/multimodeai/token-tax-kit
        </a>
        .
      </P>

      <H2>1. Motivation</H2>
      <P>
        Token-reduction tooling for agentic coding assistants is typically
        evaluated by the tool&rsquo;s own counter: the tool estimates the tokens
        that <em>would have been</em> consumed absent its intervention, and
        reports the difference as savings.
      </P>
      <P>
        This is a counterfactual about a session that did not occur. The tool
        both generates the hypothesis and scores it. Where such figures have
        been checked against billed cost by independent parties, they have
        diverged &mdash; in the JetBrains case, in sign as well as magnitude.
      </P>
      <P>
        This paper asks a narrower and checkable question:{" "}
        <strong>
          for a size gate on file reads, what is the maximum possible saving,
          measured from sessions that actually happened?
        </strong>
      </P>

      <H2>2. Method</H2>

      <H3>2.1 Instruments</H3>
      <P>
        <strong>Size gate</strong> (<Code>hooks/size-gate.sh</Code>). A Claude
        Code <Code>PreToolUse</Code> hook on the <Code>Read</Code> tool.
        Clean-room reimplementation from described behaviour; no vendor source
        was consulted. In <Code>observe</Code> mode it logs what it would have
        intercepted and allows the read; in <Code>enforce</Code> mode it denies
        the read and instructs a targeted re-read. It never gates reads that
        already carry <Code>offset</Code>/<Code>limit</Code>, missing files,
        files at or under threshold, or binary files.
      </P>
      <P>
        <strong>Reporter</strong> (<Code>bin/token-tax</Code>). Node, zero
        dependencies. Parses Claude Code&rsquo;s own session transcripts, summing{" "}
        <Code>message.usage</Code> fields per assistant turn and classifying
        every <Code>Read</Code> tool call. By design it{" "}
        <strong>emits no savings figure</strong> &mdash; the critique motivating
        this work applies to our tooling as well.
      </P>

      <H3>2.2 Corpus</H3>
      <P>
        Four repositories in active use, chosen for stack diversity, not for
        result. Two are public and independently reproducible; two are shown but
        not re-runnable, and are reported in a separate trust tier for that
        reason.
      </P>
      <Table>
        <thead>
          <tr>
            <Th>Repo</Th>
            <Th>Stack</Th>
            <Th>Sessions</Th>
            <Th>Public</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>mm-cli</Td>
            <Td>TypeScript CLI</Td>
            <Td>8</Td>
            <Td>yes</Td>
          </tr>
          <tr>
            <Td>prowasl</Td>
            <Td>Supabase edge functions + Node/TS</Td>
            <Td>2</Td>
            <Td>no</Td>
          </tr>
          <tr>
            <Td>bayanlab</Td>
            <Td>Python</Td>
            <Td>1</Td>
            <Td>no</Td>
          </tr>
          <tr>
            <Td>kaya-editor</Td>
            <Td>JS/TS editor</Td>
            <Td>1</Td>
            <Td>yes</Td>
          </tr>
        </tbody>
      </Table>

      <H3>2.3 The ceiling metric</H3>
      <P>
        For each read the gate would have intercepted we compute two bounds.{" "}
        <strong>Counted once</strong> is the file&rsquo;s token cost charged one
        time, estimated at 4 characters per token; this under-counts, because
        content read into a session persists and is re-sent on subsequent turns.{" "}
        <strong>Counted every re-read</strong> adds a cache read of those tokens
        on every subsequent turn the file is plausibly still in context. The
        second is the strongest honest case <em>for</em> the gate.
      </P>
      <P>
        Two bounds keep it defensible: accumulation stops at a context reset (a
        turn whose cache-read volume falls below half the preceding turn&rsquo;s,
        indicating compaction), and stops if cached context is smaller than the
        file, since the file cannot reside in a context smaller than itself.
      </P>
      <P>
        <strong>Both bounds assume the gate is free</strong> &mdash; never
        refuses wrongly, never triggers a re-read, never adds a turn. This is
        false in practice. It is assumed deliberately, so the result is an upper
        bound rather than an estimate.
      </P>

      <H3>2.4 Pricing</H3>
      <P>
        Published list prices for Claude Opus 5 ($5/M input, $25/M output),
        verified 12 September 2026. Cache reads bill at 10% of input (verified).
        The cache-<em>write</em> multiplier was not independently verified and is
        exposed as a tunable parameter (default 1.25) rather than embedded as a
        constant. Models without verified published rates report token counts and
        no dollar figures.
      </P>

      <H2>3. Results</H2>

      <H3>3.1 Read gating is a small share of reads</H3>
      <P>
        On mm-cli the gate would intercept <strong>34 of 1,233</strong> reads
        (2.8%). Of the remainder, 513 were already targeted reads carrying{" "}
        <Code>offset</Code>/<Code>limit</Code>, which a gate ignores by design.
      </P>

      <H3>3.2 Cache reads dominate input-side tokens, universally</H3>
      <Table>
        <thead>
          <tr>
            <Th>Repo</Th>
            <Th>Gate-eligible reads</Th>
            <Th>Cache-read share of input tokens</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>mm-cli</Td>
            <Td>2.8%</Td>
            <Td>99.991%</Td>
          </tr>
          <tr>
            <Td>prowasl</Td>
            <Td>5.6%</Td>
            <Td>99.996%</Td>
          </tr>
          <tr>
            <Td>bayanlab</Td>
            <Td>4.3%</Td>
            <Td>100.000%</Td>
          </tr>
          <tr>
            <Td>kaya-editor</Td>
            <Td>7.7%</Td>
            <Td>99.999%</Td>
          </tr>
        </tbody>
      </Table>
      <P>
        The gate-eligible proportion varies by a factor of roughly 2.7 across
        repositories. The cache-read share does not vary meaningfully at all
        &mdash; a single-session repository is indistinguishable from an
        eight-session repository to four decimal places. We had predicted the
        opposite: that low-history repositories would show materially less
        re-sending. That prediction was wrong.
      </P>

      <H3>3.3 Tokens and dollars are differently distributed</H3>
      <P>
        On mm-cli, cache reads are about 96% of tokens but about 63% of cost;
        output tokens are about 0.22% of tokens but about 7.25% of cost. Any
        argument conducted purely in tokens is therefore not an argument about
        the invoice.
      </P>

      <H3>3.4 The ceiling</H3>
      <Table>
        <thead>
          <tr>
            <Th>Repo</Th>
            <Th>Counted once</Th>
            <Th>Counted every re-read</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>mm-cli</Td>
            <Td>0.0032%</Td>
            <Td>
              <strong>0.028%</strong>
            </Td>
          </tr>
          <tr>
            <Td>prowasl</Td>
            <Td>0.0094%</Td>
            <Td>
              <strong>0.059%</strong>
            </Td>
          </tr>
          <tr>
            <Td>bayanlab</Td>
            <Td>0.0030%</Td>
            <Td>
              <strong>0.022%</strong>
            </Td>
          </tr>
          <tr>
            <Td>kaya-editor</Td>
            <Td>0.0206%</Td>
            <Td>
              <strong>0.319%</strong>
            </Td>
          </tr>
        </tbody>
      </Table>
      <P>
        Even the bound constructed to favour the gate does not exceed one third
        of one percent in any repository.
      </P>
      <P>
        <strong>Threshold sensitivity.</strong> Loosening the threshold from 350
        to 100 lines on mm-cli raises intercepted reads from 35 to 178 (5.1x) and
        the ceiling from 0.028% to 0.069% (2.5x). The conclusion is insensitive
        to the threshold across this range.
      </P>

      <H3>3.5 The cost of enforcement</H3>
      <P>
        With the gate in <Code>enforce</Code> mode a denied read is recoverable
        &mdash; the model reissues a targeted read. Observed recovery, from
        transcripts: one denied full read followed by two ranged reads.{" "}
        <strong>Three round trips to obtain a file requested once.</strong> The
        complete file was ultimately read; the transfer was restructured, not
        avoided.
      </P>
      <Table>
        <thead>
          <tr>
            <Th>Quantity</Th>
            <Th>Value</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Mean context re-sent per turn (mm-cli)</Td>
            <Td>472,617 tokens</Td>
          </tr>
          <tr>
            <Td>Mean model output per turn</Td>
            <Td>1,630 tokens</Td>
          </tr>
          <tr>
            <Td>Mean intercepted file</Td>
            <Td>8,885 tokens</Td>
          </tr>
          <tr>
            <Td>Saving from blocking one file</Td>
            <Td>$0.0444</Td>
          </tr>
          <tr>
            <Td>Cost of one additional round trip</Td>
            <Td>$0.2771</Td>
          </tr>
          <tr>
            <Td>
              <strong>Ratio</strong>
            </Td>
            <Td>
              <strong>6.2x against</strong>
            </Td>
          </tr>
        </tbody>
      </Table>
      <P>
        This is a sufficient mechanism for an independently measured cost{" "}
        <em>increase</em>, without requiring the savings counter to be wrong
        about what it counts.
      </P>

      <H3>3.6 The dominant cost driver</H3>
      <Table>
        <thead>
          <tr>
            <Th>Position in session</Th>
            <Th>Mean cost per query</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Fresh (first 10 turns)</Td>
            <Td>$0.0653</Td>
          </tr>
          <tr>
            <Td>Established</Td>
            <Td>$0.4299</Td>
          </tr>
          <tr>
            <Td>
              <strong>Ratio</strong>
            </Td>
            <Td>
              <strong>6.6x</strong>
            </Td>
          </tr>
        </tbody>
      </Table>
      <P>
        <strong>This effect does not compound indefinitely.</strong> Cost per
        query in the final fifth of a session is only 1.1x the first fifth
        &mdash; compaction bounds context growth. The increase is front-loaded
        and then plateaus. We flag this explicitly because the intuitive model
        (longer session &rarr; monotonically rising per-query cost) is wrong, and
        we initially held it.
      </P>

      <H2>4. Errors made and corrected</H2>
      <P>
        Reported because the paper&rsquo;s claim is about measurement discipline.
      </P>
      <P>
        <strong>Binary line-counting.</strong> An early reporter counted newline{" "}
        <em>bytes</em> in binary files, reporting the five largest intercept
        candidates as four photographs and a PDF. Corrected via{" "}
        <Code>file --mime-encoding</Code>; the honest count fell from 98 to 34. A
        first attempt using a NUL-byte grep returned inverted results on macOS.
      </P>
      <P>
        <strong>Unbounded persistence.</strong> The first &ldquo;counted every
        re-read&rdquo; implementation assumed a read file remains in context for
        the remainder of the session, producing $722 &mdash; 47% of billed cost.
        This ignores compaction. Bounding at context resets yielded $13.56, a 53x
        correction, in the direction that weakened our thesis.
      </P>
      <P>
        <strong>Unvalidated hook output.</strong> The gate initially emitted{" "}
        <Code>{`{"decision":"block",...}`}</Code>, verified by piping JSON to the
        script by hand. Claude Code rejects that schema; the correct form wraps{" "}
        <Code>permissionDecision</Code> in <Code>hookSpecificOutput</Code>. The
        rejected hook <strong>failed open</strong> &mdash; reads proceeded.
        Piping into a script validates the script, not the integration.
      </P>
      <P>
        <strong>Silent observe mode.</strong> Observe mode logged and allowed
        with no session-visible output, making correct operation
        indistinguishable from a failed hook. It now emits a message on every
        would-be interception.
      </P>
      <P>
        <strong>Permission widening.</strong> The gate&rsquo;s allow path
        initially emitted <Code>permissionDecision: &quot;allow&quot;</Code>,
        which does not mean &ldquo;do not block&rdquo; &mdash; it auto-approves,
        bypassing the permission prompt the user would otherwise receive. A
        measurement instrument must not widen permissions as a side effect of
        observation. It now exits silently.
      </P>

      <H2>5. Discussion</H2>
      <P>
        <strong>The two numbers measure different things.</strong> A savings
        counter measures tokens not transmitted under an assumed counterfactual.
        An invoice measures tokens actually billed. These coincide only when the
        intervention has no second-order effects. Read-gating has a large one:
        denial induces additional turns, and each turn re-transmits the full
        conversation. Reported token savings and observed cost increase are
        therefore both consistent and both correct.
      </P>
      <P>
        <strong>Why the target is small.</strong> Input-side tokens in agentic
        sessions are dominated &mdash; to better than 99.99% in every repository
        measured &mdash; by re-transmission of accumulated conversation. File
        reads are a minor and non-recurring contributor. An intervention confined
        to file reads addresses under 0.32% of the total in the best case.
      </P>

      <H2>6. Limitations</H2>
      <P>
        <strong>This is not a refutation of the published savings figure.</strong>{" "}
        Delegating a large read to a cheaper model plausibly does avoid most of
        those tokens; that claim may be accurate for the workload on which it was
        measured. What we measured is a different question: how often that arises
        on these machines, and how much of the bill it could touch.
      </P>
      <P>
        Nor is it a general claim about gating. It is four repositories, one
        machine, one assistant, one pricing regime, over a bounded period. Two of
        the four are independently checkable; two are not. Token counts for files
        are estimated at 4 characters per token, not tokenised exactly. The
        cache-write multiplier is assumed, not verified.
      </P>
      <P>
        Whether carrying conversation history is <em>worth</em> 6.6x per query is
        a judgement about the work being done, and this paper does not answer it.
        It establishes the price.
      </P>

      <H2>7. Reproduction</H2>
      <P>
        The public repositories in our corpus are{" "}
        <Code>multimodeai/mm-cli</Code> and <Code>multimodeai/kaya-editor</Code>.
        Results on those are directly checkable.
      </P>
      <pre className="mt-6 overflow-x-auto rounded bg-black/5 p-4 text-sm">
        {`git clone https://github.com/multimodeai/token-tax-kit
cd token-tax-kit
chmod +x hooks/size-gate.sh bin/token-tax

./bin/token-tax report  --project /path/to/your/repo
./bin/token-tax ceiling --project /path/to/your/repo

# real before/after:
./bin/token-tax snapshot before.json
#   ... enable the gate, do comparable work ...
./bin/token-tax snapshot after.json
./bin/token-tax compare before.json after.json`}
      </pre>
      <P>
        <Code>compare</Code> reports change in turn count alongside change in
        tokens. A token reduction accompanied by a turn increase is the failure
        mode this paper describes.
      </P>
      <P>
        MIT licensed. We are specifically interested in counter-examples:
        repositories where the ceiling is materially higher. Four is a small n.
      </P>

      <H2>Related</H2>
      <P>
        Step-by-step instructions for running this on your own repository:{" "}
        <a className="underline" href="/guides/token-tax">
          the guide
        </a>
        . The narrative version:{" "}
        <a className="underline" href="https://multimodeai.substack.com">
          the Substack
        </a>
        .
      </P>
    </main>
  );
}
