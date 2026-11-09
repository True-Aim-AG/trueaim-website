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
import { operations } from "./operations.it";
import { faqs } from "./faqs.it";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "In questa pagina" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "three-operations", heading: "Le tre operazioni fondamentali" },
  { id: "computing-belongs-to-rules", heading: "Perché il calcolo spetta alle regole" },
  { id: "where-a-model-earns-its-place", heading: "Dove un modello si guadagna il posto" },
  { id: "when-you-cannot-separate", heading: "Quando non si possono separare le due cose" },
  { id: "one-claim", heading: "Il confine su un singolo sinistro" },
  { id: "handover-points", heading: "Dove si fermano le regole" },
  { id: "how-true-aim-draws-the-line", heading: "Come True Aim traccia il confine" },
  { id: "claim-record", heading: "Cosa dovrebbe mostrare un fascicolo sinistro" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const modelJobs: NumberedItem[] = [
  {
    title: "Estrazione da documenti e prove (Lettura)",
    body: "Le regole non sanno leggere una fotografia o una nota scritta a mano. Gli agenti basati su modelli linguistici sì. Trasformare prove non strutturate in fatti strutturati è il lavoro che riesce loro meglio. La disciplina sta nel mantenere ogni agente circoscritto a un compito. Un agente che si limita a estrarre è molto più facile da controllare di uno che legge, estrae, ordina e spiega in un unico passaggio.",
  },
  {
    title: "Risoluzione marcata delle ambiguità (Giudizio)",
    body: "Quando una voce è davvero ambigua e nessuna regola la risolve, un modello può occuparsi dell’abbinamento. Ciò che lo rende accettabile è l’etichetta. Il fascicolo marca quella riga come probabilistica anziché deterministica, così un revisore vede esattamente quali parti della decisione hanno richiesto giudizio e dove guardare per prime.",
  },
];

const claimSteps: NumberedItem[] = [
  {
    title: "Lettura",
    body: "Un agente estrae dai documenti di riparazione i fatti di cui le regole hanno bisogno: cosa è stato riparato e cosa ha causato il danno. Ogni valore rimanda al suo documento di origine.",
  },
  {
    title: "Calcolo",
    body: "Il motore applica a quei fatti le condizioni di polizza e le regole di business. La voce risulta coperta ai sensi della clausola 2.2A. La spiegazione è radicata nel testo, non composta a posteriori. Eventuali franchigie, limiti o massimali vengono poi calcolati, con il calcolo mostrato riga per riga.",
  },
  {
    title: "Giudizio",
    body: "Dove una voce di fattura non corrisponde nettamente a nessuna regola, un modello esegue l’abbinamento e solo quella riga porta un’etichetta probabilistica. Le righe intorno restano deterministiche.",
  },
  {
    title: "Revisione umana",
    body: "L’intero audit trail può essere esportato in qualsiasi momento. Un liquidatore esamina il sinistro. Ogni modifica che apporta richiede una motivazione registrata direttamente nel fascicolo.",
  },
];

const summaryPoints: BulletItem[] = [
  {
    lead: "La lettura spetta ai modelli di IA:",
    text: "Trasformare PDF, fotografie, e-mail e note scritte a mano non strutturati in fatti strutturati.",
  },
  {
    lead: "Il calcolo spetta rigorosamente alle regole:",
    text: "Calcolare limiti, franchigie, scoperti e ripartizioni di coassicurazione ha esattamente una risposta corretta. Un modello può offrirne solo una probabile.",
  },
  {
    lead: "Il giudizio può usare un modello, purché sia marcato come tale:",
    text: "Dove il testo lascia aperta una voce, il fascicolo deve mostrare che la riga è stata risolta da un modello e non da una regola.",
  },
];

const stepKinds: BulletItem[] = [
  {
    lead: "Un passaggio deterministico",
    text: "è quello in cui gli stessi input producono sempre lo stesso output. Una regola scritta come albero decisionale si comporta così: dati i fatti, l’esito è calcolato, non previsto.",
  },
  {
    lead: "Un passaggio probabilistico",
    text: "produce la risposta più probabile in base a ciò che ha visto. Poiché un modello linguistico è probabilistico per costruzione, gli stessi input possono produrre una risposta diversa in un’altra esecuzione o con un’altra versione del modello.",
  },
];

const handovers: BulletItem[] = [
  {
    lead: "Passaggio 1: prove mancanti.",
    text: "Se manca un documento o un valore non può essere estratto, la risposta corretta è chiederlo. Il sinistro attende il fatto invece di procedere su un’approssimazione.",
  },
  {
    lead: "Passaggio 2: ambiguità reale.",
    text: "Dove una voce di fattura non corrisponde nettamente a nessuna voce di catalogo, un modello esegue l’abbinamento e il fascicolo la marca come probabilistica. Il giudizio sta accanto all’aritmetica, chiaramente etichettato.",
  },
  {
    lead: "Passaggio 3: soglie definite dall’assicuratore.",
    text: "Le soglie su importo del sinistro, scostamento dagli esiti attesi o livelli di confidenza sono fissate dall’assicuratore. Un sinistro che supera una soglia viene indirizzato a un liquidatore, che vede i fatti, la clausola applicata e ogni ipotesi fatta. Se un’ipotesi non tiene, il liquidatore la corregge e l’esito viene ricalcolato.",
  },
];

const engineParts: BulletItem[] = [
  {
    lead: "Alberi decisionali deterministici:",
    text: "Condizioni di polizza, cataloghi e regolamenti vengono convertiti in alberi decisionali. Dati i fatti, l’esito è calcolato anziché previsto. Stessi input, stessa decisione, ogni volta.",
  },
  {
    lead: "Agenti specifici per compito:",
    text: "Gli agenti leggono fotografie, PDF, scrittura a mano, e-mail e testo libero per estrarre fatti strutturati. Ogni agente svolge un solo compito ristretto.",
  },
  {
    lead: "Abbinamento con modello etichettato:",
    text: "Dove una voce è davvero ambigua, un modello la abbina e marca quella riga come probabilistica nel fascicolo.",
  },
  {
    lead: "Controllo human-in-the-loop:",
    text: "Gli esiti di copertura risalgono alla clausola che li fonda. La revisione umana è attivata da soglie che l’assicuratore stabilisce. Ogni modifica apportata da una persona porta una motivazione.",
  },
];

const recordPoints: BulletItem[] = [
  { text: "Ogni fatto porta la pagina del documento da cui è stato tratto." },
  { text: "Ogni cifra porta la clausola o la regola che l’ha prodotta." },
  {
    text: "Ogni giudizio è marcato come giudizio, così il revisore sa dove verificare per primo.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "Separazione degli strumenti:",
    text: "Leggere, calcolare e giudicare sono passaggi di natura diversa e richiedono strumenti diversi.",
  },
  {
    lead: "Regole per il calcolo:",
    text: "Il calcolo spetta alle regole. Una risposta probabile a un’operazione aritmetica è una nuova modalità di errore senza alcun vantaggio.",
  },
  {
    lead: "Uso etichettato dei modelli:",
    text: "Un modello si guadagna il posto nella lettura e, marcato come probabilistico, nel giudizio.",
  },
  {
    lead: "Confini di passaggio definiti:",
    text: "Le regole si fermano davanti a prove mancanti, ambiguità reale e soglie dell’assicuratore. Ognuno è un passaggio che il fascicolo mostra, non una lacuna che nasconde.",
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
              Tutti gli articoli
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Dove il modello linguistico non ha posto
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Progettare un’IA difendibile per la gestione dei sinistri
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO e cofondatore di True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                7 min di lettura
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
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Sintesi
                  </h2>
                  <p className="text-body leading-[1.6] mb-4">
                    Una decisione su un sinistro non è un singolo passaggio. È una catena end-to-end di azioni più piccole, classificate in tre tipi distinti: <strong className="text-strong">Lettura</strong>,{" "}
                    <strong className="text-strong">Calcolo</strong> e{" "}
                    <strong className="text-strong">Giudizio</strong>.
                  </p>
                  <BulletList items={summaryPoints} />
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    La scelta progettuale che conta non è «regole o modelli». È mantenere visibile il confine tra i due in ogni passaggio del fascicolo.
                  </p>
                </div>
              </MotionDiv>

              {/* The three core operations */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="three-operations"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le tre operazioni fondamentali di una decisione su un sinistro
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  L’IA nei sinistri viene di solito presentata come una scelta tra regole e modelli. Ma una decisione su un sinistro non è un atto unico. È una catena di passaggi, e ognuno richiede lo strumento giusto:
                </p>

                <NumberedCards
                  items={operations.map((operation) => ({
                    title: operation.name,
                    body: operation.description,
                  }))}
                />

                <p className="text-body leading-[1.6] mt-8">
                  La maggior parte dei sinistri li contiene tutti e tre. Ciò che conta è se qualcuno può vedere, a posteriori, di che tipo era ciascun passaggio.
                </p>
              </MotionDiv>

              {/* Why computing belongs to rules */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="computing-belongs-to-rules"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Perché il calcolo spetta alle regole, senza eccezioni
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’aritmetica su un limite scritto ha una sola risposta corretta. Una ripartizione di coassicurazione di un importo noto a una percentuale nota non ha un esito probabile. Ha un esito.
                </p>

                <BulletList items={stepKinds} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  È un punto di forza quando si leggono prove disordinate. In un calcolo è semplicemente un nuovo modo di sbagliare, senza alcun vantaggio. Un modello che applica correttamente una franchigia su ogni sinistro di test non è comunque diventato una regola. L’esecuzione successiva non è vincolata alle precedenti.
                </p>

                <p className="text-body leading-[1.6]">
                  Franchigie, scoperti, soglie, massimali, limiti, ripartizioni di responsabilità, coassicurazione e deduzione per miglioria (betterment) sono tutti calcolo. Nessuno di loro ha bisogno di un modello.
                </p>
              </MotionDiv>

              {/* Where a model earns its place */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-a-model-earns-its-place"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Dove un modello si guadagna il posto
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Un modello si guadagna il posto risolvendo compiti in cui le regole fisse non possono funzionare:
                </p>

                <NumberedCards items={modelJobs} />
              </MotionDiv>

              {/* When you cannot separate the two */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="when-you-cannot-separate"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Cosa succede quando non si possono separare le due cose
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Se estrazione, giudizio e aritmetica avvengono dentro una singola chiamata al modello, la decisione può essere descritta solo nel suo insieme. L’output è una risposta unica senza nulla da ispezionare all’interno.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Qualsiasi spiegazione viene scritta a posteriori, come narrazione di ciò che probabilmente è accaduto. Può suonare plausibile, ma non è un fascicolo.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ciò che rende una decisione difficile da difendere raramente è il fatto che vi abbia partecipato un modello. È che nessuno riesce a separare i passaggi in cui è intervenuto da quelli in cui non lo ha fatto. Una decisione che non è una scatola nera è una decisione in cui ogni passaggio può essere aperto singolarmente, con la sua natura scritta sopra.
                </p>

                <p className="text-body leading-[1.6]">
                  Questa proprietà va progettata nel sistema fin dal primo giorno. Un fascicolo che non ha mai registrato quali passaggi sono stati calcolati non può essere scomposto in passaggi in seguito.
                </p>
              </MotionDiv>

              {/* The boundary on one claim */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="one-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Che aspetto ha il confine su un singolo sinistro
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Prendiamo una voce cristalli su un sinistro auto:
                </p>

                <NumberedCards items={claimSteps} />
              </MotionDiv>

              {/* Where rules stop */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="handover-points"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Dove si fermano le regole: i tre punti di passaggio
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Un albero decisionale è esattamente tanto completo quanto i fatti che gli vengono forniti e il testo da cui è stato costruito. Un motore ben progettato tratta i limiti delle regole come passaggi definiti, non come lacune:
                </p>

                <BulletList items={handovers} />
              </MotionDiv>

              {/* How True Aim draws the line */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="how-true-aim-draws-the-line"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Come True Aim traccia il confine
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Il motore decisionale di True Aim è un ibrido di due tecnologie. Il confine tra loro è la scelta progettuale centrale:
                </p>

                <BulletList items={engineParts} />
              </MotionDiv>

              {/* What a claim record should show */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="claim-record"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Cosa dovrebbe poter mostrare un fascicolo sinistro
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Ogni sinistro chiuso viene riletto: dal liquidatore prima dell’approvazione, dal cliente quando un esito viene contestato o da un revisore un anno dopo. Tutti pongono la stessa domanda: come si è arrivati a questo?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Un fascicolo che tiene separati i tre tipi di passaggio risponde direttamente:
                </p>

                <BulletList items={recordPoints} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Un fascicolo che conserva solo l’esito finale non può rispondere affatto. Può solo offrire una descrizione scritta dopo i fatti. Una descrizione non è una prova.
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
                  Domande frequenti
                </h2>

                <FaqBlock faqs={faqs} />
              </MotionDiv>

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="related-reading"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Letture correlate
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La gestione dei sinistri con IA non è ad alto rischio secondo l’AI Act europeo
                    </Link>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-auditability-scorecard"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La scorecard di verificabilità dell’IA per i sinistri
                    </Link>
                  </div>
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
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Il rischio zero non esiste. Le decisioni spiegabili sì.
            </h2>
            <p className="text-lg text-body mb-10">
              Parliamo di come questo confine si applica alla vostra gestione dei sinistri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Contattaci
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                <Calculator aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
                Stima l’impatto
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
