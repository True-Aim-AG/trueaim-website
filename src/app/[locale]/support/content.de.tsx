import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Kundensupport" texture={{ name: "glass", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Zuletzt aktualisiert:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">So erreichen Sie uns</h2>
              <p className="text-body leading-[1.6]">
                Für Produktsupport schreiben Sie an{" "}
                <a href="mailto:support@trueaim.ai" className="text-link hover:underline">support@trueaim.ai</a>. Bitte nennen Sie den Namen Ihres Mandanten, den betroffenen Nutzer, eine Beschreibung des Problems sowie Screenshots oder Fehlermeldungen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Zeiten und Reaktionszeiten</h2>
              <p className="text-body leading-[1.6] mb-3">
                Unsere Geschäftszeiten sind Montag bis Freitag, 9:00 bis 18:00 Uhr mitteleuropäischer Zeit, ausgenommen Schweizer Feiertage. Unsere angestrebten Erstreaktionszeiten sind:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Schweregrad 1 (Produktionsausfall oder Datenverlust):</strong> innerhalb von 4 Geschäftsstunden.</li>
                <li><strong className="text-strong">Schweregrad 2 (wichtige Funktion nicht verfügbar):</strong> innerhalb von 1 Werktag.</li>
                <li><strong className="text-strong">Schweregrad 3 / 4 (Fragen, kleinere Probleme):</strong> innerhalb von 3 Werktagen.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Die konkreten Servicelevel für zahlende Kunden richten sich nach dem jeweiligen Vertrag.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Weitere Kontaktkanäle</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Vertrieb und Partnerschaften:{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-link hover:underline">hello@trueaim.ai</a>
                </li>
                <li>Datenschutz:{" "}
                  <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>{" "}
                  (siehe{" "}
                  <Link href="/privacy" className="text-link hover:underline">Datenschutzerklärung</Link>)
                </li>
                <li>Sicherheitsmeldungen:{" "}
                  <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>{" "}
                  (siehe{" "}
                  <Link href="/security" className="text-link hover:underline">Sicherheit</Link>)
                </li>
                <li>Ethik und vertrauliche Meldungen:{" "}
                  <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>{" "}
                  (siehe{" "}
                  <Link href="/ethics" className="text-link hover:underline">Ethik &amp; Meldungen</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
