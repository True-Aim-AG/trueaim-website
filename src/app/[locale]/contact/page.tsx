import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero, SECTION } from "@/components/content";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <PageHero title={t("hero.title")} summary={t("hero.summary")} texture={{ name: "glass" }} />
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
