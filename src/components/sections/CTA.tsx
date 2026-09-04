"use client";

import { motion } from "framer-motion";
import { Calendar, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/brand/Button";
import { Glow } from "@/components/brand/Glow";

const ease = [0.4, 0, 0.2, 1] as const;

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-page-tint py-24 px-6">
      <Glow variant="soft" size={520} className="absolute -right-40 -top-40" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6">
            {t("title")}
          </h2>

          <p className="text-lg md:text-xl text-body mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" variant="primary" size="lg">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
              {t("bookDemo")}
            </ButtonLink>
            <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
              <Calculator className="w-5 h-5" strokeWidth={1.5} />
              {t("getImpact")}
            </ButtonLink>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-16 pt-10 border-t border-hairline"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-blue" />
              {t("trustCompliance")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-blue" />
              {t("trustSwiss")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-blue" />
              {t("trustEnterprise")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
