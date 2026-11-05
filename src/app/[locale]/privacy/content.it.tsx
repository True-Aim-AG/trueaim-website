import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-10-19";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "roles", label: "1. Ruoli" },
  { id: "categories", label: "2. Categorie di dati personali che trattiamo" },
  { id: "lawful-bases", label: "3. Basi giuridiche del trattamento" },
  { id: "use", label: "4. Come utilizziamo i dati personali" },
  { id: "sub-processors", label: "5. Sub-responsabili e comunicazioni" },
  { id: "transfers", label: "6. Trasferimenti internazionali" },
  { id: "security", label: "7. Sicurezza" },
  { id: "retention", label: "8. Conservazione" },
  { id: "rights", label: "9. I vostri diritti" },
  { id: "automated", label: "10. Processi decisionali automatizzati" },
  { id: "changes", label: "11. Modifiche a questa informativa" },
  { id: "contact", label: "12. Contatti" },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Informativa sulla privacy" texture={{ name: "circ", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted">
          <strong className="text-strong">Data di entrata in vigore:</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong className="text-strong">Ultimo aggiornamento:</strong> {LAST_UPDATED}
        </p>
        <p className="mt-2 text-sm text-muted">
          Versioni precedenti:{" "}
          <Link href="/privacy-legacy" className="text-link hover:underline">
            v1 (feb 2026)
          </Link>
        </p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Indice</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-link hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG («True Aim», «noi») fornisce una piattaforma multi-tenant per la gestione dei sinistri (il «Servizio»). La presente informativa sulla privacy descrive come raccogliamo, utilizziamo, comunichiamo e proteggiamo i dati personali quando i nostri clienti (i «Tenant») e i loro utenti finali (collettivamente, «voi») interagiscono con il nostro Servizio o con questo sito web.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Ruoli</h2>
              <p className="text-body leading-[1.6]">
                Per i dati personali trasmessi da un Tenant sui propri utenti finali nell’ambito del Servizio, il Tenant è il titolare del trattamento e True Aim agisce come responsabile del trattamento in base a un accordo sul trattamento dei dati. Per i dati personali che raccogliamo direttamente, comprese le informazioni sugli account degli amministratori dei Tenant e i dati dei visitatori del sito di marketing, True Aim agisce come titolare del trattamento.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Categorie di dati personali che trattiamo</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Dati dell’account:</strong> nome, e-mail, organizzazione, ruolo, metadati di autenticazione.</li>
                <li><strong className="text-strong">Dati sui sinistri trasmessi dai Tenant:</strong> descrizioni dei sinistri, identificativi dei richiedenti, date del danno, numeri di polizza, documenti caricati.</li>
                <li><strong className="text-strong">Dati derivati:</strong> dati strutturati estratti dai documenti caricati dai nostri componenti di analisi documentale e di modelli linguistici.</li>
                <li><strong className="text-strong">Dati di utilizzo e telemetria:</strong> log applicativi, voci dell’audit trail, metadati delle richieste, metriche operative.</li>
                <li><strong className="text-strong">Dati del sito web:</strong> indirizzo IP, metadati del browser e pagine visitate, raccolti tramite i normali log del server e, solo dopo che avete accettato i cookie analitici, tramite Google Tag Manager e Google Analytics 4 come descritto nella nostra informativa sui cookie.</li>
                <li><strong className="text-strong">Dati del modulo di contatto:</strong> i dati che inserite nel modulo, insieme ai campi di attribuzione che il sito registra con il vostro invio: la pagina su cui siete arrivati per prima, il sito di provenienza, i parametri della campagna (UTM) e la vostra risposta a «Come avete saputo di noi?». Questi dati vengono inviati a HubSpot, il nostro CRM, e una copia viene scritta in un foglio di calcolo nel nostro Google Workspace, che avvisa il nostro team via e-mail (vedi sezione 5).</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Basi giuridiche del trattamento (GDPR / LPD svizzera)</h2>
              <p className="text-body leading-[1.6]">
                Esecuzione del contratto, interesse legittimo a gestire e proteggere il Servizio, consenso ove richiesto e obbligo di legge.
              </p>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Come utilizziamo i dati personali</h2>
              <p className="text-body leading-[1.6]">
                Per fornire e gestire il Servizio; autenticare gli utenti; rilevare, indagare e prevenire incidenti di sicurezza; adempiere agli obblighi di legge; e migliorare il Servizio in forma aggregata e non identificativa. Non vendiamo dati personali e non utilizziamo i dati dei Tenant per addestrare modelli di base.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Sub-responsabili e comunicazioni</h2>
              <p className="text-body leading-[1.6]">
                Ospitiamo il Servizio su Microsoft Azure nella regione Switzerland North. L’elenco operativo dei nostri sub-responsabili attivi, con il servizio fornito da ciascuno, le categorie di dati personali interessate e il luogo del trattamento, è pubblicato come allegato 2 del nostro accordo sul trattamento dei dati per i clienti, disponibile su richiesta.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Gli strumenti usati internamente (controllo del codice sorgente, CI/CD, CRM) che non trattano dati di produzione dei Tenant non sono sub-responsabili verso i clienti e non vi sono elencati. Non comunichiamo dati personali ad altri terzi, salvo obbligo di legge o istruzione esplicita di un Tenant.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Questo sito web utilizza i seguenti servizi. Nessuno di essi riceve dati dei Tenant o dei sinistri tramite questo sito.
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Google Tag Manager e Google Analytics 4</strong> (Google Ireland Limited): caricati solo dopo che avete accettato i cookie analitici; misurano le visualizzazioni di pagina e le interazioni; GA4 non registra né conserva gli indirizzi IP; nessun dato personale viene inserito nel data layer.</li>
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, ospitato nel data center europeo di HubSpot in Germania): riceve gli invii del modulo di contatto, compresi i campi di attribuzione elencati nella sezione 2, e, solo dopo che avete accettato i cookie analitici, registra le vostre visite a questo sito.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited): un foglio di calcolo nel nostro Google Workspace riceve una copia di ogni invio del modulo di contatto e invia una notifica e-mail al nostro team.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong>: l’agenzia che lavora sulle prestazioni del nostro sito, con accesso a Google Tag Manager, Google Analytics e Google Search Console; non ha accesso ai dati dei clienti o dei Tenant.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Trasferimenti internazionali</h2>
              <p className="text-body leading-[1.6]">
                I dati personali trattati nel Servizio sono conservati in Svizzera. I dati del modulo di contatto sono conservati nell’Unione europea, nel data center europeo di HubSpot e nel nostro Google Workspace. Quando il trattamento avviene al di fuori di Svizzera, UE o SEE, compresi i trasferimenti verso gli Stati Uniti, ci basiamo sull’EU-U.S. e sullo Swiss-U.S. Data Privacy Framework o sulle clausole contrattuali standard. Il nostro elenco dei sub-responsabili indica il luogo e la base del trasferimento per ciascun fornitore.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Sicurezza</h2>
              <p className="text-body leading-[1.6]">
                Proteggiamo i dati personali con controlli amministrativi, tecnici e fisici, tra cui la cifratura in transito e a riposo, la segregazione della rete, l’accesso secondo il principio del minimo privilegio, l’autenticazione a più fattori e il monitoraggio continuo. Le nostre misure di sicurezza sono descritte più in dettaglio su{" "}
                <Link href="/security" className="text-link hover:underline">
                  trueaim.ai/security
                </Link>
                .
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Conservazione</h2>
              <p className="text-body leading-[1.6]">
                We retain personal data only as long as necessary to deliver the Service and meet our legal obligations. Tenant data is retained for the duration of the Tenant&rsquo;s subscription plus the contractually agreed return/deletion period. Specific retention periods are documented in our internal data retention schedule and reflected in the Data Processing Agreement concluded with each Tenant.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. I vostri diritti</h2>
              <p className="text-body leading-[1.6]">
                Nei limiti della legge applicabile (compresi GDPR e LPD svizzera), avete il diritto di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione. Se siete utenti finali di un Tenant, rivolgetevi prima al Tenant; aiuteremo il Tenant a soddisfare la vostra richiesta. Per contattarci direttamente, scrivete a{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. Avete inoltre il diritto di presentare reclamo a un’autorità di controllo. In Svizzera, l’Incaricato federale della protezione dei dati e della trasparenza (IFPDT); nell’UE, la vostra autorità locale per la protezione dei dati.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Processi decisionali automatizzati</h2>
              <p className="text-body leading-[1.6]">
                Il Servizio supporta una gestione dei sinistri con intervento umano. I risultati della nostra analisi documentale e dei nostri modelli linguistici sono raccomandazioni per gli operatori del Tenant; le decisioni finali sono prese dal personale autorizzato del Tenant. True Aim non prende nei confronti degli utenti finali alcuna decisione esclusivamente automatizzata che produca effetti giuridici o che li riguardi in modo analogamente significativo.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Modifiche a questa informativa</h2>
              <p className="text-body leading-[1.6]">
                Aggiorneremo questa informativa man mano che le nostre prassi evolvono. La data «Ultimo aggiornamento» in cima a questa pagina indica la revisione più recente. Le modifiche sostanziali saranno comunicate ai Tenant attivi.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Contatti</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera.<br />
                E-mail:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
