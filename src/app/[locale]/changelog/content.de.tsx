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
        "Sitzungen laufen jetzt fortlaufend innerhalb eines Fensters von 24 Stunden Inaktivität bzw. maximal 7 Tagen, und Nutzer werden bei Authentifizierungsfehlern automatisch abgemeldet, um die Sitzungshygiene zu verbessern.",
      ],
      Fixes: [
        "Content Security Policy: Die Richtlinie für Bildquellen wurde gelockert, sodass jede HTTPS-Quelle zulässig ist. Damit werden von Kunden bereitgestellte Bilder, die über externe CDNs ausgeliefert werden, wieder gerendert.",
      ],
    },
  },
  {
    version: "v0.7.0",
    date: "2026-05-16",
    groups: {
      Features: [
        "Ein Watchdog für hängende Schadenfälle bricht Läufe, die länger als 20 Minuten stocken, automatisch ab, sodass festhängende Schadenfälle für Operatoren sichtbar werden, statt unbegrenzt zu hängen.",
        "Strukturiertes Worker-Logging und Lifecycle-Ereignisse vor der Pipeline ermöglichen die durchgängige Nachverfolgung jedes Schadenfalls.",
        "Die Workbench zeigt stockende Schadenfälle jetzt explizit an (anstelle des bisherigen Status „Unbekannt“), und das Dashboard aktualisiert sich live, während Läufe in Bearbeitung sind.",
        "Super-Admins können Schadenfälle jetzt direkt im Dashboard löschen.",
      ],
      Improvements: [
        "Der Stepper leitet seinen Zustand nur noch einmal ab und zeigt Erfolg und laufende Bearbeitung korrekt an.",
        "Die Ansicht „In Bearbeitung“ wird sofort nach dem Anlegen eines Schadenfalls gerendert (kein wahrgenommener Leerzustand mehr).",
        "Vision-Extraktion bei Wiederholungsläufen mit Cache-Treffer in Document Intelligence wiederhergestellt.",
        "Produktion: ungepufferte Standardausgabe, ein einzelner Worker und vorhersehbarer Durchsatz der KI-Inferenz.",
        "Frontend: `.mjs` wird jetzt mit dem korrekten JavaScript-MIME-Typ ausgeliefert, sodass der PDF.js-Worker sauber lädt.",
      ],
    },
  },
  {
    version: "v0.6.0",
    date: "2026-05-15",
    groups: {
      Features: [
        "Release-Automatisierung: `release-please` übernimmt jetzt Versionserhöhungen und das Erstellen von GitHub-Releases und gibt der Plattform eine vollständig automatisierte, nachvollziehbare Release-Pipeline.",
      ],
      Fixes: [
        "Die Schadentabelle der Workbench zeigt das übersteuerte Ergebnis und die Auszahlung sofort nach dem Abschluss eines Schadenfalls an.",
        "Die Frontend-CSP lässt SAS-Blob-Quellen zu, sodass Vorschauen von Kundendokumenten zuverlässig gerendert werden.",
        "Die release-please-Konfiguration wurde für eine deterministische Versionsberechnung gehärtet.",
      ],
    },
  },
  {
    version: "v0.5.0",
    date: "2026-05-15",
    intro: "Dieses Release fasst Arbeiten zusammen, die sich über v0.3.0 und v0.4.0 (administrative Releases nur mit Tag) sowie den v0.5.0-Zyklus erstreckten.",
    groups: {
      Features: [
        "Workbench: Die bisherige Workbench für Extraktionsprüfung und Seite-an-Seite-Vergleich wurde in die neue Plattform migriert.",
        "Verarbeitungs-Dashboard: erweitert um KPI-Kacheln, Pipeline-Trichter und Volumendiagramm.",
        "Fahrzeug-Endpunkt: neuer Lese-Endpunkt, der Fahrzeugdetails für nachgelagerte Systeme bereitstellt.",
        "Admin: Seite „Plattformstatus“ für einen schnellen Überblick über den Systemzustand.",
        "Theming & i18n: drei neue Themes sowie Bereinigung der Oberfläche über alle Kundenmandanten hinweg.",
        "KI-PR-Reviewer: automatisierter Pull-Request-Reviewer mit manuellen Befehlsauslösern, einer CI-Warteschlange und Unterstützung für die Prüfung in Teilstücken bei Diffs über dem Budget von 200 KB pro Aufruf.",
      ],
      Security: [
        "Sitzungshärtung: Sitzungs-Timeouts auf SOC-2-konforme Standardwerte verschärft.",
        "Transportsicherheit: TLS 1.2 festgelegt und eine Middleware für Sicherheits-Header ergänzt.",
        "Cloud-Monitoring: Microsoft Defender for Cloud in den Standard-Stufen für alle relevanten Ressourcentypen aktiviert.",
        "Audit-Logging & Alarmierung: Activity-Log-, Diagnose-Log- und Storage-Alarme für Produktionsumgebungen ergänzt.",
        "Kapazität & Betrieb: ein Azure Workbook mit Kapazitätsplanung und Betriebs-Dashboards veröffentlicht.",
        "Netzwerk-Telemetrie: VNet-Flow-Logs in Produktions- und Demo-Umgebungen aktiviert.",
        "Anwendungssicherheit: GitHub-CodeQL-Workflow für statische Analyse ergänzt.",
        "Schwachstellenmanagement: P1-Rückstand an Befunden in Azure-Container-Images geschlossen; zentrale Python-Abhängigkeiten festgelegt, um HIGH-Befunde zu bereinigen.",
        "Abhängigkeitsmanagement: Dependabot-Konfiguration für routinemäßige Sicherheitsupdates ergänzt.",
        "Branch-Schutz: Regelsätze „require-last-push-approval“ und „dismiss-stale-reviews“ konfiguriert.",
        "Dokumentation: SOC-2-Richtlinien und Runbooks der Stufe 2, Code-Review-Richtlinie und Vanta-Nachweiszusammenfassung veröffentlicht.",
      ],
      Fixes: [
        "Screening-Markenschlüssel an umbenannte kanonische Slugs angeglichen; Workbench auf Parität mit der bisherigen Version gebracht und den neuen Fahrzeug-Endpunkt angebunden; Retry-Budget des asynchronen KI-Clients an den synchronen Client angepasst.",
        "Frontend: Produktions-Basisimage auf eine schlanke nginx-alpine-Variante umgestellt, um eine CVE zu beheben; Probleme mit Typ-Exporten behoben; pnpm-Installationspfad korrigiert.",
        "Backend: Produktions-Builds verwenden jetzt eine schlankere Abhängigkeitsinstallation für kleinere Images.",
        "Infrastruktur: Ressourcenbereich des gemeinsamen Speichers korrigiert; CodeQL-Fehlalarme unterdrückt.",
      ],
    },
  },
];

const GROUP_ORDER: Group[] = ["Features", "Improvements", "Fixes", "Security"];
const GROUP_LABEL: Record<Group, string> = { Features: "Funktionen", Improvements: "Verbesserungen", Fixes: "Fehlerbehebungen", Security: "Sicherheit" };

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Changelog" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Zuletzt aktualisiert:</strong> {LAST_UPDATED}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              Öffentliche Release-Historie der Plattform von True Aim. Jeder Eintrag fasst die für Nutzer sichtbaren Funktionen, Zuverlässigkeitsverbesserungen, Fehlerbehebungen sowie Sicherheits- oder Compliance-Arbeiten des jeweiligen Releases zusammen.
            </p>

            {RELEASES.map((release, index) => (
              <article
                key={release.version}
                className={index === 0 ? "mt-14" : "mt-14 pt-14 border-t border-hairline"}
              >
                <header>
                  <Eyebrow>{release.date}</Eyebrow>
                  <h2 className="font-display text-2xl font-bold text-strong mt-1">
                    Plattform von True Aim {release.version}
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
