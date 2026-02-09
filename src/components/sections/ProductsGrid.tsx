import Link from "next/link";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowRight, Brain, FileSearch, ClipboardCheck, FileText } from "lucide-react";
import { getAlternatingSlide, defaultTransition } from "@/lib/animations";

const products = [
  {
    name: "ContextBuilder",
    badge: "Document Pipeline",
    description: "Turn fragmented, unstructured claim documents into high-quality structured data. AI-assisted extraction with human-in-the-loop review ensures clean inputs for deterministic decisioning.",
    href: "/products/contextbuilder",
    icon: FileSearch,
    color: "var(--contextbuilder)",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    name: "MIRA",
    badge: "Decisioning Engine",
    description: "The core deterministic decision engine. Transform complex policy terms and conditions into automated decisions that are consistent, reproducible and free from probabilistic inference.",
    href: "/products/mira",
    icon: Brain,
    color: "var(--mira)",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    name: "Decision Dossier",
    badge: "Audit Record",
    description: "Every case produces a fully traceable audit record linking outcomes back to source clauses, documents and decision paths. Explainable, defensible and replayable.",
    href: "/technology#decision-dossier",
    icon: FileText,
    color: "var(--primary)",
    gradient: "from-purple-500/20 to-indigo-500/20",
  },
  {
    name: "ClaimEval",
    badge: "Quality Assurance",
    description: "Scale quality assurance beyond sampling. Automatically inspect decisions across your full claims portfolio to detect inconsistencies, process deviation and logic gaps.",
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
        <MotionDiv
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
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <MotionDiv
              key={product.name}
              variants={getAlternatingSlide(index)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
            >
              <Link href={product.href} className="block h-full group">
                <div
                  className="relative glass-panel glass-panel-hover h-full overflow-hidden p-8"
                  style={{ '--card-color': product.color } as React.CSSProperties}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 bg-[color-mix(in_srgb,var(--card-color)_25%,transparent)] group-hover:bg-white/20"
                    >
                      <product.icon
                        className="w-8 h-8 text-[var(--card-color)] group-hover:text-white transition-colors"
                      />
                    </div>

                    {/* Badge */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-[color-mix(in_srgb,var(--card-color)_20%,transparent)] text-[var(--card-color)] group-hover:bg-white/20 group-hover:text-white transition-colors"
                    >
                      {product.badge}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-white mb-3 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] group-hover:text-white/90 leading-relaxed mb-6 flex-grow transition-colors">
                      {product.description}
                    </p>

                    {/* Link */}
                    <div
                      className="inline-flex items-center gap-2 font-medium transition-all group-hover:gap-3 text-[var(--card-color)] group-hover:text-white mt-auto"
                    >
                      Explore {product.name}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  );
}
