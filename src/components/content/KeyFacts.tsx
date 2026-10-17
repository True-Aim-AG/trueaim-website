import { HexDot } from "@/components/products/scenes/marks";
import { cn } from "@/lib/utils";
import { CARD, SECTION_LILAC, SECTION_TIGHT } from "./surface";
import { SectionHead } from "./SectionHead";

export type KeyFact = { label: string; text: string };

/** A key that opens with a figure ("2 minutes", "Under 1 minute") is set larger. */
const NUMERIC = /^\s*(?:(?:under|about|up to|over|around)\s+|[<>]\s*)?\d/i;

const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Short labelled facts: one rounded panel divided by hairlines, a blue
 * hexagon marking each fact, the key in the display face and one line under
 * it. The prototype's bare keyword row, redrawn to match the page's cards.
 */
export function KeyFacts({
  cap,
  heading,
  headingLevel = "h2",
  items,
  lilac,
}: {
  cap?: string;
  heading?: string;
  headingLevel?: "h2" | "h3";
  items: KeyFact[];
  lilac?: boolean;
}) {
  const lg = LG_COLS[Math.min(Math.max(items.length, 1), 4)];
  return (
    <section className={lilac ? SECTION_LILAC : SECTION_TIGHT}>
      <div className="mx-auto max-w-7xl">
        {heading && <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} className="mb-10" />}
        <ul className={cn("grid grid-cols-1 sm:grid-cols-2", lg, CARD)}>
          {items.map((item) => (
            <li
              key={item.label}
              className="border-hairline px-8 py-7 border-t first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:even:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <HexDot className="h-3.5 w-3.5" />
              <p
                className={cn(
                  "mt-5 font-display font-semibold text-strong text-balance",
                  NUMERIC.test(item.label) ? "text-[34px] leading-[1.05] tabular-nums" : "text-[24px] leading-[1.2]",
                )}
              >
                {item.label}
              </p>
              <p className="mt-3 text-[15px] leading-[1.55] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
