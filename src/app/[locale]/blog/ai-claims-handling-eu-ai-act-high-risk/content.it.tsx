import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const annexRows: [string, string][] = [
  [
    "Esame delle richieste di assicurazione vita, dove il sistema elabora età, stato di salute, anamnesi familiare, stile di vita e professione rispetto alle tavole di mortalità per orientare accettazione e condizioni",
    "Gestione dei sinistri nell’assicurazione salute una volta avvenuto l’evento assicurato: verificare se una richiesta è valida secondo le condizioni di polizza o determinare l’importo da pagare",
  ],
  [
    "Previsione del costo medico annuo atteso per un gruppo di rischio, dove la cifra risultante diventa il premio applicato a quel gruppo",
    "Gestione dei sinistri usata per migliorare l’accuratezza dell’elaborazione e delle decisioni, ad esempio convalidando le informazioni del richiedente con banche dati esterne",
  ],
  [
    "",
    "Progettazione di prodotti per l’assicurazione vita, quando non è usata per la valutazione del rischio o la tariffazione di casi individuali",
  ],
];

const regimeRows: [string, string, string][] = [
  [
    "AI Act europeo, capitolo alto rischio (allegato III)",
    "Valutazione del rischio e tariffazione vita e salute. Non la gestione dei sinistri.",
    "Differito al 2 dicembre 2027 per i sistemi indipendenti; 2 agosto 2028 per l’IA integrata in prodotti regolamentati",
  ],
  [
    "GDPR, articolo 22",
    "Decisioni basate unicamente su un trattamento automatizzato che producono effetti giuridici o incidono in modo analogo significativamente, come un sinistro respinto o ridotto",
    "25 maggio 2018",
  ],
  [
    "Legge federale svizzera riveduta sulla protezione dei dati",
    "La sua restrizione delle decisioni individuali automatizzate, per le operazioni stabilite in Svizzera",
    "In vigore",
  ],
  [
    "UK GDPR",
    "L’equivalente di queste regole mantenuto dal Regno Unito",
    "In vigore",
  ],
  [
    "Parere EIOPA EIOPA-BoS-25-360",
    "Aspettative di vigilanza per l’IA assicurativa né vietata né ad alto rischio: governance, spiegabilità, tenuta dei registri",
    "6 agosto 2025",
  ],
];

const governanceStats: { value: string; label: string }[] = [
  {
    value: "61%",
    label:
      "dei dirigenti assicurativi afferma che i propri consigli di amministrazione hanno stabilito politiche di governance dell’IA.",
  },
  {
    value: "68%",
    label:
      "afferma che i propri controlli sull’IA esistono, ma le evidenze sono frammentate tra team e strumenti.",
  },
  {
    value: "24%",
    label:
      "è molto fiducioso di poter superare una revisione indipendente della governance dell’IA entro 90 giorni.",
  },
  {
    value: "44%",
    label:
      "afferma che difficoltà di governance o conformità hanno contribuito al fallimento o alla sottoperformance di progetti di IA.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "La gestione dei sinistri con IA è ad alto rischio secondo l’AI Act europeo?",
    a: "No. L’allegato III non elenca la gestione dei sinistri. Il punto 5, lettera c), copre solo la valutazione del rischio e la tariffazione nell’assicurazione vita e salute. La bozza di linee guida della Commissione sulla classificazione, del 19 maggio 2026, cita la gestione dei sinistri come esempio di sistema che esula da quel punto, anche per i prodotti di assicurazione salute. Un’attività di gestione sinistri auto, property, garanzia o rami commerciali resta fuori dal regime ad alto rischio, pur rimanendo soggetta al diritto della protezione dei dati e al diritto assicurativo di settore.",
  },
  {
    q: "La gestione dei sinistri con IA è ad alto rischio nell’assicurazione salute?",
    a: "No. L’assicurazione salute è il test più severo della regola, perché la sottoscrizione in quel ramo è ad alto rischio. La bozza di linee guida della Commissione colloca comunque la gestione dei sinistri fuori dal punto 5, lettera c), sulla base del fatto che verificare una richiesta rispetto alle condizioni di polizza o determinare l’importo da pagare è distinto dalla valutazione del rischio o dalla tariffazione.",
  },
  {
    q: "Il differimento a dicembre 2027 si applica alla gestione dei sinistri?",
    a: "Non ha alcun effetto su di essa. L’omnibus digitale ha differito la data da cui iniziano ad applicarsi gli obblighi ad alto rischio. Non ha cambiato quali sistemi sono ad alto rischio. La gestione dei sinistri non era tra questi né prima né dopo il differimento.",
  },
  {
    q: "Cosa ha cambiato il regolamento (UE) 2026/1744?",
    a: "Ha differito gli obblighi ad alto rischio dell’AI Act. I sistemi indipendenti dell’allegato III passano dal 2 agosto 2026 al 2 dicembre 2027. L’IA integrata in prodotti regolamentati passa dal 2 agosto 2027 al 2 agosto 2028. È stato pubblicato il 24 luglio 2026 ed è entrato in vigore il 27 luglio 2026.",
  },
  {
    q: "L’articolo 22 del GDPR si applica a una decisione automatizzata su un sinistro?",
    a: "Sì, dove il GDPR è il regime applicabile. L’articolo 22 limita le decisioni basate unicamente su un trattamento automatizzato che producono effetti giuridici o incidono in modo analogo significativamente. Un sinistro respinto o ridotto raggiunge quella soglia. Si applica dal 25 maggio 2018 e non è stato toccato dal differimento dell’AI Act. Le operazioni fuori dall’UE rispondono alla disposizione equivalente del proprio regime, come la legge federale svizzera riveduta sulla protezione dei dati.",
  },
  {
    q: "Cosa conta come intervento umano significativo?",
    a: "Secondo le linee guida del Gruppo di lavoro Articolo 29 (WP251rev.01), la revisione deve essere svolta da qualcuno con l’autorità e la competenza per cambiare la decisione. Dipendenti che si limitano a ratificare risultati generati automaticamente non portano un titolare fuori dall’articolo 22.",
  },
  {
    q: "Cosa dovete rivelare sulla logica di una decisione automatizzata?",
    a: (
      <>
        In <em>Dun &amp; Bradstreet Austria</em> (C-203/22) la CGUE ha richiesto la procedura e i principi effettivamente applicati, comunicati in modo conciso e intelligibile, incluso come l’esito sarebbe cambiato se i dati fossero stati diversi. Fornire l’algoritmo in sé non assolve l’obbligo. Un segreto commerciale non consente un rifiuto generalizzato.
      </>
    ),
  },
];

// Short labels for the "In questa pagina" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "is-ai-claims-handling-high-risk-under-the-eu-ai", heading: "La gestione dei sinistri con IA è ad alto rischio secondo l’AI Act?" },
  { id: "four-terms-that-decide-the-answer", heading: "Quattro termini che decidono la risposta" },
  { id: "if-you-do-have-an-annex-iii-system-profiling-clo", heading: "Se avete un sistema dell’allegato III, la profilazione chiude l’uscita" },
  { id: "which-regime-actually-binds-a-european-claims-op", heading: "Quale regime vincola davvero un’organizzazione sinistri europea?" },
  { id: "does-gdpr-article-22-apply-to-an-automated-claim", heading: "L’articolo 22 del GDPR si applica a una decisione automatizzata su un sinistro?" },
  { id: "where-the-sector-supervisor-sits", heading: "Dove si colloca l’autorità di vigilanza di settore" },
  { id: "what-does-it-cost-to-be-unable-to-explain-a-deci", heading: "Quanto costa non saper spiegare una decisione?" },
  { id: "the-gap-that-will-actually-catch-carriers", heading: "Il divario che coglierà davvero gli assicuratori" },
  { id: "why-the-2027-date-does-not-help", heading: "Perché la data del 2027 non aiuta" },
  { id: "the-test-worth-running-this-week", heading: "Il test da fare questa settimana" },
  { id: "key-takeaways", heading: "Punti chiave" },
  { id: "frequently-asked-questions", heading: "Domande frequenti" },
  { id: "related-reading", heading: "Letture correlate" },
];

export default async function EUAIActClaimsBlogPost({ params }: { params: Promise<{ locale: string }> }) {
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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Tutti gli articoli
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              La gestione dei sinistri con IA non è ad alto rischio secondo l’AI Act europeo. Ecco cosa la vincola invece.
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              La gestione dei sinistri è assente dall’allegato III. L’articolo 22 del GDPR la vincola comunque. Solo il 24% degli assicuratori dice di poter superare una revisione di governance in 90 giorni.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min di lettura
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Analisi normativa
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
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    La risposta breve
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          La gestione dei sinistri non è nell’allegato III.
                        </strong>{" "}
                        La stessa bozza di linee guida della Commissione sulla classificazione cita la gestione dei sinistri come esempio di sistema che esula dal punto 5, lettera c), e usa l’assicurazione salute, l’unico ramo in cui la sottoscrizione{" "}
                        <em>è</em> ad alto rischio, per dimostrarlo.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Il differimento dell’omnibus digitale non cambia nulla per un’organizzazione sinistri.
                        </strong>{" "}
                        Il capitolo spostato a dicembre 2027 non è mai stato quello che vi disciplinava.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          È l’articolo 22 del GDPR che vincola
                        </strong>
                        . Si applica dal 25 maggio 2018. Un sinistro respinto o ridotto vi rientra pienamente. Le operazioni svizzere e britanniche rispondono ai rispettivi equivalenti.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          L’EIOPA ha già detto alle autorità di vigilanza cosa si aspetta
                        </strong>
                        : esiti spiegabili e registrazioni riproducibili in base al diritto di settore esistente, in proporzione all’impatto del sistema.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Il test è la ricostruzione.
                        </strong>{" "}
                        Se non potete ricostruire su richiesta una decisione chiusa, la scadenza che avete mancato era il 2018, non il 2027.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Il 24 luglio 2026 l’omnibus digitale sull’IA è stato pubblicato nella Gazzetta ufficiale come regolamento (UE) 2026/1744. È entrato in vigore tre giorni dopo. Gli obblighi ad alto rischio dell’AI Act (regolamento europeo sull’IA) per i sistemi indipendenti (stand-alone) dell’allegato III passano dal 2 agosto 2026 al 2 dicembre 2027. Per l’IA integrata in prodotti regolamentati, dal 2 agosto 2027 al 2 agosto 2028.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Sedici mesi in più, dunque.
                </p>

                <p className="text-body leading-[1.6]">
                  Un’organizzazione sinistri non li ha ottenuti. Non perché il differimento sia ristretto, ma perché la gestione dei sinistri non è mai stata nel capitolo che si è spostato.
                </p>
              </MotionDiv>

              {/* Is AI claims handling high-risk */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="is-ai-claims-handling-high-risk-under-the-eu-ai"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La gestione dei sinistri con IA è ad alto rischio secondo l’AI Act europeo?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  No. L’allegato III non la elenca.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Il punto 5 dell’allegato III riguarda l’accesso a servizi privati e pubblici essenziali. Nomina quattro cose: la valutazione dell’ammissibilità a prestazioni pubbliche essenziali, se usata da o per conto di autorità pubbliche; la valutazione dell’affidabilità creditizia o la determinazione di un punteggio di credito, esclusi i sistemi di rilevamento delle frodi finanziarie;{" "}
                  <strong className="text-strong">
                    la valutazione dei rischi e la determinazione dei prezzi in relazione a persone fisiche nel caso di assicurazioni sulla vita e assicurazioni sanitarie
                  </strong>
                  ; e la valutazione, la classificazione e lo smistamento delle chiamate di emergenza.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La valutazione del rischio e la tariffazione vita e salute rientrano nell’ambito di applicazione. La gestione dei sinistri auto, property, garanzia e rami commerciali no.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Ora lo dice la Commissione stessa. La sua bozza di linee guida sulla classificazione dei sistemi di IA ad alto rischio, pubblicata il 19 maggio 2026 e aperta alla consultazione fino al 23 giugno, presenta esempi dettagliati su entrambi i lati della linea.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Allegato III, punto 5, lettera c): gli esempi della Commissione
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Dentro il punto 5, lettera c): alto rischio
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Fuori dal punto 5, lettera c)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {annexRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4">{row[0]}</td>
                            <td className="py-3">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Il ragionamento della Commissione per l’esclusione merita di essere letto nelle sue parole:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Questi casi d’uso sono distinti dallo svolgimento di una valutazione del rischio o di una tariffazione, anche se il loro esito potrebbe incidere sul godimento dell’assicurazione salute.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Notate quale ramo usa quell’esempio. L’assicurazione salute è l’unico ambito in cui la sottoscrizione <em>è</em>{" "}
                  ad alto rischio. La gestione dei sinistri esula dal caso d’uso anche lì. Le linee guida sono una bozza e non sono vincolanti. La Commissione è esplicita nel dire che l’interpretazione autorevole dell’AI Act spetta alla Corte di giustizia. Ma sono la dichiarazione ufficiale più chiara disponibile e puntano nella stessa direzione.
                </p>

                <p className="text-body leading-[1.6]">
                  Questa è la risposta alla domanda. È anche il punto in cui la maggior parte delle letture si ferma e in cui iniziano le due cose che decidono davvero la vostra esposizione. Sono domande diverse per sistemi diversi. Confonderle è il modo in cui i piani di conformità vanno storti.
                </p>
              </MotionDiv>

              {/* Four terms */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-terms-that-decide-the-answer"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quattro termini che decidono la risposta
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 space-y-5">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Allegato III.</strong>{" "}
                    L’elenco dei casi d’uso ad alto rischio nel regolamento (UE) 2024/1689. Un sistema è ad alto rischio per questa via solo se corrisponde a un caso d’uso dell’elenco. La vicinanza a un caso d’uso elencato non ne costituisce l’appartenenza.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Profilazione.</strong>{" "}
                    Valutazione automatizzata di aspetti personali di una persona fisica: situazione economica, salute, affidabilità, comportamento. L’AI Act prende il termine in prestito dal GDPR. Ha un peso decisivo nell’articolo 6, paragrafo 3.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">
                      Una decisione unicamente automatizzata.
                    </strong>{" "}
                    Ai sensi dell’articolo 22 del GDPR, una decisione presa senza intervento umano significativo che produce effetti giuridici o incide in modo analogo significativamente. Un essere umano che in pratica non può ribaltare l’output non prende la decisione congiuntamente.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Prontezza all’audit.</strong>{" "}
                    La proprietà di poter ricostruire una decisione passata dalle registrazioni che il sistema ha prodotto all’epoca. È distinta dalla preparazione all’audit, un esercizio che si svolge prima di un esame.
                  </p>
                </div>
              </MotionDiv>

              {/* Profiling closes the exit */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="if-you-do-have-an-annex-iii-system-profiling-clo"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Se avete un sistema dell’allegato III, la profilazione chiude l’uscita
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Questo vale per la valutazione del rischio e la tariffazione vita e salute, non per la gestione dei sinistri. Se gestite quei sistemi, continuate a leggere. Altrimenti passate alla sezione successiva, perché l’articolo 6, paragrafo 3, non ha nulla da dirvi.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Gli assicuratori dentro l’allegato III in genere pianificano di uscirne tramite l’articolo 6, paragrafo 3, che toglie lo status di alto rischio quando un sistema «non presenta un rischio significativo di danno per la salute, la sicurezza o i diritti fondamentali delle persone fisiche, anche nel senso di non influenzare materialmente il risultato del processo decisionale» e soddisfa una di quattro condizioni: un compito procedurale ristretto, il miglioramento di un’attività umana già completata, il rilevamento di schemi senza sostituire la valutazione umana o un compito preparatorio.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Una frase annulla tutte e quattro:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    In deroga al primo comma, un sistema di IA di cui all’allegato III è sempre considerato ad alto rischio qualora esegua la profilazione di persone fisiche.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Un modello di tariffazione vita o salute che segmenta gli individui per situazione economica, salute, affidabilità o comportamento è profilazione. La deroga non lo raggiunge.
                </p>

                <p className="text-body leading-[1.6]">
                  L’articolo 6, paragrafo 4, chiude poi il cerchio. Un fornitore che ritiene un sistema dell’allegato III non ad alto rischio deve documentare tale valutazione prima che il sistema sia immesso sul mercato o messo in servizio, registrarlo comunque ai sensi dell’articolo 49, paragrafo 2, e fornire la documentazione alle autorità nazionali competenti su richiesta. «Non ad alto rischio» è una dichiarazione da depositare, non un’assenza di adempimenti.
                </p>
              </MotionDiv>

              {/* Which regime binds */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="which-regime-actually-binds-a-european-claims-op"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quale regime vincola davvero un’organizzazione sinistri europea?
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Cosa raggiunge un’organizzazione sinistri e da quando
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Strumento
                          </th>
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Cosa raggiunge
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Si applica dal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {regimeRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4 font-display font-medium text-strong">
                              {row[0]}
                            </td>
                            <td className="py-3 pr-4">{row[1]}</td>
                            <td className="py-3">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  Lo schema è quello che coglie le persone di sorpresa. Lo strumento per cui tutti si preparano è quello che non li raggiunge. Lo strumento che li raggiunge è in vigore da otto anni.
                </p>
              </MotionDiv>

              {/* Article 22 */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="does-gdpr-article-22-apply-to-an-automated-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’articolo 22 del GDPR si applica a una decisione automatizzata su un sinistro?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Sì. A differenza dell’AI Act, si applica dal 25 maggio 2018.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Una precisazione prima dei dettagli. Il GDPR non è l’unico regime di protezione dei dati a cui può rispondere un’organizzazione sinistri europea. Quale strumento vi vincola dipende da dove siete stabiliti e di chi trattate i dati. Quanto segue è l’analisi del GDPR. Leggetela come schema e non come mappa completa, e confermate lo strumento che governa il vostro portafoglio.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’articolo 22 limita le decisioni basate unicamente su un trattamento automatizzato che producono effetti giuridici o incidono in modo analogo significativamente. Un sinistro respinto o ridotto supera quella soglia.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Tre fonti definiscono ciò che oggi richiede. Nessuna si è mossa a luglio.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      I punteggi automatizzati possono essere essi stessi decisioni.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>OQ contro Land Hessen</em>, il caso SCHUFA (C-634/21, 7 dicembre 2023), la CGUE ha stabilito che la generazione automatizzata di un valore di probabilità sulla capacità di una persona di onorare impegni di pagamento costituisce essa stessa una decisione individuale automatizzata ai sensi dell’articolo 22, paragrafo 1, quando un terzo che riceve quel valore vi si basa in modo determinante per stipulare, eseguire o risolvere un contratto. L’obbligo ricade sulla parte che produce il punteggio, non solo su quella che agisce in base a esso.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Un’approvazione non è sorveglianza.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Secondo le linee guida del Gruppo di lavoro Articolo 29 sul processo decisionale automatizzato (WP251rev.01), approvate dall’EDPB, l’intervento umano sfugge all’articolo 22 solo se è significativo, svolto da qualcuno con l’autorità e la competenza per cambiare la decisione. Le linee guida affermano direttamente che dipendenti che ratificano meccanicamente profili generati automaticamente non porteranno un titolare fuori dall’articolo 22.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Una spiegazione ha uno standard definito.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>Dun &amp; Bradstreet Austria</em> (C-203/22, 27 febbraio 2025) la CGUE ha chiarito cosa richiedono le «informazioni significative sulla logica utilizzata» ai sensi dell’articolo 15, paragrafo 1, lettera h): la procedura e i principi effettivamente applicati per giungere alla decisione, comunicati in modo conciso e intelligibile. La Corte non ha richiesto un resoconto causale di come i dati di un singolo abbiano determinato il suo risultato. Ha indicato invece che spiegare come l’esito sarebbe cambiato se i dati fossero stati diversi può soddisfare l’obbligo. Ha anche stabilito che consegnare l’algoritmo non lo assolve, perché una formula matematica complessa non è né concisa né intelligibile. Ha stabilito inoltre che un segreto commerciale non consente un rifiuto generalizzato: il titolare deve sottoporre le informazioni contestate all’autorità di controllo o a un tribunale per il bilanciamento.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  È uno standard comparativo, non narrativo. Rispondervi richiede di sapere cosa il sistema ha effettivamente fatto con quali input.
                </p>
              </MotionDiv>

              {/* EIOPA */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-the-sector-supervisor-sits"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Dove si colloca l’autorità di vigilanza di settore
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Il{" "}
                  <em>parere dell’EIOPA sulla governance e la gestione dei rischi dell’IA</em>{" "}
                  (EIOPA-BoS-25-360, 6 agosto 2025) è indirizzato alle autorità di vigilanza nazionali e riguarda specificamente i sistemi di IA assicurativi che non sono né vietati né ad alto rischio secondo l’AI Act. Si fonda sulla direttiva sulla distribuzione assicurativa, su Solvibilità II, sul regolamento sulla resilienza operativa digitale e sui regolamenti delegati Solvibilità II e IDD, non sull’AI Act.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La sua stessa impostazione è il punto da cogliere. Quei sistemi, dice, «continuano a operare nel quadro della legislazione di settore esistente senza nuovi requisiti», con l’eccezione di alcuni obblighi di trasparenza, della promozione dell’alfabetizzazione in materia di IA del personale e di codici di condotta volontari. L’EIOPA non aggiunge un regime. Dice alle autorità di vigilanza che quello già in vigore si applica.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Al suo interno, le imprese dovrebbero assicurare che gli esiti dei sistemi di IA possano essere spiegati in modo significativo e conservare registrazioni adeguate dei dati di addestramento e test e delle metodologie di modellazione, per consentire riproducibilità e tracciabilità. Le aspettative sono proporzionate all’impatto: limitate per i sistemi che toccano appena i clienti, più severe per quelli che li toccano.
                </p>

                <p className="text-body leading-[1.6]">
                  La gestione dei sinistri esce quindi dal capitolo più pesante dell’AI Act e arriva, per un’altra via, a un insieme di aspettative proporzionato ma reale. L’obbligo non scompare. Cambia indirizzo.
                </p>
              </MotionDiv>

              {/* Cost of not explaining */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-does-it-cost-to-be-unable-to-explain-a-deci"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quanto costa non saper spiegare una decisione?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’autorità per la protezione dei dati di Amburgo ha inflitto a un fornitore di servizi finanziari una sanzione di 492.000 EUR, resa nota il 30 settembre 2025. L’azienda respingeva automaticamente le richieste di carte di credito, anche di richiedenti con un’affidabilità creditizia dimostrabilmente buona, senza sorveglianza umana. La conclusione dell’autorità non era che il modello fosse sbagliato. Era che l’azienda non spiegava adeguatamente la logica delle sue decisioni algoritmiche, né forniva accesso sufficiente al ragionamento sottostante quando richiesto.
                </p>

                <p className="text-body leading-[1.6]">
                  L’autorità ha espressamente considerato la collaborazione dell’azienda come un fattore attenuante significativo. Quello era il prezzo scontato.
                </p>
              </MotionDiv>

              {/* The gap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-gap-that-will-actually-catch-carriers"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Il divario che coglierà davvero gli assicuratori
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’AI Impact Survey 2026 di Grant Thornton, condotta dal 23 febbraio al 18 marzo 2026 su 950 dirigenti di cui 100 nel settore assicurativo, ha rilevato:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {governanceStats.map((stat) => (
                    <div
                      key={stat.value}
                      className="bg-card shadow-card rounded-pill px-[29px] py-[27px]"
                    >
                      <div className="text-kpi text-accent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-body leading-[1.6]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  La lettura di Grant Thornton stessa: «La maggior parte degli assicuratori ha già politiche di governance dell’IA, ma non ha costruito l’infrastruttura operativa per dimostrarle e testarle».
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  La distanza tra 61 e 24 è tutto il problema. La stessa frammentazione è ciò che lascia i progetti pilota a un passo dalla produzione, per la stessa ragione: è strutturale e non un difetto di modellazione, e si scopre tardi. Abbiamo trattato quello schema in{" "}
                  <Link
                    href="/blog/why-claims-ai-pilots-stall"
                    className="text-link hover:underline"
                  >
                    perché i progetti pilota di IA per i sinistri si bloccano prima di essere pronti per la produzione
                  </Link>
                  .
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Una politica è un’affermazione su come vi comportate. Una prova dimostra che lo avete fatto. Le autorità di vigilanza esaminano la seconda.
                  </p>
                </div>
              </MotionDiv>

              {/* Why 2027 does not help */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="why-the-2027-date-does-not-help"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Perché la data del 2027 non aiuta
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Provenienza a livello di campo, log decisionali che rendono rilevabile ogni manomissione e registrazioni decisionali versionate e riproducibili sono proprietà architetturali. Si determinano quando la pipeline viene progettata e non possono essere aggiunte dopo, perché un log scritto senza provenienza non può esserne arricchito in seguito. La decisione che registrava è perduta.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ecco perché prontezza all’audit e preparazione all’audit sono cose diverse. La preparazione è un esercizio che si svolge prima di un esame. La prontezza è una proprietà che il sistema ha mentre funziona, oppure non ha affatto. Solo una delle due risponde a una domanda su un sinistro chiuso l’anno scorso.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Una spiegazione è un’opinione su una decisione. La provenienza ne è la prova. <em>Dun &amp; Bradstreet</em> chiede cosa il sistema avrebbe prodotto da input diversi. Solo la seconda può rispondere. L’architettura che usiamo per produrla è esposta in{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link hover:underline"
                  >
                    verificabilità dell’IA per i sinistri: costruire catene delle prove che i revisori accettano davvero
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6]">
                  C’è una conseguenza progettuale che vale la pena di dichiarare chiaramente. Quanto più una decisione si basa su regole deterministiche anziché su un modello, tanto meno di essa va spiegato secondo uno standard comparativo, perché la regola <em>è</em> la spiegazione. In un programma europeo di garanzia auto applichiamo le regole di copertura del cliente a ogni voce di fattura e limitiamo il modello alla lettura dei documenti. È una scelta architetturale con un dividendo di conformità, non una misura di conformità aggiunta a posteriori.
                </p>
              </MotionDiv>

              {/* The test */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-test-worth-running-this-week"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Il test da fare questa settimana
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Prendete un sinistro chiuso dell’anno scorso. Chiedete al vostro team di ricostruire la decisione: ogni campo e da dove proviene, quale versione del modello è stata eseguita, cosa ha cambiato una persona e su quale base. Le dodici domande da porre a quel fascicolo sono esposte in{" "}
                  <Link
                    href="/blog/ai-claims-auditability-scorecard"
                    className="text-link hover:underline"
                  >
                    la scorecard di verificabilità dell’IA per i sinistri
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Se basta un clic, potete rispondere a un’autorità di vigilanza sotto qualsiasi regime tra quelli citati. La data del 2027 è una formalità.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Se serve un trimestre, avete trovato la vera scadenza. Non era il 2 dicembre 2027. Era il 25 maggio 2018. Il differimento non l’ha spostata.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Ricostruire una decisione su richiesta è ciò per cui{" "}
                    <Link
                      href="/platform/automated-coverage-check"
                      className="underline hover:no-underline"
                    >
                      Automated Coverage Check
                    </Link>{" "}
                    è costruito: comprensione agentica dei documenti in ingresso, logica deterministica sul lato decisionale e una registrazione di entrambi.
                  </p>
                </div>
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
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          La gestione dei sinistri non è elencata nell’allegato III.
                        </strong>{" "}
                        Vi compaiono solo la valutazione del rischio e la tariffazione vita e salute, al punto 5, lettera c). La bozza di linee guida della Commissione sulla classificazione, del 19 maggio 2026, cita la gestione dei sinistri come esempio di sistema che esula da quel punto, anche nell’assicurazione salute.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Il differimento dell’omnibus digitale non aiuta un’organizzazione sinistri
                        </strong>
                        , perché il capitolo spostato non è mai stato quello che la disciplinava.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          L’articolo 22 del GDPR è il vincolo che si applica nell’UE
                        </strong>
                        . Si applica dal 25 maggio 2018. Un sinistro respinto o ridotto vi rientra pienamente. Le operazioni svizzere e britanniche rispondono ai rispettivi equivalenti.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          La clausola sulla profilazione dell’articolo 6, paragrafo 3, è una trappola solo per i sistemi vita e salute.
                        </strong>{" "}
                        Non può salvare né condannare un sistema che non è mai stato nell’allegato III.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Una politica non è una prova.
                        </strong>{" "}
                        Il 61% degli assicuratori ha politiche di governance dell’IA a livello di consiglio; il 24% ritiene di poter superare una revisione di governance in 90 giorni.
                      </span>
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="frequently-asked-questions"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Domande frequenti
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
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
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Perché i progetti pilota di IA per i sinistri si bloccano prima di essere pronti per la produzione
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Le ragioni strutturali per cui i progetti pilota non arrivano in produzione.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Verificabilità dell’IA per i sinistri: costruire catene delle prove che i revisori accettano davvero
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      L’architettura dietro il test di ricostruzione qui sopra.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/case-studies/vehicle-warranty-claims"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Le stesse decisioni sui sinistri, in una frazione del tempo.
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Il programma di garanzia auto citato sopra.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline">
                  Fonti
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Regolamento (UE) 2026/1744 (omnibus digitale sull’IA), Gazzetta ufficiale, 24 luglio 2026; in vigore dal 27 luglio 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regolamento (UE) 2024/1689 (regolamento sull’IA), allegato III, punto 5; articolo 6, paragrafi 3 e 4; articolo 49, paragrafo 2.{" "}
                    <a
                      href="https://artificialintelligenceact.eu/annex/3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      artificialintelligenceact.eu
                    </a>
                  </li>
                  <li>
                    Commissione europea,{" "}
                    <em>
                      Bozza di linee guida sulla classificazione dei sistemi di IA ad alto rischio
                    </em>{" "}
                    (volume allegato III), 19 maggio 2026; consultazione chiusa il 23 giugno 2026; non vincolante.{" "}
                    <a
                      href="https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      digital-strategy.ec.europa.eu
                    </a>
                  </li>
                  <li>
                    CGUE, <em>OQ contro Land Hessen</em> (SCHUFA), C-634/21, 7 dicembre 2023.
                  </li>
                  <li>
                    CGUE,{" "}
                    <em>
                      CK contro Magistrat der Stadt Wien / Dun &amp; Bradstreet Austria GmbH
                    </em>
                    , C-203/22, 27 febbraio 2025.
                  </li>
                  <li>
                    Gruppo di lavoro Articolo 29,{" "}
                    <em>
                      Linee guida sul processo decisionale automatizzato relativo alle persone fisiche e sulla profilazione
                    </em>
                    , WP251rev.01, approvate dall’EDPB.
                  </li>
                  <li>
                    EIOPA,{" "}
                    <em>
                      Parere sulla governance e la gestione dei rischi dell’intelligenza artificiale
                    </em>
                    , EIOPA-BoS-25-360, 6 agosto 2025.{" "}
                    <a
                      href="https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eiopa.europa.eu
                    </a>
                  </li>
                  <li>
                    Commissario di Amburgo per la protezione dei dati e la libertà di informazione, sanzione di 492.000 EUR, resa nota il 30 settembre 2025.
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, risultati per il settore assicurativo; rilevazione dal 23 febbraio al 18 marzo 2026, 950 dirigenti, di cui 100 nel settore assicurativo.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Quadro normativo aggiornato al 31 luglio 2026. Non costituisce consulenza legale. Fate confermare classificazione e tempistiche dei vostri sistemi da consulenti qualificati.
                </p>
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
              Potete ricostruire la decisione dell’anno scorso?
            </h2>
            <p className="text-lg text-body mb-10">
              Costruiamo sistemi per i sinistri in cui ogni decisione può essere ricostruita dalla registrazione che ha prodotto all’epoca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Contattaci
              </ButtonLink>
              <ButtonLink href="/platform/automated-coverage-check" variant="on-dark" size="lg">
                Automated Coverage Check
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
