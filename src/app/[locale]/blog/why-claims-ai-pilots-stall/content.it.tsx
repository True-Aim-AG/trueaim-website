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

// Short labels for the "In questa pagina" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-accuracy-illusion", heading: "L’illusione dell’accuratezza" },
  { id: "what-changes-between-demo-and-production", heading: "Cosa cambia tra demo e produzione" },
  { id: "the-three-metrics-that-matter", heading: "Le tre metriche che contano" },
  { id: "what-moves-a-pilot-forward", heading: "Cosa fa avanzare un progetto pilota" },
  { id: "operational-takeaway", heading: "Conclusione operativa" },
  { id: "key-takeaways", heading: "Punti chiave" },
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
              Tutti gli articoli
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Perché i progetti pilota di IA per i sinistri si bloccano prima di essere pronti per la produzione
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Molti progetti pilota di IA per i sinistri riportano un’accuratezza intorno al 95%. Mesi dopo, non sono ancora in produzione. La causa di fondo sta nella disciplina di misurazione e nel realismo rispetto alla produzione.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                10 min di lettura
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Approfondimento tecnico
              </div>
              <Link href="/authors/reuben-john" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                Sull’autore
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
                    Questo schema è comune in tutto il mercato. Raramente è causato da mancanza di budget o di sostegno della direzione. Nella maggior parte dei casi la causa di fondo sta nella disciplina di misurazione e nel realismo rispetto alla produzione.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Nei primi progetti pilota l’accuratezza riportata viene spesso calcolata su dati di sviluppo. Si tratta di sinistri su cui il sistema è già stato messo a punto durante la configurazione. Valutata su dati di produzione mai visti, l’accuratezza scende spesso al 70-80%. La differenza tra questi due numeri determina se un sistema può essere messo in produzione in sicurezza.
                </p>
              </MotionDiv>

              {/* The Accuracy Illusion */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-accuracy-illusion"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’illusione dell’accuratezza
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Quando qualcuno riporta un’accuratezza del 95%, la prima domanda dovrebbe essere semplice: misurata su quale set di dati?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La maggior parte dei progetti pilota si basa su set di sviluppo selezionati. Questi set sono utili per mettere a punto prompt, regole e pipeline di estrazione. Non sono rappresentativi dell’intera variabilità della produzione.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La produzione comprende varianti di polizza, formati di fattura sconosciuti, differenze linguistiche, casi limite rari e qualità dei dati incoerente. Un modello che funziona bene su dati selezionati può fallire silenziosamente sui sinistri reali.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ciò che conta è la prestazione su un set di holdout: sinistri che il sistema non ha mai visto, estratti direttamente dagli archivi di produzione, stratificati per approvazione e rifiuto, importo del sinistro, lingua, marca del veicolo e complessità dei documenti.
                </p>

                {/* Key stat callout */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-semibold text-strong">
                      Il divario nella pratica
                    </h3>
                  </div>
                  <p className="text-sm text-muted">
                    Quel divario non era dovuto al caso. Ha messo in luce logiche di copertura mancanti, lacune di vocabolario e debolezze strutturali dell’estrazione.
                  </p>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Un progetto pilota misurato solo su dati di sviluppo crea fiducia. Un progetto pilota misurato su un set di holdout crea chiarezza.
                  </p>
                </div>
              </MotionDiv>

              {/* What Changes Between Demo and Production */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-changes-between-demo-and-production"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Cosa cambia tra demo e produzione
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Il passaggio dalla demo alla produzione introduce uno spostamento della distribuzione. Le caratteristiche dei sinistri reali differiscono in modo significativo dai dati di test.
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
                          Complessità della copertura
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Inizialmente avevamo modellato meno categorie di copertura di quante la produzione richiedesse. Quando nuove categorie sono entrate nella pipeline, il sistema ha prodotto risultati ad alta confidenza ma errati. Dopo l’estensione della logica di copertura, l’accuratezza è migliorata sensibilmente in una sola iterazione.
                    </p>
                    <div className="mt-4 p-3 bg-lilac rounded-pill">
                      <p className="text-sm font-medium text-accent">
                        Il modello non era instabile. Il modello di dominio era incompleto.
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
                          Complessità linguistica
                        </h3>
                        <p className="text-sm text-muted">
                          Tedesco e francese richiedono una gestione separata
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      I sinistri in tedesco e in francese hanno richiesto vocabolari e logiche di gestione separati. Le parole composte tedesche si comportano diversamente dalla terminologia francese. Senza una modellazione esplicita, intere classi di sinistri validi venivano respinte.
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
                          Struttura dei documenti
                        </h3>
                        <p className="text-sm text-muted">
                          Le variazioni di layout causano errori di estrazione
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Fatture a più colonne, interruzioni di pagina, voci di fattura duplicate e differenze di layout hanno portato a importi mancanti o contati due volte quando la logica di estrazione non teneva conto del formato.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mt-6">
                  Sono realtà operative ordinarie, non casi limite rari. Se un progetto pilota non è stato messo alla prova in queste condizioni, l’accuratezza riportata è solo parzialmente informativa.
                </p>
              </MotionDiv>

              {/* The Three Metrics That Matter */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-three-metrics-that-matter"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le tre metriche che contano
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Un singolo valore di accuratezza nasconde compromessi operativi. Tre metriche offrono una visibilità migliore sulla prontezza per la produzione.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="denied" emphasis="light" size="sm">Tasso di false approvazioni</StatusPill>
                    </div>
                    <p className="text-sm text-body mb-2">
                      Misura l’esposizione finanziaria. Una falsa approvazione significa che un sinistro è stato pagato per errore. Anche una piccola percentuale può incidere in modo rilevante su leakage ed esposizione agli audit.
                    </p>
                    <p className="text-xs text-subtle">
                      Ridurre il tasso di false approvazioni a un livello accettabile ha richiesto un’estensione strutturata del dominio, un affinamento del vocabolario e una calibrazione delle soglie.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="referred" emphasis="light" size="sm">Tasso di falsi rifiuti</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Misura l’impatto sui clienti e sulle operazioni. I rifiuti errati generano reclami, rilavorazioni, escalation e rischio reputazionale.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="progress" emphasis="light" size="sm">Tasso di rinvio</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Misura la profondità dell’automazione. Se una grande percentuale di sinistri viene rinviata a revisori umani, il sistema non ha ridotto il carico di lavoro in modo sostanziale.
                    </p>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    Prima di avviare le discussioni sulla produzione, chiedete ai fornitori queste tre metriche, misurate su un set di holdout correttamente definito e suddivise per tipo di sinistro e lingua. Se non sono in grado di fornire questo livello di dettaglio, il progetto pilota non ha ancora raggiunto la maturità operativa.
                  </p>
                </div>
              </MotionDiv>

              {/* What Moves a Pilot Forward */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-moves-a-pilot-forward"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Cosa fa avanzare un progetto pilota
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  I progressi non sono arrivati sostituendo la tecnologia. Sono arrivati da cicli di valutazione disciplinati.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Abbiamo costruito un set di holdout stratificato per esito, importo, lingua e complessità strutturale. Un liquidatore senior ha etichettato ogni sinistro. Quel set è stato messo in quarantena e mai usato per la messa a punto.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Il ciclo di iterazione
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Misurare", "Diagnosticare", "Correggere", "Ritestare"].map(
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
                    Ogni iterazione ha seguito lo stesso ciclo. Un’architettura ibrida si è rivelata necessaria. Regole deterministiche hanno gestito le definizioni di copertura chiare e la logica strutturata. I modelli linguistici hanno gestito le descrizioni ambigue e l’interpretazione contestuale. Ogni componente è stato limitato al ruolo che svolge meglio.
                  </p>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Soglie di confidenza per scelta progettuale
                  </h3>
                  <p className="text-sm text-body leading-[1.6]">
                    Le soglie di confidenza erano asimmetriche per scelta. Le approvazioni richiedevano una confidenza più alta dei rifiuti. Le decisioni a bassa confidenza venivano indirizzate alla revisione umana per proteggersi dall’esposizione finanziaria.
                  </p>
                </div>

                {/* Results callout */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display font-semibold text-strong">
                      Risultati
                    </h3>
                  </div>
                  <p className="text-sm text-body">
                    Il singolo miglioramento più grande è derivato dall’estensione delle categorie di copertura, non dal cambio di modelli. La modellazione del dominio e la disciplina di misurazione sono state i principali fattori di stabilità.
                  </p>
                </div>
              </MotionDiv>

              {/* Operational Takeaway */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="operational-takeaway"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Conclusione operativa
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Molti progetti pilota di IA per i sinistri si bloccano perché vengono misurati con ottimismo e sviluppati in modo incrementale senza una valutazione strutturata. Superare il plateau del 70-80% richiede:
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Un set di holdout correttamente stratificato, derivato da dati di produzione reali",
                    "Una separazione chiara tra false approvazioni, falsi rifiuti e rinvii",
                    "Una modellazione esplicita della copertura su tutte le categorie di polizza",
                    "Un vocabolario specifico per lingua",
                    "Soglie di confidenza allineate al rischio finanziario e operativo",
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
                    L’automazione dei sinistri è realizzabile. Richiede misurazioni oneste, metriche chiare e un’ingegneria del dominio deliberata.
                  </p>
                </div>

                <p className="mt-6 text-body leading-[1.6]">
                  Se state valutando un progetto pilota o preparando la messa in produzione e volete confrontare il vostro approccio con un quadro di holdout strutturato, siamo disponibili a condividere come strutturiamo valutazione e iterazione.
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
                      "L’accuratezza sul set di sviluppo nasconde i divari in produzione",
                      "I set di holdout rivelano le prestazioni reali",
                      "Monitorare false approvazioni, falsi rifiuti e tasso di rinvio",
                      "La modellazione del dominio porta più miglioramenti dei cambi di modello",
                      "Soglie di confidenza asimmetriche proteggono dal rischio finanziario",
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
            <BarChart3 className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Pronti ad andare oltre il progetto pilota?
            </h2>
            <p className="text-lg text-body mb-10">
              Possiamo aiutarvi a strutturare quadri di valutazione che trasformano i progetti pilota in sistemi pronti per la produzione.
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
