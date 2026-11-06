import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-10-31";

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Sicherheit bei True Aim" texture={{ name: "circ", position: "12% 88%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Zuletzt aktualisiert:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="bg-lilac rounded-[12px] px-8 py-6 mb-8">
            <p className="text-body leading-[1.6]">
              <strong className="text-strong">Schwachstelle melden:</strong>{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline font-medium">
                security@trueaim.ai
              </a>
              . Wir bestätigen Meldungen innerhalb von 5 Werktagen. Siehe{" "}
              <a href="#responsible-disclosure" className="text-link hover:underline">
                Responsible Disclosure
              </a>.
            </p>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              Die True Aim AG betreibt eine Plattform zur Schadenbearbeitung für Versicherer, Makler und jede Organisation in der Versicherungs-Wertschöpfungskette, die Schäden bearbeitet oder verarbeitet. Sicherheit ist eine Kernanforderung unseres Dienstes, und unsere Kunden vertrauen uns personenbezogene Daten ihrer Versicherungsnehmer an. Diese Seite beschreibt unser Sicherheitsprogramm im Überblick. Vollständige prüfungsfähige Nachweise (SOC-2-Type-II-Bericht nach Ausstellung, ISO-27001-Zertifikat, Liste der Unterauftragsverarbeiter, Auftragsverarbeitungsvertrag) erhalten Sie über{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Diese sind unter Vertraulichkeitsvereinbarung (NDA) erhältlich.
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Compliance-Rahmenwerke</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">ISO/IEC 27001:2022</strong>: zertifiziert durch A-LIGN, Zertifikat ISMS-TR-090426, ausgestellt am 4. September 2026, gültig bis 4. September 2029.</li>
                <li><strong className="text-strong">SOC 2 Type II</strong>: auditiert für den Prüfzeitraum vom 1. Mai bis 31. Juli 2026; der Abschlussbericht wurde ausgestellt.</li>
                <li><strong className="text-strong">Schweizer DSG</strong> und <strong className="text-strong">DSGVO</strong>: als Auftragsverarbeiter für Kundendaten daran ausgerichtet.</li>
                <li><strong className="text-strong">EU AI Act</strong>: technische Dokumentation (AI Technical File) für den Automated Coverage Check wird geführt; der aktuelle Stand der Vorbereitung ist dokumentiert und wird nachverfolgt.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Wo Daten verarbeitet werden</h2>
              <p className="text-body leading-[1.6]">
                Kundendaten im Ruhezustand werden auf Microsoft Azure in der Region Switzerland North gespeichert. Hosting und KI-Inferenz bleiben in der Schweiz, im EWR oder im Vereinigten Königreich; Ausnahmen sind in der Liste der Unterauftragsverarbeiter aufgeführt, Anhang 2 unseres Auftragsverarbeitungsvertrags.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Unterauftragsverarbeiter</h2>
              <p className="text-body leading-[1.6]">
                Wir nutzen eine begrenzte Auswahl von Microsoft-Azure-Diensten für Hosting, KI-Inferenz und Betriebstelemetrie sowie Google Cloud (Gemini-Modelle für KI-Inferenz in der EU), Google Workspace (für geschäftliche E-Mail), Slack (für die interne Teamkommunikation) und Sentry (ausschließlich technische Fehlerprotokolle). Die aktuelle Liste bildet Anhang 2 unseres Auftragsverarbeitungsvertrags und ist auf Anfrage erhältlich. Über Änderungen informieren wir Kunden im Voraus. Rein interne Werkzeuge (Quellcodeverwaltung, CI/CD, CRM), die keine Produktionsdaten von Mandanten verarbeiten, sind keine Unterauftragsverarbeiter für Kunden und nicht aufgeführt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Verschlüsselung</h2>
              <p className="text-body leading-[1.6]">
                Alle Daten werden bei der Übertragung (TLS 1.2 oder höher) und im Ruhezustand (AES-256 über die Azure-Plattformverschlüsselung) verschlüsselt. Anwendungsgeheimnisse werden in Azure Key Vault gespeichert, mit aktiviertem Soft-Delete und Purge-Schutz.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Zugriffskontrolle</h2>
              <p className="text-body leading-[1.6]">
                Der Zugriff auf Kundendaten ist auf befugtes Personal von True Aim beschränkt, nach dem Prinzip der geringsten Rechte und dem Need-to-know-Prinzip, durchgesetzt über rollenbasierte Zugriffskontrollen und Azure Managed Identities. Multi-Faktor-Authentifizierung ist für alle Mitarbeiterkonten verpflichtend.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Monitoring und Incident Response</h2>
              <p className="text-body leading-[1.6]">
                Wir betreiben kontinuierliches Logging, Alarmierung und Monitoring der Produktionsumgebung über Microsoft Defender for Cloud und Azure Monitor. Wir unterhalten ein dokumentiertes Verfahren für die Reaktion auf Sicherheitsvorfälle. Kunden werden über bestätigte Sicherheitsvorfälle, die ihre Daten betreffen, unverzüglich und gemäß unserem Auftragsverarbeitungsvertrag informiert.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Schwachstellenmanagement</h2>
              <p className="text-body leading-[1.6]">
                Wir überwachen unsere Softwareabhängigkeiten und unsere Infrastruktur durch automatisiertes Scannen und Microsoft Defender auf bekannte Schwachstellen. Befunde werden anhand dokumentierter Schweregrad-SLAs priorisiert. Wir beauftragen regelmäßig externe Penetrationstester.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Personalsicherheit</h2>
              <p className="text-body leading-[1.6]">
                Alle Mitarbeitenden durchlaufen eine Hintergrundprüfung, akzeptieren Vertraulichkeitspflichten und absolvieren Schulungen zu Sicherheits- und Datenschutzbewusstsein.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Geschäftskontinuität</h2>
              <p className="text-body leading-[1.6]">
                Kundendaten werden nach einem festen Zeitplan gesichert, mit dokumentierten Wiederherstellungsverfahren. Unsere Verfahren zur Notfallwiederherstellung testen wir regelmäßig.
              </p>
            </section>

            <section id="responsible-disclosure" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Responsible Disclosure</h2>
              <p className="text-body leading-[1.6]">
                Wenn Sie glauben, eine Sicherheitsschwachstelle in unserem Dienst oder auf dieser Website gefunden zu haben, melden Sie sie bitte an{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Wir verpflichten uns, Ihre Meldung innerhalb von 5 Werktagen zu bestätigen und mit Ihnen in gutem Glauben zusammenzuarbeiten, um bestätigte Probleme zu untersuchen und zu beheben. Wir werden keine rechtlichen Schritte gegen Forschende einleiten, die diesem Offenlegungsprozess folgen, in gutem Glauben handeln und nicht über das zum Nachweis einer Schwachstelle Notwendige hinaus auf Daten zugreifen, sie verändern oder löschen. Siehe auch unseren Kanal{" "}
                <Link href="/ethics" className="text-link hover:underline">Ethik &amp; Meldungen</Link>{" "}
                für Fehlverhalten ohne Sicherheitsbezug.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Kontakt</h2>
              <p className="text-body leading-[1.6]">
                Für sicherheitsbezogene Fragen:{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Für Anfragen zum Datenschutz:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
