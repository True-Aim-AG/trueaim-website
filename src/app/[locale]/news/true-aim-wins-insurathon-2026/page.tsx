import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { newsItems } from "../items";

const item = newsItems.find((entry) => entry.slug === "true-aim-wins-insurathon-2026")!;

export default async function InsurathonNewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const key = `items.${item.key}` as const;
  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-20">
        <time dateTime={item.datePublished} className="text-caption-sm text-subtle">
          {t(`${key}.displayDate`)}
        </time>
        <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mt-4 mb-8">
          {t(`${key}.title`)}
        </h1>
        <div className="space-y-5 text-lg text-body leading-[1.6]">
          <p>{t(`${key}.p1`)}</p>
          <p>{t(`${key}.p2`)}</p>
        </div>

        <h2 className="font-display text-xl font-semibold text-strong mt-12 mb-3">{t(`${key}.sourceHeading`)}</h2>
        <p className="text-body">
          <a href={t(`${key}.sourceUrl`)} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
            {t(`${key}.sourceLabel`)}
          </a>
        </p>

        <p className="mt-12">
          <Link href="/news" className="inline-flex items-center gap-2 text-link font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t(`${key}.backToNews`)}
          </Link>
        </p>
      </article>
    </div>
  );
}
