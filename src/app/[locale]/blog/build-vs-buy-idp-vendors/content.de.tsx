import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Wrench,
  ShoppingCart,
  Scale,
  ClipboardList,
  Target,
} from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Auf dieser Seite" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-wrong-question", heading: "Die falsche Frage" },
  { id: "when-to-build", heading: "Wann selbst entwickeln" },
  { id: "when-to-buy", heading: "Wann kaufen" },
  { id: "the-vendor-evaluation-framework", heading: "Das Bewertungsraster für Anbieter" },
  { id: "the-demo-checklist", heading: "Die Demo-Checkliste" },
  { id: "the-hybrid-path", heading: "Der hybride Weg" },
  { id: "next-steps", heading: "Nächste Schritte" },
  { id: "key-takeaways", heading: "Das Wichtigste in Kürze" },
];

export default async function BuildVsBuyBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "12 % 88 %" }} />

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
              Build vs. Buy: Was Sie von IDP-Anbietern verlangen sollten
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Ein praxisnahes Bewertungsraster für Versicherungsteams, die Lösungen zur Schadenautomatisierung prüfen
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                15 Min. Lesezeit
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Strategischer Leitfaden
              </div>
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
              {/* The Wrong Question */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-wrong-question"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die falsche Frage
                </h2>

                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    „Sollen wir unsere Schaden-KI selbst entwickeln oder kaufen?“
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Das ist die falsche Frage. Anbieter zeigen Ihnen polierte Demos. Ihre Entwickler versprechen, sie könnten „einfach GPT-4 nehmen“. Keine der beiden Perspektiven trifft die Realität.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Die richtige Frage:{" "}
                  <strong className="text-strong">
                    Was muss gegeben sein, damit das in der Produktion funktioniert, und wer kann das tatsächlich sicherstellen?
                  </strong>
                </p>

                <p className="text-body leading-[1.6]">
                  In unserem Einsatz bei NSA Services SA kam True Aim in sieben Tagen vom ersten Test zu einem funktionierenden System und reduzierte die Expertenzeit bei komplexen Schadenfällen um 86 %. Das folgende Raster zeigt, wie Sie Anbieter von Schaden-KI anhand von Belegen statt Demonstrationen bewerten.
                </p>
              </MotionDiv>

              {/* When to Build */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Wrench className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="when-to-build"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Wann selbst entwickeln
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Eigenentwicklung ist eine Investition in Fähigkeiten, keine Kosteneinsparung. Wählen Sie sie aus strategischen Gründen, nicht aus Angst vor Anbietern.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Eigenentwicklung ist sinnvoll, wenn:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Ihre Policenlogik wirklich einzigartig ist",
                        desc: "Lassen sich Ihre Deckungsregeln in einem Anbieterprodukt nicht konfigurieren, kämpfen Sie für immer gegen dessen System.",
                      },
                      {
                        title:
                          "Sie ML-Engineering-Kapazität haben und halten können",
                        desc: "Ein kündigender Entwickler darf Ihr System nicht lahmlegen.",
                      },
                      {
                        title: "Die Schadenbearbeitung Ihr Wettbewerbsvorteil ist",
                        desc: "Manche Versicherer differenzieren sich über die Geschwindigkeit der Schadenbearbeitung. Die meisten nicht.",
                      },
                      {
                        title: "Regulatorische Anforderungen volle Kontrolle verlangen",
                        desc: "Schweizer und EU-Datenresidenz, Prüfpfade, Erklärbarkeit: Manche Aufsichtsbehörden wollen alles im Haus.",
                      },
                      {
                        title:
                          "Sie auf 12 bis 18 Monate bis zur Produktion vorbereitet sind",
                        desc: "Das ist ein realistischer Zeitrahmen für eine Eigenentwicklung.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Build Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Fallen bei der Eigenentwicklung:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Wir nehmen einfach GPT-4.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Sie stoßen an dieselbe Genauigkeitsgrenze wie alle anderen. Ein allgemeines Sprachmodell wendet Ihre Versicherungsbedingungen ohne definiertes Regelwerk nicht zuverlässig an.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Unsere Entwickler bekommen das schon hin.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Die Schadendomäne ist tief. Deutsche Komposita wie{" "}
                          <em>Abgasrückführungsventil</em> verlangen ein Automobilvokabular, das nicht von Stack Overflow kommt.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Wir wollen keine Abhängigkeit vom Anbieter.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Sie tauschen sie gegen interne Abhängigkeit: von den Entwicklern, die Ihr maßgeschneidertes System verstehen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Build */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Die tatsächlichen Kosten der Eigenentwicklung:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>• 2 bis 4 ML-Entwickler für mehr als 12 Monate</li>
                    <li>
                      • Zeit der Fachexperten für Kennzeichnung und Validierung (ca. 20 Personenstunden für eine Ground Truth aus 50 Schadenfällen)
                    </li>
                    <li>
                      • Laufende Wartung: Modelle driften, Dokumentformate ändern sich
                    </li>
                    <li>• Opportunitätskosten, weil Sie später live gehen</li>
                  </ul>
                </div>
              </MotionDiv>

              {/* When to Buy */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="when-to-buy"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Wann kaufen
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Kaufen ist ein Tausch zugunsten der Markteinführungszeit. Wählen Sie es, weil Ihnen Zeit wichtig ist, nicht weil Sie es für „einfacher“ halten.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Kaufen ist sinnvoll, wenn:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Sie in 3 bis 6 Monaten Ergebnisse in der Produktion brauchen",
                        desc: "Anbieter haben Probleme gelöst, auf die Sie noch gar nicht gestoßen sind.",
                      },
                      {
                        title:
                          "Sie keine ML-Kapazität haben (oder aufbauen wollen)",
                        desc: "ML-Entwickler zu gewinnen und zu halten ist schwer.",
                      },
                      {
                        title: "Ihre Schadenarten relativ standardisiert sind",
                        desc: "Kfz, Sach, Kranken: Das haben Anbieter schon gesehen.",
                      },
                      {
                        title:
                          "Ihre IT sich auf Integration konzentrieren soll, nicht auf Modellentwicklung",
                        desc: "Ihr Wettbewerbsvorteil liegt wahrscheinlich nicht in der KI-Forschung.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Fallen beim Kauf:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Die Demo war großartig.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Demodaten sind kuratiert. Unser System sah auf deutschen Dokumenten großartig aus, bis wir französische Schadenfälle durchlaufen ließen. Alle 25 genehmigten Schadenfälle wurden fälschlich abgelehnt.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Sie sprechen von 99 % Genauigkeit.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Fragen Sie: Genauigkeit worauf? Auf ihrem Testdatensatz oder auf Ihren Dokumenten? Entscheidungsgenauigkeit ≠ Geschäftsgenauigkeit.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          „Das ist Plug-and-Play.“
                        </span>
                        <p className="text-sm text-body mt-1">
                          Integration ist immer schwieriger als versprochen. Dokumentformate variieren. Feldnamen unterscheiden sich. Ihre Policenstruktur hat ihre Eigenheiten.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Buy */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Die tatsächlichen Kosten des Kaufs:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>
                      • Lizenzgebühren (pro Schadenfall, pro Dokument oder pro Plattform)
                    </li>
                    <li>
                      • Integrationsaufwand (typischerweise 3 bis 6 Monate, nicht 3 bis 6 Wochen)
                    </li>
                    <li>• Laufende Optimierung (abstimmen müssen Sie trotzdem)</li>
                    <li>
                      • Abhängigkeit vom Anbieter (was, wenn er die Strategie wechselt, scheitert oder übernommen wird?)
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* Vendor Evaluation Framework */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-vendor-evaluation-framework"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Das Bewertungsraster für Anbieter
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Ein systematischer Ansatz für den Anbietervergleich. Gewichten Sie die Kategorien nach Ihren Prioritäten.
                </p>

                {/* Category 1: Accuracy */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Kategorie 1: Genauigkeit & Evaluation
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Gewichtung 30 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Frage
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Worauf Sie achten sollten
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Wie hoch ist Ihre Genauigkeit auf dem Holdout-Datensatz?
                          </td>
                          <td className="py-2">
                            Konkrete Prozentzahl, Methodik erklärt
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Wie hoch ist Ihre Falsch-Genehmigungsquote?
                          </td>
                          <td className="py-2">Separat erfasst, unter 5 %</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Können Sie Fehlerkategorien zeigen?
                          </td>
                          <td className="py-2">
                            Taxonomie vorhanden, Verbesserung nachverfolgt
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Wie viele Iterationen bis zur heutigen Genauigkeit?
                          </td>
                          <td className="py-2">Zeigt Disziplin, nicht Glück</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    <strong className="text-denied-dark">Warnsignale:</strong>{" "}
                    „Unsere Genauigkeit liegt bei 99 %“ ohne Erklärung der Holdout-Methodik. Wir haben 14 verschiedene Fehlermodi über Zuordnung, Extraktion, Deckungslogik und Berechnung hinweg erfasst.
                  </p>
                </div>

                {/* Category 2: Auditability */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Kategorie 2: Prüfbarkeit
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Gewichtung 25 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Frage
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Worauf Sie achten sollten
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Kann ich jedes Feld bis zum Quelldokument zurückverfolgen?
                          </td>
                          <td className="py-2">Auf Seiten- und Zeichenebene</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Protokollieren Sie Modellversion und Konfidenz?
                          </td>
                          <td className="py-2">Vollständiger Prüfpfad</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Können Sie eine sechs Monate alte Entscheidung reproduzieren?
                          </td>
                          <td className="py-2">Volle Reproduzierbarkeit</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Wie erfassen Sie menschliche Übersteuerungen?
                          </td>
                          <td className="py-2">Mit Begründungspflicht</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Für regulierte Abläufe in der Schweiz und der EU ist Prüfbarkeit nicht verhandelbar.
                  </p>
                </div>

                {/* Category 3: Architecture */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Kategorie 3: Architektur
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Gewichtung 20 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Frage
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Worauf Sie achten sollten
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Welcher Anteil ist deterministisch, welcher ML?
                          </td>
                          <td className="py-2">
                            Höherer deterministischer Anteil = geringeres Risiko
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Wie lauten Ihre Konfidenzschwellen?
                          </td>
                          <td className="py-2">Asymmetrisch, konfigurierbar</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Wie erkennen Sie Verteilungsverschiebungen?
                          </td>
                          <td className="py-2">Monitoring vorhanden</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Wie sieht Ihr Human-in-the-Loop-Workflow aus?
                          </td>
                          <td className="py-2">Vollständige QA-Konsole</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Unsere Architektur: 57 % der Positionen werden von deterministischen Regeln bearbeitet (null LLM-Kosten). Ein höherer deterministischer Anteil = niedrigere Kosten und höhere Erklärbarkeit.
                  </p>
                </div>

                {/* Categories 4 & 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Kosten & Betrieb
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        15 %
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Aufschlüsselung der Kosten pro Schadenfall</li>
                      <li>• Token-Limits, Circuit Breaker</li>
                      <li>• P50-, P95-, P99-Latenzen</li>
                      <li>• Verarbeitung in der Landessprache</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Risiko & Sicherheit
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        10 %
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Dokumentierte Fehlermodi</li>
                      <li>• Automatisierte Regressionstests</li>
                      <li>• Kontrollierte Übergabe an den Menschen</li>
                      <li>• Datenresidenz in der EU/Schweiz</li>
                    </ul>
                  </div>
                </div>
              </MotionDiv>

              {/* Demo Checklist */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Target className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-demo-checklist"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Die Demo-Checkliste
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Was Sie verlangen sollten, wenn Anbieter präsentieren.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Vor der Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Senden Sie 10 bis 20 IHRER Schadenfälle</li>
                      <li>• Nehmen Sie Sonderfälle auf: mehrsprachig, schlechte Scanqualität</li>
                      <li>• Definieren Sie Erfolgskriterien vorab</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Während der Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Auf IHREN Dokumenten laufen lassen</li>
                      <li>• Bitten Sie darum, einen Fehlschlag zu sehen</li>
                      <li>• Klicken Sie sich bis zur Feldherkunft durch</li>
                      <li>• Fordern Sie Konfidenzwerte an</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Nach der Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Behauptete und tatsächliche Genauigkeit vergleichen</li>
                      <li>• Zählen Sie die Antworten „das stimmen wir noch ab“</li>
                      <li>• Bewerten Sie: Könnte Ihr Team das täglich nutzen?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-3">
                    Der 5-Minuten-Stresstest
                  </h3>
                  <p className="text-sm text-body">
                    Nehmen Sie Ihren seltsamsten Schadenfall. Ein deutsches Kompositum wie{" "}
                    <em>Zylinderkopfdichtung</em> mit einem französischen Rechnungsformat und einer Grenzfall-Deckungsentscheidung. Können sie das nicht live verarbeiten, gilt ihre „99 % Genauigkeit“ nicht für Ihre Realität.
                  </p>
                </div>
              </MotionDiv>

              {/* The Hybrid Path */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Building className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-hybrid-path"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Der hybride Weg
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Ziehen Sie den Mittelweg in Betracht. Einiges entwickeln, einiges kaufen.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Kaufen
                      </h3>
                      <p className="text-sm text-body">
                        Dokumentenextraktion, OCR, Klassifizierung: Anbieter sind gut im generischen Dokumentverständnis
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Entwickeln
                      </h3>
                      <p className="text-sm text-body">
                        Policenspezifische Geschäftsregeln, Deckungslogik: In Ihrer eigenen Domäne sind Sie besser
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Selbst besitzen
                      </h3>
                      <p className="text-sm text-body">
                        Bewertungsrahmen, Ground Truth, Qualitätsmonitoring. Behalten Sie die Kontrolle über die Entscheidungsebene
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Warum das funktioniert:</strong>{" "}
                    Anbieter übernehmen die Standardteile. Sie übernehmen die differenzierenden Teile. Sie können Anbieter wechseln, ohne Regeln neu zu schreiben. Sie behalten die Prüfkontrolle über die endgültigen Entscheidungen.
                  </p>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="next-steps"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Nächste Schritte
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      num: "1",
                      title: "Muss-Kriterien von Kann-Kriterien trennen",
                      desc: "Prüfbarkeit ist nicht verhandelbar. Automatische Optimierung schon.",
                    },
                    {
                      num: "2",
                      title: "Ihren Demo-Schadenfallsatz vorbereiten",
                      desc: "Zwanzig Schadenfälle, einschließlich Ihrer Sonderfälle und mehrsprachigen Dokumente.",
                    },
                    {
                      num: "3",
                      title: "Ihre Scorecard vor dem ersten Anbietergespräch erstellen",
                      desc: "Lassen Sie sich Ihre Bewertungskriterien nicht von Demos vorgeben.",
                    },
                    {
                      num: "4",
                      title: "Entscheiden: Was wollen Sie langfristig selbst besitzen?",
                      desc: "Die Entscheidungsebene? Die Extraktionsebene? Den gesamten Stack?",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          {step.title}
                        </h3>
                        <p className="text-sm text-body">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Das Ziel ist nicht, Anbieter oder Eigenentwicklung zu vermeiden. Es ist eine fundierte Entscheidung auf Basis Ihrer konkreten Situation, Ihres Zeitplans und Ihrer Fähigkeiten.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  Die True Aim AG entwickelt prüfbare KI-Systeme für regulierte Märkte in der Schweiz und der EU. Dieses Raster spiegelt unsere Erfahrung aus Einführungen wider.
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
                      "Entwickeln für strategische Fähigkeiten, nicht für Kosteneinsparungen",
                      "Kaufen für die Markteinführungszeit, nicht für Einfachheit",
                      "Bewertungsraster für Anbieter mit 5 Kategorien",
                      "Demo-Checkliste: vorher, während, nachher",
                      "Der hybride Weg: Standard kaufen, Differenzierung entwickeln",
                      "Prüfbarkeit ist nicht verhandelbar",
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
            <Scale className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Sie bewerten Anbieter von Schaden-KI?
            </h2>
            <p className="text-lg text-body mb-10">
              Wir helfen Ihnen, ein auf Ihre Anforderungen zugeschnittenes Bewertungsraster aufzubauen und objektive Anbietervergleiche durchzuführen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Kontakt aufnehmen
              </ButtonLink>
              <ButtonLink href="/blog/auditability-evidence-chains" variant="on-dark" size="lg">
                Mehr zur Prüfbarkeit
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
