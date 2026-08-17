import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  CheckCircle,
  MapPin,
  Eye,
  History,
  Building2,
  ArrowRight,
} from "lucide-react";
import { SwitzerlandMap } from "@/components/ui/SwitzerlandMap";

const publicDocs = [
  { key: "privacy", href: "/privacy" },
  { key: "security", href: "/security" },
  { key: "ethics", href: "/ethics" },
  { key: "subProcessors", href: "/sub-processors" },
  { key: "product", href: "/product" },
  { key: "support", href: "/support" },
  { key: "changelog", href: "/changelog" },
] as const;

const complianceBadgeMeta = [
  { key: "gdpr", status: "aligned", icon: Shield },
  { key: "swissFadp", status: "aligned", icon: Shield },
  { key: "euAiAct", status: "aligned", icon: Eye },
  { key: "swissHosting", status: "provided", icon: MapPin },
  { key: "iso27001", status: "roadmap", icon: FileCheck },
  { key: "soc2", status: "roadmap", icon: Lock },
  { key: "finma", status: "aligned", icon: Building2 },
  { key: "dora", status: "aligned", icon: Shield },
] as const;

const securityCategoryMeta = [
  {
    key: "dataProtection",
    icon: Lock,
    featureKeys: ["encryptionAtRest", "encryptionInTransit", "dataIsolation", "keyManagement"],
  },
  {
    key: "accessControl",
    icon: Key,
    featureKeys: ["rbac", "sso", "mfa", "sessionManagement"],
  },
  {
    key: "auditMonitoring",
    icon: History,
    featureKeys: ["auditLogs", "decisionReplay", "accessLogging", "retentionPolicies"],
  },
] as const;

const euAiActFeatureKeys = [
  "humanOversight",
  "transparency",
  "technicalDocumentation",
  "riskManagement",
  "dataGovernance",
  "accuracyRobustness",
] as const;


export default async function TrustPage() {
  const t = await getTranslations("trust");
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
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

      {/* Compliance Badges Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("compliance.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("compliance.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceBadgeMeta.map((badge, index) => (
              <MotionDiv
                key={badge.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    badge.status === 'provided' || badge.status === 'aligned'
                      ? 'bg-emerald-500/20'
                      : 'bg-amber-500/20'
                  }`}>
                    <badge.icon className={`w-6 h-6 ${
                      badge.status === 'provided' || badge.status === 'aligned'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--text-primary)]">{t(`compliance.badges.${badge.key}.name`)}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        badge.status === 'provided' ? 'bg-emerald-500/20 text-emerald-400' :
                        badge.status === 'aligned' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {t(`compliance.statusLabels.${badge.status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{t(`compliance.badges.${badge.key}.description`)}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Data Residency Map */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                {t("dataResidency.heading")}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                {t("dataResidency.description")}
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">{t("dataResidency.swissDataCenter.title")}</strong>
                    <p className="text-sm text-[var(--text-muted)]">{t("dataResidency.swissDataCenter.description")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">{t("dataResidency.euProcessingZones.title")}</strong>
                    <p className="text-sm text-[var(--text-muted)]">{t("dataResidency.euProcessingZones.description")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">{t("dataResidency.noThirdCountry.title")}</strong>
                    <p className="text-sm text-[var(--text-muted)]">{t("dataResidency.noThirdCountry.description")}</p>
                  </div>
                </li>
              </ul>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <SwitzerlandMap label={t("dataResidency.mapLabels.switzerland")} />
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("security.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("security.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityCategoryMeta.map((category, index) => (
              <MotionDiv
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                  <category.icon className="w-7 h-7 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                  {t(`security.categories.${category.key}.title`)}
                </h3>
                <ul className="space-y-4">
                  {category.featureKeys.map((fKey) => (
                    <li key={fKey} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                      <div className="font-medium text-[var(--text-primary)] mb-1">{t(`security.categories.${category.key}.features.${fKey}.name`)}</div>
                      <div className="text-sm text-[var(--text-muted)]">{t(`security.categories.${category.key}.features.${fKey}.detail`)}</div>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* EU AI Act Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Eye className="w-4 h-4" />
              {t("euAiAct.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("euAiAct.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              {t("euAiAct.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {euAiActFeatureKeys.map((fKey, index) => (
              <MotionDiv
                key={fKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-[var(--text-primary)]">{t(`euAiAct.features.${fKey}.requirement`)}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] ml-8">{t(`euAiAct.features.${fKey}.description`)}</p>
              </MotionDiv>
            ))}
          </div>

          {/* Deterministic advantage callout */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-panel p-8 text-center"
          >
            <FileCheck className="w-10 h-10 text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              {t("euAiAct.callout.heading")}
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t("euAiAct.callout.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Public Documents */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("publicDocuments.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              {t("publicDocuments.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicDocs.map((doc, index) => (
              <MotionDiv
                key={doc.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={doc.href}
                  className="glass-panel glass-panel-hover p-6 flex items-start justify-between gap-4 h-full group"
                >
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                      {t(`publicDocuments.items.${doc.key}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {t(`publicDocuments.items.${doc.key}.description`)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
