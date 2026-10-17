import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GridPattern } from "@/components/brand/GridPattern";
import { Summary } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { newsItems } from "./items";

const PATH = "/news";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH);
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  return (
    <div className="min-h-screen">
      <PageSeo locale={locale} path={PATH} template="collection" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("index.title")}
          </h1>
          <Summary>{t("index.summary")}</Summary>
        </div>
      </section>

      {/* Items */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {newsItems.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="block group">
              <article className="bg-card shadow-card rounded-pill p-8 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                <time dateTime={item.datePublished} className="text-caption-sm text-subtle">
                  {t(`items.${item.key}.displayDate`)}
                </time>
                <h2 className="font-display text-2xl font-bold text-strong mt-3 mb-3">{t(`items.${item.key}.title`)}</h2>
                <p className="text-body leading-[1.6] mb-4">{t(`items.${item.key}.excerpt`)}</p>
                <span className="inline-flex items-center gap-2 text-link font-medium">
                  {t("index.readMore")}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
