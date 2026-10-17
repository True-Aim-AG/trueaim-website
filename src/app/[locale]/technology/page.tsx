import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";
import { ComparisonTable, FaqBlock, RelatedLinks, Summary, type FaqItem } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";

const PATH = "/technology";

const readingCapabilities: { key: "docReading" | "dataExtraction" | "classification" | "orchestration"; icon: BrandIconName }[] = [
  { key: "docReading", icon: "document" },
  { key: "dataExtraction", icon: "extraction" },
  { key: "classification", icon: "classification" },
  { key: "orchestration", icon: "workflow" },
];

const decidingCapabilities: { key: "coverageRules" | "policyLogic" | "costCalculation" | "decisionOutput"; icon: BrandIconName }[] = [
  { key: "coverageRules", icon: "rules" },
  { key: "policyLogic", icon: "logic" },
  { key: "costCalculation", icon: "processing" },
  { key: "decisionOutput", icon: "decision" },
];

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
    <div className="min-h-screen">
      <PageSeo locale={locale} path={PATH} template="technology" faqs={faqs} />

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.summary")}</Summary>
        </div>
      </section>

      {/* Why not a language model alone */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("problem.heading")}
          </h2>
          <div className="max-w-3xl space-y-4 text-body leading-[1.6]">
            <p>{t("problem.p1")}</p>
            <p>{t("problem.p2")}</p>
          </div>
        </div>
      </section>

      {/* Two layers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("architecture.heading")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(
              [
                { key: "reading", capabilities: readingCapabilities },
                { key: "deciding", capabilities: decidingCapabilities },
              ] as const
            ).map((layer) => (
              <div key={layer.key} className="bg-card shadow-card rounded-pill p-8">
                <h3 className="font-display text-2xl font-bold text-strong">{t(`architecture.${layer.key}.title`)}</h3>
                <p className="text-accent font-medium mb-6">{t(`architecture.${layer.key}.subtitle`)}</p>
                <ul className="space-y-4">
                  {layer.capabilities.map((capability) => (
                    <li key={capability.key} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-pill bg-lilac flex items-center justify-center flex-shrink-0">
                        <BrandIcon name={capability.icon} size={18} />
                      </div>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <span className="text-strong font-medium">{t(`architecture.${layer.key}.capabilities.${capability.key}` as any)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 p-4 bg-surface-muted rounded-pill text-sm text-body leading-[1.6]">
                  {t(`architecture.${layer.key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-accent-soft rounded-pill p-8 text-center">
            <BrandIcon name="traceability" size={40} className="mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2 text-strong">{t("architecture.auditTrail.title")}</h3>
            <p className="text-body max-w-2xl mx-auto leading-[1.6]">{t("architecture.auditTrail.description")}</p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Eyebrow className="mb-4">{t("control.eyebrow")}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-4">
            {t("control.heading")}
          </h2>
          <p className="text-lede text-body max-w-3xl mb-10">{t("control.subtitle")}</p>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controls.map((control) => (
              <li key={control.key} className="bg-card shadow-card rounded-pill p-6">
                <div className="w-12 h-12 rounded-pill bg-lilac grid place-items-center mb-4">
                  <BrandIcon name={control.icon} size={24} />
                </div>
                <h3 className="font-display font-semibold text-strong mb-2">{t(`control.features.${control.key}.title`)}</h3>
                <p className="text-sm text-muted leading-[1.6]">{t(`control.features.${control.key}.description`)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 bg-card shadow-card rounded-pill p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-strong mb-3">{t("control.philosophyHeading")}</h3>
            <p className="text-lede text-body max-w-[820px] mx-auto">{t("control.philosophy")}</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("comparison.heading")}
          </h2>
          <ComparisonTable
            caption={t("comparison.caption")}
            columns={[t("comparison.columns.capability"), t("comparison.columns.traditional"), t("comparison.columns.trueaim")]}
            rows={comparisonRows.map((row) => ({
              label: t(`comparison.rows.${row}.capability`),
              cells: [
                t(`comparison.rows.${row}.traditional`),
                <StatusPill key={row} tone="approved" size="sm">
                  {t(`comparison.rows.${row}.trueaim`)}
                </StatusPill>,
              ],
            }))}
          />
        </div>
      </section>

      {/* Research partnership */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-card shadow-card rounded-pill p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl font-bold leading-[1.2] text-strong md:text-3xl mb-4">
            {t("research.heading")}
          </h2>
          <p className="text-lede text-body">
            {t("research.descriptionStart")}{" "}
            <Link href="/partners/zhaw" className="text-link hover:underline">{t("research.zhawName")}</Link>{" "}
            {t("research.descriptionMiddle")}{" "}
            <Link href="/partners/innosuisse" className="text-link hover:underline">{t("research.innosuisseName")}</Link>
            {t("research.descriptionEnd")}
          </p>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RelatedLinks heading={t("related.heading")} links={related} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("faq.heading")}
          </h2>
          <FaqBlock faqs={faqs} headingLevel="h3" />
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lede text-body mb-10">{t("cta.description")}</p>
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("cta.button")}
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
