import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  FileText,
  Link2,
  CheckCircle,
  ArrowRight,
  Scale,
  FileSearch,
  Shield,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const dossierContentsMeta = [
  { key: "inputSummary" as const, icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { key: "policyMatch" as const, icon: Scale, color: "text-indigo-400", bgColor: "bg-indigo-500/20" },
  { key: "logicTrace" as const, icon: FileSearch, color: "text-purple-400", bgColor: "bg-purple-500/20" },
  { key: "evidenceLinks" as const, icon: Link2, color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { key: "confidenceScore" as const, icon: Shield, color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
  { key: "replayCapability" as const, icon: RefreshCw, color: "text-orange-400", bgColor: "bg-orange-500/20" },
];

interface DecisionDossierProps {
  variant?: "full" | "teaser";
}

export async function DecisionDossier({ variant = "full" }: DecisionDossierProps) {
  const t = await getTranslations("decisionDossier");

  const dossierContents = dossierContentsMeta.map((meta) => ({
    icon: meta.icon,
    color: meta.color,
    bgColor: meta.bgColor,
    title: t(`contents.${meta.key}.title`),
    description: t(`contents.${meta.key}.description`),
  }));
  if (variant === "teaser") {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  {t("teaserBadge")}
                </div>
                <p className="text-lg font-semibold text-[var(--primary)] mb-2">
                  {t("teaserTagline")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                  {t("teaserTitle")}
                </h2>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("teaserDescription") }} />
                <Link
                  href="/technology#decision-dossier"
                  className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
                >
                  {t("teaserLink")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini dossier preview */}
              <div className="relative">
                <div className="glass-panel p-6 transform rotate-1">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">{t("previewTitle")}</div>
                      <div className="text-xs text-[var(--text-muted)] font-mono-data">{t("previewClaimId")}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--text-muted)]" dangerouslySetInnerHTML={{ __html: t.raw("previewDecision") }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--text-muted)]">{t("previewPolicy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--text-muted)]">{t("previewEvidence")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--text-muted)]" dangerouslySetInnerHTML={{ __html: t.raw("previewConfidence") }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    );
  }

  // Full variant for technology page
  return (
    <section id="decision-dossier" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            {t("fullBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {t("fullTitle")}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            {t("fullDescription")}
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Dossier contents list */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {dossierContents.map((item, index) => (
                <MotionDiv
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          {/* Visual dossier mockup */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="glass-panel overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--primary-dark)] to-[rgba(11,12,21,0.9)] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--subtle-bg)] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("mockupTitle")}</div>
                    <div className="text-xs text-white/60">{t("mockupGenerated")}</div>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                    {t("mockupCovered")}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Claim Info */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{t("mockupClaimRef")}</div>
                  <div className="font-mono-data text-sm glass-panel-light p-3">
                    <span className="text-[var(--text-primary)]">{t("mockupClaimId")}</span>
                    <span className="text-[var(--text-muted)]">{t("mockupClaimDetails")}</span>
                  </div>
                </div>

                {/* Policy Match */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{t("mockupPolicyClauses")}</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--primary)] font-mono-data">{t("mockupClause1Ref")}</span>
                      <span className="text-[var(--text-muted)]">{t("mockupClause1Desc")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[var(--primary)] font-mono-data">{t("mockupClause2Ref")}</span>
                      <span className="text-[var(--text-muted)]">{t("mockupClause2Desc")}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{t("mockupEvidenceTrail")}</div>
                  <div className="glass-panel-light p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)] font-mono-data">medical_report.pdf</span>
                      <span className="text-[var(--text-muted)]">→ pg. 2, para 3</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)] font-mono-data">hospital_invoice.pdf</span>
                      <span className="text-[var(--text-muted)]">→ line items 1-4</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)] font-mono-data">policy_certificate.pdf</span>
                      <span className="text-[var(--text-muted)]">→ coverage schedule</span>
                    </div>
                  </div>
                </div>

                {/* Confidence & Replay */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-[var(--text-muted)]">{t("mockupConfidenceLabel")}</span>
                    <span className="text-sm font-semibold text-emerald-400 font-mono-data">{t("mockupConfidenceValue")}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[var(--primary)] font-medium">
                    <RefreshCw className="w-3 h-3" />
                    {t("mockupReplay")}
                  </span>
                </div>
              </div>
            </div>

            {/* Differentiator callout */}
            <div className="mt-6 p-4 glass-panel">
              <p className="text-sm text-[var(--text-secondary)] text-center" dangerouslySetInnerHTML={{ __html: t.raw("mockupDifferentiator") }} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
