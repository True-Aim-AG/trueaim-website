import {
  CtaBand,
  FaqSection,
  PageHero,
  RelatedLinks,
  type CtaButton,
  type FaqItem,
  type HeroButton,
  type RelatedLink,
} from "@/components/content";

/**
 * Product page template: the hero (H1, summary, buttons, optional visual),
 * the page's own sections as children, then the FAQ, the related links and
 * the closing band. Every string arrives from messages/en/products.json.
 */
export function ProductTemplate({
  hero,
  children,
  faq,
  related,
  cta,
}: {
  hero: { title: string; summary: string; buttons: HeroButton[]; visual?: React.ReactNode };
  children: React.ReactNode;
  faq: { heading: string; items: FaqItem[] };
  related: { heading: string; links: RelatedLink[] };
  cta: { heading: string; lede?: string; buttons: CtaButton[] };
}) {
  return (
    <>
      <PageHero title={hero.title} summary={hero.summary} buttons={hero.buttons} visual={hero.visual} />
      {children}
      <FaqSection heading={faq.heading} faqs={faq.items} />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RelatedLinks heading={related.heading} links={related.links} />
        </div>
      </section>
      <CtaBand heading={cta.heading} lede={cta.lede} buttons={cta.buttons} />
    </>
  );
}
