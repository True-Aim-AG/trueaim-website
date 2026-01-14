"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Calculator, FileText } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle overlay to differentiate from rest of page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)]/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to See Auditable AI in Action?
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Book a 30-minute demo to see how TrueAim.ai can transform your claims operations.
          </p>

          <div className="flex flex-col items-center gap-4">
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
              >
                <Calendar className="w-5 h-5" />
                Book a Demo
              </Link>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-white font-medium hover:bg-white/10 transition-all text-lg backdrop-blur-sm"
              >
                <Calculator className="w-5 h-5" />
                Get ROI Estimate
              </Link>
            </div>
            {/* Tertiary links */}
            <div className="flex flex-wrap gap-6 justify-center text-sm mt-2">
              <Link
                href="/trust"
                className="text-[var(--text-muted)] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                Security & Compliance
              </Link>
              <Link
                href="/contact"
                className="text-[var(--text-muted)] hover:text-white transition-colors"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
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
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              Swiss-based hosting available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              GDPR compliant
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              EU AI Act ready
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
