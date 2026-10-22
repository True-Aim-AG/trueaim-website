"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Quote,
  FileText,
  ShieldCheck,
  Search,
  Layers,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { productPillColors, productNames } from "@/lib/product-styles";
import { ButtonLink } from "@/components/brand/Button";
import { CARD, CtaBand, PageHero, SECTION_LILAC } from "@/components/content";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const productLinks: Record<string, string> = {
  mira: "/platform/claims-decisioning",
  contextbuilder: "/platform",
  claimeval: "/platform",
};

const study = caseStudies.find((cs) => cs.slug === "vehicle-warranty-claims")!;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const solutionIcons = [FileText, ShieldCheck, Search, Layers];

const bold = (chunks: React.ReactNode) => (
  <span className="font-semibold text-strong">{chunks}</span>
);

export default function VehicleWarrantyCaseStudy() {
  const t = useTranslations("caseStudies");
  const facts = t.raw("vehicleWarranty.facts") as { label: string; value: string }[];
  const solutionItems = t.raw("vehicleWarranty.solution.items") as { title: string; desc: string }[];
  const timeColumns = t.raw("vehicleWarranty.timeSaving.columns") as string[][];
  const timeRows = t.raw("vehicleWarranty.timeSaving.rows") as string[][];
  const timeTotal = t.raw("vehicleWarranty.timeSaving.total") as string[];
  const bookColumns = t.raw("vehicleWarranty.book.columns") as string[];
  const bookRows = t.raw("vehicleWarranty.book.rows") as string[][];
  const bookTotal = t.raw("vehicleWarranty.book.total") as string[];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        eyebrow={t("vehicleWarranty.eyebrow")}
        title={t("vehicleWarranty.title")}
        summary={t("vehicleWarranty.summary")}
        texture={{ name: "glass", position: "100% 100%" }}
        visual={
          <Image
            src={study.customer.logo!}
            alt={`${study.customer.name} logo`}
            width={600}
            height={191}
            priority
            className="mx-auto h-auto w-full max-w-[340px]"
          />
        }
      >
        <div className="mt-8 space-y-6">
          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 py-2 text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t("detail.allCaseStudies")}
          </Link>

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

      {/* === FULL ARTICLE CONTENT === */}
      <section className={SECTION_LILAC}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
            {/* Main Content */}
            <article className="space-y-16 max-w-3xl">
              {/* 1. The starting point */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mb-4">
                  {t("vehicleWarranty.startingPoint.heading")}
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>{t("vehicleWarranty.startingPoint.text")}</p>
                </div>
                <div className="bg-surface-muted rounded-[12px] p-4 mt-6 flex items-baseline gap-3 text-sm text-body">
                  <span className="text-2xl font-display font-bold tabular-nums text-accent flex-shrink-0">
                    {t("vehicleWarranty.startingPoint.calloutValue")}
                  </span>
                  <span>{t("vehicleWarranty.startingPoint.calloutText")}</span>
                </div>
              </motion.div>

              {/* 2. What the solution does */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.solution.heading")}
                </h2>
                <p className="text-body leading-[1.6] mb-5">
                  {t("vehicleWarranty.solution.intro")}
                </p>
                <div className="space-y-3">
                  {solutionItems.map((item, index) => {
                    const Icon = solutionIcons[index];
                    return (
                      <div key={item.title} className={cn(CARD, "p-6 flex gap-4")}>
                        <div className="w-10 h-10 rounded-[12px] bg-lilac grid place-items-center text-accent flex-shrink-0">
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-strong mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-body leading-[1.6]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* 3. Two kinds of claim */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.claimTypes.heading")}
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>{t("vehicleWarranty.claimTypes.intro")}</p>
                  <p>{t.rich("vehicleWarranty.claimTypes.simple", { b: bold })}</p>
                  <p>{t.rich("vehicleWarranty.claimTypes.complex", { b: bold })}</p>
                  <p className="font-semibold text-strong">
                    {t("vehicleWarranty.claimTypes.mix")}
                  </p>
                </div>
              </motion.div>

              {/* 4. Key results */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.keyResults.heading")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className={cn(CARD, "px-[29px] py-[27px] text-center")}>
                      <div className="text-kpi text-accent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 5. Time saving per claim */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.timeSaving.heading")}
                </h2>
                <div className={cn(CARD, "overflow-hidden overflow-x-auto")}>
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="border-b border-hairline">
                        <td className="py-3 px-4" />
                        {timeColumns.map(([group, label], index) => (
                          <th key={index} scope="col" className="py-3 px-4 text-right font-semibold text-strong">
                            <span className="block">{group}</span>
                            <span className="block">{label}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...timeRows, timeTotal].map((row, rowIndex) => {
                        const total = rowIndex === timeRows.length;
                        return (
                          <tr key={row[0]} className={`border-b border-hairline ${total ? "bg-accent-soft" : ""}`}>
                            <th scope="row" className={`py-3 px-4 text-left ${total ? "font-semibold text-strong" : "font-normal text-body"}`}>
                              {row[0]}
                            </th>
                            {row.slice(1).map((cell, index) => (
                              <td
                                key={index}
                                className={`py-3 px-4 text-right font-display tabular-nums ${total ? "font-bold text-accent" : "text-strong"}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted leading-[1.6] mt-3">
                  {t("vehicleWarranty.timeSaving.footnote")}
                </p>
                <p className="text-body leading-[1.6] mt-5">
                  {t.rich("vehicleWarranty.timeSaving.summary", { b: bold })}
                </p>
              </motion.div>

              {/* 6. Across the book of claims */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.book.heading")}
                </h2>
                <div className={cn(CARD, "overflow-hidden overflow-x-auto")}>
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="border-b border-hairline">
                        <td className="py-3 px-4" />
                        {bookColumns.map((column) => (
                          <th key={column} scope="col" className="py-3 px-4 text-right font-semibold text-strong">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...bookRows, bookTotal].map((row, rowIndex) => {
                        const total = rowIndex === bookRows.length;
                        return (
                          <tr key={row[0]} className={`border-b border-hairline ${total ? "bg-accent-soft" : ""}`}>
                            <th scope="row" className={`py-3 px-4 text-left ${total ? "font-semibold text-strong" : "font-normal text-body"}`}>
                              {row[0]}
                            </th>
                            {row.slice(1).map((cell, index) => (
                              <td
                                key={index}
                                className={`py-3 px-4 text-right font-display tabular-nums ${total ? "font-bold text-accent" : "text-strong"}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted leading-[1.6] mt-3">
                  {t.rich("vehicleWarranty.book.basis", { b: bold })}
                </p>
                <div className="bg-surface-muted rounded-[12px] p-4 mt-6 text-sm text-body">
                  <span className="font-medium text-strong">
                    {t("vehicleWarranty.expertise.title")}
                  </span>{" "}
                  {t("vehicleWarranty.expertise.text")}
                </div>
              </motion.div>

              {/* 7. The same decision, every time */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.sameDecision.heading")}
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>{t("vehicleWarranty.sameDecision.text")}</p>
                </div>
              </motion.div>

              {/* 8. The collaboration */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  {t("vehicleWarranty.collaboration.heading")}
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>{t("vehicleWarranty.collaboration.text")}</p>
                  <p>{t.rich("vehicleWarranty.collaboration.next", { b: bold })}</p>
                </div>
              </motion.div>

              {/* Quote */}
              {study.quote && (
                <motion.div
                  {...fadeIn}
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
                    <div className="text-muted">
                      {study.quote.role}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Method */}
              <p className="text-xs text-muted leading-[1.6]">
                {t("vehicleWarranty.method")}
              </p>
            </article>

            {/* Sidebar */}
            <aside aria-label="Key highlights">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className={cn(CARD, "p-8")}
              >
                <dl className="space-y-5">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-caption-sm text-subtle mb-1">
                        {fact.label}
                      </dt>
                      <dd className="text-sm text-body">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h3 className="text-caption-sm text-subtle mb-3">
                    {t("vehicleWarranty.sidebar.productsUsed")}
                  </h3>
                  <div className="space-y-2">
                    {study.products.map((product) => (
                      <Link
                        key={product}
                        href={productLinks[product]}
                        className={`block text-sm px-3 py-2 font-medium ${productPillColors[product]} text-center`}
                      >
                        {productNames[product]}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    {t("vehicleWarranty.sidebar.getSimilarResults")}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </motion.div>
            </aside>
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
