import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    logo: "/partners/innosuisse.png",
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
      <section className="relative py-24 px-6">
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--primary)] font-medium mb-6">
            {t("subtitle")}
          </p>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
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
                    className="glass-panel glass-panel-hover p-8 flex flex-col gap-6 h-full"
                  >
                    <div className="bg-white p-4 rounded-xl self-start">
                      <Image
                        src={p.logo}
                        alt={`${p.name} logo`}
                        width={p.width}
                        height={p.height}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                        {p.name}
                      </h2>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {t(`${key}.tagline`)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[var(--primary)] font-medium mt-auto">
                      {t("viewPartner")}
                      <ArrowRight className="w-4 h-4" />
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
