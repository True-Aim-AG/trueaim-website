import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { StatusPill } from "@/components/brand/StatusPill";
import { Summary } from "@/components/content";

const team = ["reuben", "frederic", "alin", "kai", "henrique", "arnaud"] as const;

// Photo and LinkedIn profile where True Aim has them; the card shows initials otherwise.
const teamMeta: Record<(typeof team)[number], { image?: string; linkedin?: string }> = {
  reuben: { image: "/team/reuben-john.webp", linkedin: "https://www.linkedin.com/in/reubenj/" },
  frederic: { image: "/team/frederic-brunner.webp", linkedin: "https://www.linkedin.com/in/frdbrunner/" },
  alin: {},
  kai: {},
  henrique: {},
  arnaud: {},
};

const advisers = ["claudio", "kevin", "lukas", "dave", "eric", "dandolo"] as const;

const adviserImages: Record<(typeof advisers)[number], string | undefined> = {
  claudio: "/team/claudio.png",
  kevin: undefined,
  lukas: "/team/lukas-lichtensteiger.jpg",
  dave: "/team/dave.png",
  eric: "/team/eric.png",
  dandolo: "/team/dandolo-flumini.jpg",
};

const partners = ["zhaw", "innosuisse", "yarowa", "swissInsurtechHub"] as const;

const partnerMeta: Record<(typeof partners)[number], { image: string; link: string }> = {
  zhaw: { image: "/partners/zhaw.webp", link: "/partners/zhaw" },
  innosuisse: { image: "/partners/innosuisse.webp", link: "/partners/innosuisse" },
  yarowa: { image: "/partners/yarowa.png", link: "/partners/yarowa" },
  swissInsurtechHub: { image: "/partners/swiss-insurtech-hub.png", link: "/partners/swissinsurtechhub" },
};

const awards = ["insurathon", "swissInnovation", "leuchtturm", "ikn"] as const;

const awardMeta: Record<(typeof awards)[number], { image: string; width: number; height: number; darkBg?: boolean }> = {
  insurathon: { image: "/awards/norton-rose-fulbright.svg", width: 380, height: 42 },
  swissInnovation: { image: "/awards/swiss-innovation.png", width: 80, height: 80 },
  leuchtturm: { image: "/awards/digitaler-leuchtturm.png", width: 80, height: 80, darkBg: true },
  ikn: { image: "/awards/ikn-italy.png", width: 80, height: 80 },
};

function Initials({ name }: { name: string }) {
  return (
    <div className="w-24 h-24 rounded-full bg-lilac flex items-center justify-center" aria-hidden="true">
      <span className="text-lg font-bold text-accent">{name.split(" ").map((part) => part[0]).join("")}</span>
    </div>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.p1")}</Summary>
          <div className="max-w-3xl mt-6 space-y-4 text-body leading-[1.6]">
            <p>{t("hero.p2")}</p>
            <p className="font-semibold text-strong">{t("hero.p3")}</p>
            <p>{t("hero.p4")}</p>
            <p>{t("hero.p5")}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-lilac py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-caption-sm text-subtle mb-6">{t("mission.label")}</p>
          <blockquote className="font-display text-2xl md:text-3xl font-semibold leading-[1.3] text-strong">
            {t("mission.text")}
          </blockquote>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("team.heading")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((key) => {
              const name = t(`team.members.${key}.name`);
              const meta = teamMeta[key];
              return (
                <li key={key} className="rounded-pill bg-card shadow-card p-8">
                  {meta.image ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-line">
                      <Image src={meta.image} alt={name} width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Initials name={name} />
                  )}
                  <h3 className="font-display text-xl font-bold text-strong mt-6 mb-1">{name}</h3>
                  <p className="text-accent font-medium mb-3">{t(`team.members.${key}.title`)}</p>
                  <p className="text-body leading-[1.6]">{t(`team.members.${key}.bio`)}</p>
                  {meta.linkedin && (
                    <a
                      href={meta.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-link hover:underline"
                    >
                      <Linkedin strokeWidth={1.5} className="w-5 h-5" />
                      {t("team.linkedin")}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Advisers */}
      <section className="bg-lilac py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("advisers.heading")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisers.map((key) => {
              const name = t(`advisers.members.${key}.name`);
              const image = adviserImages[key];
              return (
                <li key={key} className="rounded-pill bg-card shadow-card p-6">
                  {image ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-line">
                      <Image src={image} alt={name} width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Initials name={name} />
                  )}
                  <h3 className="font-display text-lg font-bold text-strong mt-4 mb-1">{name}</h3>
                  <p className="text-sm text-body">{t(`advisers.members.${key}.title`)}</p>
                  <p className="text-sm text-muted mt-1">{t(`advisers.members.${key}.focus`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("partners.heading")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((key) => (
              <li key={key} className="h-full">
                <Link
                  href={partnerMeta[key].link}
                  className="block rounded-pill bg-card shadow-card p-8 h-full transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                >
                  <div className="w-14 h-14 rounded-pill bg-ta-neutral-0 shadow-swatch flex items-center justify-center mb-6 p-2">
                    <Image src={partnerMeta[key].image} alt={t(`partners.items.${key}.name`)} width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-strong mb-3">{t(`partners.items.${key}.name`)}</h3>
                  <p className="text-body leading-[1.6]">{t(`partners.items.${key}.description`)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-10">
            {t("awards.heading")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((key) => {
              const meta = awardMeta[key];
              return (
                <li key={key} className="rounded-pill bg-card shadow-card p-6 flex items-center gap-5">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-pill overflow-hidden flex items-center justify-center p-2 shadow-swatch ${meta.darkBg ? "bg-ta-charcoal" : "bg-ta-neutral-0"}`}>
                    <Image src={meta.image} alt={t(`awards.items.${key}.alt`)} width={meta.width} height={meta.height} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <StatusPill tone="approved" emphasis="light" dot={false} size="sm">
                      {t("awards.winner")}
                    </StatusPill>
                    <h3 className="font-display font-semibold text-strong mt-2">{t(`awards.items.${key}.title`)}</h3>
                    <p className="text-sm text-muted mt-1">{t(`awards.items.${key}.body`)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("location.heading")}
          </h2>
          <address className="not-italic text-body leading-[1.6]">{t("location.address")}</address>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lede text-body mb-10">{t("cta.description")}</p>
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("cta.button")}
            <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
