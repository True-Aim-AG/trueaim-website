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
        <p className="mt-6 text-sm text-muted">Ultimo aggiornamento: 19 ottobre 2026</p>
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
              Utilizziamo i cookie per le seguenti finalità. I cookie essenziali sono necessari al corretto funzionamento del sito e non possono essere disattivati. Supportano funzioni di base come la navigazione tra le pagine, l’invio dei moduli e la sicurezza. I cookie analitici ci aiutano a capire come i visitatori usano il nostro sito, ad esempio quali pagine vengono visitate più spesso e come gli utenti si muovono nel sito. Queste informazioni servono a migliorare le prestazioni e l’usabilità del sito. I dati analitici sono aggregati e non identificano direttamente i singoli utenti. Non impostiamo cookie di marketing o pubblicitari.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookie utilizzati su questo sito web</h2>
            <p className="text-body leading-[1.6]">
              Nessun cookie viene impostato prima che facciate una scelta nel banner dei cookie. I cookie e le tecnologie simili presenti su questo sito sono:
            </p>
            <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
              <li><strong className="text-strong">Scelta del consenso</strong> (salvata da questo sito nell’archiviazione locale del vostro browser, non un cookie): ricorda se avete accettato o rifiutato i cookie analitici.</li>
              <li><strong className="text-strong">Google Analytics 4, caricato tramite Google Tag Manager</strong> (<code>_ga</code>, <code>_ga_*</code>): impostati solo dopo che avete accettato i cookie analitici; misurano le visualizzazioni di pagina e le interazioni.</li>
              <li><strong className="text-strong">HubSpot</strong> (<code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code>, <code>__hssrc</code>): impostati solo dopo che avete accettato i cookie analitici; riconoscono i visitatori di ritorno e collegano gli invii del modulo di contatto alle visite.</li>
            </ul>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, l’agenzia che lavora sulle prestazioni del nostro sito, ha accesso ai nostri account Google Tag Manager e Google Analytics e non imposta cookie propri. Questo elenco viene aggiornato quando aggiungiamo o rimuoviamo un servizio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Gestire le preferenze sui cookie</h2>
            <p className="text-body leading-[1.6]">
              Quando visitate il nostro sito, potete scegliere se accettare o rifiutare i cookie non essenziali. Potete inoltre gestire o eliminare i cookie in qualsiasi momento dalle impostazioni del vostro browser. Tenete presente che la disattivazione dei cookie essenziali può compromettere il funzionamento del sito.
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
