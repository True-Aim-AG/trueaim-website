import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/utils";
import { CARD, CARD_GRID, CARD_HOVER, CARD_TEXT, CARD_TITLE, ROW_SPAN, section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

export type RelatedLink = {
  title: string;
  /** Final internal URL path, for example /en/technology/. Never a redirect. */
  href: string;
  description?: string;
  icon?: BrandIconName;
};

/**
 * Internal links between products, solutions and resources, as compact cards
 * whose rows line up across the row. next/link renders a plain <a href> that
 * crawlers follow without JavaScript, and navigates client-side, which keeps
 * the in-memory first-visit attribution of visitors who have not accepted
 * cookies. With a tone the block is a short section of its own; without one
 * it sits inside the caller's section.
 */
export function RelatedLinks({
  heading,
  headingLevel = "h2",
  links,
  tone,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  links: RelatedLink[];
  tone?: Tone;
}) {
  const withIcons = links.some((link) => link.icon);
  const rows = withIcons ? 4 : 3;
  return (
    <section className={tone ? section(tone, true) : undefined}>
      <div className={cn(tone && "mx-auto max-w-7xl")}>
        <SectionHead heading={heading} headingLevel={headingLevel} className="mb-8" />
        <ul className="grid gap-6 md:grid-cols-3">
          {links.map((link) => (
            <li key={link.href} className={cn(CARD, CARD_GRID, CARD_HOVER, ROW_SPAN[rows], "relative p-7")}>
              {withIcons && <span className="flex h-10 items-center">{link.icon && <BrandIcon name={link.icon} size={40} />}</span>}
              <span className={cn(CARD_TITLE, "block")}>
                <Link href={link.href} className="after:absolute after:inset-0 after:rounded-[12px] after:content-[''] focus-visible:outline-none">
                  {link.title}
                </Link>
              </span>
              <span className={cn(CARD_TEXT, "block")}>{link.description}</span>
              <ArrowRight className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
