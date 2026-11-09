import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Auf dieser Seite" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-accuracy-illusion", heading: "Die Genauigkeitsillusion" },
  { id: "what-changes-between-demo-and-production", heading: "Was sich zwischen Demo und Produktion ändert" },
  { id: "the-three-metrics-that-matter", heading: "Die drei Kennzahlen, die zählen" },
  { id: "what-moves-a-pilot-forward", heading: "Was einen Piloten voranbringt" },
  { id: "operational-takeaway", heading: "Operative Schlussfolgerung" },
  { id: "key-takeaways", heading: "Das Wichtigste in Kürze" },
];

export default async function WhyClaimsAIPilotsStallBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "50% 50%" }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Alle Artikel
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Warum KI-Piloten in der Schadenbearbeitung vor der Produktionsreife stecken bleiben
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Viele KI-Piloten in der Schadenbearbeitung melden eine Genauigkeit im mittleren 90-Prozent-Bereich. Monate später laufen sie trotzdem noch nicht produktiv. Die Ursache liegt in der Messdisziplin und im Produktionsrealismus.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                10 Min. Lesezeit
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Technische Vertiefung
              </div>
              <Link href="/authors/reuben-john" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                Über den Autor
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0 max-w-3xl space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    Dieses Muster ist im Markt weit verbreitet. Es liegt selten an fehlendem Budget oder fehlender Unterstützung der Geschäftsleitung. In den meisten Fällen liegt die Ursache in der Messdisziplin und im Produktionsrealismus.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  In frühen Piloten wird die gemeldete Genauigkeit oft auf Entwicklungsdaten berechnet. Das sind Schadenfälle, auf die das System bei der Konfiguration bereits abgestimmt wurde. Bei der Bewertung auf ungesehenen Produktionsdaten fällt die Genauigkeit häufig in den 70er-Bereich. Die Differenz zwischen diesen beiden Zahlen entscheidet, ob ein System sicher eingeführt werden kann.
                </p>
              </MotionDiv>

              {/* The Accuracy Illusion */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-accuracy-illusion"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Genauigkeitsillusion
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Wenn jemand 95 Prozent Genauigkeit meldet, sollte die erste Frage einfach sein: Gemessen auf welchem Datensatz?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Die meisten Piloten stützen sich auf kuratierte Entwicklungsdatensätze. Diese sind nützlich, um Prompts, Regeln und Extraktionspipelines abzustimmen. Die volle Variabilität der Produktion bilden sie nicht ab.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Die Produktion umfasst Policenvarianten, unbekannte Rechnungsformate, Sprachunterschiede, seltene Sonderfälle und uneinheitliche Datenqualität. Ein Modell, das auf kuratierten Daten gut abschneidet, kann bei echten Schadenfällen unbemerkt versagen.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Entscheidend ist die Leistung auf einem Holdout-Datensatz: Schadenfälle, die das System noch nie gesehen hat, direkt aus den Produktionsarchiven gezogen, stratifiziert nach Genehmigung und Ablehnung, Schadenhöhe, Sprache, Fahrzeugmarke und Dokumentkomplexität.
                </p>

                {/* Key stat callout */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-semibold text-strong">
                      Die Lücke in der Praxis
                    </h3>
                  </div>
                  <p className="text-sm text-muted">
                    Diese Lücke war kein Zufall. Sie legte fehlende Deckungslogik, Vokabularlücken und strukturelle Schwächen der Extraktion offen.
                  </p>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Ein Pilot, der nur auf Entwicklungsdaten gemessen wird, erzeugt Zuversicht. Ein Pilot, der auf einem Holdout-Datensatz gemessen wird, erzeugt Klarheit.
                  </p>
                </div>
              </MotionDiv>

              {/* What Changes Between Demo and Production */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-changes-between-demo-and-production"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was sich zwischen Demo und Produktion ändert
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Der Übergang von der Demo zur Produktion bringt eine Verteilungsverschiebung mit sich. Echte Schadenfälle unterscheiden sich in wesentlichen Punkten von Testdaten.
                </p>

                <div className="space-y-6">
                  {/* Coverage categories */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Layers className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Komplexität der Deckung
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Anfangs modellierten wir weniger Deckungskategorien, als die Produktion verlangte. Als weitere Kategorien in die Pipeline kamen, lieferte das System selbstsichere, aber falsche Ergebnisse. Nach dem Ausbau der Deckungslogik verbesserte sich die Genauigkeit innerhalb einer einzigen Iteration deutlich.
                    </p>
                    <div className="mt-4 p-3 bg-lilac rounded-pill">
                      <p className="text-sm font-medium text-accent">
                        Das Modell war nicht instabil. Das Domänenmodell war unvollständig.
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <BookOpen className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Sprachliche Komplexität
                        </h3>
                        <p className="text-sm text-muted">
                          Deutsch und Französisch brauchen eine getrennte Behandlung
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Deutsche und französische Schadenfälle verlangten getrennte Vokabulare und Verarbeitungslogik. Deutsche Komposita verhalten sich anders als französische Fachbegriffe. Ohne explizite Modellierung wurden ganze Klassen gültiger Schadenfälle abgelehnt.
                    </p>
                  </div>

                  {/* Document structure */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Target className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Dokumentstruktur
                        </h3>
                        <p className="text-sm text-muted">
                          Layoutvarianten verursachen Extraktionsfehler
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Mehrspaltige Rechnungen, Seitenumbrüche, doppelte Rechnungspositionen und Layoutunterschiede führten zu fehlenden oder doppelt gezählten Beträgen, wenn die Extraktionslogik das Format nicht berücksichtigte.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mt-6">
                  Das sind normale betriebliche Realitäten, keine seltenen Sonderfälle. Wurde ein Pilot nicht unter diesen Bedingungen auf Belastbarkeit getestet, ist die gemeldete Genauigkeit nur bedingt aussagekräftig.
                </p>
              </MotionDiv>

              {/* The Three Metrics That Matter */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-three-metrics-that-matter"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die drei Kennzahlen, die zählen
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Eine einzelne Genauigkeitszahl verdeckt operative Zielkonflikte. Drei Kennzahlen geben einen besseren Einblick in die Produktionsreife.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="denied" emphasis="light" size="sm">Falsch-Genehmigungsquote</StatusPill>
                    </div>
                    <p className="text-sm text-body mb-2">
                      Sie misst das finanzielle Risiko. Eine falsche Genehmigung bedeutet, dass ein Schadenfall zu Unrecht bezahlt wurde. Schon ein kleiner Prozentsatz kann Leakage (vermeidbare Mehrzahlungen) und Prüfungsrisiken spürbar beeinflussen.
                    </p>
                    <p className="text-xs text-subtle">
                      Um die Falsch-Genehmigungsquote auf ein akzeptables Niveau zu senken, brauchte es einen strukturierten Ausbau der Domäne, eine Verfeinerung des Vokabulars und eine Kalibrierung der Schwellenwerte.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="referred" emphasis="light" size="sm">Falsch-Ablehnungsquote</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Sie misst die Auswirkungen auf Kunden und Betrieb. Falsche Ablehnungen führen zu Beschwerden, Nacharbeit, Eskalationen und Reputationsrisiken.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="progress" emphasis="light" size="sm">Weiterleitungsquote</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Sie misst die Automatisierungstiefe. Wird ein großer Teil der Schadenfälle an menschliche Prüfer weitergeleitet, hat das System die Arbeitslast nicht wesentlich reduziert.
                    </p>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    Fragen Sie Anbieter vor Gesprächen über den Produktivbetrieb nach diesen drei Kennzahlen, gemessen auf einem sauber definierten Holdout-Datensatz und aufgeschlüsselt nach Schadenart und Sprache. Können sie diesen Detailgrad nicht liefern, hat der Pilot die operative Reife noch nicht erreicht.
                  </p>
                </div>
              </MotionDiv>

              {/* What Moves a Pilot Forward */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-moves-a-pilot-forward"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was einen Piloten voranbringt
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Der Fortschritt kam nicht durch den Austausch der Technologie. Er kam durch disziplinierte Bewertungszyklen.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Wir bauten einen Holdout-Datensatz auf, stratifiziert nach Ergebnis, Schadenhöhe, Sprache und struktureller Komplexität. Ein erfahrener Schadensachbearbeiter kennzeichnete jeden Schadenfall. Dieser Datensatz wurde unter Verschluss gehalten und nie zur Abstimmung verwendet.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Die Iterationsschleife
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Messen", "Diagnostizieren", "Korrigieren", "Erneut testen"].map(
                      (step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center">
                            <span className="text-sm font-display font-semibold text-accent">
                              {i + 1}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-strong">
                            {step}
                          </span>
                          {i < 3 && (
                            <ArrowRight className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-body leading-[1.6]">
                    Jede Iteration folgte derselben Schleife. Eine hybride Architektur erwies sich als notwendig. Deterministische Regeln übernahmen klare Deckungsdefinitionen und strukturierte Logik. Sprachmodelle übernahmen mehrdeutige Beschreibungen und die Interpretation im Kontext. Jede Komponente war auf die Rolle beschränkt, die sie am besten erfüllt.
                  </p>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Konfidenzschwellen mit Absicht gesetzt
                  </h3>
                  <p className="text-sm text-body leading-[1.6]">
                    Die Konfidenzschwellen waren bewusst asymmetrisch. Genehmigungen verlangten eine höhere Konfidenz als Ablehnungen. Entscheidungen mit niedriger Konfidenz gingen zur Absicherung gegen finanzielle Risiken in die menschliche Prüfung.
                  </p>
                </div>

                {/* Results callout */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display font-semibold text-strong">
                      Ergebnisse
                    </h3>
                  </div>
                  <p className="text-sm text-body">
                    Die größte einzelne Verbesserung ergab sich aus dem Ausbau der Deckungskategorien, nicht aus dem Wechsel der Modelle. Domänenmodellierung und Messdisziplin waren die wichtigsten Treiber der Stabilität.
                  </p>
                </div>
              </MotionDiv>

              {/* Operational Takeaway */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="operational-takeaway"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Operative Schlussfolgerung
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Viele KI-Piloten in der Schadenbearbeitung bleiben stecken, weil sie optimistisch gemessen und ohne strukturierte Bewertung schrittweise weiterentwickelt werden. Um das Plateau von 70 bis 80 Prozent zu durchbrechen, braucht es:
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Einen sauber stratifizierten Holdout-Datensatz aus echten Produktionsdaten",
                    "Eine klare Trennung von falschen Genehmigungen, falschen Ablehnungen und Weiterleitungen",
                    "Eine explizite Modellierung der Deckung über alle Policenkategorien",
                    "Ein sprachspezifisches Vokabular",
                    "Konfidenzschwellen, die am finanziellen und operativen Risiko ausgerichtet sind",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-body">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Die Automatisierung der Schadenbearbeitung ist machbar. Sie verlangt ehrliche Messung, klare Kennzahlen und gezieltes Domänen-Engineering.
                  </p>
                </div>

                <p className="mt-6 text-body leading-[1.6]">
                  Wenn Sie einen Piloten bewerten oder die Produktionseinführung vorbereiten und Ihren Ansatz an einem strukturierten Holdout-Rahmen messen möchten, zeigen wir Ihnen gern, wie wir Bewertung und Iteration strukturieren.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Das Wichtigste in Kürze
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {[
                      "Die Genauigkeit auf dem Entwicklungsdatensatz verdeckt Lücken in der Produktion",
                      "Holdout-Datensätze zeigen die tatsächliche Leistung",
                      "Falsche Genehmigungen, falsche Ablehnungen und Weiterleitungsquote getrennt verfolgen",
                      "Domänenmodellierung bringt mehr Verbesserung als Modellwechsel",
                      "Asymmetrische Konfidenzschwellen schützen vor finanziellen Risiken",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body leading-[1.6]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Artikelnavigation">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  Auf dieser Seite
                </h2>
                <nav aria-label="Auf dieser Seite">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-body hover:text-accent transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Zum Trust Center
                    <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <BarChart3 className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Bereit für den Schritt über den Piloten hinaus?
            </h2>
            <p className="text-lg text-body mb-10">
              Wir helfen Ihnen, Bewertungsrahmen zu strukturieren, die aus Piloten produktionsreife Systeme machen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Kontakt aufnehmen
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                In Aktion erleben
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
