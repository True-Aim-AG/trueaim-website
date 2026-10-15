import { ChevronDown } from "lucide-react";
import type { FaqItem } from "./schema";

export type { FaqItem };

/**
 * FAQ as click-to-open rows. Native <details>, so every answer is in the
 * served HTML (readable by crawlers and without JavaScript) and the rows are
 * keyboard-operable with no script. Each question is a heading; pick the
 * level that keeps the page outline in order (h3 under an h2 section, h2
 * when the FAQ is a top-level section). Build the FAQPage JSON-LD from the
 * same array with faqPageSchema() so the markup always matches the page.
 */
export function FaqBlock({
  faqs,
  headingLevel = "h3",
}: {
  faqs: FaqItem[];
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-card shadow-card rounded-pill"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-pill px-8 py-6 [&::-webkit-details-marker]:hidden">
            <Heading className="font-display font-semibold text-strong">
              {faq.question}
            </Heading>
            <ChevronDown
              aria-hidden="true"
              className="w-5 h-5 flex-shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
              strokeWidth={1.5}
            />
          </summary>
          <p className="px-8 pb-8 text-sm text-body leading-[1.6]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
