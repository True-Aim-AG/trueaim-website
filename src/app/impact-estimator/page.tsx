import Link from "next/link";
import dynamic from "next/dynamic";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Calculator, ArrowRight, CheckCircle } from "lucide-react";

const ROICalculator = dynamic(
  () => import("@/components/calculator/ROICalculator").then((m) => m.ROICalculator)
);

const benefits = [
  "Conservative estimates",
  "Based on real pilot data",
  "Instant indication",
];

export default function ImpactEstimatorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Impact Estimator
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Explore Your
              <br />
              <span className="text-[var(--primary)]">Potential Value</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              See the estimated impact of automating claims decisions with True Aim. Adjust the high-level inputs to match your operation.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {benefit}
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6 -mt-12">
        <div className="max-w-6xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
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
              Our team can analyse your specific claims data, policy complexity and operational constraints to provide a customized impact estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products/mira"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                See MIRA in Action
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
