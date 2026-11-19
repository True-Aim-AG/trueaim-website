import { FaqBlock } from "./FaqBlock";
import type { FaqItem } from "./schema";
import { section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

/** The page's FAQ as a section: the h2 beside the glass tiles on a wide screen, above them on a narrow one. */
export function FaqSection({ heading, faqs, tone = "white" }: { heading: string; faqs: FaqItem[]; tone?: Tone }) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto grid max-w-7xl items-start lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-20">
        <SectionHead heading={heading} className="lg:sticky lg:top-28 lg:mb-0" />
        <FaqBlock faqs={faqs} headingLevel="h3" />
      </div>
    </section>
  );
}
