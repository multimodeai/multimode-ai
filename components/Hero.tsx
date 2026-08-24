export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
          AI agents for work
          <br />
          that has rules.
        </h1>
        <p className="text-lg md:text-xl text-warm-gray max-w-2xl mb-10 leading-relaxed">
          Federal proposals, grant compliance, sensitive data. I build systems
          that find the work, keep the paperwork straight, and{" "}
          <span className="text-charcoal">show their working</span> — so you can
          check what they did instead of trusting them.
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 border-t border-charcoal/10 pt-8 max-w-2xl">
          <div>
            <div className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums">
              $5M+
            </div>
            <div className="text-sm text-warm-gray mt-1">
              in federal awards won on proposals I have worked on
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums">
              30+
            </div>
            <div className="text-sm text-warm-gray mt-1">
              proposals a year, on a process I helped streamline
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#services"
            className="inline-block bg-charcoal text-cream px-8 py-4 text-sm font-medium tracking-wide hover:bg-sage-dark transition-colors duration-300"
          >
            see how it works
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-sm font-medium tracking-wide text-charcoal border border-charcoal/20 hover:border-charcoal transition-colors duration-300"
          >
            book a call
          </a>
        </div>
      </div>
    </section>
  );
}
