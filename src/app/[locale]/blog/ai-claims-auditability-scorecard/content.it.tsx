import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ScrollText,
  User, ArrowRight } from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { scorecardQuestions, type ScorecardQuestion } from "./questions.it";
import { faqs } from "./faqs.it";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "In questa pagina" panel; the H2s carry the full questions.
const sections: { id: string; heading: string }[] = [
  { id: "provenance", heading: "Provenienza" },
  { id: "reconstruction", heading: "Ricostruzione" },
  { id: "human-judgement", heading: "Giudizio umano" },
  { id: "continuity", heading: "Continuità" },
  { id: "the-principle", heading: "Il principio dietro True Aim" },
  { id: "using-the-scorecard", heading: "Come usare la scorecard" },
];

/**
 * One group of scorecard questions as a numbered list of house cards. The
 * numbering runs 1..12 across all four groups, so each list continues from
 * the previous one rather than restarting.
 */
function QuestionGroup({ group }: { group: ScorecardQuestion["group"] }) {
  const items = scorecardQuestions
    .map((item, index) => ({ item, number: index + 1 }))
    .filter(({ item }) => item.group === group);
  return (
    <ol
      start={items[0]?.number}
      role="list"
      className="space-y-4 list-none p-0"
    >
      {items.map(({ item, number }) => (
        <li
          key={item.question}
          className="bg-card shadow-card rounded-pill p-8"
        >
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {number}
            </span>
            <span>{item.question}</span>
          </h3>
          <div className="text-sm text-body leading-[1.6] space-y-3">
            {item.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function AuditabilityScorecardBlogPost({
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
        <TextureBackdrop texture={{ name: "circ", position: "72% 18%" }} />

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

            {/* Standfirst question */}
            <p className="text-base md:text-lg font-medium text-body mb-3">
              Cosa dovreste chiedere prima di affidare a un’IA una decisione su un sinistro?
            </p>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              La scorecard di verificabilità dell’IA per i sinistri
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Dodici domande che mostrano se un sistema di IA per i sinistri può rendere conto di ogni decisione che prende, e come True Aim risponde a ciascuna.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO, True Aim
                  AG
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                14 min di lettura
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
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    La risposta breve
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          La verificabilità si decide nell’architettura.
                        </strong>{" "}
                        Un fascicolo decisionale scritto senza provenienza non può riceverla a posteriori.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Le scadenze «alto rischio» dell’AI Act europeo (regolamento europeo sull’IA) sono state spostate a dicembre 2027.
                        </strong>{" "}
                        La gestione dei sinistri non è mai stata in quell’elenco, e il GDPR disciplina le decisioni automatizzate dal 2018.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Dodici domande in quattro gruppi:
                        </strong>{" "}
                        provenienza, ricostruzione, giudizio umano e continuità.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Il test decisivo è la ricostruzione.
                        </strong>{" "}
                        Prendete un sinistro chiuso l’anno scorso e ricostruite la decisione dal solo fascicolo.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Solo il 24% dei dirigenti assicurativi è molto fiducioso
                        </strong>{" "}
                        di poter superare una revisione indipendente della governance e dei controlli sull’IA, con evidenze centralizzate, nei prossimi 90 giorni. La fiducia non è una prova.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Un sinistro è una serie di decisioni. A quali documenti credere. Quale clausola si applica. Cosa deve la polizza. Se una voce di fattura è equa. Automatizzare queste decisioni è ormai alla portata di qualsiasi organizzazione sinistri. Automatizzarle in modo che ciascuna possa essere spiegata e difesa, davanti a un cliente, un revisore o un’autorità di vigilanza, anni dopo la chiusura del fascicolo, è una disciplina diversa. Quella disciplina è l’argomento di questo articolo.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Il calendario normativo ha offerto di recente un pretesto per rimandarla. Nel luglio 2026 l’Unione europea ha differito la maggior parte degli obblighi «alto rischio» dell’AI Act, a dicembre 2027 per i sistemi indipendenti. La gestione dei sinistri non è mai rientrata tra gli usi che il regolamento classifica ad alto rischio, e i diritti di una persona soggetta a una decisione esclusivamente automatizzata, compreso il diritto a informazioni significative sulla logica utilizzata, si applicano ai sensi del GDPR dal 2018. Il differimento cambia il calendario per altri sistemi. Non cambia ciò che un’organizzazione sinistri deve alle persone sui cui sinistri decide. Abbiamo esposto i dettagli separatamente nel{" "}
                  <Link
                    href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                    className="text-link underline underline-offset-2"
                  >
                    nostro articolo sull’AI Act e la gestione dei sinistri
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La ragione più forte per non aspettare è pratica. La prova si decide nell’architettura. Un sistema che registra da dove proviene ogni valore, quale regola o modello l’ha prodotto e chi l’ha confermato può rispondere a qualsiasi domanda gli venga posta in seguito. Un sistema che non lo fa non può essere riparato a posteriori, perché ciò che il fascicolo non ha catturato quel giorno è perduto. La conformità o è integrata dal primo sinistro o viene aggiunta dopo come uno strato di spiegazione su decisioni che nessuno può ricostruire.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’AI Impact Survey 2026 di Grant Thornton, condotta su 950 dirigenti di cui 100 nel settore assicurativo, ha rilevato che solo il{" "}
                  <strong className="text-strong">24%</strong> è molto fiducioso di poter superare una revisione indipendente della governance e dei controlli sull’IA, con evidenze centralizzate, nei prossimi 90 giorni. Con quel campione la cifra è indicativa, ma la direzione è chiara, e il divario è un problema di documentazione prima che di modellazione.
                </p>

                <p className="text-body leading-[1.6]">
                  Le dodici domande che seguono sono quelle a cui, a nostro avviso, ogni responsabile sinistri dovrebbe saper rispondere riguardo a qualsiasi IA che operi in suo nome, sviluppata internamente o acquistata. Sotto ciascuna indichiamo che aspetto ha una buona risposta e come True Aim la affronta. Nella maggior parte dei casi è la stessa risposta, perché True Aim è stata progettata attorno a queste domande.
                </p>
              </MotionDiv>

              {/* Group 1: provenance */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="provenance"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Potete mostrare da dove viene ogni risposta?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La provenienza è il fondamento di tutto ciò che segue, ed è la proprietà più facile da verificare. Chiedete di vedere un sinistro reale.
                </p>

                <QuestionGroup group="Provenance" />
              </MotionDiv>

              {/* Group 2: reconstruction */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="reconstruction"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Potete ricostruire una decisione chiusa l’anno scorso?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La ricostruzione è ciò che separa l’essere pronti per un audit dal prepararsi a un audit. La preparazione è un esercizio che inizia quando l’esame viene annunciato. La prontezza è una proprietà che il sistema ha mentre funziona, oppure non ha affatto. Solo la seconda può rispondere a una domanda su un sinistro chiuso diciotto mesi fa.
                </p>

                <QuestionGroup group="Reconstruction" />
              </MotionDiv>

              {/* Group 3: human judgement */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="human-judgement"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’essere umano nel processo decide davvero?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Il giudizio umano è il controllo su cui la maggior parte delle organizzazioni fa affidamento e quello meno spesso verificato. Una fase di revisione è un controllo reale solo quando il revisore può vedere le prove e ha l’autorità di cambiare l’esito. Ai sensi del GDPR, una decisione esclusivamente automatizzata conferisce alla persona diritti specifici, e un’approvazione che nessuno potrebbe realisticamente rifiutare non cambia le cose. Ben progettata, la fase di revisione è anche il punto in cui la competenza di un professionista dei sinistri viene usata al meglio: sul giudizio, non sull’aritmetica.
                </p>

                <QuestionGroup group="Human judgement" />
              </MotionDiv>

              {/* Group 4: continuity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="continuity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le prove sopravvivono a nuovi sinistri, al tempo e al cambiamento?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  L’ultimo gruppo guarda oltre la singola decisione, alle condizioni che la circondano: come il sistema è stato messo alla prova, cosa accade alle registrazioni quando le circostanze cambiano e dove risiede la responsabilità lungo tutto il percorso.
                </p>

                <QuestionGroup group="Continuity" />
              </MotionDiv>

              {/* The principle */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-principle"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Il principio dietro True Aim
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Tutto ciò che True Aim fa produce una decisione, alimenta una decisione o prova una decisione. Un sinistro viene riunito in un unico fascicolo completo. Le prove vengono verificate nella loro integrità prima che qualcosa venga deciso, e ciò che non supera quel controllo non raggiunge mai la fase decisionale. Ogni decisione è calcolata rispetto al testo in vigore, con la sua motivazione allegata. Ogni azione, di una persona o di una macchina, viene scritta in un fascicolo con manomissioni rilevabili, che può essere ricostruito, esportato e spiegato per tutto il tempo in cui è conservato. L’architettura è descritta per intero nel{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link underline underline-offset-2"
                  >
                    nostro articolo sulle catene delle prove
                  </Link>
                  .
                </p>

                <div className="mt-6 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Questo significa avere la conformità integrata dal primo sinistro. Il giudizio resta a voi. L’aritmetica, il testo e le prove non devono più restare con voi.
                  </p>
                </div>
              </MotionDiv>

              {/* Using the scorecard */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="using-the-scorecard"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Come usare la scorecard
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Scegliete un sinistro chiuso l’anno scorso, idealmente uno respinto, e percorrete le dodici domande su quel sinistro, dal solo fascicolo. Se la decisione può essere ricostruita campo per campo in pochi minuti, l’organizzazione può rispondere a un cliente, a un revisore o a un’autorità di vigilanza sotto qualsiasi regime, e la data del 2027 è una formalità. Se serve un trimestre, quella è la vera scadenza, e non è mai stata il 2027.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Il test che porremmo a qualsiasi consiglio di amministrazione è semplice. Se domani un’autorità di vigilanza chiedesse di esaminare una decisione automatizzata su un sinistro, riga per riga, potreste farlo?
                </p>

                <p className="text-body leading-[1.6]">
                  La scorecard si applica a qualsiasi sistema, compreso il nostro.{" "}
                  <Link href="/trust" className="text-link underline underline-offset-2">
                    Il nostro Trust Center
                  </Link>{" "}
                  illustra come True Aim risponde a ciascuna di queste domande, e siamo aperti al confronto.
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
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Scegliete la verificabilità in fase di progettazione.
                        </strong>{" "}
                        La provenienza registrata dal primo sinistro è l’unica che esiste.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Calcolate ciò che si può calcolare.
                        </strong>{" "}
                        Regole dove il testo copre i fatti, modelli dove le prove sono non strutturate, e un fascicolo che mostra cosa è cosa.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Rendete il giudizio umano un controllo reale.
                        </strong>{" "}
                        Il revisore vede le prove, ha l’autorità di cambiare l’esito e ogni intervento viene registrato con la sua motivazione.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Dimostrate prima le prestazioni su sinistri mai visti.
                        </strong>{" "}
                        Un’accuratezza misurata sui sinistri su cui un sistema è stato messo a punto misura la familiarità, non la competenza.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Tenete le registrazioni nelle vostre mani.
                        </strong>{" "}
                        Manomissioni rilevabili, esportazione con un clic e conservazione allineata ai vostri obblighi.
                      </span>
                    </li>
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

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.answer}
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
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Costruire catene delle prove che i revisori accettano davvero
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      L’architettura dietro provenienza e ricostruzione.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Perché i progetti pilota di IA per i sinistri si bloccano prima di essere pronti per la produzione
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Perché i test su sinistri mai visti decidono se un progetto pilota arriva in produzione.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La gestione dei sinistri con IA non è ad alto rischio secondo l’AI Act europeo
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Perché il differimento non cambia nulla per un’organizzazione sinistri.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sources"
                  className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline scroll-mt-24"
                >
                  Fonti
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Regolamento (UE) 2026/1744 (omnibus digitale sull’IA), Gazzetta ufficiale del 24 luglio 2026, in vigore dal 27 luglio 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regolamento (UE) 2024/1689 (regolamento sull’IA), allegato III e articolo 113.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regolamento (UE) 2016/679 (GDPR), articolo 15, paragrafo 1, lettera h), e articolo 22.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Comunicazione sulla vigilanza 08/2024: Governance e gestione dei rischi nell’impiego dell’intelligenza artificiale
                    </em>
                    , 18 dicembre 2024.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Circolare 2018/3: Outsourcing – banche, assicurazioni e istituti finanziari ai sensi della LIsFi
                    </em>
                    , modificata l’ultima volta il 4 novembre 2020, in vigore dal 1° gennaio 2021, nm. 24.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, risultati per il settore assicurativo; rilevazione dal 23 febbraio al 18 marzo 2026, 950 dirigenti, di cui 100 nel settore assicurativo.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Quadro normativo aggiornato al 10 settembre 2026. Non costituisce consulenza legale.
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
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Il rischio zero non esiste. Le decisioni spiegabili sì.
            </h2>
            <p className="text-lg text-body mb-10">
              Parliamo di come queste dodici domande si applicano alla vostra gestione dei sinistri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Contattaci
              </ButtonLink>
              <ButtonLink href="/trust" variant="on-dark" size="lg">
                Trust Center
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
