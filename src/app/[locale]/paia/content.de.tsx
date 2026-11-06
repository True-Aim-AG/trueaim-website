import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function PAIAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="PAIA-Handbuch" texture={{ name: "circ", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Zuletzt aktualisiert: 8. Februar 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-sm text-muted italic">
              Erstellt gemäß dem Promotion of Access to Information Act, 2 of 2000
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Einleitung</h2>
              <p className="text-body leading-[1.6]">
                Dieses PAIA-Handbuch wurde gemäß Section 51 des Promotion of Access to Information Act, 2000 („PAIA“) erstellt und berücksichtigt die einschlägigen Anforderungen des Protection of Personal Information Act, 2013 („POPIA“). Zweck dieses Handbuchs ist es, die Verfahren für den Antrag auf Zugang zu Aufzeichnungen der <strong className="text-strong">True Aim AG</strong> darzulegen und die nach PAIA und POPIA erforderlichen Informationen bereitzustellen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Angaben zum Unternehmen</h2>
              <div className="space-y-2 text-body leading-[1.6]">
                <p><span className="font-medium text-strong">Firmenname:</span> True Aim AG</p>
                <p><span className="font-medium text-strong">Handelsregisternummer:</span> CHE-325.128.066</p>
                <p><span className="font-medium text-strong">Sitz:</span> Zug, Schweiz</p>
                <p><span className="font-medium text-strong">Eingetragene Adresse:</span> c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz</p>
                <p><span className="font-medium text-strong">Kontakt-E-Mail:</span>{" "}
                  <a href="mailto:info@trueaim.ai" className="text-link hover:underline">info@trueaim.ai</a>
                </p>
              </div>
              <p className="text-body leading-[1.6] mt-4">
                Die True Aim AG ist ein Unternehmen mit Sitz in der Schweiz, das weltweit tätig ist, einschließlich bestimmter Datenverarbeitungstätigkeiten mit Bezug zu Südafrika.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Informationsbeauftragter (Information Officer)</h2>
              <p className="text-body leading-[1.6]">
                Informationsbeauftragter der True Aim AG ist der <strong className="text-strong">Chief Executive Officer (CEO) der True Aim AG</strong>. Ein stellvertretender Informationsbeauftragter wurde nicht ernannt.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Alle Anfragen im Zusammenhang mit PAIA und POPIA sind per E-Mail einzureichen an:{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Leitfaden zur Nutzung des PAIA</h2>
              <p className="text-body leading-[1.6]">
                Die Südafrikanische Menschenrechtskommission hat einen Leitfaden erstellt, der erklärt, wie der PAIA genutzt wird, einschließlich der Einreichung von Zugangsanträgen. Dieser Leitfaden ist über die Website oder die Büros der Kommission erhältlich.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Ohne PAIA-Antrag verfügbare Aufzeichnungen</h2>
              <p className="text-body leading-[1.6] mb-4">
                Die folgenden Aufzeichnungen sind ohne förmlichen PAIA-Antrag verfügbar:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Auf der Website von True Aim veröffentlichte Informationen</li>
                <li>Öffentliche Marketingmaterialien</li>
                <li>Veröffentlichte Blog-Artikel und Fallstudien</li>
                <li>Öffentliche unternehmensbezogene oder regulatorische Offenlegungen</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Kategorien der geführten Aufzeichnungen</h2>
              <p className="text-body leading-[1.6]">
                Die True Aim AG kann Aufzeichnungen zu ihrer Unternehmensverwaltung, ihrem Geschäftsbetrieb, ihren Finanzen, ihrem Personal, ihren Informationssystemen, ihren Geschäftsbeziehungen und ihren Compliance-Pflichten führen, einschließlich personenbezogener Informationen im Sinne des POPIA. Der Zugang zu solchen Aufzeichnungen unterliegt den im PAIA und in anderen anwendbaren Gesetzen festgelegten Beschränkungen und Verweigerungsgründen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Aufzeichnungen zu personenbezogenen Informationen (POPIA)</h2>
              <p className="text-body leading-[1.6] mb-4">
                Die True Aim AG verarbeitet personenbezogene Informationen zu legitimen Geschäftszwecken, darunter:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Bearbeitung von Kontakten und Anfragen</li>
                <li>Demo-Anfragen und Terminplanung</li>
                <li>Geschäftliche Kommunikation</li>
                <li>Betriebliche und administrative Zwecke</li>
                <li>Einhaltung rechtlicher oder regulatorischer Vorgaben</li>
              </ul>
              <p className="text-body leading-[1.6] mt-4">
                Personenbezogene Informationen werden hauptsächlich in der <strong className="text-strong">Schweiz</strong> verarbeitet, mit angemessenen technischen und organisatorischen Schutzmaßnahmen. Soweit sich personenbezogene Informationen auf südafrikanische Betroffene beziehen, erfolgt die Verarbeitung in einer Weise, die an den Grundsätzen des POPIA ausgerichtet ist.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Antragsverfahren</h2>
              <p className="text-body leading-[1.6]">
                Anträge auf Zugang zu Aufzeichnungen sind schriftlich per E-Mail an den Informationsbeauftragten zu richten unter{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>. Der Antragsteller muss ausreichende Angaben machen, um die gewünschte Aufzeichnung zu identifizieren, und die gewünschte Form des Zugangs angeben. Vor der Bearbeitung eines Antrags ist ein Identitätsnachweis erforderlich.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Gebühren</h2>
              <p className="text-body leading-[1.6]">
                Gegebenenfalls kann gemäß PAIA eine Antragsgebühr erhoben werden. Anfallende Gebühren werden vor der Bearbeitung des Antrags mitgeteilt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Verweigerungsgründe</h2>
              <p className="text-body leading-[1.6]">
                Der Zugang zu Aufzeichnungen kann aus den im PAIA genannten Gründen verweigert werden, unter anderem zum Schutz personenbezogener Informationen, vertraulicher Geschäftsinformationen, geistigen Eigentums und von Geschäftsgeheimnissen, des Anwaltsgeheimnisses sowie aus Sicherheitserwägungen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Verfügbarkeit dieses Handbuchs</h2>
              <p className="text-body leading-[1.6]">
                Die aktuelle Fassung des PAIA-Handbuchs ist stets auf dieser Seite verfügbar oder auf Anfrage erhältlich, falls eine neuere Fassung existiert, aber noch nicht veröffentlicht wurde. Sie können sie per E-Mail anfordern unter{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Aktualisierungen</h2>
              <p className="text-body leading-[1.6]">
                Dieses Handbuch kann von Zeit zu Zeit aktualisiert werden, um Änderungen der Gesetzgebung oder der Geschäftspraxis abzubilden.
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
