"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import { ROICalculator } from "@/components/calculator/ROICalculator";

const benefits = [
  "No commitment required",
  "Based on real pilot data",
  "Instant results",
];

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              ROI Calculator
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Estimate Your
              <br />
              <span className="text-[var(--primary)]">Claims Automation Impact</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              See the estimated impact of automating claims decisions with TrueAim.ai. Adjust the inputs to match your operation. All estimates are conservative.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6 -mt-12">
        <div className="max-w-6xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* How We Calculate Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              How We Calculate Your Savings
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Our estimates are based on real pilot results and industry benchmarks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel glass-panel-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-white mb-2">89% Faster Processing</h3>
              <p className="text-sm text-[var(--text-muted)]">
                MIRA processes most claims in under 3 seconds. Complex cases still go to handlers, but with pre-analyzed data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel glass-panel-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Automation Rate Varies</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Depending on your current processes, 50-85% of claims can be fully automated. We use conservative estimates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel glass-panel-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Platform Costs Included</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Our calculations include estimated platform fees. Final pricing depends on your specific requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Ready for a Detailed Assessment?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Our team can analyze your specific claims data, policy complexity, and operational constraints to provide a customized ROI projection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Get Custom Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products/mira"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                See MIRA in Action
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
