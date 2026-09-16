import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { GridPattern } from "@/components/brand/GridPattern";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Eyebrow className="inline-flex items-center gap-2 mb-6">
              <MessageSquare strokeWidth={1.5} className="w-4 h-4" />
              {t("hero.badge")}
            </Eyebrow>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lede text-body max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
