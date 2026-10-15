import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  Quote,
  Users,
  Linkedin
} from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

const ease = [0.4, 0, 0.2, 1] as const;

const founderKeys = ["reuben", "frederic"] as const;

const founderMeta = {
  reuben: {
    linkedin: "https://www.linkedin.com/in/reubenj/",
    image: "/team/reuben-john.webp",
  },
  frederic: {
    linkedin: "https://www.linkedin.com/in/frdbrunner/",
    image: "/team/frederic-brunner.webp",
  },
};

const advisorKeys = ["claudio", "eric", "lukas", "dave", "dandolo", "bassil"] as const;

const advisorImages: Record<string, string | undefined> = {
  claudio: "/team/claudio.png",
  eric: "/team/eric.png",
  lukas: "/team/lukas-lichtensteiger.jpg",
  dave: "/team/dave.png",
  dandolo: "/team/dandolo-flumini.jpg",
  bassil: "/team/bassil.png",
};

const partnerKeys = ["yarowa", "zhaw", "innosuisse", "swissInsurtechHub"] as const;

const partnerMeta = {
  yarowa: {
    image: "/partners/yarowa.png",
    link: "/partners/yarowa",
  },
  zhaw: {
    image: "/partners/zhaw.webp",
    link: "/partners/zhaw",
  },
  innosuisse: {
    image: "/partners/innosuisse.webp",
    link: "/partners/innosuisse",
  },
  swissInsurtechHub: {
    image: "/partners/swiss-insurtech-hub.png",
    link: "/partners/swissinsurtechhub",
  },
};

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow className="inline-flex items-center gap-2 mb-6">
              <Users strokeWidth={1.5} className="w-4 h-4" />
              {t("hero.badge")}
            </Eyebrow>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lede text-body max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Mission Section: lilac band, square-cornered */}
      <section className="bg-lilac py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <Quote strokeWidth={1.5} className="w-8 h-8 text-accent mx-auto mb-6" />
            <blockquote className="text-body-lg text-strong">
              &ldquo;{t("mission.quote")}&rdquo;
            </blockquote>
            <p className="mt-6 text-muted font-medium">{t("mission.label")}</p>
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
            transition={{ duration: 0.6, ease }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-4">
              {t("team.heading")}
            </h2>
            <p className="text-lede text-body">
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
                transition={{ duration: 0.5, delay: index * 0.1, ease }}
                className="rounded-pill bg-card shadow-card p-8 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
              >
                {/* Profile Photo */}
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 ring-2 ring-line ring-offset-2 ring-offset-page">
                  <Image
                    src={founderMeta[key].image}
                    alt={t(`team.founders.${key}.name`)}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-strong mb-1">
                  {t(`team.founders.${key}.name`)}
                </h3>
                <p className="text-accent font-medium mb-3">
                  {t(`team.founders.${key}.role`)}
                </p>
                <p className="text-sm text-muted mb-4">
                  {t(`team.founders.${key}.tagline`)}
                </p>
                <p className="text-body mb-6">
                  {t(`team.founders.${key}.bio`)}
                </p>
                <a
                  href={founderMeta[key].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:underline"
                >
                  <Linkedin strokeWidth={1.5} className="w-5 h-5" />
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
            transition={{ duration: 0.6, ease }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-4">
              {t("advisors.heading")}
            </h2>
            <p className="text-lede text-body">
              {t("advisors.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisorKeys.map((key, index) => {
              const name = t(`advisors.members.${key}.name`);
              const image = advisorImages[key];
              const isDandolo = key === "dandolo";
              return (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease }}
                className="rounded-pill bg-card shadow-card p-6 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
              >
                {image ? (
                  <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 ${isDandolo ? 'bg-transparent' : 'ring-1 ring-line'}`}>
                    <Image
                      src={image}
                      alt={name}
                      width={96}
                      height={96}
                      className={`w-full h-full object-cover ${isDandolo ? 'grayscale scale-110' : ''}`}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-lilac flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">
                      {name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-strong mb-1">
                  {name}
                </h3>
                <p className="text-sm text-body">
                  {t(`advisors.members.${key}.title`)}
                </p>
                <p className="text-xs text-muted mt-1 italic">
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
            transition={{ duration: 0.6, ease }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-4">
              {t("partners.heading")}
            </h2>
            <p className="text-lede text-body">
              {t("partners.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {partnerKeys.map((key, index) => (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease }}
                className="h-full"
              >
                <Link
                  href={partnerMeta[key].link}
                  className="block rounded-pill bg-card shadow-card p-8 h-full transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                >
                  <div className="w-14 h-14 rounded-pill bg-ta-neutral-0 shadow-swatch flex items-center justify-center mb-6 p-2">
                    <Image
                      src={partnerMeta[key].image}
                      alt={t(`partners.${key}.name`)}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-strong mb-3">
                    {t(`partners.${key}.name`)}
                  </h3>
                  <p className="text-body">
                    {t(`partners.${key}.description`)}
                  </p>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lede text-body mb-10">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                {t("cta.button")}
                <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
