import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

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
    width: 200,
    height: 56,
  },
  {
    slug: "innosuisse",
    name: "Innosuisse",
    logo: "/partners/innosuisse.webp",
    width: 200,
    height: 56,
  },
  {
    slug: "zhaw",
    name: "ZHAW Zurich University of Applied Sciences",
    logo: "/partners/zhaw-logo.png",
    width: 200,
    height: 56,
  },
  {
    slug: "swissinsurtechhub",
    name: "Swiss InsurTech Hub",
    logo: "/partners/swiss-insurtech-hub.png",
    width: 200,
    height: 56,
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
    <div className="min-h-screen">
      <PageSeo locale={locale} path="/partners" template="collection" />
      <section className="relative py-24 px-6">
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold leading-[1.15] text-strong sm:text-5xl lg:text-[54px] mb-6">
            {t("title")}
          </h1>
          <p className="text-lede font-medium text-accent mb-6">
            {t("subtitle")}
          </p>
          <p className="text-lede text-body max-w-3xl mx-auto">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((p) => {
              const key = p.translationKey ?? p.slug;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/partners/${p.slug}`}
                    className="flex h-full flex-col gap-6 rounded-pill bg-card p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                  >
                    <div className="self-start rounded-pill bg-ta-neutral-0 p-6 shadow-swatch">
                      <Image
                        src={p.logo}
                        alt={`${p.name} logo`}
                        width={p.width}
                        height={p.height}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-strong mb-2">
                        {p.name}
                      </h2>
                      <p className="text-body">
                        {t(`${key}.tagline`)}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 font-medium text-accent">
                      {t("viewPartner")}
                      <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
