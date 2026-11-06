import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function PAIAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Manuale PAIA" texture={{ name: "circ", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Ultimo aggiornamento: 8 febbraio 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-sm text-muted italic">
              Redatto in conformità al Promotion of Access to Information Act, 2 of 2000
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Introduzione</h2>
              <p className="text-body leading-[1.6]">
                Il presente Manuale PAIA è stato redatto in conformità alla sezione 51 del Promotion of Access to Information Act, 2000 («PAIA») e incorpora i requisiti pertinenti del Protection of Personal Information Act, 2013 («POPIA»). Lo scopo del Manuale è definire le procedure per richiedere l’accesso ai documenti detenuti da <strong className="text-strong">True Aim AG</strong> e fornire le informazioni richieste dal PAIA e dal POPIA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Dati della società</h2>
              <div className="space-y-2 text-body leading-[1.6]">
                <p><span className="font-medium text-strong">Denominazione sociale:</span> True Aim AG</p>
                <p><span className="font-medium text-strong">Numero di registrazione:</span> CHE-325.128.066</p>
                <p><span className="font-medium text-strong">Sede legale:</span> Zugo, Svizzera</p>
                <p><span className="font-medium text-strong">Indirizzo registrato:</span> c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera</p>
                <p><span className="font-medium text-strong">E-mail di contatto:</span>{" "}
                  <a href="mailto:info@trueaim.ai" className="text-link hover:underline">info@trueaim.ai</a>
                </p>
              </div>
              <p className="text-body leading-[1.6] mt-4">
                True Aim AG è una società con sede in Svizzera che opera a livello globale, comprese alcune attività di trattamento dei dati relative al Sudafrica.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Responsabile delle informazioni (Information Officer)</h2>
              <p className="text-body leading-[1.6]">
                Il responsabile delle informazioni di True Aim AG è il <strong className="text-strong">Chief Executive Officer (CEO) di True Aim AG</strong>. Non è stato nominato alcun vice responsabile delle informazioni.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Tutte le richieste relative al PAIA e al POPIA devono essere inviate via e-mail a:{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Guida all’uso del PAIA</h2>
              <p className="text-body leading-[1.6]">
                La Commissione sudafricana per i diritti umani ha redatto una guida che spiega come utilizzare il PAIA, compreso come presentare le richieste di accesso. La guida è disponibile sul sito web o presso gli uffici della Commissione.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Documenti disponibili senza richiesta PAIA</h2>
              <p className="text-body leading-[1.6] mb-4">
                I seguenti documenti sono disponibili senza presentare una richiesta PAIA formale:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Informazioni pubblicate sul sito web di True Aim</li>
                <li>Materiali di marketing pubblici</li>
                <li>Articoli del blog e casi studio pubblicati</li>
                <li>Comunicazioni pubbliche societarie o regolamentari</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Categorie di documenti detenuti</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG può detenere documenti relativi alla propria amministrazione societaria, alle attività commerciali, alla situazione finanziaria, al personale, ai sistemi informativi, alle relazioni d’affari e agli obblighi di conformità, comprese informazioni personali ai sensi del POPIA. L’accesso a tali documenti è soggetto alle limitazioni e ai motivi di rifiuto previsti dal PAIA e dalle altre leggi applicabili.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Documenti relativi a informazioni personali (POPIA)</h2>
              <p className="text-body leading-[1.6] mb-4">
                True Aim AG tratta informazioni personali per finalità aziendali legittime, tra cui:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Gestione di contatti e richieste</li>
                <li>Richieste di demo e pianificazione di incontri</li>
                <li>Comunicazioni aziendali</li>
                <li>Finalità operative e amministrative</li>
                <li>Conformità legale o regolamentare</li>
              </ul>
              <p className="text-body leading-[1.6] mt-4">
                Le informazioni personali sono trattate principalmente in <strong className="text-strong">Svizzera</strong>, con adeguate misure di sicurezza tecniche e organizzative. Quando le informazioni personali riguardano interessati sudafricani, il trattamento è condotto in linea con i principi del POPIA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Procedura di richiesta</h2>
              <p className="text-body leading-[1.6]">
                Le richieste di accesso ai documenti devono essere presentate per iscritto via e-mail al responsabile delle informazioni all’indirizzo{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>. Il richiedente deve fornire dettagli sufficienti a identificare il documento richiesto e indicare la forma di accesso desiderata. Prima dell’elaborazione della richiesta è necessaria una prova di identità.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Costi</h2>
              <p className="text-body leading-[1.6]">
                Ove applicabile, può essere addebitato un costo per la richiesta in conformità al PAIA. Eventuali costi applicabili saranno comunicati prima dell’elaborazione della richiesta.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Motivi di rifiuto</h2>
              <p className="text-body leading-[1.6]">
                L’accesso ai documenti può essere rifiutato per i motivi previsti dal PAIA, tra cui la protezione delle informazioni personali, delle informazioni commerciali riservate, della proprietà intellettuale e dei segreti commerciali, il segreto professionale legale e considerazioni di sicurezza.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Disponibilità del presente Manuale</h2>
              <p className="text-body leading-[1.6]">
                La versione più recente del Manuale PAIA sarà sempre disponibile su questa pagina o su richiesta, se esiste una versione successiva non ancora pubblicata. Potete richiederla via e-mail a{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Aggiornamenti</h2>
              <p className="text-body leading-[1.6]">
                Il presente Manuale può essere aggiornato di tanto in tanto per riflettere modifiche legislative o delle prassi aziendali.
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
