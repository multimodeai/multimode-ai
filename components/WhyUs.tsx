const reasons = [
  {
    title: "I have been through it",
    description:
      "Proposals I have worked on have won over $5M in federal awards, on a process built to ship 30+ a year. Not a vendor who read about SBIR — I know which parts are genuinely hard, and I will tell you before you pay.",
  },
  {
    title: "checkable, not trusted",
    description:
      "Everything leaves a trail — what it read, what it matched, why it decided. Verification is a feature, not a promise.",
  },
  {
    title: "honest scope",
    description:
      "You get told what I do not know. There is a whole half of federal contracting — post-award accounting, DCAA red tape — that I have never owned, and I will say so.",
  },
  {
    title: "your data stays put",
    description:
      "Sensitive work runs on infrastructure you control. I have built sovereign redaction systems for exactly this reason.",
  },
  {
    title: "public work",
    description:
      "Some of what I build is open. Read it before you hire me — it is the cheapest due diligence available.",
  },
  {
    title: "direct access",
    description:
      "You talk to the person building it. No account manager, no ticket queue.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="px-6 md:px-12 lg:px-24 py-24 bg-beige">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16">
          why me
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((reason) => (
            <div key={reason.title} className="border-l-2 border-sage pl-6">
              <h3 className="text-lg font-medium mb-2">{reason.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
