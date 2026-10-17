import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CARD, CARD_HOVER, PageHero, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";
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
    <>
      <PageSeo locale={locale} path={PATH} template="collection" />

      <PageHero title={t("index.title")} summary={t("index.summary")} texture={{ name: "glass", position: "88% 78%" }} />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className={cn(CARD, CARD_HOVER, "flex h-full flex-col gap-4 p-8")}>
                  <time dateTime={item.datePublished} className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
                    {t(`items.${item.key}.displayDate`)}
                  </time>
                  <h2 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">
                    {t(`items.${item.key}.title`)}
                  </h2>
                  <p className="text-[15px] leading-[1.55] text-muted">{t(`items.${item.key}.excerpt`)}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                    {t("index.readMore")}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
