import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";

import { ArrowRight, Brain, Scale, GraduationCap, AlertTriangle } from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Glow } from "@/components/brand/Glow";
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

export default async function TechnologyPage() {
  const t = await getTranslations("technology");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow className="mb-6">{t("hero.badge")}</Eyebrow>

            <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lede text-body max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
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
              className="bg-card shadow-card rounded-pill p-8"
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

              <div className="mt-6 p-4 bg-surface-muted rounded-pill">
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
              className="bg-card shadow-card rounded-pill p-8"
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

              <div className="mt-6 p-4 bg-surface-muted rounded-pill">
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
            className="mt-8 bg-accent-soft rounded-pill p-8 text-center"
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Eyebrow className="mb-4">{t("control.badge")}</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("control.heading")}
            </h2>
            <p className="text-lg text-body max-w-3xl mx-auto">
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
                className="bg-card shadow-card rounded-pill p-6 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
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
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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
            className="bg-card shadow-card rounded-pill overflow-hidden"
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card shadow-card rounded-pill p-8 md:p-12 text-center"
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

      {/* CTA Section */}
      <section data-theme="dark" className="relative overflow-hidden bg-page-tint py-20 px-6">
        <Glow variant="soft" size={480} className="absolute -right-40 -top-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-body mb-10">
              {t("cta.description")}
            </p>
            <ButtonLink href="/contact" variant="primary" size="lg">
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </ButtonLink>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
