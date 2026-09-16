"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";

/** Pipeline row from the marketing "Example" frame: brand icons above Inter Tight labels. */
const steps: { key: "ingest" | "process" | "decide" | "execute" | "audit"; icon: BrandIconName }[] = [
  { key: "ingest", icon: "ingestion" },
  { key: "process", icon: "classification" },
  { key: "decide", icon: "decision" },
  { key: "execute", icon: "workflow" },
  { key: "audit", icon: "traceability" },
];

export function PipelineRow() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:pb-[120px] md:pt-10">
        <h2 className="sr-only">{t("pipelineTitle")}</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className="grid gap-5"
            >
              <BrandIcon name={step.icon} size={96} className="h-[72px] w-[72px] md:h-[96px] md:w-[96px]" />
              <div>
                <div className="font-display text-[24px] font-medium leading-[1.1] text-strong md:text-[28px]">{t(`steps.${step.key}.label`)}</div>
                <p className="mt-2 text-sm text-muted">{t(`steps.${step.key}.shortDesc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
