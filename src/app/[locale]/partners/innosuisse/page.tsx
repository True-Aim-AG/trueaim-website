import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink, Award, Shield, Landmark, Microscope } from "lucide-react";
import { PartnerOutboundLink } from "@/components/partners/PartnerOutboundLink";

export default async function InnosuissePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.innosuisse");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl">
              <Image
                src="/partners/innosuisse.png"
                alt="Innosuisse logo"
                width={340}
                height={96}
                className="object-contain"
              />
            </div>
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

      {/* Key Points */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Landmark className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("keyPoints.govValidation.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("keyPoints.govValidation.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("keyPoints.excellence.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("keyPoints.excellence.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("keyPoints.priority.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("keyPoints.priority.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Microscope className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("keyPoints.zhawCollab.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("keyPoints.zhawCollab.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Details */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center">
            <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">{t("grantDetails.label")}</p>
            <p className="text-3xl font-bold text-[var(--primary)] mb-4">{t("grantDetails.title")}</p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              {t("grantDetails.description")}
            </p>
            <div className="mt-6">
              <PartnerOutboundLink
                href="https://www.innosuisse.ch"
                label="innosuisse"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
              >
                {t("grantDetails.visitLink")}
                <ExternalLink className="w-4 h-4" />
              </PartnerOutboundLink>
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
