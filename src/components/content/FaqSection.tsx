import { FaqBlock } from "./FaqBlock";
import type { FaqItem } from "./schema";
import { SECTION } from "./surface";
import { SectionHead } from "./SectionHead";

/** The page's FAQ as a section: an h2 and the native details rows. */
export function FaqSection({ heading, faqs }: { heading: string; faqs: FaqItem[] }) {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} />
        <FaqBlock faqs={faqs} headingLevel="h3" />
      </div>
    </section>
  );
}
