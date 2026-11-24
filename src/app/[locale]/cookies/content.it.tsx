import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Informativa sui cookie" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted">Ultimo aggiornamento: 24 novembre 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Chi siamo</h2>
            <p className="text-body leading-[1.6]">
              Questo sito web è gestito da <strong className="text-strong">True Aim AG</strong>, numero di iscrizione al registro di commercio <strong className="text-strong">CHE-325.128.066</strong>, con sede legale a Zugo, Svizzera. Indirizzo registrato: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera. La presente informativa sui cookie spiega come utilizziamo i cookie e tecnologie simili sul nostro sito web.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Cosa sono i cookie?</h2>
            <p className="text-body leading-[1.6]">
              I cookie sono piccoli file di testo che vengono salvati sul vostro dispositivo quando visitate un sito web. Aiutano i siti a funzionare correttamente, migliorano l’esperienza d’uso e forniscono informazioni su come il sito viene utilizzato. I cookie possono essere impostati da noi (cookie di prima parte) o da servizi di terzi che utilizziamo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Come utilizziamo i cookie</h2>
            <p className="text-body leading-[1.6]">
              Utilizziamo tre categorie di cookie e di tecnologie simili.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Essenziali</strong> comprende solo la registrazione della vostra scelta sui cookie. Questa categoria è sempre attiva, perché ci serve per rispettare la vostra scelta.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Analitici</strong> comprende Google Analytics 4, caricato tramite Google Tag Manager. Ci mostra come i visitatori usano il sito, ad esempio quali pagine sono più visitate. Vediamo queste statistiche in forma aggregata e le usiamo per migliorare il sito.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Tracciamento HubSpot</strong> comprende il tracker HubSpot. Riconosce il vostro browser quando tornate, registra le vostre visite e le collega a una richiesta di demo che inviate. Così le visite compaiono nella vostra scheda di contatto nel nostro CRM. Dopo l’invio di una richiesta questi dati riguardano voi come persona, perciò il tracciamento HubSpot ha una propria scelta nel banner dei cookie.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Non utilizziamo cookie pubblicitari.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookie utilizzati su questo sito web</h2>
            <p className="text-body leading-[1.6]">
              Nessun cookie viene impostato prima della vostra scelta nel banner dei cookie. La durata è il periodo dopo il quale l’elemento scade. Il vostro browser può cancellarlo prima.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                <thead>
                  <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Nome</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Impostato da</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Categoria</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Funzione</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Durata</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>cookie-consent</code> (archiviazione locale, non un cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Essenziali</td><td className="py-3 pr-4">Registra la vostra scelta per ogni categoria</td><td className="py-3 pr-4">6 mesi, poi il banner chiede di nuovo</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>ta-first-touch</code> (archiviazione locale, non un cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Analitici</td><td className="py-3 pr-4">Registra la pagina di arrivo, il sito di provenienza e i parametri di campagna, inviati con una richiesta di demo</td><td className="py-3 pr-4">90 giorni</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>_ga</code>, <code>_ga_*</code></th><td className="py-3 pr-4">Google Analytics 4, tramite Google Tag Manager</td><td className="py-3 pr-4">Analitici</td><td className="py-3 pr-4">Misurano le pagine visualizzate e le interazioni</td><td className="py-3 pr-4">400 giorni</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>hubspotutk</code>, <code>__hstc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Tracciamento HubSpot</td><td className="py-3 pr-4">Riconoscono i visitatori che tornano e collegano gli invii del modulo di contatto alle visite</td><td className="py-3 pr-4">180 giorni</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Tracciamento HubSpot</td><td className="py-3 pr-4">Conta le pagine di una visita</td><td className="py-3 pr-4">30 minuti</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssrc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Tracciamento HubSpot</td><td className="py-3 pr-4">Rileva una nuova sessione del browser</td><td className="py-3 pr-4">Fino alla chiusura del browser</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__cf_bm</code></th><td className="py-3 pr-4">HubSpot (sui domini propri di HubSpot)</td><td className="py-3 pr-4">Tracciamento HubSpot</td><td className="py-3 pr-4">Protegge i servizi di HubSpot dai bot</td><td className="py-3 pr-4">30 minuti</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, l’agenzia che lavora sulle prestazioni del nostro sito, ha accesso ai nostri account Google Tag Manager e Google Analytics e non imposta cookie propri. Questo elenco viene aggiornato quando aggiungiamo o rimuoviamo un servizio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Gestire le preferenze sui cookie</h2>
            <p className="text-body leading-[1.6]">
              Alla vostra prima visita, il banner dei cookie vi chiede la vostra scelta. &laquo;Accetta tutti&raquo; consente gli analitici e il tracciamento HubSpot, &laquo;Rifiuta&raquo; non consente nessuno dei due, e &laquo;Gestisci le preferenze&raquo; vi permette di scegliere ogni categoria separatamente.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Potete modificare o revocare la vostra scelta in qualsiasi momento con &laquo;Preferenze cookie&raquo; nel piè di pagina di ogni pagina. Quando revocate una categoria, cancelliamo i suoi cookie. Conserviamo la vostra scelta per 6 mesi; dopo, il banner chiede di nuovo. Potete anche cancellare i cookie nelle impostazioni del browser.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Protezione dei dati e accesso internazionale</h2>
            <p className="text-body leading-[1.6]">
              I dati dei cookie sono trattati da Google Ireland Limited e HubSpot Ireland Limited (data center europeo in Germania). Quando il trattamento avviene al di fuori dell’UE, si basa sulle clausole contrattuali standard. Per maggiori informazioni su come trattiamo i dati personali, consultate la nostra{" "}
              <Link href="/privacy" className="text-link hover:underline">
                informativa sulla privacy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Aggiornamenti di questa informativa</h2>
            <p className="text-body leading-[1.6]">
              Possiamo aggiornare di tanto in tanto la presente informativa sui cookie per riflettere cambiamenti tecnologici, requisiti di legge o il modo in cui gestiamo il nostro sito. La versione più recente sarà sempre disponibile su questa pagina o su richiesta, se esiste una versione successiva non ancora pubblicata.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Contatti</h2>
            <p className="text-body leading-[1.6]">
              Se avete domande sul nostro utilizzo dei cookie, potete contattarci a{" "}
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
