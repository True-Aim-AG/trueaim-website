import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ExternalLink, Globe, Network, Trophy, Users } from "lucide-react";
import type { Metadata } from "next";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { ButtonLink } from "@/components/brand/Button";
import { PageHero, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const FIF_URL = "https://fifportugal.pt/en/";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/partners/fif");
}

const POINTS = [
  { key: "award", icon: Trophy },
  { key: "association", icon: Users },
  { key: "ecosystem", icon: Network },
  { key: "reach", icon: Globe },
] as const;

/** FIF Portugal: the forum that named True Aim Rising Star of the Year 2026, and a partner. Facts from fifportugal.pt. */
export default async function FifPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.fif");
  return (
    <>
      <PageSeo locale={locale} path="/partners/fif" template="partner" partner={{ name: "FIF Portugal", url: FIF_URL }} />
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
          <div className="glass grid min-h-[260px] place-items-center rounded-[28px] p-10">
            <Image src="/awards/fif-portugal.png" alt={t("hero.logoAlt")} width={518} height={231} className="relative h-auto w-full max-w-[300px] object-contain" />
          </div>
        }
      >
        <p className="mt-5 max-w-[54ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">{t("hero.description2")}</p>
      </PageHero>

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {POINTS.map(({ key, icon: Icon }) => (
              <li key={key} className="glass rounded-[28px] p-8">
                <div className="relative">
                  <span className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--ta-blue)_8%,transparent)] text-accent">
                    <Icon strokeWidth={1.5} className="h-7 w-7" aria-hidden />
                  </span>
                  <h2 className="mb-3 font-display text-xl font-bold text-strong">{t(`keyPoints.${key}.title`)}</h2>
                  <p className="text-body">{t(`keyPoints.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={SECTION}>
        <div className="mx-auto max-w-4xl">
          <div className={cn("glass rounded-[28px] p-8 md:p-12")}>
            <div className="relative">
              <p className="mb-2 text-caption-sm text-subtle">{t("details.label")}</p>
              <p className="mb-4 font-display text-3xl font-bold text-strong">{t("details.title")}</p>
              <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body">{t("details.description")}</p>
              <div className="mt-6">
                <PartnerOutboundLink href={FIF_URL} label="fif-portugal" className="inline-flex items-center gap-2 font-medium text-link hover:underline">
                  {t("details.visitLink")}
                  <ExternalLink strokeWidth={1.5} className="h-4 w-4" />
                </PartnerOutboundLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-page-tint px-6 py-20 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">{t("cta.heading")}</h2>
          <p className="mb-10 mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body">{t("cta.description")}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
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
