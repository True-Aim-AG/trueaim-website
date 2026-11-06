import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { Eyebrow } from "@/components/brand/Eyebrow";

const LAST_UPDATED = "2026-05-20";

type Group = "Features" | "Fixes" | "Improvements" | "Security";

type Release = {
  version: string;
  date: string;
  intro?: string;
  groups: Partial<Record<Group, string[]>>;
};

const RELEASES: Release[] = [
  {
    version: "v0.8.0",
    date: "2026-05-20",
    groups: {
      Features: [
        "Le sessioni ora si rinnovano in modo continuo entro una finestra di 24 ore di inattività / limite massimo di 7 giorni, e gli utenti vengono disconnessi automaticamente in caso di errori di autenticazione, per una migliore igiene delle sessioni.",
      ],
      Fixes: [
        "Content Security Policy: allentata la policy sulle origini delle immagini per consentire qualsiasi origine HTTPS, ripristinando il rendering delle risorse fornite dai clienti e servite da CDN esterne.",
      ],
    },
  },
  {
    version: "v0.7.0",
    date: "2026-05-16",
    groups: {
      Features: [
        "Un watchdog per i sinistri bloccati fa fallire automaticamente le esecuzioni ferme da più di 20 minuti, così i sinistri bloccati emergono agli operatori invece di restare sospesi a tempo indeterminato.",
        "Logging strutturato dei worker ed eventi di ciclo di vita a monte della pipeline forniscono la tracciabilità end-to-end di ogni sinistro.",
        "Il Workbench ora evidenzia esplicitamente i sinistri bloccati (in sostituzione del precedente stato «Sconosciuto») e la dashboard si aggiorna in tempo reale mentre le esecuzioni sono in corso.",
        "I super-amministratori possono ora eliminare i sinistri direttamente dalla dashboard.",
      ],
      Improvements: [
        "Lo stepper deriva lo stato una sola volta e riflette correttamente gli stati di successo e di elaborazione in corso.",
        "La vista «In corso» viene visualizzata immediatamente dopo la creazione del sinistro (nessuno stato vuoto percepito).",
        "Ripristinata l’estrazione visiva nelle riesecuzioni con cache hit di Document Intelligence.",
        "Produzione: stdout senza buffer, worker singolo e throughput di inferenza IA prevedibile.",
        "Frontend: i file `.mjs` vengono ora serviti con il tipo MIME JavaScript corretto, così il worker di PDF.js si carica correttamente.",
      ],
    },
  },
  {
    version: "v0.6.0",
    date: "2026-05-15",
    groups: {
      Features: [
        "Automazione delle release: `release-please` gestisce ora gli incrementi di versione e la creazione delle release su GitHub, dando alla piattaforma una pipeline di release completamente automatizzata e verificabile.",
      ],
      Fixes: [
        "La tabella dei sinistri del Workbench riflette l’esito modificato manualmente e l’importo liquidato subito dopo la finalizzazione di un sinistro.",
        "La CSP del frontend consente le origini dei blob SAS, così le anteprime dei documenti dei clienti vengono visualizzate in modo affidabile.",
        "Irrobustita la configurazione di release-please per un calcolo deterministico della versione.",
      ],
    },
  },
  {
    version: "v0.5.0",
    date: "2026-05-15",
    intro: "Questa release consolida il lavoro svolto tra v0.3.0 e v0.4.0 (release amministrative con solo tag) e il ciclo v0.5.0.",
    groups: {
      Features: [
        "Workbench: migrato nella nuova piattaforma il precedente Workbench di revisione delle estrazioni e confronto affiancato.",
        "Dashboard di elaborazione: arricchita con riquadri KPI, funnel della pipeline e grafico dei volumi.",
        "Endpoint veicolo: nuovo endpoint di lettura che espone i dettagli del veicolo ai sistemi consumatori a valle.",
        "Admin: pagina «Stato della piattaforma» per una visione d’insieme immediata dello stato del sistema.",
        "Temi e i18n: tre nuovi temi, più una pulizia dell’interfaccia su tutti i tenant dei clienti.",
        "Revisore di PR con IA: revisore automatico delle pull request con attivazione manuale tramite comandi, una coda CI e supporto alla revisione a blocchi per i diff oltre il budget di 200 KB per singola chiamata.",
      ],
      Security: [
        "Irrobustimento delle sessioni: timeout delle sessioni ridotti a valori predefiniti conformi a SOC 2.",
        "Sicurezza del trasporto: fissato TLS 1.2 e aggiunto un middleware per gli header di sicurezza.",
        "Monitoraggio cloud: attivati i livelli Standard di Microsoft Defender for Cloud su tutti i tipi di risorsa rilevanti.",
        "Audit logging e avvisi: aggiunti avvisi su Activity Log, log diagnostici e Storage per gli ambienti di produzione.",
        "Capacità e operazioni: pubblicato un Azure Workbook che copre la pianificazione della capacità e le dashboard operative.",
        "Telemetria di rete: attivati i flow log VNet negli ambienti di produzione e demo.",
        "Sicurezza applicativa: aggiunto il workflow di analisi statica GitHub CodeQL.",
        "Gestione delle vulnerabilità: chiuso l’arretrato P1 di rilievi sulle immagini container Azure; fissate le dipendenze Python principali per risolvere i rilievi HIGH.",
        "Gestione delle dipendenze: aggiunta la configurazione Dependabot per gli aggiornamenti di sicurezza di routine.",
        "Protezione dei branch: configurati i ruleset require-last-push-approval e dismiss-stale-reviews.",
        "Documentazione: pubblicate le policy e i runbook SOC 2 della Fase 2, la policy di code review e il riepilogo delle evidenze Vanta.",
      ],
      Fixes: [
        "Allineate le chiavi di brand dello screening agli slug canonici rinominati; portato il Workbench alla parità con la versione precedente e collegato il nuovo endpoint veicolo; allineato il budget di retry del client IA asincrono a quello del client sincrono.",
        "Frontend: passaggio dell’immagine base di produzione a una variante nginx-alpine leggera per risolvere una CVE; risolti problemi di esportazione dei tipi; corretto il percorso di installazione di pnpm.",
        "Backend: le build di produzione usano ora un’installazione delle dipendenze più snella per immagini più piccole.",
        "Infrastruttura: corretto l’ambito della risorsa di storage condiviso; soppressi i falsi positivi di CodeQL.",
      ],
    },
  },
];

const GROUP_ORDER: Group[] = ["Features", "Improvements", "Fixes", "Security"];
const GROUP_LABEL: Record<Group, string> = { Features: "Funzionalità", Improvements: "Miglioramenti", Fixes: "Correzioni", Security: "Sicurezza" };

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Changelog" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Ultimo aggiornamento:</strong> {LAST_UPDATED}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              Cronologia pubblica delle release della piattaforma True Aim. Ogni voce riassume le funzionalità visibili agli utenti, i miglioramenti di affidabilità, le correzioni e il lavoro su sicurezza o conformità rilasciati in quella release.
            </p>

            {RELEASES.map((release, index) => (
              <article
                key={release.version}
                className={index === 0 ? "mt-14" : "mt-14 pt-14 border-t border-hairline"}
              >
                <header>
                  <Eyebrow>{release.date}</Eyebrow>
                  <h2 className="font-display text-2xl font-bold text-strong mt-1">
                    Piattaforma True Aim {release.version}
                  </h2>
                </header>
                {release.intro && (
                  <p className="text-body leading-[1.6] italic mt-4">
                    {release.intro}
                  </p>
                )}
                <div className="mt-6 space-y-6">
                  {GROUP_ORDER.filter((g) => release.groups[g]).map((group) => (
                    <div key={group}>
                      <span className="inline-flex items-center rounded-pill bg-accent-soft text-accent px-3 py-1 text-xs font-medium mb-3">
                        {GROUP_LABEL[group]}
                      </span>
                      <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-1">
                        {release.groups[group]!.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
