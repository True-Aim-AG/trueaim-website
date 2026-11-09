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

// Short labels for the "In questa pagina" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "what-regulators-actually-want", heading: "Cosa vogliono davvero le autorità di vigilanza" },
  { id: "the-evidence-chain-architecture", heading: "L’architettura della catena delle prove" },
  { id: "quality-gates-the-audit-checkpoint", heading: "Quality gate: il checkpoint di audit" },
  { id: "failure-modes-that-break-audit-trails", heading: "Le modalità di errore che spezzano gli audit trail" },
  { id: "regulatory-mapping-quick-reference", heading: "Mappatura normativa in sintesi" },
  { id: "core-principles-for-auditable-ai", heading: "Principi fondamentali per un’IA verificabile" },
  { id: "next-steps", heading: "Prossimi passi" },
  { id: "key-takeaways", heading: "Punti chiave" },
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
              Tutti gli articoli
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Verificabilità dell’IA per i sinistri: costruire catene delle prove che i revisori accettano davvero
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Tutti dicono che la loro IA è spiegabile. Pochi sanno dimostrarlo a un revisore. Ecco l’architettura che lo rende possibile.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min di lettura
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Approfondimento tecnico
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
                    Quando le autorità di vigilanza chiedono «perché il vostro sistema ha approvato questo sinistro?», non vogliono sentir parlare di pesi di attenzione o valori SHAP. Vogliono cliccare su un campo e vedere esattamente da dove proviene. Vogliono rieseguire una decisione di sei mesi fa e ottenere la stessa risposta. Vogliono sapere quando un essere umano è intervenuto e perché.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Questo riflette la nostra esperienza di deployment. Nel nostro lavoro con NSA Services SA, ogni decisione registra il documento di origine, la pagina e la clausola di polizza su cui si fonda. Le sezioni che seguono descrivono l’architettura che lo consente e i requisiti normativi che soddisfa.
                </p>
              </MotionDiv>

              {/* What Regulators Actually Want */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-regulators-actually-want"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Cosa vogliono davvero le autorità di vigilanza
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Traduciamo il linguaggio normativo in specifiche tecniche.
                </p>

                {/* FINMA */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    Comunicazione FINMA 08/2024 (Svizzera)
                  </h3>
                  <p className="text-body leading-[1.6] mb-4">
                    La Svizzera non ha una legge specifica sull’IA. La FINMA applica invece ai sistemi di IA requisiti di governance tecnologicamente neutrali, inquadrando i rischi dell’IA come{" "}
                    <span className="font-semibold text-strong">
                      rischi operativi
                    </span>
                    :
                  </p>
                  <ul className="space-y-2 text-sm text-body">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Rischi di modello:
                        </strong>{" "}
                        robustezza, correttezza, bias, spiegabilità
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Rischi IT/cyber:
                        </strong>{" "}
                        sicurezza, disponibilità, integrità
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Rischi di dipendenza da terzi:
                        </strong>{" "}
                        lock-in del fornitore, concentrazione
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted mt-4 italic">
                    La FINMA rileva esplicitamente che i «risultati dell’IA spesso non possono essere compresi, spiegati o riprodotti». Questo è il problema che dovete risolvere.
                  </p>
                </div>

                {/* EU AI Act */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    AI Act europeo
                  </h3>
                  <p className="text-body leading-[1.6]">
                    L’AI Act europeo (il regolamento sull’IA) classifica la valutazione del rischio e la determinazione dei prezzi nell’assicurazione vita e salute come{" "}
                    <span className="font-semibold text-strong">
                      ad alto rischio
                    </span>
                    . L’automazione dei sinistri non è esplicitamente elencata come ad alto rischio, ma si applicano obblighi di trasparenza. L’EIOPA sottolinea governance e gestione dei rischi allineate alla regolamentazione assicurativa esistente.
                  </p>
                </div>

                {/* What This Means */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Cosa significa in pratica
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Ogni decisione deve avere una catena delle prove tracciabile",
                      "Gli interventi umani devono essere registrati con motivazione",
                      "Dovete poter riprodurre una decisione di 6 mesi fa",
                      '«Lo ha detto il modello» non è una spiegazione accettabile',
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
                    Punto chiave: alle autorità di vigilanza non interessa l’architettura del vostro modello. Interessa la vostra catena delle prove.
                  </p>
                </div>
              </MotionDiv>

              {/* The Evidence Chain Architecture */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-evidence-chain-architecture"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’architettura della catena delle prove
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Usiamo tre livelli di tracciabilità. Ogni livello risponde a una domanda di audit diversa.
                </p>

                {/* Layer 1 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Livello 1: provenienza dal campo alla fonte
                      </h3>
                      <p className="text-sm text-muted">
                        «Da dove viene questo numero?»
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Ogni campo estratto deve essere collegato a: documento di origine, numero di pagina, posizione (coordinate) e confidenza di estrazione.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Field: [extracted_field_name]
Value: [extracted_value]
Source: [document.pdf], Page X
Location: [bounding box coordinates]
Confidence: [high/medium/low]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Quando un revisore chiede «da dove viene questo valore?», cliccate e gli mostrate la posizione esatta nel documento di origine. Niente supposizioni, niente ricerche.
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
                        Livello 2: audit trail delle decisioni
                      </h3>
                      <p className="text-sm text-muted">
                        «Perché questo sinistro è stato approvato?»
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Ogni decisione deve registrare: hash degli input, versione del modello, punteggio di confidenza, timestamp e livello decisionale.
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
                    Il nostro sistema usa una cascata decisionale a più livelli, che parte da regole deterministiche e ricorre all’IA solo quando necessario. Ogni livello viene registrato, così sapete esattamente quale metodo ha preso la decisione.
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
                        Livello 3: registrazione degli interventi umani
                      </h3>
                      <p className="text-sm text-muted">
                        «Perché un essere umano ha cambiato questa decisione?»
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Ogni intervento umano deve registrare: decisione originale dell’IA, decisione umana, motivo dell’intervento (campo obbligatorio), identità del revisore e timestamp.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Original decision: [AI decision with confidence]
Override decision: [human decision]
Reason: [required justification text]
Reviewer: [authenticated user ID]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Questo crea un ciclo di feedback: gli schemi degli interventi rivelano le lacune del sistema. Se i liquidatori annullano sistematicamente i rifiuti per lo stesso motivo, è un segnale per migliorare il sistema.
                  </p>
                </div>
              </MotionDiv>

              {/* Quality Gates */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="quality-gates-the-audit-checkpoint"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quality gate: il checkpoint di audit
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Usiamo un quality gate a tre stati che determina quando l’automazione procede e quando devono intervenire le persone.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      state: "PASS",
                      tone: "approved" as const,
                      desc: "Tutti i campi obbligatori presenti, confidenza sopra la soglia.",
                      action:
                        "Procedere automaticamente. Registrare la decisione con la catena delle prove completa. Nessuna revisione umana richiesta.",
                    },
                    {
                      state: "WARN",
                      tone: "referred" as const,
                      desc: "Confidenza sotto la soglia OPPURE campo non critico mancante.",
                      action:
                        "Procedere con segnalazione. Inviare alla coda di campionamento. Una persona può revisionare o saltare.",
                    },
                    {
                      state: "FAIL",
                      tone: "denied" as const,
                      desc: "Campo critico mancante OPPURE confidenza molto bassa OPPURE violazione di una regola.",
                      action:
                        "Bloccare l’automazione. Inviare a un liquidatore. Richiedere una decisione umana esplicita.",
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
                    Asimmetria della confidenza
                  </h3>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Usiamo soglie asimmetriche:
                  </p>
                  <ul className="space-y-2 text-sm text-body mb-4">
                    <li>
                      <strong className="text-approved-dark">
                        Per le approvazioni:
                      </strong>{" "}
                      richiesta una soglia di confidenza più alta
                    </li>
                    <li>
                      <strong className="text-referred-dark">
                        Per i rifiuti:
                      </strong>{" "}
                      accettabile una soglia di confidenza più bassa
                    </li>
                    <li>
                      <strong className="text-muted">
                        Sotto le soglie:
                      </strong>{" "}
                      invio alla revisione umana
                    </li>
                  </ul>
                  <p className="text-sm text-body">
                    Perché asimmetriche? Le false approvazioni costano di più: perdita finanziaria più rischio normativo. I falsi rifiuti possono essere contestati dal cliente. Non è bias, è gestione del rischio.
                  </p>
                  <div className="mt-4 p-3 bg-lilac rounded-pill">
                    <p className="text-sm font-medium text-accent">
                      Risultato: abbiamo ridotto il nostro tasso di REFER_TO_HUMAN dal 60% a meno del 5%.
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
                  Le modalità di errore che spezzano gli audit trail
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Gli errori seguenti, individuati nei nostri stessi test, sono quelli che le autorità di vigilanza hanno più probabilità di rilevare:
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Errori di estrazione senza provenienza",
                      symptom:
                        "Un valore è stato estratto in modo errato, ma non c’è alcun collegamento alla fonte",
                      impact:
                        "Senza provenienza non potete spiegare l’errore",
                      fix: "Ogni valore estratto è collegato alla posizione nella fonte",
                    },
                    {
                      title: "Decisioni basate su dati non disponibili",
                      symptom:
                        "Il sistema ha preso una decisione, ma un’informazione chiave non era nel set di documenti",
                      impact:
                        "Il sistema aveva ragione sulla base dei dati disponibili, ma il revisore non lo sa",
                      fix: "Documentare quali informazioni erano disponibili al momento della decisione",
                    },
                    {
                      title: "Logica di approvazione per default",
                      symptom: "Accuratezza complessiva elevata, ma decisioni sbagliate per i motivi sbagliati",
                      impact:
                        'Non si può spiegare perché è stato approvato, solo «nessun errore trovato»',
                      fix: "Richiedere una conferma esplicita della copertura, non l’assenza di un rifiuto",
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
                            Sintomo
                          </span>
                          <span className="text-body">
                            {fm.symptom}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Impatto sull’audit
                          </span>
                          <span className="text-body">
                            {fm.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Correzione
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
                    Cosa non funziona per la spiegabilità
                  </h3>
                  <ul className="space-y-3 text-sm text-body">
                    <li>
                      <strong className="text-denied-dark">Valori SHAP/LIME:</strong>{" "}
                      Tecnicamente interessanti, privi di significato per i liquidatori. «La variabile X ha contribuito per 0,3 alla decisione» non è una spiegazione.
                    </li>
                    <li>
                      <strong className="text-denied-dark">Pesi di attenzione:</strong>{" "}
                      «Il modello si è concentrato su queste parole» non spiega PERCHÉ la decisione è stata presa.
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Punteggi di confidenza da soli:
                      </strong>{" "}
                      «Confidenza dell’87%» non è una spiegazione. Serve: «confidenza dell’87% PERCHÉ [prova]».
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Motivazioni a posteriori:
                      </strong>{" "}
                      Generare spiegazioni dopo la decisione rischia di creare uno scostamento tra spiegazione e logica reale. I revisori lo metteranno alla prova.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Punto chiave: spiegabilità significa mostrare il proprio lavoro, non descrivere ciò che si prova riguardo alla risposta.
                  </p>
                </div>
              </MotionDiv>

              {/* Regulatory Mapping */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="regulatory-mapping-quick-reference"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Mappatura normativa in sintesi
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          Requisito
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          FINMA 08/2024
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          AI Act europeo
                        </th>
                        <th className="text-left py-3 font-display text-strong font-medium">
                          Come rispondere
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
                      {[
                        [
                          "Documentazione",
                          "Applicazioni rilevanti",
                          "Obblighi di trasparenza",
                          "Model card, log delle decisioni, controllo di versione",
                        ],
                        [
                          "Tracciabilità",
                          "I risultati devono essere spiegabili",
                          "Conservazione dei registri per impatto elevato",
                          "Provenienza dal campo alla fonte",
                        ],
                        [
                          "Riproducibilità",
                          '«Spesso non riproducibili» (il problema)',
                          "Implicita",
                          "Hashing degli input, versionamento dei modelli",
                        ],
                        [
                          "Sorveglianza umana",
                          "Richiesta per le decisioni rilevanti",
                          "Richiesta per l’alto rischio",
                          "Quality gate, registrazione degli interventi",
                        ],
                        [
                          "Meccanismi di fallback",
                          "Esplicitamente richiesti",
                          "Attesi",
                          "Cascata a livelli, coda umana",
                        ],
                        [
                          "Classificazione del rischio",
                          "Atteso un inventario centralizzato",
                          "Alto rischio per la tariffazione vita/salute",
                          "Registro dei casi d’uso con tag di rischio",
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
                  Principi fondamentali per un’IA verificabile
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <p className="text-sm text-body leading-[1.6] mb-6">
                    Costruire sistemi di IA pronti per l’audit richiede l’impegno su quattro principi fondamentali. L’implementazione specifica varia da organizzazione a organizzazione, ma questi principi restano costanti.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Provenienza completa
                        </h3>
                        <p className="text-sm text-body">
                          Ogni valore estratto deve essere tracciabile fino al documento di origine e alla posizione.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Riproducibilità delle decisioni
                        </h3>
                        <p className="text-sm text-body">
                          Dati gli stessi input e la stessa versione del modello, dovete poter riprodurre qualsiasi decisione storica.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Responsabilità umana
                        </h3>
                        <p className="text-sm text-body">
                          Ogni intervento umano deve essere registrato con motivazione obbligatoria e identità del revisore.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Validazione continua
                        </h3>
                        <p className="text-sm text-body">
                          Test regolari delle decisioni storiche per verificare che il vostro audit trail resti intatto.
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
                  Prossimi passi
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      num: "1",
                      title: "Verificate la vostra attuale catena delle prove",
                      desc: "Potete risalire da qualsiasi campo alla sua fonte?",
                    },
                    {
                      num: "2",
                      title: "Testate la riproducibilità",
                      desc: "Rieseguite una decisione di 3 mesi fa. Stesso output?",
                    },
                    {
                      num: "3",
                      title: "Documentate i criteri del vostro quality gate",
                      desc: "Cosa attiva una revisione umana?",
                    },
                    {
                      num: "4",
                      title: "Mappate la vostra architettura su FINMA e AI Act",
                      desc: "Usate la tabella sopra come punto di partenza.",
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
                    L’obiettivo non è un’IA perfetta. È un’IA difendibile: sistemi in cui ogni decisione può essere spiegata, ogni campo tracciato e ogni intervento umano documentato. È ciò che vogliono le autorità di vigilanza. È ciò che i revisori accettano.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  Basato sull’esperienza di deployment di True Aim nei sinistri di garanzia auto e sull’analisi normativa della comunicazione FINMA 08/2024, dell’AI Act europeo e dei quadri di governance dell’EIOPA.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Punti chiave
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {[
                      "Architettura della catena delle prove a tre livelli",
                      "Tracciamento della provenienza dal campo alla fonte",
                      "Audit trail delle decisioni con hashing degli input",
                      "Registrazione degli interventi umani con motivazione obbligatoria",
                      "Quality gate che soddisfano i revisori",
                      "Mappatura di conformità FINMA e AI Act",
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
            <aside aria-label="Navigazione nell’articolo">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  In questa pagina
                </h2>
                <nav aria-label="In questa pagina">
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
                    Vai al Trust Center
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
              State costruendo un’IA verificabile?
            </h2>
            <p className="text-lg text-body mb-10">
              Possiamo aiutarvi a progettare architetture della catena delle prove che soddisfano autorità di vigilanza e revisori.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Contattaci
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                Guardalo in azione
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
