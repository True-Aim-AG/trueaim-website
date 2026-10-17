import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Callout,
  CtaBand,
  FaqSection,
  FeatureCards,
  PageHero,
  RelatedLinks,
  SplitText,
  type FaqItem,
} from "@/components/content";
import { ModulesDiagram } from "@/components/products";
import { products } from "@/data/products";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/platform");
}

const outcomes = [
  { key: "claimsDecisioning", href: "/platform/claims-decisioning", icon: "decision" },
  { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking", icon: "match" },
  { key: "damageReporting", href: "/platform/damage-reporting", icon: "document" },
] as const;

const features = ["orchestrate", "prove"] as const;

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "platform" });
  const faqs = t.raw("faq.items") as FaqItem[];
  const featureList = features.map((key) => ({
    name: t(`diagram.features.${key}.name`),
    description: t(`diagram.features.${key}.text`),
  }));

  return (
    <>
      <PageSeo
        locale={locale}
        path="/platform"
        template="platform"
        faqs={faqs}
        lists={[{ id: "features", name: t("diagram.featuresHeading"), items: featureList }]}
      />
      <PageHero
        title={t("hero.title")}
        summary={t("hero.summary")}
        buttons={[{ label: t("hero.ctaDemo"), href: "/contact" }]}
      />
      <FeatureCards
        heading={t("outcomes.heading")}
        items={outcomes.map((outcome) => ({
          title: t(`outcomes.items.${outcome.key}.title`),
          text: t(`outcomes.items.${outcome.key}.text`),
          icon: outcome.icon,
          href: outcome.href,
          linkLabel: t(`outcomes.items.${outcome.key}.link`),
        }))}
      />
      <SplitText
        heading={t("technology.heading")}
        paragraphs={t.raw("technology.paragraphs") as string[]}
        image={{ src: "/brand/3d/render-04.webp", alt: t("technology.imageAlt"), width: 560, height: 560 }}
      />
      <ModulesDiagram
        heading={t("diagram.heading")}
        intro={t("diagram.intro")}
        input={{ name: t("diagram.input.name"), text: t("diagram.input.text") }}
        modules={products.map((product) => ({
          name: t(`diagram.modules.${product.key}.name`),
          text: t(`diagram.modules.${product.key}.text`),
          href: `/platform/${product.slug}`,
        }))}
        output={{ name: t("diagram.output.name"), text: t("diagram.output.text") }}
        featuresHeading={t("diagram.featuresHeading")}
        features={featureList.map((feature) => ({ name: feature.name, text: feature.description }))}
      />
      <Callout text={t("diagram.callout")} />
      <SplitText
        heading={t("fit.heading")}
        paragraphs={t.raw("fit.paragraphs") as string[]}
        image={{ src: "/brand/3d/lock.webp", alt: t("fit.imageAlt"), width: 420, height: 420 }}
        imageSide="left"
        lilac
      />
      <FaqSection heading={t("faq.heading")} faqs={faqs} />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RelatedLinks
            heading={t("related.heading")}
            links={products.map((product) => ({
              title: t(`related.${product.key}`),
              description: t(`related.${product.key}Text`),
              href: `/${locale}/platform/${product.slug}/`,
            }))}
          />
        </div>
      </section>
      <CtaBand heading={t("cta.heading")} lede={t("cta.lede")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
