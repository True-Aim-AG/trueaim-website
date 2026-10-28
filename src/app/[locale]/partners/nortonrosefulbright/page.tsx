import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Award, Globe, Scale, Handshake } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { ButtonLink } from "@/components/brand/Button";
import type { Metadata } from "next";
import { CARD, PageHero, SCENE_CARD_HERO, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/partners/nortonrosefulbright");
}

export default async function NortonRoseFulbrightPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.nortonRoseFulbright");
  return (
    <>
      <PageSeo locale={locale} path="/partners/nortonrosefulbright" template="partner" partner={{ name: "Norton Rose Fulbright", url: "https://www.nortonrosefulbright.com/" }} />
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
        texture={{ name: "circ", position: "88% 78%" }}
        visual={
          <div className={cn(CARD, SCENE_CARD_HERO, "grid min-h-[260px] place-items-center p-10")}>
            <Image src="/awards/norton-rose-fulbright.svg" alt="Norton Rose Fulbright logo" width={380} height={42} className="h-auto w-full max-w-[320px] object-contain" />
          </div>
        }
      >
        <p className="mt-5 max-w-[54ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">{t("hero.description2")}</p>
      </PageHero>

      {/* Partnership Strengths */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong mb-14 md:text-[40px]">
            {t("strengths.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Award strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.recognition.title")}
              </h3>
              <p className="text-body">
                {t("strengths.recognition.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Scale strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.regulatory.title")}
              </h3>
              <p className="text-body">
                {t("strengths.regulatory.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Globe strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.reach.title")}
              </h3>
              <p className="text-body">
                {t("strengths.reach.description")}
              </p>
            </div>

            <div className="rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)] p-8">
              <div className="icon-plate w-14 h-14 mb-6">
                <Handshake strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.vision.title")}
              </h3>
              <p className="text-body">
                {t("strengths.vision.description")}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <PartnerOutboundLink
              href="https://www.nortonrosefulbright.com/"
              label="norton-rose-fulbright"
              className="text-link hover:underline transition-colors"
            >
              {t("hero.visitLink")}
            </PartnerOutboundLink>
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
            <ButtonLink href="/platform/claims-decisioning" variant="primary" size="lg">
              {t("cta.learnProducts")}
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
