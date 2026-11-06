import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-10-31";

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="La sicurezza in True Aim" texture={{ name: "circ", position: "12% 88%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Ultimo aggiornamento:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="bg-lilac rounded-[12px] px-8 py-6 mb-8">
            <p className="text-body leading-[1.6]">
              <strong className="text-strong">Segnalare una vulnerabilità:</strong>{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline font-medium">
                security@trueaim.ai
              </a>
              . Confermiamo la ricezione delle segnalazioni entro 5 giorni lavorativi. Vedi{" "}
              <a href="#responsible-disclosure" className="text-link hover:underline">
                Divulgazione responsabile
              </a>.
            </p>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG gestisce una piattaforma per la gestione dei sinistri destinata ad assicuratori, broker e a qualsiasi soggetto della catena del valore assicurativa che gestisce o tratta sinistri. La sicurezza è un requisito fondamentale del nostro Servizio, e i nostri clienti ci affidano i dati personali dei loro assicurati. Questa pagina descrive il nostro programma di sicurezza a grandi linee. Per le evidenze complete a livello di audit (rapporto SOC 2 Type II una volta emesso, certificato ISO 27001, elenco dei sub-responsabili, accordo sul trattamento dei dati), contattate{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Sono disponibili previo accordo di riservatezza (NDA).
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Framework di conformità</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">ISO/IEC 27001:2022</strong>: certificato da A-LIGN, certificato ISMS-TR-090426, rilasciato il 4 settembre 2026, valido fino al 4 settembre 2029.</li>
                <li><strong className="text-strong">SOC 2 Type II</strong>: audit completato, relativo al periodo dal 1° maggio al 31 luglio 2026; il rapporto finale è stato emesso.</li>
                <li><strong className="text-strong">LPD svizzera</strong> and <strong className="text-strong">GDPR</strong>: allineata come responsabile del trattamento per i dati dei clienti.</li>
                <li><strong className="text-strong">AI Act</strong>: documentazione tecnica IA (AI Technical File) mantenuta per Automated Coverage Check; lo stato di preparazione attuale è documentato e monitorato.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Dove vengono trattati i dati</h2>
              <p className="text-body leading-[1.6]">
                I dati dei clienti a riposo sono conservati su Microsoft Azure nella regione Switzerland North. Hosting e inferenza IA restano in Svizzera, nel SEE o nel Regno Unito; le eccezioni sono elencate nell’elenco dei sub-responsabili, allegato 2 del nostro accordo sul trattamento dei dati.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Sub-processors</h2>
              <p className="text-body leading-[1.6]">
                Utilizziamo un insieme limitato di servizi Microsoft Azure per hosting, inferenza IA e telemetria operativa, oltre a Google Cloud (modelli Gemini per l’inferenza IA nell’UE), Google Workspace (per la posta elettronica aziendale), Slack (per la comunicazione interna del team) e Sentry (solo log tecnici degli errori). L’elenco attuale costituisce l’allegato 2 del nostro accordo sul trattamento dei dati ed è disponibile su richiesta. Informiamo i clienti in anticipo delle modifiche. Gli strumenti esclusivamente interni (controllo del codice sorgente, CI/CD, CRM) che non trattano dati di produzione dei Tenant non sono sub-responsabili verso i clienti e non sono elencati.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Cifratura</h2>
              <p className="text-body leading-[1.6]">
                Tutti i dati sono cifrati in transito (TLS 1.2 o superiore) e a riposo (AES-256 tramite la cifratura della piattaforma Azure). I segreti applicativi sono conservati in Azure Key Vault con eliminazione temporanea e protezione dall’eliminazione definitiva attivate.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Controllo degli accessi</h2>
              <p className="text-body leading-[1.6]">
                L’accesso ai dati dei clienti è limitato al personale autorizzato di True Aim secondo i principi del minimo privilegio e della necessità di conoscere, applicati tramite controlli di accesso basati sui ruoli e Azure Managed Identities. L’autenticazione a più fattori è obbligatoria per tutti gli account dei dipendenti.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Monitoraggio e risposta agli incidenti</h2>
              <p className="text-body leading-[1.6]">
                Gestiamo logging, allerta e monitoraggio continui dell’ambiente di produzione tramite Microsoft Defender for Cloud e Azure Monitor. Manteniamo una procedura documentata di risposta agli incidenti. I clienti vengono informati degli incidenti di sicurezza confermati che riguardano i loro dati senza indebito ritardo e in conformità al nostro accordo sul trattamento dei dati.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Gestione delle vulnerabilità</h2>
              <p className="text-body leading-[1.6]">
                Monitoriamo le dipendenze software e l’infrastruttura alla ricerca di vulnerabilità note tramite scansioni automatizzate e Microsoft Defender. I risultati vengono classificati secondo SLA di gravità documentati. Incarichiamo periodicamente penetration tester esterni.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Sicurezza del personale</h2>
              <p className="text-body leading-[1.6]">
                Tutto il personale è sottoposto a verifica dei precedenti, accetta obblighi di riservatezza e completa una formazione di sensibilizzazione su sicurezza e privacy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Continuità operativa</h2>
              <p className="text-body leading-[1.6]">
                I dati dei clienti vengono salvati con regolarità, con procedure di ripristino documentate. Testiamo periodicamente le nostre procedure di disaster recovery.
              </p>
            </section>

            <section id="responsible-disclosure" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Divulgazione responsabile</h2>
              <p className="text-body leading-[1.6]">
                Se ritenete di aver individuato una vulnerabilità di sicurezza nel nostro Servizio o in questo sito web, segnalatela a{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Ci impegniamo a confermare la ricezione della vostra segnalazione entro 5 giorni lavorativi e a collaborare con voi in buona fede per indagare e correggere i problemi verificati. Non intraprenderemo azioni legali contro i ricercatori che seguono questo processo di divulgazione, agiscono in buona fede e non accedono, modificano o eliminano dati oltre quanto necessario per dimostrare una vulnerabilità. Vedi anche il nostro canale{" "}
                <Link href="/ethics" className="text-link hover:underline">Etica e segnalazioni</Link>{" "}
                per le condotte scorrette non legate alla sicurezza.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contatti</h2>
              <p className="text-body leading-[1.6]">
                Per domande sulla sicurezza:{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Per richieste su privacy e protezione dei dati:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
