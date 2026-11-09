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
} from "./diagrams.it";
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
  { id: "sovereign-fragment-problem", heading: "Il problema dei frammenti sovrani" },
  { id: "glass-box", heading: "La scatola di vetro" },
  { id: "price-integrity", heading: "Integrità empirica dei prezzi" },
  { id: "four-pillars", heading: "I quattro pilastri" },
  { id: "judgement-dividend", heading: "Il dividendo del giudizio" },
  { id: "implementation-controls", heading: "Realtà strutturali" },
  { id: "implementation-roadmap", heading: "La roadmap di implementazione" },
  { id: "core-takeaways", heading: "Punti essenziali" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const partyViews: BulletItem[] = [
  {
    text: "L’assicuratore opera da un workbench di governance aziendale con tracciamento istantaneo della conformità normativa.",
  },
  {
    text: "L’assicurato segue in tempo reale l’acquisizione delle prove, osservando direttamente a schermo quali documenti sono verificati e quali requisiti restano aperti.",
  },
  {
    text: "L’intermediario monitora il consumo di capacità, i limiti del binder e le metriche SLA in tempo reale senza inviare richieste di aggiornamento sullo stato.",
  },
  {
    text: "Il fornitore specializzato invia preventivi voce per voce e riceve una convalida immediata e deterministica rispetto alle condizioni di copertura.",
  },
];

const decisionRecord: string[] = [
  "il presupposto fattuale esatto e i documenti di supporto considerati;",
  "la regola specifica, il modello statistico o la versione del testo contrattuale in vigore;",
  "la motivazione deterministica in linguaggio semplice;",
  "l’identità esatta dell’attore umano o agentico che esegue la modifica.",
];

const priceSteps: NumberedItem[] = [
  {
    title: "Verifica deterministica voce per voce",
    body: "Ogni voce preventivata è testata rispetto a distribuzioni di prezzo empiriche e dinamiche, derivate da fatture verificate e liquidate per settore e zona postale.",
  },
  {
    title: "Approvazione istantanea",
    body: "I preventivi conformi alle distribuzioni regionali verificate sono approvati in meno di un secondo.",
  },
  {
    title: "Individuazione degli scostamenti",
    body: "Le fatture con anomalie statistiche vengono restituite immediatamente, con l’indicazione precisa delle voci in scostamento e del delta esatto rispetto al prezzo di riferimento.",
  },
  {
    title: "Isolamento dei casi limite",
    body: "Le voci non strutturate o raggruppate che non possono essere verificate sistematicamente vengono separate per la valutazione di un liquidatore senior.",
  },
];

const pillars = [
  {
    label: "Acquisizione e orchestrazione",
    cells: [
      "Ricezione multicanale dei sinistri, analisi continua del contesto e distribuzione agentica dei compiti.",
      "Elimina la tassa amministrativa di navigazione attraverso i confini interni ed esterni.",
    ],
  },
  {
    label: "Decisione di copertura",
    cells: [
      "Calcolo contrattuale deterministico, riga per riga, che collega i fatti al testo di polizza.",
      "Determinazioni giuridiche verificabili, in linguaggio semplice, eseguite in millisecondi.",
    ],
  },
  {
    label: "Confronto con il mercato",
    cells: [
      "Test empirico continuo dei prezzi rispetto alle curve di varianza per settore, voce e regione.",
      "Elimina il leakage indennitario operativo con assoluta equità verso le reti di fornitori.",
    ],
  },
  {
    label: "Audit e governance",
    cells: [
      "Registrazione continua di decisioni, materiali di origine e criteri normativi.",
      "Genera un pacchetto di audit istantaneo e immutabile. Difendibile fin dalla progettazione.",
    ],
  },
];

const judgementWork: BulletItem[] = [
  {
    lead: "La decisione sui casi limite:",
    text: "Intervenire in eventi dannosi catastrofici, ambigui o giuridicamente sensibili, dove l’empatia umana e la discrezionalità contestuale determinano l’esito.",
  },
  {
    lead: "La relazione con l’assicurato:",
    text: "Condurre colloqui articolati e di alta fiducia con i richiedenti quando la copertura deve essere modificata o negata, con a disposizione il ragionamento completo in linguaggio semplice alla base della decisione.",
  },
  {
    lead: "L’ottimizzazione sistemica delle regole:",
    text: "Agire come ingegnere interno delle operazioni, analizzando gli schemi strutturali delle deroghe manuali per individuare dove le linee guida di sottoscrizione o le regole automatizzate sono ambigue, obsolete o troppo restrittive.",
  },
];

const controls: BulletItem[] = [
  {
    lead: "La partecipazione all’ecosistema richiede valore reale:",
    text: "Riparatori esterni e gestori sinistri in outsourcing (TPA) non adotteranno il workbench di un assicuratore se funziona come un portale di sorveglianza digitale. Il fascicolo condiviso ha successo solo quando i partner esterni ne ricavano un’utilità tangibile: approvazioni automatizzate voce per voce, autorizzazioni di pagamento entro la giornata e requisiti inequivocabili.",
  },
  {
    lead: "Progettazione architetturale delle autorizzazioni:",
    text: "I parametri dei permessi non possono essere modificati con leggerezza. L’assicuratore definisce la visibilità strutturale una volta; il sistema operativo la applica matematicamente su tutte le interfacce.",
  },
  {
    lead: "Rigore delle distribuzioni:",
    text: "Il confronto algoritmico dei prezzi è affidabile solo quanto il set di dati sottostante. I prezzi di riferimento devono essere calcolati da dati di fattura reali, segmentate rigorosamente per settore, categoria e micro-mercato regionale.",
  },
  {
    lead: "Sovranità dell’autorità delegata:",
    text: "Un broker che opera con un binder autorizzato possiede diritti decisionali distinti rispetto a un intermediario non mandatato. La macchina a stati deve riflettere costantemente chi detiene l’autorità decisionale su ogni singola voce, in perfetto allineamento con il contratto di sottoscrizione sottostante.",
  },
];

const roadmap: NumberedItem[] = [
  {
    title: "Isolare le linee di frattura",
    body: "Mappare ogni entità giuridica sovrana che tocca una singola linea di business, commerciale o retail. Documentare con precisione dove il fascicolo probatorio si frattura e passa alla corrispondenza manuale.",
  },
  {
    title: "Codificare la matrice delle autorizzazioni",
    body: "Formulare le politiche di accesso ai dati per ciascun gruppo di stakeholder (assicurato, broker, liquidatore e fornitore terzo) prima di distribuire una sola interfaccia.",
  },
  {
    title: "Avviare un progetto pilota circoscritto",
    body: "Portare una sola rete di partner e una sola linea di business su un fascicolo condiviso. Misurare in novanta giorni il volume di richieste in uscita, i tempi di gestione delle fatture e il tasso di liquidazioni contestate.",
  },
  {
    title: "Imporre la motivazione in linguaggio semplice",
    body: "Vietare la registrazione di decisioni prive di motivazioni chiare in linguaggio semplice. Un log di sistema senza motivazione esplicita è solo rumore digitale, non una difesa legale.",
  },
  {
    title: "Reinvestire il dividendo del giudizio",
    body: "Riallocare deliberatamente le ore dei liquidatori. Spostare il personale sinistri dall’inserimento dati a basso rendimento verso l’ingegneria del rischio ad alto valore, la negoziazione delle liquidazioni e l’architettura delle regole.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "La realtà multiparte:",
    text: "Un sinistro complesso è per natura un fascicolo probatorio distribuito. L’automazione interna all’azienda spinge semplicemente il lavoro verso i confini ad alto attrito tra organizzazioni indipendenti.",
  },
  {
    lead: "Un sistema operativo condiviso:",
    text: "Un sistema operativo agentico, gestito come macchina a stati unificata sotto autorizzazioni rigorose per ruolo, trasforma la trasparenza inter-organizzativa in una proprietà architetturale intrinseca.",
  },
  {
    lead: "Verificabilità a scatola di vetro:",
    text: "La vera fiducia aziendale richiede una provenienza continua a livello di riga: la registrazione dei fatti esatti, delle versioni del testo, del ragionamento in linguaggio semplice e degli attori umani o di sistema dietro ogni decisione.",
  },
  {
    lead: "Il liquidatore valorizzato:",
    text: "I sistemi autonomi eliminano la tassa amministrativa di navigazione, restituendo ai liquidatori il lavoro che giustifica l’investimento aziendale: giudizio umano complesso, relazioni con i partner e progettazione sistemica delle operazioni.",
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
              Tutti gli articoli
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Il problema dell’automazione dei sinistri a compartimenti stagni
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Trasparenza architetturale e ascesa della gestione sinistri agentica
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
                8 min di lettura
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
                  <p className="text-body leading-[1.6]">
                    Un sinistro non è mai esistito entro le quattro mura di una sola impresa. Assicurato, sottoscrittore, intermediario con delega, riparatore specializzato e perito forense detengono ciascuno frammenti sovrani di una verità non condivisa. L’automazione tradizionale si fermava ai confini interni, accelerando singole postazioni e lasciando l’ecosistema più ampio in una paralisi amministrativa. La strada da seguire non è un altro chatbot puntuale né una casella di posta automatizzata. È un sistema operativo agentico ancorato a un fascicolo unificato, che orchestra l’esecuzione tra più parti sotto autorizzazioni matematiche, con ogni atto discrezionale registrato con provenienza a livello di riga. La trasparenza cessa di essere una cortesia. Diventa una garanzia architetturale.
                  </p>
                </div>

                <PullQuote>L’automazione tradizionale dei sinistri è morta.</PullQuote>

                <p className="text-body leading-[1.6] mb-5">
                  Nell’ultimo decennio la suite assicurativa aziendale è stata venduta su una sola metrica: la velocità. Acquisizione più rapida, riconoscimento ottico più rapido, triage più rapido. Dopo miliardi di investimenti, gli assicuratori hanno costruito postazioni ultraveloci intrappolate in reti profondamente lente.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Un assicuratore può usare modelli generativi per acquisire una denuncia di sinistro in quattro secondi e calcolare la copertura riga per riga. Eppure lo stesso assicuratore impiega quarantotto ore a inseguire l’allegato di un’e-mail da un riparatore regionale, e tre settimane ad assemblare un audit trail forense per un’autorità di vigilanza.
                </p>

                <p className="text-body leading-[1.6]">
                  Le ore restituite a un liquidatore interno sono sempre state il premio minore. La vera frontiera è ciò che diventa un’organizzazione sinistri quando la tassa sistemica di navigazione, l’attrito manuale della riconciliazione dei fatti attraverso i confini aziendali, viene eliminata per progettazione.
                </p>
              </MotionDiv>

              {/* The sovereign fragment problem */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sovereign-fragment-problem"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Il problema dei frammenti sovrani
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Consideriamo un sinistro property standard o un sinistro auto complesso.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’assicurato denuncia un evento dannoso. Un intermediario convalida la copertura in base a un binder di delega. L’assicuratore decide sulla responsabilità. Un fornitore quantifica il ripristino. Un perito verifica i danni materiali.
                </p>

                <p className="text-body leading-[1.6]">
                  Cinque entità giuridiche distinte. Cinque database isolati. Cinque convenzioni divergenti di tenuta dei registri.
                </p>

                <ClaimChainDiagram />

                <p className="text-body leading-[1.6] mb-5">
                  Poiché nessun partecipante possiede la matrice fattuale completa, ogni organizzazione tiene il proprio fascicolo ombra difensivo. Il sinistro viene smontato, tradotto e riassemblato a ogni confine che attraversa. Lo stato si negozia per telefono. I preventivi attraversano i firewall aziendali come PDF statici. Le approvazioni tornano come corrispondenza non indicizzata.
                </p>

                <p className="text-body leading-[1.6]">
                  Ogni passaggio di confine comporta un dazio invisibile: un’appendice mancante, una latenza non contabilizzata, una motivazione decisionale che esiste solo nella memoria di un liquidatore senior. Ciò che il settore definisce «operazione end-to-end» è in realtà una catena improvvisata di imprese scollegate che cercano di sincronizzarsi attraverso l’attrito umano.
                </p>
              </MotionDiv>

              {/* The glass box */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="glass-box"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La scatola di vetro: la trasparenza come primitiva architetturale
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Automatizzare entro il perimetro di un’impresa non può risolvere una rottura inter-organizzativa. Quando l’automazione si ferma al confine aziendale, l’attrito si accumula semplicemente ai margini.
                </p>

                <p className="text-body leading-[1.6]">
                  L’alternativa architetturale è un sistema operativo agentico costruito su un fascicolo sinistro unico e sincronizzato. Una sola macchina a stati sottostante; più interfacce sovrane, separate per ruolo.
                </p>

                <SharedRecordDiagram />

                <BulletList items={partyViews} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Ogni parte accede esattamente a ciò che è legalmente e commercialmente autorizzata a vedere, grazie a barriere informative native. Ogni partecipante opera da una base identica e immutabile.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Sotto questa architettura c’è una disciplina rigorosa: ogni singola azione che modifica un sinistro viene calcolata come decisione formale e registrata con provenienza a livello di riga. Che si tratti di verificare la decorrenza della polizza, confermare l’applicabilità della copertura, confrontare una tariffa oraria di settore o instradare un sinistro anomalo all’antifrode specializzata, il motore registra:
                </p>

                <NumberedList items={decisionRecord} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Se un liquidatore umano modifica una determinazione automatizzata, l’architettura impone una giustificazione esplicita e motivata.
                </p>

                <p className="text-body leading-[1.6]">
                  È qui che la verificabilità passa da ricostruzione reattiva a realtà costante. La trasparenza tra organizzazioni è stata storicamente una cortesia intermittente. In un’architettura agentica è una proprietà immutabile del sistema.
                </p>

                <PullQuote>
                  Non una scatola nera. Una scatola di vetro: verificabile fin dalla progettazione, dimostrabile crittograficamente e aperta a ogni stakeholder legittimo della catena del valore.
                </PullQuote>
              </MotionDiv>

              {/* Empirical price integrity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="price-integrity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ingegneria di precisione sul campo: integrità empirica dei prezzi
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  In nessun luogo il costo dell’opacità strutturale è più evidente che nei preventivi della filiera, dove il leakage non monitorato si concentra lungo la coda lunga.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Storicamente gli assicuratori hanno gestito l’attrito sui preventivi con controlli arbitrari e grossolani: le fatture sopra un tetto monetario arbitrario venivano inviate a periti indipendenti con costi rilevanti; quelle sotto il tetto venivano approvate senza esame o valutate secondo l’intuito del liquidatore. In mercati regionali complessi, come il ripristino immobiliare in Svizzera, gli assicuratori lavoravano con tariffari associativi statici e teorici (suissetec, EIT.swiss) che non coglievano le dinamiche di liquidazione reali e locali.
                </p>

                <p className="text-body leading-[1.6]">
                  In un’architettura aperta e agentica, la convalida dei preventivi passa dal dibattito soggettivo al calcolo empirico:
                </p>

                <PriceEngineDiagram />

                <NumberedCards items={priceSteps} />

                <p className="text-body leading-[1.6] mt-8 mb-5">
                  Quando un fornitore può convalidare un preventivo rispetto al prezzo di riferimento del mercato prima dell’invio, la natura della relazione cambia. Una richiesta di riemissione non è più una disputa conflittuale; è una riconciliazione oggettiva e automatizzata. I modelli di distribuzione sottostanti si affinano dinamicamente con ogni liquidazione decisa.
                </p>

                <p className="text-body leading-[1.6]">
                  L’integrità dei prezzi smette di essere un punto di contesa tra imprese. Diventa prova condivisa e incontestabile.
                </p>
              </MotionDiv>

              {/* The four pillars */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-pillars"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  I quattro pilastri del sistema operativo dei sinistri
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Un’architettura sinistri aziendale richiede componenti modulari che orchestrino l’agentività end-to-end. Queste capacità non sono lineari; si interconnettono nativamente:
                </p>

                <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
                  <ComparisonTable
                    caption="I quattro pilastri del sistema operativo dei sinistri"
                    columns={["Modulo", "Funzionalità principale", "Risultato per l’impresa"]}
                    rows={pillars}
                  />
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Gli assicuratori non devono affrontare trasformazioni pluriennali e ad alto rischio della piattaforma core per catturare questo valore. Possono implementare una singola capacità, come il confronto dei prezzi o la verifica della copertura, ed espandersi in modo modulare man mano che il fascicolo condiviso dimostra il ritorno sull’investimento.
                </p>

                <p className="text-body leading-[1.6]">
                  Questo è il modello operativo dell’assicuratore di prima fascia: gli intermediari dimostrano la conformità al binder con dati in tempo reale anziché con audit annuali. Le reti di riparazione scambiano l’attrito con la velocità di pagamento. Quando l’autorità di vigilanza assicurativa avanza una richiesta formale, l’assicuratore presenta un fascicolo decisionale completo generato in secondi, non una ricostruzione forense assemblata in preda al panico nel corso di mesi.
                </p>

                <PullQuote>Deciso in minuti. Difeso per anni.</PullQuote>
              </MotionDiv>

              {/* The judgement dividend */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="judgement-dividend"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Il dividendo del giudizio: valorizzare l’umano anziché sostituirlo
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Il discorso prevalente sull’IA aziendale si concentra sulla riduzione della forza lavoro. Quella tesi fraintende la natura del rischio professionale.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  True Aim non sostituisce il professionista dei sinistri; dissolve l’impalcatura amministrativa che gli impediva di esercitare il proprio mestiere. Delegando la lettura dei documenti, la traduzione in dati strutturati, la verifica di base dei prezzi e la comunicazione dello stato a un sistema operativo agentico sottostante, i liquidatori recuperano la loro settimana di lavoro per i compiti che richiedono un ragionamento strategico ad alta posta in gioco:
                </p>

                <BulletList items={judgementWork} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Le scorecard di performance dirigenziali si adatteranno di conseguenza. Il tempo di ciclo e il costo di elaborazione per pratica erano gli indicatori grossolani dell’era manuale. L’impresa che opera su un fascicolo agentico condiviso monitora la coerenza delle decisioni, la spiegabilità a livello di riga, l’eliminazione sistematica dei punti di contatto con i partner e la riduzione dei tassi di contestazione.
                </p>
              </MotionDiv>

              {/* Structural realities */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-controls"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Realtà strutturali e controlli di implementazione
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Trasformare una rete operativa richiede di riconoscere i vincoli architetturali dal giorno zero:
                </p>

                <BulletList items={controls} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  La conformità non è un ripensamento sovrapposto a flussi di lavoro ereditati. È progettata nella transazione dal primo record acquisito.
                </p>
              </MotionDiv>

              {/* The implementation roadmap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-roadmap"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La roadmap di implementazione
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La trasformazione aziendale non richiede una migrazione speculativa big bang. Richiede un’esecuzione precisa e per fasi:
                </p>

                <NumberedCards items={roadmap} />

                <p className="text-body leading-[1.6] mt-8">
                  Gli assicuratori che compiono questa transizione stabiliranno lo standard tecnologico e operativo per i loro partner commerciali. Quelli che continuano a distribuire soluzioni puntuali localizzate finanzieranno soltanto una postazione più veloce dentro una catena obsoleta.
                </p>
              </MotionDiv>

              {/* Core takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Punti essenziali
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
              Deciso in minuti. Difeso per anni.
            </h2>
            <p className="text-lg text-body mb-10">
              Parliamo di cosa cambierebbe un fascicolo sinistro condiviso nella vostra gestione dei sinistri.
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
