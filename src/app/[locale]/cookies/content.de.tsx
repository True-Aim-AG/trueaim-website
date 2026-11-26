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
        <p className="mt-6 text-sm text-muted">Zuletzt aktualisiert: 26. November 2026</p>
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
              Wir verwenden drei Kategorien von Cookies und ähnlichen Technologien.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Notwendig</strong> umfasst nur die Speicherung Ihrer Cookie-Auswahl. Diese Kategorie ist immer aktiv, denn wir brauchen sie, um Ihre Auswahl zu respektieren.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Analyse</strong> umfasst Google Analytics 4, geladen über Google Tag Manager. Es zeigt uns, wie Besucher die Website nutzen, etwa welche Seiten am häufigsten besucht werden. Wir sehen diese Statistiken in zusammengefasster Form und nutzen sie, um die Website zu verbessern.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">HubSpot-Tracking</strong> umfasst den HubSpot-Tracker. Er erkennt Ihren Browser, wenn Sie zurückkehren, erfasst Ihre Besuche und verknüpft sie mit einer Demo-Anfrage, die Sie senden. So erscheinen die Besuche in Ihrem Kontaktdatensatz in unserem CRM. Sobald Sie eine Anfrage senden, beziehen sich diese Daten auf Sie als Person. Deshalb hat HubSpot-Tracking im Cookie-Banner eine eigene Auswahl.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Wir setzen keine Werbe-Cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Auf dieser Website verwendete Cookies</h2>
            <p className="text-body leading-[1.6]">
              Vor Ihrer Auswahl im Cookie-Banner wird kein Cookie gesetzt. Die Speicherdauer ist die Frist, nach der der Eintrag abläuft. Ihr Browser kann ihn früher löschen.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                <thead>
                  <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Name</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Gesetzt von</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Kategorie</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Funktion</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Speicherdauer</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>cookie-consent</code> (lokaler Speicher, kein Cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Notwendig</td><td className="py-3 pr-4">Speichert Ihre Auswahl für jede Kategorie</td><td className="py-3 pr-4">Bis Sie Ihre Auswahl ändern</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>ta-first-touch</code> (lokaler Speicher, kein Cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Analyse</td><td className="py-3 pr-4">Speichert die Einstiegsseite, die verweisende Website und Kampagnenparameter, die mit einer Demo-Anfrage gesendet werden</td><td className="py-3 pr-4">90 Tage</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>_ga</code>, <code>_ga_*</code></th><td className="py-3 pr-4">Google Analytics 4, über Google Tag Manager</td><td className="py-3 pr-4">Analyse</td><td className="py-3 pr-4">Messen Seitenaufrufe und Interaktionen</td><td className="py-3 pr-4">400 Tage</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>hubspotutk</code>, <code>__hstc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot-Tracking</td><td className="py-3 pr-4">Erkennen wiederkehrende Besucher und verknüpfen Übermittlungen aus dem Kontaktformular mit Besuchen</td><td className="py-3 pr-4">180 Tage</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot-Tracking</td><td className="py-3 pr-4">Zählt die Seiten eines Besuchs</td><td className="py-3 pr-4">30 Minuten</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssrc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot-Tracking</td><td className="py-3 pr-4">Erkennt eine neue Browsersitzung</td><td className="py-3 pr-4">Bis Sie den Browser schliessen</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__cf_bm</code></th><td className="py-3 pr-4">HubSpot (auf den eigenen Domains von HubSpot)</td><td className="py-3 pr-4">HubSpot-Tracking</td><td className="py-3 pr-4">Schützt die Dienste von HubSpot vor Bots</td><td className="py-3 pr-4">30 Minuten</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, die Agentur, die an der Leistung unserer Website arbeitet, hat Zugriff auf unsere Google-Tag-Manager- und Google-Analytics-Konten und setzt keine eigenen Cookies. Diese Liste wird aktualisiert, wenn wir einen Dienst hinzufügen oder entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Ihre Cookie-Einstellungen verwalten</h2>
            <p className="text-body leading-[1.6]">
              Bei Ihrem ersten Besuch fragt das Cookie-Banner nach Ihrer Auswahl. &bdquo;Alle akzeptieren&ldquo; erlaubt Analyse und HubSpot-Tracking, &bdquo;Ablehnen&ldquo; erlaubt keines von beiden, und unter &bdquo;Einstellungen verwalten&ldquo; wählen Sie jede Kategorie einzeln.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Sie können Ihre Auswahl jederzeit über &bdquo;Cookie-Einstellungen&ldquo; in der Fusszeile jeder Seite ändern oder widerrufen. Wenn Sie eine Kategorie widerrufen, löschen wir ihre Cookies. Sie können Cookies auch in den Einstellungen Ihres Browsers löschen.
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
