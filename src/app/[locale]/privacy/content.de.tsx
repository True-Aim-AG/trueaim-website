import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-10-19";

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
                <li><strong className="text-strong">Website-Daten:</strong> IP-Adresse, Browser-Metadaten und besuchte Seiten, erhoben über übliche Server-Protokolle und, erst nachdem Sie Analyse-Cookies akzeptiert haben, über Google Tag Manager und Google Analytics 4, wie in unserer Cookie-Richtlinie beschrieben.</li>
                <li><strong className="text-strong">Daten aus dem Kontaktformular:</strong> die Angaben, die Sie in das Formular eingeben, zusammen mit Attributionsfeldern, die die Website mit Ihrer Übermittlung erfasst: die Seite, auf der Sie zuerst gelandet sind, die verweisende Website, Kampagnenparameter (UTM) und Ihre Antwort auf „Wie haben Sie von uns erfahren?“. Diese Daten werden an HubSpot, unser CRM, gesendet, und eine Kopie wird in eine Tabelle in unserem Google Workspace geschrieben, die unser Team per E-Mail benachrichtigt (siehe Abschnitt 5).</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Rechtsgrundlagen der Verarbeitung (DSGVO / Schweizer DSG)</h2>
              <p className="text-body leading-[1.6]">
                Vertragserfüllung, berechtigtes Interesse am Betrieb und an der Sicherung des Dienstes, Einwilligung, wo erforderlich, und rechtliche Verpflichtung.
              </p>
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
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, gehostet im EU-Rechenzentrum von HubSpot in Deutschland): erhält Übermittlungen aus dem Kontaktformular, einschließlich der in Abschnitt 2 genannten Attributionsfelder, und erfasst, erst nachdem Sie Analyse-Cookies akzeptiert haben, Ihre Besuche auf dieser Website.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited): Eine Tabelle in unserem Google Workspace erhält eine Kopie jeder Übermittlung aus dem Kontaktformular und sendet eine E-Mail-Benachrichtigung an unser Team.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong>: die Agentur, die an der Leistung unserer Website arbeitet, mit Zugriff auf Google Tag Manager, Google Analytics und die Google Search Console; sie hat keinen Zugriff auf Kunden- oder Mandantendaten.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Internationale Übermittlungen</h2>
              <p className="text-body leading-[1.6]">
                Im Dienst verarbeitete personenbezogene Daten werden in der Schweiz gespeichert. Daten aus dem Kontaktformular werden in der Europäischen Union gespeichert, im EU-Rechenzentrum von HubSpot und in unserem Google Workspace. Findet eine Verarbeitung außerhalb der Schweiz, der EU oder des EWR statt, einschließlich Übermittlungen in die Vereinigten Staaten, stützen wir uns auf das EU-U.S. und das Swiss-U.S. Data Privacy Framework oder auf Standardvertragsklauseln. Unsere Liste der Unterauftragsverarbeiter nennt für jeden Anbieter den Ort und die Übermittlungsgrundlage.
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
                We retain personal data only as long as necessary to deliver the Service and meet our legal obligations. Tenant data is retained for the duration of the Tenant&rsquo;s subscription plus the contractually agreed return/deletion period. Specific retention periods are documented in our internal data retention schedule and reflected in the Data Processing Agreement concluded with each Tenant.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Ihre Rechte</h2>
              <p className="text-body leading-[1.6]">
                Nach geltendem Recht (einschließlich DSGVO und Schweizer DSG) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Wenn Sie Endnutzer eines Mandanten sind, wenden Sie sich bitte zuerst an den Mandanten; wir unterstützen den Mandanten bei der Erfüllung Ihres Antrags. Um uns direkt zu kontaktieren, schreiben Sie an{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. Sie haben außerdem das Recht, Beschwerde bei einer Aufsichtsbehörde einzulegen. In der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB); in der EU bei Ihrer örtlichen Datenschutzbehörde.
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
