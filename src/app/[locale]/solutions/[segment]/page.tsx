import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { solutions, findSolution, type Solution } from "@/data/solutions";
import { products, type Product } from "@/data/products";
import {
  CoverCards,
  CtaBand,
  FaqSection,
  FeatureCards,
  PageHero,
  Quote,
  SplitText,
  type FaqItem,
  type FeatureCard,
  type HeroTexture,
  type Tone,
} from "@/components/content";
import {
  ClaimScene,
  FlowScene,
  QueueScene,
  RecordScene,
  productIcons,
  type ClaimSceneData,
  type FlowSceneData,
  type QueueSceneData,
  type RecordSceneData,
} from "@/components/products";
import type { BrandIconName } from "@/components/brand/BrandIcon";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string; segment: string }> };
type Translate = Awaited<ReturnType<typeof getTranslations<"solutionPages">>>;
type Point = { title: string; text: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map(({ segment }) => ({ segment }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segment } = await params;
  const solution = findSolution(segment);
  if (!solution) return {};
  return pageMetadata(locale, `/solutions/${solution.segment}`);
}

/** Brand icons for each page's benefit cards, in the order of the copy (V5). */
const icons: Partial<Record<Solution["key"], BrandIconName[]>> = {
  insurers: ["human-review", "decision", "traceability", "data", "ingestion", "match"],
  tpas: ["learning-loop", "rules", "traceability"],
  warranty: ["decision", "quality", "human-review"],
};

/** The products each page links to under "Where True Aim can help", in the prototype's order. */
const help: Partial<Record<Solution["key"], Product["key"][]>> = {
  insurers: ["claimsDecisioning", "invoiceBenchmarking", "damageReporting"],
  brokers: ["claimsDecisioning", "damageReporting", "invoiceBenchmarking"],
  tpas: ["claimsDecisioning", "invoiceBenchmarking", "damageReporting"],
  claimsTech: ["claimsDecisioning", "invoiceBenchmarking", "otus"],
};

/** The brand texture and crop behind each hero, as the prototype assigns them. */
const textures: Record<Solution["key"], HeroTexture> = {
  insurers: { name: "circ", position: "50% 50%" },
  brokers: { name: "glass", position: "88% 78%" },
  tpas: { name: "circ", position: "88% 78%" },
  warranty: { name: "glass", position: "30% 10%" },
  claimsTech: { name: "circ", position: "30% 10%" },
};

/** Backgrounds alternate down each page; the FAQ takes the tone after the page's last section. */
const faqTone: Record<Solution["key"], Tone> = {
  insurers: "white",
  brokers: "tint",
  tpas: "tint",
  warranty: "tint",
  claimsTech: "white",
};

function visual(solution: Solution, t: Translate) {
  const scene = `${solution.key}.hero.scene`;
  switch (solution.key) {
    case "insurers":
    case "warranty":
      return <ClaimScene data={t.raw(scene) as ClaimSceneData} hero />;
    case "brokers":
      return <FlowScene data={t.raw(scene) as FlowSceneData} hero />;
    case "tpas":
      return <QueueScene data={t.raw(scene) as QueueSceneData} hero />;
    case "claimsTech":
      return <RecordScene data={t.raw(scene) as RecordSceneData} hero />;
  }
}

/** Short titled points under a split section's paragraphs. */
function Points({ items }: { items: Point[] }) {
  return (
    <ul className="mt-8 space-y-5 border-l-2 border-ta-blue-200 pl-6">
      {items.map((item) => (
        <li key={item.title}>
          <p className="font-display text-[19px] font-semibold leading-[1.3] text-strong">{item.title}</p>
          <p className="mt-1 text-[16px] leading-[1.55] text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function sections(solution: Solution, t: Translate) {
  const key = solution.key;
  const benefits = (tone: Tone) => (
    <FeatureCards
      heading={t(`${key}.benefits.heading`)}
      items={(t.raw(`${key}.benefits.items`) as FeatureCard[]).map((item, index) => ({ ...item, icon: icons[key]?.[index] }))}
      tone={tone}
    />
  );
  const helpCards = (tone: Tone) => (
    <FeatureCards
      heading={t("common.helpHeading")}
      items={(help[key] ?? []).map((product) => ({
        title: t(`common.help.${product}.title`),
        text: t(`common.help.${product}.text`),
        icon: productIcons[product],
        href: `/platform/${products.find((p) => p.key === product)!.slug}`,
        linkLabel: t(`common.help.${product}.link`),
      }))}
      tone={tone}
    />
  );

  switch (key) {
    case "insurers":
      return (
        <>
          {benefits("white")}
          {helpCards("tint")}
        </>
      );
    case "brokers":
      return helpCards("white");
    case "tpas":
      return (
        <>
          {benefits("white")}
          <SplitText
            heading={t(`${key}.insurers.heading`)}
            paragraphs={t.raw(`${key}.insurers.paragraphs`) as string[]}
            image={{ src: "/brand/3d/glass-box.webp", alt: t(`${key}.insurers.imageAlt`), width: 940, height: 900 }}
            imageSide="left"
            tone="tint"
          >
            <Points items={t.raw(`${key}.insurers.items`) as Point[]} />
          </SplitText>
          {helpCards("white")}
        </>
      );
    case "warranty":
      return (
        <>
          {benefits("white")}
          <CoverCards
            heading={t(`${key}.story.heading`)}
            tone="tint"
            items={[
              {
                cap: t(`${key}.story.caseStudy.cap`),
                title: t(`${key}.story.caseStudy.title`),
                text: t(`${key}.story.caseStudy.text`),
                href: "/case-studies/vehicle-warranty-claims",
                linkLabel: t(`${key}.story.caseStudy.link`),
                cover: { name: "glass", position: "12% 88%", size: "190%" },
                logo: { src: "/partners/nsa-garantie.webp", alt: t(`${key}.story.caseStudy.logoAlt`), width: 600, height: 191 },
              },
              {
                cap: t(`${key}.story.start.cap`),
                title: t(`${key}.story.start.title`),
                text: t(`${key}.story.start.text`),
                href: "/platform/claims-decisioning",
                linkLabel: t(`${key}.story.start.link`),
                cover: { name: "circ", position: "95% 30%", size: "190%" },
              },
            ]}
          />
          <Quote text={t(`${key}.quote.text`)} name={t(`${key}.quote.name`)} role={t(`${key}.quote.role`)} tone="white" />
        </>
      );
    case "claimsTech":
      return (
        <>
          <SplitText
            heading={t(`${key}.team.heading`)}
            paragraphs={t.raw(`${key}.team.paragraphs`) as string[]}
            image={{ src: "/brand/3d/render-04.webp", alt: t(`${key}.team.imageAlt`), width: 560, height: 560 }}
            tone="white"
          >
            <Points items={t.raw(`${key}.team.items`) as Point[]} />
          </SplitText>
          {helpCards("tint")}
        </>
      );
  }
}

export default async function SolutionPage({ params }: Props) {
  const { locale, segment } = await params;
  setRequestLocale(locale);
  const solution = findSolution(segment);
  if (!solution) notFound();
  const t = await getTranslations({ locale, namespace: "solutionPages" });
  const key = solution.key;
  const faqs = t.raw(`${key}.faq`) as FaqItem[];
  const path = `/solutions/${solution.segment}`;

  return (
    <>
      <PageSeo locale={locale} path={path} template="page" faqs={faqs} />
      <PageHero
        title={t(`${key}.hero.title`)}
        summary={t(`${key}.hero.summary`)}
        buttons={[{ label: t("common.ctaDemo"), href: "/contact" }]}
        visual={visual(solution, t)}
        texture={textures[key]}
      />
      {sections(solution, t)}
      <FaqSection heading={t("common.faqHeading")} faqs={faqs} tone={faqTone[key]} />
      <CtaBand
        heading={t("common.cta.heading")}
        lede={t("common.cta.lede")}
        buttons={[{ label: t("common.cta.button"), href: "/contact" }]}
      />
    </>
  );
}
