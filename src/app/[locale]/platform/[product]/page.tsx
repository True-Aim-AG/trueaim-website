import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { products, findProduct, type Product } from "@/data/products";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import {
  FeatureCards,
  FigureSection,
  KeyFacts,
  Points,
  SplitText,
  type FaqItem,
  type FeatureCard,
  type HeroTexture,
  type KeyFact,
  type Tone,
} from "@/components/content";
import {
  ClaimScene,
  FlowScene,
  InvoiceScene,
  LineBenchScene,
  OtusPrompts,
  RecordScene,
  ReportScene,
  productIcons,
  type ClaimSceneData,
  type FlowSceneData,
  type InvoiceSceneData,
  type LineBenchSceneData,
  type OtusPrompt,
  type RecordSceneData,
  type ReportSceneData,
} from "@/components/products";
import type { BrandIconName } from "@/components/brand/BrandIcon";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string; product: string }> };
type Translate = Awaited<ReturnType<typeof getTranslations<"productPages">>>;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ product: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product: slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return pageMetadata(locale, `/platform/${product.slug}`);
}

/** Brand icons for each page's cards, in the order of the copy. */
const icons: Record<string, BrandIconName[]> = {
  claimsFeatures: ["document", "quality", "decision", "logic", "traceability", "control"],
  invoiceKeys: ["document", "quality", "structure", "traceability"],
  invoiceFeatures: ["data", "structured-data", "match", "document", "control", "learning-loop"],
  otusFeatures: ["workflow", "process", "document", "decision", "learning-loop", "match", "extraction", "structure"],
  damageSteps: ["ingestion", "extraction", "process", "match"],
};

/** The brand texture and crop behind each hero, as the prototype assigns them. */
const textures: Record<Product["key"], HeroTexture> = {
  claimsDecisioning: { name: "circ", position: "72% 18%" },
  invoiceBenchmarking: { name: "glass", position: "72% 18%" },
  damageReporting: { name: "circ", position: "12% 88%" },
  otus: { name: "glass", position: "12% 88%" },
};

/** Backgrounds alternate down each page; the links block takes the tone after the last section here, the FAQ the other. */
const nextTone: Record<Product["key"], Tone> = {
  claimsDecisioning: "tint",
  invoiceBenchmarking: "tint",
  damageReporting: "tint",
  otus: "white",
};


function withIcons(items: Omit<FeatureCard, "icon">[], names: BrandIconName[]): FeatureCard[] {
  return items.map((item, index) => ({ ...item, icon: names[index] }));
}

function visual(product: Product, t: Translate) {
  const key = product.key;
  switch (key) {
    case "claimsDecisioning":
      return <ClaimScene data={t.raw(`${key}.hero.scene`) as ClaimSceneData} hero />;
    case "invoiceBenchmarking":
      return <InvoiceScene data={t.raw(`${key}.hero.scene`) as InvoiceSceneData} hero />;
    case "damageReporting":
      return <ReportScene data={t.raw(`${key}.hero.scene`) as ReportSceneData} hero />;
    case "otus":
      return (
        <OtusPrompts
          label={t("otus.prompts.label")}
          youLabel={t("otus.prompts.youLabel")}
          otusLabel={t("otus.prompts.otusLabel")}
          prompts={t.raw("otus.prompts.items") as OtusPrompt[]}
          hero
        />
      );
  }
}

function sections(product: Product, t: Translate) {
  const key = product.key;
  switch (key) {
    case "claimsDecisioning":
      return (
        <>
          <SplitText heading={t(`${key}.keys.heading`)} paragraphs={[]} image={{ src: "/brand/3d/target.webp", alt: t(`${key}.keys.heading`), width: 640, height: 640 }} imageSide="right" align="left" tone="white">
            <Points items={(t.raw(`${key}.keys.items`) as KeyFact[]).map((item) => ({ title: item.label, text: item.text }))} align="left" />
          </SplitText>
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], icons.claimsFeatures)}
            tone="tint"
          />
          <SplitText
            cap={t(`${key}.technology.cap`)}
            heading={t(`${key}.technology.heading`)}
            paragraphs={t.raw(`${key}.technology.paragraphs`) as string[]}
            image={{ src: "/brand/3d/render-04.webp", alt: t(`${key}.technology.imageAlt`), width: 560, height: 560 }}
            imageSide="left"
            align="right"
            tone="white"
          />
          <FigureSection heading={t(`${key}.flow.heading`)} tone="tint">
            <FlowScene data={t.raw(`${key}.flow.scene`) as FlowSceneData} />
          </FigureSection>
          <SplitText heading={t(`${key}.routing.heading`)} paragraphs={[]} image={{ src: "/brand/3d/shield.webp", alt: t(`${key}.routing.heading`), width: 600, height: 600 }} imageSide="right" align="left" tone="white">
            <Points items={(t.raw(`${key}.routing.items`) as KeyFact[]).map((item) => ({ title: item.label, text: item.text }))} align="left" />
          </SplitText>
          <FigureSection id="decision-dossier" heading={t(`${key}.record.heading`)} tone="tint">
            <RecordScene data={t.raw(`${key}.record.scene`) as RecordSceneData} />
          </FigureSection>
          <SplitText
            cap={t(`${key}.otus.cap`)}
            heading={t(`${key}.otus.heading`)}
            paragraphs={t.raw(`${key}.otus.paragraphs`) as string[]}
            image={{ src: "/brand/3d/symbol.webp", alt: t(`${key}.otus.imageAlt`), width: 420, height: 236 }}
            imageSide="left"
            align="right"
            link={{ href: "/platform/otus", label: t(`${key}.otus.link`) }}
            tone="white"
          />
        </>
      );
    case "invoiceBenchmarking":
      return (
        <>
          <KeyFacts heading={t(`${key}.keys.heading`)} items={t.raw(`${key}.keys.items`) as KeyFact[]} icons={icons.invoiceKeys} tone="white" />
          <SplitText
            heading={t(`${key}.unchecked.heading`)}
            paragraphs={t.raw(`${key}.unchecked.paragraphs`) as string[]}
            image={{ src: "/brand/3d/objects-01.webp", alt: t(`${key}.unchecked.imageAlt`), width: 560, height: 420 }}
            imageSide="left"
            align="right"
            tone="tint"
          />
          <FigureSection heading={t(`${key}.lineBench.heading`)} tone="white">
            <LineBenchScene data={t.raw(`${key}.lineBench.scene`) as LineBenchSceneData} />
          </FigureSection>
          <SplitText
            cap={t(`${key}.benchmark.cap`)}
            heading={t(`${key}.benchmark.heading`)}
            paragraphs={t.raw(`${key}.benchmark.paragraphs`) as string[]}
            image={{ src: "/brand/3d/render-05.webp", alt: t(`${key}.benchmark.imageAlt`), width: 560, height: 560 }}
            tone="tint"
          />
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], icons.invoiceFeatures)}
            tone="white"
          />
        </>
      );
    case "damageReporting":
      return (
        <FeatureCards
          heading={t(`${key}.steps.heading`)}
          columns={4}
          items={withIcons(t.raw(`${key}.steps.items`) as FeatureCard[], icons.damageSteps)}
          tone="white"
        />
      );
    case "otus":
      return (
        <>
          <SplitText heading={t(`${key}.keys.heading`)} paragraphs={[]} image={{ src: "/brand/3d/symbol.webp", alt: t(`${key}.features.imageAlt`), width: 420, height: 236 }} imageSide="right" align="left" tone="white">
            <Points items={(t.raw(`${key}.keys.items`) as KeyFact[]).map((item) => ({ title: item.label, text: item.text }))} align="left" />
          </SplitText>
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            columns={4}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], icons.otusFeatures)}
            tone="tint"
          />
        </>
      );
  }
}

export default async function ProductPage({ params }: Props) {
  const { locale, product: slug } = await params;
  setRequestLocale(locale);
  const product = findProduct(slug);
  if (!product) notFound();
  const t = await getTranslations({ locale, namespace: "productPages" });
  const key = product.key;
  const faqs = t.raw(`${key}.faq`) as FaqItem[];
  const faqHeading = t.has(`${key}.faqHeading`) ? t(`${key}.faqHeading`) : t("common.faqHeading");

  const related = products
    .filter((other) => other.slug !== product.slug)
    .map((other) => ({
      title: t(`${other.key}.name`),
      description: t(`${other.key}.tagline`),
      href: `/${locale}/platform/${other.slug}/`,
      icon: productIcons[other.key],
    }));

  // Hero buttons as the prototype sets them: the estimator only where the page is about the coverage check.
  const buttons =
    key === "claimsDecisioning"
      ? [
          { label: t("common.ctaDemo"), href: "/contact" },
          { label: t("common.ctaEstimate"), href: "/impact-estimator" },
        ]
      : key === "otus"
        ? [
            { label: t("common.ctaDemo"), href: "/contact" },
            { label: t(`${key}.cta.buttonClaims`), href: "/platform/claims-decisioning" },
          ]
        : [{ label: t("common.ctaDemo"), href: "/contact" }];

  const ctaButtons =
    key === "claimsDecisioning"
      ? [
          { label: t(`${key}.cta.buttonDemo`), href: "/contact" },
          { label: t(`${key}.cta.buttonEstimate`), href: "/impact-estimator" },
        ]
      : [{ label: t(`${key}.cta.buttonDemo`), href: "/contact" }];

  return (
    <>
      <PageSeo locale={locale} path={`/platform/${product.slug}`} template="product" faqs={faqs} />
      <ProductTemplate
        hero={{
          title: t(`${key}.hero.title`),
          summary: t(`${key}.hero.summary`),
          buttons,
          visual: visual(product, t),
          texture: textures[key],
        }}
        faq={{ heading: faqHeading, items: faqs }}
        related={{ heading: t("common.relatedHeading"), links: related }}
        cta={{ heading: t(`${key}.cta.heading`), lede: t(`${key}.cta.lede`), buttons: ctaButtons }}
        nextTone={nextTone[key]}
      >
        {sections(product, t)}
      </ProductTemplate>
    </>
  );
}
