"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { slideFromLeft, slideFromRight, staggerContainer } from "@/lib/animations";
import { PartnerLogos } from "./PartnerLogos";

const awards = [
  {
    country: "Switzerland",
    title: "Innovationspreis der Schweizer Assekuranz",
  },
  {
    country: "Germany",
    title: "Digitale Leuchtturm Versicherungen – 1. Rang",
  },
  {
    country: "Italy",
    title: "Miglior InsurTech – IKN Awards",
  },
];

export function TrustBar() {
  return (
    <section className="py-24 px-6 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Backed by Switzerland&apos;s Innovation Ecosystem
          </h2>
          <p className="text-base text-[var(--text-secondary)] mt-3">
            Award-winning technology backed by Innosuisse, ZHAW, and Yarowa AG
          </p>
        </motion.div>

        {/* Awards - Horizontal scroll on mobile, flex row on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-4 md:gap-6 mb-10 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.country}
              variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 md:flex-1 max-w-sm md:max-w-none"
            >
              <div className="flex items-center gap-5 glass-panel p-6 h-full">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    {award.country}
                  </p>
                  <p className="text-base font-semibold text-[var(--text-primary)] leading-tight">
                    {award.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partner Logos - Animated Marquee */}
        <PartnerLogos />
      </div>
    </section>
  );
}
