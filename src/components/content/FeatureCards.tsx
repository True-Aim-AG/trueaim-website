import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Link } from "@/i18n/navigation";

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

const CARD = "bg-card shadow-card rounded-pill p-8 h-full flex flex-col";

/** Grid of feature cards. A card with an href is one link; otherwise it is plain. */
export function FeatureCards({
  heading,
  intro,
  headingLevel = "h2",
  columns = 3,
  items,
}: {
  heading: string;
  intro?: string;
  headingLevel?: "h2" | "h3";
  columns?: 2 | 3 | 4;
  items: FeatureCard[];
}) {
  const Heading = headingLevel;
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Heading className="text-center font-display text-3xl md:text-4xl font-bold text-strong">
          {heading}
        </Heading>
        {intro && (
          <p className="mt-4 text-lg text-body max-w-2xl mx-auto text-center">{intro}</p>
        )}
        <ul className={`mt-12 grid gap-6 grid-cols-1 ${COLS[columns]}`}>
          {items.map((item) => {
            const content = (
              <>
                {item.icon && (
                  <div className="icon-plate mb-6">
                    <BrandIcon name={item.icon} size={40} />
                  </div>
                )}
                <ItemHeading className="font-display text-xl font-bold text-strong mb-3">
                  {item.title}
                </ItemHeading>
                <p className="text-sm text-body leading-[1.6]">{item.text}</p>
                {item.href && item.linkLabel && (
                  <span className="mt-auto pt-6 text-sm font-medium text-link">
                    {item.linkLabel}
                  </span>
                )}
              </>
            );
            return (
              <li key={item.title}>
                {item.href ? (
                  <Link href={item.href} className={CARD}>
                    {content}
                  </Link>
                ) : (
                  <div className={CARD}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
