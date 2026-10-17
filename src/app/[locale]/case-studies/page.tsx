import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CARD, CARD_HOVER, CtaBand, PageHero, SCENE_CARD_HERO, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

// Only finished case studies are listed. The three studies still marked as
// work in progress keep their URLs but are not shown here (Reuben, 5 Oct 2026).
const published = caseStudies.filter((cs) => !cs.wip);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/case-studies");
}

/** The first study's figures as the hero graphic, in the prototype's results card. */
function ResultsCard({ study }: { study: CaseStudy }) {
  return (
    <div className={cn(CARD, SCENE_CARD_HERO, "p-8")}>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{study.customer.name}</p>
      <p className="mt-1 text-sm text-muted">{study.customer.industry}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
        {study.metrics.map((metric) => (
          <li key={metric.label}>
            <p className="font-display text-[34px] font-semibold leading-[1.05] text-strong tabular-nums">{metric.value}</p>
            <p className="mt-1.5 text-[14px] leading-[1.45] text-muted">
              {metric.label}
              {metric.improvement ? `, ${metric.improvement}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");
  const featured = published[0];
  return (
    <>
      <PageSeo locale={locale} path="/case-studies" template="collection" />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        summary={t("hero.summary")}
        buttons={[{ label: t("hero.button"), href: "/contact" }]}
        texture={{ name: "glass", position: "100% 100%" }}
        visual={featured ? <ResultsCard study={featured} /> : undefined}
      />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {published.map((study) => (
              <li key={study.slug}>
                <Link href={`/case-studies/${study.slug}`} className={cn(CARD, CARD_HOVER, "flex h-full flex-col overflow-hidden")}>
                  <div
                    className="relative h-40 bg-cover"
                    style={{ backgroundImage: "url(/brand/textures/circular-light.webp)", backgroundPosition: "12% 88%" }}
                  >
                    {study.customer.logo && (
                      <Image
                        src={study.customer.logo}
                        alt={study.customer.name}
                        width={600}
                        height={191}
                        className="absolute bottom-6 left-7 h-9 w-auto rounded-[6px] bg-white/90 px-3 py-1.5"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{study.customer.industry}</p>
                    <h2 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">{study.title}</h2>
                    <p className="text-[15px] leading-[1.55] text-muted">{study.challenge}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                      {t("featured.readFullStudy")}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.bookDemo"), href: "/contact" }]} />
    </>
  );
}
