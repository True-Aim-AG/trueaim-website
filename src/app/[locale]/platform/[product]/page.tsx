import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { products, findProduct } from "@/data/products";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string; product: string }> };

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
    <>
      <PageSeo locale={locale} path={`/platform/${product.slug}`} template="product" />
      <ProductTemplate
        name={t(`${product.key}.name`)}
        summary={t(`${product.key}.summary`)}
        relatedHeading={t("related.heading")}
        related={related}
      />
    </>
  );
}
