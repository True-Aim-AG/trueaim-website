"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileSearch, ClipboardCheck, FileText } from "lucide-react";
import { getAlternatingSlide, defaultTransition } from "@/lib/animations";

const products = [
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
    name: "MIRA",
    badge: "Decisioning Engine",
    description: "Transform policy terms and conditions into automated, fully-deterministic claim decisions.",
    href: "/products/mira",
    icon: Brain,
    color: "var(--mira)",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    name: "Decision Dossier",
    badge: "Audit Record",
    description: "Every claim decision produces a complete, replayable audit record. Your defense in any audit or dispute.",
    href: "/technology#decision-dossier",
    icon: FileText,
    color: "var(--primary)",
    gradient: "from-purple-500/20 to-indigo-500/20",
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Purpose-Built Products for Claims Excellence
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            A complete suite designed for the claims lifecycle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={getAlternatingSlide(index)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
            >
              <Link href={product.href} className="block h-full group">
                <div className="relative glass-panel glass-panel-hover h-full overflow-hidden p-8">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative h-full">
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
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
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

        {/* Where to start guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-[var(--text-muted)] text-sm max-w-2xl mx-auto">
            Start with <Link href="/products/contextbuilder" className="text-[var(--primary)] hover:underline">ContextBuilder</Link> for document ingestion, add <Link href="/products/mira" className="text-[var(--primary)] hover:underline">MIRA</Link> for decisioning, review outcomes with the <Link href="/technology#decision-dossier" className="text-[var(--primary)] hover:underline">Decision Dossier</Link>, and add <Link href="/products/claimeval" className="text-[var(--primary)] hover:underline">ClaimEval</Link> when you need QA coverage beyond sampling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
