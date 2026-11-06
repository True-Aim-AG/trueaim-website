import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Users,
  AlertTriangle,
  Database,
  RefreshCw,
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
  { id: "what-regulators-actually-want", heading: "Was Aufsichtsbehörden wirklich wollen" },
  { id: "the-evidence-chain-architecture", heading: "Die Nachweisketten-Architektur" },
  { id: "quality-gates-the-audit-checkpoint", heading: "Qualitätsschranken: der Prüf-Checkpoint" },
  { id: "failure-modes-that-break-audit-trails", heading: "Fehlermodi, die Prüfpfade zerstören" },
  { id: "regulatory-mapping-quick-reference", heading: "Regulatorische Zuordnung auf einen Blick" },
  { id: "core-principles-for-auditable-ai", heading: "Grundprinzipien prüfbarer KI" },
  { id: "next-steps", heading: "Nächste Schritte" },
  { id: "key-takeaways", heading: "Das Wichtigste in Kürze" },
];

export default async function AuditabilityBlogPost({ params }: { params: Promise<{ locale: string }> }) {
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
              Prüfbarkeit von Schaden-KI: Nachweisketten, die Prüfer tatsächlich akzeptieren
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Alle sagen, ihre KI sei erklärbar. Wenige können es einem Prüfer beweisen. Hier ist die Architektur, die es möglich macht.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 Min. Lesezeit
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Technischer Deep Dive
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
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    Wenn Aufsichtsbehörden fragen: „Warum hat Ihr System diesen Schadenfall genehmigt?“, wollen sie nichts über Attention-Gewichte oder SHAP-Werte hören. Sie wollen auf ein Feld klicken und genau sehen, woher es stammt. Sie wollen eine Entscheidung von vor sechs Monaten erneut durchlaufen lassen und dieselbe Antwort erhalten. Sie wollen wissen, wann ein Mensch eingegriffen hat und warum.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Das entspricht unserer eigenen Erfahrung aus dem Einsatz. In unserer Arbeit mit NSA Services SA hält jede Entscheidung das Quelldokument, die Seite und die Policenklausel fest, auf denen sie beruht. Die folgenden Abschnitte beschreiben die Architektur dahinter und die regulatorischen Anforderungen, die sie erfüllt.
                </p>
              </MotionDiv>

              {/* What Regulators Actually Want */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-regulators-actually-want"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Was Aufsichtsbehörden wirklich wollen
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Übersetzen wir die Sprache der Aufsicht in technische Spezifikationen.
                </p>

                {/* FINMA */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    FINMA-Aufsichtsmitteilung 08/2024 (Schweiz)
                  </h3>
                  <p className="text-body leading-[1.6] mb-4">
                    Die Schweiz hat kein KI-spezifisches Gesetz. Stattdessen wendet die FINMA technologieneutrale Governance-Anforderungen auf KI-Systeme an und fasst KI-Risiken als{" "}
                    <span className="font-semibold text-strong">
                      operationelle Risiken
                    </span>
                    :
                  </p>
                  <ul className="space-y-2 text-sm text-body">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Modellrisiken:
                        </strong>{" "}
                        Robustheit, Korrektheit, Verzerrung, Erklärbarkeit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          IT-/Cyberrisiken:
                        </strong>{" "}
                        Sicherheit, Verfügbarkeit, Integrität
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Risiken aus Drittabhängigkeiten:
                        </strong>{" "}
                        Anbieterbindung, Konzentration
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted mt-4 italic">
                    Die FINMA hält ausdrücklich fest, dass KI-„Ergebnisse oft nicht verstanden, erklärt oder reproduziert werden können“. Das ist das Problem, das Sie lösen müssen.
                  </p>
                </div>

                {/* EU AI Act */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    EU AI Act
                  </h3>
                  <p className="text-body leading-[1.6]">
                    Nach dem EU AI Act (der KI-Verordnung) gelten Risikobewertung und Preisgestaltung in der Lebens- und Krankenversicherung als{" "}
                    <span className="font-semibold text-strong">
                      hochriskant
                    </span>
                    . Die Schadenautomatisierung ist nicht ausdrücklich als hochriskant aufgeführt, Transparenzpflichten gelten aber. Die EIOPA betont Governance und Risikomanagement im Einklang mit der bestehenden Versicherungsregulatorik.
                  </p>
                </div>

                {/* What This Means */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Was das in der Praxis bedeutet
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Jede Entscheidung muss eine nachvollziehbare Nachweiskette haben",
                      "Menschliche Übersteuerungen müssen mit Begründung erfasst werden",
                      "Sie müssen eine Entscheidung von vor 6 Monaten reproduzieren können",
                      '"Das Modell hat es so gesagt" is not an acceptable explanation',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Kernaussage: Aufsichtsbehörden interessiert nicht Ihre Modellarchitektur. Sie interessiert Ihre Nachweiskette.
                  </p>
                </div>
              </MotionDiv>

              {/* The Evidence Chain Architecture */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-evidence-chain-architecture"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Die Nachweisketten-Architektur
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Wir verwenden drei Ebenen der Nachvollziehbarkeit. Jede Ebene beantwortet eine andere Prüffrage.
                </p>

                {/* Layer 1 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Ebene 1: Herkunftsnachweis vom Feld zur Quelle
                      </h3>
                      <p className="text-sm text-muted">
                        „Woher kommt diese Zahl?“
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Jedes extrahierte Feld muss verknüpft sein mit: Quelldokument, Seitenzahl, Position (Koordinaten) und Extraktionskonfidenz.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Field: [extracted_field_name]
Value: [extracted_value]
Source: [document.pdf], Page X
Location: [bounding box coordinates]
Confidence: [high/medium/low]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Fragt ein Prüfer: „Woher kommt dieser Wert?“, klicken Sie und zeigen ihm die exakte Stelle im Quelldokument. Kein Raten, kein Suchen.
                  </p>
                </div>

                {/* Layer 2 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Database className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Ebene 2: Entscheidungs-Prüfpfad
                      </h3>
                      <p className="text-sm text-muted">
                        „Warum wurde dieser Schadenfall genehmigt?“
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Jede Entscheidung muss festhalten: Eingabe-Hash, Modellversion, Konfidenzwert, Zeitstempel und Entscheidungsstufe.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Decision: [APPROVED/DENIED/REVIEW]
Input hash: [reproducibility hash]
Model version: [version identifier]
Confidence: [score]
Decision method: [deterministic/AI/hybrid]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Unser System nutzt eine mehrstufige Entscheidungskaskade, die mit deterministischen Regeln beginnt und nur bei Bedarf auf KI zurückgreift. Jede Stufe wird protokolliert, sodass Sie genau wissen, welche Methode die Entscheidung getroffen hat.
                  </p>
                </div>

                {/* Layer 3 */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Users className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Ebene 3: Erfassung von Übersteuerungen
                      </h3>
                      <p className="text-sm text-muted">
                        „Warum hat ein Mensch diese Entscheidung geändert?“
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Jede menschliche Übersteuerung muss erfassen: ursprüngliche KI-Entscheidung, menschliche Entscheidung, Grund der Übersteuerung (Pflichtfeld), Identität des Prüfers und Zeitstempel.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Original decision: [AI decision with confidence]
Override decision: [human decision]
Reason: [required justification text]
Reviewer: [authenticated user ID]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    So entsteht eine Rückkopplungsschleife: Übersteuerungsmuster zeigen Systemlücken auf. Übersteuern Sachbearbeiter Ablehnungen immer wieder aus demselben Grund, ist das ein Signal, das System zu verbessern.
                  </p>
                </div>
              </MotionDiv>

              {/* Quality Gates */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="quality-gates-the-audit-checkpoint"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Qualitätsschranken: der Prüf-Checkpoint
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Wir verwenden eine Qualitätsschranke mit drei Zuständen, die bestimmt, wann die Automatisierung fortfährt und wann Menschen eingreifen müssen.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      state: "PASS",
                      tone: "approved" as const,
                      desc: "Alle Pflichtfelder vorhanden, Konfidenz über dem Schwellenwert.",
                      action:
                        "Automatisch fortfahren. Entscheidung mit vollständiger Nachweiskette protokollieren. Keine menschliche Prüfung erforderlich.",
                    },
                    {
                      state: "WARN",
                      tone: "referred" as const,
                      desc: "Konfidenz unter dem Schwellenwert ODER unkritisches Feld fehlt.",
                      action:
                        "Mit Kennzeichnung fortfahren. In die Stichprobenwarteschlange leiten. Ein Mensch kann prüfen oder überspringen.",
                    },
                    {
                      state: "FAIL",
                      tone: "denied" as const,
                      desc: "Kritisches Feld fehlt ODER Konfidenz sehr niedrig ODER Regelverstoß.",
                      action:
                        "Automatisierung blockieren. An einen Sachbearbeiter leiten. Explizite menschliche Entscheidung verlangen.",
                    },
                  ].map((gate) => (
                    <div
                      key={gate.state}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <StatusPill tone={gate.tone} emphasis="light" size="sm">
                          {gate.state}
                        </StatusPill>
                        <span className="text-sm text-body">
                          {gate.desc}
                        </span>
                      </div>
                      <p className="text-xs text-muted">
                        {gate.action}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Confidence Asymmetry */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Asymmetrische Konfidenz
                  </h3>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Wir verwenden asymmetrische Schwellenwerte:
                  </p>
                  <ul className="space-y-2 text-sm text-body mb-4">
                    <li>
                      <strong className="text-approved-dark">
                        Für Genehmigungen:
                      </strong>{" "}
                      höherer Konfidenzschwellenwert erforderlich
                    </li>
                    <li>
                      <strong className="text-referred-dark">
                        Für Ablehnungen:
                      </strong>{" "}
                      niedrigerer Konfidenzschwellenwert akzeptabel
                    </li>
                    <li>
                      <strong className="text-muted">
                        Unterhalb der Schwellenwerte:
                      </strong>{" "}
                      Weiterleitung an die menschliche Prüfung
                    </li>
                  </ul>
                  <p className="text-sm text-body">
                    Warum asymmetrisch? Falsche Genehmigungen kosten mehr: finanzieller Verlust plus regulatorisches Risiko. Gegen falsche Ablehnungen kann der Kunde Einspruch erheben. Das ist keine Verzerrung, das ist Risikomanagement.
                  </p>
                  <div className="mt-4 p-3 bg-lilac rounded-pill">
                    <p className="text-sm font-medium text-accent">
                      Ergebnis: Wir haben unsere REFER_TO_HUMAN-Quote von 60 % auf unter 5 % gesenkt.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Failure Modes */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="failure-modes-that-break-audit-trails"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Fehlermodi, die Prüfpfade zerstören
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Die folgenden Fehler, die wir in unseren eigenen Tests identifiziert haben, sind diejenigen, die Aufsichtsbehörden am ehesten entdecken:
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Extraktionsfehler ohne Herkunftsnachweis",
                      symptom:
                        "Ein Wert wurde falsch extrahiert, aber es gibt keinen Verweis zurück zur Quelle",
                      impact:
                        "Ohne Herkunftsnachweis können Sie den Fehler nicht erklären",
                      fix: "Jeder extrahierte Wert verweist auf die Position in der Quelle",
                    },
                    {
                      title: "Entscheidungen auf Basis nicht verfügbarer Daten",
                      symptom:
                        "Das System hat entschieden, aber eine zentrale Information war nicht im Dokumentensatz",
                      impact:
                        "Das System lag angesichts der verfügbaren Daten richtig, aber der Prüfer weiß das nicht",
                      fix: "Dokumentieren, welche Informationen zum Entscheidungszeitpunkt verfügbar waren",
                    },
                    {
                      title: "Standardmäßige Genehmigung",
                      symptom: "Insgesamt hohe Genauigkeit, aber aus den falschen Gründen richtig",
                      impact:
                        'Can\'t explain why approved, just "keine Fehler gefunden"',
                      fix: "Explizite Deckungsbestätigung verlangen, nicht das Ausbleiben einer Ablehnung",
                    },
                  ].map((fm, idx) => (
                    <div key={idx} className="bg-card shadow-card rounded-pill p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-referred-dark" strokeWidth={1.5} />
                        <span className="font-display font-semibold text-strong">
                          {fm.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted block mb-1">
                            Symptom
                          </span>
                          <span className="text-body">
                            {fm.symptom}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Auswirkung auf die Prüfung
                          </span>
                          <span className="text-body">
                            {fm.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Behebung
                          </span>
                          <span className="text-approved-dark">{fm.fix}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What Doesn't Work */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Was für Erklärbarkeit nicht funktioniert
                  </h3>
                  <ul className="space-y-3 text-sm text-body">
                    <li>
                      <strong className="text-denied-dark">SHAP-/LIME-Werte:</strong>{" "}
                      Technisch interessant, für Sachbearbeiter bedeutungslos. „Merkmal X hat 0,3 zur Entscheidung beigetragen“ ist keine Erklärung.
                    </li>
                    <li>
                      <strong className="text-denied-dark">Attention-Gewichte:</strong>{" "}
                      „Das Modell hat sich auf diese Wörter konzentriert“ erklärt nicht, WARUM die Entscheidung getroffen wurde.
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Konfidenzwerte allein:
                      </strong>{" "}
                      „87 % sicher“ ist keine Erklärung. Sie brauchen: „87 % sicher, WEIL [Nachweis]“.
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Nachträgliche Begründungen:
                      </strong>{" "}
                      Erklärungen nach der Entscheidung zu erzeugen, birgt das Risiko, dass Erklärung und tatsächliche Logik auseinanderfallen. Prüfer werden das testen.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Kernaussage: Erklärbarkeit heißt, den Rechenweg zu zeigen, nicht, Gefühle zur Antwort zu beschreiben.
                  </p>
                </div>
              </MotionDiv>

              {/* Regulatory Mapping */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="regulatory-mapping-quick-reference"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Regulatorische Zuordnung auf einen Blick
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          Anforderung
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          FINMA 08/2024
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          EU AI Act
                        </th>
                        <th className="text-left py-3 font-display text-strong font-medium">
                          Umsetzung
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
                      {[
                        [
                          "Dokumentation",
                          "Wesentliche Anwendungen",
                          "Transparenzpflichten",
                          "Model Cards, Entscheidungsprotokolle, Versionskontrolle",
                        ],
                        [
                          "Nachvollziehbarkeit",
                          "Ergebnisse müssen erklärbar sein",
                          "Aufzeichnungspflichten bei hoher Auswirkung",
                          "Herkunftsnachweis vom Feld zur Quelle",
                        ],
                        [
                          "Reproduzierbarkeit",
                          '"Oft nicht reproduzierbar" (the problem)',
                          "Implizit",
                          "Eingabe-Hashing, Modellversionierung",
                        ],
                        [
                          "Menschliche Aufsicht",
                          "Erforderlich bei wesentlichen Entscheidungen",
                          "Erforderlich bei Hochrisiko",
                          "Qualitätsschranken, Erfassung von Übersteuerungen",
                        ],
                        [
                          "Rückfallmechanismen",
                          "Ausdrücklich verlangt",
                          "Erwartet",
                          "Stufenkaskade, menschliche Warteschlange",
                        ],
                        [
                          "Risikoklassifizierung",
                          "Zentrales Inventar erwartet",
                          "Hochrisiko für Lebens-/Kranken-Preisgestaltung",
                          "Anwendungsfall-Register mit Risiko-Tags",
                        ],
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-hairline"
                        >
                          <td className="py-3 pr-4 font-display text-strong font-medium">
                            {row[0]}
                          </td>
                          <td className="py-3 pr-4">{row[1]}</td>
                          <td className="py-3 pr-4">{row[2]}</td>
                          <td className="py-3">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionDiv>

              {/* Core Principles */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-principles-for-auditable-ai"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Grundprinzipien prüfbarer KI
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <p className="text-sm text-body leading-[1.6] mb-6">
                    Prüfbereite KI-Systeme zu bauen, verlangt die Verpflichtung auf vier Grundprinzipien. Die konkrete Umsetzung variiert je nach Organisation, die Prinzipien bleiben gleich.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Vollständiger Herkunftsnachweis
                        </h3>
                        <p className="text-sm text-body">
                          Jeder extrahierte Wert muss bis zu seinem Quelldokument und seiner Position nachvollziehbar sein.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Reproduzierbarkeit der Entscheidung
                        </h3>
                        <p className="text-sm text-body">
                          Bei gleichen Eingaben und gleicher Modellversion müssen Sie jede historische Entscheidung reproduzieren können.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Menschliche Verantwortung
                        </h3>
                        <p className="text-sm text-body">
                          Jede menschliche Übersteuerung muss mit Pflichtbegründung und Identität des Prüfers erfasst werden.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Kontinuierliche Validierung
                        </h3>
                        <p className="text-sm text-body">
                          Regelmäßige Tests historischer Entscheidungen, um sicherzustellen, dass Ihr Prüfpfad intakt bleibt.
                        </p>
                      </div>
                    </div>
                  </div>
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

                <div className="space-y-4">
                  {[
                    {
                      num: "1",
                      title: "Prüfen Sie Ihre aktuelle Nachweiskette",
                      desc: "Können Sie jedes Feld bis zu seiner Quelle zurückverfolgen?",
                    },
                    {
                      num: "2",
                      title: "Testen Sie die Reproduzierbarkeit",
                      desc: "Lassen Sie eine 3 Monate alte Entscheidung erneut laufen. Gleiche Ausgabe?",
                    },
                    {
                      num: "3",
                      title: "Dokumentieren Sie Ihre Kriterien für die Qualitätsschranke",
                      desc: "Was löst eine menschliche Prüfung aus?",
                    },
                    {
                      num: "4",
                      title: "Ordnen Sie Ihre Architektur FINMA und EU AI Act zu",
                      desc: "Nutzen Sie die Tabelle oben als Ausgangspunkt.",
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

                <div className="mt-8 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Das Ziel ist nicht perfekte KI. Es ist verteidigbare KI: Systeme, in denen jede Entscheidung erklärt, jedes Feld zurückverfolgt und jeder menschliche Eingriff dokumentiert werden kann. Das wollen Aufsichtsbehörden. Das akzeptieren Prüfer.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  Basierend auf der Einsatzerfahrung von True Aim bei Fahrzeuggarantie-Schadenfällen und der regulatorischen Analyse der FINMA-Aufsichtsmitteilung 08/2024, des EU AI Act und der EIOPA-Governance-Rahmenwerke.
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
                      "Dreistufige Nachweisketten-Architektur",
                      "Herkunftsnachweis vom Feld zur Quelle",
                      "Entscheidungs-Prüfpfad mit Eingabe-Hashing",
                      "Erfassung menschlicher Übersteuerungen mit Pflichtbegründung",
                      "Qualitätsschranken, die Prüfer überzeugen",
                      "Zuordnung zu FINMA & EU AI Act",
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
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Sie bauen prüfbare KI?
            </h2>
            <p className="text-lg text-body mb-10">
              Wir helfen Ihnen, Nachweisketten-Architekturen zu entwerfen, die Aufsichtsbehörden und Prüfer überzeugen.
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
