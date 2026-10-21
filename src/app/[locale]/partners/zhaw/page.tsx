import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink, GraduationCap, Brain, Users, FlaskConical } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { ButtonLink } from "@/components/brand/Button";
import type { Metadata } from "next";
import { CARD, PageHero, SCENE_CARD_HERO, SECTION, SECTION_LILAC } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/partners/zhaw");
}

export default async function ZHAWPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.zhaw");
  return (
    <>
      <PageSeo locale={locale} path="/partners/zhaw" template="partner" partner={{ name: "ZHAW Zurich University of Applied Sciences" }} />
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
        texture={{ name: "circ", position: "12% 88%" }}
        visual={
          <div className={cn(CARD, SCENE_CARD_HERO, "grid min-h-[260px] place-items-center p-10")}>
            <Image src="/partners/zhaw-logo.png" alt="ZHAW logo" width={160} height={120} className="h-auto w-full max-w-[280px] object-contain" />
          </div>
        }
      >
        <p className="mt-5 max-w-[54ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">{t("hero.description2")}</p>
      </PageHero>

      {/* Research Focus */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong mb-14 md:text-[40px]">
            {t("research.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Brain strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("research.neuroSymbolic.title")}
              </h3>
              <p className="text-body">
                {t("research.neuroSymbolic.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <FlaskConical strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("research.logicExtraction.title")}
              </h3>
              <p className="text-body">
                {t("research.logicExtraction.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <GraduationCap strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("research.deterministic.title")}
              </h3>
              <p className="text-body">
                {t("research.deterministic.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Users strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("research.applied.title")}
              </h3>
              <p className="text-body">
                {t("research.applied.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Details */}
      <section className={SECTION_LILAC}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-strong mb-6">{t("researchGroup.heading")}</h2>

            <div className="space-y-6 text-body">
              <p>
                {t.rich("researchGroup.description", {
                  schoolOfEngineering: (chunks) => <span className="font-medium text-strong">{chunks}</span>,
                  init: (chunks) => <span className="font-medium text-strong">{chunks}</span>,
                  cai: (chunks) => <span className="font-medium text-strong">{chunks}</span>,
                })}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="rounded-[12px] bg-surface-muted p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/dandolo-flumini.jpg"
                      alt={t("researchGroup.dandolo.name")}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20 grayscale scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-strong mb-2">{t("researchGroup.dandolo.name")}</h3>
                  <p className="text-sm text-muted">
                    {t("researchGroup.dandolo.bio")}
                  </p>
                </div>
                <div className="rounded-[12px] bg-surface-muted p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/lukas-lichtensteiger.jpg"
                      alt={t("researchGroup.lukas.name")}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>
                  <h3 className="font-semibold text-strong mb-2">{t("researchGroup.lukas.name")}</h3>
                  <p className="text-sm text-muted">
                    {t("researchGroup.lukas.bio")}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <PartnerOutboundLink
                  href="https://www.zhaw.ch/en/about-us/person/flum"
                  label="zhaw"
                  className="inline-flex items-center gap-2 font-medium text-link hover:underline"
                >
                  {t("researchGroup.visitLink")}
                  <ExternalLink strokeWidth={1.5} className="w-4 h-4" />
                </PartnerOutboundLink>
              </div>
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
              <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
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
