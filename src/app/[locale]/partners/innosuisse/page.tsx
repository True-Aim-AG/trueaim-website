import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ExternalLink, Award, Shield, Landmark, Microscope } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { ButtonLink } from "@/components/brand/Button";
import type { Metadata } from "next";
import { CARD, PageHero, SCENE_CARD_HERO, SECTION, SECTION_LILAC } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/partners/innosuisse");
}

export default async function InnosuissePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.innosuisse");
  return (
    <>
      <PageSeo locale={locale} path="/partners/innosuisse" template="partner" partner={{ name: "Innosuisse", url: "https://www.innosuisse.ch" }} />
      {/* Hero */}
      <PageHero
        eyebrow={t("hero.badge")}
        title={
          <>
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </>
        }
        summary={t("hero.description1")}
        texture={{ name: "circ", position: "72% 18%" }}
        visual={
          <div className={cn(CARD, SCENE_CARD_HERO, "grid min-h-[260px] place-items-center p-10")}>
            <Image src="/partners/innosuisse.webp" alt="Innosuisse logo" width={340} height={96} className="h-auto w-full max-w-[280px] object-contain" />
          </div>
        }
      >
        <p className="mt-5 max-w-[54ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">{t("hero.description2")}</p>
      </PageHero>

      {/* Key Points */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Landmark strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.govValidation.title")}
              </h2>
              <p className="text-body">
                {t("keyPoints.govValidation.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Shield strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.excellence.title")}
              </h2>
              <p className="text-body">
                {t("keyPoints.excellence.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Award strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.priority.title")}
              </h2>
              <p className="text-body">
                {t("keyPoints.priority.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Microscope strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.zhawCollab.title")}
              </h2>
              <p className="text-body">
                {t("keyPoints.zhawCollab.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Details */}
      <section className={SECTION_LILAC}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[12px] bg-card p-8 shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] md:p-12">
            <p className="text-caption-sm text-subtle mb-2">{t("grantDetails.label")}</p>
            <p className="font-display text-3xl font-bold text-accent mb-4">{t("grantDetails.title")}</p>
            <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body">
              {t("grantDetails.description")}
            </p>
            <div className="mt-6">
              <PartnerOutboundLink
                href="https://www.innosuisse.ch"
                label="innosuisse"
                className="inline-flex items-center gap-2 font-medium text-link hover:underline"
              >
                {t("grantDetails.visitLink")}
                <ExternalLink strokeWidth={1.5} className="w-4 h-4" />
              </PartnerOutboundLink>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-theme="dark" className="bg-page-tint px-6 py-20 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px] mb-6">
            {t("cta.heading")}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body mb-10">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/technology" variant="primary" size="lg">
              {t("cta.exploreTech")}
            </ButtonLink>
            <ButtonLink href="/contact" variant="on-dark" size="lg">
              {t("cta.bookDemo")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
