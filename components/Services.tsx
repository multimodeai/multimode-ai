type Feature = string | { text: string; href: string };

const services: {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
}[] = [
  {
    title: "funding discovery",
    subtitle: "find the work you are missing",
    description:
      "Opportunity monitoring for small businesses and research labs chasing federal funding. It reads the solicitations, filters against what you actually do, and flags the ones worth your week.",
    features: [
      "Matched against your real capability, not keywords",
      "Deadlines, eligibility, and set-aside status surfaced up front",
      "Built by someone who has written funded SBIR proposals",
    ],
  },
  {
    title: "bespoke builds",
    subtitle: "software where the data is sensitive",
    description:
      "Web applications and internal tools, usually where the process is audited or the data cannot leave. Scoped honestly — you get told what is hard before you pay for it.",
    features: [
      "Bayesian optimisation platform for a research group",
      "Sovereign document-redaction system for government use",
      "Audit trails and receipts, not just output",
    ],
  },
  {
    title: "see the work",
    subtitle: "judge it before you hire anyone",
    description:
      "Products that are live, benchmarks you can check, and design you can look at. The cheapest due diligence available before you hire anyone.",
    features: [
      {
        text: "Ground Truth — catches AI fabricating Quran and hadith citations",
        href: "/guides/ground-truth",
      },
      {
        text: "girih-bench — a visual model benchmark you cannot game",
        href: "/benchmarks/girih-bench",
      },
      {
        text: "ProWasl — trusted local help, fair to the people who do it",
        href: "https://prowasl.com",
      },
      {
        text: "BayanLab — halal and Muslim community data",
        href: "https://bayanlab.com",
      },
      { text: "Hudphoto — if you want to see the taste", href: "https://hudphoto.com" },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-24 py-24 bg-beige">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          what I do
        </h2>
        <p className="text-warm-gray mb-16 max-w-2xl">
          Three things, and they share a shape: the work is regulated, the
          paperwork matters, and somebody has to be able to check it afterwards.
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service) => (
            <div key={service.title}>
              <h3 className="text-xl font-medium mb-1">{service.title}</h3>
              <p className="text-sage-dark text-sm font-medium mb-4">
                {service.subtitle}
              </p>
              <p className="text-warm-gray leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => {
                  const isLink = typeof feature !== "string";
                  const text = isLink ? feature.text : feature;
                  return (
                    <li
                      key={text}
                      className="text-sm text-warm-gray flex items-start gap-2"
                    >
                      <span className="text-sage mt-0.5 shrink-0">&#10003;</span>
                      {isLink ? (
                        <a
                          href={feature.href}
                          className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors"
                        >
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
