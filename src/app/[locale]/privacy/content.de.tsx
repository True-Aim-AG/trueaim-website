import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-11-26";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "roles", label: "1. Rollen" },
  { id: "categories", label: "2. Kategorien personenbezogener Daten, die wir verarbeiten" },
  { id: "lawful-bases", label: "3. Rechtsgrundlagen der Verarbeitung" },
  { id: "use", label: "4. Wie wir personenbezogene Daten verwenden" },
  { id: "sub-processors", label: "5. Unterauftragsverarbeiter und Offenlegungen" },
  { id: "transfers", label: "6. Internationale Übermittlungen" },
  { id: "security", label: "7. Sicherheit" },
  { id: "retention", label: "8. Aufbewahrung" },
  { id: "rights", label: "9. Ihre Rechte" },
  { id: "automated", label: "10. Automatisierte Entscheidungsfindung" },
  { id: "changes", label: "11. Änderungen dieser Erklärung" },
  { id: "contact", label: "12. Kontakt" },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Datenschutzerklärung" texture={{ name: "circ", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted">
          <strong className="text-strong">Gültig ab:</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong className="text-strong">Zuletzt aktualisiert:</strong> {LAST_UPDATED}
        </p>
        <p className="mt-2 text-sm text-muted">
          Frühere Versionen:{" "}
          <Link href="/privacy-legacy" className="text-link hover:underline">
            v1 (Feb. 2026)
          </Link>
        </p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Inhalt</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-link hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              Die True Aim AG („True Aim“, „wir“, „uns“) betreibt eine mandantenfähige Plattform zur Schadenbearbeitung („Dienst“). Diese Datenschutzerklärung beschreibt, wie wir personenbezogene Daten erheben, verwenden, offenlegen und schützen, wenn unsere Kunden („Mandanten“) und deren Endnutzer (zusammen „Sie“) mit unserem Dienst oder mit dieser Website interagieren.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Rollen</h2>
              <p className="text-body leading-[1.6]">
                Für personenbezogene Daten, die ein Mandant im Zusammenhang mit dem Dienst über seine Endnutzer übermittelt, ist der Mandant der Verantwortliche, und True Aim handelt als Auftragsverarbeiter auf Grundlage eines Auftragsverarbeitungsvertrags. Für personenbezogene Daten, die wir direkt erheben, einschließlich der Kontodaten von Mandanten-Administratoren und der Daten von Besuchern der Marketing-Website, handelt True Aim als Verantwortlicher.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Kategorien personenbezogener Daten, die wir verarbeiten</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Kontodaten:</strong> Name, E-Mail-Adresse, Organisation, Funktion, Authentifizierungs-Metadaten.</li>
                <li><strong className="text-strong">Von Mandanten übermittelte Schadendaten:</strong> Schadenschilderungen, Kennungen von Anspruchstellern, Schadendaten, Policennummern, hochgeladene Dokumente.</li>
                <li><strong className="text-strong">Abgeleitete Daten:</strong> strukturierte Daten, die unsere Komponenten für Dokumentenanalyse und Sprachmodelle aus hochgeladenen Dokumenten extrahieren.</li>
                <li><strong className="text-strong">Nutzungs- und Telemetriedaten:</strong> Anwendungsprotokolle, Einträge des Prüfpfads, Anfrage-Metadaten, Betriebskennzahlen.</li>
                <li><strong className="text-strong">Website-Daten:</strong> IP-Adresse, Browser-Metadaten und besuchte Seiten, erhoben über übliche Server-Protokolle. Erst nachdem Sie Analyse-Cookies akzeptiert haben, erheben auch Google Tag Manager und Google Analytics 4 diese Daten. Erst nachdem Sie HubSpot-Tracking akzeptiert haben, erkennt der HubSpot-Tracker Ihren Browser bei späteren Besuchen und verknüpft Ihre Besuche mit einer Demo-Anfrage, die Sie senden. Unsere <Link href="/cookies" className="text-link hover:underline">Cookie-Richtlinie</Link> nennt jedes Cookie und seine Speicherdauer.</li>
                <li><strong className="text-strong">Daten aus dem Kontaktformular:</strong> die Angaben, die Sie in das Formular eingeben, zusammen mit Attributionsfeldern, die die Website mit Ihrer Übermittlung erfasst: die Seite, auf der Sie zuerst gelandet sind, die verweisende Website und Kampagnenparameter (UTM) sowie Ihre Antwort auf &bdquo;Wie haben Sie von uns erfahren?&ldquo;, falls Sie eine geben. Diese Daten gehen an HubSpot, unser CRM, und eine Kopie wird in eine Tabelle in unserem Google Workspace geschrieben, die unser Team per E-Mail benachrichtigt (siehe Abschnitt 5). Vorname, Nachname, geschäftliche E-Mail-Adresse, Unternehmen, Funktion, Land und Interessengebiet sind Pflichtangaben: Wir brauchen sie, um zu wissen, wer fragt, für welches Unternehmen und welchen Markt, und welches Produkt wir Ihnen zeigen sollen. Ohne sie können wir Ihre Anfrage nicht beantworten. Wie Sie von uns erfahren haben, Ihr Schadenvolumen und Ihre Nachricht sind freiwillig.</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Rechtsgrundlagen der Verarbeitung (DSGVO / Schweizer DSG)</h2>
              <p className="text-body leading-[1.6]">
                Diese Tabelle ordnet jedem Zweck die verwendeten Daten und die Rechtsgrundlage nach der DSGVO zu. Wo das Schweizer DSG einen Rechtfertigungsgrund verlangt, stützen wir uns auf denselben Grund.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                  <thead>
                    <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Zweck</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Daten</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Rechtsgrundlage</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Unser berechtigtes Interesse</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Ihre Demo- oder Kontaktanfrage beantworten</th><td className="py-3 pr-4">Daten aus dem Kontaktformular</td><td className="py-3 pr-4">Vorvertragliche Massnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b)</td><td className="py-3 pr-4">Nicht erforderlich</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Erfassen, wie Sie uns gefunden haben</th><td className="py-3 pr-4">Attributionsfelder: Einstiegsseite, verweisende Website, UTM-Parameter, wie Sie von uns erfahren haben</td><td className="py-3 pr-4">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)</td><td className="py-3 pr-4">Wissen, welche Kanäle Anfragen bringen, damit wir unser Marketingbudget gut einsetzen</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Sie als geschäftlichen Interessenten weiter betreuen</th><td className="py-3 pr-4">Daten aus dem Kontaktformular in unserem CRM</td><td className="py-3 pr-4">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)</td><td className="py-3 pr-4">Verkauf unseres Service an Versicherer und ihre Mitarbeitenden. Sie können jederzeit widersprechen.</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Diese Website betreiben und schützen</th><td className="py-3 pr-4">Website-Daten aus Server-Protokollen</td><td className="py-3 pr-4">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)</td><td className="py-3 pr-4">Verfügbarkeit und Sicherheit der Website</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Website-Statistiken</th><td className="py-3 pr-4">Daten aus Google Analytics 4</td><td className="py-3 pr-4">Ihre Einwilligung (Art. 6 Abs. 1 lit. a)</td><td className="py-3 pr-4">Nicht erforderlich</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Ihre Besuche mit Ihrer Demo-Anfrage verknüpfen</th><td className="py-3 pr-4">Daten aus dem HubSpot-Tracking</td><td className="py-3 pr-4">Ihre Einwilligung (Art. 6 Abs. 1 lit. a)</td><td className="py-3 pr-4">Nicht erforderlich</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Ihre Cookie-Auswahl festhalten</th><td className="py-3 pr-4">Ihre Einwilligungsauswahl</td><td className="py-3 pr-4">Rechtliche Pflicht, die Einwilligung nachzuweisen (Art. 6 Abs. 1 lit. c und Art. 7 Abs. 1)</td><td className="py-3 pr-4">Nicht erforderlich</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Den Service für Mandanten erbringen</th><td className="py-3 pr-4">Schadendaten und abgeleitete Daten</td><td className="py-3 pr-4">Wir verarbeiten diese Daten für den Mandanten, nach seinen Weisungen und gemäss Auftragsverarbeitungsvertrag. Der Mandant legt die Rechtsgrundlage fest.</td><td className="py-3 pr-4">Nicht anwendbar</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Benutzerkonten und Zugriffe der Mandanten verwalten</th><td className="py-3 pr-4">Kontodaten</td><td className="py-3 pr-4">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)</td><td className="py-3 pr-4">Den Service erbringen, den Ihre Organisation bestellt hat</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Sicherheitsvorfälle erkennen und verhindern</th><td className="py-3 pr-4">Nutzungs- und Telemetriedaten, Prüfpfad</td><td className="py-3 pr-4">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)</td><td className="py-3 pr-4">Schutz des Service und der Mandantendaten</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Rechtliche Pflichten erfüllen, etwa die Buchführung</th><td className="py-3 pr-4">Die Daten, die das Gesetz verlangt</td><td className="py-3 pr-4">Rechtliche Pflicht (Art. 6 Abs. 1 lit. c)</td><td className="py-3 pr-4">Nicht erforderlich</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Wie wir personenbezogene Daten verwenden</h2>
              <p className="text-body leading-[1.6]">
                Um den Dienst bereitzustellen und zu betreiben; Nutzer zu authentifizieren; Sicherheitsvorfälle zu erkennen, zu untersuchen und zu verhindern; rechtliche Verpflichtungen zu erfüllen; und den Dienst in aggregierter, nicht identifizierender Form zu verbessern. Wir verkaufen keine personenbezogenen Daten und verwenden keine Mandantendaten, um Basismodelle zu trainieren.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Unterauftragsverarbeiter und Offenlegungen</h2>
              <p className="text-body leading-[1.6]">
                Wir hosten den Dienst auf Microsoft Azure in der Region Switzerland North. Die maßgebliche Liste unserer aktiven Unterauftragsverarbeiter, einschließlich der jeweils erbrachten Leistung, der betroffenen Kategorien personenbezogener Daten und des Verarbeitungsorts, ist als Anhang 2 unseres Auftragsverarbeitungsvertrags für Kunden veröffentlicht, der auf Anfrage erhältlich ist.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Intern genutzte Werkzeuge (Quellcodeverwaltung, CI/CD, CRM), die keine Produktionsdaten von Mandanten verarbeiten, sind keine Unterauftragsverarbeiter für Kunden und dort nicht aufgeführt. Wir legen personenbezogene Daten keinen anderen Dritten offen, außer wenn das Gesetz es verlangt oder ein Mandant es ausdrücklich anweist.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Diese Website nutzt die folgenden Dienste. Keiner davon erhält über diese Website Mandanten- oder Schadendaten.
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Google Tag Manager und Google Analytics 4</strong> (Google Ireland Limited): werden erst geladen, nachdem Sie Analyse-Cookies akzeptiert haben; messen Seitenaufrufe und Interaktionen; GA4 protokolliert und speichert keine IP-Adressen; es werden keine personenbezogenen Daten in den Data Layer geschrieben.</li>
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, gehostet im EU-Rechenzentrum von HubSpot in Deutschland): erhält Übermittlungen aus dem Kontaktformular, einschliesslich der in Abschnitt 2 genannten Attributionsfelder. Erst nachdem Sie HubSpot-Tracking akzeptiert haben, erfasst HubSpot auch Ihre Besuche auf dieser Website und verknüpft sie mit Ihrer Übermittlung. HubSpot-Tracking hat im Cookie-Banner eine eigene Auswahl, getrennt von der Analyse.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited): Eine Tabelle in unserem Google Workspace erhält eine Kopie jeder Übermittlung aus dem Kontaktformular und sendet eine E-Mail-Benachrichtigung an unser Team.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong> (Vereinigte Staaten): die Agentur, die an der Leistung unserer Website arbeitet, mit Zugriff auf Google Tag Manager, Google Analytics und Google Search Console; sie hat keinen Zugriff auf Kunden- oder Mandantendaten.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Internationale Übermittlungen</h2>
              <p className="text-body leading-[1.6]">
                Im Dienst verarbeitete personenbezogene Daten werden in der Schweiz gespeichert. Daten aus dem Kontaktformular werden in der Europäischen Union gespeichert, im EU-Rechenzentrum von HubSpot und in unserem Google Workspace. Firon Marketing LLC, unsere Website-Agentur, hat ihren Sitz in den Vereinigten Staaten und hat Zugriff auf Google Tag Manager und Google Analytics. Findet eine Verarbeitung außerhalb der Schweiz, der EU oder des EWR statt, einschließlich Übermittlungen in die Vereinigten Staaten, stützen wir uns auf das EU-U.S. und das Swiss-U.S. Data Privacy Framework oder auf Standardvertragsklauseln. Unsere Liste der Unterauftragsverarbeiter nennt für jeden Anbieter den Ort und die Übermittlungsgrundlage.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Sicherheit</h2>
              <p className="text-body leading-[1.6]">
                Wir schützen personenbezogene Daten durch administrative, technische und physische Kontrollen, darunter Verschlüsselung bei der Übertragung und im Ruhezustand, Netzwerksegmentierung, Zugriff nach dem Prinzip der geringsten Rechte, Multi-Faktor-Authentifizierung und kontinuierliche Überwachung. Unsere Sicherheitsmaßnahmen sind im Einzelnen beschrieben unter{" "}
                <Link href="/security" className="text-link hover:underline">
                  trueaim.ai/security
                </Link>
                .
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Aufbewahrung</h2>
              <p className="text-body leading-[1.6]">
                Wir bewahren personenbezogene Daten nur so lange auf, wie wir sie für die Zwecke in Abschnitt 3 brauchen oder wie das Gesetz es verlangt. Es gelten diese Fristen:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Daten aus dem Kontaktformular und Interessentendaten:</strong> in HubSpot und in unserem Google Workspace: aufbewahrt, solange der geschäftliche Kontakt aktiv ist, und gelöscht, wenn wir sie nicht mehr benötigen.</li>
                <li><strong className="text-strong">Google Analytics 4:</strong> Ereignisdaten 2 Monate, Nutzerdaten 14 Monate.</li>
                <li><strong className="text-strong">Server-Protokolle der Website:</strong> wir führen keine eigenen Server-Protokolle. Microsoft Azure, unser Hoster, verarbeitet Zugriffsdaten, um die Website auszuliefern, und bewahrt sie nach eigenen Regeln auf.</li>
                <li><strong className="text-strong">Cookies und Ihre Einwilligungsauswahl:</strong> wie in unserer <Link href="/cookies" className="text-link hover:underline">Cookie-Richtlinie</Link> angegeben.</li>
                <li><strong className="text-strong">Mandantendaten im Service:</strong> gelöscht oder zurückgegeben bis 90 Tage nach Vertragsende des Mandanten. Schadendokumente: 7 Jahre nach Abschluss des Schadenfalls, oder bei Vertragsende, falls früher. Personenbezogene Daten im Prüfpfad: spätestens bei Vertragsende gelöscht oder anonymisiert. Der Prozessnachweis ohne personenbezogene Daten: 7 Jahre, wie im Kundenvertrag festgelegt.</li>
                <li><strong className="text-strong">Kontodaten:</strong> Benutzereinladungen 30 Tage nach Annahme oder Ablauf; Benutzer- und Mitgliedschaftsdaten 90 Tage nach Löschung.</li>
                <li><strong className="text-strong">Sicherheitsprotokolle des Service:</strong> 365 Tage. Einträge, die Benutzer eines Mandanten identifizieren: 365 Tage, oder bis Vertragsende, falls früher.</li>
                <li><strong className="text-strong">Buchhaltungsunterlagen:</strong> 10 Jahre, wie das Schweizer Recht es verlangt (Art. 958f OR).</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Der Auftragsverarbeitungsvertrag mit jedem Mandanten legt die verbindlichen Fristen für Mandantendaten fest.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Ihre Rechte</h2>
              <p className="text-body leading-[1.6]">
                Nach geltendem Recht (einschließlich DSGVO und Schweizer DSG) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Wenn Sie Endnutzer eines Mandanten sind, wenden Sie sich bitte zuerst an den Mandanten; wir unterstützen den Mandanten bei der Erfüllung Ihres Antrags. Um uns direkt zu kontaktieren, schreiben Sie an{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. Sie haben außerdem das Recht, Beschwerde bei einer Aufsichtsbehörde einzulegen. In der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB); in der EU bei Ihrer örtlichen Datenschutzbehörde.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Sie können der Verarbeitung aufgrund unseres berechtigten Interesses jederzeit widersprechen. Wo wir uns auf Ihre Einwilligung stützen (Analyse-Cookies und HubSpot-Tracking), können Sie sie jederzeit so einfach widerrufen, wie Sie sie erteilt haben: Öffnen Sie &bdquo;Cookie-Einstellungen&ldquo; in der Fusszeile jeder Seite. Der Widerruf berührt die Verarbeitung vor dem Widerruf nicht.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Automatisierte Entscheidungsfindung</h2>
              <p className="text-body leading-[1.6]">
                Der Dienst unterstützt eine Schadenbearbeitung mit menschlicher Beteiligung. Die Ergebnisse unserer Dokumentenanalyse und Sprachmodelle sind Empfehlungen an die Bearbeiter des Mandanten; endgültige Entscheidungen trifft das befugte Personal des Mandanten. True Aim trifft gegenüber Endnutzern keine ausschließlich automatisierten Entscheidungen, die rechtliche Wirkung entfalten oder sie in ähnlicher Weise erheblich beeinträchtigen.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Änderungen dieser Erklärung</h2>
              <p className="text-body leading-[1.6]">
                Wir aktualisieren diese Erklärung, wenn sich unsere Praxis weiterentwickelt. Das Datum „Zuletzt aktualisiert“ oben auf dieser Seite gibt die letzte Überarbeitung an. Wesentliche Änderungen teilen wir aktiven Mandanten mit.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Kontakt</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz.<br />
                E-Mail:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
