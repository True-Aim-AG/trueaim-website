import Image from "next/image";
import { ArrowRight, MapPin, Shield } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  BadgeRow,
  CARD,
  CARD_HOVER,
  CtaBand,
  FaqSection,
  FeatureCards,
  PageHero,
  SECTION_LILAC,
  SectionHead,
  SplitText,
  type BadgeItem,
  type FaqItem,
} from "@/components/content";
import { HexDot } from "@/components/products/scenes/marks";
import { PageSeo } from "@/components/seo/PageSeo";
import { cn } from "@/lib/utils";

const PATH = "/trust";

// Certifications first, as badges; then the frameworks the controls are
// aligned with, on the icons the live page uses. The label on each comes
// from messages/<locale>/trust.json and says only what True Aim holds today.
// The two badges are drawn in brand style until the certification bodies'
// own files replace them.
const badges = [
  { key: "iso27001", mark: "/brand/marks/badge-iso-27001.svg" },
  { key: "soc2", mark: "/brand/marks/badge-soc-2-type-ii.svg" },
  { key: "gdpr" },
  { key: "fadp" },
  { key: "dora" },
] as const;

const euAiActKeys = [
  "humanOversight",
  "transparency",
  "technicalDocumentation",
  "riskManagement",
  "dataGovernance",
  "accuracyRobustness",
] as const;

const residencyKeys = ["swissDataCentre", "euProcessingZones", "noThirdCountry"] as const;

// The sub-processor list keeps its URL for contracts and is not linked from here.
const documents = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
  { key: "paia", href: "/paia" },
  { key: "aiTransparency", href: "/ai-transparency" },
] as const;

/** The Swiss pin on the brand texture, in the page's card style. */
function ResidencyVisual({ label }: { label: string }) {
  return (
    <div className={cn(CARD, "relative min-h-[340px] w-full overflow-hidden")}>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url(/brand/textures/circular-light.webp)", backgroundPosition: "50% 50%" }}
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,252,253,.4)_0%,rgba(251,252,253,.1)_100%)]" />
      <div className="relative grid min-h-[340px] place-items-center">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ta-blue shadow-[0_0_0_10px_rgba(81,81,219,.14)]">
            <MapPin strokeWidth={1.5} className="h-7 w-7 text-on-brand" />
          </div>
          <p className="mt-6 inline-block rounded-pill bg-card px-4 py-1.5 font-display text-[15px] font-semibold text-strong shadow-swatch">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function TrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trust");
  const faqs = t.raw("faq.items") as FaqItem[];

  const badgeItems: BadgeItem[] = badges.map((badge) => {
    const name = t(`badges.items.${badge.key}.name`);
    const status = t(`badges.items.${badge.key}.status`) as "certified" | "aligned";
    return {
      image: "mark" in badge ? { src: badge.mark, alt: name, width: 160, height: 160 } : undefined,
      icon: "mark" in badge ? undefined : <Shield strokeWidth={1.5} className="h-7 w-7" />,
      renderHeight: 80,
      caption: t(`badges.statusLabels.${status}`),
      title: name,
      text: t(`badges.items.${badge.key}.description`),
    };
  });

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

      {/* Sections alternate: white, lilac, white, lilac. */}
      <BadgeRow heading={t("badges.heading")} items={badgeItems} />

      <FeatureCards
        heading={t("euAiAct.heading")}
        intro={t("euAiAct.intro")}
        columns={3}
        items={euAiActKeys.map((key) => ({
          title: t(`euAiAct.features.${key}.requirement`),
          text: t(`euAiAct.features.${key}.description`),
        }))}
        lilac
      />

      <SplitText
        heading={t("humanInLoop.heading")}
        paragraphs={[t("humanInLoop.p1"), t("humanInLoop.p2")]}
        image={{ src: "/brand/3d/shield.webp", alt: t("humanInLoop.imageAlt"), width: 600, height: 600 }}
      />

      <SplitText
        heading={t("dataResidency.heading")}
        paragraphs={[t("dataResidency.description")]}
        visual={<ResidencyVisual label={t("dataResidency.mapLabel")} />}
        lilac
      >
        <ul className={cn(CARD, "mt-8 divide-y divide-hairline")}>
          {residencyKeys.map((key) => (
            <li key={key} className="flex items-start gap-4 px-6 py-5">
              <HexDot className="mt-1.5 h-3.5 w-3.5" />
              <div>
                <p className="font-display text-[17px] font-semibold leading-[1.35] text-strong">{t(`dataResidency.items.${key}.title`)}</p>
                <p className="mt-1 text-[15px] leading-[1.55] text-muted">{t(`dataResidency.items.${key}.description`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </SplitText>

      <FaqSection heading={t("faq.heading")} faqs={faqs} />

      <section className={SECTION_LILAC}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("documents.heading")} className="mb-10" />
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <li key={doc.key}>
                <Link href={doc.href} className={cn(CARD, CARD_HOVER, "flex items-center justify-between gap-4 px-8 py-6")}>
                  <span className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                    {t(`documents.items.${doc.key}.title`)}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
