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
import { ComparisonTable, FaqBlock, TextureBackdrop } from "@/components/content";
import {
  ClaimChainDiagram,
  PriceEngineDiagram,
  SharedRecordDiagram,
} from "./diagrams.de";
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
  { id: "sovereign-fragment-problem", heading: "Das Problem der souveränen Fragmente" },
  { id: "glass-box", heading: "Die Glasbox" },
  { id: "price-integrity", heading: "Empirische Preisintegrität" },
  { id: "four-pillars", heading: "Die vier Säulen" },
  { id: "judgement-dividend", heading: "Die Urteilsdividende" },
  { id: "implementation-controls", heading: "Strukturelle Realitäten" },
  { id: "implementation-roadmap", heading: "Die Umsetzungs-Roadmap" },
  { id: "core-takeaways", heading: "Kernaussagen" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const partyViews: BulletItem[] = [
  {
    text: "Der Versicherer arbeitet in einer Governance-Workbench mit sofortiger Nachverfolgung der aufsichtsrechtlichen Compliance.",
  },
  {
    text: "Der Versicherungsnehmer verfolgt den Eingang der Nachweise in Echtzeit und sieht direkt am Bildschirm, welche Dokumente geprüft sind und welche Anforderungen noch offen sind.",
  },
  {
    text: "Der Vermittler überwacht Kapazitätsauslastung, Binder-Limits und SLA-Kennzahlen in Echtzeit, ohne eine Statusanfrage zu stellen.",
  },
  {
    text: "Der Fachbetrieb reicht Kostenvoranschläge auf Positionsebene ein und erhält eine sofortige, deterministische Prüfung anhand der Deckungsbedingungen.",
  },
];

const decisionRecord: string[] = [
  "die zugrunde gelegten Fakten und Belege;",
  "die konkrete Regel, das statistische Modell oder die geltende Version des Vertragswortlauts;",
  "die deterministische Begründung in einfacher Sprache;",
  "die genaue Identität des menschlichen oder agentischen Akteurs, der die Änderung ausführt.",
];

const priceSteps: NumberedItem[] = [
  {
    title: "Deterministische Prüfung auf Positionsebene",
    body: "Jede angebotene Position wird anhand dynamischer, empirischer Preisverteilungen geprüft, die aus geprüften, abgerechneten Rechnungen je Gewerk und Postleitzahlgebiet abgeleitet sind.",
  },
  {
    title: "Sofortige Freigabe",
    body: "Kostenvoranschläge, die den geprüften regionalen Verteilungen entsprechen, werden in unter einer Sekunde freigegeben.",
  },
  {
    title: "Punktgenaue Abweichungsanalyse",
    body: "Rechnungen mit statistischen Anomalien werden sofort zurückgegeben, mit genauer Angabe der abweichenden Positionen und des exakten Deltas zum Referenzpreis.",
  },
  {
    title: "Abgrenzung der Grenzfälle",
    body: "Unstrukturierte oder gebündelte Positionen, die sich nicht systematisch prüfen lassen, werden für die Beurteilung durch erfahrene Sachbearbeiter ausgesondert.",
  },
];

const pillars = [
  {
    label: "Eingang & Orchestrierung",
    cells: [
      "Schadenaufnahme über mehrere Kanäle, fortlaufende Kontextanalyse und agentische Aufgabenverteilung.",
      "Beseitigt den administrativen Navigationsaufwand über interne und externe Grenzen hinweg.",
    ],
  },
  {
    label: "Deckungsentscheidung",
    cells: [
      "Deterministische Vertragsberechnung Zeile für Zeile, die Fakten dem Policenwortlaut zuordnet.",
      "Nachprüfbare rechtliche Feststellungen in einfacher Sprache, in Millisekunden ausgeführt.",
    ],
  },
  {
    label: "Marktabgleich",
    cells: [
      "Kontinuierliche empirische Preisprüfung anhand von Gewerk-, Positions- und Regionalvarianzkurven.",
      "Beseitigt operatives Entschädigungs-Leakage bei voller Fairness gegenüber den Lieferantennetzwerken.",
    ],
  },
  {
    label: "Prüfung & Governance",
    cells: [
      "Kontinuierliche Protokollierung von Entscheidungen, Quellmaterial und aufsichtsrechtlichen Kriterien.",
      "Erzeugt ein sofortiges, unveränderliches Prüfpaket. Belastbar von Grund auf.",
    ],
  },
];

const judgementWork: BulletItem[] = [
  {
    lead: "Die Beurteilung von Grenzfällen:",
    text: "Eingreifen bei katastrophalen, mehrdeutigen oder rechtlich sensiblen Schadenereignissen, bei denen menschliche Empathie und situatives Ermessen das Ergebnis bestimmen.",
  },
  {
    lead: "Die Beziehung zum Versicherungsnehmer:",
    text: "Führen differenzierter, vertrauensvoller Gespräche mit Anspruchstellern, wenn eine Deckung geändert oder abgelehnt werden muss, ausgestattet mit der vollständigen Begründung der Entscheidung in einfacher Sprache.",
  },
  {
    lead: "Systematische Regeloptimierung:",
    text: "Als interner Betriebsingenieur agieren und strukturelle Übersteuerungsmuster analysieren, um zu erkennen, wo Zeichnungsrichtlinien oder automatisierte Regeln mehrdeutig, veraltet oder zu restriktiv sind.",
  },
];

const controls: BulletItem[] = [
  {
    lead: "Teilnahme am Ökosystem verlangt echten Nutzen:",
    text: "Externe Reparaturbetriebe und Schadendienstleister werden die Workbench eines Versicherers nicht nutzen, wenn sie als digitales Überwachungsportal funktioniert. Die gemeinsame Akte funktioniert nur, wenn externe Partner spürbaren Nutzen erhalten: automatisierte Freigaben auf Positionsebene, Zahlungsfreigaben innerhalb eines Tages und eindeutige Anforderungen.",
  },
  {
    lead: "Architektonisches Berechtigungsdesign:",
    text: "Berechtigungsparameter lassen sich nicht beiläufig anpassen. Der Versicherer definiert die strukturelle Sichtbarkeit einmal; das Betriebssystem setzt sie mathematisch über alle Schnittstellen durch.",
  },
  {
    lead: "Strenge bei den Verteilungen:",
    text: "Algorithmischer Preisabgleich ist nur so verlässlich wie der zugrunde liegende Datenbestand. Referenzpreise müssen aus empirischen Rechnungsdaten berechnet werden, streng segmentiert nach Gewerk, Kategorie und regionalem Mikromarkt.",
  },
  {
    lead: "Souveränität der delegierten Befugnis:",
    text: "Ein Makler mit autorisierter Zeichnungsvollmacht hat andere Entscheidungsrechte als ein nicht angebundener Vermittler. Der Zustandsautomat muss fortlaufend abbilden, wer die Entscheidungsbefugnis über jede einzelne Position hat, in strikter Übereinstimmung mit dem zugrunde liegenden Zeichnungsvertrag.",
  },
];

const roadmap: NumberedItem[] = [
  {
    title: "Die Bruchlinien isolieren",
    body: "Jede eigenständige Rechtseinheit erfassen, die eine einzelne Gewerbe- oder Privatkundensparte berührt. Genau dokumentieren, wo die Nachweiskette bricht und in manuelle Korrespondenz übergeht.",
  },
  {
    title: "Die Berechtigungsmatrix kodifizieren",
    body: "Die Datenzugriffsrichtlinien für jede Beteiligtengruppe (Versicherungsnehmer, Makler, Sachbearbeiter und Drittanbieter) formulieren, bevor eine einzige Schnittstelle ausgerollt wird.",
  },
  {
    title: "Einen begrenzten Piloten ausrollen",
    body: "Ein einzelnes Partnernetzwerk und eine einzelne Sparte auf eine gemeinsame Akte bringen. Über neunzig Tage das Volumen ausgehender Rückfragen, die Durchlaufzeiten von Rechnungen und die Quote strittiger Regulierungen messen.",
  },
  {
    title: "Begründungen in einfacher Sprache erzwingen",
    body: "Die Aufzeichnung von Entscheidungen ohne klare Begründung in einfacher Sprache untersagen. Ein Systemprotokoll ohne explizite Begründung ist bloß digitales Abgas, keine rechtliche Verteidigung.",
  },
  {
    title: "Die Urteilsdividende reinvestieren",
    body: "Die Stunden der Sachbearbeiter bewusst neu verteilen. Schadenpersonal von ertragsarmer Dateneingabe in hochwertiges Risk Engineering, Regulierungsverhandlung und Regelarchitektur überführen.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "Die Mehrparteien-Realität:",
    text: "Ein komplexer Schadenfall ist von Natur aus eine verteilte Nachweisakte. Unternehmensinterne Automatisierung treibt die Arbeit nur in die reibungsintensiven Grenzen zwischen unabhängigen Organisationen.",
  },
  {
    lead: "Ein gemeinsames Betriebssystem:",
    text: "Ein agentisches Betriebssystem, betrieben als einheitlicher Zustandsautomat unter strikten, rollenbasierten Berechtigungen, macht organisationsübergreifende Transparenz zu einer inhärenten architektonischen Eigenschaft.",
  },
  {
    lead: "Glasbox-Prüfbarkeit:",
    text: "Echtes Vertrauen im Unternehmen verlangt kontinuierliche Herkunftsnachweise auf Positionsebene: die exakten Fakten, Wortlautversionen, Begründungen in einfacher Sprache und die menschlichen oder maschinellen Akteure hinter jeder Entscheidung.",
  },
  {
    lead: "Der aufgewertete Sachbearbeiter:",
    text: "Autonome Systeme beseitigen den administrativen Navigationsaufwand und geben Sachbearbeitern die Arbeit zurück, die die Investition rechtfertigt: komplexes menschliches Urteil, Partnerbeziehungen und systemisches Betriebsdesign.",
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

/** A numbered list without titles, for items that are one line each. */
function NumberedList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ol role="list" className={`space-y-3 list-none p-0 text-body leading-[1.6] ${className}`}>
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
          >
            {index + 1}
          </span>
          <span>{item}</span>
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

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ta-blue pl-6 my-8">
      <p className="text-body-lg text-strong">{children}</p>
    </div>
  );
}

export default async function ArchitecturalTransparencyBlogPost({
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
              Das Problem mit der Schadenautomatisierung in Silos
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Architektonische Transparenz und der Aufstieg der agentischen Schadenorganisation
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
                8 Min. Lesezeit
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
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Zusammenfassung
                  </h2>
                  <p className="text-body leading-[1.6]">
                    Ein Schadenfall existierte nie innerhalb der vier Wände eines einzelnen Unternehmens. Versicherungsnehmer, Underwriter, Zeichnungsbevollmächtigter, Fachreparaturbetrieb und forensischer Schadenregulierer halten jeweils souveräne Fragmente einer Wahrheit, die niemand teilt. Die bisherige Automatisierung endete an internen Grenzen, beschleunigte einzelne Arbeitsplätze und ließ das weitere Ökosystem im administrativen Stillstand zurück. Der Weg nach vorn ist kein weiterer Chatbot als Punktlösung und kein automatisierter Posteingang. Es ist ein agentisches Betriebssystem, verankert in einer einheitlichen Akte, das die Ausführung über mehrere Parteien unter mathematischen Berechtigungen orchestriert, wobei jeder Ermessensakt mit Herkunftsnachweis auf Positionsebene protokolliert wird. Transparenz ist dann keine Gefälligkeit mehr. Sie wird zur architektonischen Garantie.
                  </p>
                </div>

                <PullQuote>Die alte Schadenautomatisierung ist tot.</PullQuote>

                <p className="text-body leading-[1.6] mb-5">
                  Im vergangenen Jahrzehnt wurde die Versicherungssoftware über eine einzige Kennzahl verkauft: Geschwindigkeit. Schnellere Aufnahme, schnellere Texterkennung, schnellere Triage. Milliarden später haben Versicherer ultraschnelle Arbeitsplätze gebaut, die in zutiefst langsamen Netzwerken gefangen sind.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ein Versicherer kann generative Modelle einsetzen, um eine Schadenmeldung in vier Sekunden aufzunehmen und die Deckung Zeile für Zeile zu berechnen. Doch derselbe Versicherer verbringt achtundvierzig Stunden damit, einem E-Mail-Anhang eines regionalen Reparaturbetriebs hinterherzulaufen, und drei Wochen damit, einen forensischen Prüfpfad für eine Aufsichtsbehörde zusammenzustellen.
                </p>

                <p className="text-body leading-[1.6]">
                  Die Stunden, die ein interner Sachbearbeiter zurückgewann, waren immer der kleinere Gewinn. Das eigentliche Neuland ist, was eine Schadenorganisation wird, wenn der systemische Navigationsaufwand, der manuelle Kraftakt, Fakten über Unternehmensgrenzen hinweg abzugleichen, konstruktiv aus der Welt geschafft wird.
                </p>
              </MotionDiv>

              {/* The sovereign fragment problem */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sovereign-fragment-problem"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Das Problem der souveränen Fragmente
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Betrachten wir einen gewöhnlichen Sach- oder komplexen Kfz-Schaden.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Der Versicherungsnehmer meldet ein Schadenereignis. Ein Vermittler bestätigt die Deckung im Rahmen einer Zeichnungsvollmacht. Der Versicherer entscheidet über die Haftung. Ein Dienstleister beziffert die Wiederherstellung. Ein Schadenregulierer prüft den physischen Schaden.
                </p>

                <p className="text-body leading-[1.6]">
                  Fünf verschiedene Rechtseinheiten. Fünf isolierte Datenbanken. Fünf unterschiedliche Konventionen der Aktenführung.
                </p>

                <ClaimChainDiagram />

                <p className="text-body leading-[1.6] mb-5">
                  Weil kein Beteiligter über die vollständige Faktenlage verfügt, führt jede Organisation ihre eigene defensive Schattenakte. Der Schadenfall wird an jeder Grenze, die er überquert, zerlegt, übersetzt und wieder zusammengesetzt. Der Status wird am Telefon ausgehandelt. Kostenvoranschläge passieren Unternehmens-Firewalls als statische PDFs. Freigaben kommen als unindexierte Korrespondenz zurück.
                </p>

                <p className="text-body leading-[1.6]">
                  Jeder Grenzübergang kostet einen unsichtbaren Zoll: ein fehlender Nachtrag, eine nicht erfasste Verzögerung, eine Entscheidungsbegründung, die allein im Gedächtnis eines erfahrenen Sachbearbeiters existiert. Was die Branche als „End-to-End-Betrieb“ bezeichnet, ist in Wahrheit eine Ad-hoc-Kette unverbundener Unternehmen, die versuchen, sich über menschliche Reibung zu synchronisieren.
                </p>
              </MotionDiv>

              {/* The glass box */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="glass-box"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Glasbox: Transparenz als architektonisches Grundelement
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Automatisierung innerhalb der Unternehmensgrenze kann einen organisationsübergreifenden Bruch nicht beheben. Endet die Automatisierung an der Unternehmensgrenze, verdichtet sich die Reibung einfach am Rand.
                </p>

                <p className="text-body leading-[1.6]">
                  Die architektonische Alternative ist ein agentisches Betriebssystem auf Basis einer einzigen, synchronisierten Schadenakte. Ein zugrunde liegender Zustandsautomat; mehrere souveräne, rollenbasierte Oberflächen.
                </p>

                <SharedRecordDiagram />

                <BulletList items={partyViews} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Jede Partei greift genau auf das zu, was sie rechtlich und kommerziell sehen darf, durchgesetzt durch native Informationsbarrieren. Alle Beteiligten arbeiten auf einer identischen, unveränderlichen Grundlage.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Unter dieser Architektur liegt eine strikte Disziplin: Jede einzelne Handlung, die einen Schadenfall verändert, wird als formale Entscheidung berechnet und mit Herkunftsnachweis auf Positionsebene festgehalten. Ob Policenbeginn geprüft, Deckungsanwendbarkeit bestätigt, ein Stundensatz eines Gewerks abgeglichen oder ein auffälliger Schadenfall an die Betrugsabwehr geleitet wird, die Engine hält fest:
                </p>

                <NumberedList items={decisionRecord} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Übersteuert ein menschlicher Sachbearbeiter eine automatisierte Feststellung, verlangt die Architektur eine explizite, begründete Rechtfertigung.
                </p>

                <p className="text-body leading-[1.6]">
                  Hier wandelt sich Prüfbarkeit von einer nachträglichen Rekonstruktion zu einer ständigen Realität. Transparenz über Organisationsgrenzen hinweg war historisch eine gelegentliche Gefälligkeit. In einer agentischen Architektur ist sie eine unveränderliche Systemeigenschaft.
                </p>

                <PullQuote>
                  Keine Blackbox. Eine Glasbox: prüfbar von Grund auf, kryptografisch verifizierbar und offen für jeden legitimen Beteiligten in der Wertschöpfungskette.
                </PullQuote>
              </MotionDiv>

              {/* Empirical price integrity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="price-integrity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Präzisionsarbeit in der Praxis: empirische Preisintegrität
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nirgends sind die Kosten struktureller Intransparenz offensichtlicher als bei Kostenvoranschlägen aus der Lieferkette, wo sich unbeobachtetes Leakage (vermeidbare Mehrzahlungen) über den Long Tail konzentriert.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Historisch begegneten Versicherer der Reibung bei Kostenvoranschlägen mit willkürlichen Pauschalkontrollen: Rechnungen über einer willkürlichen Betragsgrenze gingen mit erheblichem Aufwand an unabhängige Schadenregulierer; Rechnungen darunter wurden durchgewinkt oder nach dem Bauchgefühl des Sachbearbeiters bewertet. In komplexen regionalen Märkten wie der Schweizer Gebäudesanierung arbeiteten Versicherer mit statischen, theoretischen Verbandstarifen (suissetec, EIT.swiss), die die tatsächliche, lokale Abrechnungsdynamik nicht abbildeten.
                </p>

                <p className="text-body leading-[1.6]">
                  In einer offenen, agentischen Architektur wird die Prüfung von Kostenvoranschlägen von subjektiver Debatte zu empirischer Berechnung:
                </p>

                <PriceEngineDiagram />

                <NumberedCards items={priceSteps} />

                <p className="text-body leading-[1.6] mt-8 mb-5">
                  Wenn ein Dienstleister einen Kostenvoranschlag vor dem Versand anhand des Marktreferenzpreises prüfen kann, verändert sich die Beziehung. Eine Bitte um Neuausstellung ist kein gegnerischer Streit mehr; sie ist ein objektiver, automatisierter Abgleich. Die zugrunde liegenden Verteilungsmodelle verfeinern sich dynamisch mit jeder entschiedenen Regulierung.
                </p>

                <p className="text-body leading-[1.6]">
                  Preisintegrität ist kein Streitpunkt zwischen Unternehmen mehr. Sie wird zu gemeinsamem, unbestreitbarem Nachweis.
                </p>
              </MotionDiv>

              {/* The four pillars */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-pillars"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die vier Säulen des Schaden-Betriebssystems
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Eine Schadenarchitektur für Unternehmen braucht modulare Komponenten, die durchgängige Handlungsfähigkeit orchestrieren. Diese Fähigkeiten sind nicht linear; sie greifen nativ ineinander:
                </p>

                <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
                  <ComparisonTable
                    caption="Die vier Säulen des Schaden-Betriebssystems"
                    columns={["Modul", "Kernfunktion", "Ergebnis für das Unternehmen"]}
                    rows={pillars}
                  />
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Versicherer müssen keine riskanten, mehrjährigen Transformationen ihrer Kernplattform durchlaufen, um diesen Wert zu heben. Sie können eine einzelne Fähigkeit einführen, etwa den Preisabgleich oder die Deckungsprüfung, und modular erweitern, sobald die gemeinsame Akte ihren Nutzen für das Unternehmen belegt.
                </p>

                <p className="text-body leading-[1.6]">
                  Das ist das Betriebsmodell des Spitzenversicherers: Vermittler belegen die Einhaltung der Zeichnungsvollmacht über Live-Daten statt über Jahresprüfungen. Reparaturnetzwerke tauschen Reibung gegen Zahlungsgeschwindigkeit. Stellt die Versicherungsaufsicht eine förmliche Anfrage, legt der Versicherer in Sekunden eine vollständige Entscheidungsakte vor, statt in Panik über Monate eine forensische Rekonstruktion zusammenzustellen.
                </p>

                <PullQuote>In Minuten entschieden. Über Jahre belastbar.</PullQuote>
              </MotionDiv>

              {/* The judgement dividend */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="judgement-dividend"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Urteilsdividende: Aufwertung des Menschen statt Ersatz
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die vorherrschende Debatte über KI im Unternehmen kreist um den Abbau von Arbeit. Diese These verkennt die Natur professioneller Risikoarbeit.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  True Aim ersetzt die Schadenfachkraft nicht; es löst das administrative Gerüst auf, das sie daran hinderte, ihr Handwerk auszuüben. Indem das Lesen von Dokumenten, die Übersetzung in strukturierte Daten, die Basisprüfung von Preisen und die Statuskommunikation an ein zugrunde liegendes agentisches Betriebssystem delegiert werden, gewinnen Sachbearbeiter ihre Arbeitswoche für Aufgaben zurück, die anspruchsvolles strategisches Denken verlangen:
                </p>

                <BulletList items={judgementWork} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Die Leistungskennzahlen der Führung werden sich entsprechend anpassen. Durchlaufzeit und Bearbeitungskosten pro Akte waren die groben Hilfsgrößen der manuellen Ära. Das Unternehmen, das auf einer gemeinsamen agentischen Akte arbeitet, misst die Konsistenz der Entscheidungen, die Erklärbarkeit auf Positionsebene, die systematische Beseitigung von Partner-Kontaktpunkten und den Rückgang der Streitquoten.
                </p>
              </MotionDiv>

              {/* Structural realities */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-controls"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Strukturelle Realitäten und Umsetzungskontrollen
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die Transformation eines Betriebsnetzwerks verlangt, architektonische Beschränkungen vom ersten Tag an anzuerkennen:
                </p>

                <BulletList items={controls} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Compliance ist kein Nachgedanke, der über alte Abläufe gelegt wird. Sie ist vom ersten aufgenommenen Datensatz an in die Transaktion eingebaut.
                </p>
              </MotionDiv>

              {/* The implementation roadmap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-roadmap"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Umsetzungs-Roadmap
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Die Transformation eines Unternehmens erfordert keine spekulative Big-Bang-Migration. Sie verlangt präzise, phasenweise Umsetzung:
                </p>

                <NumberedCards items={roadmap} />

                <p className="text-body leading-[1.6] mt-8">
                  Die Versicherer, die diesen Übergang vollziehen, setzen den technologischen und operativen Standard für ihre Geschäftspartner. Wer weiterhin lokale Punktlösungen einführt, finanziert lediglich einen schnelleren Arbeitsplatz in einer veralteten Kette.
                </p>
              </MotionDiv>

              {/* Core takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Kernaussagen
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
              In Minuten entschieden. Über Jahre belastbar.
            </h2>
            <p className="text-lg text-body mb-10">
              Besprechen Sie mit uns, was eine gemeinsame Schadenakte in Ihrer Schadenbearbeitung verändern würde.
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
