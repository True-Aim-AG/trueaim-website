"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Calendar, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]" />

      {/* Teal radial glow behind CTA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            {t("title")}
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-lg transition-all shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40"
              >
                <Calendar className="w-5 h-5" />
                {t("bookDemo")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/impact-estimator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium text-lg hover:bg-[var(--primary-light)] hover:border-[var(--primary)]/30 transition-all backdrop-blur-sm"
              >
                <Calculator className="w-5 h-5" />
                {t("getImpact")}
              </Link>
            </motion.div>
          </div>
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
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              {t("trustCompliance")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              {t("trustSwiss")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              {t("trustEnterprise")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
