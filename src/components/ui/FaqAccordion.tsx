import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * FAQ as click-to-open rows. Native <details>, so every answer is in the
 * served HTML (readable by crawlers and without JavaScript) and the rows are
 * keyboard-operable with no script.
 */
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-card shadow-card rounded-pill"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-pill px-8 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display font-semibold text-strong">
              {faq.question}
            </h3>
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
