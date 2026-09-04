import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink, GraduationCap, Brain, Users, FlaskConical } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

export default async function ZHAWPage() {
  const t = await getTranslations("partners.zhaw");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <Eyebrow className="inline-flex items-center gap-2 mb-6">
            <GraduationCap strokeWidth={1.5} className="w-4 h-4" />
            {t("hero.badge")}
          </Eyebrow>

          <div className="flex justify-center mb-8">
            <div className="rounded-pill bg-ta-neutral-0 p-6 shadow-swatch">
              <Image
                src="/partners/zhaw-logo.png"
                alt="ZHAW logo"
                width={160}
                height={120}
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

      {/* Research Focus */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-strong mb-12 text-center">
            {t("research.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
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

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
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

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
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

            <div className="rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-pill bg-card p-8 shadow-card md:p-12">
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
                <div className="rounded-pill bg-surface-muted p-6 text-center">
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
                <div className="rounded-pill bg-surface-muted p-6 text-center">
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
