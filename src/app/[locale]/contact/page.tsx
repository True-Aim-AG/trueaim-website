import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero, SECTION_LILAC } from "@/components/content";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <PageHero title={t("hero.title")} summary={t("hero.summary")} texture={{ name: "circ", position: "50% 0" }} />
      <section className={SECTION_LILAC}>
        <div className="mx-auto max-w-7xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
