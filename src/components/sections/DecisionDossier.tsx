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
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const dossierContentsMeta = [
  { key: "inputSummary" as const, icon: FileText },
  { key: "policyMatch" as const, icon: Scale },
  { key: "logicTrace" as const, icon: FileSearch },
  { key: "evidenceLinks" as const, icon: Link2 },
  { key: "confidenceScore" as const, icon: Shield },
  { key: "replayCapability" as const, icon: RefreshCw },
];

interface DecisionDossierProps {
  variant?: "full" | "teaser";
}

export async function DecisionDossier({ variant = "full" }: DecisionDossierProps) {
  const t = await getTranslations("decisionDossier");

  const dossierContents = dossierContentsMeta.map((meta) => ({
    icon: meta.icon,
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
            transition={{ duration: 0.6, ease }}
            className="rounded-pill bg-elevated shadow-card p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Eyebrow className="mb-4 inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                  {t("teaserBadge")}
                </Eyebrow>
                <p className="text-lg font-semibold text-accent mb-2">
                  {t("teaserTagline")}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">
                  {t("teaserTitle")}
                </h2>
                <p className="text-body mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("teaserDescription") }} />
                <Link
                  href="/technology#decision-dossier"
                  className="inline-flex items-center gap-2 text-link hover:underline"
                >
                  {t("teaserLink")}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>

              {/* Mini dossier preview */}
              <div className="relative">
                <div className="rounded-pill bg-card shadow-swatch p-6">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-hairline">
                    <div className="w-10 h-10 rounded-pill bg-accent grid place-items-center">
                      <FileText className="w-5 h-5 text-on-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-strong">{t("previewTitle")}</div>
                      <div className="text-xs text-muted">{t("previewClaimId")}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-muted" dangerouslySetInnerHTML={{ __html: t.raw("previewDecision") }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-muted">{t("previewPolicy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-muted">{t("previewEvidence")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-muted" dangerouslySetInnerHTML={{ __html: t.raw("previewConfidence") }} />
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
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <Eyebrow className="mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-4 h-4" strokeWidth={1.5} />
            {t("fullBadge")}
          </Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-4">
            {t("fullTitle")}
          </h2>
          <p className="text-lg text-body max-w-3xl mx-auto">
            {t("fullDescription")}
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Dossier contents list */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="space-y-4">
              {dossierContents.map((item, index) => (
                <MotionDiv
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease }}
                  className="flex items-start gap-4 p-4 rounded-pill hover:bg-surface-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent flex-shrink-0">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-strong mb-1">{item.title}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
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
            transition={{ duration: 0.6, ease }}
            className="sticky top-24"
          >
            <div className="rounded-pill bg-elevated shadow-card overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-hairline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-semibold text-strong">{t("mockupTitle")}</div>
                    <div className="text-xs text-muted">{t("mockupGenerated")}</div>
                  </div>
                  <div className="ml-auto">
                    <StatusPill tone="approved">{t("mockupCovered")}</StatusPill>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Claim Info */}
                <div>
                  <div className="text-caption-sm text-subtle mb-2">{t("mockupClaimRef")}</div>
                  <div className="text-sm rounded-pill bg-surface-muted p-3">
                    <span className="text-strong">{t("mockupClaimId")}</span>
                    <span className="text-muted">{t("mockupClaimDetails")}</span>
                  </div>
                </div>

                {/* Policy Match */}
                <div>
                  <div className="text-caption-sm text-subtle mb-2">{t("mockupPolicyClauses")}</div>
                  <div className="divide-hairline">
                    <div className="flex items-center gap-2 text-sm py-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-accent">{t("mockupClause1Ref")}</span>
                      <span className="text-muted">{t("mockupClause1Desc")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm py-2">
                      <CheckCircle className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-accent">{t("mockupClause2Ref")}</span>
                      <span className="text-muted">{t("mockupClause2Desc")}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <div className="text-caption-sm text-subtle mb-2">{t("mockupEvidenceTrail")}</div>
                  <div className="rounded-pill bg-surface-muted p-3 divide-hairline">
                    <div className="flex items-center gap-2 text-xs py-1.5">
                      <Link2 className="w-3 h-3 text-accent" strokeWidth={1.5} />
                      <span className="text-muted">medical_report.pdf</span>
                      <span className="text-muted">→ pg. 2, para 3</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs py-1.5">
                      <Link2 className="w-3 h-3 text-accent" strokeWidth={1.5} />
                      <span className="text-muted">hospital_invoice.pdf</span>
                      <span className="text-muted">→ line items 1-4</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs py-1.5">
                      <Link2 className="w-3 h-3 text-accent" strokeWidth={1.5} />
                      <span className="text-muted">policy_certificate.pdf</span>
                      <span className="text-muted">→ coverage schedule</span>
                    </div>
                  </div>
                </div>

                {/* Confidence & Replay */}
                <div className="flex items-center justify-between pt-4 border-t border-hairline">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                    <span className="text-sm text-muted">{t("mockupConfidenceLabel")}</span>
                    <span className="text-sm font-display font-semibold tabular-nums text-approved-dark">{t("mockupConfidenceValue")}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-link font-medium">
                    <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
                    {t("mockupReplay")}
                  </span>
                </div>
              </div>
            </div>

            {/* Differentiator callout */}
            <div className="mt-6 p-4 rounded-pill bg-elevated shadow-card">
              <p className="text-sm text-body text-center" dangerouslySetInnerHTML={{ __html: t.raw("mockupDifferentiator") }} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
