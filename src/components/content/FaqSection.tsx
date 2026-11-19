import { FaqBlock } from "./FaqBlock";
import type { FaqItem } from "./schema";
import { section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

/** The page's FAQ as a section: the h2 above the questions, both on the left edge of the page content, in one column. */
export function FaqSection({ heading, faqs, tone = "white" }: { heading: string; faqs: FaqItem[]; tone?: Tone }) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} className="mb-10" />
        <FaqBlock faqs={faqs} headingLevel="h3" className="max-w-[920px]" />
      </div>
    </section>
  );
}
