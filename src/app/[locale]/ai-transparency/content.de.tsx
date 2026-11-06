import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function AITransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="KI-Transparenz & Aufsicht" texture={{ name: "glass", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Zuletzt aktualisiert: 22. Februar 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Zweck dieser Erklärung</h2>
              <p className="text-body leading-[1.6]">
                Diese Erklärung beschreibt, wie die True Aim AG die Gestaltung und den Einsatz künstlicher Intelligenz in ihren Produkten angeht. Sie umreißt die Rolle der KI in unseren Systemen, die Grenzen, innerhalb derer sie arbeitet, und die angewandten Aufsichtsmechanismen. Diese Erklärung gibt unseren Ansatz zum oben genannten Datum der letzten Aktualisierung wieder und kann von Zeit zu Zeit überarbeitet werden, wenn sich unsere Architektur, unsere Governance-Praxis und das regulatorische Umfeld weiterentwickeln. Sie dient ausschließlich der Transparenz und stellt weder eine vertragliche Zusage noch eine förmliche regulatorische Einordnung dar.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Unser Gestaltungsansatz</h2>
              <p className="text-body leading-[1.6]">
                True Aim baut KI-gestützte Entscheidungsinfrastruktur für regulierte Branchen. Unsere Systeme sind darauf ausgelegt, strukturierte Analyse, Interpretation und die Ausführung von Workflows innerhalb definierter Kontrollgrenzen zu unterstützen. KI-Komponenten unterstützen das Verständnis von Dokumenten, die Datenextraktion, die Klassifizierung und die Analyse in verschiedenen Stufen der Verarbeitungskette. Menschliche Prüfung und organisatorische Kontrolle bleiben in Produktionsumgebungen zentral. Entscheidungen und Ergebnisse müssen strukturiert erklärbar und überprüfbar sein.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Wo KI eingesetzt wird</h2>
              <p className="text-body leading-[1.6]">
                In unseren Produkten kann KI eingesetzt werden, um Dokumente in strukturierten Text umzuwandeln, Dokumenttypen zu klassifizieren, strukturierte Informationen zu extrahieren und die analytische Verarbeitung zu unterstützen. KI kann die Analyse auch dort unterstützen, wo Informationen vollständig und eindeutig sind, als Teil der Beschleunigung von Workflows und der strukturierten Verarbeitung. KI-Komponenten arbeiten in definierten Stufen der Systemarchitektur und sind in umfassendere regelbasierte und Workflow-Kontrollen eingebettet.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Wo KI nicht eingesetzt wird</h2>
              <p className="text-body leading-[1.6]">
                KI-Komponenten sind nicht darauf ausgelegt, eigenständig organisatorische Befugnisse zu übernehmen oder außerhalb definierter Workflow-Stufen zu handeln. Die endgültige Verantwortung für Entscheidungen, Handlungen und Ergebnisse verbleibt bei der Organisation, die das System nutzt. Entscheidet sich eine Organisation, einen nachfolgenden Schritt oder eine operative Handlung im Anschluss an eine Systemausgabe, Empfehlung oder Analyse zu automatisieren, so verbleiben diese Entscheidung und ihre Folgen bei dieser Organisation. Dies gilt unabhängig davon, ob der nachfolgende Schritt manuell, teilautomatisiert oder über die Systemkonfiguration automatisiert erfolgt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Aufsicht und Workflow-Kontrolle</h2>
              <p className="text-body leading-[1.6]">
                Die Systeme von True Aim sind darauf ausgelegt, menschliche Aufsicht innerhalb produktiver Workflows zu unterstützen. Nutzer können Systemausgaben prüfen, unterstützende Informationen bewerten und ihr eigenes Urteil anwenden, bevor sie Ergebnisse abschließen. Rollenbasierte Berechtigungen und Workflow-Kontrollen beschränken den Zugriff auf Konfigurationsänderungen und Anpassungen der Entscheidungslogik. Systemausgaben haben beratenden Charakter, sofern in einer gesonderten schriftlichen Vereinbarung nichts anderes festgelegt ist.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Prüfbarkeit und Nachvollziehbarkeit</h2>
              <p className="text-body leading-[1.6]">
                Die Systeme von True Aim sind darauf ausgelegt, Prüfbarkeit und nachträgliche Überprüfung zu unterstützen. Verarbeitungsschritte können so aufgezeichnet werden, dass sich Ergebnisse auf die Quellmaterialien, die angewandten Regeln und die zum Zeitpunkt der Verarbeitung geltenden relevanten Systemkonfigurationen zurückführen lassen. Diese strukturierte Protokollierung soll Überprüfung, Qualitätssicherung und Compliance-Analysen in regulierten Umgebungen unterstützen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Grundsätze im Umgang mit Daten</h2>
              <p className="text-body leading-[1.6]">
                True Aim trainiert keine KI-Basismodelle mit Kundendaten. KI-Komponenten arbeiten über verwaltete KI-Dienste und verarbeiten Daten zu Inferenzzwecken innerhalb des definierten Workflows. Sicherheit, Verschlüsselung und Zugriffskontrollen werden im Einklang mit unserer umfassenderen Informationssicherheitspraxis angewandt. Aufbewahrung und Löschung von Daten richten sich nach den vertraglichen Vereinbarungen und den geltenden rechtlichen Anforderungen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Risikobasierte Gestaltung</h2>
              <p className="text-body leading-[1.6]">
                Unsere Systeme werden mit Blick auf regulierte Anwendungsfälle entwickelt. Architektonische Maßnahmen unterstützen Erklärbarkeit, strukturierte Überprüfung, Zugriffskontrolle und operative Transparenz. Wir verfeinern unsere technische Praxis und unsere Governance-Praxis weiter, während sich regulatorische Standards und die Erwartungen der Branche entwickeln.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Weiterentwicklung der Systeme</h2>
              <p className="text-body leading-[1.6]">
                True Aim bewegt sich in einem technologischen Umfeld, das sich schnell entwickelt. Systemarchitektur, Modellanbieter, Verarbeitungsmethoden und Kontrollmechanismen können sich im Laufe der Zeit ändern. Diese Erklärung beschreibt unseren allgemeinen Ansatz zum Zeitpunkt der Veröffentlichung und ist in diesem Zusammenhang zu lesen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Kontakt</h2>
              <p className="text-body leading-[1.6]">
                Wenn Sie Fragen zu unserem Ansatz beim Einsatz oder bei der Aufsicht von KI haben, erreichen Sie uns unter{" "}
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
