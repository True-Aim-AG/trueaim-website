import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const annexRows: [string, string][] = [
  [
    "Prüfung von Lebensversicherungsanträgen, bei der das System Alter, Gesundheitszustand, Familienanamnese, Lebensstil und Beruf anhand von Sterbetafeln verarbeitet, um Annahme und Bedingungen zu steuern",
    "Schadenmanagement in der Krankenversicherung nach Eintritt des versicherten Ereignisses: Prüfung, ob ein Anspruch nach den Policenbedingungen berechtigt ist, oder Ermittlung des zu zahlenden Betrags",
  ],
  [
    "Vorhersage der erwarteten jährlichen Behandlungskosten für eine Risikogruppe, wobei der resultierende Wert zur Prämie dieser Gruppe wird",
    "Schadenmanagement zur Verbesserung der Genauigkeit von Schadenbearbeitung und Entscheidungsfindung, etwa der Abgleich von Angaben des Anspruchstellers mit externen Datenbanken",
  ],
  [
    "",
    "Produktgestaltung in der Lebensversicherung, soweit sie nicht zur Risikobewertung oder Preisbildung im Einzelfall verwendet wird",
  ],
];

const regimeRows: [string, string, string][] = [
  [
    "EU AI Act, Hochrisiko-Kapitel (Anhang III)",
    "Risikobewertung und Preisbildung in der Lebens- und Krankenversicherung. Nicht die Schadenbearbeitung.",
    "Verschoben auf den 2. Dezember 2027 für eigenständige Systeme; 2. August 2028 für KI in regulierten Produkten",
  ],
  [
    "Art. 22 DSGVO",
    "Entscheidungen, die ausschließlich auf automatisierter Verarbeitung beruhen und rechtliche oder ähnlich erhebliche Wirkung entfalten, etwa eine abgelehnte oder gekürzte Schadenleistung",
    "25. Mai 2018",
  ],
  [
    "Das revidierte Schweizer Datenschutzgesetz",
    "Eigene Beschränkung automatisierter Einzelentscheidungen für in der Schweiz ansässige Unternehmen",
    "In Kraft",
  ],
  [
    "UK GDPR",
    "Das im Vereinigten Königreich beibehaltene Gegenstück zu diesen Regeln",
    "In Kraft",
  ],
  [
    "EIOPA-Stellungnahme EIOPA-BoS-25-360",
    "Aufsichtserwartungen an Versicherungs-KI, die weder verboten noch hochriskant ist: Governance, Erklärbarkeit, Aufzeichnungspflichten",
    "6. August 2025",
  ],
];

const governanceStats: { value: string; label: string }[] = [
  {
    value: "61 %",
    label:
      "der Führungskräfte in der Versicherungsbranche geben an, dass ihre Vorstände KI-Governance-Richtlinien festgelegt haben.",
  },
  {
    value: "68 %",
    label:
      "geben an, dass ihre KI-Kontrollen existieren, die Nachweise aber über Teams und Werkzeuge verstreut sind.",
  },
  {
    value: "24 %",
    label:
      "sind sehr zuversichtlich, innerhalb von 90 Tagen eine unabhängige Prüfung der KI-Governance zu bestehen.",
  },
  {
    value: "44 %",
    label:
      "geben an, dass Governance- oder Compliance-Probleme zum Scheitern oder zur Minderleistung von KI-Projekten beigetragen haben.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Ist KI in der Schadenbearbeitung nach dem EU AI Act hochriskant?",
    a: "Nein. Anhang III führt die Schadenbearbeitung nicht auf. Nummer 5 Buchstabe c erfasst nur Risikobewertung und Preisbildung in der Lebens- und Krankenversicherung. Die Entwurfsleitlinien der Kommission zur Einstufung vom 19. Mai 2026 nennen das Schadenmanagement als Beispiel für ein System außerhalb dieser Nummer, selbst bei Krankenversicherungsprodukten. Eine Schadenorganisation in Kfz, Sach, Garantie oder Gewerbe fällt nicht unter das Hochrisiko-Regime, unterliegt aber weiterhin dem Datenschutzrecht und dem sektoralen Versicherungsrecht.",
  },
  {
    q: "Ist KI in der Schadenbearbeitung in der Krankenversicherung hochriskant?",
    a: "Nein. Die Krankenversicherung ist der schärfste Test der Regel, denn das Underwriting in dieser Sparte ist hochriskant. Die Entwurfsleitlinien der Kommission ordnen das Schadenmanagement auch dort außerhalb von Nummer 5 Buchstabe c ein, mit der Begründung, dass die Prüfung eines Anspruchs anhand der Policenbedingungen oder die Ermittlung des zu zahlenden Betrags etwas anderes ist als Risikobewertung oder Preisbildung.",
  },
  {
    q: "Gilt die Verschiebung auf Dezember 2027 für die Schadenbearbeitung?",
    a: "Sie hat keine Auswirkung darauf. Der Digitale Omnibus hat den Zeitpunkt verschoben, ab dem die Hochrisiko-Pflichten gelten. Er hat nicht geändert, welche Systeme hochriskant sind. Die Schadenbearbeitung gehörte weder vor noch nach der Verschiebung dazu.",
  },
  {
    q: "Was hat die Verordnung (EU) 2026/1744 geändert?",
    a: "Sie hat die Hochrisiko-Pflichten des AI Act verschoben. Eigenständige Systeme nach Anhang III rücken vom 2. August 2026 auf den 2. Dezember 2027. KI in regulierten Produkten vom 2. August 2027 auf den 2. August 2028. Sie wurde am 24. Juli 2026 veröffentlicht und trat am 27. Juli 2026 in Kraft.",
  },
  {
    q: "Gilt Art. 22 DSGVO für eine automatisierte Schadenentscheidung?",
    a: "Ja, wo die DSGVO das anwendbare Regime ist. Artikel 22 beschränkt Entscheidungen, die ausschließlich auf automatisierter Verarbeitung beruhen und rechtliche oder ähnlich erhebliche Wirkung entfalten. Eine abgelehnte oder gekürzte Schadenleistung erreicht diese Schwelle. Er gilt seit dem 25. Mai 2018 und blieb von der Verschiebung des AI Act unberührt. Unternehmen außerhalb der EU unterliegen der entsprechenden Bestimmung ihres eigenen Regimes, etwa dem revidierten Schweizer Datenschutzgesetz.",
  },
  {
    q: "Was gilt als bedeutsame menschliche Beteiligung?",
    a: "Nach den Leitlinien der Artikel-29-Datenschutzgruppe (WP251rev.01) muss die Überprüfung durch jemanden erfolgen, der die Befugnis und Kompetenz hat, die Entscheidung zu ändern. Mitarbeitende, die automatisch erzeugte Ergebnisse nur abzeichnen, holen einen Verantwortlichen nicht aus Artikel 22 heraus.",
  },
  {
    q: "Was müssen Sie über die Logik einer automatisierten Entscheidung offenlegen?",
    a: (
      <>
        In <em>Dun &amp; Bradstreet Austria</em> (C-203/22) verlangte der EuGH das tatsächlich angewandte Verfahren und die Grundsätze, knapp und verständlich mitgeteilt, einschließlich der Frage, wie das Ergebnis bei anderen Daten ausgefallen wäre. Die Herausgabe des Algorithmus selbst erfüllt die Pflicht nicht. Ein Geschäftsgeheimnis erlaubt keine pauschale Verweigerung.
      </>
    ),
  },
];

// Short labels for the "Auf dieser Seite" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "is-ai-claims-handling-high-risk-under-the-eu-ai", heading: "Ist KI in der Schadenbearbeitung nach dem EU AI Act hochriskant?" },
  { id: "four-terms-that-decide-the-answer", heading: "Vier Begriffe, die die Antwort bestimmen" },
  { id: "if-you-do-have-an-annex-iii-system-profiling-clo", heading: "Wer ein Anhang-III-System hat: Profiling schließt den Ausweg" },
  { id: "which-regime-actually-binds-a-european-claims-op", heading: "Welches Regime bindet eine europäische Schadenorganisation wirklich?" },
  { id: "does-gdpr-article-22-apply-to-an-automated-claim", heading: "Gilt Art. 22 DSGVO für eine automatisierte Schadenentscheidung?" },
  { id: "where-the-sector-supervisor-sits", heading: "Wo die Sektoraufsicht steht" },
  { id: "what-does-it-cost-to-be-unable-to-explain-a-deci", heading: "Was kostet es, eine Entscheidung nicht erklären zu können?" },
  { id: "the-gap-that-will-actually-catch-carriers", heading: "Die Lücke, an der Versicherer wirklich scheitern werden" },
  { id: "why-the-2027-date-does-not-help", heading: "Warum das Datum 2027 nicht hilft" },
  { id: "the-test-worth-running-this-week", heading: "Der Test, den Sie diese Woche machen sollten" },
  { id: "key-takeaways", heading: "Das Wichtigste in Kürze" },
  { id: "frequently-asked-questions", heading: "Häufige Fragen" },
  { id: "related-reading", heading: "Weiterführende Artikel" },
];

export default async function EUAIActClaimsBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

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
              KI in der Schadenbearbeitung ist nach dem EU AI Act nicht hochriskant. Das bindet sie stattdessen.
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Die Schadenbearbeitung fehlt in Anhang III. Art. 22 DSGVO bindet sie trotzdem. Nur 24 % der Versicherer geben an, in 90 Tagen eine Governance-Prüfung bestehen zu können.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 Min. Lesezeit
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Regulatorische Analyse
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
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    Die kurze Antwort
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Die Schadenbearbeitung steht nicht in Anhang III.
                        </strong>{" "}
                        Die eigenen Entwurfsleitlinien der Kommission zur Einstufung nennen das Schadenmanagement als Beispiel für ein System außerhalb von Nummer 5 Buchstabe c, und sie verwenden die Krankenversicherung, die eine Sparte, in der das Underwriting{" "}
                        <em>tatsächlich</em> hochriskant ist, um das zu verdeutlichen.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Die Verschiebung durch den Digitalen Omnibus ändert für eine Schadenorganisation nichts.
                        </strong>{" "}
                        Das Kapitel, das auf Dezember 2027 verschoben wurde, war nie das Kapitel, das für Sie galt.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Art. 22 DSGVO ist das, was bindet
                        </strong>
                        . Er gilt seit dem 25. Mai 2018. Eine abgelehnte oder gekürzte Schadenleistung fällt eindeutig darunter. Schweizer und britische Unternehmen unterliegen ihren eigenen Gegenstücken.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Die EIOPA hat den Aufsichtsbehörden bereits gesagt, was sie erwartet
                        </strong>
                        : erklärbare Ergebnisse und reproduzierbare Aufzeichnungen nach bestehendem Sektorrecht, skaliert nach der Wirkung des Systems.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Der Test ist die Rekonstruktion.
                        </strong>{" "}
                        Wenn Sie eine abgeschlossene Entscheidung nicht auf Abruf nachbauen können, war die Frist, die Sie verpasst haben, 2018, nicht 2027.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Am 24. Juli 2026 wurde der Digitale Omnibus zu KI als Verordnung (EU) 2026/1744 im Amtsblatt veröffentlicht. Er trat drei Tage später in Kraft. Die Hochrisiko-Pflichten des EU AI Act (KI-Verordnung) für eigenständige Anhang-III-Systeme rücken vom 2. August 2026 auf den 2. Dezember 2027. Für KI in regulierten Produkten vom 2. August 2027 auf den 2. August 2028.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Sechzehn zusätzliche Monate also.
                </p>

                <p className="text-body leading-[1.6]">
                  Eine Schadenorganisation hat sie nicht bekommen. Nicht weil die Verschiebung eng gefasst wäre, sondern weil die Schadenbearbeitung nie in dem Kapitel stand, das verschoben wurde.
                </p>
              </MotionDiv>

              {/* Is AI claims handling high-risk */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="is-ai-claims-handling-high-risk-under-the-eu-ai"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ist KI in der Schadenbearbeitung nach dem EU AI Act hochriskant?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nein. Anhang III führt sie nicht auf.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Nummer 5 des Anhangs III betrifft den Zugang zu wesentlichen privaten und öffentlichen Diensten. Sie nennt vier Dinge: die Bewertung des Anspruchs auf wesentliche öffentliche Unterstützungsleistungen, soweit durch oder im Auftrag von Behörden; die Bewertung der Kreditwürdigkeit oder die Ermittlung einer Bonitätsbewertung, ausgenommen Systeme zur Aufdeckung von Finanzbetrug;{" "}
                  <strong className="text-strong">
                    die Risikobewertung und Preisbildung in Bezug auf natürliche Personen im Fall von Lebens- und Krankenversicherungen
                  </strong>
                  ; und die Bewertung, Einstufung und Weiterleitung von Notrufen.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Risikobewertung und Preisbildung in der Lebens- und Krankenversicherung sind erfasst. Die Schadenbearbeitung in Kfz, Sach, Garantie und Gewerbe ist es nicht.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Das sagt die Kommission inzwischen selbst. Ihre Entwurfsleitlinien zur Einstufung von Hochrisiko-KI-Systemen, veröffentlicht am 19. Mai 2026 und bis zum 23. Juni zur Konsultation offen, enthalten ausgearbeitete Beispiele auf beiden Seiten der Linie.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Anhang III Nummer 5 Buchstabe c: die Beispiele der Kommission
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Innerhalb von Nummer 5 Buchstabe c: hochriskant
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Außerhalb von Nummer 5 Buchstabe c
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {annexRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4">{row[0]}</td>
                            <td className="py-3">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Die Begründung der Kommission für den Ausschluss ist im Wortlaut lesenswert:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Diese Anwendungsfälle unterscheiden sich von der Durchführung einer Risikobewertung oder Preisbildung, auch wenn ihr Ergebnis die Inanspruchnahme der Krankenversicherungsleistungen beeinflussen kann.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Beachten Sie, welche Sparte dieses Beispiel verwendet. Die Krankenversicherung ist der eine Bereich, in dem das Underwriting <em>tatsächlich</em>{" "}
                  hochriskant ist. Das Schadenmanagement fällt selbst dort aus dem Anwendungsfall heraus. Die Leitlinien sind ein Entwurf und nicht bindend. Die Kommission stellt klar, dass die verbindliche Auslegung des AI Act beim Gerichtshof liegt. Aber sie sind die klarste verfügbare offizielle Aussage, und sie weisen in dieselbe Richtung.
                </p>

                <p className="text-body leading-[1.6]">
                  Das ist die Antwort auf die Frage. Es ist auch der Punkt, an dem die meisten Analysen aufhören und an dem die beiden Dinge beginnen, die Ihr Risiko tatsächlich bestimmen. Es sind verschiedene Fragen für verschiedene Systeme. Sie zu vermischen, ist der Grund, warum Compliance-Pläne scheitern.
                </p>
              </MotionDiv>

              {/* Four terms */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-terms-that-decide-the-answer"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Vier Begriffe, die die Antwort bestimmen
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 space-y-5">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Anhang III.</strong>{" "}
                    Die Liste der Hochrisiko-Anwendungsfälle in der Verordnung (EU) 2024/1689. Ein System ist auf diesem Weg nur hochriskant, wenn es einem Anwendungsfall auf der Liste entspricht. Nähe zu einem gelisteten Anwendungsfall ist keine Zugehörigkeit.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Profiling.</strong>{" "}
                    Die automatisierte Bewertung persönlicher Aspekte einer natürlichen Person: wirtschaftliche Lage, Gesundheit, Zuverlässigkeit, Verhalten. Der EU AI Act entlehnt den Begriff aus der DSGVO. In Artikel 6 Absatz 3 hat er entscheidendes Gewicht.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">
                      Eine ausschließlich automatisierte Entscheidung.
                    </strong>{" "}
                    Nach Art. 22 DSGVO eine Entscheidung ohne bedeutsame menschliche Beteiligung, die rechtliche oder ähnlich erhebliche Wirkung entfaltet. Ein Mensch, der das Ergebnis in der Praxis nicht umstoßen kann, trifft die Entscheidung nicht mit.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Prüfungsbereitschaft.</strong>{" "}
                    Die Eigenschaft, eine vergangene Entscheidung aus den Aufzeichnungen rekonstruieren zu können, die das System damals erzeugt hat. Sie unterscheidet sich von der Prüfungsvorbereitung, einer Übung, die man vor einer Prüfung durchführt.
                  </p>
                </div>
              </MotionDiv>

              {/* Profiling closes the exit */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="if-you-do-have-an-annex-iii-system-profiling-clo"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wer ein Anhang-III-System hat: Profiling schließt den Ausweg
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Das gilt für Risikobewertung und Preisbildung in der Lebens- und Krankenversicherung, nicht für die Schadenbearbeitung. Wenn Sie solche Systeme betreiben, lesen Sie weiter. Wenn nicht, springen Sie zum nächsten Abschnitt, denn Artikel 6 Absatz 3 hat Ihnen nichts zu sagen.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Versicherer innerhalb von Anhang III planen in der Regel den Ausweg über Artikel 6 Absatz 3, der die Hochrisiko-Einstufung aufhebt, wenn ein System „kein erhebliches Risiko der Beeinträchtigung in Bezug auf die Gesundheit, Sicherheit oder Grundrechte natürlicher Personen birgt, indem es unter anderem nicht das Ergebnis der Entscheidungsfindung wesentlich beeinflusst“, und eine von vier Bedingungen erfüllt: eine eng gefasste Verfahrensaufgabe, die Verbesserung einer zuvor abgeschlossenen menschlichen Tätigkeit, die Erkennung von Mustern ohne Ersatz der menschlichen Bewertung oder eine vorbereitende Aufgabe.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ein Satz hebt alle vier auf:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Ungeachtet des Unterabsatzes 1 gilt ein in Anhang III aufgeführtes KI-System immer dann als hochriskant, wenn es ein Profiling natürlicher Personen vornimmt.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Ein Preismodell in der Lebens- oder Krankenversicherung, das Einzelpersonen nach wirtschaftlicher Lage, Gesundheit, Zuverlässigkeit oder Verhalten segmentiert, ist Profiling. Die Ausnahme reicht nicht bis dorthin.
                </p>

                <p className="text-body leading-[1.6]">
                  Artikel 6 Absatz 4 schließt dann den Kreis. Ein Anbieter, der ein Anhang-III-System als nicht hochriskant einstuft, muss diese Bewertung dokumentieren, bevor das System in Verkehr gebracht oder in Betrieb genommen wird, es dennoch nach Artikel 49 Absatz 2 registrieren und die Dokumentation den nationalen zuständigen Behörden auf Verlangen vorlegen. Nicht hochriskant ist eine Meldung, kein Verzicht auf Papierkram.
                </p>
              </MotionDiv>

              {/* Which regime binds */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="which-regime-actually-binds-a-european-claims-op"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Welches Regime bindet eine europäische Schadenorganisation wirklich?
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Was auf eine Schadenorganisation zukommt und ab wann
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Instrument
                          </th>
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Was es erfasst
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Gilt ab
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {regimeRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4 font-display font-medium text-strong">
                              {row[0]}
                            </td>
                            <td className="py-3 pr-4">{row[1]}</td>
                            <td className="py-3">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  Genau an diesem Muster scheitern viele. Das Instrument, auf das sich alle vorbereiten, ist das, das sie nicht erreicht. Das Instrument, das sie erreicht, ist seit acht Jahren in Kraft.
                </p>
              </MotionDiv>

              {/* Article 22 */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="does-gdpr-article-22-apply-to-an-automated-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Gilt Art. 22 DSGVO für eine automatisierte Schadenentscheidung?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Ja. Anders als der AI Act gilt er seit dem 25. Mai 2018.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Eine Einschränkung vor den Einzelheiten. Die DSGVO ist nicht das einzige Datenschutzregime, dem eine europäische Schadenorganisation unterliegen kann. Welches Instrument Sie bindet, hängt davon ab, wo Sie ansässig sind und wessen Daten Sie verarbeiten. Was folgt, ist die Analyse der DSGVO. Lesen Sie sie als Muster, nicht als vollständige Karte, und prüfen Sie das Instrument, das für Ihren eigenen Bestand gilt.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Artikel 22 beschränkt Entscheidungen, die ausschließlich auf automatisierter Verarbeitung beruhen und rechtliche oder ähnlich erhebliche Wirkung entfalten. Eine abgelehnte oder gekürzte Schadenleistung erreicht diese Schwelle.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Drei Quellen definieren, was das heute verlangt. Keine davon hat sich im Juli bewegt.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Automatisierte Scores können selbst Entscheidungen sein.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>OQ gegen Land Hessen</em>, dem SCHUFA-Fall (C-634/21, 7. Dezember 2023), entschied der EuGH, dass die automatisierte Erstellung eines Wahrscheinlichkeitswerts über die Fähigkeit einer Person, Zahlungsverpflichtungen zu erfüllen, selbst eine automatisierte Einzelentscheidung nach Artikel 22 Absatz 1 ist, wenn ein Dritter, der diesen Wert erhält, sich bei Begründung, Durchführung oder Beendigung eines Vertrags maßgeblich darauf stützt. Die Pflicht trifft die Partei, die den Score erstellt, nicht nur die, die danach handelt.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Eine Freigabe ist keine Aufsicht.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Nach den Leitlinien der Artikel-29-Datenschutzgruppe zu automatisierten Entscheidungen (WP251rev.01), bestätigt vom EDSA, entgeht menschliche Beteiligung Artikel 22 nur, wenn sie bedeutsam ist und durch jemanden erfolgt, der die Befugnis und Kompetenz hat, die Entscheidung zu ändern. Die Leitlinien sagen unmittelbar, dass Mitarbeitende, die automatisch erzeugte Profile nur abzeichnen, einen Verantwortlichen nicht aus Artikel 22 herausholen.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Eine Erklärung hat einen definierten Standard.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>Dun &amp; Bradstreet Austria</em> (C-203/22, 27. Februar 2025) legte der EuGH dar, was „aussagekräftige Informationen über die involvierte Logik“ nach Artikel 15 Absatz 1 Buchstabe h verlangen: das tatsächlich angewandte Verfahren und die Grundsätze, die zur Entscheidung geführt haben, knapp und verständlich mitgeteilt. Der Gerichtshof verlangte keine kausale Darstellung, wie die Daten einer einzelnen Person zu ihrem Ergebnis geführt haben. Er deutete stattdessen an, dass die Erklärung, wie das Ergebnis bei anderen Daten ausgefallen wäre, die Pflicht erfüllen kann. Er stellte zudem fest, dass die Übergabe des Algorithmus sie nicht erfüllt, weil eine komplexe mathematische Formel weder knapp noch verständlich ist. Und er stellte fest, dass ein Geschäftsgeheimnis keine pauschale Verweigerung erlaubt: Der Verantwortliche muss die strittigen Informationen der Aufsichtsbehörde oder einem Gericht zur Abwägung vorlegen.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  Das ist ein vergleichender Standard, kein erzählender. Ihn zu erfüllen, verlangt zu wissen, was das System mit welchen Eingaben tatsächlich getan hat.
                </p>
              </MotionDiv>

              {/* EIOPA */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-the-sector-supervisor-sits"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wo die Sektoraufsicht steht
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die{" "}
                  <em>Stellungnahme der EIOPA zu KI-Governance und Risikomanagement</em>{" "}
                  (EIOPA-BoS-25-360, 6. August 2025) richtet sich an die nationalen Aufsichtsbehörden und befasst sich speziell mit KI-Systemen in der Versicherung, die nach dem AI Act weder verboten noch hochriskant sind. Sie baut auf der Versicherungsvertriebsrichtlinie, Solvency II, der Verordnung über die digitale operationale Resilienz (DORA) und den delegierten Verordnungen zu Solvency II und IDD auf, nicht auf dem AI Act.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ihre eigene Einordnung ist der entscheidende Punkt. Diese Systeme, so heißt es, „werden weiterhin unter dem bestehenden Sektorrecht ohne neue Anforderungen betrieben“, mit Ausnahme bestimmter Transparenzpflichten, der Förderung von KI-Kompetenz beim Personal und freiwilliger Verhaltenskodizes. Die EIOPA fügt kein Regime hinzu. Sie sagt den Aufsichtsbehörden, dass das bereits geltende Regime anwendbar ist.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Innerhalb dessen sollen Unternehmen sicherstellen, dass die Ergebnisse von KI-Systemen sinnvoll erklärt werden können, und angemessene Aufzeichnungen über Trainings- und Testdaten sowie über Modellierungsmethoden führen, um Reproduzierbarkeit und Nachvollziehbarkeit zu ermöglichen. Die Erwartungen skalieren mit der Wirkung: begrenzt für Systeme, die Kunden kaum berühren, strenger für solche, die es tun.
                </p>

                <p className="text-body leading-[1.6]">
                  Die Schadenbearbeitung verlässt damit das schwerste Kapitel des AI Act und gelangt auf einem anderen Weg zu einem verhältnismäßigen, aber realen Satz von Erwartungen. Die Pflicht verschwindet nicht. Sie wechselt die Adresse.
                </p>
              </MotionDiv>

              {/* Cost of not explaining */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-does-it-cost-to-be-unable-to-explain-a-deci"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was kostet es, eine Entscheidung nicht erklären zu können?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die Hamburger Datenschutzbehörde verhängte gegen einen Finanzdienstleister ein Bußgeld von 492.000 EUR, bekannt gegeben am 30. September 2025. Das Unternehmen lehnte Kreditkartenanträge automatisch ab, auch von Antragstellern mit nachweislich guter Bonität, ohne menschliche Aufsicht. Die Feststellung der Behörde war nicht, dass das Modell falsch lag. Sie war, dass das Unternehmen die Logik hinter seinen algorithmischen Entscheidungen nicht angemessen erklärte und auf Nachfrage keinen ausreichenden Zugang zur zugrunde liegenden Begründung gewährte.
                </p>

                <p className="text-body leading-[1.6]">
                  Die Behörde wertete die Kooperation des Unternehmens ausdrücklich als wesentlichen mildernden Faktor. Das war der ermäßigte Preis.
                </p>
              </MotionDiv>

              {/* The gap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-gap-that-will-actually-catch-carriers"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Lücke, an der Versicherer wirklich scheitern werden
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die AI Impact Survey 2026 von Grant Thornton, erhoben vom 23. Februar bis 18. März 2026 unter 950 Führungskräften, davon 100 aus der Versicherungsbranche, ergab:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {governanceStats.map((stat) => (
                    <div
                      key={stat.value}
                      className="bg-card shadow-card rounded-pill px-[29px] py-[27px]"
                    >
                      <div className="text-kpi text-accent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-body leading-[1.6]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Grant Thorntons eigene Lesart: „Die meisten Versicherer haben bereits KI-Governance-Richtlinien, aber sie haben nicht die operative Infrastruktur aufgebaut, um sie zu belegen und zu testen.“
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Der Abstand zwischen 61 und 24 ist das ganze Problem. Dieselbe Fragmentierung ist es, die Piloten vor der Produktion stranden lässt, aus demselben Grund: Sie ist strukturell, kein Modellierungsfehler, und sie wird spät entdeckt. Dieses Muster haben wir behandelt in{" "}
                  <Link
                    href="/blog/why-claims-ai-pilots-stall"
                    className="text-link hover:underline"
                  >
                    warum KI-Piloten in der Schadenbearbeitung vor der Produktionsreife stecken bleiben
                  </Link>
                  .
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Eine Richtlinie ist eine Behauptung darüber, wie Sie sich verhalten. Ein Nachweis ist der Beleg, dass Sie es getan haben. Aufsichtsbehörden prüfen das Zweite.
                  </p>
                </div>
              </MotionDiv>

              {/* Why 2027 does not help */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="why-the-2027-date-does-not-help"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Warum das Datum 2027 nicht hilft
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Herkunftsnachweise auf Feldebene, manipulationserkennbare Entscheidungsprotokolle und versionierte, reproduzierbare Entscheidungsakten sind architektonische Eigenschaften. Sie werden festgelegt, wenn die Pipeline entworfen wird, und lassen sich nachträglich nicht hinzufügen, denn ein Protokoll, das ohne Herkunftsnachweis geschrieben wurde, lässt sich später nicht damit anreichern. Die Entscheidung, die es festhielt, ist verloren.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Deshalb sind Prüfungsbereitschaft und Prüfungsvorbereitung zwei verschiedene Dinge. Vorbereitung ist eine Übung vor einer Prüfung. Bereitschaft ist eine Eigenschaft, die das System im laufenden Betrieb hat oder überhaupt nicht. Nur eine der beiden beantwortet eine Frage zu einem im letzten Jahr abgeschlossenen Schadenfall.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Eine Erklärung ist eine Meinung über eine Entscheidung. Ein Herkunftsnachweis ist ein Beleg dafür. <em>Dun &amp; Bradstreet</em> fragt, was das System aus anderen Eingaben erzeugt hätte. Nur das Zweite kann antworten. Die Architektur, mit der wir es erzeugen, ist dargelegt in{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link hover:underline"
                  >
                    Prüfbarkeit von Schaden-KI: Nachweisketten, die Prüfer tatsächlich akzeptieren
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6]">
                  Eine Designkonsequenz ist es wert, klar ausgesprochen zu werden. Je mehr einer Entscheidung auf deterministischen Regeln statt auf einem Modell läuft, desto weniger davon muss nach einem vergleichenden Standard erklärt werden, denn die Regel <em>ist</em> die Erklärung. In einem europäischen Fahrzeuggarantie-Programm wenden wir die Deckungsregeln des Kunden auf jede Rechnungsposition an und beschränken das Modell auf das Lesen der Dokumente. Das ist eine architektonische Entscheidung mit einer Compliance-Dividende, keine nachträglich angeschraubte Compliance-Maßnahme.
                </p>
              </MotionDiv>

              {/* The test */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-test-worth-running-this-week"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Der Test, den Sie diese Woche machen sollten
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nehmen Sie einen abgeschlossenen Schadenfall aus dem letzten Jahr. Bitten Sie Ihr Team, die Entscheidung zu rekonstruieren: jedes Feld und woher es stammt, welche Modellversion lief, was ein Mensch geändert hat und auf welcher Grundlage. Die zwölf Fragen an diese Akte stehen in{" "}
                  <Link
                    href="/blog/ai-claims-auditability-scorecard"
                    className="text-link hover:underline"
                  >
                    der Prüfbarkeits-Scorecard für KI in der Schadenbearbeitung
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Wenn das ein Klick ist, können Sie einer Aufsichtsbehörde unter jedem der genannten Regime antworten. Das Datum 2027 ist eine Formalität.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Wenn es ein Quartal dauert, haben Sie die echte Frist gefunden. Sie war nicht der 2. Dezember 2027. Sie war der 25. Mai 2018. Die Verschiebung hat sie nicht bewegt.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Eine Entscheidung auf Abruf zu rekonstruieren, ist genau das, wofür{" "}
                    <Link
                      href="/platform/claims-decisioning"
                      className="underline hover:no-underline"
                    >
                      Automated Coverage Check
                    </Link>{" "}
                    gebaut ist: agentisches Dokumentverständnis auf der Eingabeseite, deterministische Logik auf der Entscheidungsseite und eine Akte über beides.
                  </p>
                </div>
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
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Die Schadenbearbeitung steht nicht in Anhang III.
                        </strong>{" "}
                        Nur Risikobewertung und Preisbildung in der Lebens- und Krankenversicherung erscheinen dort, unter Nummer 5 Buchstabe c. Die Entwurfsleitlinien der Kommission zur Einstufung vom 19. Mai 2026 nennen das Schadenmanagement als Beispiel für ein System außerhalb dieser Nummer, selbst in der Krankenversicherung.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Die Verschiebung durch den Digitalen Omnibus hilft einer Schadenorganisation nicht
                        </strong>
                        , weil das verschobene Kapitel nie das war, das für sie galt.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Art. 22 DSGVO ist die bindende Vorgabe in der EU
                        </strong>
                        . Er gilt seit dem 25. Mai 2018. Eine abgelehnte oder gekürzte Schadenleistung fällt eindeutig darunter. Schweizer und britische Unternehmen unterliegen ihren eigenen Gegenstücken.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Die Profiling-Klausel in Artikel 6 Absatz 3 ist nur für Lebens- und Krankenversicherungssysteme eine Falle.
                        </strong>{" "}
                        Sie kann ein System, das nie in Anhang III stand, weder retten noch verurteilen.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Richtlinien sind keine Nachweise.
                        </strong>{" "}
                        61 % der Versicherer haben KI-Governance-Richtlinien auf Vorstandsebene; 24 % glauben, in 90 Tagen eine Governance-Prüfung bestehen zu können.
                      </span>
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="frequently-asked-questions"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Häufige Fragen
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionDiv>

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="related-reading"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Weiterführende Artikel
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Warum KI-Piloten in der Schadenbearbeitung vor der Produktionsreife stecken bleiben
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Die strukturellen Gründe, warum Piloten die Produktion nicht erreichen.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Prüfbarkeit von Schaden-KI: Nachweisketten, die Prüfer tatsächlich akzeptieren
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Die Architektur hinter dem Rekonstruktionstest oben.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/case-studies/vehicle-warranty-claims"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Dieselben Schadenentscheidungen, in einem Bruchteil der Zeit.
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Das oben erwähnte Fahrzeuggarantie-Programm.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline">
                  Quellen
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Verordnung (EU) 2026/1744 (Digitaler Omnibus zu KI), Amtsblatt, 24. Juli 2026; in Kraft seit 27. Juli 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Verordnung (EU) 2024/1689 (KI-Verordnung), Anhang III Nummer 5; Artikel 6 Absätze 3 und 4; Artikel 49 Absatz 2.{" "}
                    <a
                      href="https://artificialintelligenceact.eu/annex/3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      artificialintelligenceact.eu
                    </a>
                  </li>
                  <li>
                    Europäische Kommission,{" "}
                    <em>
                      Entwurf der Leitlinien zur Einstufung von Hochrisiko-KI-Systemen
                    </em>{" "}
                    (Band zu Anhang III), 19. Mai 2026; Konsultation beendet am 23. Juni 2026; nicht bindend.{" "}
                    <a
                      href="https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      digital-strategy.ec.europa.eu
                    </a>
                  </li>
                  <li>
                    EuGH, <em>OQ gegen Land Hessen</em> (SCHUFA), C-634/21, 7. Dezember 2023.
                  </li>
                  <li>
                    EuGH,{" "}
                    <em>
                      CK gegen Magistrat der Stadt Wien / Dun &amp; Bradstreet Austria GmbH
                    </em>
                    , C-203/22, 27. Februar 2025.
                  </li>
                  <li>
                    Artikel-29-Datenschutzgruppe,{" "}
                    <em>
                      Leitlinien zu automatisierten Entscheidungen im Einzelfall einschließlich Profiling
                    </em>
                    , WP251rev.01, vom EDSA bestätigt.
                  </li>
                  <li>
                    EIOPA,{" "}
                    <em>
                      Stellungnahme zu Governance und Risikomanagement künstlicher Intelligenz
                    </em>
                    , EIOPA-BoS-25-360, 6. August 2025.{" "}
                    <a
                      href="https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eiopa.europa.eu
                    </a>
                  </li>
                  <li>
                    Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit, Bußgeld von 492.000 EUR, bekannt gegeben am 30. September 2025.
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, Ergebnisse für die Versicherungsbranche; Erhebung vom 23. Februar bis 18. März 2026, 950 Führungskräfte, davon 100 aus der Versicherungsbranche.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Regulatorischer Stand: 31. Juli 2026. Dies ist keine Rechtsberatung. Lassen Sie Einstufung und Zeitplanung für Ihre eigenen Systeme von qualifizierten Rechtsberatern bestätigen.
                </p>
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
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Können Sie die Entscheidung vom letzten Jahr rekonstruieren?
            </h2>
            <p className="text-lg text-body mb-10">
              Wir bauen Schadensysteme, in denen jede Entscheidung aus der Akte nachgebaut werden kann, die sie damals erzeugt hat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Kontakt aufnehmen
              </ButtonLink>
              <ButtonLink href="/platform/claims-decisioning" variant="on-dark" size="lg">
                Automated Coverage Check
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
