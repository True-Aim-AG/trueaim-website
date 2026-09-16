import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Building2, Network, Globe, Handshake } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

export default async function SwissInsurtechHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.swissInsurtechHub");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <Eyebrow className="inline-flex items-center gap-2 mb-6">
            <Building2 strokeWidth={1.5} className="w-4 h-4" />
            {t("hero.badge")}
          </Eyebrow>

          <div className="flex justify-center mb-8">
            <div className="rounded-pill bg-ta-neutral-0 p-6 shadow-swatch">
              <Image
                src="/partners/swiss-insurtech-hub.png"
                alt="Swiss InsurTech Hub logo"
                width={200}
                height={103}
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
            <p>{t("hero.description1")}</p>
            <p>{t("hero.description2")}</p>
          </div>
        </div>
      </section>

      {/* Partnership Strengths */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-strong mb-12 text-center">
            {t("strengths.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Network strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.ecosystem.title")}
              </h3>
              <p className="text-body">
                {t("strengths.ecosystem.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Building2 strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.collaboration.title")}
              </h3>
              <p className="text-body">
                {t("strengths.collaboration.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
              <div className="icon-plate w-14 h-14 mb-6">
                <Globe strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-strong mb-3">
                {t("strengths.platform.title")}
              </h3>
              <p className="text-body">
                {t("strengths.platform.description")}
              </p>
            </div>

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
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

          <div className="text-center mt-4 md:mt-6">
            <PartnerOutboundLink
              href="https://swissinsurtech.com/"
              label="swiss-insurtech-hub"
              className="text-link hover:underline transition-colors"
            >
              {t("hero.visitLink")}
            </PartnerOutboundLink>
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
            <ButtonLink href="/products/mira" variant="primary" size="lg">
              {t("cta.learnProducts")}
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
