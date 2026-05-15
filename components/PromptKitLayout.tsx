import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  content: string;
};

export default function PromptKitLayout({ title, content }: Props) {
  return (
    <main className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <a
            href="https://multimodeai.com"
            className="text-warm-gray text-sm hover:text-charcoal transition-colors"
          >
            multimode ai
          </a>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mt-3">
            {title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_18rem] gap-12 lg:gap-16">
          <article className="min-w-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-5 first:mt-0">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-4">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="text-lg font-medium mt-8 mb-3">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="text-warm-gray leading-relaxed mb-5">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-5 space-y-2 text-warm-gray leading-relaxed">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-5 space-y-2 text-warm-gray leading-relaxed">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="pl-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-sage pl-5 my-6 italic text-warm-gray">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) => {
                  const isBlock = className?.startsWith("language-");
                  if (isBlock) {
                    return (
                      <code className={`${className} block`}>{children}</code>
                    );
                  }
                  return (
                    <code className="bg-beige text-charcoal px-1.5 py-0.5 text-[0.9em] rounded-sm">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-beige border border-warm-gray/15 rounded-sm p-4 overflow-x-auto text-sm leading-relaxed mb-5 whitespace-pre-wrap">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="text-left font-medium border-b border-warm-gray/30 px-3 py-2">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-warm-gray/15 px-3 py-2 text-warm-gray align-top">
                    {children}
                  </td>
                ),
                hr: () => <hr className="border-warm-gray/20 my-10" />,
                strong: ({ children }) => (
                  <strong className="font-semibold text-charcoal">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          <aside className="lg:sticky lg:top-12 lg:self-start space-y-10">
            <section className="border-l-2 border-sage pl-5">
              <h3 className="text-lg font-medium mb-2">want help applying this?</h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-4">
                we build private AI agents you stay in control of. book a
                15-minute call.
              </p>
              <a
                href="https://multimodeai.com/#contact"
                className="inline-block bg-charcoal text-cream px-5 py-3 text-xs font-medium tracking-wide hover:bg-sage-dark transition-colors duration-300"
              >
                book a consultation
              </a>
            </section>

            <section className="border-l-2 border-sage pl-5">
              <h3 className="text-lg font-medium mb-2">more like this</h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-4">
                prompt kits and field notes from a muslim builder shipping with AI.
              </p>
              <a
                href="https://multimodeai.substack.com"
                className="inline-block border border-charcoal text-charcoal px-5 py-3 text-xs font-medium tracking-wide hover:bg-charcoal hover:text-cream transition-colors duration-300"
              >
                subscribe on substack
              </a>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
