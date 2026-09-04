"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FileText,
  Shield,
  CheckCircle,
  Link2,
  RefreshCw,
  Scale,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/brand/Button";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const clauses = [
  { ref: "Art. 5.2.1", desc: "Medical emergency coverage", delay: 0.3 },
  { ref: "Art. 5.2.3", desc: "Repatriation benefits", delay: 0.6 },
  { ref: "Art. 7.1.3", desc: "Emergency transport", delay: 0.9 },
];

const evidenceFiles = [
  { name: "medical_report.pdf", location: "pg. 2, para 3", delay: 1.2 },
  { name: "hospital_invoice.pdf", location: "line items 1-4", delay: 1.4 },
  { name: "policy_certificate.pdf", location: "coverage schedule", delay: 1.6 },
];

export function DossierShowcase() {
  const t = useTranslations("decisionDossier");
  const [animationKey, setAnimationKey] = useState(0);

  const replay = useCallback(() => {
    setAnimationKey((k) => k + 1);
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <Eyebrow className="mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-4 h-4" strokeWidth={1.5} />
            {t("teaserBadge")}
          </Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-4">
            {t("teaserTitle")}
          </h2>
          <p className="text-lg text-body max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.raw("teaserDescription") }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-pill overflow-hidden bg-elevated shadow-card"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-hairline">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Shield className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-strong">{t("mockupTitle")}</div>
                      <div className="text-xs text-muted">
                        {t("mockupClaimId")} | Travel Insurance
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2, ease }}
                  >
                    <StatusPill tone="approved">{t("mockupCovered")}</StatusPill>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Policy Clauses */}
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-caption-sm text-subtle mb-3 flex items-center gap-2"
                  >
                    <Scale className="w-3 h-3" strokeWidth={1.5} />
                    {t("mockupPolicyClauses")}
                  </motion.div>
                  <div className="divide-hairline">
                    {clauses.map((clause) => (
                      <motion.div
                        key={clause.ref}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: clause.delay }}
                        className="flex items-center gap-3 py-2.5"
                      >
                        <CheckCircle className="w-4 h-4 text-approved-base flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-accent text-xs font-medium">{clause.ref}</span>
                        <span className="text-muted text-sm">{clause.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Evidence Trail */}
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="text-caption-sm text-subtle mb-3 flex items-center gap-2"
                  >
                    <FileText className="w-3 h-3" strokeWidth={1.5} />
                    {t("mockupEvidenceTrail")}
                  </motion.div>
                  <div className="rounded-pill bg-surface-muted p-3 divide-hairline">
                    {evidenceFiles.map((file) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: file.delay }}
                        className="flex items-center gap-2 text-xs py-1.5"
                      >
                        <Link2 className="w-3 h-3 text-accent flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-body">{file.name}</span>
                        <span className="text-muted">&rarr; {file.location}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Confidence Score */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="pt-4 border-t border-hairline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-approved-base" strokeWidth={1.5} />
                      <span className="text-sm text-muted">{t("mockupConfidenceLabel")}</span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-lg font-display font-semibold tabular-nums text-approved-dark"
                    >
                      {t("mockupConfidenceValue")}
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-pill bg-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "98.5%" }}
                      transition={{ duration: 1.5, delay: 2, ease }}
                      className="h-full rounded-pill bg-accent"
                    />
                  </div>
                </motion.div>

                {/* Replay Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex justify-center pt-2"
                >
                  <Button variant="ghost" size="sm" onClick={replay}>
                    <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                    {t("mockupReplay")}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Differentiator callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, ease }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted" dangerouslySetInnerHTML={{ __html: t.raw("mockupDifferentiator") }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
