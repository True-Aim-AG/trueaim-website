import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeRow, CtaBand, FaqSection, FeatureCards, PageHero, SplitText, type FaqItem } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";

const PATH = "/trust";

// Certifications first, then the frameworks the controls are aligned with.
// The label on each badge comes from messages/<locale>/trust.json and says
// only what True Aim holds today. The marks are drawn in brand style until
// the official badge files replace them.
const badges = [
  { key: "iso27001", mark: "/brand/marks/cert-iso.svg" },
  { key: "soc2", mark: "/brand/marks/cert-soc2.svg" },
  { key: "gdpr", mark: "/brand/marks/cert-gdpr.svg" },
  { key: "fadp", mark: "/brand/marks/cert-fadp.svg" },
  { key: "dora", mark: "/brand/marks/cert-dora.svg" },
] as const;

const standards = ["iso27001", "soc2", "dataProtection", "dora"] as const;

// The sub-processor list keeps its URL for contracts and is not linked from here.
const documents = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
  { key: "paia", href: "/paia" },
  { key: "aiTransparency", href: "/ai-transparency" },
] as const;

export default async function TrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trust");
  const faqs = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <PageSeo locale={locale} path={PATH} template="trust" faqs={faqs} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        summary={t("hero.summary")}
        buttons={[{ label: t("hero.button"), href: "/contact" }]}
        texture={{ name: "glass" }}
        visual={
          <Image
            src="/brand/3d/lock.webp"
            alt={t("hero.imageAlt")}
            width={420}
            height={420}
            className="mx-auto h-auto w-full max-w-[420px] drop-shadow-[0_30px_40px_rgba(44,43,42,.22)]"
            priority
          />
        }
      />

      <BadgeRow
        heading={t("badges.heading")}
        items={badges.map((badge) => {
          const name = t(`badges.items.${badge.key}.name`);
          const status = t(`badges.items.${badge.key}.status`) as "certified" | "aligned";
          return {
            image: { src: badge.mark, alt: name, width: 120, height: 120 },
            renderHeight: 72,
            caption: t(`badges.statusLabels.${status}`),
            title: name,
          };
        })}
      />

      <FeatureCards
        heading={t("standards.heading")}
        columns={2}
        items={standards.map((key) => ({
          title: t(`standards.items.${key}.title`),
          text: t(`standards.items.${key}.body`),
        }))}
      />

      <SplitText
        heading={t("humanInLoop.heading")}
        paragraphs={[t("humanInLoop.p1"), t("humanInLoop.p2")]}
        image={{ src: "/brand/3d/shield.webp", alt: t("humanInLoop.imageAlt"), width: 600, height: 600 }}
      />

      <FeatureCards
        heading={t("documents.heading")}
        columns={3}
        items={documents.map((doc) => ({
          title: t(`documents.items.${doc.key}.title`),
          text: t(`documents.items.${doc.key}.description`),
          href: doc.href,
          linkLabel: t("documents.open"),
        }))}
      />

      <FaqSection heading={t("faq.heading")} faqs={faqs} />

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
