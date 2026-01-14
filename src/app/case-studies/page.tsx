"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock, TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

const productColors: Record<string, string> = {
  mira: "bg-indigo-100 text-indigo-700",
  contextbuilder: "bg-teal-100 text-teal-700",
  claimeval: "bg-blue-100 text-blue-700",
};

const productNames: Record<string, string> = {
  mira: "MIRA",
  contextbuilder: "ContextBuilder",
  claimeval: "ClaimEval",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Customer Success
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Real Results from
              <br />
              <span className="text-[var(--primary)]">Real Insurers</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              See how leading insurers are using TrueAim.ai to transform their claims operations with measurable, auditable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block glass-panel glass-panel-hover p-8 h-full group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[var(--text-muted)]" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {study.customer.name}
                        </div>
                        <div className="text-sm text-[var(--text-muted)]">
                          {study.customer.industry}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[var(--primary)] transition-colors">
                    {study.title}
                  </h3>

                  {/* Metrics Preview */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="glass-panel-light p-3">
                        <div className="text-2xl font-bold font-mono-data text-[var(--primary)]">
                          {metric.value}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Products Used */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.products.map((product) => (
                      <span
                        key={product}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${productColors[product]}`}
                      >
                        {productNames[product]}
                      </span>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <Clock className="w-4 h-4" />
                    {study.timeline}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading insurers who are transforming their claims operations with auditable AI. Start with a pilot on your closed claims.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                Request a Pilot
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors text-lg"
              >
                Calculate Your ROI
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
