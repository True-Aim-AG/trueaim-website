import {
  CtaBand,
  FaqSection,
  PageHero,
  RelatedLinks,
  SECTION,
  type CtaButton,
  type FaqItem,
  type HeroButton,
  type HeroTexture,
  type RelatedLink,
} from "@/components/content";

/**
 * Product page template: the hero (H1, summary, buttons, the product scene on
 * a brand texture), the page's own sections as children, then the FAQ, the
 * related links and the closing band. Every string arrives from
 * messages/en/products.json.
 */
export function ProductTemplate({
  hero,
  children,
  faq,
  related,
  cta,
}: {
  hero: { title: string; summary: string; buttons: HeroButton[]; visual?: React.ReactNode; texture?: HeroTexture };
  children: React.ReactNode;
  faq: { heading: string; items: FaqItem[] };
  related: { heading: string; links: RelatedLink[] };
  cta: { heading: string; lede?: string; buttons: CtaButton[] };
}) {
  return (
    <>
      <PageHero
        title={hero.title}
        summary={hero.summary}
        buttons={hero.buttons}
        visual={hero.visual}
        texture={hero.texture}
      />
      {children}
      <FaqSection heading={faq.heading} faqs={faq.items} />
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <RelatedLinks heading={related.heading} links={related.links} />
        </div>
      </section>
      <CtaBand heading={cta.heading} lede={cta.lede} buttons={cta.buttons} />
    </>
  );
}
