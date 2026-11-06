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

// Short labels for the "In questa pagina" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-wrong-question", heading: "La domanda sbagliata" },
  { id: "when-to-build", heading: "Quando sviluppare" },
  { id: "when-to-buy", heading: "Quando acquistare" },
  { id: "the-vendor-evaluation-framework", heading: "Il quadro di valutazione dei fornitori" },
  { id: "the-demo-checklist", heading: "La checklist per la demo" },
  { id: "the-hybrid-path", heading: "La via ibrida" },
  { id: "next-steps", heading: "Prossimi passi" },
  { id: "key-takeaways", heading: "Punti chiave" },
];

export default async function BuildVsBuyBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "12% 88%" }} />

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
              Sviluppare o acquistare: cosa esigere dai fornitori di IDP
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Un quadro di valutazione pratico per i team assicurativi che valutano soluzioni di automazione dei sinistri
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                15 min di lettura
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Guida strategica
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
                  La domanda sbagliata
                </h2>

                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    «Dobbiamo sviluppare o acquistare la nostra IA per i sinistri?»
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  È la domanda sbagliata. I fornitori vi mostreranno demo impeccabili. I vostri sviluppatori prometteranno di poter «usare semplicemente GPT-4». Nessuna delle due prospettive coglie la realtà.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La domanda giusta:{" "}
                  <strong className="text-strong">
                    Cosa deve essere vero perché funzioni in produzione, e chi può davvero renderlo vero?
                  </strong>
                </p>

                <p className="text-body leading-[1.6]">
                  Nel nostro deployment presso NSA Services SA, True Aim è passata dal primo test a un sistema funzionante in sette giorni e ha ridotto dell’86% il tempo degli esperti sui sinistri complessi. Il quadro che segue illustra come valutare i fornitori di IA per i sinistri sulla base di evidenze anziché di dimostrazioni.
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
                    Quando sviluppare
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Sviluppare è un investimento in competenze, non un risparmio sui costi. Sceglietelo per ragioni strategiche, non per timore dei fornitori.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Sviluppare ha senso quando:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "La logica delle vostre polizze è davvero unica",
                        desc: "Se le vostre regole di copertura non si possono configurare in un prodotto di mercato, combatterete per sempre contro il loro sistema.",
                      },
                      {
                        title:
                          "Avete capacità di ingegneria ML, e sapete trattenerla",
                        desc: "L’uscita di un ingegnere non dovrebbe paralizzare il vostro sistema.",
                      },
                      {
                        title: "La gestione dei sinistri è il vostro vantaggio competitivo",
                        desc: "Alcuni assicuratori si differenziano per la rapidità nella gestione dei sinistri. La maggior parte no.",
                      },
                      {
                        title: "I requisiti normativi impongono il pieno controllo",
                        desc: "Residenza dei dati in Svizzera e nell’UE, audit trail, spiegabilità: alcune autorità di vigilanza vogliono tutto in-house.",
                      },
                      {
                        title:
                          "Siete pronti ad aspettare 12-18 mesi prima della produzione",
                        desc: "È una tempistica realistica per uno sviluppo interno.",
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
                    Trappole dello sviluppo da evitare:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «Useremo semplicemente GPT-4.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          Vi scontrerete con lo stesso tetto di accuratezza di tutti gli altri. Un modello linguistico generalista non applicherà in modo affidabile le vostre condizioni di polizza senza un insieme di regole definito.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «I nostri sviluppatori ci arriveranno.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          Il dominio dei sinistri è profondo. Parole composte tedesche come{" "}
                          <em>Abgasrückführungsventil</em> (valvola di ricircolo dei gas di scarico) richiedono un vocabolario automobilistico che non si trova su Stack Overflow.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «Non vogliamo dipendere da un fornitore.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          La scambierete con una dipendenza interna: dagli ingegneri che capiscono il vostro sistema su misura.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Build */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Il costo reale dello sviluppo:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>• 2-4 ingegneri ML per oltre 12 mesi</li>
                    <li>
                      • Tempo degli esperti di dominio per etichettatura e validazione (circa 20 ore-persona per una ground truth di 50 sinistri)
                    </li>
                    <li>
                      • Manutenzione continua: i modelli derivano, i formati dei documenti cambiano
                    </li>
                    <li>• Costo opportunità di non rilasciare prima</li>
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
                    Quando acquistare
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Acquistare è un compromesso a favore del time-to-market. Sceglietelo perché date valore al tempo, non perché lo ritenete «più facile».
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Acquistare ha senso quando:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Vi servono risultati in produzione in 3-6 mesi",
                        desc: "I fornitori hanno risolto problemi che non avete ancora incontrato.",
                      },
                      {
                        title:
                          "Non avete (o non volete costruire) capacità ML",
                        desc: "Assumere e trattenere ingegneri ML è difficile.",
                      },
                      {
                        title: "I vostri tipi di sinistro sono relativamente standard",
                        desc: "Auto, property, salute: i fornitori li hanno già visti.",
                      },
                      {
                        title:
                          "Volete un IT concentrato sull’integrazione, non sulla costruzione di modelli",
                        desc: "Il vostro vantaggio competitivo probabilmente non sta nella ricerca sull’IA.",
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
                    Trappole dell’acquisto da evitare:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «Hanno fatto una demo fantastica.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          I dati delle demo sono selezionati. Il nostro sistema era impeccabile sui documenti tedeschi finché non abbiamo elaborato sinistri francesi. Tutti i 25 sinistri approvati sono stati respinti erroneamente.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «Dicono 99% di accuratezza.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          Chiedete: accuratezza su cosa? Sul loro set di test o sui vostri documenti? Accuratezza delle decisioni ≠ accuratezza di business.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          «È plug and play.»
                        </span>
                        <p className="text-sm text-body mt-1">
                          L’integrazione è sempre più difficile del promesso. I formati dei documenti variano. I nomi dei campi differiscono. La struttura delle vostre polizze ha le sue particolarità.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Buy */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Il costo reale dell’acquisto:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>
                      • Canoni di licenza (per sinistro, per documento o per piattaforma)
                    </li>
                    <li>
                      • Sforzo di integrazione (di norma 3-6 mesi, non 3-6 settimane)
                    </li>
                    <li>• Ottimizzazione continua (dovrete comunque fare tuning)</li>
                    <li>
                      • Dipendenza dal fornitore (e se cambia strategia, fallisce o viene acquisito?)
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
                    Il quadro di valutazione dei fornitori
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Un approccio sistematico per confrontare i fornitori. Pesate le categorie in base alle vostre priorità.
                </p>

                {/* Category 1: Accuracy */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Categoria 1: accuratezza e valutazione
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Peso 30%
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Domanda
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Cosa cercare
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Qual è la vostra accuratezza sul set di holdout?
                          </td>
                          <td className="py-2">
                            Percentuale specifica, metodologia spiegata
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Qual è il vostro tasso di false approvazioni?
                          </td>
                          <td className="py-2">Monitorato separatamente, inferiore al 5%</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Potete mostrare le categorie di errore?
                          </td>
                          <td className="py-2">
                            Esiste una tassonomia, il miglioramento è monitorato
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Quante iterazioni per raggiungere l’accuratezza attuale?
                          </td>
                          <td className="py-2">Mostra disciplina, non fortuna</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    <strong className="text-denied-dark">Segnali d’allarme:</strong>{" "}
                    «La nostra accuratezza è del 99%» senza spiegare la metodologia di holdout. Noi abbiamo tracciato 14 modalità di errore distinte tra matching, estrazione, logica di copertura e calcolo.
                  </p>
                </div>

                {/* Category 2: Auditability */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Categoria 2: verificabilità
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Peso 25%
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Domanda
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Cosa cercare
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Posso risalire da qualsiasi campo al documento di origine?
                          </td>
                          <td className="py-2">A livello di pagina e di carattere</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Registrate versione del modello e confidenza?
                          </td>
                          <td className="py-2">Audit trail completo</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Potete riprodurre una decisione di sei mesi fa?
                          </td>
                          <td className="py-2">Piena riproducibilità</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Come registrate gli interventi umani che modificano la decisione?
                          </td>
                          <td className="py-2">Con motivazione obbligatoria</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Per i processi regolamentati in Svizzera e nell’UE, la verificabilità non è negoziabile.
                  </p>
                </div>

                {/* Category 3: Architecture */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Categoria 3: architettura
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Peso 20%
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Domanda
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Cosa cercare
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quale percentuale è deterministica e quale è ML?
                          </td>
                          <td className="py-2">
                            Più deterministico = meno rischio
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quali sono le vostre soglie di confidenza?
                          </td>
                          <td className="py-2">Asimmetriche, configurabili</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Come rilevate gli spostamenti di distribuzione?
                          </td>
                          <td className="py-2">Monitoraggio attivo</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Qual è il vostro workflow human-in-the-loop?
                          </td>
                          <td className="py-2">Console QA completa</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    La nostra architettura: il 57% delle voci è gestito da regole deterministiche (costo LLM zero). Una percentuale deterministica più alta = costi più bassi e maggiore spiegabilità.
                  </p>
                </div>

                {/* Categories 4 & 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Costi e operazioni
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        15%
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Dettaglio del costo per sinistro</li>
                      <li>• Limiti di token, circuit breaker</li>
                      <li>• Latenze P50, P95, P99</li>
                      <li>• Gestione nella lingua nativa</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Rischio e sicurezza
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        10%
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Modalità di errore documentate</li>
                      <li>• Test di regressione automatizzati</li>
                      <li>• Passaggio controllato all’operatore umano</li>
                      <li>• Residenza dei dati UE/Svizzera</li>
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
                    La checklist per la demo
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Cosa esigere quando i fornitori presentano.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Prima della demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Inviate 10-20 dei VOSTRI sinistri</li>
                      <li>• Includete casi limite: multilingue, scansioni di scarsa qualità</li>
                      <li>• Definite in anticipo i criteri di successo</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Durante la demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Fate girare il sistema sui VOSTRI documenti</li>
                      <li>• Chiedete di vedere un errore</li>
                      <li>• Navigate fino alla provenienza di un campo</li>
                      <li>• Richiedete i punteggi di confidenza</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Dopo la demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Confrontate l’accuratezza dichiarata con quella reale</li>
                      <li>• Contate le risposte del tipo «lo sistemiamo con il tuning»</li>
                      <li>• Valutate: il vostro team potrebbe usarlo ogni giorno?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-3">
                    Lo stress test da 5 minuti
                  </h3>
                  <p className="text-sm text-body">
                    Prendete il vostro sinistro più strano. Una parola composta tedesca come{" "}
                    <em>Zylinderkopfdichtung</em> (guarnizione della testata) con un formato di fattura francese e una decisione di copertura al limite. Se non riescono a elaborarlo in diretta, il loro «99% di accuratezza» non vale per la vostra realtà.
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
                    La via ibrida
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Considerate la via di mezzo. Sviluppate una parte, acquistate il resto.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Acquistare
                      </h3>
                      <p className="text-sm text-body">
                        Estrazione dei documenti, OCR, classificazione: i fornitori sono bravi nella comprensione generica dei documenti
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Sviluppare
                      </h3>
                      <p className="text-sm text-body">
                        Regole di business specifiche delle polizze, logica di copertura: nel vostro dominio siete voi i più bravi
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Mantenere il controllo
                      </h3>
                      <p className="text-sm text-body">
                        Quadro di valutazione, ground truth, monitoraggio della qualità. Mantenete il controllo del livello decisionale
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Perché funziona:</strong>{" "}
                    I fornitori gestiscono le parti standard. Voi gestite le parti differenzianti. Potete cambiare fornitore senza riscrivere le regole. Mantenete il controllo di audit sulle decisioni finali.
                  </p>
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

                <div className="space-y-4 mb-8">
                  {[
                    {
                      num: "1",
                      title: "Distinguere gli indispensabili dai desiderabili",
                      desc: "La verificabilità non è negoziabile. L’ottimizzazione automatica sì.",
                    },
                    {
                      num: "2",
                      title: "Preparare il vostro set di sinistri per la demo",
                      desc: "Venti sinistri, inclusi i vostri casi limite e documenti multilingue.",
                    },
                    {
                      num: "3",
                      title: "Costruire la vostra scorecard prima della prima chiamata con un fornitore",
                      desc: "Non lasciate che le demo ancorino i vostri criteri di valutazione.",
                    },
                    {
                      num: "4",
                      title: "Decidere: cosa volete controllare nel lungo periodo?",
                      desc: "Il livello decisionale? Il livello di estrazione? L’intero stack?",
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
                    L’obiettivo non è evitare i fornitori né evitare di sviluppare. È prendere una decisione informata in base alla vostra situazione, alle vostre tempistiche e alle vostre capacità.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  True Aim AG costruisce sistemi di IA verificabili per i mercati regolamentati svizzeri e dell’UE. Questo quadro riflette la nostra esperienza di deployment.
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
                      "Sviluppare per una capacità strategica, non per risparmiare",
                      "Acquistare per il time-to-market, non per la semplicità",
                      "Quadro di valutazione dei fornitori in 5 categorie",
                      "Checklist per la demo: prima, durante, dopo",
                      "La via ibrida: acquistare lo standard, sviluppare la differenziazione",
                      "La verificabilità non è negoziabile",
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
            <Scale className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              State valutando fornitori di IA per i sinistri?
            </h2>
            <p className="text-lg text-body mb-10">
              Possiamo aiutarvi a costruire un quadro di valutazione su misura per i vostri requisiti e a condurre confronti oggettivi tra fornitori.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Contattaci
              </ButtonLink>
              <ButtonLink href="/blog/auditability-evidence-chains" variant="on-dark" size="lg">
                Leggi: verificabilità
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
