"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileSearch, ClipboardCheck } from "lucide-react";

const products = [
  {
    name: "MIRA",
    badge: "Decisioning Engine",
    description: "The world's first neuro-symbolic engine for claims. Transform policy T&Cs into automated, fully-deterministic decisions.",
    href: "/products/mira",
    icon: Brain,
    color: "var(--mira)",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    name: "ContextBuilder",
    badge: "Document Pipeline",
    description: "Turn messy claim documents into structured, trusted data. AI-powered ingestion with human review when needed.",
    href: "/products/contextbuilder",
    icon: FileSearch,
    color: "var(--contextbuilder)",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    name: "ClaimEval",
    badge: "Quality Assurance",
    description: "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio.",
    href: "/products/claimeval",
    icon: ClipboardCheck,
    color: "var(--claimeval)",
    gradient: "from-blue-500/20 to-sky-500/20",
  },
];

export function ProductsGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Purpose-Built Products for Claims Excellence
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            A complete suite designed for the claims lifecycle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={product.href} className="block h-full group">
                <div className="relative glass-panel glass-panel-hover p-8 h-full overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${product.color} 25%, transparent)`,
                      }}
                    >
                      <product.icon
                        className="w-8 h-8"
                        style={{ color: product.color }}
                      />
                    </div>

                    {/* Badge */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${product.color} 20%, transparent)`,
                        color: product.color,
                      }}
                    >
                      {product.badge}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Link */}
                    <div
                      className="inline-flex items-center gap-2 font-medium transition-all group-hover:gap-3"
                      style={{ color: product.color }}
                    >
                      Explore {product.name}
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
