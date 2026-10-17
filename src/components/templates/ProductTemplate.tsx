import {
  CtaBand,
  FaqSection,
  PageHero,
  RelatedLinks,
  type CtaButton,
  type FaqItem,
  type HeroButton,
  type HeroTexture,
  type RelatedLink,
  type Tone,
} from "@/components/content";

/**
 * Product page template: the hero (H1, summary, buttons, the product scene on
 * a brand texture), the page's own sections as children, then the FAQ, the
 * related links and the closing band. Backgrounds alternate down the page,
 * so the caller says which tone the FAQ takes; the related links take the
 * other. Every string arrives from messages/en/products.json.
 */
export function ProductTemplate({
  hero,
  children,
  faq,
  related,
  cta,
  faqTone = "tint",
}: {
  hero: { title: string; summary: string; buttons: HeroButton[]; visual?: React.ReactNode; texture?: HeroTexture };
  children: React.ReactNode;
  faq: { heading: string; items: FaqItem[] };
  related: { heading: string; links: RelatedLink[] };
  cta: { heading: string; lede?: string; buttons: CtaButton[] };
  faqTone?: Tone;
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
      <FaqSection heading={faq.heading} faqs={faq.items} tone={faqTone} />
      <RelatedLinks heading={related.heading} links={related.links} tone={faqTone === "tint" ? "white" : "tint"} />
      <CtaBand heading={cta.heading} lede={cta.lede} buttons={cta.buttons} />
    </>
  );
}
