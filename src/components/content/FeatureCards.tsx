import { ArrowRight } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CARD, CARD_HOVER, SECTION, SECTION_LILAC } from "./surface";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export type FeatureCard = {
  title: string;
  text: string;
  icon?: BrandIconName;
  href?: string;
  linkLabel?: string;
};

const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

/** Grid of feature cards. A card with an href is one link; otherwise it is plain. */
export function FeatureCards({
  cap,
  heading,
  intro,
  headingLevel = "h2",
  columns = 3,
  items,
  lilac,
}: {
  cap?: string;
  heading: string;
  intro?: string;
  headingLevel?: "h2" | "h3";
  columns?: 2 | 3 | 4;
  items: FeatureCard[];
  lilac?: boolean;
}) {
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <section className={lilac ? SECTION_LILAC : SECTION}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} lede={intro} />
        <ul className={cn("grid grid-cols-1 gap-[29px]", COLS[columns])}>
          {items.map((item, index) => {
            const content = (
              <>
                {item.icon && <BrandIcon name={item.icon} size={40} />}
                <ItemHeading className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                  {item.title}
                </ItemHeading>
                <p className="text-[15px] leading-[1.55] text-muted">{item.text}</p>
                {item.href && item.linkLabel && (
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                    {item.linkLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </span>
                )}
              </>
            );
            const classes = cn(CARD, "flex h-full flex-col gap-4 p-8");
            return (
              <li key={item.title}>
                <Reveal delay={index * 0.1} className="h-full">
                  {item.href ? (
                    <Link href={item.href} className={cn(classes, CARD_HOVER, "block")}>
                      {content}
                    </Link>
                  ) : (
                    <div className={classes}>{content}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
