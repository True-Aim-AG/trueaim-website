import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CARD, CARD_HOVER } from "./surface";
import { SectionHead } from "./SectionHead";

export type RelatedLink = {
  title: string;
  /** Final internal URL path, for example /en/technology/. Never a redirect. */
  href: string;
  description?: string;
};

/**
 * Internal links between products, solutions and resources. next/link
 * renders a plain <a href> card that crawlers follow without JavaScript,
 * and navigates client-side, which keeps the in-memory first-visit
 * attribution of visitors who have not accepted cookies.
 */
export function RelatedLinks({
  heading,
  headingLevel = "h2",
  links,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  links: RelatedLink[];
}) {
  return (
    <section>
      <SectionHead heading={heading} headingLevel={headingLevel} className="mb-10" />
      <ul className="grid gap-[29px] md:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={cn(CARD, CARD_HOVER, "flex h-full flex-col gap-3 p-8")}>
              <span className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                {link.title}
              </span>
              {link.description && (
                <span className="text-[15px] leading-[1.55] text-muted">{link.description}</span>
              )}
              <ArrowRight className="mt-auto h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
