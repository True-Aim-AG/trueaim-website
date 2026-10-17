import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "./schema";

export type { FaqItem };

/**
 * FAQ as click-to-open rows, drawn as the prototype does: a hairline between
 * questions, a blue disc on the right that turns and fills when the row is
 * open. Native <details>, so every answer is in the served HTML (readable by
 * crawlers and without JavaScript) and the rows are keyboard-operable with
 * no script; the rows share a name, so opening one closes the others. Each
 * question is a heading; pick the level that keeps the page outline in
 * order. Build the FAQPage JSON-LD from the same array with faqPageSchema()
 * so the markup always matches the page.
 */
export function FaqBlock({
  faqs,
  headingLevel = "h3",
}: {
  faqs: FaqItem[];
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  const group = useId();
  return (
    <div className="max-w-[86ch] border-t border-hairline">
      {faqs.map((faq) => (
        <details key={faq.question} name={group} className="group border-b border-hairline">
          <summary className="flex cursor-pointer list-none items-center gap-5 py-[22px] [&::-webkit-details-marker]:hidden">
            <Heading className="flex-1 font-display text-[19px] font-semibold leading-[1.35] text-strong transition-colors duration-150 ease-brand group-open:text-ta-blue-700 group-hover:text-ta-blue-700">
              {faq.question}
            </Heading>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ta-blue-50 text-ta-blue-700 transition-[background-color,color,transform] duration-300 ease-brand group-hover:bg-ta-blue-100 group-open:rotate-180 group-open:bg-accent group-open:text-on-brand"
            >
              <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </summary>
          <p className="max-w-[74ch] pb-[26px] pr-14 text-body leading-[1.6]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
