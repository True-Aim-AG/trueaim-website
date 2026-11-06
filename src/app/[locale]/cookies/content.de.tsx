import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Cookie-Richtlinie" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted">Zuletzt aktualisiert: 19. Oktober 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Wer wir sind</h2>
            <p className="text-body leading-[1.6]">
              Diese Website wird betrieben von der <strong className="text-strong">True Aim AG</strong>, Handelsregisternummer <strong className="text-strong">CHE-325.128.066</strong>, mit Sitz in Zug, Schweiz. Eingetragene Adresse: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz. Diese Cookie-Richtlinie erläutert, wie wir Cookies und ähnliche Technologien auf unserer Website verwenden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Was sind Cookies?</h2>
            <p className="text-body leading-[1.6]">
              Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät abgelegt werden. Sie helfen Websites, richtig zu funktionieren, verbessern das Nutzungserlebnis und liefern Informationen darüber, wie die Website genutzt wird. Cookies können von uns (Erstanbieter-Cookies) oder von Diensten Dritter, die wir nutzen, gesetzt werden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Wie wir Cookies verwenden</h2>
            <p className="text-body leading-[1.6]">
              Wir verwenden Cookies für die folgenden Zwecke. Notwendige Cookies sind erforderlich, damit die Website richtig funktioniert, und können nicht deaktiviert werden. Sie unterstützen Kernfunktionen wie die Seitennavigation, das Absenden von Formularen und die Sicherheit. Analyse-Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, etwa welche Seiten am häufigsten aufgerufen werden und wie sich Nutzer durch die Website bewegen. Diese Informationen dienen dazu, Leistung und Benutzerfreundlichkeit der Website zu verbessern. Analysedaten werden aggregiert und identifizieren keine einzelnen Nutzer direkt. Wir setzen keine Marketing- oder Werbe-Cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Auf dieser Website verwendete Cookies</h2>
            <p className="text-body leading-[1.6]">
              Bevor Sie im Cookie-Banner eine Wahl getroffen haben, wird kein Cookie gesetzt. Die Cookies und ähnlichen Technologien auf dieser Website sind:
            </p>
            <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
              <li><strong className="text-strong">Einwilligungsentscheidung</strong> (von dieser Website im lokalen Speicher Ihres Browsers abgelegt, kein Cookie): merkt sich, ob Sie Analyse-Cookies akzeptiert oder abgelehnt haben.</li>
              <li><strong className="text-strong">Google Analytics 4, geladen über Google Tag Manager</strong> (<code>_ga</code>, <code>_ga_*</code>): werden erst gesetzt, nachdem Sie Analyse-Cookies akzeptiert haben; messen Seitenaufrufe und Interaktionen.</li>
              <li><strong className="text-strong">HubSpot</strong> (<code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code>, <code>__hssrc</code>): werden erst gesetzt, nachdem Sie Analyse-Cookies akzeptiert haben; erkennen wiederkehrende Besucher und verknüpfen Übermittlungen aus dem Kontaktformular mit Besuchen.</li>
            </ul>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, die Agentur, die an der Leistung unserer Website arbeitet, hat Zugriff auf unsere Google-Tag-Manager- und Google-Analytics-Konten und setzt keine eigenen Cookies. Diese Liste wird aktualisiert, wenn wir einen Dienst hinzufügen oder entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Ihre Cookie-Einstellungen verwalten</h2>
            <p className="text-body leading-[1.6]">
              Beim Besuch unserer Website haben Sie die Möglichkeit, nicht notwendige Cookies zu akzeptieren oder abzulehnen. Sie können Cookies außerdem jederzeit über Ihre Browser-Einstellungen verwalten oder löschen. Bitte beachten Sie, dass das Deaktivieren notwendiger Cookies die Funktion der Website beeinträchtigen kann.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Datenschutz und internationaler Zugriff</h2>
            <p className="text-body leading-[1.6]">
              Cookie-Daten werden von Google Ireland Limited und HubSpot Ireland Limited (EU-Rechenzentrum in Deutschland) verarbeitet. Findet eine Verarbeitung außerhalb der EU statt, stützt sie sich auf Standardvertragsklauseln. Weitere Informationen dazu, wie wir mit personenbezogenen Daten umgehen, finden Sie in unserer{" "}
              <Link href="/privacy" className="text-link hover:underline">
                Datenschutzerklärung
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Aktualisierungen dieser Cookie-Richtlinie</h2>
            <p className="text-body leading-[1.6]">
              Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen der Technologie, der rechtlichen Anforderungen oder des Betriebs unserer Website abzubilden. Die jeweils aktuelle Fassung ist stets auf dieser Seite verfügbar oder auf Anfrage erhältlich, falls eine neuere Fassung existiert, aber noch nicht veröffentlicht wurde.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Kontakt</h2>
            <p className="text-body leading-[1.6]">
              Wenn Sie Fragen zu unserer Verwendung von Cookies haben, erreichen Sie uns unter{" "}
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
      </section>
    </div>
  );
}
