import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/brand/Button";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Datenschutzerklärung (frühere Fassung)
          </h1>
          <p className="text-sm text-muted mb-2">
            Zuletzt aktualisiert: 8. Februar 2026
          </p>
          <div className="bg-lilac rounded-pill px-8 py-6 mb-8">
            <p className="text-sm text-body leading-[1.6]">
              Dies ist eine archivierte frühere Fassung unserer Datenschutzerklärung. Die aktuelle Fassung finden Sie unter{" "}
              <Link href="/privacy" className="text-link hover:underline font-medium">
                trueaim.ai/privacy
              </Link>.
            </p>
          </div>

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Wer wir sind</h2>
              <p className="text-body leading-[1.6]">
                Diese Website wird betrieben von der <strong className="text-strong">True Aim AG</strong>, Handelsregisternummer <strong className="text-strong">CHE-325.128.066</strong>, mit Sitz in Zug, Schweiz. Eingetragene Adresse: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz. Diese Datenschutzerklärung erläutert, wie wir personenbezogene Daten erheben, verwenden und schützen, wenn Sie mit unserer Website interagieren.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Geltungsbereich dieser Datenschutzerklärung</h2>
              <p className="text-body leading-[1.6]">
                Diese Datenschutzerklärung gilt für personenbezogene Daten, die über unsere öffentliche Website erhoben werden, einschließlich Kontaktformularen, Formularen zur Demo-Buchung und Links zur Terminplanung. Sie regelt nicht die Verarbeitung von Daten im Rahmen von Geschäftsvereinbarungen oder Kundenverträgen, die gesonderten vertraglichen Bedingungen unterliegen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Personenbezogene Daten, die wir erheben</h2>
              <p className="text-body leading-[1.6]">
                Wir erheben personenbezogene Daten, die Sie uns freiwillig mitteilen, wenn Sie uns kontaktieren oder eine Demo anfragen. Dazu können Ihr Vor- und Nachname, Ihre geschäftliche E-Mail-Adresse, Ihr Unternehmen, Ihre Funktion, Ihr Land sowie alle Angaben gehören, die Sie in Freitextfeldern machen oder die Sie uns auf unsere Anfrage hin von Zeit zu Zeit übermitteln. Wenn Sie über einen Kalender-Link einen Termin buchen, erhalten wir gegebenenfalls auch Informationen zur Terminplanung. Zusätzlich können wir über Cookies und Analysetools technische Daten wie unter anderem IP-Adresse, Browsertyp und Nutzungsdaten erheben.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Wie wir personenbezogene Daten verwenden</h2>
              <p className="text-body leading-[1.6]">
                Wir verwenden personenbezogene Daten, um Anfragen zu beantworten, Demos oder Termine zu vereinbaren, mit potenziellen Kunden und Partnern zu kommunizieren, unsere Website zu verbessern und zu verstehen, wie sie genutzt wird. Sofern Sie eingewilligt haben, können wir Ihre Daten auch nutzen, um Ihnen relevante Mitteilungen über True Aim und unsere Leistungen zu senden. Wir verkaufen keine personenbezogenen Daten und nutzen sie nicht für automatisierte Entscheidungen, die Einzelpersonen betreffen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Rechtsgrundlage der Verarbeitung</h2>
              <p className="text-body leading-[1.6]">
                Wir verarbeiten personenbezogene Daten auf Grundlage Ihrer Einwilligung, unserer berechtigten Interessen am Betrieb und an der Verbesserung unserer Website sowie an der Beantwortung geschäftlicher Anfragen und, soweit anwendbar, zur Erfüllung rechtlicher Pflichten. Sie können Ihre Einwilligung jederzeit widerrufen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Datenhosting und internationale Übermittlungen</h2>
              <p className="text-body leading-[1.6]">
                Unsere primäre Infrastruktur für Datenhosting und Sicherheit befindet sich in der <strong className="text-strong">Schweiz</strong>. Personenbezogene Daten können aus anderen Rechtsordnungen abgerufen oder dort verarbeitet werden, soweit dies für den Betrieb unserer Website oder die Unterstützung unserer Geschäftstätigkeit erforderlich ist. Bei internationalen Übermittlungen treffen wir geeignete Maßnahmen, um ein angemessenes Datenschutzniveau im Einklang mit Schweizer und EU-Standards sicherzustellen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Aufbewahrung der Daten</h2>
              <p className="text-body leading-[1.6]">
                Wir bewahren personenbezogene Daten nur so lange auf, wie es für die in dieser Datenschutzerklärung beschriebenen Zwecke erforderlich ist, es sei denn, eine längere Aufbewahrungsfrist ist gesetzlich vorgeschrieben oder zulässig. Über Kontakt- oder Demo-Formulare übermittelte Informationen werden in der Regel zur geschäftlichen Nachverfolgung und zu Dokumentationszwecken aufbewahrt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Datensicherheit</h2>
              <p className="text-body leading-[1.6]">
                Wir setzen geeignete technische und organisatorische Maßnahmen ein, um personenbezogene Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Auch wenn kein System vollständige Sicherheit garantieren kann, nehmen wir den Datenschutz ernst und bemühen uns, die angemessenen Schutzvorkehrungen zu treffen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Ihre Rechte</h2>
              <p className="text-body leading-[1.6]">
                Je nach Ihrem Standort und dem anwendbaren Recht haben Sie gegebenenfalls das Recht, Auskunft über Ihre personenbezogenen Daten zu verlangen, deren Berichtigung oder Löschung zu verlangen, der Verarbeitung zu widersprechen oder sie einschränken zu lassen oder Ihre Einwilligung zu widerrufen. Anfragen richten Sie bitte an{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Südafrika und POPIA</h2>
              <p className="text-body leading-[1.6]">
                Soweit personenbezogene Daten in oder aus Südafrika verarbeitet werden, treffen wir Maßnahmen, um uns am Protection of Personal Information Act (POPIA) auszurichten. Unser{" "}
                <Link href="/paia" className="text-link hover:underline">
                  PAIA-Handbuch
                </Link>{" "}
                enthält weitere Informationen zu Anträgen auf Informationszugang nach südafrikanischem Recht.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Cookies und Analyse</h2>
              <p className="text-body leading-[1.6]">
                Wir verwenden Cookies und ähnliche Technologien gemäß unserer{" "}
                <Link href="/cookies" className="text-link hover:underline">
                  Cookie-Richtlinie
                </Link>. Analysetools helfen uns, die Nutzung der Website zu verstehen und die Leistung zu verbessern. Sie können Ihre Cookie-Einstellungen jederzeit verwalten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Änderungen dieser Datenschutzerklärung</h2>
              <p className="text-body leading-[1.6]">
                Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Änderungen der rechtlichen Anforderungen, der Technologie oder unserer Praxis abzubilden. Die jeweils aktuelle Fassung ist stets auf dieser Seite verfügbar oder auf Anfrage erhältlich, falls eine neuere Fassung existiert, aber noch nicht veröffentlicht wurde.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Kontakt</h2>
              <p className="text-body leading-[1.6]">
                Wenn Sie Fragen zu dieser Datenschutzerklärung oder zu unserem Umgang mit personenbezogenen Daten haben, erreichen Sie uns unter{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Unternehmen: True Aim AG<br />
                Sitz: Zug, Schweiz
              </p>
            </section>

            <div className="pt-4">
              <ButtonLink href="/contact" variant="primary" size="md">
                Kontakt aufnehmen
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
