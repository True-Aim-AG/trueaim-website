"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const awards = [
  {
    country: "Switzerland",
    title: "Innovationspreis der Schweizer Assekuranz",
  },
  {
    country: "Germany",
    title: "Digitale Leuchtturm Versicherungen — 1. Rang",
  },
  {
    country: "Italy",
    title: "Miglior InsurTech — IKN Awards",
  },
];

const partners = ["Innosuisse", "ZHAW", "Yarowa"];

export function TrustBar() {
  return (
    <section className="py-12 px-6 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
            Backed by Switzerland&apos;s Innovation Ecosystem
          </p>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.country}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-4 glass-panel p-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  {award.country}
                </p>
                <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                  {award.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-xl font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
