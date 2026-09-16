"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const productsMeta = [
  {
    key: "contextBuilder" as const,
    href: "/products/contextbuilder",
    icon: "extraction" as BrandIconName,
  },
  {
    key: "mira" as const,
    href: "/products/mira",
    icon: "mira" as BrandIconName,
  },
  {
    key: "decisionDossier" as const,
    href: "/technology#decision-dossier",
    icon: "traceability" as BrandIconName,
    featured: true,
  },
  {
    key: "claimEval" as const,
    href: "/products/claimeval",
    icon: "quality" as BrandIconName,
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
    featured: meta.featured,
  }));

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-body max-w-2xl mx-auto">
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
              transition={{ duration: 0.5, delay: index * 0.1, ease }}
            >
              <Link href={product.href} className="block h-full group">
                <div
                  className={cn(
                    "relative h-full rounded-pill shadow-card p-8 flex flex-col transition-[transform,box-shadow] duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:shadow-swatch",
                    product.featured ? "bg-accent-soft" : "bg-card",
                  )}
                >
                  {/* Icon */}
                  <div className="icon-plate mb-6">
                    <BrandIcon name={product.icon} size={48} />
                  </div>

                  {/* Badge */}
                  <Eyebrow className="mb-4">{product.badge}</Eyebrow>

                  {/* Name */}
                  <h3 className="font-display text-xl font-bold text-strong mb-3 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-body leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>

                  {/* Link */}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-link">
                    {product.explore}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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
