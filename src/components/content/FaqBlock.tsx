import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "./schema";
import styles from "./FaqBlock.module.css";

export type { FaqItem };

/** A question as the page shows it. The answer may carry links; the JSON-LD is built from the plain FaqItem array. */
export type FaqEntry = { question: string; answer: React.ReactNode };

/**
 * FAQ as click-to-open tiles in the glass look of the product scenes: each
 * question is a tile of glass with the chevron in a glass bead that turns and
 * fills when the tile is open. Native <details>, so every answer is in the
 * served HTML (readable by crawlers and without JavaScript) and the tiles are
 * keyboard-operable with no script; the tiles share a name, so opening one
 * closes the others. Each question is a heading; pick the level that keeps
 * the page outline in order. Build the FAQPage JSON-LD from the same array
 * with faqPageSchema() so the markup always matches the page.
 */
export function FaqBlock({
  faqs,
  headingLevel = "h3",
}: {
  faqs: FaqEntry[];
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  const group = useId();
  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <details key={faq.question} name={group} className={styles.tile}>
          <summary className={styles.summary}>
            <Heading className="flex-1 font-display text-[19px] font-semibold leading-[1.35] text-strong">{faq.question}</Heading>
            <span aria-hidden="true" className={styles.disc}>
              <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
          </summary>
          <p className={`${styles.answer} text-body leading-[1.6]`}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
