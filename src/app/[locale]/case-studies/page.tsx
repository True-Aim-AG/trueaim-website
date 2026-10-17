import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
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

const READ_LINK = "inline-flex items-center gap-2 text-sm font-medium text-accent";

/** The first study as the hero graphic: the title with the client's logo beside it, the figures and the way in. */
function ResultsCard({ study, readLabel }: { study: CaseStudy; readLabel: string }) {
  return (
    <div className={cn(CARD, SCENE_CARD_HERO, "p-8")}>
      <div className="flex items-start justify-between gap-6">
        <p className="font-display text-[22px] font-semibold leading-[1.3] tracking-[0.01em] text-strong text-balance">{study.title}</p>
        {study.customer.logo && (
          <Image src={study.customer.logo} alt={study.customer.name} width={600} height={191} className="h-10 w-auto shrink-0" />
        )}
      </div>
      <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
        {study.metrics.map((metric) => (
          {/* Fixed columns, so the three labels start on the same line. */}
          <li key={metric.label} className="grid grid-cols-[1.25rem_9.5rem_minmax(0,1fr)] items-center gap-4 py-3.5">
            <Check strokeWidth={2.5} className="h-5 w-5 text-accent" aria-hidden />
            <span className="font-display text-[24px] font-semibold leading-none text-strong tabular-nums">{metric.value}</span>
            <span className="text-[14px] leading-[1.45] text-muted">{metric.label}</span>
          </li>
        ))}
      </ul>
      <Link href={`/case-studies/${study.slug}`} className={cn(READ_LINK, "mt-6 hover:underline")}>
        {readLabel}
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      </Link>
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
        visual={featured ? <ResultsCard study={featured} readLabel={t("featured.readFullStudy")} /> : undefined}
      />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {published.map((study) => (
              <li key={study.slug}>
                <Link href={`/case-studies/${study.slug}`} className={cn(CARD, CARD_HOVER, "flex h-full flex-col overflow-hidden")}>
                  <div
                    className="relative h-32 bg-cover"
                    style={{ backgroundImage: "url(/brand/textures/circular-light.webp)", backgroundPosition: "12% 88%" }}
                  >
                    {study.customer.logo && (
                      <Image
                        src={study.customer.logo}
                        alt={study.customer.name}
                        width={600}
                        height={191}
                        className="absolute bottom-6 left-7 h-11 w-auto rounded-[8px] bg-white px-4 py-2 shadow-swatch"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{study.customer.industry}</p>
                    <h2 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">{study.title}</h2>
                    <p className="text-[15px] leading-[1.55] text-muted">{study.challenge}</p>
                    <span className={cn(READ_LINK, "mt-auto pt-2")}>
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
