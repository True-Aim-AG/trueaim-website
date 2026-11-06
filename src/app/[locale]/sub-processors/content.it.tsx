import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CARD, PageHero, SECTION } from "@/components/content";
import { cn } from "@/lib/utils";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

// Set both to the day this version goes live. Clause 9.2 of the DPA requires the
// list updated before a new sub-processor begins processing, with written notice.
const VERSION = "1.6";
const EFFECTIVE_DATE = "2026-11-02";
const LAST_UPDATED = "2026-11-02";

type SubProcessor = {
  id: string;
  name: string;
  entity: string;
  service: ReactNode;
  data: ReactNode;
  location: ReactNode;
  access: ReactNode;
  transfers: ReactNode;
  exception?: { title: string; body: ReactNode };
};

type SubProcessorGroup = {
  id: string;
  title: string;
  intro: string;
  members: SubProcessor[];
};

const MS_ABUSE_MONITORING =
  "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/abuse-monitoring";
const MS_DATA_PRIVACY =
  "https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy";

const GOOGLE_CLOUD_SUBPROCESSORS = "https://cloud.google.com/terms/subprocessors";
const GOOGLE_ABUSE_MONITORING =
  "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/abuse-monitoring";

const MICROSOFT: SubProcessor = {
  id: "microsoft",
  name: "Microsoft Ireland Operations Limited",
  entity:
    "Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irlanda",
  service:
    "Infrastruttura cloud e hosting (Microsoft Azure), distribuiti nel tenant Azure di True Aim. Comprende calcolo, database, storage, inferenza dei modelli di IA (Azure OpenAI), elaborazione dei documenti, gestione delle chiavi, monitoraggio e rete.",
  data:
    "Tutte le categorie di dati personali elencate nell’Allegato 3 dell’accordo sul trattamento dei dati: dati identificativi, riferimenti di polizza e di sinistro, dati relativi al sinistro (compresi dati personali sensibili quando il sinistro lo richiede) e dati finanziari. Inoltre la telemetria della piattaforma (metadati delle richieste) e i dati degli account degli utenti autorizzati.",
  location:
    "Tutti i dati a riposo sono archiviati nella regione Switzerland North (Zurigo), con backup nella regione Switzerland West (Ginevra). L’elaborazione dei documenti avviene in Switzerland North. L’inferenza dei modelli di IA passa attraverso la risorsa Azure OpenAI di True Aim in Switzerland North. L’inferenza può essere elaborata in Svizzera o nell’UE. Prompt e output non sono archiviati al di fuori di Switzerland North. Il monitoraggio degli abusi di Azure OpenAI costituisce un’eccezione riguardo a chi può accedere ai dati; vedi sotto.",
  access:
    "Il personale autorizzato di True Aim, tramite il tenant Azure di True Aim. Il personale Microsoft può accedere ai dati solo nella misura consentita dal Microsoft Products and Services Data Protection Addendum (DPA Microsoft), ad esempio per fornire assistenza.",
  transfers:
    "Per qualsiasi trasferimento al di fuori dell’UE, del SEE, del Regno Unito o della Svizzera, il DPA Microsoft del 22 maggio 2026 incorpora le clausole contrattuali standard dell’UE del 2021, modulo da responsabile a responsabile, tra Microsoft Ireland Operations Limited e Microsoft Corporation. Microsoft si impegna a rispettare il diritto svizzero in materia di protezione dei dati per i dati personali provenienti dalla Svizzera. Microsoft è inoltre certificata ai sensi dell’EU-U.S. Data Privacy Framework e dello Swiss-U.S. Data Privacy Framework.",
  exception: {
    title: "Eccezione: monitoraggio degli abusi di Azure OpenAI",
    body: (
      <>
        <p>
          Microsoft runs abuse monitoring on Azure OpenAI, and it is on for the Company’s resource.
          Microsoft can keep prompts and outputs that its systems flag for review. It stores them in
          Switzerland North, the Azure region of the resource. Microsoft publishes no retention
          period for this data.
        </p>
        <p className="mt-3">
          Review is automated by default. Authorised Microsoft employees review flagged content
          only when the automated review is not confident. Microsoft commits to
          reviewers located in the EEA for deployments in the EEA only. It makes no such commitment
          for Switzerland, so these reviewers can be located outside Switzerland, the EEA and the
          UK. This is the exception to the Company’s commitment that hosting and inference stay in
          Switzerland, the EEA or the UK.
        </p>
        <p className="mt-3">
          Microsoft does not use this data to train models. Sources:{" "}
          <a href={MS_ABUSE_MONITORING} className="text-link hover:underline">
            Azure OpenAI abuse monitoring
          </a>{" "}
          and{" "}
          <a href={MS_DATA_PRIVACY} className="text-link hover:underline">
            Data, privacy and security for Azure OpenAI
          </a>{" "}
          (Microsoft Learn, May 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE_CLOUD: SubProcessor = {
  id: "google-cloud",
  name: "Google Cloud EMEA Limited",
  entity: "Google Cloud EMEA Limited, 70 Sir John Rogerson’s Quay, Dublin 2, Irlanda",
  service:
    "Inferenza di IA con i modelli Gemini di Google su Google Cloud (Vertex AI), come fornitore di modelli alternativo accanto ad Azure OpenAI.",
  data: "Gli stessi documenti e dati di sinistro che la piattaforma invia ad Azure OpenAI.",
  location: "Unione europea. Google archivia ed elabora i dati nell’UE.",
  access: (
    <>
      Google staff can access the data for maintenance and support from the countries listed at{" "}
      <a href={GOOGLE_CLOUD_SUBPROCESSORS} className="text-link hover:underline">
        cloud.google.com/terms/subprocessors
      </a>
      . External support companies see data only if True Aim shares it in a support case. Vertex AI
      abuse monitoring is an exception for who can access data; see below.
    </>
  ),
  transfers:
    "Google Cloud Data Processing Addendum dell’8 giugno 2026, che copre la LPD svizzera, con le clausole contrattuali standard dell’UE. Google LLC è inoltre certificata ai sensi dei Data Privacy Framework EU-U.S. e Swiss-U.S.",
  exception: {
    title: "Eccezione: monitoraggio degli abusi di Vertex AI",
    body: (
      <>
        <p>
          Google runs abuse monitoring on Gemini models in Vertex AI, and it is on for the Company’s
          Google Cloud project. Google stores a prompt only when its automated safety classifiers
          flag possible abuse. It keeps the prompt for up to 90 days, in the region selected for the
          project, which is in the European Union.
        </p>
        <p className="mt-3">
          Authorised Google employees may review flagged prompts. Google does not state where these
          reviewers are located, so they can be located outside Switzerland, the EEA and the UK.
          This is the exception to the Company’s commitment that hosting and inference stay in
          Switzerland, the EEA or the UK.
        </p>
        <p className="mt-3">
          Google does not use this data to train or fine-tune models. Source:{" "}
          <a href={GOOGLE_ABUSE_MONITORING} className="text-link hover:underline">
            Vertex AI abuse monitoring
          </a>{" "}
          (Google Cloud documentation, October 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE: SubProcessor = {
  id: "google",
  name: "Google Ireland Limited",
  entity: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlanda",
  service:
    "E-mail aziendale, archiviazione dei documenti e calendario (Google Workspace), utilizzati per le comunicazioni con i clienti e il coordinamento operativo. Per i clienti che inviano i sinistri via e-mail, riceve anche la corrispondenza e gli allegati relativi ai sinistri in una casella dedicata, da cui la piattaforma li preleva automaticamente.",
  data:
    "Dati identificativi. Dati personali relativi ai sinistri, compresi documenti d’identità e altri allegati, nella corrispondenza sui sinistri che i clienti inviano via e-mail. Qualsiasi dato personale relativo a un sinistro che i clienti o gli interessati includono in altra corrispondenza o in documenti condivisi.",
  location:
    "Unione europea (regione dati di Google Workspace impostata su Europa) per i dati a riposo coperti dalla regione dati.",
  access:
    "Il personale autorizzato di True Aim con account Google Workspace. Il personale Google può accedere ai dati solo nella misura consentita dal Google Cloud / Workspace Data Processing Addendum, ad esempio per fornire assistenza.",
  transfers:
    "I dati al di fuori dell’ambito della regione dati, e l’accesso del personale Google a fini di assistenza, possono comportare un trattamento al di fuori dell’UE. Il Google Cloud / Workspace Data Processing Addendum incorpora le clausole contrattuali standard dell’UE per questi trasferimenti.",
};

const SLACK: SubProcessor = {
  id: "slack",
  name: "Slack Technologies Limited",
  entity:
    "Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street Upper, Dublin 2, D02 W085, Irlanda",
  service:
    "Comunicazione interna del team, utilizzata dal personale di True Aim per coordinare le operazioni e risolvere i problemi. Vi si può fare riferimento a dati personali relativi ai sinistri.",
  data:
    "Dati identificativi e qualsiasi dato personale relativo a un sinistro a cui il personale fa riferimento in messaggi, thread o file condivisi.",
  location: "Unione europea (residenza dei dati Slack nell’UE per messaggi e file condivisi a riposo).",
  access:
    "Il personale autorizzato di True Aim nel workspace Slack di True Aim. Il personale Slack può accedere ai dati solo nella misura consentita dallo Slack Data Processing Addendum, ad esempio per fornire assistenza.",
  transfers:
    "I dati al di fuori dell’ambito della residenza dei dati Slack, e l’accesso del personale Slack a fini di assistenza, possono comportare un trattamento al di fuori dell’UE. Lo Slack Data Processing Addendum incorpora le clausole contrattuali standard dell’UE per questi trasferimenti.",
};

const SENTRY: SubProcessor = {
  id: "sentry",
  name: "Functional Software, Inc. d/b/a Sentry",
  entity:
    "Functional Software, Inc. d/b/a Sentry, 45 Fremont Street, 8th Floor, San Francisco, CA 94105, Stati Uniti",
  service: "Monitoraggio degli errori e delle prestazioni della piattaforma.",
  data:
    "La piattaforma rimuove i dati dei clienti da ogni rapporto di errore prima che il rapporto lasci la piattaforma. Sentry riceve solo tipi di errore, route delle pagine e ID tecnici, tra cui un numero utente interno senza nome né e-mail. Come secondo livello, Sentry rimuove inoltre dal proprio lato i campi sensibili, in base al nome, quando riceve un evento.",
  location:
    "I rapporti di errore sono archiviati nell’Unione europea (Francoforte, Germania). I dati degli account negli Stati Uniti riguardano solo i login del personale di True Aim.",
  access:
    "Il personale autorizzato di True Aim con account Sentry. Il personale Sentry accede ai dati da remoto, per assistenza e operazioni, da Stati Uniti, Austria, Canada e Paesi Bassi.",
  transfers:
    "I trasferimenti verso gli Stati Uniti si basano sull’EU-U.S. Data Privacy Framework, sulla sua estensione per il Regno Unito (UK Extension) e sullo Swiss-U.S. Data Privacy Framework, con le clausole contrattuali standard come soluzione di riserva.",
};

const GROUPS: SubProcessorGroup[] = [
  {
    id: "group-a",
    title: "Gruppo A: tratta dati personali dei clienti",
    intro: "Questi sub-responsabili trattano dati personali dei clienti per fornire la piattaforma e i servizi.",
    members: [MICROSOFT, GOOGLE_CLOUD, GOOGLE, SLACK],
  },
  {
    id: "group-b",
    title: "Gruppo B: riceve solo rapporti di errore tecnici",
    intro:
      "Questo sub-responsabile riceve solo rapporti di errore tecnici, dai quali la piattaforma rimuove i dati dei clienti.",
    members: [SENTRY],
  },
];

const VERSION_HISTORY = [
  {
    version: "1.6",
    date: EFFECTIVE_DATE,
    summary:
      "Voce Microsoft chiarita: le categorie di dati personali rimandano all’Allegato 3 dell’accordo sul trattamento dei dati, la localizzazione precisa che l’inferenza può essere elaborata in Svizzera o nell’UE mentre prompt e output non sono archiviati al di fuori di Switzerland North, e l’entità è denominata Microsoft Ireland Operations Limited in tutto il documento.",
  },
  {
    version: "1.5",
    date: "2026-10-31",
    summary:
      "Precisato che Microsoft Azure esegue l’inferenza dei modelli di IA in Svizzera e nell’Unione europea, senza data di fine. Aggiunta l’eccezione relativa al monitoraggio degli abusi di Vertex AI alla voce Google Cloud EMEA Limited.",
  },
  {
    version: "1.4",
    date: "2026-10-23",
    summary:
      "Aggiunta Google Cloud EMEA Limited (modelli Gemini su Google Cloud) al Gruppo A come fornitore alternativo di inferenza di IA.",
  },
  {
    version: "1.3",
    date: "2026-10-20",
    summary:
      "Elenco suddiviso in due gruppi. Aggiunti accesso e base del trasferimento per ogni sub-responsabile. Precisato dove Azure conserva i backup ed esegue l’inferenza di IA, oltre all’eccezione relativa al monitoraggio degli abusi di Azure OpenAI. Indicato il modulo di trasferimento Microsoft. Corretta la voce Sentry: la piattaforma rimuove i dati dei clienti da ogni rapporto di errore prima che lasci la piattaforma.",
  },
  {
    version: "1.2",
    date: "2026-10-14",
    summary:
      "Corretta la voce Sentry: metadati degli account archiviati negli Stati Uniti, luoghi di accesso remoto e dati personali interessati.",
  },
  {
    version: "1.1",
    date: "2026-09-24",
    summary:
      "Aggiunta Sentry. Ampliata la voce Google Workspace ai sinistri inviati via e-mail. Precisato dove Microsoft Azure esegue l’inferenza di IA.",
  },
  {
    version: "1.0",
    date: "2026-08-17",
    summary:
      "Prima pubblicazione come Allegato 2 dell’accordo sul trattamento dei dati del 16 agosto 2026.",
  },
];

const TOC = [
  ...GROUPS.flatMap((group) => [
    { id: group.id, label: group.title, nested: false },
    ...group.members.map(({ id, name }) => ({ id, label: name, nested: true })),
  ]),
  { id: "version-history", label: "Cronologia delle versioni", nested: false },
];

type FieldKey = "entity" | "service" | "data" | "location" | "access" | "transfers";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "entity", label: "Entità" },
  { key: "service", label: "Servizio" },
  { key: "data", label: "Dati personali interessati" },
  { key: "location", label: "Localizzazione" },
  { key: "access", label: "Accesso" },
  { key: "transfers", label: "Base del trasferimento" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/sub-processors");
}

export default async function SubProcessorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageSeo locale={locale} path="/sub-processors" template="page" />
      <PageHero compact
        eyebrow="Allegato 2 dell’accordo sul trattamento dei dati"
        title="Elenco dei sub-responsabili"
        texture={{ name: "circ", position: "72% 18%" }}
      >
        <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted">Versione</dt>
          <dd className="text-strong font-medium">{VERSION}</dd>
          <dt className="text-muted">Data di entrata in vigore</dt>
          <dd className="text-strong font-medium">{EFFECTIVE_DATE}</dd>
          <dt className="text-muted">Ultimo aggiornamento</dt>
          <dd className="text-strong font-medium">{LAST_UPDATED}</dd>
          <dt className="text-muted">Base giuridica</dt>
          <dd className="text-strong font-medium">LPD svizzera art. 9; GDPR art. 28</dd>
        </dl>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">
          <div className={cn(CARD, "p-6 md:p-8 mb-8")}>
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Indice</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id} className={item.nested ? "pl-4" : undefined}>
                  <a href={`#${item.id}`} className="text-sm text-link hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-body leading-[1.6]">
            Questo elenco costituisce l’Allegato 2 dell’accordo sul trattamento dei dati di True Aim AG. Nella versione aggiornata ai sensi dell’accordo, è l’elenco operativo ai fini dell’accordo stesso.
          </p>

          <p className="text-body leading-[1.6] mt-4">
            True Aim mantiene hosting e inferenza di IA in Svizzera, nel SEE o nel Regno Unito. Ogni eccezione è indicata in questa pagina sotto il sub-responsabile a cui si riferisce. I sub-responsabili del Gruppo A trattano dati personali dei clienti. Il sub-responsabile del Gruppo B riceve solo rapporti di errore tecnici.
          </p>

          {GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">{group.title}</h2>
              <p className="text-body leading-[1.6]">{group.intro}</p>
              {group.members.map((sp) => (
                <section key={sp.id} id={sp.id} className="scroll-mt-24">
                  <h3 className="font-display text-xl font-bold text-strong mt-10 mb-4">{sp.name}</h3>
                  <dl className="divide-hairline">
                    {FIELDS.map((field) => (
                      <div key={field.key} className="py-3">
                        <dt className="font-display text-sm font-semibold text-strong">{field.label}</dt>
                        <dd className="mt-1 text-body leading-[1.6]">{sp[field.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {sp.exception && (
                    <div className="bg-card shadow-card p-6 md:p-8 mt-6">
                      <h4 className="font-display text-base font-semibold text-strong mb-3">
                        {sp.exception.title}
                      </h4>
                      <div className="text-body leading-[1.6]">{sp.exception.body}</div>
                    </div>
                  )}
                </section>
              ))}
            </section>
          ))}

          <section id="version-history" className="scroll-mt-24">
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Cronologia delle versioni</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Versione</th>
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Data di entrata in vigore</th>
                    <th className="text-left py-3 font-display font-medium text-strong align-top">Sintesi delle modifiche</th>
                  </tr>
                </thead>
                <tbody>
                  {VERSION_HISTORY.map((row) => (
                    <tr key={row.version} className="border-b border-hairline">
                      <td className="py-3 pr-4 text-body align-top">{row.version}</td>
                      <td className="py-3 pr-4 text-body align-top whitespace-nowrap">{row.date}</td>
                      <td className="py-3 text-body align-top leading-[1.6]">{row.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="text-body leading-[1.6] mt-14">
            Domande su questo elenco? Contattate{" "}
            <a href="mailto:info@trueaim.ai" className="text-link hover:underline">
              info@trueaim.ai
            </a>
            .
          </p>
          <p className="text-sm text-muted mt-3">
            True Aim AG · Metallstrasse 9, 6300 Zug, Svizzera · CHE-325.128.066
          </p>
        </div>
      </section>
    </div>
  );
}
