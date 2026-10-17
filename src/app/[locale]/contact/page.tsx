import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { GridPattern } from "@/components/brand/GridPattern";
import { Summary } from "@/components/content";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.summary")}</Summary>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6 md:py-20">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
