const steps = [
  {
    number: "01",
    title: "show me your last pursuit",
    description:
      "A solicitation you chased, or one you missed. I want the real thing, not a description of it. Half an hour, no deck.",
  },
  {
    number: "02",
    title: "paid pilot, fixed scope",
    description:
      "A discounted, time-boxed engagement against your actual workflow. You get working software; I get to build it against real constraints instead of guesses.",
  },
  {
    number: "03",
    title: "you keep the receipts",
    description:
      "Every run leaves an audit trail — what it read, what it matched, why. If it gets something wrong you can see where, which is the whole point.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16">
          how this usually goes
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-sage text-sm font-medium tracking-wider">
                {step.number}
              </span>
              <h3 className="text-xl font-medium mt-2 mb-4">{step.title}</h3>
              <p className="text-warm-gray leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
