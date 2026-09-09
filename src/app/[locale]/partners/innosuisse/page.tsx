import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink, Award, Shield, Landmark, Microscope } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

export default async function InnosuissePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.innosuisse");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <Eyebrow className="inline-flex items-center gap-2 mb-6">
            <Award strokeWidth={1.5} className="w-4 h-4" />
            {t("hero.badge")}
          </Eyebrow>

          <div className="flex justify-center mb-8">
            <div className="rounded-pill bg-ta-neutral-0 p-6 shadow-swatch">
              <Image
                src="/partners/innosuisse.png"
                alt="Innosuisse logo"
                width={340}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
            {t("hero.titleLine1")}
            <br />
            <span className="text-accent">{t("hero.titleLine2")}</span>
          </h1>

          <div className="text-lede text-body max-w-3xl mx-auto space-y-4">
            <p>
              {t("hero.description1")}
            </p>
            <p>
              {t("hero.description2")}
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Landmark strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.govValidation.title")}
              </h3>
              <p className="text-body">
                {t("keyPoints.govValidation.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Shield strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.excellence.title")}
              </h3>
              <p className="text-body">
                {t("keyPoints.excellence.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Award strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.priority.title")}
              </h3>
              <p className="text-body">
                {t("keyPoints.priority.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Microscope strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("keyPoints.zhawCollab.title")}
              </h3>
              <p className="text-body">
                {t("keyPoints.zhawCollab.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Details */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-pill bg-card p-8 shadow-card text-center md:p-12">
            <p className="text-caption-sm text-subtle mb-2">{t("grantDetails.label")}</p>
            <p className="font-display text-3xl font-bold text-accent mb-4">{t("grantDetails.title")}</p>
            <p className="text-lede text-body max-w-2xl mx-auto">
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
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lede text-body mb-10 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </div>
  );
}
