import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CARD, CARD_HOVER, PageHero, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

type Partner = {
  slug: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  translationKey?: string;
};

const partners: Partner[] = [
  {
    slug: "yarowa",
    name: "Yarowa AG",
    logo: "/partners/yarowa.png",
    width: 978,
    height: 273,
  },
  {
    slug: "innosuisse",
    name: "Innosuisse",
    logo: "/partners/innosuisse.webp",
    width: 720,
    height: 487,
  },
  {
    slug: "zhaw",
    name: "ZHAW Zurich University of Applied Sciences",
    logo: "/partners/zhaw-logo.png",
    width: 288,
    height: 302,
  },
  {
    slug: "swissinsurtechhub",
    name: "Swiss InsurTech Hub",
    logo: "/partners/swiss-insurtech-hub.png",
    width: 376,
    height: 193,
    translationKey: "swissInsurtechHub",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/partners");
}

export default async function PartnersHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners.hub");

  return (
    <>
      <PageSeo locale={locale} path="/partners" template="collection" />

      <PageHero eyebrow={t("title")} title={t("subtitle")} summary={t("intro")} texture={{ name: "circ", position: "72% 18%" }} />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => {
              const key = p.translationKey ?? p.slug;
              return (
                <li key={p.slug}>
                  <Link href={`/partners/${p.slug}`} className={cn(CARD, CARD_HOVER, "flex h-full flex-col gap-4 p-8")}>
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      width={p.width}
                      height={p.height}
                      className="h-11 w-auto max-w-[180px] self-start object-contain object-left"
                    />
                    <h2 className="font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong">{p.name}</h2>
                    <p className="text-[15px] leading-[1.55] text-muted">{t(`${key}.tagline`)}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                      {t("viewPartner")}
                      <ArrowRight strokeWidth={1.5} className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
