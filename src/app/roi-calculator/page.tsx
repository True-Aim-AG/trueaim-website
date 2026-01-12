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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--secondary)] opacity-5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              ROI Calculator
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Calculate Your
              <br />
              <span className="text-[var(--primary)]">Claims Automation Savings</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              See how much you could save by automating claims decisions with TrueAim.ai. Adjust the inputs to match your operation.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)]" />
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
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
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
              className="bg-white rounded-xl border border-[var(--border)] p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">89% Faster Processing</h3>
              <p className="text-sm text-[var(--text-muted)]">
                MIRA processes most claims in under 3 seconds. Complex cases still go to handlers, but with pre-analyzed data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl border border-[var(--border)] p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Automation Rate Varies</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Depending on your current processes, 50-85% of claims can be fully automated. We use conservative estimates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-[var(--border)] p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Platform Costs Included</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Our calculations include estimated platform fees. Final pricing depends on your specific requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--text-primary)] to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Ready for a Detailed Assessment?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Our team can analyze your specific claims data, policy complexity, and operational constraints to provide a customized ROI projection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                Get Custom Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products/mira"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors text-lg"
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
