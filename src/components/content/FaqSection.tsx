import { FaqBlock } from "./FaqBlock";
import type { FaqItem } from "./schema";

/** The page's FAQ as a section: an h2 and the native details rows. */
export function FaqSection({ heading, faqs }: { heading: string; faqs: FaqItem[] }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-10 text-center font-display text-3xl md:text-4xl font-bold text-strong">
          {heading}
        </h2>
        <FaqBlock faqs={faqs} headingLevel="h3" />
      </div>
    </section>
  );
}
