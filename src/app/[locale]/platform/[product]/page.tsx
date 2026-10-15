import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageLocales } from "@/i18n/page-locales";
import { products, findProduct } from "@/data/products";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import { defaultOgImages, DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { localeUrl } from "@/lib/site-url";

type Props = { params: Promise<{ locale: string; product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ product: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product: slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: `metadata.${product.key}` });
  const path = `/platform/${product.slug}`;

  const languages: Record<string, string> = {};
  for (const loc of pageLocales(path)) {
    languages[loc] = localeUrl(loc, path);
  }
  languages["x-default"] = localeUrl("en", path);

  return {
    title: { absolute: t("title") },
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localeUrl(locale, path),
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: localeUrl(locale, path),
      languages,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, product: slug } = await params;
  setRequestLocale(locale);
  const product = findProduct(slug);
  if (!product) notFound();
  const t = await getTranslations({ locale, namespace: "productPages" });
  const related = [
    ...products
      .filter((other) => other.slug !== product.slug)
      .map((other) => ({ title: t(`${other.key}.name`), href: `/${locale}/platform/${other.slug}/` })),
    { title: t("related.platform"), href: `/${locale}/platform/` },
  ];
  return (
    <ProductTemplate
      name={t(`${product.key}.name`)}
      summary={t(`${product.key}.summary`)}
      relatedHeading={t("related.heading")}
      related={related}
    />
  );
}
