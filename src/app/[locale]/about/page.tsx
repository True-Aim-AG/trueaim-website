import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BadgeRow, CARD, CARD_HOVER, CtaBand, PageHero, SECTION, SECTION_LILAC, SectionHead } from "@/components/content";
import { cn } from "@/lib/utils";

const team = ["reuben", "frederic", "arnaud", "alin", "kai", "henrique"] as const;

// Photo and LinkedIn profile where True Aim has them; the card shows initials otherwise.
const teamMeta: Record<(typeof team)[number], { image?: string; linkedin?: string }> = {
  reuben: { image: "/team/reuben-john.webp", linkedin: "https://www.linkedin.com/in/reubenj/" },
  frederic: { image: "/team/frederic-brunner.webp", linkedin: "https://www.linkedin.com/in/frdbrunner/" },
  alin: { image: "/team/alin-koppandi.webp", linkedin: "https://www.linkedin.com/in/alinkoppandi/" },
  kai: { image: "/team/kai-praschma.webp", linkedin: "https://www.linkedin.com/in/kai-praschma/" },
  henrique: { image: "/team/henrique-ferreira.webp", linkedin: "https://www.linkedin.com/in/henriquemf213" },
  arnaud: { image: "/team/arnaud-terville.webp", linkedin: "https://www.linkedin.com/in/arnaudterville/" },
};

const advisers = ["claudio", "kevin", "dave", "lukas", "eric", "dandolo"] as const;

const adviserMeta: Record<(typeof advisers)[number], { image?: string; linkedin: string }> = {
  claudio: { image: "/team/claudio.png", linkedin: "https://www.linkedin.com/in/claudio-g-48073a/" },
  kevin: { linkedin: "https://www.linkedin.com/in/sartorikevin/" },
  dave: { image: "/team/dave.png", linkedin: "https://www.linkedin.com/in/dave-stoll-07905967/" },
  lukas: { image: "/team/lukas-lichtensteiger.jpg", linkedin: "https://www.linkedin.com/in/lukas-lichtensteiger-7b348a8/" },
  eric: { image: "/team/eric.png", linkedin: "https://www.linkedin.com/in/ericzielinski/" },
  dandolo: { image: "/team/dandolo-flumini.jpg", linkedin: "https://www.linkedin.com/in/dandolo-flumini-a7971157/" },
};

// Yarowa first: the hero names it as the company True Aim was spun out of.
const partners = ["yarowa", "zhaw", "innosuisse", "swissInsurtechHub"] as const;

const partnerMeta: Record<(typeof partners)[number], { image: string; width: number; height: number; link: string }> = {
  yarowa: { image: "/partners/yarowa.png", width: 978, height: 273, link: "/partners/yarowa" },
  zhaw: { image: "/partners/zhaw.webp", width: 160, height: 168, link: "/partners/zhaw" },
  innosuisse: { image: "/partners/innosuisse.webp", width: 720, height: 487, link: "/partners/innosuisse" },
  swissInsurtechHub: { image: "/partners/swiss-insurtech-hub.png", width: 376, height: 193, link: "/partners/swissinsurtechhub" },
};

const awards = ["insurathon", "swissInnovation", "leuchtturm", "ikn"] as const;

const awardMeta: Record<(typeof awards)[number], { image: string; width: number; height: number; renderHeight: number; darkPlate?: boolean }> = {
  insurathon: { image: "/awards/norton-rose-fulbright.svg", width: 380, height: 42, renderHeight: 30 },
  swissInnovation: { image: "/awards/swiss-innovation.png", width: 171, height: 169, renderHeight: 72 },
  leuchtturm: { image: "/awards/digitaler-leuchtturm.png", width: 198, height: 132, renderHeight: 56 },
  ikn: { image: "/awards/ikn-italy.png", width: 167, height: 151, renderHeight: 72 },
};

/** A photo, or the initials on a lilac disc where there is no photo yet. */
function Portrait({ src, name }: { src?: string; name: string }) {
  if (src) {
    return <Image src={src} alt={name} width={96} height={96} className="h-24 w-24 rounded-full bg-lilac object-cover grayscale" />;
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <div aria-hidden="true" className="grid h-24 w-24 place-items-center rounded-full bg-lilac font-display text-[28px] font-semibold text-ta-blue-700">
      {initials}
    </div>
  );
}

const PERSON = cn(CARD, "flex h-full flex-col gap-2.5 p-7");
const ROLE = "text-[12px] font-medium uppercase tracking-[0.1em] text-accent";
const NAME = "font-display text-[20px] font-semibold leading-[1.3] text-strong";
const GRID = "grid auto-rows-fr grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        summary={t("hero.p1")}
        texture={{ name: "circ" }}
        visual={
          <Image
            src="/brand/3d/symbol.webp"
            alt={t("hero.imageAlt")}
            width={420}
            height={236}
            className="mx-auto h-auto w-full max-w-[420px] drop-shadow-[0_30px_40px_rgba(44,43,42,.22)]"
            priority
          />
        }
      >
        <div className="mt-5 max-w-[54ch] space-y-5 text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">
          <p>{t("hero.p2")}</p>
          <p className="font-semibold text-strong">{t("hero.p3")}</p>
          <p>{t("hero.p4")}</p>
          <p>{t("hero.p5")}</p>
        </div>
      </PageHero>

      {/* Sections alternate: white, lilac, white, lilac. */}

      {/* Mission */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-[70ch] text-center">
            <h2 className="font-display text-[30px] font-bold leading-[1.15] text-accent md:text-[40px]">{t("mission.label")}</h2>
            <blockquote className="mt-6">
              <p className="font-display text-[24px] font-semibold italic leading-[1.35] text-strong text-balance md:text-[30px]">
                <span className="text-accent">&ldquo;</span>
                {t("mission.text")}
                <span className="text-accent">&rdquo;</span>
              </p>
              <footer className="mt-6 text-[16px] font-medium text-muted">{t("mission.attribution")}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team and advisers */}
      <section id="team" className={SECTION_LILAC}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("team.heading")} className="mb-10" />
          <ul className={GRID}>
            {team.map((key) => {
              const name = t(`team.members.${key}.name`);
              const meta = teamMeta[key];
              return (
                <li key={key} className={PERSON}>
                  <Portrait src={meta.image} name={name} />
                  <h3 className={cn(NAME, "mt-2")}>{name}</h3>
                  <p className={ROLE}>{t(`team.members.${key}.title`)}</p>
                  <p className="text-[15px] leading-[1.55] text-muted">{t(`team.members.${key}.bio`)}</p>
                  {meta.linkedin && (
                    <a
                      href={meta.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent hover:underline"
                    >
                      <Linkedin strokeWidth={1.5} className="h-4 w-4" />
                      {t("team.linkedin")}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <SectionHead heading={t("advisers.heading")} className="mb-10 mt-20" />
          <ul className={GRID}>
            {advisers.map((key) => {
              const name = t(`advisers.members.${key}.name`);
              const meta = adviserMeta[key];
              return (
                <li key={key} className={PERSON}>
                  <Portrait src={meta.image} name={name} />
                  <h3 className={cn(NAME, "mt-2")}>{name}</h3>
                  <p className={ROLE}>{t(`advisers.members.${key}.title`)}</p>
                  <p className="text-[15px] leading-[1.55] text-muted">{t(`advisers.members.${key}.bio`)}</p>
                  <a
                    href={meta.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent hover:underline"
                  >
                    <Linkedin strokeWidth={1.5} className="h-4 w-4" />
                    {t("team.linkedin")}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("partners.heading")} className="mb-10" />
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
            {partners.map((key) => {
              const meta = partnerMeta[key];
              return (
                <li key={key}>
                  <Link href={meta.link} className={cn(CARD, CARD_HOVER, "flex h-full flex-col gap-4 p-8")}>
                    <Image
                      src={meta.image}
                      alt={t(`partners.items.${key}.name`)}
                      width={meta.width}
                      height={meta.height}
                      className="h-11 w-auto max-w-[180px] self-start object-contain object-left"
                    />
                    <h3 className={NAME}>{t(`partners.items.${key}.name`)}</h3>
                    <p className="text-[15px] leading-[1.55] text-muted">{t(`partners.items.${key}.description`)}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                      {t(`partners.items.${key}.more`)}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <BadgeRow
        heading={t("awards.heading")}
        lilac
        items={awards.map((key) => {
          const meta = awardMeta[key];
          return {
            image: { src: meta.image, alt: t(`awards.items.${key}.alt`), width: meta.width, height: meta.height },
            renderHeight: meta.renderHeight,
            darkPlate: meta.darkPlate,
            caption: t("awards.winner"),
            title: t(`awards.items.${key}.title`),
            text: t(`awards.items.${key}.body`),
          };
        })}
      />

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
