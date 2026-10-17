import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BadgeRow, CARD, CARD_HOVER, CtaBand, PageHero, SECTION, SECTION_LILAC, SectionHead } from "@/components/content";
import { cn } from "@/lib/utils";

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
  leuchtturm: { image: "/awards/digitaler-leuchtturm.png", width: 198, height: 132, renderHeight: 56, darkPlate: true },
  ikn: { image: "/awards/ikn-italy.png", width: 167, height: 151, renderHeight: 72 },
};

/** A photo, or the initials on a lilac disc where there is no photo yet. */
function Portrait({ src, name }: { src?: string; name: string }) {
  if (src) {
    return <Image src={src} alt={name} width={96} height={96} className="h-24 w-24 rounded-full bg-lilac object-cover" />;
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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        summary={t("hero.p1")}
        buttons={[{ label: t("hero.button"), href: "/contact" }]}
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

      {/* Mission */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[70ch]">
            <p className="mb-4 font-body text-[14px] font-medium uppercase tracking-[0.16em] text-accent">{t("mission.label")}</p>
            <p className="font-display text-[26px] font-semibold leading-[1.3] text-strong text-balance md:text-[32px]">
              {t("mission.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("team.heading")} className="mb-10" />
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {team.map((key) => {
              const name = t(`team.members.${key}.name`);
              const meta = teamMeta[key];
              return (
                <li key={key} className={PERSON}>
                  <Portrait src={meta.image} name={name} />
                  <p className={cn(ROLE, "mt-2")}>{t(`team.members.${key}.title`)}</p>
                  <h3 className={NAME}>{name}</h3>
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
        </div>
      </section>

      {/* Advisers */}
      <section className={SECTION_LILAC}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("advisers.heading")} className="mb-10" />
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {advisers.map((key) => {
              const name = t(`advisers.members.${key}.name`);
              return (
                <li key={key} className={PERSON}>
                  <Portrait src={adviserImages[key]} name={name} />
                  <h3 className={cn(NAME, "mt-2")}>{name}</h3>
                  <p className="text-[14px] font-medium leading-[1.45] text-strong">{t(`advisers.members.${key}.title`)}</p>
                  <p className="text-[15px] leading-[1.55] text-muted">{t(`advisers.members.${key}.focus`)}</p>
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

      {/* Location */}
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <SectionHead heading={t("location.heading")} className="mb-6" />
          <address className="not-italic text-[18px] leading-[30px] text-body">{t("location.address")}</address>
        </div>
      </section>

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.button"), href: "/contact" }]} />
    </>
  );
}
