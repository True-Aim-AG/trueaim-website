import { ArrowRight } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CARD, CARD_GRID, CARD_HOVER, CARD_TEXT, CARD_TITLE, ROW_SPAN, section, type Tone } from "./surface";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export type FeatureCard = {
  title: string;
  text: string;
  icon?: BrandIconName;
  href?: string;
  linkLabel?: string;
  /** A step number, set to the left of the title and the text. */
  number?: string;
};

const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

/** The number column of a numbered card, and the indent that keeps the text to its right. */
const NUMBER = "grid grid-cols-[36px_minmax(0,1fr)] gap-x-3";
const INDENT = "pl-12";

/**
 * Grid of cards whose rows line up across the row: icon, title, text, link.
 * A card with an href is one link, stretched over the whole card from the
 * title. A numbered card keeps its number left of all its text.
 */
export function FeatureCards({
  cap,
  heading,
  intro,
  headingLevel = "h2",
  columns = 3,
  items,
  tone = "white",
}: {
  cap?: string;
  heading: string;
  intro?: string;
  headingLevel?: "h2" | "h3";
  columns?: 2 | 3 | 4;
  items: FeatureCard[];
  tone?: Tone;
}) {
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";
  const withIcons = items.some((item) => item.icon);
  const withLinks = items.some((item) => item.href && item.linkLabel);
  const numbered = items.some((item) => item.number);
  const rows = 2 + (withIcons ? 1 : 0) + (withLinks ? 1 : 0);
  return (
    <section className={section(tone)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} lede={intro} />
        <ul className={cn("grid grid-cols-1 gap-[29px]", COLS[columns])}>
          {items.map((item, index) => {
            const linked = Boolean(item.href);
            return (
              <Reveal
                key={item.title}
                as="li"
                delay={index * 0.1}
                className={cn(CARD, CARD_GRID, ROW_SPAN[rows], "relative p-8", linked && CARD_HOVER)}
              >
                {withIcons && <div className="flex h-10 items-center">{item.icon && <BrandIcon name={item.icon} size={40} />}</div>}
                <ItemHeading className={cn(CARD_TITLE, numbered && NUMBER)}>
                  {numbered && <span className="tabular-nums">{item.number ? `${item.number}.` : ""}</span>}
                  {linked && item.href ? (
                    <Link
                      href={item.href}
                      className="after:absolute after:inset-0 after:rounded-[12px] after:content-[''] focus-visible:outline-none"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </ItemHeading>
                <p className={cn(CARD_TEXT, numbered && INDENT)}>{item.text}</p>
                {withLinks && (
                  <span className={cn("inline-flex items-center gap-2 text-sm font-medium text-accent", numbered && INDENT)}>
                    {item.href && item.linkLabel && (
                      <>
                        {item.linkLabel}
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                      </>
                    )}
                  </span>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
