import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";

import {
  ArrowRight,
  Brain,
  Cpu,
  FileSearch,
  Workflow,
  Shield,
  Scale,
  GraduationCap,
  CheckCircle,
  RefreshCw,
  GitBranch,
  UserCheck,
  AlertTriangle,
  Gauge,
} from "lucide-react";
import { DecisionDossier } from "@/components/sections/DecisionDossier";

const agenticCapabilityKeys = ["docReading", "dataExtraction", "classification", "orchestration"] as const;

const deterministicCapabilityKeys = ["coverageRules", "policyLogic", "costCalculation", "decisionOutput"] as const;

const comparisonRowKeys = ["consistency", "auditTrail", "explainability", "euAiAct"] as const;

const controlFeatureMeta = [
  { key: "replayLogs", icon: RefreshCw, color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { key: "ruleTraceability", icon: GitBranch, color: "text-indigo-400", bgColor: "bg-indigo-500/20" },
  { key: "approvalGates", icon: UserCheck, color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
  { key: "exceptionRouting", icon: AlertTriangle, color: "text-amber-400", bgColor: "bg-amber-500/20" },
  { key: "confidenceScoring", icon: Gauge, color: "text-purple-400", bgColor: "bg-purple-500/20" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--subtle-bg)] text-[var(--text-secondary)] text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-[var(--primary)]">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("problem.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {t("problem.description")}
            </p>
            <p className="text-xl font-semibold text-[var(--primary)] mt-6">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("architecture.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--aurora-cyan)]/30 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[var(--aurora-cyan)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {t("architecture.agentic.title")}
                  </h3>
                  <p className="text-[var(--aurora-cyan)] font-medium">{t("architecture.agentic.subtitle")}</p>
                </div>
              </div>

              <ul className="space-y-4">
                {agenticCapabilityKeys.map((capKey) => (
                  <li key={capKey} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--aurora-cyan)]/20 flex items-center justify-center flex-shrink-0">
                      <FileSearch className="w-4 h-4 text-[var(--aurora-cyan)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{t(`architecture.agentic.capabilities.${capKey}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 glass-panel-light">
                <p className="text-sm text-[var(--text-secondary)]">
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/30 flex items-center justify-center">
                  <Scale className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {t("architecture.deterministic.title")}
                  </h3>
                  <p className="text-[var(--primary)] font-medium">{t("architecture.deterministic.subtitle")}</p>
                </div>
              </div>

              <ul className="space-y-4">
                {deterministicCapabilityKeys.map((capKey) => (
                  <li key={capKey} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{t(`architecture.deterministic.capabilities.${capKey}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 glass-panel-light">
                <p className="text-sm text-[var(--text-secondary)]">
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
            className="mt-8 glass-panel border border-emerald-500/20 bg-emerald-500/10 rounded-2xl p-8 text-center"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-400 opacity-90" />
            <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{t("architecture.auditTrail.title")}</h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              {t("control.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("control.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
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
                className="glass-panel glass-panel-hover p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t(`control.features.${feature.key}.title`)}</h3>
                <p className="text-sm text-[var(--text-muted)]">{t(`control.features.${feature.key}.description`)}</p>
              </MotionDiv>
            ))}
          </div>

          {/* Control philosophy callout */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-panel p-8 text-center"
          >
            <p className="text-lg text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">{t("control.philosophyPrefix")}</strong> {t("control.philosophy")}
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("comparison.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("comparison.subtitle")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-6 text-[var(--text-primary)] font-semibold">{t("comparison.columns.capability")}</th>
                  <th className="text-center p-6 text-[var(--text-muted)] font-semibold">{t("comparison.columns.traditional")}</th>
                  <th className="text-center p-6 text-[var(--primary)] font-semibold">{t("comparison.columns.trueaim")}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRowKeys.map((rowKey, index) => (
                  <tr key={rowKey} className={index < comparisonRowKeys.length - 1 ? "border-b border-[var(--border)]" : ""}>
                    <td className="p-6 text-[var(--text-primary)] font-medium">{t(`comparison.rows.${rowKey}.capability`)}</td>
                    <td className="p-6 text-center text-[var(--text-muted)]">{t(`comparison.rows.${rowKey}.traditional`)}</td>
                    <td className="p-6 text-center">
                      <span className="inline-flex items-center gap-2 text-[var(--secondary)] font-medium">
                        <CheckCircle className="w-5 h-5" />
                        {t(`comparison.rows.${rowKey}.trueaim`)}
                      </span>
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
            className="glass-panel p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--aurora-cyan)]/20 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-[var(--aurora-cyan)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("research.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {t("research.descriptionStart")} <Link href="/partners/zhaw" className="text-[var(--primary)] underline hover:text-[var(--primary-hover)]">{t("research.zhawName")}</Link> {t("research.descriptionMiddle")} <Link href="/partners/innosuisse" className="text-[var(--primary)] underline hover:text-[var(--primary-hover)]">{t("research.innosuisseName")}</Link>{t("research.descriptionEnd")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)]/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
