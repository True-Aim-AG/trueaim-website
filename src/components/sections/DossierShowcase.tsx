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
      {/* Dark background differentiation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            {t("teaserBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {t("teaserTitle")}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.raw("teaserDescription") }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--card-bg)] backdrop-blur-md"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--background-tertiary)] to-[var(--background-secondary)] px-6 py-5 border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/15 flex items-center justify-center border border-[var(--primary)]/25">
                      <Shield className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">{t("mockupTitle")}</div>
                      <div className="text-xs text-[var(--text-muted)] font-mono-data">
                        {t("mockupClaimId")} | Travel Insurance
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, type: "spring", stiffness: 300 }}
                    className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
                  >
                    {t("mockupCovered")}
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
                    className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3 flex items-center gap-2"
                  >
                    <Scale className="w-3 h-3" />
                    {t("mockupPolicyClauses")}
                  </motion.div>
                  <div className="space-y-2">
                    {clauses.map((clause) => (
                      <motion.div
                        key={clause.ref}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: clause.delay }}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--subtle-bg)]/50 border border-[var(--border)]/50"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-[var(--primary)] font-mono-data text-xs font-medium">{clause.ref}</span>
                        <span className="text-[var(--text-muted)] text-sm">{clause.desc}</span>
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
                    className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3 flex items-center gap-2"
                  >
                    <FileText className="w-3 h-3" />
                    {t("mockupEvidenceTrail")}
                  </motion.div>
                  <div className="rounded-xl bg-[var(--subtle-bg)]/30 border border-[var(--border)]/50 p-3 space-y-2">
                    {evidenceFiles.map((file) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: file.delay }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Link2 className="w-3 h-3 text-[var(--primary)] flex-shrink-0" />
                        <span className="text-[var(--text-secondary)] font-mono-data">{file.name}</span>
                        <span className="text-[var(--text-muted)]">&rarr; {file.location}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Confidence Score */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="pt-4 border-t border-[var(--border)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-[var(--text-muted)]">{t("mockupConfidenceLabel")}</span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-lg font-bold text-emerald-400 font-mono-data"
                    >
                      {t("mockupConfidenceValue")}
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--subtle-bg)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "98.5%" }}
                      transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-emerald-400 to-emerald-300"
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
                  <button
                    onClick={replay}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--primary)]/30 text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)]/10 transition-all hover:border-[var(--primary)]/50 group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    {t("mockupReplay")}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Differentiator callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-[var(--text-muted)]" dangerouslySetInnerHTML={{ __html: t.raw("mockupDifferentiator") }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
