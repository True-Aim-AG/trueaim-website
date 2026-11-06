import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function AITransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Trasparenza e sorveglianza dell’IA" texture={{ name: "glass", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Ultimo aggiornamento: 22 febbraio 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Scopo della presente dichiarazione</h2>
              <p className="text-body leading-[1.6]">
                La presente dichiarazione descrive l’approccio di True Aim AG alla progettazione e all’uso dell’intelligenza artificiale nei suoi prodotti. Illustra il ruolo dell’IA nei nostri sistemi, i limiti entro cui opera e i meccanismi di sorveglianza applicati. Riflette il nostro approccio alla data dell’ultimo aggiornamento indicata sopra e può essere rivista di tanto in tanto con l’evolversi della nostra architettura, delle nostre prassi di governance e del contesto regolamentare. È fornita esclusivamente a fini di trasparenza e non costituisce un impegno contrattuale né una classificazione regolamentare formale.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Il nostro approccio progettuale</h2>
              <p className="text-body leading-[1.6]">
                True Aim costruisce infrastrutture decisionali assistite dall’IA per i settori regolamentati. I nostri sistemi sono progettati per supportare analisi strutturata, interpretazione ed esecuzione dei workflow entro limiti di controllo definiti. I componenti di IA vengono usati per supportare la comprensione dei documenti, l’estrazione dei dati, la classificazione e il supporto analitico nelle diverse fasi della catena di elaborazione. La revisione umana e il controllo organizzativo restano centrali negli ambienti di produzione. Decisioni ed esiti devono poter essere spiegati e riesaminati in modo strutturato.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Dove viene usata l’IA</h2>
              <p className="text-body leading-[1.6]">
                Nei nostri prodotti l’IA può essere usata per convertire documenti in testo strutturato, classificare i tipi di documento, estrarre informazioni strutturate e supportare l’elaborazione analitica. L’IA può supportare l’analisi anche quando le informazioni sono complete e non ambigue, come parte dell’accelerazione dei workflow e dell’elaborazione strutturata. I componenti di IA operano in fasi definite dell’architettura di sistema e sono integrati in controlli più ampi basati su regole e workflow.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Dove l’IA non viene usata</h2>
              <p className="text-body leading-[1.6]">
                I componenti di IA non sono progettati per assumere autonomamente autorità organizzativa né per agire al di fuori delle fasi di workflow definite. La responsabilità finale per decisioni, azioni ed esiti resta all’organizzazione che utilizza il sistema. Se un’organizzazione sceglie di automatizzare un passaggio successivo o un’azione operativa a seguito di un output, una raccomandazione o un’analisi del sistema, la decisione di procedere e le sue conseguenze restano a tale organizzazione. Questo vale sia che il passaggio successivo sia manuale, semiautomatizzato o automatizzato tramite configurazione del sistema.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Sorveglianza e controllo dei workflow</h2>
              <p className="text-body leading-[1.6]">
                I sistemi di True Aim sono progettati per supportare la sorveglianza umana nei workflow di produzione. Gli utenti possono esaminare gli output del sistema, valutare le informazioni di supporto e applicare il proprio giudizio prima di finalizzare gli esiti. Autorizzazioni basate sui ruoli e controlli di workflow limitano l’accesso alle modifiche di configurazione e agli aggiustamenti della logica decisionale. Gli output del sistema hanno natura consultiva, salvo diversa definizione in un accordo scritto separato.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Verificabilità e tracciabilità</h2>
              <p className="text-body leading-[1.6]">
                I sistemi di True Aim sono progettati per supportare la verificabilità e il riesame a posteriori. Le fasi di elaborazione possono essere registrate in modo da consentire la tracciabilità dagli esiti ai materiali di origine, alle regole applicate e alle configurazioni di sistema pertinenti in vigore al momento dell’elaborazione. Questa registrazione strutturata è pensata per supportare revisione, garanzia della qualità e analisi di conformità negli ambienti regolamentati.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Principi di gestione dei dati</h2>
              <p className="text-body leading-[1.6]">
                True Aim non addestra modelli di IA di base sui dati dei clienti. I componenti di IA operano tramite servizi di IA gestiti e trattano i dati a fini di inferenza all’interno del workflow definito. Sicurezza, cifratura e controlli di accesso sono applicati in linea con le nostre più ampie prassi di sicurezza delle informazioni. Le prassi di conservazione e cancellazione dei dati sono regolate dagli accordi contrattuali e dai requisiti di legge applicabili.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Progettazione basata sul rischio</h2>
              <p className="text-body leading-[1.6]">
                I nostri sistemi sono sviluppati pensando ai casi d’uso regolamentati. Misure architetturali supportano spiegabilità, revisione strutturata, controllo degli accessi e trasparenza operativa. Continuiamo a perfezionare le nostre prassi tecniche e di governance con l’evolversi degli standard regolamentari e delle aspettative del settore.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Evoluzione dei sistemi</h2>
              <p className="text-body leading-[1.6]">
                True Aim opera in un contesto tecnologico in rapida evoluzione. Architettura di sistema, fornitori di modelli, metodi di elaborazione e meccanismi di controllo possono evolvere nel tempo. La presente dichiarazione descrive il nostro approccio generale al momento della pubblicazione e va letta in tale contesto.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contatti</h2>
              <p className="text-body leading-[1.6]">
                Se avete domande sul nostro approccio all’uso o alla sorveglianza dell’IA, potete contattarci a{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Società: True Aim AG<br />
                Sede legale: Zugo, Svizzera
              </p>
            </section>

            <div className="pt-4">
              <ButtonLink href="/contact" variant="primary" size="md">
                Contattaci
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
