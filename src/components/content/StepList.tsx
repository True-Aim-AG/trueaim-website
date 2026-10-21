import { cn } from "@/lib/utils";
import { CARD, SECTION, SECTION_LILAC } from "./surface";
import { SectionHead } from "./SectionHead";

export type Step = { title: string; text: string };

/** Numbered steps as cards in an ordered list. */
export function StepList({
  heading,
  headingLevel = "h2",
  steps,
  lilac,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  steps: Step[];
  lilac?: boolean;
}) {
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <section className={lilac ? SECTION_LILAC : SECTION}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} headingLevel={headingLevel} />
        <ol className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className={cn(CARD, "flex h-full flex-col gap-4 p-8")}>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-ta-blue-50 font-display text-[14px] font-semibold text-accent"
              >
                {index + 1}
              </span>
              <ItemHeading className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                {step.title}
              </ItemHeading>
              <p className="text-[15px] leading-[1.55] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
