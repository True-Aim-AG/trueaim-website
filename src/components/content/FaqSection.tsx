import { FaqBlock } from "./FaqBlock";
import type { FaqItem } from "./schema";
import { section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

/** The page's FAQ as a section: an h2 and the native details rows. */
export function FaqSection({ heading, faqs, tone = "white" }: { heading: string; faqs: FaqItem[]; tone?: Tone }) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} />
        <FaqBlock faqs={faqs} headingLevel="h3" />
      </div>
    </section>
  );
}
