import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What AI models actually read on your page | Multimode AI",
  description:
    "A controlled test of which parts of a webpage five AI models retain: JSON-LD structured data, meta tags, or visible body text. Two pages, three facts, one rotation, one control.",
  openGraph: {
    title: "What AI models actually read on your page",
    description:
      "Two pages, three facts, four models. JSON-LD retained 0 of 4. Visible body text retained 4 of 4. The facts swapped results when they swapped channels.",
    url: "https://multimodeai.com/papers/what-ai-models-read",
    type: "article",
  },
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 leading-relaxed">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 text-xl font-semibold">{children}</h2>
);
const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="border-b px-3 py-2 text-left text-sm font-semibold">{children}</th>
);
const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="border-b px-3 py-2 text-sm align-top">{children}</td>
);

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold leading-tight">
        What AI models actually read on your page
      </h1>
      <p className="mt-3 text-sm opacity-70">
        Hud Wahab · Multimode AI · 28 August 2026
      </p>

      <H2>Abstract</H2>
      <P>
        Guidance on making a website legible to AI assistants overwhelmingly
        recommends structured data, usually schema.org JSON-LD. This paper tests
        whether models retain it. Three true facts about one artwork were placed
        on a live page, one fact per encoding channel: JSON-LD, named meta tags
        including Open Graph and Twitter Card, and visible body text. Five
        assistants were asked to read the page and report what they found. A
        second page rotated two of the facts between channels while holding the
        third fixed as a control.
      </P>
      <P>
        Across four models that successfully fetched the pages, facts placed in
        JSON-LD were retained 0 times out of 4. Facts placed in visible body text
        were retained 4 times out of 4. Facts placed in meta tags were retained 1
        time out of 4. When two facts swapped channels, their retention rates
        swapped with them, while the control fact, which never changed channel,
        did not change score. A fifth assistant could not fetch a URL at all.
      </P>

      <H2>1. Background</H2>
      <P>
        A 2026 paper on rank manipulation in web-augmented language models, SIREN
        (arXiv 2607.21951), notes in its methods section that Anthropic&apos;s{" "}
        <code>web_fetch</code> tool preserves head metadata as{" "}
        <code>meta-name:</code> lines but strips JSON-LD blocks. The observation
        is incidental to that paper&apos;s argument and is scoped to one tool at
        one version. This test asks whether the behaviour generalises.
      </P>

      <H2>2. Method</H2>
      <P>
        Two pages were published on a domain the author controls. Neither URL had
        previously been crawled, so no fact could arrive from training data.
      </P>
      <P>
        Each page carried three true, page-unique facts about the same
        photograph, one per channel. Channel isolation was verified against the
        served HTML rather than the source, confirming each fact appeared in
        exactly one channel.
      </P>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Th>Fact</Th>
              <Th>Page I channel</Th>
              <Th>Page II channel</Th>
            </tr>
            <tr>
              <Td>Location: Sultan Salahuddin Abdul Aziz Shah Mosque, Shah Alam</Td>
              <Td>JSON-LD</Td>
              <Td>visible body text</Td>
            </tr>
            <tr>
              <Td>Medium: archival photographic print, made a weekday after Eid</Td>
              <Td>visible body text</Td>
              <Td>JSON-LD</Td>
            </tr>
            <tr>
              <Td>Edition: 20 hand-numbered prints, one shared pool across sizes</Td>
              <Td>meta / OG / Twitter</Td>
              <Td>meta / OG / Twitter (control)</Td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Each assistant received one identical instruction: &ldquo;Read [url] and
        tell me everything you can about this artwork.&rdquo; No follow-ups, no
        clarification, no nudging. Responses were scored for the presence of each
        fact. The models tested were Claude, ChatGPT, DeepSeek, Kimi and GLM.
      </P>

      <H2>3. Results</H2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Th>Channel</Th>
              <Th>Page I</Th>
              <Th>Page II</Th>
            </tr>
            <tr>
              <Td>Visible body text</Td>
              <Td>4 of 4</Td>
              <Td>4 of 4</Td>
            </tr>
            <tr>
              <Td>Named meta tags (control)</Td>
              <Td>1 of 4</Td>
              <Td>1 of 4</Td>
            </tr>
            <tr>
              <Td>JSON-LD</Td>
              <Td>0 of 4</Td>
              <Td>0 of 4</Td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        The rotation is the load-bearing result. The location fact moved from
        JSON-LD to visible text and went from 0 of 4 to 4 of 4. The medium fact
        moved from visible text to JSON-LD and went from 4 of 4 to 0 of 4. The
        edition fact never changed channel and never changed score. Retention
        followed the channel, not the fact.
      </P>
      <P>
        Only one model, Claude, retained anything from the meta channel, on both
        pages. Three models worked exclusively from visible body text. GLM
        returned no page content on either page and on two versions, 5.2 and 5.3,
        stating explicitly that it cannot browse; its trials are excluded rather
        than scored as failures to retain.
      </P>

      <H2>4. An incidental finding</H2>
      <P>
        Unprompted, Claude reported that the page&apos;s metadata contained the
        terms &ldquo;SBIR&rdquo;, &ldquo;federal funding&rdquo; and &ldquo;grant
        compliance&rdquo;, and flagged them as unrelated to the artwork. This was
        correct. A site-wide <code>keywords</code> array in the application
        layout was being stamped onto every page, including pages about
        photographs. No other model mentioned it, which is consistent with only
        Claude reading that channel.
      </P>
      <P>
        The finding is minor but instructive: the one channel that a model did
        read was the channel the author had never inspected.
      </P>

      <H2>5. Limitations</H2>
      <P>
        <strong>
          This measures retention, not retrieval, and the distinction is the most
          important thing in this paper.
        </strong>{" "}
        In every trial the model was handed a URL and instructed to read it. That
        supplies the source. It says nothing about whether any model would reach
        the page unprompted. SIREN scopes itself the same way, stating that
        whether an edit &ldquo;survives retrieval, reranking, filtering, or
        transformation in a live server-side web-search pipeline is outside this
        evaluation.&rdquo;
      </P>
      <P>
        Writing facts in visible prose is therefore necessary but not sufficient.
        On a separate test, nine buyer-intent prompts describing this same
        artwork in detail, including the mosque by name, returned the author&apos;s
        site zero times across five models, despite every one of those facts
        already being present in visible body text on the live product page.
      </P>
      <P>
        Further limitations: four valid models is a small sample; two models
        referenced content from the first page while reading the second, which
        suggests session carryover, though both explicitly distinguished what the
        page itself contained; one model supplemented with live web search rather
        than reading only the supplied page; and facts differ in intrinsic
        salience, which the rotation controls for but does not eliminate.
      </P>

      <H2>6. What this means if you ship a website</H2>
      <P>
        If a fact matters and it lives only in structured data, treat it as
        absent. Put every load-bearing claim in prose a person could read. Meta
        tags are worth setting correctly, but only one of five assistants tested
        here read them, so they should not carry anything essential on their own.
      </P>
      <P>
        Audit what your framework injects site-wide. A global keywords array
        written for one part of a business will appear on every page of it.
      </P>
      <P>
        And do not mistake this result for a discoverability fix. It tells you
        what survives once a model is already looking at your page. Getting it to
        look is a different and harder problem.
      </P>

      <H2>References</H2>
      <P>
        Caville, E., Kayser, S., Layeghy, S., Sung, B., Dolnicar, S., Portmann,
        M. (2026). SIREN: PAIR-Driven Preference Manipulation in Web-RAG
        Recommenders. <a className="underline" href="https://arxiv.org/abs/2607.21951">arXiv:2607.21951</a>.
      </P>
      <P>
        Zhang, T., Triedman, H., Shmatikov, V. (2026). Deep-Research Agents Can
        Be Poisoned via User-Generated Content. <a className="underline" href="https://arxiv.org/abs/2605.24245">arXiv:2605.24245</a>.
      </P>
      <P>
        Zhu, P., Li, L., Yang, L., Su, S., Shao, J. (2026). Is Deep Research
        Reliable? Misleading Knowledge Induces False Conclusions.{" "}
        <a className="underline" href="https://arxiv.org/abs/2607.20891">arXiv:2607.20891</a>.
      </P>
    </main>
  );
}
