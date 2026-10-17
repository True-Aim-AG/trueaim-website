import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { cn } from "@/lib/utils";
import { CARD, CARD_HOVER, CtaBand, PageHero, SECTION, SECTION_LILAC } from "@/components/content";

import { Brain, Scale, GraduationCap, AlertTriangle } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";
import { DecisionDossier } from "@/components/sections/DecisionDossier";

const agenticCapabilityKeys = ["docReading", "dataExtraction", "classification", "orchestration"] as const;
const agenticCapabilityIcons: BrandIconName[] = ["document", "extraction", "classification", "workflow"];

const deterministicCapabilityKeys = ["coverageRules", "policyLogic", "costCalculation", "decisionOutput"] as const;
const deterministicCapabilityIcons: BrandIconName[] = ["rules", "logic", "processing", "decision"];

const comparisonRowKeys = ["consistency", "auditTrail", "explainability", "euAiAct"] as const;

const controlFeatureMeta = [
  { key: "replayLogs", icon: "traceability" as BrandIconName },
  { key: "ruleTraceability", icon: "rule-applied" as BrandIconName },
  { key: "approvalGates", icon: "human-review" as BrandIconName },
  { key: "exceptionRouting", icon: null },
  { key: "confidenceScoring", icon: "quality" as BrandIconName },
] as const;

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("technology");
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={t("hero.badge")}
        title={
          <>
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </>
        }
        summary={t("hero.description")}
        texture={{ name: "glass", position: "72% 18%" }}
      />

      {/* Problem Section */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
              {t("problem.heading")}
            </h2>
            <p className="text-lede text-body">
              {t("problem.description")}
            </p>
            <p className="text-xl font-semibold text-accent mt-6">
              {t("problem.emphasis")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Architecture Section */}
      <section className={SECTION_LILAC}>
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("architecture.heading")}
            </h2>
            <p className="text-lg text-body">
              {t("architecture.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agentic AI Layer */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn(CARD, "p-8")}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-pill bg-lilac grid place-items-center">
                  <Brain className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-strong">
                    {t("architecture.agentic.title")}
                  </h3>
                  <p className="text-accent font-medium">{t("architecture.agentic.subtitle")}</p>
                </div>
              </div>

              <ul className="space-y-4">
                {agenticCapabilityKeys.map((capKey, index) => (
                  <li key={capKey} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-pill bg-lilac flex items-center justify-center flex-shrink-0">
                      <BrandIcon name={agenticCapabilityIcons[index]} size={18} />
                    </div>
                    <span className="text-strong font-medium">{t(`architecture.agentic.capabilities.${capKey}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-surface-muted rounded-[12px]">
                <p className="text-sm text-body">
                  {t("architecture.agentic.description")}
                </p>
              </div>
            </MotionDiv>

            {/* Deterministic Logic Layer */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn(CARD, "p-8")}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-pill bg-lilac grid place-items-center">
                  <Scale className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-strong">
                    {t("architecture.deterministic.title")}
                  </h3>
                  <p className="text-accent font-medium">{t("architecture.deterministic.subtitle")}</p>
                </div>
              </div>

              <ul className="space-y-4">
                {deterministicCapabilityKeys.map((capKey, index) => (
                  <li key={capKey} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-pill bg-lilac flex items-center justify-center flex-shrink-0">
                      <BrandIcon name={deterministicCapabilityIcons[index]} size={18} />
                    </div>
                    <span className="text-strong font-medium">{t(`architecture.deterministic.capabilities.${capKey}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-surface-muted rounded-[12px]">
                <p className="text-sm text-body">
                  {t("architecture.deterministic.description")}
                </p>
              </div>
            </MotionDiv>
          </div>

          {/* Audit Trail */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-accent-soft rounded-[12px] p-8 text-center"
          >
            <BrandIcon name="traceability" size={40} className="mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2 text-strong">{t("architecture.auditTrail.title")}</h3>
            <p className="text-body max-w-2xl mx-auto">
              {t("architecture.auditTrail.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Decision Dossier Section */}
      <DecisionDossier variant="full" />

      {/* Control Layer Section */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <Eyebrow className="mb-4">{t("control.badge")}</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("control.heading")}
            </h2>
            <p className="text-lg text-body">
              {t("control.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlFeatureMeta.map((feature, index) => (
              <MotionDiv
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(CARD, CARD_HOVER, "p-6")}
              >
                <div className="w-12 h-12 rounded-pill bg-lilac grid place-items-center mb-4">
                  {feature.icon ? (
                    <BrandIcon name={feature.icon} size={24} />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="font-display font-semibold text-strong mb-2">{t(`control.features.${feature.key}.title`)}</h3>
                <p className="text-sm text-muted">{t(`control.features.${feature.key}.description`)}</p>
              </MotionDiv>
            ))}
          </div>

          {/* Control philosophy callout */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-card shadow-card rounded-pill p-8 text-center"
          >
            <h3 className="font-display text-xl font-semibold text-strong mb-3">{t("control.philosophyHeading")}</h3>
            <p className="text-lede text-body max-w-[820px] mx-auto">
              {t("control.philosophy")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={SECTION_LILAC}>
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("comparison.heading")}
            </h2>
            <p className="text-lg text-body">
              {t("comparison.subtitle")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(CARD, "overflow-hidden")}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="text-left p-6 font-display text-strong font-semibold">{t("comparison.columns.capability")}</th>
                  <th className="text-center p-6 text-muted font-semibold">{t("comparison.columns.traditional")}</th>
                  <th className="text-center p-6 text-accent font-semibold">{t("comparison.columns.trueaim")}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRowKeys.map((rowKey, index) => (
                  <tr key={rowKey} className={index < comparisonRowKeys.length - 1 ? "border-b border-hairline" : ""}>
                    <td className="p-6 text-strong font-medium">{t(`comparison.rows.${rowKey}.capability`)}</td>
                    <td className="p-6 text-center text-muted">{t(`comparison.rows.${rowKey}.traditional`)}</td>
                    <td className="p-6 text-center">
                      <StatusPill tone="approved" size="sm">
                        {t(`comparison.rows.${rowKey}.trueaim`)}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionDiv>
        </div>
      </section>

      {/* Research Partnership */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(CARD, "p-8 md:p-12 text-center")}
          >
            <div className="w-16 h-16 rounded-pill bg-lilac grid place-items-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold leading-[1.2] text-strong md:text-3xl mb-4">
              {t("research.heading")}
            </h2>
            <p className="text-lede text-body">
              {t("research.descriptionStart")} <Link href="/partners/zhaw" className="text-link hover:underline">{t("research.zhawName")}</Link> {t("research.descriptionMiddle")} <Link href="/partners/innosuisse" className="text-link hover:underline">{t("research.innosuisseName")}</Link>{t("research.descriptionEnd")}
            </p>
          </MotionDiv>
        </div>
      </section>

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </div>
  );
}
