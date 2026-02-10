import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Building2, Network, Globe, Handshake } from "lucide-react";

export default async function YarowaPage() {
  const t = await getTranslations("partners.yarowa");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl">
              <Image
                src="/partners/yarowa.png"
                alt="Yarowa AG logo"
                width={200}
                height={56}
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

      {/* Partnership Value */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-12 text-center">
            {t("strengths.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Network className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("strengths.distribution.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("strengths.distribution.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("strengths.delivery.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("strengths.delivery.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("strengths.platform.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("strengths.platform.description")}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("strengths.vision.title")}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("strengths.vision.description")}
              </p>
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
                href="/products/mira"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                {t("cta.learnProducts")}
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
