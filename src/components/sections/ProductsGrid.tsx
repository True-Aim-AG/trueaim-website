"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileSearch, ClipboardCheck } from "lucide-react";
import { getAlternatingSlide, defaultTransition } from "@/lib/animations";

const products = [
  {
    name: "MIRA",
    badge: "Decisioning Engine",
    tagline: "The Core Intelligence",
    description: "The world's first neuro-symbolic engine for claims. Transform policy T&Cs into automated, fully-deterministic decisions.",
    href: "/products/mira",
    icon: Brain,
    color: "var(--mira)",
    gradient: "from-indigo-500/20 to-violet-500/20",
    featured: true,
  },
  {
    name: "ContextBuilder",
    badge: "Document Pipeline",
    tagline: "",
    description: "Turn messy claim documents into structured, trusted data. AI-powered ingestion with human review when needed.",
    href: "/products/contextbuilder",
    icon: FileSearch,
    color: "var(--contextbuilder)",
    gradient: "from-teal-500/20 to-cyan-500/20",
    featured: false,
  },
  {
    name: "ClaimEval",
    badge: "Quality Assurance",
    tagline: "",
    description: "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio.",
    href: "/products/claimeval",
    icon: ClipboardCheck,
    color: "var(--claimeval)",
    gradient: "from-blue-500/20 to-sky-500/20",
    featured: false,
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

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={getAlternatingSlide(index)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
              className={product.featured ? 'lg:col-span-2 lg:row-span-2' : ''}
            >
              <Link href={product.href} className="block h-full group">
                <div className={`relative glass-panel glass-panel-hover h-full overflow-hidden ${product.featured ? 'p-10' : 'p-8'}`}>
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`relative h-full ${product.featured ? 'flex flex-col' : ''}`}>
                    {/* Icon */}
                    <div
                      className={`rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${product.featured ? 'w-20 h-20' : 'w-16 h-16'}`}
                      style={{
                        backgroundColor: `color-mix(in srgb, ${product.color} 25%, transparent)`,
                      }}
                    >
                      <product.icon
                        className={product.featured ? 'w-10 h-10' : 'w-8 h-8'}
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
                    <h3 className={`font-bold text-[var(--text-primary)] mb-3 ${product.featured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
                      {product.name}
                    </h3>

                    {/* Tagline for featured */}
                    {product.featured && product.tagline && (
                      <p className="text-lg text-[var(--text-muted)] mb-4">{product.tagline}</p>
                    )}

                    {/* Description */}
                    <p className={`text-[var(--text-secondary)] leading-relaxed mb-6 ${product.featured ? 'text-lg max-w-xl flex-1' : ''}`}>
                      {product.description}
                    </p>

                    {/* Link */}
                    <div
                      className={`inline-flex items-center gap-2 font-medium transition-all group-hover:gap-3 ${product.featured ? 'mt-auto' : ''}`}
                      style={{ color: product.color }}
                    >
                      Explore {product.name}
                      <ArrowRight className={`transition-transform group-hover:translate-x-1 ${product.featured ? 'w-5 h-5' : 'w-4 h-4'}`} />
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
