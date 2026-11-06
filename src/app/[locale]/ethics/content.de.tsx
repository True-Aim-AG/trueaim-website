import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Ethik & vertrauliche Meldungen" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Zuletzt aktualisiert:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              Die True Aim AG verpflichtet sich zu integrem Handeln und bietet einen sicheren Kanal, um Bedenken wegen möglichen Fehlverhaltens, ethischer Verstöße, Sicherheits- oder Datenschutzprobleme oder Verstöße gegen Gesetze oder Unternehmensrichtlinien zu äußern.
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">So melden Sie</h2>
              <p className="text-body leading-[1.6]">
                Senden Sie eine E-Mail an{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>. Dieses Postfach wird vom CEO betreut. Sie können so viele oder so wenige Einzelheiten angeben, wie Sie möchten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Anonym melden</h2>
              <p className="text-body leading-[1.6] mb-3">
                Wenn Sie lieber anonym melden möchten, können Sie:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Ihre E-Mail über einen anonymen E-Mail-Anbieter senden (zum Beispiel ein kostenloses Webmail-Konto, das Sie nicht identifiziert).</li>
                <li>Einen Brief senden an: True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz, gekennzeichnet mit „Vertraulich: Ethik-Meldung“.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Wir werden nicht versuchen, anonyme Meldende zu identifizieren. Wir werden jedoch, wo möglich, über denselben Kanal Rückfragen stellen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">So gehen wir mit Meldungen um</h2>
              <p className="text-body leading-[1.6]">
                Meldungen werden vom CEO geprüft. Betrifft eine Meldung den CEO, ist sie an derselben Adresse an den Vorsitzenden des Verwaltungsrats zu richten, mit dem Vermerk „zu Händen des Vorsitzenden“. Nicht anonyme Meldungen bestätigen wir innerhalb von fünf Werktagen. Untersuchungen werden so vertraulich wie möglich geführt, im Einklang mit unserer Pflicht, zu untersuchen und Abhilfe zu schaffen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Schutz vor Vergeltung</h2>
              <p className="text-body leading-[1.6]">
                True Aim untersagt Vergeltungsmaßnahmen gegen jede Person, die in gutem Glauben über diesen Kanal ein Anliegen vorbringt oder an einer Untersuchung mitwirkt. Vergeltung ist selbst ein Grund für Disziplinarmaßnahmen bis hin zur Kündigung.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Verwandte Richtlinien</h2>
              <p className="text-body leading-[1.6]">
                Dieser Kanal ist in unserem Verhaltenskodex und unserer Whistleblower-Richtlinie beschrieben, die Mitarbeitenden und Auftragnehmern zur Verfügung stehen; externe Parteien erhalten sie auf Anfrage unter{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
