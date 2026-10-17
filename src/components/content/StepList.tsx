export type Step = { title: string; text: string };

/** Numbered steps as cards in an ordered list. */
export function StepList({
  heading,
  headingLevel = "h2",
  steps,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  steps: Step[];
}) {
  const Heading = headingLevel;
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Heading className="text-center font-display text-3xl md:text-4xl font-bold text-strong">
          {heading}
        </Heading>
        <ol className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-card shadow-card rounded-pill p-8 h-full">
              <span aria-hidden="true" className="block font-display text-kpi text-accent mb-4">
                {index + 1}
              </span>
              <ItemHeading className="font-display text-xl font-bold text-strong mb-3">
                {step.title}
              </ItemHeading>
              <p className="text-sm text-body leading-[1.6]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
