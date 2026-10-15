import Link from "next/link";

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
  const Heading = headingLevel;
  return (
    <section>
      <Heading className="mb-6 font-display text-[28px] font-bold text-strong">
        {heading}
      </Heading>
      <ul className="grid gap-6 md:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block h-full bg-card shadow-card rounded-pill p-8 hover:underline"
            >
              <span className="block font-display font-semibold text-link">
                {link.title}
              </span>
              {link.description && (
                <span className="mt-2 block text-sm text-body leading-[1.6]">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
