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
} from "lucide-react";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { productPillColors, productNames } from "@/lib/product-styles";
import { ButtonLink } from "@/components/brand/Button";
import { CARD, CtaBand, PageHero, SECTION, SECTION_LILAC } from "@/components/content";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const productLinks: Record<string, string> = {
  mira: "/platform/claims-decisioning",
  contextbuilder: "/platform",
  claimeval: "/platform",
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
          <h1 className="font-display text-2xl font-bold text-strong mb-4">
            {t("detail.notFound")}
          </h1>
          <Link
            href="/case-studies"
            className="text-link hover:underline"
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
      <PageHero
        title={study.title}
        texture={{ name: "glass", position: "100% 100%" }}
      >
        <div className="mt-8 space-y-6">
          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t("detail.allCaseStudies")}
          </Link>

          {/* Customer Info */}
          <div className="flex items-center gap-4">
            <div className="icon-plate w-16 h-16">
              <Building2 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-lg font-medium text-strong">
                {study.customer.name}
              </div>
              <div className="text-muted">
                {study.customer.industry} · {study.customer.size}
              </div>
            </div>
          </div>

          {/* Products & Timeline */}
          <div className="flex flex-wrap items-center gap-4">
            {study.products.map((product) => (
              <Link
                key={product}
                href={productLinks[product]}
                className={`text-sm px-3 py-1.5 font-medium ${productPillColors[product]}`}
              >
                {productNames[product]}
              </Link>
            ))}
            {study.timeline && (
              <div className="flex items-center gap-2 text-muted">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {study.timeline}
              </div>
            )}
          </div>
        </div>
      </PageHero>

      {/* Metrics Grid */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn(CARD, "px-[29px] py-[27px] text-center")}
              >
                <div className="text-kpi text-accent mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted">{metric.label}</div>
                {metric.improvement && (
                  <div className="text-xs text-subtle mt-1">
                    {metric.improvement}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className={SECTION_LILAC}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <h2 className="font-display text-2xl font-bold text-strong mb-4">
                  {t("detail.theChallenge")}
                </h2>
                <p className="text-body leading-relaxed">
                  {study.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <h2 className="font-display text-2xl font-bold text-strong mb-4">
                  {t("detail.theSolution")}
                </h2>
                <p className="text-body leading-relaxed">
                  {study.solution}
                </p>
              </motion.div>

              {/* Quote */}
              {study.quote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                  className="border-l-2 border-ta-blue pl-6"
                >
                  <Quote className="w-10 h-10 text-accent mb-4 opacity-40" strokeWidth={1.5} />
                  <blockquote className="text-body-lg text-strong italic mb-4">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-strong">
                      {study.quote.author}
                    </div>
                    <div className="text-muted">{study.quote.role}</div>
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
                transition={{ duration: 0.6, ease }}
                className={cn(CARD, "p-8")}
              >
                <h3 className="font-display font-semibold text-strong mb-4">
                  {t("detail.keyHighlights")}
                </h3>
                <ul className="space-y-3">
                  {study.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-body">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    {t("detail.getSimilarResults")}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {prevStudy ? (
              <Link
                href={`/case-studies/${prevStudy.slug}`}
                className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">{t("detail.previous")}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
              >
                <span className="text-sm">{t("detail.next")}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        heading={t("detail.ctaHeading")}
        lede={t("detail.ctaDescription")}
        buttons={[{ label: t("detail.requestPilot"), href: "/contact" }]}
      />
    </div>
  );
}
