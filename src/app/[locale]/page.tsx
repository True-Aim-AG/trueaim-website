import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Awards,
  CtaBand,
  FeatureCards,
  LogoMarquee,
  PageHero,
  RelatedLinks,
  SplitText,
  type Award,
} from "@/components/content";
import { ClaimScene, productIcons, type ClaimSceneData } from "@/components/products";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageLocales } from "@/i18n/page-locales";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/");
}

const outcomes = [
  { key: "claimsDecisioning", href: "/platform/claims-decisioning" },
  { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking" },
  { key: "damageReporting", href: "/platform/damage-reporting" },
] as const;

/** The organisers' marks for the awards, in the order of the copy. */
const awardMarks = [
  { key: "insurathon", src: "/awards/norton-rose-fulbright.svg", width: 380, height: 42 },
  { key: "innovationspreis", src: "/awards/swiss-innovation.png", width: 171, height: 169 },
  { key: "leuchtturm", src: "/awards/digitaler-leuchtturm.png", width: 198, height: 132 },
  { key: "ikn", src: "/awards/ikn-italy.png", width: 167, height: 151 },
] as const;

const relatedPages = [
  { key: "claimsDecisioning", href: "/platform/claims-decisioning", icon: productIcons.claimsDecisioning },
  { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking", icon: productIcons.invoiceBenchmarking },
  { key: "damageReporting", href: "/platform/damage-reporting", icon: productIcons.damageReporting },
  { key: "otus", href: "/platform/otus", icon: productIcons.otus },
  { key: "trust", href: "/trust", icon: "control" },
] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  // Final URLs for the related links: an English-only page is linked under /en/ from every locale.
  const href = (path: string) => `/${pageLocales(path).includes(locale) ? locale : "en"}${path}/`;
  const awards: Award[] = awardMarks.map((mark) => ({
    ...mark,
    alt: t(`awards.items.${mark.key}.alt`),
    label: t(`awards.items.${mark.key}.label`),
    name: t(`awards.items.${mark.key}.name`),
    text: t(`awards.items.${mark.key}.text`),
  }));

  return (
    <>
      <PageSeo locale={locale} path="/" template="home" />
      <PageHero
        title={t("hero.title")}
        summary={t("hero.summary")}
        buttons={[
          { label: t("hero.ctaDemo"), href: "/contact" },
          { label: t("hero.ctaHow"), href: "/platform" },
        ]}
        texture={{ name: "glass" }}
        visual={<ClaimScene data={t.raw("hero.scene") as ClaimSceneData} hero />}
      />
      <FeatureCards
        heading={t("benefits.heading")}
        items={outcomes.map((outcome) => ({
          title: t(`benefits.items.${outcome.key}.title`),
          text: t(`benefits.items.${outcome.key}.text`),
          icon: productIcons[outcome.key],
          href: outcome.href,
          linkLabel: t(`benefits.items.${outcome.key}.link`),
        }))}
        tone="white"
      />
      <Awards heading={t("awards.heading")} items={awards} tone="tint" />
      <LogoMarquee
        tone="white"
        logos={[
          { src: "/partners/nsa-garantie.webp", alt: t("logos.nsa"), width: 600, height: 191, renderHeight: 72, href: "/case-studies/vehicle-warranty-claims" },
          { src: "/partners/yarowa.png", alt: t("logos.yarowa"), width: 978, height: 273, renderHeight: 52, href: "/partners/yarowa" },
          { src: "/partners/core-group.webp", alt: t("logos.coreGroup"), width: 395, height: 225, renderHeight: 92 },
          { src: "/partners/zhaw-logo.png", alt: t("logos.zhaw"), width: 288, height: 302, renderHeight: 100, href: "/partners/zhaw" },
          { src: "/partners/swiss-insurtech-hub.png", alt: t("logos.swissInsurtechHub"), width: 376, height: 193, renderHeight: 104, href: "/partners/swissinsurtechhub" },
        ]}
      />
      <SplitText
        heading={t("compliance.heading")}
        paragraphs={t.raw("compliance.paragraphs") as string[]}
        image={{ src: "/brand/3d/lock.webp", alt: t("compliance.imageAlt"), width: 420, height: 420 }}
        tone="tint"
      >
        <ul className="mt-8 flex flex-wrap items-center gap-[18px]">
          <li>
            <Image src="/badges/iso-27001.svg" alt={t("compliance.badgeIso")} width={120} height={120} className="h-[104px] w-auto" />
          </li>
          <li>
            <Image src="/badges/soc-2-type-2.svg" alt={t("compliance.badgeSoc")} width={120} height={120} className="h-[104px] w-auto" />
          </li>
        </ul>
      </SplitText>
      <RelatedLinks
        heading={t("related.heading")}
        tone="white"
        links={relatedPages.map((page) => ({
          title: t(`related.${page.key}`),
          description: t(`related.${page.key}Text`),
          href: href(page.href),
          icon: page.icon,
        }))}
      />
      <CtaBand heading={t("cta.heading")} lede={t("cta.lede")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
