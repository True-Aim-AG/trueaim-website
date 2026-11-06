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
    title: "Prima il risultato, poi l’integrazione a ritroso.",
    body: "Partiamo dal risultato di business e procediamo a ritroso verso la superficie di integrazione. Superficie di integrazione minima per il massimo valore di business, non copertura per il suo stesso bene.",
  },
  {
    title: "Incontrare i sistemi dove si trovano.",
    body: "Ci adattiamo alle interfacce disponibili presso il cliente: API, file drop, code, flussi di eventi o, in casi circoscritti, la stessa interfaccia legacy. Non forziamo l’adattamento.",
  },
  {
    title: "I dati condivisi con noi non lasciano la nostra infrastruttura.",
    body: "Nessun dato dei clienti viene inviato a fornitori di modelli terzi. L’inferenza gira su modelli ospitati nel nostro ambiente.",
  },
  {
    title: "Asincrono e batch per default; sincrono solo dove la latenza lo richiede.",
    body: "La maggior parte del lavoro sui sinistri tollera qualche minuto di latenza. Costruire tutto in sincrono è una tassa che rifiutiamo di pagare per conto del cliente.",
  },
  {
    title: "Lettura leggera, scrittura deliberata.",
    body: "Preleviamo ciò che serve per svolgere il lavoro. Non scriviamo nei sistemi di riferimento finché una persona non approva.",
  },
  {
    title: "Ogni azione registrata, con hash, riproducibile.",
    body: "Allineato a DORA e pronto per l’AI Act europeo. Ogni prompt, versione del modello, conteggio dei token e intervento umano è registrato a livello di singolo sinistro.",
  },
];

const patterns = [
  {
    icon: Archive,
    name: "Batch sicuro tramite storage condiviso",
    when:
      "Il cliente può depositare documenti e payload strutturati in una posizione di storage a cui entrambi abbiamo accesso, e il caso d’uso tollera la latenza del batch.",
    how: "We pick up inputs on a schedule or on arrival, process inside our environment, and write outputs back to a return location. Typically one structured file per case plus a processing log. Carried by Pattern A below.",
  },
  {
    icon: Workflow,
    name: "Orchestrazione dei workflow su backend eterogenei",
    when:
      "I dati del cliente risiedono in più sistemi (CRM, archivi documentali, database relazionali, dump, messaggistica) e il workflow ha bisogno di una superficie unificata per gli utenti.",
    how: "An orchestration backend reads from the relevant sources, the True Aim UI hosts the user workflow, and on completion we write a standard return artifact for ingestion back into the legacy systems. Carried by Pattern B below.",
  },
  {
    icon: Plug,
    name: "Integrazione API diretta",
    when:
      "Una consultazione interattiva o una scrittura di ritorno dove latenza o correttezza richiedono un round trip sincrono. Convalidare un numero di polizza alla denuncia del sinistro, o recuperare un singolo record di copertura su richiesta.",
    how: "Integrazione REST o webhook con l’API del cliente. Manteniamo queste superfici piccole e ben definite. Autenticazione tramite OAuth2, mTLS o JWT firmati, secondo lo standard del cliente.",
  },
  {
    icon: Radio,
    name: "Coda di eventi e messaggi",
    when:
      "Flussi ad alto volume (acquisizione delle denunce di sinistro, diffusione dello stato a più stakeholder) dove contropressione e durabilità contano.",
    how: "Consumiamo dalla coda del cliente (Kafka, Service Bus, SQS o equivalente) e pubblichiamo di ritorno su un topic dedicato per i consumatori a valle.",
  },
  {
    icon: MousePointer2,
    name: "Inserimento dati tramite browser in interfacce legacy",
    when:
      "Un workflow ristretto e ad alto valore per cui non esiste un’API e il costo di costruirne una non è giustificato.",
    how: "Un’automazione isolata completa l’inserimento dati direttamente nell’interfaccia legacy per conto di un operatore. Riserviamo questo pattern ai casi in cui il valore giustifica chiaramente l’impronta operativa. Non è un default.",
  },
];

const phases = [
  {
    label: "Fase 01",
    title: "Settimana zero: discovery",
    goal: "Comprendere il modello operativo di riferimento per il primo caso d’uso, i sistemi coinvolti, le forme dei dati e il perimetro di rischio.",
    time: "Responsabile di business del caso d’uso, un lead di ingegneria, un lead delle operazioni. Circa due o tre sessioni di lavoro.",
    outputs: [
      "Definizione del caso d’uso con risultato di business misurabile",
      "Inventario dei sistemi e disponibilità delle interfacce (API, file, coda, solo UI)",
      "Campioni delle forme dei dati (sinistro, polizza, tipi di documento)",
      "Modello di autenticazione e di rete",
      "Checkpoint human-in-the-loop e soglie di rischio",
      "Requisiti di audit e conformità (DORA, AI Act europeo, controlli interni)",
    ],
  },
  {
    label: "Fase 02",
    title: "Settimane da una a quattro: sprint di sviluppo",
    goal: "Mettere in piedi l’integrazione end-to-end per il caso d’uso concordato, su dati reali del cliente in un ambiente non di produzione.",
    time: "Checkpoint programmati a fine settimana uno (contratti di interfaccia), settimana due (primo passaggio end-to-end), settimana quattro (accettazione utente).",
    outputs: [
      "Integrazione funzionante in un ambiente accessibile al cliente",
      "Contratti di interfaccia (forme di richiesta/risposta, semantica degli errori, policy di retry)",
      "Runbook operativo (deployment, rollback, escalation on-call)",
      "Specifica del log di audit (cosa viene registrato, dove viene archiviato, come vi si accede)",
      "Set di dati di test e harness di replay",
    ],
  },
  {
    label: "Fase 03",
    title: "Rollout progressivo",
    goal: "Portare il caso d’uso in produzione dietro una rampa controllata, poi estendere ai casi d’uso adiacenti.",
    time: "Rampa per tipo di sinistro, poi per percentuale di volume, con una copertura human-in-the-loop ampia all’inizio che si restringe man mano che la fiducia si consolida.",
    outputs: [
      "Ogni caso d’uso successivo riutilizza la superficie di integrazione costruita nella settimana zero, così il costo marginale del secondo e del terzo caso d’uso è nettamente inferiore a quello del primo.",
    ],
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "Human-in-the-loop",
    body: "Ogni decisione rilevante passa attraverso un checkpoint configurabile. Il cliente sceglie cosa è automatico, cosa viene revisionato e cosa viene approvato. Non distribuiamo agenti che operano fuori da quel perimetro.",
  },
  {
    icon: FileSignature,
    title: "Audit trail",
    body: "Ogni azione (invocazione del modello, prompt, versione del modello, conteggio dei token, intervento umano, chiamata di sistema) è registrata a livello di singolo sinistro, con hash crittografico, marca temporale ed esportabile. Questo soddisfa i requisiti di resilienza operativa di DORA e gli obblighi di trasparenza dell’AI Act europeo.",
  },
  {
    icon: Server,
    title: "Residenza dei dati",
    body: "I dati dei clienti condivisi con noi restano nella nostra infrastruttura. Non facciamo transitare i dati dei clienti attraverso fornitori di modelli terzi. Dove il cliente lo richiede, distribuiamo l’intera pipeline di elaborazione nel suo tenant cloud.",
  },
];

const tableOfContents = [
  { num: "01", label: "Sintesi", anchor: "executive-summary" },
  { num: "02", label: "Principi di integrazione", anchor: "principles" },
  { num: "03", label: "Pattern che usiamo", anchor: "patterns" },
  { num: "04", label: "Pattern nella pratica", anchor: "practice" },
  { num: "05", label: "Come consegniamo", anchor: "deliver" },
  { num: "06", label: "Impegni", anchor: "commitments" },
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
            Interno &middot; Non elencato
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
              <span className="text-subtle">Integrazione</span>
            </div>

            <h1
              className="font-display font-bold text-strong leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
            >
              Il playbook
              <br />
              <span className="italic font-normal text-accent">
                di integrazione
              </span>{" "}
              True Aim.
            </h1>

            <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mb-16">
              Come ci inseriamo nei paesaggi esistenti, quali pattern usiamo e come si svolge una prima integrazione.
            </p>
          </MotionDiv>

          {/* Spec strip */}
          <MotionDiv {...fadeIn}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Pattern", value: "5" },
                { label: "Fasi", value: "3" },
                { label: "Prima integrazione", value: "4–6 sett." },
                { label: "Residenza dei dati", value: "In-tenant" },
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
                Indice
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
                  <span>Lettura</span>
                  <span className="text-body">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Pubblico</span>
                  <span className="text-body">Eng / Ops</span>
                </div>
                <div className="flex justify-between">
                  <span>Stato</span>
                  <span className="text-accent">Attivo</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            {/* === 01 EXECUTIVE SUMMARY === */}
            <article id="executive-summary" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="01" eyebrow="Sintesi" />

                <div className="space-y-6 max-w-3xl">
                  <p className="text-body-lg text-strong font-light">
                    True Aim si integra con i sistemi core assicurativi, le piattaforme documentali, i fornitori di IA e i canali di comunicazione usando un piccolo insieme di pattern ben compresi. Partiamo dal risultato di business e procediamo a ritroso verso la superficie di integrazione. L’obiettivo è{" "}
                    <span className="font-medium text-accent">
                      la più piccola impronta di integrazione che produce il valore
                    </span>
                    , non la copertura per il suo stesso bene.
                  </p>

                  <p className="text-body leading-[1.6]">
                    I dati dei clienti condivisi con noi restano nella nostra infrastruttura. Non inviamo dati dei clienti a fornitori di modelli terzi. Ogni azione di sistema è registrata, con hash e riproducibile. Ogni decisione rilevante passa attraverso un checkpoint human-in-the-loop configurato dal cliente.
                  </p>

                  <p className="text-body leading-[1.6]">
                    Questo documento espone i principi, i pattern, due implementazioni di riferimento e come si svolge una prima integrazione in quattro-sei settimane.
                  </p>
                </div>
              </MotionDiv>
            </article>

            {/* === 02 PRINCIPLES === */}
            <article id="principles" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="02" eyebrow="Principi di integrazione" />

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
                <SectionHeader num="03" eyebrow="Pattern di integrazione che usiamo" />

                <p className="text-body leading-[1.6] max-w-2xl mb-10">
                  Un breve catalogo. La maggior parte dei progetti ne combina due o tre.
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
                          <Field label="Quando usarlo" value={pattern.when} />
                          <Field label="Come funziona" value={pattern.how} />
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
                <SectionHeader num="04" eyebrow="Pattern di riferimento nella pratica" />
              </MotionDiv>

              {/* Pattern A */}
              <MotionDiv {...fadeIn} className="mb-20">
                <div className="text-caption-sm text-accent mb-3">
                  Pattern A &middot; Assicuratore svizzero
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Decisioni complesse sui sinistri
                  <br className="hidden md:block" /> guidate dai documenti.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  Documents arrive on a customer-owned storage location. A True
                  Aim batch reader, running inside our Azure environment, pulls
                  them on a schedule. Complex claims decisioning and key data
                  extraction run on our side. A small number of external
                  enrichment calls (parts lookup, geolocation) are made for
                  specific use cases. A single policy lookup against the
                  customer&apos;s ERP provides coverage context. Users complete
                  review inside the True Aim platform. On approval, we push one
                  structured JSON file per claim with the decision, plus a
                  processing log capturing metadata, model versions, and any
                  errors, back to a return location in the customer&apos;s
                  infrastructure.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10 italic">
                  I dati dei clienti condivisi con noi restano nel tenant Azure di True Aim. Nessun dato dei clienti viene inviato a fornitori di modelli terzi.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternA />}
                  figureLabel="Fig. A"
                  caption="Pattern A: decisioni complesse sui sinistri guidate dai documenti."
                />

                <ProvesCallout>
                  We can run an end-to-end decisioning pipeline with a minimal
                  integration surface (two storage locations and one ERP API),
                  keep customer data inside our environment, and return a
                  clean, structured artifact that the customer can ingest
                  however they want.
                </ProvesCallout>
              </MotionDiv>

              {/* Pattern B */}
              <MotionDiv {...fadeIn}>
                <div className="text-caption-sm text-accent mb-3">
                  Pattern B &middot; Operazioni assicurative USA
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Orchestrazione multi-sorgente
                  <br className="hidden md:block" /> con workflow SLA.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  I dati di lavoro del cliente risiedono in più sistemi: un CRM, Google Workspace, un database Postgres, dump SQL periodici da assicuratori a monte e un canale WhatsApp per le comunicazioni in ingresso dei clienti. Un backend di orchestrazione True Aim (n8n) legge da ogni sorgente e assembla fascicoli sinistro di lavoro. Gli utenti completano il workflow di gestione dei sinistri nell’interfaccia True Aim, che traccia comunicazioni e SLA lungo tutto il ciclo di vita. Al completamento, True Aim genera un flat file standard per la reimportazione nei vari sistemi legacy degli assicuratori.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10">
                  Per un piccolo numero di workflow ad alto valore in cui non esiste un’API sul lato ricevente, un’integrazione via browser completa l’inserimento dati direttamente nell’interfaccia dell’assicuratore. Riserviamo questo pattern ai casi in cui il valore giustifica chiaramente l’impronta operativa.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternB />}
                  figureLabel="Fig. B"
                  caption="Pattern B: orchestrazione multi-sorgente con workflow SLA."
                />

                <ProvesCallout>
                  We can stand up a working surface across a fragmented backend
                  landscape without forcing the customer into a heavy
                  synchronous API build, and we can return outcomes through
                  whatever channel the receiving system actually supports.
                </ProvesCallout>
              </MotionDiv>
            </article>

            {/* === 05 HOW WE DELIVER === */}
            <article id="deliver" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="05" eyebrow="Come consegniamo" />

                <p className="text-body leading-[1.6] max-w-2xl mb-12">
                  Una prima integrazione si svolge in tre fasi. Il pattern si ripete per ogni caso d’uso successivo, con tempi più brevi man mano che la conoscenza lato cliente si consolida.
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

                        <PhaseField label="Obiettivo" value={phase.goal} />
                        <PhaseField
                          label={
                            idx === 2
                              ? "How"
                              : idx === 0
                              ? "Customer time"
                              : "Customer time"
                          }
                          value={phase.time}
                        />

                        <div>
                          <div className="text-caption-sm text-subtle mb-3">
                            {idx === 2 ? "Outcome" : "Outputs"}
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
                  eyebrow="Impegni validi in ogni fase"
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
                    Fine del documento
                  </div>
                  <h2
                    className="font-display font-bold text-strong leading-[1.05] mb-8"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
                  >
                    Volete esaminare tutto questo <br className="hidden md:block" />
                    rispetto al vostro paesaggio?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonLink href="/contact" variant="primary" size="md">
                      Avvia una sessione di discovery
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </ButtonLink>
                    <ButtonLink href="/technology" variant="secondary" size="md">
                      Come funziona la tecnologia
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
        Cosa dimostra
      </div>
      <p className="text-body-lg text-strong font-light max-w-3xl">
        {children}
      </p>
    </div>
  );
}
