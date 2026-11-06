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
    "Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland",
  service:
    "Cloud-Infrastruktur und Hosting (Microsoft Azure), bereitgestellt im Azure-Mandanten von True Aim. Dies umfasst Rechenleistung, Datenbank, Speicher, KI-Modellinferenz (Azure OpenAI), Dokumentenverarbeitung, Schlüsselverwaltung, Monitoring und Netzwerk.",
  data:
    "Alle in Anhang 3 des Auftragsverarbeitungsvertrags aufgeführten Kategorien personenbezogener Daten: Identifikationsdaten, Policen- und Schadennummern, schadenbezogene Daten (einschließlich sensibler personenbezogener Daten, sofern der Schadenfall dies erfordert) und Finanzdaten. Außerdem Plattform-Telemetrie (Anfrage-Metadaten) und Kontodaten autorisierter Nutzer.",
  location:
    "Alle ruhenden Daten werden in Switzerland North (Zürich) gespeichert, mit Backups in Switzerland West (Genf). Die Dokumentenverarbeitung läuft in Switzerland North. Die KI-Modellinferenz läuft über die Azure-OpenAI-Ressource von True Aim in Switzerland North. Die Inferenz kann in der Schweiz oder in der EU verarbeitet werden. Prompts und Ausgaben werden nicht außerhalb von Switzerland North gespeichert. Das Azure-OpenAI-Missbrauchsmonitoring ist eine Ausnahme hinsichtlich des Datenzugriffs; siehe unten.",
  access:
    "Autorisierte Mitarbeitende von True Aim über den Azure-Mandanten von True Aim. Microsoft-Personal kann nur insoweit auf Daten zugreifen, wie es das Microsoft Products and Services Data Protection Addendum (Microsoft DPA) erlaubt, etwa zur Erbringung von Support.",
  transfers:
    "Für jede Übermittlung aus der EU, dem EWR, dem Vereinigten Königreich oder der Schweiz bezieht das Microsoft DPA vom 22. Mai 2026 die EU-Standardvertragsklauseln von 2021, Modul Auftragsverarbeiter-zu-Auftragsverarbeiter, zwischen Microsoft Ireland Operations Limited und Microsoft Corporation ein. Microsoft verpflichtet sich, für personenbezogene Daten aus der Schweiz das Schweizer Datenschutzrecht einzuhalten. Microsoft ist zudem unter dem EU-U.S. Data Privacy Framework und dem Swiss-U.S. Data Privacy Framework zertifiziert.",
  exception: {
    title: "Ausnahme: Azure-OpenAI-Missbrauchsmonitoring",
    body: (
      <>
        <p>
          Microsoft betreibt ein Missbrauchsmonitoring für Azure OpenAI, und es ist für die Ressource von True Aim aktiviert. Microsoft kann Prompts und Ausgaben aufbewahren, die seine Systeme zur Überprüfung markieren. Es speichert sie in Switzerland North, der Azure-Region der Ressource. Microsoft veröffentlicht keine Aufbewahrungsfrist für diese Daten.
        </p>
        <p className="mt-3">
          Die Überprüfung erfolgt standardmäßig automatisiert. Autorisierte Microsoft-Mitarbeitende prüfen markierte Inhalte nur, wenn die automatisierte Prüfung kein sicheres Ergebnis liefert. Microsoft sichert im EWR ansässige Prüfer nur für Bereitstellungen im EWR zu. Für die Schweiz gibt es keine solche Zusage, sodass sich diese Prüfer außerhalb der Schweiz, des EWR und des Vereinigten Königreichs befinden können. Das ist die Ausnahme von der Zusage von True Aim, dass Hosting und Inferenz in der Schweiz, im EWR oder im Vereinigten Königreich bleiben.
        </p>
        <p className="mt-3">
          Microsoft verwendet diese Daten nicht zum Trainieren von Modellen. Quellen:{" "}
          <a href={MS_ABUSE_MONITORING} className="text-link hover:underline">
            Azure OpenAI abuse monitoring
          </a>{" "}
          und{" "}
          <a href={MS_DATA_PRIVACY} className="text-link hover:underline">
            Data, privacy and security for Azure OpenAI
          </a>{" "}
          (Microsoft Learn, Mai 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE_CLOUD: SubProcessor = {
  id: "google-cloud",
  name: "Google Cloud EMEA Limited",
  entity: "Google Cloud EMEA Limited, 70 Sir John Rogerson’s Quay, Dublin 2, Irland",
  service:
    "KI-Inferenz mit den Gemini-Modellen von Google auf Google Cloud (Vertex AI), als alternativer Modellanbieter neben Azure OpenAI.",
  data: "Dieselben Schadendokumente und Schadendaten, die die Plattform an Azure OpenAI sendet.",
  location: "Europäische Union. Google speichert und verarbeitet die Daten in der EU.",
  access: (
    <>
      Google-Personal kann zu Wartungs- und Supportzwecken aus den Ländern auf die Daten zugreifen, die aufgeführt sind unter{" "}
      <a href={GOOGLE_CLOUD_SUBPROCESSORS} className="text-link hover:underline">
        cloud.google.com/terms/subprocessors
      </a>
      . Externe Supportunternehmen sehen Daten nur, wenn True Aim sie in einem Supportfall weitergibt. Das Vertex-AI-Missbrauchsmonitoring ist eine Ausnahme hinsichtlich des Datenzugriffs; siehe unten.
    </>
  ),
  transfers:
    "Google Cloud Data Processing Addendum vom 8. Juni 2026, das das Schweizer DSG abdeckt, mit den EU-Standardvertragsklauseln. Google LLC ist zudem unter dem EU-U.S. und dem Swiss-U.S. Data Privacy Framework zertifiziert.",
  exception: {
    title: "Ausnahme: Vertex-AI-Missbrauchsmonitoring",
    body: (
      <>
        <p>
          Google betreibt ein Missbrauchsmonitoring für Gemini-Modelle in Vertex AI, und es ist für das Google-Cloud-Projekt von True Aim aktiviert. Google speichert einen Prompt nur, wenn seine automatisierten Sicherheitsklassifikatoren möglichen Missbrauch markieren. Es bewahrt den Prompt bis zu 90 Tage in der für das Projekt gewählten Region auf, die in der Europäischen Union liegt.
        </p>
        <p className="mt-3">
          Autorisierte Google-Mitarbeitende können markierte Prompts prüfen. Google gibt nicht an, wo diese Prüfer ansässig sind, sodass sie sich außerhalb der Schweiz, des EWR und des Vereinigten Königreichs befinden können. Das ist die Ausnahme von der Zusage von True Aim, dass Hosting und Inferenz in der Schweiz, im EWR oder im Vereinigten Königreich bleiben.
        </p>
        <p className="mt-3">
          Google verwendet diese Daten nicht zum Trainieren oder Feinabstimmen von Modellen. Quelle:{" "}
          <a href={GOOGLE_ABUSE_MONITORING} className="text-link hover:underline">
            Vertex AI abuse monitoring
          </a>{" "}
          (Google-Cloud-Dokumentation, Oktober 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE: SubProcessor = {
  id: "google",
  name: "Google Ireland Limited",
  entity: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland",
  service:
    "Geschäftliche E-Mail, Dokumentenablage und Kalender (Google Workspace) für die Kommunikation mit Kunden und die betriebliche Koordination. Bei Kunden, die Schadenfälle per E-Mail einreichen, gehen dort in einem dedizierten Postfach auch Schadenkorrespondenz und Anhänge ein, die die Plattform von dort automatisch abholt.",
  data:
    "Identifikationsdaten. Schadenbezogene personenbezogene Daten, einschließlich Ausweisdokumenten und anderer Anhänge, in Schadenkorrespondenz, die Kunden per E-Mail senden. Alle schadenbezogenen personenbezogenen Daten, die Kunden oder betroffene Personen in sonstiger Korrespondenz oder in geteilten Dokumenten angeben.",
  location:
    "Europäische Union (Google-Workspace-Datenregion auf Europa eingestellt) für ruhende Daten, die von der Datenregion abgedeckt sind.",
  access:
    "Autorisierte Mitarbeitende von True Aim mit Google-Workspace-Konten. Google-Personal kann nur insoweit auf Daten zugreifen, wie es das Google Cloud / Workspace Data Processing Addendum erlaubt, etwa zur Erbringung von Support.",
  transfers:
    "Daten außerhalb des Geltungsbereichs der Datenregion sowie der Zugriff durch Google-Personal zu Supportzwecken können eine Verarbeitung außerhalb der EU beinhalten. Das Google Cloud / Workspace Data Processing Addendum bezieht für diese Übermittlungen die EU-Standardvertragsklauseln ein.",
};

const SLACK: SubProcessor = {
  id: "slack",
  name: "Slack Technologies Limited",
  entity:
    "Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street Upper, Dublin 2, D02 W085, Irland",
  service:
    "Interne Teamkommunikation, die Mitarbeitende von True Aim zur Koordination des Betriebs und zur Fehlerbehebung nutzen. Dort kann auf schadenbezogene personenbezogene Daten Bezug genommen werden.",
  data:
    "Identifikationsdaten sowie alle schadenbezogenen personenbezogenen Daten, auf die Mitarbeitende in Nachrichten, Threads oder geteilten Dateien Bezug nehmen.",
  location: "Europäische Union (Slack-EU-Datenresidenz für ruhende Nachrichten und geteilte Dateien).",
  access:
    "Autorisierte Mitarbeitende von True Aim im Slack-Workspace von True Aim. Slack-Personal kann nur insoweit auf Daten zugreifen, wie es das Slack Data Processing Addendum erlaubt, etwa zur Erbringung von Support.",
  transfers:
    "Daten außerhalb des Geltungsbereichs der Slack-Datenresidenz sowie der Zugriff durch Slack-Personal zu Supportzwecken können eine Verarbeitung außerhalb der EU beinhalten. Das Slack Data Processing Addendum bezieht für diese Übermittlungen die EU-Standardvertragsklauseln ein.",
};

const SENTRY: SubProcessor = {
  id: "sentry",
  name: "Functional Software, Inc. d/b/a Sentry",
  entity:
    "Functional Software, Inc. d/b/a Sentry, 45 Fremont Street, 8th Floor, San Francisco, CA 94105, Vereinigte Staaten",
  service: "Fehler- und Performance-Monitoring für die Plattform.",
  data:
    "Die Plattform entfernt Kundendaten aus jedem Fehlerbericht, bevor der Bericht die Plattform verlässt. Sentry erhält nur Fehlertypen, Seitenrouten und technische IDs, darunter eine interne Nutzernummer ohne Namen oder E-Mail-Adresse. Als zweite Schutzebene entfernt Sentry beim Empfang eines Ereignisses zusätzlich auf seiner Seite sensible Felder anhand ihres Namens.",
  location:
    "Fehlerberichte werden in der Europäischen Union (Frankfurt, Deutschland) gespeichert. Kontodaten in den Vereinigten Staaten umfassen nur die Logins der Mitarbeitenden von True Aim.",
  access:
    "Autorisierte Mitarbeitende von True Aim mit Sentry-Konten. Sentry-Personal greift zu Support- und Betriebszwecken aus den Vereinigten Staaten, Österreich, Kanada und den Niederlanden per Fernzugriff auf Daten zu.",
  transfers:
    "Übermittlungen in die Vereinigten Staaten stützen sich auf das EU-U.S. Data Privacy Framework, dessen UK Extension und das Swiss-U.S. Data Privacy Framework, mit den Standardvertragsklauseln als Rückfallebene.",
};

const GROUPS: SubProcessorGroup[] = [
  {
    id: "group-a",
    title: "Gruppe A: Verarbeitet personenbezogene Daten von Kunden",
    intro: "Diese Unterauftragsverarbeiter verarbeiten personenbezogene Daten von Kunden, um die Plattform und die Dienstleistungen bereitzustellen.",
    members: [MICROSOFT, GOOGLE_CLOUD, GOOGLE, SLACK],
  },
  {
    id: "group-b",
    title: "Gruppe B: Erhält nur technische Fehlerberichte",
    intro:
      "Dieser Unterauftragsverarbeiter erhält nur technische Fehlerberichte, aus denen die Plattform Kundendaten entfernt.",
    members: [SENTRY],
  },
];

const VERSION_HISTORY = [
  {
    version: "1.6",
    date: EFFECTIVE_DATE,
    summary:
      "Microsoft-Eintrag präzisiert: Die Kategorien personenbezogener Daten verweisen auf Anhang 3 des Auftragsverarbeitungsvertrags, der Standort hält fest, dass die Inferenz in der Schweiz oder in der EU verarbeitet werden kann, während Prompts und Ausgaben nicht außerhalb von Switzerland North gespeichert werden, und die Rechtseinheit heißt durchgängig Microsoft Ireland Operations Limited.",
  },
  {
    version: "1.5",
    date: "2026-10-31",
    summary:
      "Festgehalten, dass Microsoft Azure die KI-Modellinferenz in der Schweiz und in der Europäischen Union ausführt, ohne Enddatum. Ausnahme für das Vertex-AI-Missbrauchsmonitoring beim Eintrag Google Cloud EMEA Limited ergänzt.",
  },
  {
    version: "1.4",
    date: "2026-10-23",
    summary:
      "Google Cloud EMEA Limited (Gemini-Modelle auf Google Cloud) als alternativer Anbieter für KI-Inferenz in Gruppe A aufgenommen.",
  },
  {
    version: "1.3",
    date: "2026-10-20",
    summary:
      "Liste in zwei Gruppen aufgeteilt. Zugriff und Übermittlungsgrundlage für jeden Unterauftragsverarbeiter ergänzt. Festgehalten, wo Azure Backups vorhält und KI-Inferenz ausführt, sowie die Ausnahme für das Azure-OpenAI-Missbrauchsmonitoring. Microsoft-Übermittlungsmodul benannt. Sentry-Eintrag korrigiert: Die Plattform entfernt Kundendaten aus jedem Fehlerbericht, bevor er die Plattform verlässt.",
  },
  {
    version: "1.2",
    date: "2026-10-14",
    summary:
      "Sentry-Eintrag korrigiert: in den Vereinigten Staaten gespeicherte Kontometadaten, Standorte des Fernzugriffs und betroffene personenbezogene Daten.",
  },
  {
    version: "1.1",
    date: "2026-09-24",
    summary:
      "Sentry aufgenommen. Google-Workspace-Eintrag auf per E-Mail eingereichte Schadenfälle erweitert. Präzisiert, wo Microsoft Azure KI-Inferenz ausführt.",
  },
  {
    version: "1.0",
    date: "2026-08-17",
    summary:
      "Erstveröffentlichung als Anhang 2 zum Auftragsverarbeitungsvertrag vom 16. August 2026.",
  },
];

const TOC = [
  ...GROUPS.flatMap((group) => [
    { id: group.id, label: group.title, nested: false },
    ...group.members.map(({ id, name }) => ({ id, label: name, nested: true })),
  ]),
  { id: "version-history", label: "Versionshistorie", nested: false },
];

type FieldKey = "entity" | "service" | "data" | "location" | "access" | "transfers";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "entity", label: "Unternehmen" },
  { key: "service", label: "Dienst" },
  { key: "data", label: "Betroffene personenbezogene Daten" },
  { key: "location", label: "Standort" },
  { key: "access", label: "Zugriff" },
  { key: "transfers", label: "Übermittlungsgrundlage" },
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
        eyebrow="Anhang 2 zum Auftragsverarbeitungsvertrag"
        title="Liste der Unterauftragsverarbeiter"
        texture={{ name: "circ", position: "72% 18%" }}
      >
        <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted">Version</dt>
          <dd className="text-strong font-medium">{VERSION}</dd>
          <dt className="text-muted">Gültig ab</dt>
          <dd className="text-strong font-medium">{EFFECTIVE_DATE}</dd>
          <dt className="text-muted">Zuletzt aktualisiert</dt>
          <dd className="text-strong font-medium">{LAST_UPDATED}</dd>
          <dt className="text-muted">Rechtsgrundlage</dt>
          <dd className="text-strong font-medium">Schweizer DSG Art. 9; DSGVO Art. 28</dd>
        </dl>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">
          <div className={cn(CARD, "p-6 md:p-8 mb-8")}>
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Inhalt</h2>
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
            Diese Liste ist Anhang 2 zum Auftragsverarbeitungsvertrag der True Aim AG. In der nach dem Auftragsverarbeitungsvertrag aktualisierten Fassung ist sie die maßgebliche Liste für die Zwecke des Auftragsverarbeitungsvertrags.
          </p>

          <p className="text-body leading-[1.6] mt-4">
            True Aim hält Hosting und KI-Inferenz in der Schweiz, im EWR oder im Vereinigten Königreich. Jede Ausnahme ist auf dieser Seite beim betreffenden Unterauftragsverarbeiter angegeben. Unterauftragsverarbeiter der Gruppe A verarbeiten personenbezogene Daten von Kunden. Der Unterauftragsverarbeiter der Gruppe B erhält nur technische Fehlerberichte.
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
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Versionshistorie</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Version</th>
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Gültig ab</th>
                    <th className="text-left py-3 font-display font-medium text-strong align-top">Zusammenfassung der Änderungen</th>
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
            Fragen zu dieser Liste? Wenden Sie sich an{" "}
            <a href="mailto:info@trueaim.ai" className="text-link hover:underline">
              info@trueaim.ai
            </a>
            .
          </p>
          <p className="text-sm text-muted mt-3">
            True Aim AG · Metallstrasse 9, 6300 Zug, Schweiz · CHE-325.128.066
          </p>
        </div>
      </section>
    </div>
  );
}
