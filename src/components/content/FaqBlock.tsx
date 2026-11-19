import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "./schema";
import styles from "./FaqBlock.module.css";

export type { FaqItem };

/** A question as the page shows it. The answer may carry links; the JSON-LD is built from the plain FaqItem array. */
export type FaqEntry = { question: string; answer: React.ReactNode };

/**
 * FAQ as click-to-open tiles of the glass material, one column wide. Native
 * <details>, so every answer is in the served HTML (readable by crawlers and
 * without JavaScript) and the tiles are keyboard-operable with no script; the
 * tiles share a name, so opening one closes the others. Each question is a
 * heading; pick the level that keeps the page outline in order. Build the
 * FAQPage JSON-LD from the same array with faqPageSchema() so the markup
 * always matches the page.
 */
export function FaqBlock({
  faqs,
  headingLevel = "h3",
  className,
}: {
  faqs: FaqEntry[];
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
}) {
  const Heading = headingLevel;
  const group = useId();
  return (
    <div className={cn(styles.list, className)}>
      {faqs.map((faq) => (
        <details key={faq.question} name={group} className={cn("glass", styles.tile)}>
          <summary className={styles.summary}>
            <Heading className={styles.question}>{faq.question}</Heading>
            <span aria-hidden="true" className={styles.plate}>
              <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
          </summary>
          <p className={styles.answer}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
