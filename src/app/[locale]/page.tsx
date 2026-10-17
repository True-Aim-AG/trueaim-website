import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import {
  CtaBand,
  FaqSection,
  FeatureCards,
  LogoStrip,
  RelatedLinks,
  SplitText,
  type FaqItem,
} from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageLocales } from "@/i18n/page-locales";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/");
}

const outcomes = [
  { key: "claimsDecisioning", href: "/platform/claims-decisioning", icon: "decision" },
  { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking", icon: "match" },
  { key: "damageReporting", href: "/platform/damage-reporting", icon: "document" },
] as const;

const relatedPages = [
  { key: "claimsDecisioning", href: "/platform/claims-decisioning" },
  { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking" },
  { key: "damageReporting", href: "/platform/damage-reporting" },
  { key: "otus", href: "/platform/otus" },
  { key: "platform", href: "/platform" },
  { key: "trust", href: "/trust" },
] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const faqs = t.raw("faq.items") as FaqItem[];
  // Final URLs for the related links: an English-only page is linked under /en/ from every locale.
  const href = (path: string) => `/${pageLocales(path).includes(locale) ? locale : "en"}${path}/`;

  return (
    <>
      <PageSeo locale={locale} path="/" template="home" faqs={faqs} />
      <Hero
        title={t("hero.title")}
        summary={t("hero.summary")}
        ctaDemo={t("hero.ctaDemo")}
        ctaHow={t("hero.ctaHow")}
      />
      <FeatureCards
        heading={t("benefits.heading")}
        items={outcomes.map((outcome) => ({
          title: t(`benefits.items.${outcome.key}.title`),
          text: t(`benefits.items.${outcome.key}.text`),
          icon: outcome.icon,
          href: outcome.href,
          linkLabel: t(`benefits.items.${outcome.key}.link`),
        }))}
      />
      <LogoStrip
        caption={t("logos.caption")}
        logos={[
          { src: "/partners/nsa-garantie.webp", alt: t("logos.nsa"), width: 600, height: 191, renderHeight: 36 },
          { src: "/partners/yarowa.png", alt: t("logos.yarowa"), width: 978, height: 273, renderHeight: 28, href: "/partners/yarowa" },
          { src: "/partners/core-group.webp", alt: t("logos.coreGroup"), width: 395, height: 225, renderHeight: 46 },
          { src: "/partners/zhaw-logo.png", alt: t("logos.zhaw"), width: 288, height: 302, renderHeight: 52, href: "/partners/zhaw" },
          { src: "/partners/swiss-insurtech-hub.png", alt: t("logos.swissInsurtechHub"), width: 376, height: 193, renderHeight: 48, href: "/partners/swissinsurtechhub" },
        ]}
      />
      <SplitText
        heading={t("compliance.heading")}
        paragraphs={t.raw("compliance.paragraphs") as string[]}
        image={{ src: "/brand/3d/lock.webp", alt: t("compliance.imageAlt"), width: 420, height: 420 }}
        lilac
      >
        <ul className="mt-8 flex flex-wrap items-center gap-6">
          <li>
            <Image src="/badges/iso-27001.png" alt={t("compliance.badgeIso")} width={120} height={120} className="h-[96px] w-auto" />
          </li>
          <li>
            <Image src="/badges/soc-2-type-2.png" alt={t("compliance.badgeSoc")} width={120} height={120} className="h-[96px] w-auto" />
          </li>
        </ul>
      </SplitText>
      <FaqSection heading={t("faq.heading")} faqs={faqs} />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RelatedLinks
            heading={t("related.heading")}
            links={relatedPages.map((page) => ({
              title: t(`related.${page.key}`),
              description: t(`related.${page.key}Text`),
              href: href(page.href),
            }))}
          />
        </div>
      </section>
      <CtaBand heading={t("cta.heading")} lede={t("cta.lede")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
