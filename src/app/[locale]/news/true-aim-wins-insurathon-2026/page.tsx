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
    <article className="px-6 pb-20 pt-16 md:pb-[120px] md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-[74ch]">
          <time dateTime={item.datePublished} className="font-body text-[14px] font-medium uppercase tracking-[0.16em] text-accent">
            {t(`${key}.displayDate`)}
          </time>
          <h1 className="mt-5 font-display text-[34px] font-semibold leading-[1.05] text-strong text-balance sm:text-[40px] lg:text-[54px] lg:leading-none">
            {t(`${key}.title`)}
          </h1>
          <div className="mt-8 space-y-6 text-[18px] leading-[30px] text-body">
            <p>{t(`${key}.p1`)}</p>
            <p>{t(`${key}.p2`)}</p>
          </div>

          <h2 className="mt-14 font-display text-[24px] font-bold leading-[1.2] text-strong">{t(`${key}.sourceHeading`)}</h2>
          <p className="mt-3 text-[18px] leading-[30px] text-body">
            <a href={t(`${key}.sourceUrl`)} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
              {t(`${key}.sourceLabel`)}
            </a>
          </p>

          <p className="mt-14">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              {t(`${key}.backToNews`)}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
