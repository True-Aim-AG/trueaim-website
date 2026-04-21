import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink, GraduationCap, Brain, Users, FlaskConical } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";

export default async function ZHAWPage() {
  const t = await getTranslations("partners.zhaw");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <div className="flex justify-center mb-8">
            <Image
              src="/partners/zhaw-logo.png"
              alt="ZHAW logo"
              width={160}
              height={120}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            {t("hero.titleLine1")}
            <br />
            <span className="text-[var(--primary)]">{t("hero.titleLine2")}</span>
          </h1>

          <div className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed space-y-4">
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
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-12 text-center">
            {t("research.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("research.neuroSymbolic.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("research.neuroSymbolic.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <FlaskConical className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("research.logicExtraction.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("research.logicExtraction.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("research.deterministic.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("research.deterministic.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("research.applied.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("research.applied.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Details */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t("researchGroup.heading")}</h2>

            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                {t.rich("researchGroup.description", {
                  schoolOfEngineering: (chunks) => <span className="font-medium text-[var(--text-primary)]">{chunks}</span>,
                  init: (chunks) => <span className="font-medium text-[var(--text-primary)]">{chunks}</span>,
                  cai: (chunks) => <span className="font-medium text-[var(--text-primary)]">{chunks}</span>,
                })}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="glass-panel-light p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/dandolo-flumini.jpg"
                      alt={t("researchGroup.dandolo.name")}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20 grayscale scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("researchGroup.dandolo.name")}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {t("researchGroup.dandolo.bio")}
                  </p>
                </div>
                <div className="glass-panel-light p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/lukas-lichtensteiger.jpg"
                      alt={t("researchGroup.lukas.name")}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("researchGroup.lukas.name")}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {t("researchGroup.lukas.bio")}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <PartnerOutboundLink
                  href="https://www.zhaw.ch/en/about-us/person/flum"
                  label="zhaw"
                  className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
                >
                  {t("researchGroup.visitLink")}
                  <ExternalLink className="w-4 h-4" />
                </PartnerOutboundLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/technology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                {t("cta.exploreTech")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                {t("cta.bookDemo")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
