import Image from "next/image";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonClasses } from "@/components/brand/Button";
import { CtaBand, PageHero, SECTION } from "@/components/content";
import { cn } from "@/lib/utils";

const ROICalculator = dynamic(
  () => import("@/components/calculator/ROICalculator").then((m) => m.ROICalculator)
);

export default async function ImpactEstimatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact");
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        summary={t("hero.summary")}
        texture={{ name: "glass", position: "72% 18%" }}
        visual={
          <Image
            src="/brand/3d/glass-box.webp"
            alt={t("hero.imageAlt")}
            width={940}
            height={900}
            className="mx-auto h-auto w-full max-w-[460px] drop-shadow-[0_30px_40px_rgba(44,43,42,.22)]"
            priority
          />
        }
      >
        <div className="mt-10">
          <a href="#estimator" className={buttonClasses("primary", "lg")}>
            {t("hero.button")}
          </a>
        </div>
      </PageHero>

      <section id="estimator" className={cn(SECTION, "scroll-mt-24")}>
        <div className="mx-auto max-w-7xl">
          <ROICalculator />
        </div>
      </section>

      <CtaBand heading={t("cta.heading")} lede={t("cta.description")} buttons={[{ label: t("cta.bookDemo"), href: "/contact" }]} />
    </>
  );
}
