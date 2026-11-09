import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Nutzungsbedingungen" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted">Zuletzt aktualisiert: 8. Februar 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Wer wir sind</h2>
            <p className="text-body leading-[1.6]">
              Diese Website wird betrieben von der <strong className="text-strong">True Aim AG</strong>, Handelsregisternummer <strong className="text-strong">CHE-325.128.066</strong>, mit Sitz in Zug, Schweiz. Eingetragene Adresse: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Schweiz. Diese Nutzungsbedingungen regeln Ihren Zugang zu dieser Website und deren Nutzung.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Annahme dieser Bedingungen</h2>
            <p className="text-body leading-[1.6]">
              Indem Sie auf diese Website zugreifen oder sie nutzen, stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie nicht zustimmen, sollten Sie die Website nicht nutzen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Zweck der Website</h2>
            <p className="text-body leading-[1.6]">
              Diese Website dient ausschließlich der allgemeinen Information, geschäftlichen Anfragen und Demonstrationszwecken. Sie richtet sich an <strong className="text-strong">geschäftliche Nutzer</strong>, darunter Kunden, Interessenten, Investoren, potenzielle Investoren, Partner usw. Über die Website werden keine Produkte oder Dienstleistungen verkauft, und durch die Nutzung der Website kommen keine Verträge zustande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Keine fachliche oder verbindliche Beratung</h2>
            <p className="text-body leading-[1.6]">
              Alle auf dieser Website bereitgestellten Informationen, einschließlich Beschreibungen von Fähigkeiten, Beispielen, Blog-Inhalten, Fallstudien und Werkzeugen wie dem Potenzialrechner, dienen <strong className="text-strong">ausschließlich der Veranschaulichung und Information</strong>. Ergebnisse und Beispiele stellen keine fachliche Beratung, keine verbindlichen Feststellungen und keine vertraglichen Zusagen dar und dürfen nicht als solche herangezogen werden. Jede Nutzung der Technologie von True Aim in Produktionsumgebungen unterliegt gesonderten vertraglichen Vereinbarungen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Hinweis zur Entscheidungsunterstützung</h2>
            <p className="text-body leading-[1.6]">
              Wo die Website auf Automatisierung, Bewertungen, Schätzungen oder Ergebnisse verweist, beschreiben diese <strong className="text-strong">ausschließlich Fähigkeiten zur Entscheidungsunterstützung</strong>, sofern nicht in einem schriftlichen Vertrag ausdrücklich etwas anderes vereinbart ist. Die endgültige Verantwortung für Entscheidungen, Handlungen und Ergebnisse verbleibt bei der jeweiligen Organisation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Geistiges Eigentum</h2>
            <p className="text-body leading-[1.6]">
              Alle Inhalte dieser Website, einschließlich Texten, Grafiken, Logos, Diagrammen und sonstigen Materialien, sind Eigentum der True Aim AG oder an sie lizenziert und durch die geltenden Gesetze zum Schutz des geistigen Eigentums geschützt. Sie dürfen Inhalte nur für interne, nicht kommerzielle Zwecke ansehen und herunterladen. Ohne vorherige schriftliche Zustimmung dürfen Sie Inhalte nicht kopieren, vervielfältigen, verändern, verbreiten oder abgeleitete Werke erstellen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Zulässige Nutzung</h2>
            <p className="text-body leading-[1.6]">
              Sie dürfen diese Website nur für rechtmäßige Zwecke und in einer Weise nutzen, die die Rechte anderer nicht verletzt und deren Nutzung der Website nicht einschränkt oder behindert. Sie dürfen nicht versuchen, den Betrieb oder die Sicherheit der Website zu beeinträchtigen.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Links zu Dritten</h2>
            <p className="text-body leading-[1.6]">
              Diese Website kann Links zu Websites oder Diensten Dritter enthalten. Die True Aim AG ist nicht verantwortlich für Inhalte, Verfügbarkeit oder Praktiken von Websites Dritter und befürwortet diese nicht.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Verfügbarkeit und Änderungen</h2>
            <p className="text-body leading-[1.6]">
              Wir können die Website oder Teile davon jederzeit ohne Vorankündigung ändern, aussetzen oder einstellen. Wir garantieren nicht, dass die Website ohne Unterbrechung oder Fehler verfügbar ist.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Haftungsbeschränkung</h2>
            <p className="text-body leading-[1.6]">
              Soweit gesetzlich zulässig, schließt die True Aim AG die Haftung für Verluste oder Schäden aus, die sich aus oder im Zusammenhang mit Ihrer Nutzung dieser Website, der Unmöglichkeit ihrer Nutzung oder dem Vertrauen auf ihre Inhalte ergeben.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Anwendbares Recht und Gerichtsstand</h2>
            <p className="text-body leading-[1.6]">
              Diese Nutzungsbedingungen unterliegen dem Recht der <strong className="text-strong">Schweiz</strong>. Für alle Streitigkeiten im Zusammenhang mit diesen Nutzungsbedingungen sind ausschließlich die zuständigen Gerichte der Schweiz zuständig.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Änderungen dieser Bedingungen</h2>
            <p className="text-body leading-[1.6]">
              Wir können diese Nutzungsbedingungen von Zeit zu Zeit aktualisieren. Die jeweils aktuelle Fassung ist stets auf dieser Seite verfügbar oder auf Anfrage erhältlich, falls eine neuere Fassung existiert, aber noch nicht veröffentlicht wurde.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Kontakt</h2>
            <p className="text-body leading-[1.6]">
              Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, erreichen Sie uns unter{" "}
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
