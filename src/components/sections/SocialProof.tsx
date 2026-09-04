import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowRight, Building2, Quote } from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { caseStudies } from "@/data/case-studies";
import { productPillColors, productNames } from "@/lib/product-styles";

const ease = [0.4, 0, 0.2, 1] as const;

export async function SocialProof() {
  const t = await getTranslations("socialProof");

  // Only show published (non-WIP) case studies on the homepage
  const featured = caseStudies.find((cs) => !cs.wip);

  if (!featured) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <Eyebrow className="mb-4">{t("badge")}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-body max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </MotionDiv>

        {/* Featured case study - full width */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <Link
            href={`/case-studies/${featured.slug}`}
            className="block rounded-pill bg-card shadow-card p-8 group transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Info */}
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Building2 className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-medium text-strong">
                      {featured.customer.name}
                    </div>
                    <div className="text-sm text-muted">
                      {featured.customer.industry}{featured.customer.size && ` · ${featured.customer.size}`}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-strong mb-4 group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>

                {/* Products */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.products.map((product) => (
                    <span
                      key={product}
                      className={`text-xs px-3 py-1 font-medium ${productPillColors[product]}`}
                    >
                      {productNames[product]}
                    </span>
                  ))}
                </div>

                {/* Quote preview */}
                {featured.quote && (
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-accent opacity-30 mb-2" strokeWidth={1.5} />
                    <p className="text-sm text-body italic line-clamp-2">
                      &ldquo;{featured.quote.text}&rdquo;
                    </p>
                  </div>
                )}

                {/* Link */}
                <div className="flex items-center gap-2 text-link font-medium">
                  {t("readCaseStudy")}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>

              {/* Right: Key Metrics */}
              <div className="grid grid-cols-2 gap-4 content-center">
                {featured.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-pill bg-surface-muted p-4 text-center"
                  >
                    <div className="font-display font-semibold tabular-nums text-2xl md:text-3xl text-accent">
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted">
                      {metric.label}
                    </div>
                    {metric.improvement && (
                      <div className="text-xs text-subtle mt-1">
                        {metric.improvement}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </MotionDiv>

        {/* View all link */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-center"
        >
          <ButtonLink href="/case-studies" variant="secondary" size="md">
            {t("viewAllCaseStudies")}
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
        </MotionDiv>
      </div>
    </section>
  );
}
