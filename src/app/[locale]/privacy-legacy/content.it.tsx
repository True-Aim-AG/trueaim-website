import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/brand/Button";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Informativa sulla privacy (versione precedente)
          </h1>
          <p className="text-sm text-muted mb-2">
            Ultimo aggiornamento: 8 febbraio 2026
          </p>
          <div className="bg-lilac rounded-pill px-8 py-6 mb-8">
            <p className="text-sm text-body leading-[1.6]">
              Questa è una versione precedente archiviata della nostra informativa sulla privacy. L’informativa attuale è disponibile su{" "}
              <Link href="/privacy" className="text-link hover:underline font-medium">
                trueaim.ai/privacy
              </Link>.
            </p>
          </div>

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Chi siamo</h2>
              <p className="text-body leading-[1.6]">
                Questo sito web è gestito da <strong className="text-strong">True Aim AG</strong>, numero di registrazione <strong className="text-strong">CHE-325.128.066</strong>, con sede legale a Zugo, Svizzera. Indirizzo registrato: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera. La presente informativa sulla privacy spiega come raccogliamo, utilizziamo e proteggiamo i dati personali quando interagite con il nostro sito web.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Ambito di applicazione della presente informativa</h2>
              <p className="text-body leading-[1.6]">
                La presente informativa sulla privacy si applica ai dati personali raccolti tramite il nostro sito web pubblico, inclusi i moduli di contatto, i moduli di richiesta demo e i link per la pianificazione di appuntamenti. Non disciplina il trattamento dei dati nell’ambito di accordi commerciali o contratti con i clienti, che sono soggetti a condizioni contrattuali separate.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Dati personali che raccogliamo</h2>
              <p className="text-body leading-[1.6]">
                Raccogliamo i dati personali che ci fornite volontariamente quando ci contattate o richiedete una demo. Possono includere nome e cognome, indirizzo e-mail aziendale, nome dell’azienda, ruolo, paese e qualsiasi informazione che scegliete di inserire nei campi di testo libero o che ci inviate di volta in volta su nostra richiesta. Se prenotate un appuntamento tramite un link al calendario, potremmo ricevere anche informazioni relative alla pianificazione. Possiamo inoltre raccogliere dati tecnici quali, tra gli altri, indirizzo IP, tipo di browser e dati di utilizzo, tramite cookie e strumenti di analisi.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Come utilizziamo i dati personali</h2>
              <p className="text-body leading-[1.6]">
                Utilizziamo i dati personali per rispondere alle richieste, organizzare demo o appuntamenti, comunicare con potenziali clienti e partner, migliorare il nostro sito web e capire come viene utilizzato. Se avete dato il consenso, possiamo anche utilizzare i vostri dati per inviarvi comunicazioni pertinenti su True Aim e sui nostri servizi. Non vendiamo dati personali e non li utilizziamo per decisioni automatizzate che riguardano le persone.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Base giuridica del trattamento</h2>
              <p className="text-body leading-[1.6]">
                Trattiamo i dati personali sulla base del vostro consenso, del nostro legittimo interesse a gestire e migliorare il nostro sito web e a rispondere alle richieste commerciali e, ove applicabile, per adempiere a obblighi di legge. Potete revocare il consenso in qualsiasi momento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Hosting dei dati e trasferimenti internazionali</h2>
              <p className="text-body leading-[1.6]">
                La nostra infrastruttura principale di hosting e sicurezza dei dati si trova in <strong className="text-strong">Svizzera</strong>. I dati personali possono essere consultati o trattati da altre giurisdizioni ove necessario per gestire il nostro sito web o supportare le attività aziendali. In caso di trasferimenti internazionali, adottiamo misure adeguate per garantire un’adeguata protezione dei dati in linea con gli standard svizzeri e dell’UE.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Conservazione dei dati</h2>
              <p className="text-body leading-[1.6]">
                Conserviamo i dati personali solo per il tempo necessario a conseguire le finalità descritte nella presente informativa, salvo che un periodo di conservazione più lungo sia richiesto o consentito dalla legge. Le informazioni inviate tramite i moduli di contatto o di richiesta demo vengono generalmente conservate per il follow-up commerciale e per finalità di archiviazione.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Sicurezza dei dati</h2>
              <p className="text-body leading-[1.6]">
                Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o uso improprio. Sebbene nessun sistema possa essere garantito come completamente sicuro, prendiamo sul serio la protezione dei dati e ci impegniamo a predisporre le salvaguardie appropriate.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. I vostri diritti</h2>
              <p className="text-body leading-[1.6]">
                A seconda del luogo in cui vi trovate e della legge applicabile, potete avere il diritto di richiedere l’accesso ai vostri dati personali, di chiederne la rettifica o la cancellazione, di opporvi al trattamento o di limitarlo, o di revocare il consenso. Le richieste possono essere inviate contattandoci a{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Sudafrica e POPIA</h2>
              <p className="text-body leading-[1.6]">
                Quando i dati personali vengono trattati in Sudafrica o dal Sudafrica, adottiamo misure per conformarci al Protection of Personal Information Act (POPIA). Il nostro{" "}
                <Link href="/paia" className="text-link hover:underline">
                  manuale PAIA
                </Link>{" "}
                fornisce ulteriori informazioni sulle richieste di accesso alle informazioni ai sensi del diritto sudafricano.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Cookie e strumenti di analisi</h2>
              <p className="text-body leading-[1.6]">
                Utilizziamo cookie e tecnologie simili come descritto nella nostra{" "}
                <Link href="/cookies" className="text-link hover:underline">
                  informativa sui cookie
                </Link>. Gli strumenti di analisi ci aiutano a comprendere l’utilizzo del sito web e a migliorarne le prestazioni. Potete gestire le preferenze sui cookie in qualsiasi momento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Modifiche alla presente informativa</h2>
              <p className="text-body leading-[1.6]">
                Possiamo aggiornare la presente informativa sulla privacy di tanto in tanto per riflettere cambiamenti nei requisiti di legge, nella tecnologia o nelle nostre prassi. La versione più recente sarà sempre disponibile in questa pagina o su richiesta, qualora esista una versione successiva non ancora pubblicata.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Contatti</h2>
              <p className="text-body leading-[1.6]">
                Per qualsiasi domanda sulla presente informativa sulla privacy o su come trattiamo i dati personali, potete contattarci a{" "}
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
      </div>
    </div>
  );
}
