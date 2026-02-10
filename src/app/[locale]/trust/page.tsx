import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  Globe,
  CheckCircle,
  MapPin,
  Eye,
  History,
  Building2,
} from "lucide-react";

const complianceBadgeMeta = [
  { key: "gdpr", status: "aligned", icon: Shield },
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
              {/* Stylized Europe map representation */}
              <div className="glass-panel p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                {/* Simplified Europe outline - decorative SVG background */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full opacity-[0.08]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M200 60 L220 70 L240 65 L260 80 L280 75 L300 90 L310 110 L320 130 L315 150 L325 170 L320 190 L310 210 L300 220 L290 240 L280 250 L260 260 L250 280 L240 290 L220 285 L200 290 L180 285 L170 270 L160 260 L150 240 L140 230 L130 210 L120 190 L115 170 L120 150 L115 130 L120 110 L130 90 L150 80 L170 75 L180 65 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-400"
                  />
                  <path
                    d="M100 120 L90 140 L85 160 L80 180 L85 200 L90 210 L100 220 L110 225"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                  <path
                    d="M320 100 L340 110 L350 130 L345 150 L340 160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                  <path
                    d="M140 280 L130 300 L140 320 L160 330 L180 325 L200 330 L220 325 L240 330 L260 320 L270 300 L260 280"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                </svg>

                <div className="absolute inset-4 border-2 border-dashed border-[var(--border)] rounded-xl" />

                {/* Switzerland marker */}
                <div className="relative z-10">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm font-semibold text-[var(--text-primary)] bg-[var(--subtle-bg)] px-2 py-1 rounded backdrop-blur-sm">
                        {t("dataResidency.mapLabels.switzerland")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* EU zone indicator */}
                <div className="absolute inset-8 border-2 border-blue-400/30 rounded-xl bg-blue-500/5" />
                <div className="absolute top-4 right-4 flex items-center gap-2 glass-panel-light px-3 py-1.5 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-400">{t("dataResidency.mapLabels.euZone")}</span>
                </div>
              </div>
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

    </div>
  );
}
