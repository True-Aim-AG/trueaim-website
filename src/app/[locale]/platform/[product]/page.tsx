import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { products, findProduct, type Product } from "@/data/products";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import {
  FeatureCards,
  KeyFacts,
  SplitText,
  StepList,
  type FaqItem,
  type FeatureCard,
  type KeyFact,
  type Step,
} from "@/components/content";
import {
  DecisionDossierSection,
  InvoiceLineItems,
  OtusPrompts,
  type DossierItem,
  type DossierRow,
  type LineItem,
  type OtusPrompt,
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

/** Brand icons for each page's feature cards, in the order of the copy. */
const featureIcons: Record<Product["key"], BrandIconName[]> = {
  claimsDecisioning: ["document", "quality", "policy", "logic", "traceability", "control"],
  invoiceBenchmarking: ["data", "structured-data", "match", "document", "control", "learning-loop"],
  damageReporting: [],
  otus: ["human-review", "document", "process", "control", "decision", "data"],
};

function withIcons(items: Omit<FeatureCard, "icon">[], icons: BrandIconName[]): FeatureCard[] {
  return items.map((item, index) => ({ ...item, icon: icons[index] }));
}

function sections(product: Product, t: Translate) {
  const key = product.key;
  const keys = <KeyFacts heading={t(`${key}.keys.heading`)} items={t.raw(`${key}.keys.items`) as KeyFact[]} />;

  switch (key) {
    case "claimsDecisioning":
      return (
        <>
          {keys}
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], featureIcons[key])}
          />
          <DecisionDossierSection
            id="decision-dossier"
            heading={t(`${key}.dossier.heading`)}
            paragraphs={t.raw(`${key}.dossier.paragraphs`) as string[]}
            items={t.raw(`${key}.dossier.items`) as DossierItem[]}
            card={{
              title: t(`${key}.dossier.card.title`),
              subtitle: t(`${key}.dossier.card.subtitle`),
              status: t(`${key}.dossier.card.status`),
              rows: t.raw(`${key}.dossier.card.rows`) as DossierRow[],
              exportLabel: t(`${key}.dossier.card.exportLabel`),
            }}
          />
          <KeyFacts heading={t(`${key}.pricing.heading`)} items={t.raw(`${key}.pricing.items`) as KeyFact[]} />
          <SplitText
            heading={t(`${key}.otus.heading`)}
            paragraphs={t.raw(`${key}.otus.paragraphs`) as string[]}
            image={{ src: "/brand/3d/symbol.webp", alt: t(`${key}.otus.imageAlt`), width: 420, height: 236 }}
            link={{ href: "/platform/otus", label: t(`${key}.otus.link`) }}
            lilac
          />
        </>
      );
    case "invoiceBenchmarking":
      return (
        <>
          {keys}
          <SplitText
            heading={t(`${key}.benchmark.heading`)}
            paragraphs={t.raw(`${key}.benchmark.paragraphs`) as string[]}
            image={{ src: "/brand/3d/objects-01.webp", alt: t(`${key}.benchmark.imageAlt`), width: 560, height: 420 }}
            lilac
          />
          <InvoiceLineItems
            heading={t(`${key}.lineItems.heading`)}
            intro={t(`${key}.lineItems.intro`)}
            labels={{
              quantity: t(`${key}.lineItems.labels.quantity`),
              amount: t(`${key}.lineItems.labels.amount`),
              deviation: t(`${key}.lineItems.labels.deviation`),
              saving: t(`${key}.lineItems.labels.saving`),
              status: {
                approved: t(`${key}.lineItems.labels.status.approved`),
                referred: t(`${key}.lineItems.labels.status.referred`),
                denied: t(`${key}.lineItems.labels.status.denied`),
              },
            }}
            items={t.raw(`${key}.lineItems.items`) as LineItem[]}
            total={{ label: t(`${key}.lineItems.total.label`), value: t(`${key}.lineItems.total.value`) }}
          />
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], featureIcons[key])}
          />
        </>
      );
    case "damageReporting":
      return (
        <>
          {keys}
          <StepList heading={t(`${key}.steps.heading`)} steps={t.raw(`${key}.steps.items`) as Step[]} />
        </>
      );
    case "otus":
      return (
        <>
          {keys}
          <FeatureCards
            heading={t(`${key}.features.heading`)}
            items={withIcons(t.raw(`${key}.features.items`) as FeatureCard[], featureIcons[key])}
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

  const related = [
    ...products
      .filter((other) => other.slug !== product.slug)
      .map((other) => ({
        title: t(`${other.key}.name`),
        description: t(`${other.key}.tagline`),
        href: `/${locale}/platform/${other.slug}/`,
      })),
    { title: t("common.relatedPlatform"), description: t("common.relatedPlatformText"), href: `/${locale}/platform/` },
  ];

  const buttons =
    key === "otus"
      ? [
          { label: t("common.ctaDemo"), href: "/contact" },
          { label: t(`${key}.cta.buttonClaims`), href: "/platform/claims-decisioning" },
        ]
      : [
          { label: t("common.ctaDemo"), href: "/contact" },
          { label: t("common.ctaHow"), href: "/platform" },
        ];

  const ctaButtons =
    key === "claimsDecisioning"
      ? [
          { label: t(`${key}.cta.buttonDemo`), href: "/contact" },
          { label: t(`${key}.cta.buttonEstimate`), href: "/impact-estimator" },
        ]
      : key === "otus"
        ? [
            { label: t(`${key}.cta.buttonDemo`), href: "/contact" },
            { label: t(`${key}.cta.buttonClaims`), href: "/platform/claims-decisioning" },
          ]
        : [{ label: t(`${key}.cta.buttonDemo`), href: "/contact" }];

  const visual =
    key === "otus" ? (
      <OtusPrompts
        label={t("otus.prompts.label")}
        youLabel={t("otus.prompts.youLabel")}
        otusLabel={t("otus.prompts.otusLabel")}
        prompts={t.raw("otus.prompts.items") as OtusPrompt[]}
      />
    ) : undefined;

  return (
    <>
      <PageSeo locale={locale} path={`/platform/${product.slug}`} template="product" faqs={faqs} />
      <ProductTemplate
        hero={{ title: t(`${key}.hero.title`), summary: t(`${key}.hero.summary`), buttons, visual }}
        faq={{ heading: t("common.faqHeading"), items: faqs }}
        related={{ heading: t("common.relatedHeading"), links: related }}
        cta={{ heading: t(`${key}.cta.heading`), lede: t(`${key}.cta.lede`), buttons: ctaButtons }}
      >
        {sections(product, t)}
      </ProductTemplate>
    </>
  );
}
