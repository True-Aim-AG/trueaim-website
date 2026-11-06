import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  ScrollText,
  User,
} from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { FaqBlock, TextureBackdrop } from "@/components/content";
import { operations } from "./operations.de";
import { faqs } from "./faqs.de";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Auf dieser Seite" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "three-operations", heading: "Die drei Kernoperationen" },
  { id: "computing-belongs-to-rules", heading: "Warum Rechnen den Regeln gehört" },
  { id: "where-a-model-earns-its-place", heading: "Wo ein Modell seinen Platz verdient" },
  { id: "when-you-cannot-separate", heading: "Wenn sich beides nicht trennen lässt" },
  { id: "one-claim", heading: "Die Grenze an einem Schadenfall" },
  { id: "handover-points", heading: "Wo Regeln enden" },
  { id: "how-true-aim-draws-the-line", heading: "Wie True Aim die Grenze zieht" },
  { id: "claim-record", heading: "Was eine Schadenakte zeigen sollte" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const modelJobs: NumberedItem[] = [
  {
    title: "Extraktion aus Dokumenten und Belegen (Lesen)",
    body: "Regeln können kein Foto und keine handschriftliche Notiz lesen. Agenten auf Basis von Sprachmodellen können es. Unstrukturierte Belege in strukturierte Fakten zu verwandeln, ist die Arbeit, die ihnen am besten liegt. Die Disziplin besteht darin, jeden Agenten eng zu halten. Ein Agent, der nur extrahiert, ist weit leichter zu prüfen als einer, der in einem Durchgang liest, extrahiert, sortiert und erklärt.",
  },
  {
    title: "Gekennzeichnete Auflösung von Mehrdeutigkeit (Urteilen)",
    body: "Wenn eine Position wirklich mehrdeutig ist und keine Regel sie auflöst, kann ein Modell die Zuordnung übernehmen. Akzeptabel wird das durch die Kennzeichnung. Die Akte markiert diese Zeile als probabilistisch statt deterministisch, sodass ein Prüfer genau sieht, welche Teile der Entscheidung Urteilsvermögen erforderten und wo er zuerst hinschauen sollte.",
  },
];

const claimSteps: NumberedItem[] = [
  {
    title: "Lesen",
    body: "Ein Agent extrahiert aus den Reparaturunterlagen die Fakten, die die Regeln brauchen: was repariert wurde und was den Schaden verursacht hat. Jeder Wert verweist zurück auf sein Quelldokument.",
  },
  {
    title: "Rechnen",
    body: "Die Engine wendet Versicherungsbedingungen und Geschäftsregeln auf diese Fakten an. Die Position kommt als gedeckt nach Klausel 2.2A zurück. Die Erklärung wurzelt im Wortlaut und wird nicht nachträglich verfasst. Selbstbeteiligung, Limit oder Obergrenze werden anschließend berechnet, die Rechnung Zeile für Zeile ausgewiesen.",
  },
  {
    title: "Urteilen",
    body: "Wo eine Rechnungsposition keiner Regel sauber entspricht, übernimmt ein Modell die Zuordnung, und allein diese Zeile trägt eine probabilistische Kennzeichnung. Die Zeilen um sie herum bleiben deterministisch.",
  },
  {
    title: "Menschliche Prüfung",
    body: "Der gesamte Prüfpfad kann jederzeit exportiert werden. Ein Sachbearbeiter prüft den Schadenfall. Jede Änderung, die er vornimmt, verlangt eine Begründung, die direkt in der Akte protokolliert wird.",
  },
];

const summaryPoints: BulletItem[] = [
  {
    lead: "Lesen gehört den KI-Modellen:",
    text: "Unstrukturierte PDFs, Fotos, E-Mails und handschriftliche Notizen in strukturierte Fakten verwandeln.",
  },
  {
    lead: "Rechnen gehört ausschließlich den Regeln:",
    text: "Limits, Selbstbeteiligungen, Abzüge und Mitversicherungsquoten zu berechnen, hat genau eine richtige Antwort. Ein Modell kann nur eine wahrscheinliche liefern.",
  },
  {
    lead: "Urteilen darf ein Modell nutzen, sofern es als solches gekennzeichnet ist:",
    text: "Wo der Wortlaut eine Position offenlässt, muss die Akte zeigen, dass diese Zeile von einem Modell und nicht von einer Regel aufgelöst wurde.",
  },
];

const stepKinds: BulletItem[] = [
  {
    lead: "Ein deterministischer Schritt",
    text: "ist einer, bei dem dieselben Eingaben immer dieselbe Ausgabe erzeugen. Eine als Entscheidungsbaum geschriebene Regel verhält sich so: Aus den Fakten wird das Ergebnis berechnet, nicht vorhergesagt.",
  },
  {
    lead: "Ein probabilistischer Schritt",
    text: "liefert die wahrscheinlichste Antwort auf Basis dessen, was er gesehen hat. Weil ein Sprachmodell von seiner Konstruktion her probabilistisch ist, können dieselben Eingaben in einem anderen Durchlauf oder einer anderen Modellversion eine andere Antwort ergeben.",
  },
];

const handovers: BulletItem[] = [
  {
    lead: "Übergabe 1: Fehlende Belege.",
    text: "Fehlt ein Dokument oder lässt sich ein Wert nicht extrahieren, ist die richtige Reaktion, danach zu fragen. Der Schadenfall wartet auf den Fakt, statt mit einer Näherung fortzufahren.",
  },
  {
    lead: "Übergabe 2: Echte Mehrdeutigkeit.",
    text: "Wo eine Rechnungsposition keinem Katalogeintrag sauber entspricht, ordnet ein Modell die Position zu, und die Akte kennzeichnet sie als probabilistisch. Das Urteil steht neben der Arithmetik, klar beschriftet.",
  },
  {
    lead: "Übergabe 3: Vom Versicherer definierte Schwellenwerte.",
    text: "Schwellenwerte für Schadenhöhe, Abweichung vom erwarteten Ergebnis oder Konfidenzniveau legt der Versicherer fest. Ein Schadenfall, der einen Schwellenwert überschreitet, geht an einen Sachbearbeiter, der die Fakten, die angewandte Klausel und jede getroffene Annahme sieht. Hält eine Annahme nicht stand, übersteuert der Sachbearbeiter sie, und das Ergebnis wird neu berechnet.",
  },
];

const engineParts: BulletItem[] = [
  {
    lead: "Deterministische Entscheidungsbäume:",
    text: "Versicherungsbedingungen, Kataloge und Regelwerke werden in Entscheidungsbäume überführt. Aus den Fakten wird das Ergebnis berechnet, nicht vorhergesagt. Gleiche Eingaben, gleiche Entscheidung, jedes Mal.",
  },
  {
    lead: "Aufgabenspezifische Agenten:",
    text: "Agenten lesen Fotos, PDFs, Handschrift, E-Mails und Freitext, um strukturierte Fakten zu extrahieren. Jeder Agent erledigt eine eng umrissene Aufgabe.",
  },
  {
    lead: "Gekennzeichnete Modellzuordnung:",
    text: "Wo eine Position wirklich mehrdeutig ist, ordnet ein Modell sie zu und kennzeichnet diese Zeile in der Akte als probabilistisch.",
  },
  {
    lead: "Human-in-the-Loop-Kontrolle:",
    text: "Deckungsergebnisse lassen sich bis zur zugrunde liegenden Klausel zurückverfolgen. Die menschliche Prüfung wird durch Schwellenwerte ausgelöst, die der Versicherer festlegt. Jede Änderung durch eine Person trägt eine Begründung.",
  },
];

const recordPoints: BulletItem[] = [
  { text: "Jeder Fakt trägt die Dokumentseite, aus der er stammt." },
  { text: "Jede Zahl trägt die Klausel oder Regel, die sie erzeugt hat." },
  {
    text: "Jedes Urteil ist als Urteil gekennzeichnet, sodass der Prüfer weiß, wo er zuerst prüfen muss.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "Trennung der Werkzeuge:",
    text: "Lesen, Rechnen und Urteilen sind verschiedene Arten von Schritten und brauchen verschiedene Werkzeuge.",
  },
  {
    lead: "Regeln fürs Rechnen:",
    text: "Rechnen gehört den Regeln. Eine wahrscheinliche Antwort auf Arithmetik ist ein neuer Fehlermodus ohne Vorteil.",
  },
  {
    lead: "Gekennzeichneter Modelleinsatz:",
    text: "Ein Modell verdient seinen Platz beim Lesen und, als probabilistisch gekennzeichnet, beim Urteilen.",
  },
  {
    lead: "Definierte Übergabegrenzen:",
    text: "Regeln enden bei fehlenden Belegen, echter Mehrdeutigkeit und Schwellenwerten des Versicherers. Jede davon ist eine Übergabe, die die Akte zeigt, keine Lücke, die sie verbirgt.",
  },
];

/** A numbered list of house cards, one step or item per card. */
function NumberedCards({ items }: { items: NumberedItem[] }) {
  return (
    <ol role="list" className="space-y-4 list-none p-0">
      {items.map((item, index) => (
        <li key={item.title} className="bg-card shadow-card rounded-pill p-8">
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {index + 1}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="text-sm text-body leading-[1.6]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: BulletItem[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 text-body leading-[1.6] ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
          <span>
            {item.lead && (
              <>
                <strong className="text-strong">{item.lead}</strong>{" "}
              </>
            )}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function LanguageModelBoundaryBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
              <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              Alle Artikel
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Wo das Sprachmodell nicht hingehört
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Verteidigungsfähige KI für die Schadenbearbeitung gestalten
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO und Mitgründer von True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                7 Min. Lesezeit
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
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Zusammenfassung
                  </h2>
                  <p className="text-body leading-[1.6] mb-4">
                    Eine Schadenentscheidung ist kein einzelner Schritt. Sie ist eine durchgehende Kette kleinerer Handlungen, die sich in drei verschiedene Arten einteilen lassen: <strong className="text-strong">Lesen</strong>,{" "}
                    <strong className="text-strong">Rechnen</strong> und{" "}
                    <strong className="text-strong">Urteilen</strong>.
                  </p>
                  <BulletList items={summaryPoints} />
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Die entscheidende Designfrage lautet nicht „Regeln oder Modelle“. Sie lautet, die Grenze zwischen beiden auf jedem Schritt der Akte sichtbar zu halten.
                  </p>
                </div>
              </MotionDiv>

              {/* The three core operations */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="three-operations"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die drei Kernoperationen einer Schadenentscheidung
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  KI in der Schadenbearbeitung wird meist als Wahl zwischen Regeln und Modellen dargestellt. Doch eine Schadenentscheidung ist kein einzelner Akt. Sie ist eine Kette von Schritten, und jeder braucht das richtige Werkzeug:
                </p>

                <NumberedCards
                  items={operations.map((operation) => ({
                    title: operation.name,
                    body: operation.description,
                  }))}
                />

                <p className="text-body leading-[1.6] mt-8">
                  Die meisten Schadenfälle enthalten alle drei. Entscheidend ist, ob im Nachhinein jemand sehen kann, welcher Art jeder Schritt war.
                </p>
              </MotionDiv>

              {/* Why computing belongs to rules */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="computing-belongs-to-rules"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Warum Rechnen ausnahmslos den Regeln gehört
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Arithmetik auf ein schriftlich fixiertes Limit hat eine richtige Antwort. Eine Mitversicherungsquote auf einen bekannten Betrag zu einem bekannten Prozentsatz hat kein wahrscheinliches Ergebnis. Sie hat ein Ergebnis.
                </p>

                <BulletList items={stepKinds} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Das ist eine Stärke beim Lesen unordentlicher Belege. Bei einer Berechnung ist es schlicht eine neue Art, falsch zu liegen, ohne Vorteil. Ein Modell, das in jedem Testfall die Selbstbeteiligung korrekt anwendet, ist damit noch keine Regel geworden. Der nächste Durchlauf ist nicht an die vorherigen gebunden.
                </p>

                <p className="text-body leading-[1.6]">
                  Selbstbeteiligungen, Abzüge, Schwellenwerte, Obergrenzen, Limits, Haftungsquoten, Mitversicherung und Neu-für-Alt-Abzüge sind alle Rechnen. Keines davon braucht ein Modell.
                </p>
              </MotionDiv>

              {/* Where a model earns its place */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-a-model-earns-its-place"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wo ein Modell seinen Platz verdient
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Ein Modell verdient seinen Platz, indem es Aufgaben löst, an denen feste Regeln scheitern:
                </p>

                <NumberedCards items={modelJobs} />
              </MotionDiv>

              {/* When you cannot separate the two */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="when-you-cannot-separate"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was passiert, wenn sich beides nicht trennen lässt
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Finden Extraktion, Urteil und Arithmetik in einem einzigen Modellaufruf statt, lässt sich die Entscheidung nur als Ganzes beschreiben. Die Ausgabe ist eine einzelne Antwort, in der es nichts zu inspizieren gibt.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Jede Erklärung wird nachträglich geschrieben, als Erzählung dessen, was wahrscheinlich passiert ist. Sie mag plausibel klingen, aber sie ist keine Akte.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Was eine Entscheidung schwer verteidigbar macht, ist selten, dass ein Modell beteiligt war. Es ist, dass niemand die Schritte, an denen es beteiligt war, von denen trennen kann, an denen es das nicht war. Eine Entscheidung, die keine Blackbox ist, ist eine, bei der sich jeder Schritt einzeln öffnen lässt, mit seiner Art darauf vermerkt.
                </p>

                <p className="text-body leading-[1.6]">
                  Diese Eigenschaft muss vom ersten Tag an ins System eingebaut sein. Eine Akte, die nie gespeichert hat, welche Schritte berechnet wurden, lässt sich später nicht in Schritte zerlegen.
                </p>
              </MotionDiv>

              {/* The boundary on one claim */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="one-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wie die Grenze an einem Schadenfall aussieht
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Nehmen wir eine Glasposition in einem Kfz-Schaden:
                </p>

                <NumberedCards items={claimSteps} />
              </MotionDiv>

              {/* Where rules stop */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="handover-points"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wo Regeln enden: die drei Übergabepunkte
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Ein Entscheidungsbaum ist genau so vollständig wie die Fakten, die er erhält, und der Wortlaut, aus dem er gebaut wurde. Eine gut gestaltete Engine behandelt Regelgrenzen als definierte Übergaben, nicht als Lücken:
                </p>

                <BulletList items={handovers} />
              </MotionDiv>

              {/* How True Aim draws the line */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="how-true-aim-draws-the-line"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Wie True Aim die Grenze zieht
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die Entscheidungs-Engine von True Aim ist ein Hybrid aus zwei Technologien. Die Grenze zwischen ihnen ist die zentrale Designentscheidung:
                </p>

                <BulletList items={engineParts} />
              </MotionDiv>

              {/* What a claim record should show */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="claim-record"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was eine Schadenakte zeigen können sollte
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Jeder abgeschlossene Schadenfall wird erneut gelesen: vom Sachbearbeiter vor der Freigabe, vom Kunden, wenn ein Ergebnis angezweifelt wird, oder ein Jahr später von einem Prüfer. Alle stellen dieselbe Frage: Wie kam es dazu?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Eine Akte, die die drei Arten von Schritten auseinanderhält, antwortet direkt:
                </p>

                <BulletList items={recordPoints} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Eine Akte, die nur das Endergebnis enthält, kann gar nicht antworten. Sie kann nur eine nachträglich geschriebene Beschreibung anbieten. Eine Beschreibung ist kein Nachweis.
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
                    {takeaways.map((takeaway) => (
                      <li key={takeaway.text} className="flex items-start gap-3">
                        <CheckCircle
                          aria-hidden="true"
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-body leading-[1.6]">
                          <strong className="text-strong">{takeaway.lead}</strong>{" "}
                          {takeaway.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="faq"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Häufige Fragen
                </h2>

                <FaqBlock faqs={faqs} />
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
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      KI in der Schadenbearbeitung ist nach dem EU AI Act nicht hochriskant
                    </Link>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-auditability-scorecard"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Die Prüfbarkeits-Scorecard für KI in der Schadenbearbeitung
                    </Link>
                  </div>
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
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Null Risiko gibt es nicht. Erklärbare Entscheidungen schon.
            </h2>
            <p className="text-lg text-body mb-10">
              Besprechen Sie mit uns, wie diese Grenze in Ihrer Schadenbearbeitung aussieht.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Kontakt aufnehmen
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                <Calculator aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
                Potenzial berechnen
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
