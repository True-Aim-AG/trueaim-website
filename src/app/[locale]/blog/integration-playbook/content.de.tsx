import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Workflow,
  Plug,
  Radio,
  MousePointer2,
  ShieldCheck,
  FileSignature,
  Server,
  ChevronRight,
} from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { IntegrationPatternA } from "@/components/diagrams/IntegrationPatternA";
import { IntegrationPatternB } from "@/components/diagrams/IntegrationPatternB";

const fadeIn = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } as const,
};

const principles = [
  {
    title: "Ergebnis zuerst, Integration rückwärts.",
    body: "Wir gehen vom Geschäftsergebnis aus und arbeiten uns rückwärts zur Integrationsschnittstelle vor. Minimale Integrationsschnittstelle für maximalen Geschäftsnutzen, keine Abdeckung um ihrer selbst willen.",
  },
  {
    title: "Die Systeme dort abholen, wo sie stehen.",
    body: "Wir passen uns an die verfügbaren Schnittstellen des Kunden an: APIs, Dateiablagen, Queues, Event-Streams oder in engen Fällen die Legacy-Oberfläche selbst. Wir erzwingen nichts.",
  },
  {
    title: "Mit uns geteilte Daten verlassen unsere Infrastruktur nicht.",
    body: "Keine Kundendaten werden an Drittanbieter von Modellen gesendet. Die Inferenz läuft auf Modellen, die in unserer Umgebung gehostet werden.",
  },
  {
    title: "Standardmäßig asynchron und im Batch; synchron nur, wo die Latenz es verlangt.",
    body: "Die meiste Schadenarbeit verträgt ein paar Minuten Latenz. Überall synchron zu bauen, ist eine Steuer, die wir im Namen des Kunden nicht zahlen.",
  },
  {
    title: "Lesen sparsam, Schreiben bewusst.",
    body: "Wir holen, was wir für die Aufgabe brauchen. In die datenführenden Systeme schreiben wir erst zurück, wenn ein Mensch freigegeben hat.",
  },
  {
    title: "Jede Aktion protokolliert, gehasht, wiederholbar.",
    body: "An DORA ausgerichtet und bereit für den EU AI Act. Jeder Prompt, jede Modellversion, jede Tokenzahl und jede menschliche Übersteuerung wird auf Ebene des einzelnen Schadenfalls erfasst.",
  },
];

const patterns = [
  {
    icon: Archive,
    name: "Sicherer Batch über gemeinsamen Speicher",
    when:
      "Der Kunde kann Dokumente und strukturierte Payloads an einem Speicherort ablegen, auf den wir beide Zugriff haben, und der Anwendungsfall verträgt Batch-Latenz.",
    how: "Wir holen die Eingaben nach Zeitplan oder bei Eingang ab, verarbeiten sie in unserer Umgebung und schreiben die Ergebnisse an einen Rückgabeort zurück. Typischerweise eine strukturierte Datei pro Fall plus ein Verarbeitungsprotokoll. Umgesetzt in Muster A unten.",
  },
  {
    icon: Workflow,
    name: "Workflow-Orchestrierung über heterogene Backends",
    when:
      "Die Daten des Kunden liegen in mehreren Systemen (CRM, Dokumentablagen, relationale Datenbanken, Dumps, Messaging), und der Workflow braucht eine einheitliche Oberfläche für die Nutzer.",
    how: "Ein Orchestrierungs-Backend liest aus den relevanten Quellen, die Oberfläche von True Aim trägt den Nutzer-Workflow, und nach Abschluss schreiben wir ein standardisiertes Rückgabeartefakt für die Rückübernahme in die Legacy-Systeme. Umgesetzt in Muster B unten.",
  },
  {
    icon: Plug,
    name: "Direkte API-Integration",
    when:
      "Eine interaktive Abfrage oder ein Rückschreiben, bei dem Latenz oder Korrektheit einen synchronen Roundtrip verlangen. Die Prüfung einer Policennummer bei der Schadenmeldung oder der Abruf eines einzelnen Deckungsdatensatzes auf Anfrage.",
    how: "REST- oder Webhook-Integration mit der API des Kunden. Wir halten diese Oberflächen klein und klar definiert. Authentifizierung per OAuth2, mTLS oder signierten JWTs, je nach Standard des Kunden.",
  },
  {
    icon: Radio,
    name: "Event- und Message-Queue",
    when:
      "Streams mit hohem Volumen (Eingang von Schadenmeldungen, Status-Fan-out an mehrere Beteiligte), bei denen Gegendruck und Dauerhaftigkeit zählen.",
    how: "Wir konsumieren aus der Queue des Kunden (Kafka, Service Bus, SQS oder vergleichbar) und publizieren auf einem dedizierten Topic für nachgelagerte Verbraucher zurück.",
  },
  {
    icon: MousePointer2,
    name: "Browsergesteuerte Dateneingabe in Legacy-Oberflächen",
    when:
      "Ein hochwertiger, enger Workflow, für den keine API existiert und deren Bau sich nicht rechtfertigt.",
    how: "Eine isolierte Automatisierung erledigt die Dateneingabe direkt in der Legacy-Oberfläche im Namen eines Operators. Wir reservieren dieses Muster für Fälle, in denen der Nutzen den operativen Aufwand klar rechtfertigt. Es ist kein Standard.",
  },
];

const phases = [
  {
    label: "Phase 01",
    title: "Woche null: Discovery",
    goal: "Das Zielbetriebsmodell für den ersten Anwendungsfall verstehen, die beteiligten Systeme, die Datenstrukturen und den Risikorahmen.",
    time: "Fachlicher Verantwortlicher für den Anwendungsfall, ein Engineering-Lead, ein Operations-Lead. Etwa zwei bis drei Arbeitssitzungen.",
    outputs: [
      "Definition des Anwendungsfalls mit messbarem Geschäftsergebnis",
      "Systeminventar und Schnittstellenverfügbarkeit (API, Datei, Queue, nur UI)",
      "Beispiele für Datenstrukturen (Schadenfall, Police, Dokumenttypen)",
      "Authentifizierungs- und Netzwerkmodell",
      "Human-in-the-Loop-Checkpoints und Risikoschwellen",
      "Prüf- und Compliance-Anforderungen (DORA, EU AI Act, interne Kontrollen)",
    ],
  },
  {
    label: "Phase 02",
    title: "Woche eins bis vier: Build-Sprint",
    goal: "Die Integration für den vereinbarten Anwendungsfall Ende-zu-Ende aufsetzen, mit echten Kundendaten in einer Nicht-Produktionsumgebung.",
    time: "Geplante Checkpoints am Ende von Woche eins (Schnittstellenverträge), Woche zwei (erster End-to-End-Durchlauf), Woche vier (Nutzerabnahme).",
    outputs: [
      "Funktionierende Integration in einer für den Kunden zugänglichen Umgebung",
      "Schnittstellenverträge (Request-/Response-Strukturen, Fehlersemantik, Retry-Policy)",
      "Betriebs-Runbook (Deployment, Rollback, On-Call-Eskalation)",
      "Spezifikation des Prüfprotokolls (was erfasst wird, wo es gespeichert wird, wie darauf zugegriffen wird)",
      "Testdatensatz und Replay-Harness",
    ],
  },
  {
    label: "Phase 03",
    title: "Schrittweiser Rollout",
    goal: "Den Anwendungsfall hinter einer kontrollierten Rampe in die Produktion bringen, dann auf benachbarte Anwendungsfälle ausweiten.",
    time: "Rampe nach Schadenart, dann nach Volumenanteil, wobei die Human-in-the-Loop-Abdeckung breit beginnt und sich mit wachsender Konfidenz verengt.",
    outputs: [
      "Jeder weitere Anwendungsfall nutzt die in Woche null gebaute Integrationsschnittstelle wieder, sodass die Grenzkosten des zweiten und dritten Anwendungsfalls deutlich unter denen des ersten liegen.",
    ],
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "Human-in-the-loop",
    body: "Jede folgenreiche Entscheidung läuft über einen konfigurierbaren Checkpoint. Der Kunde bestimmt, was automatisch, was geprüft und was freigegeben wird. Wir setzen keine Agenten ein, die außerhalb dieses Rahmens operieren.",
  },
  {
    icon: FileSignature,
    title: "Prüfpfad",
    body: "Jede Aktion (Modellaufruf, Prompt, Modellversion, Tokenzahl, menschliche Übersteuerung, Systemaufruf) wird auf Ebene des einzelnen Schadenfalls erfasst, kryptografisch gehasht, mit Zeitstempel versehen und exportierbar. Das erfüllt die Anforderungen an die digitale operationale Resilienz nach DORA und die Transparenzpflichten des EU AI Act.",
  },
  {
    icon: Server,
    title: "Datenresidenz",
    body: "Mit uns geteilte Kundendaten bleiben in unserer Infrastruktur. Wir leiten Kundendaten nicht über Drittanbieter von Modellen. Wo der Kunde es verlangt, betreiben wir die gesamte Verarbeitungspipeline in seinem Cloud-Mandanten.",
  },
];

const tableOfContents = [
  { num: "01", label: "Zusammenfassung", anchor: "executive-summary" },
  { num: "02", label: "Integrationsprinzipien", anchor: "principles" },
  { num: "03", label: "Muster, die wir verwenden", anchor: "patterns" },
  { num: "04", label: "Muster in der Praxis", anchor: "practice" },
  { num: "05", label: "Wie wir liefern", anchor: "deliver" },
  { num: "06", label: "Zusagen", anchor: "commitments" },
];

export default async function IntegrationPlaybookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen relative">
      {/* Confidential ribbon */}
      <div className="border-y border-hairline bg-lilac">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-caption-sm text-subtle">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Intern &middot; Nicht gelistet
          </span>
          <span className="hidden sm:inline">Doc &middot; TA-IPB / v1.0 / 2026</span>
        </div>
      </div>

      {/* === HERO === */}
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        <GridPattern className="absolute inset-x-0 top-0 hidden h-[600px] md:block" />

        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-caption-sm text-subtle hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            True Aim
          </Link>

          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="text-caption-sm text-accent mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-ta-blue" />
              Playbook
              <span className="text-subtle">/</span>
              <span className="text-subtle">Integration</span>
            </div>

            <h1
              className="font-display font-bold text-strong leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
            >
              Das
              <br />
              <span className="italic font-normal text-accent">
                Integrations-Playbook
              </span>{" "}
              von True Aim.
            </h1>

            <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mb-16">
              Wie wir uns in bestehende Landschaften einfügen, welche Muster wir verwenden und wie eine erste Integration abläuft.
            </p>
          </MotionDiv>

          {/* Spec strip */}
          <MotionDiv {...fadeIn}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Muster", value: "5" },
                { label: "Phasen", value: "3" },
                { label: "Erste Integration", value: "4–6 Wo." },
                { label: "Datenresidenz", value: "Im Mandanten" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card shadow-card rounded-pill px-6 py-5"
                >
                  <div className="text-caption-sm text-subtle mb-2">
                    {stat.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-strong">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* === LAYOUT BODY === */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-12 gap-y-16">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-caption-sm text-subtle mb-4 pb-3 border-b border-hairline">
                Inhalt
              </div>
              <ol className="space-y-2.5">
                {tableOfContents.map((item) => (
                  <li key={item.num}>
                    <a
                      href={`#${item.anchor}`}
                      className="group flex items-baseline gap-3 text-sm text-body hover:text-accent transition-colors"
                    >
                      <span className="text-[10px] font-medium tabular-nums text-subtle group-hover:text-accent transition-colors">
                        {item.num}
                      </span>
                      <span className="leading-snug">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pt-6 border-t border-hairline space-y-2 text-caption-sm text-subtle">
                <div className="flex justify-between">
                  <span>Lesezeit</span>
                  <span className="text-body">8 Min.</span>
                </div>
                <div className="flex justify-between">
                  <span>Zielgruppe</span>
                  <span className="text-body">Eng / Ops</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-accent">Live</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            {/* === 01 EXECUTIVE SUMMARY === */}
            <article id="executive-summary" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="01" eyebrow="Zusammenfassung" />

                <div className="space-y-6 max-w-3xl">
                  <p className="text-body-lg text-strong font-light">
                    True Aim integriert sich in Kernsysteme von Versicherern, Dokumentplattformen, KI-Anbietern und Kommunikationskanälen über eine kleine Menge gut verstandener Muster. Wir gehen vom Geschäftsergebnis aus und arbeiten uns rückwärts zur Integrationsschnittstelle vor. Das Ziel ist{" "}
                    <span className="font-medium text-accent">
                      der kleinste Integrationsschnittstelle, der den Nutzen liefert
                    </span>
                    , keine Abdeckung um ihrer selbst willen.
                  </p>

                  <p className="text-body leading-[1.6]">
                    Mit uns geteilte Kundendaten bleiben in unserer Infrastruktur. Wir senden keine Kundendaten an Drittanbieter von Modellen. Jede Systemaktion wird protokolliert, gehasht und ist wiederholbar. Jede folgenreiche Entscheidung durchläuft einen Human-in-the-Loop-Checkpoint, den der Kunde konfiguriert.
                  </p>

                  <p className="text-body leading-[1.6]">
                    Dieses Dokument legt die Prinzipien, die Muster, zwei Referenzimplementierungen und den Ablauf einer ersten Integration in vier bis sechs Wochen dar.
                  </p>
                </div>
              </MotionDiv>
            </article>

            {/* === 02 PRINCIPLES === */}
            <article id="principles" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="02" eyebrow="Integrationsprinzipien" />

                <ol className="space-y-px border-y border-hairline">
                  {principles.map((p, idx) => (
                    <li
                      key={p.title}
                      className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-6 py-7 border-b border-hairline last:border-b-0 group hover:bg-surface-muted transition-colors -mx-4 md:-mx-6 px-4 md:px-6"
                    >
                      <div className="font-display text-3xl md:text-5xl font-light text-accent leading-none tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-strong mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-body leading-[1.6] max-w-2xl">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </MotionDiv>
            </article>

            {/* === 03 PATTERNS === */}
            <article id="patterns" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="03" eyebrow="Integrationsmuster, die wir verwenden" />

                <p className="text-body leading-[1.6] max-w-2xl mb-10">
                  Ein kurzer Katalog. Die meisten Projekte nutzen zwei oder drei davon in Kombination.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patterns.map((pattern, idx) => {
                    const Icon = pattern.icon;
                    const isLastOdd =
                      idx === patterns.length - 1 && patterns.length % 2 === 1;
                    return (
                      <div
                        key={pattern.name}
                        className={`bg-card shadow-card rounded-pill p-7 flex flex-col gap-5 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch ${
                          isLastOdd ? "md:col-span-2" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-caption-sm text-subtle">
                            P/{String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 h-px bg-hairline" />
                          <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-strong leading-tight">
                          {pattern.name}
                        </h3>

                        <div className="space-y-4 text-sm">
                          <Field label="Wann einsetzen" value={pattern.when} />
                          <Field label="So funktioniert es" value={pattern.how} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === 04 REFERENCE PATTERNS === */}
            <article id="practice" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="04" eyebrow="Referenzmuster in der Praxis" />
              </MotionDiv>

              {/* Pattern A */}
              <MotionDiv {...fadeIn} className="mb-20">
                <div className="text-caption-sm text-accent mb-3">
                  Muster A &middot; Schweizer Versicherer
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Dokumentgetriebene komplexe
                  <br className="hidden md:block" /> Schadenentscheidungen.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  Dokumente gehen an einem Speicherort des Kunden ein. Ein Batch-Reader von True Aim, der in unserer Azure-Umgebung läuft, holt sie nach Zeitplan ab. Komplexe Schadenentscheidungen und die Extraktion der Schlüsseldaten laufen auf unserer Seite. Eine kleine Zahl externer Anreicherungsaufrufe (Teilesuche, Geolokalisierung) erfolgt für bestimmte Anwendungsfälle. Eine einzelne Policenabfrage im ERP des Kunden liefert den Deckungskontext. Die Nutzer schließen die Prüfung in der Plattform von True Aim ab. Nach Freigabe übergeben wir pro Schadenfall eine strukturierte JSON-Datei mit der Entscheidung sowie ein Verarbeitungsprotokoll mit Metadaten, Modellversionen und etwaigen Fehlern an einen Rückgabeort in der Infrastruktur des Kunden.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10 italic">
                  Mit uns geteilte Kundendaten bleiben im Azure-Mandanten von True Aim. Keine Kundendaten werden an Drittanbieter von Modellen gesendet.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternA />}
                  figureLabel="Abb. \1"
                  caption="Muster A: dokumentgetriebene komplexe Schadenentscheidungen."
                />

                <ProvesCallout>
                  Wir können eine durchgängige Entscheidungspipeline mit minimaler Integrationsschnittstelle betreiben (zwei Speicherorte und eine ERP-API), Kundendaten in unserer Umgebung halten und ein sauberes, strukturiertes Ergebnis zurückliefern, das der Kunde auf beliebigem Weg übernehmen kann.
                </ProvesCallout>
              </MotionDiv>

              {/* Pattern B */}
              <MotionDiv {...fadeIn}>
                <div className="text-caption-sm text-accent mb-3">
                  Muster B &middot; US-Versicherungsbetrieb
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Orchestrierung mehrerer Quellen
                  <br className="hidden md:block" /> mit SLA-Workflow.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  Die Arbeitsdaten des Kunden liegen in mehreren Systemen: einem CRM, Google Workspace, einer Postgres-Datenbank, periodischen SQL-Dumps vorgelagerter Versicherer und einem WhatsApp-Kanal für eingehende Kundenkommunikation. Ein Orchestrierungs-Backend von True Aim (n8n) liest aus jeder Quelle und stellt Arbeitsakten für Schadenfälle zusammen. Die Nutzer erledigen den Schadenbearbeitungs-Workflow in der Oberfläche von True Aim, die Kommunikation und SLAs über den gesamten Lebenszyklus verfolgt. Nach Abschluss erzeugt True Aim eine standardisierte Flat-File für die Rückübernahme in die verschiedenen Legacy-Systeme der Versicherer.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10">
                  Für eine kleine Zahl hochwertiger Workflows, bei denen auf der Empfängerseite keine API existiert, erledigt eine browserbasierte Integration die Dateneingabe direkt in der Oberfläche des Versicherers. Wir reservieren dieses Muster für Fälle, in denen der Nutzen den operativen Aufwand klar rechtfertigt.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternB />}
                  figureLabel="Abb. \1"
                  caption="Muster B: Orchestrierung mehrerer Quellen mit SLA-Workflow."
                />

                <ProvesCallout>
                  Wir können eine funktionierende Arbeitsoberfläche über eine fragmentierte Backend-Landschaft aufsetzen, ohne den Kunden in einen aufwendigen synchronen API-Aufbau zu zwingen, und Ergebnisse über jeden Kanal zurückliefern, den das empfangende System tatsächlich unterstützt.
                </ProvesCallout>
              </MotionDiv>
            </article>

            {/* === 05 HOW WE DELIVER === */}
            <article id="deliver" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="05" eyebrow="Wie wir liefern" />

                <p className="text-body leading-[1.6] max-w-2xl mb-12">
                  Eine erste Integration läuft in drei Phasen. Das Muster wiederholt sich für jeden weiteren Anwendungsfall, mit kürzeren Zeitplänen, je mehr Wissen auf Kundenseite entsteht.
                </p>

                <div className="space-y-px">
                  {phases.map((phase, idx) => (
                    <div
                      key={phase.label}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-4 md:gap-x-10 py-10 border-t border-hairline last:border-b last:border-b-hairline relative"
                    >
                      <div className="md:sticky md:top-24 md:self-start">
                        <div className="text-caption-sm text-subtle mb-2">
                          {phase.label}
                        </div>
                        <div className="font-display text-5xl md:text-6xl font-light text-accent leading-none tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="space-y-6 max-w-2xl">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-strong leading-tight">
                          {phase.title}
                        </h3>

                        <PhaseField label="Ziel" value={phase.goal} />
                        <PhaseField
                          label={
                            idx === 2
                              ? "Vorgehen"
                              : idx === 0
                              ? "Aufwand Kunde"
                              : "Aufwand Kunde"
                          }
                          value={phase.time}
                        />

                        <div>
                          <div className="text-caption-sm text-subtle mb-3">
                            {idx === 2 ? "Ergebnis" : "Lieferergebnisse"}
                          </div>
                          <ul className="space-y-2.5">
                            {phase.outputs.map((o) => (
                              <li
                                key={o}
                                className="flex items-start gap-3 text-body leading-relaxed"
                              >
                                <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            </article>

            {/* === 06 COMMITMENTS === */}
            <article id="commitments" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader
                  num="06"
                  eyebrow="Zusagen, die in jeder Phase gelten"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {commitments.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.title}
                        className="relative bg-card shadow-card rounded-pill p-7 flex flex-col gap-5 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-pill bg-lilac grid place-items-center text-accent">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <span className="text-caption-sm text-subtle">
                            C/{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-strong leading-tight">
                          {c.title}
                        </h3>

                        <p className="text-sm text-body leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === END / CTA === */}
            <article>
              <MotionDiv {...fadeIn}>
                <div className="border-t border-hairline pt-14">
                  <div className="text-caption-sm text-subtle mb-6">
                    Ende des Dokuments
                  </div>
                  <h2
                    className="font-display font-bold text-strong leading-[1.05] mb-8"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
                  >
                    Möchten Sie das <br className="hidden md:block" />
                    an Ihrer eigenen Landschaft durchgehen?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonLink href="/contact" variant="primary" size="md">
                      Discovery-Sitzung starten
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </ButtonLink>
                    <ButtonLink href="/technology" variant="secondary" size="md">
                      So funktioniert die Technologie
                    </ButtonLink>
                  </div>
                </div>
              </MotionDiv>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ num, eyebrow }: { num: string; eyebrow: string }) {
  return (
    <header className="mb-10">
      <div className="flex items-baseline gap-5 mb-3">
        <span className="font-display text-sm text-accent tabular-nums">
          {num}
        </span>
        <div className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-strong leading-[1.05]">
        {eyebrow}
      </h2>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-caption-sm text-subtle mb-1.5">
        {label}
      </div>
      <p className="text-body leading-relaxed">{value}</p>
    </div>
  );
}

function PhaseField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2 sm:gap-6">
      <div className="text-caption-sm text-subtle sm:pt-1">
        {label}
      </div>
      <p className="text-body leading-relaxed">{value}</p>
    </div>
  );
}

function DiagramFigure({
  diagram,
  figureLabel,
  caption,
}: {
  diagram: React.ReactNode;
  figureLabel: string;
  caption: string;
}) {
  return (
    <figure className="relative my-4">
      {/* Frame label */}
      <div className="flex items-center gap-3 mb-3 text-caption-sm text-subtle">
        <span className="text-accent">{figureLabel}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <div className="relative rounded-none shadow-card bg-lilac overflow-hidden p-6 md:p-8">
        {/* Corner ticks */}
        <span aria-hidden className="absolute top-0 left-0 w-3 h-3 border-l border-t border-ta-blue/60" />
        <span aria-hidden className="absolute top-0 right-0 w-3 h-3 border-r border-t border-ta-blue/60" />
        <span aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-ta-blue/60" />
        <span aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-ta-blue/60" />

        {diagram}
      </div>

      <figcaption className="mt-3 text-sm text-muted italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function ProvesCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 bg-lilac rounded-pill px-8 py-6">
      <div className="text-caption-sm text-accent mb-2">
        Was das belegt
      </div>
      <p className="text-body-lg text-strong font-light max-w-3xl">
        {children}
      </p>
    </div>
  );
}
