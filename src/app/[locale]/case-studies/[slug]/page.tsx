"use client";

import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  Quote,
  TrendingUp,
} from "lucide-react";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { productPillColors, productNames } from "@/lib/product-styles";

const productLinks: Record<string, string> = {
  mira: "/products/mira",
  contextbuilder: "/products/contextbuilder",
  claimeval: "/products/claimeval",
};

export default function CaseStudyPage() {
  const t = useTranslations("caseStudies");
  const params = useParams();
  const slug = params.slug as string;
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            {t("detail.notFound")}
          </h1>
          <Link
            href="/case-studies"
            className="text-[var(--primary)] hover:underline"
          >
            {t("detail.viewAll")}
          </Link>
        </div>
      </div>
    );
  }

  // Find next and previous case studies
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === slug);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("detail.allCaseStudies")}
            </Link>

            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <div>
                <div className="text-lg font-medium text-[var(--text-primary)]">
                  {study.customer.name}
                </div>
                <div className="text-[var(--text-muted)]">
                  {study.customer.industry} · {study.customer.size}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {study.title}
            </h1>

            {/* Products & Timeline */}
            <div className="flex flex-wrap items-center gap-4">
              {study.products.map((product) => (
                <Link
                  key={product}
                  href={productLinks[product]}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium ${productPillColors[product]} transition-colors`}
                >
                  {productNames[product]}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Clock className="w-4 h-4" />
                {study.timeline}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass-panel p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-mono-data text-[var(--primary)] mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">{metric.label}</div>
                {metric.improvement && (
                  <div className="text-xs text-[var(--secondary)] mt-1">
                    {metric.improvement}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {t("detail.theChallenge")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {study.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {t("detail.theSolution")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {study.solution}
                </p>
              </motion.div>

              {/* Quote */}
              {study.quote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-panel p-8 border-l-4 border-l-[var(--primary)]"
                >
                  <Quote className="w-10 h-10 text-[var(--primary)] mb-4 opacity-50" />
                  <blockquote className="text-lg text-[var(--text-primary)] italic mb-4">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--text-primary)]">
                      {study.quote.author}
                    </div>
                    <div className="text-[var(--text-muted)]">{study.quote.role}</div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  {t("detail.keyHighlights")}
                </h3>
                <ul className="space-y-3">
                  {study.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    {t("detail.getSimilarResults")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-6 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            {prevStudy ? (
              <Link
                href={`/case-studies/${prevStudy.slug}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">{t("detail.previous")}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                <span className="text-sm">{t("detail.next")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("detail.ctaHeading")}
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              {t("detail.ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              {t("detail.requestPilot")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
