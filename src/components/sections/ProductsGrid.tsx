"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileSearch, ClipboardCheck, FileText } from "lucide-react";

const productsMeta = [
  {
    key: "contextBuilder" as const,
    href: "/products/contextbuilder",
    icon: FileSearch,
    color: "var(--contextbuilder)",
    accentHex: "#8B5CF6",
  },
  {
    key: "mira" as const,
    href: "/products/mira",
    icon: Brain,
    color: "var(--mira)",
    accentHex: "#00A3FF",
  },
  {
    key: "decisionDossier" as const,
    href: "/technology#decision-dossier",
    icon: FileText,
    color: "var(--primary)",
    accentHex: "#3B82F6",
    featured: true,
  },
  {
    key: "claimEval" as const,
    href: "/products/claimeval",
    icon: ClipboardCheck,
    color: "var(--claimeval)",
    accentHex: "#00A3FF",
  },
];

export function ProductsGrid() {
  const t = useTranslations("productsGrid");

  const products = productsMeta.map((meta) => ({
    name: t(`products.${meta.key}.name`),
    badge: t(`products.${meta.key}.badge`),
    description: t(`products.${meta.key}.description`),
    explore: t(`products.${meta.key}.explore`),
    href: meta.href,
    icon: meta.icon,
    color: meta.color,
    accentHex: meta.accentHex,
    featured: meta.featured,
  }));

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={product.href} className="block h-full group">
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-300 group-hover:-translate-y-1 ${
                    product.featured
                      ? "border-[var(--primary)]/30 bg-gradient-to-b from-[var(--primary)]/[0.06] to-transparent"
                      : "border-[var(--border)] bg-[var(--card-bg)]"
                  }`}
                  style={{
                    "--card-accent": product.color,
                    "--card-accent-hex": product.accentHex,
                  } as React.CSSProperties}
                >
                  {/* Top glow on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${product.accentHex}, transparent)` }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top, ${product.accentHex}08 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon with animated background */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: `color-mix(in srgb, ${product.color} 15%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${product.color} 20%, transparent)`,
                        }}
                      >
                        <product.icon
                          className="w-7 h-7"
                          style={{ color: product.color }}
                        />
                      </motion.div>

                      {/* Subtle particle trail on featured card */}
                      {product.featured && (
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full teal-glow-pulse"
                          style={{ background: product.accentHex, opacity: 0.6 }}
                        />
                      )}
                    </div>

                    {/* Badge */}
                    <div
                      className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-4 transition-colors"
                      style={{
                        background: `color-mix(in srgb, ${product.color} 12%, transparent)`,
                        color: product.color,
                      }}
                    >
                      {product.badge}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Link */}
                    <div
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                      style={{ color: product.color }}
                    >
                      {product.explore}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
