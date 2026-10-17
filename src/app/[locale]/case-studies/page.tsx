import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/brand/Button";
import { CARD, CARD_HOVER, CtaBand, PageHero, SCENE_CARD_HERO, SECTION } from "@/components/content";
import { HexDot } from "@/components/products/scenes/marks";
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

/** The client's logo on a white plate, over a crop of the brand texture. */
function Cover({ study, logoHeight, texture, position }: { study: CaseStudy; logoHeight: string; texture: string; position: string }) {
  return (
    <div className="relative h-32 bg-cover" style={{ backgroundImage: `url(${texture})`, backgroundPosition: position }}>
      {study.customer.logo && (
        <Image
          src={study.customer.logo}
          alt={study.customer.name}
          width={600}
          height={191}
          className={cn("absolute bottom-6 left-7 w-auto rounded-[8px] bg-white px-4 py-2 shadow-swatch", logoHeight)}
        />
      )}
    </div>
  );
}

/** The first study as the hero graphic: logo, title, the figures and the way in. */
function ResultsCard({ study, readLabel }: { study: CaseStudy; readLabel: string }) {
  return (
    <div className={cn(CARD, SCENE_CARD_HERO, "overflow-hidden")}>
      <Cover study={study} logoHeight="h-12" texture="/brand/textures/glass-box-vivid.webp" position="72% 18%" />
      <div className="p-8">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{study.customer.industry}</p>
        <p className="mt-2 font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong text-balance">{study.title}</p>
        <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
          {study.metrics.map((metric) => (
            <li key={metric.label} className="flex items-center gap-4 py-3.5">
              <HexDot className="h-3 w-3 shrink-0" />
              <span className="font-display text-[24px] font-semibold leading-none text-strong tabular-nums">{metric.value}</span>
              <span className="text-[14px] leading-[1.45] text-muted">{metric.label}</span>
            </li>
          ))}
        </ul>
        <ButtonLink href={`/case-studies/${study.slug}`} variant="primary" size="md" className="mt-7">
          {readLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </ButtonLink>
      </div>
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
                  <Cover study={study} logoHeight="h-11" texture="/brand/textures/circular-light.webp" position="12% 88%" />
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
