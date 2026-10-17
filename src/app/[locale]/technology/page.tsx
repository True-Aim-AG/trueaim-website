import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import {
  CARD,
  ComparisonTable,
  CtaBand,
  FaqSection,
  FeatureCards,
  PageHero,
  RelatedLinks,
  SECTION,
  SECTION_TIGHT,
  SectionHead,
  SplitText,
  type FaqItem,
} from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { cn } from "@/lib/utils";

const PATH = "/technology";

const layers = [
  {
    key: "reading",
    capabilities: [
      { key: "docReading", icon: "document" },
      { key: "dataExtraction", icon: "extraction" },
      { key: "classification", icon: "classification" },
      { key: "orchestration", icon: "workflow" },
    ],
  },
  {
    key: "deciding",
    capabilities: [
      { key: "coverageRules", icon: "rules" },
      { key: "policyLogic", icon: "logic" },
      { key: "costCalculation", icon: "processing" },
      { key: "decisionOutput", icon: "decision" },
    ],
  },
] as const satisfies readonly { key: "reading" | "deciding"; capabilities: readonly { key: string; icon: BrandIconName }[] }[];

const controls: { key: "replayLogs" | "ruleTraceability" | "approvalGates" | "exceptionRouting" | "confidenceScoring"; icon: BrandIconName }[] = [
  { key: "replayLogs", icon: "traceability" },
  { key: "ruleTraceability", icon: "rule-applied" },
  { key: "approvalGates", icon: "human-review" },
  { key: "exceptionRouting", icon: "control" },
  { key: "confidenceScoring", icon: "quality" },
];

const comparisonRows = ["consistency", "auditTrail", "explainability", "oversight"] as const;

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("technology");
  const faqs = t.raw("faq.items") as FaqItem[];

  // RelatedLinks takes final URLs; the Decision Dossier anchor is fixed in URL-LIST.md.
  const related = [
    { title: t("related.decisionDossier.title"), href: `/${locale}/platform/claims-decisioning/#decision-dossier`, description: t("related.decisionDossier.description") },
    { title: t("related.claimsDecisioning.title"), href: `/${locale}/platform/claims-decisioning/`, description: t("related.claimsDecisioning.description") },
    { title: t("related.trust.title"), href: `/${locale}/trust/`, description: t("related.trust.description") },
  ];

  return (
    <>
      <PageSeo locale={locale} path={PATH} template="technology" faqs={faqs} />

      <PageHero
        title={t("hero.title")}
        summary={t("hero.summary")}
        buttons={[{ label: t("hero.button"), href: "/contact" }]}
        texture={{ name: "circ", position: "12% 88%" }}
        visual={
          <Image
            src="/brand/3d/glass-box.webp"
            alt={t("hero.imageAlt")}
            width={940}
            height={900}
            className="mx-auto h-auto w-full max-w-[460px] drop-shadow-[0_30px_40px_rgba(44,43,42,.22)]"
            priority
          />
        }
      />

      <SplitText heading={t("problem.heading")} paragraphs={[t("problem.p1"), t("problem.p2")]} />

      {/* The two layers */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("architecture.heading")} />
          <div className="grid grid-cols-1 gap-[29px] lg:grid-cols-2">
            {layers.map((layer) => (
              <div key={layer.key} className={cn(CARD, "flex flex-col gap-6 p-8")}>
                <div>
                  <h3 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                    {t(`architecture.${layer.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{t(`architecture.${layer.key}.subtitle`)}</p>
                </div>
                <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {layer.capabilities.map((capability) => (
                    <li key={capability.key} className="flex items-center gap-3 text-[15px] font-medium text-strong">
                      <BrandIcon name={capability.icon} size={28} />
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {t(`architecture.${layer.key}.capabilities.${capability.key}` as any)}
                    </li>
                  ))}
                </ul>
                <p className="text-[15px] leading-[1.55] text-muted">{t(`architecture.${layer.key}.description`)}</p>
              </div>
            ))}
          </div>
          <div className={cn(CARD, "mt-[29px] flex flex-col gap-4 p-8 md:flex-row md:items-start md:gap-6")}>
            <BrandIcon name="traceability" size={40} className="shrink-0" />
            <div>
              <h3 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                {t("architecture.auditTrail.title")}
              </h3>
              <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.55] text-muted">{t("architecture.auditTrail.description")}</p>
            </div>
          </div>
        </div>
      </section>

      <FeatureCards
        heading={t("control.heading")}
        intro={t("control.subtitle")}
        items={controls.map((control) => ({
          title: t(`control.features.${control.key}.title`),
          text: t(`control.features.${control.key}.description`),
          icon: control.icon,
        }))}
      />

      {/* Comparison */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("comparison.heading")} />
          <div className="max-w-5xl">
            <ComparisonTable
              caption={t("comparison.caption")}
              columns={[t("comparison.columns.capability"), t("comparison.columns.traditional"), t("comparison.columns.trueaim")]}
              rows={comparisonRows.map((row) => ({
                label: t(`comparison.rows.${row}.capability`),
                cells: [
                  t(`comparison.rows.${row}.traditional`),
                  <span key={row} className="font-medium text-strong">
                    {t(`comparison.rows.${row}.trueaim`)}
                  </span>,
                ],
              }))}
            />
          </div>
        </div>
      </section>

      {/* Research partnership */}
      <section className={SECTION_TIGHT}>
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[24px] font-bold leading-[1.2] text-strong md:text-[28px]">{t("research.heading")}</h2>
          <p className="mt-4 max-w-[70ch] text-[18px] leading-[30px] text-body">
            {t("research.descriptionStart")}{" "}
            <Link href="/partners/zhaw" className="text-link hover:underline">{t("research.zhawName")}</Link>{" "}
            {t("research.descriptionMiddle")}{" "}
            <Link href="/partners/innosuisse" className="text-link hover:underline">{t("research.innosuisseName")}</Link>
            {t("research.descriptionEnd")}
          </p>
        </div>
      </section>

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <RelatedLinks heading={t("related.heading")} links={related} />
        </div>
      </section>

      <FaqSection heading={t("faq.heading")} faqs={faqs} />

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
