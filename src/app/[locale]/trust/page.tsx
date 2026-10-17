import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { ButtonLink } from "@/components/brand/Button";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";
import { FaqBlock, Summary, type FaqItem } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";

const PATH = "/trust";

// Certifications first, then the frameworks the controls are aligned with.
// The label on each badge comes from messages/<locale>/trust.json and says
// only what True Aim holds today.
const badges: { key: "iso27001" | "soc2" | "gdpr" | "fadp" | "dora"; icon: BrandIconName }[] = [
  { key: "iso27001", icon: "control" },
  { key: "soc2", icon: "quality" },
  { key: "gdpr", icon: "policy" },
  { key: "fadp", icon: "policy" },
  { key: "dora", icon: "structure" },
];

const standards = ["iso27001", "soc2", "dataProtection", "dora"] as const;

// The sub-processor list keeps its URL for contracts and is not linked from here.
const documents = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
  { key: "paia", href: "/paia" },
  { key: "aiTransparency", href: "/ai-transparency" },
] as const;

export default async function TrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trust");
  const faqs = t.raw("faq.items") as FaqItem[];

  return (
    <div className="min-h-screen">
      <PageSeo locale={locale} path={PATH} template="trust" faqs={faqs} />

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.summary")}</Summary>
        </div>
      </section>

      {/* Certifications and alignment */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("badges.heading")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {badges.map((badge) => {
              const status = t(`badges.items.${badge.key}.status`) as "certified" | "aligned";
              return (
                <li key={badge.key} className="bg-card shadow-card rounded-pill p-6 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-pill bg-lilac grid place-items-center">
                    <BrandIcon name={badge.icon} size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-strong">{t(`badges.items.${badge.key}.name`)}</h3>
                  <StatusPill tone="approved" emphasis="light" dot={false} size="sm">
                    {t(`badges.statusLabels.${status}`)}
                  </StatusPill>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What the standards cover */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("standards.heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((key) => (
              <div key={key} className="bg-card shadow-card rounded-pill p-8">
                <h3 className="font-display text-xl font-semibold text-strong mb-3">{t(`standards.items.${key}.title`)}</h3>
                <p className="text-body leading-[1.6]">{t(`standards.items.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A person stays in the loop */}
      <section className="bg-lilac py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Eyebrow className="mb-4">{t("humanInLoop.eyebrow")}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("humanInLoop.heading")}
          </h2>
          <div className="max-w-3xl space-y-4 text-body leading-[1.6]">
            <p>{t("humanInLoop.p1")}</p>
            <p>{t("humanInLoop.p2")}</p>
          </div>
        </div>
      </section>

      {/* Policies and documents */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("documents.heading")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <li key={doc.key}>
                <Link
                  href={doc.href}
                  className="bg-card shadow-card rounded-pill p-6 flex items-start justify-between gap-4 h-full group transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                >
                  <div>
                    <h3 className="font-display font-semibold text-strong mb-1 group-hover:text-accent transition-colors">
                      {t(`documents.items.${doc.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted">{t(`documents.items.${doc.key}.description`)}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("faq.heading")}
          </h2>
          <FaqBlock faqs={faqs} headingLevel="h3" />
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lede text-body mb-10">{t("cta.description")}</p>
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("cta.button")}
            <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
