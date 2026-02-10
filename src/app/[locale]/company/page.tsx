import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  Quote,
  Users,
  Linkedin
} from "lucide-react";

const founderKeys = ["reuben", "frederic"] as const;

const founderMeta = {
  reuben: {
    linkedin: "https://www.linkedin.com/in/reubenj/",
    image: "/team/reuben-john.jpg",
  },
  frederic: {
    linkedin: "https://www.linkedin.com/in/frdbrunner/",
    image: "/team/frederic-brunner.jpg",
  },
};

const advisorKeys = ["claudio", "eric", "lukas", "dave", "dandolo", "bassil"] as const;

const advisorImages: Record<string, string | undefined> = {
  lukas: "/team/lukas-lichtensteiger.jpg",
  dandolo: "/team/dandolo-flumini.jpg",
};

const partnerKeys = ["yarowa", "zhaw", "innosuisse"] as const;

const partnerMeta = {
  yarowa: {
    image: "/partners/yarowa.png",
    link: "/partners/yarowa",
  },
  zhaw: {
    image: "/partners/zhaw.jpg",
    link: "/partners/zhaw",
  },
  innosuisse: {
    image: "/partners/innosuisse.png",
    link: "/partners/innosuisse",
  },
};

export default async function CompanyPage() {
  const t = await getTranslations("company");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-[var(--primary)]">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <blockquote className="text-base text-[var(--text-primary)] leading-relaxed font-medium">
              &ldquo;{t("mission.quote")}&rdquo;
            </blockquote>
            <p className="mt-6 text-[var(--text-muted)] font-medium">{t("mission.label")}</p>
          </MotionDiv>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("team.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("team.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founderKeys.map((key, index) => (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-8"
              >
                {/* Profile Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-2 ring-[var(--border)] ring-offset-2 ring-offset-[var(--background)]">
                  <Image
                    src={founderMeta[key].image}
                    alt={t(`team.founders.${key}.name`)}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {t(`team.founders.${key}.name`)}
                </h3>
                <p className="text-[var(--primary)] font-medium mb-3">
                  {t(`team.founders.${key}.role`)}
                </p>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {t(`team.founders.${key}.tagline`)}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {t(`team.founders.${key}.bio`)}
                </p>
                <a
                  href={founderMeta[key].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--aurora-cyan)] hover:text-[var(--primary)] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  {t("team.connectLinkedIn")}
                </a>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("advisors.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("advisors.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisorKeys.map((key, index) => {
              const name = t(`advisors.members.${key}.name`);
              const image = advisorImages[key];
              return (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel glass-panel-hover p-6"
              >
                {image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-4 ring-1 ring-[var(--border)]">
                    <Image
                      src={image}
                      alt={name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--aurora-purple)]/30 to-[var(--aurora-cyan)]/30 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-white">
                      {name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t(`advisors.members.${key}.title`)}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                  {t(`advisors.members.${key}.relevance`)}
                </p>
              </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("partners.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("partners.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerKeys.map((key, index) => (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={partnerMeta[key].link}
                  className="block glass-panel glass-panel-hover p-8 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 p-2">
                    <Image
                      src={partnerMeta[key].image}
                      alt={t(`partners.${key}.name`)}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {t(`partners.${key}.name`)}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {t(`partners.${key}.description`)}
                  </p>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
