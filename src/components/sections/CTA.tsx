"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Calculator, FileText } from "lucide-react";
import { scaleIn, fadeIn, springTransition } from "@/lib/animations";
import { useTranslations } from "next-intl";

export function CTA() {
  const t = useTranslations("cta");
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay to differentiate from rest of page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)]/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            {t("title")}
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <motion.div
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
                >
                  <Calendar className="w-5 h-5" />
                  {t("bookDemo")}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/impact-estimator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-all text-lg backdrop-blur-sm"
                >
                  <Calculator className="w-5 h-5" />
                  {t("getImpact")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-[var(--border)]"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              {t("trustCompliance")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              {t("trustSwiss")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              {t("trustEnterprise")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
