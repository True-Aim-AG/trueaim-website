"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { PartnerLogos } from "./PartnerLogos";

const awards = [
  {
    country: "Switzerland",
    title: "Innovationspreis der Schweizer Assekuranz",
    image: "/awards/swiss-innovation.png",
  },
  {
    country: "Germany",
    title: "Digitaler Leuchtturm Versicherungen - 1. Rang",
    image: "/awards/digitaler-leuchtturm.png",
    darkBg: true,
  },
  {
    country: "Italy",
    title: "Miglior InsurTech",
    titleLine2: "IKN Awards",
    image: "/awards/ikn-italy.png",
  },
];

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="text-base text-[var(--text-secondary)] mt-3">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-4 md:gap-6 mb-10">
          {awards.map((award, index) => (
            <motion.div
              key={award.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 md:flex-1 max-w-sm md:max-w-none group"
            >
              <div className="flex items-center gap-5 p-6 h-full rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] card-glow transition-all">
                <div className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center p-2 ${
                  award.darkBg ? 'bg-slate-600' : 'bg-white'
                } group-hover:shadow-lg transition-shadow`}>
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    {award.country}
                  </p>
                  <p className="text-base font-semibold text-[var(--text-primary)] leading-tight">
                    <span className="block">{award.title}</span>
                    {award.titleLine2 && <span className="block">{award.titleLine2}</span>}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <PartnerLogos />
      </div>
    </section>
  );
}
