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
        "Les sessions sont désormais renouvelées en continu dans une fenêtre de 24 heures d’inactivité / 7 jours maximum, et les utilisateurs sont déconnectés automatiquement en cas d’erreur d’authentification, pour une meilleure hygiène des sessions.",
      ],
      Fixes: [
        "Content Security Policy : la politique des sources d’images a été assouplie pour autoriser toute origine HTTPS, ce qui rétablit l’affichage des ressources fournies par les clients et servies depuis des CDN externes.",
      ],
    },
  },
  {
    version: "v0.7.0",
    date: "2026-05-16",
    groups: {
      Features: [
        "Un chien de garde pour les sinistres bloqués met automatiquement en échec les exécutions à l’arrêt depuis plus de 20 minutes, afin que les sinistres bloqués remontent aux opérateurs au lieu de rester suspendus indéfiniment.",
        "La journalisation structurée des workers et les événements de cycle de vie en amont du pipeline assurent une traçabilité de bout en bout de chaque sinistre.",
        "Le Workbench signale désormais explicitement les sinistres bloqués (en remplacement de l’ancien état « Inconnu »), et le tableau de bord se recharge en direct pendant les exécutions en cours.",
        "Les super-administrateurs peuvent désormais supprimer des sinistres directement depuis le tableau de bord.",
      ],
      Improvements: [
        "Le stepper calcule son état une seule fois et reflète correctement les états de succès et d’exécution en cours.",
        "La vue « En cours » s’affiche immédiatement après la création d’un sinistre (plus d’état vide perçu).",
        "Rétablissement de l’extraction visuelle lors des réexécutions avec cache Document Intelligence.",
        "Production : sortie standard non mise en mémoire tampon, worker unique et débit d’inférence IA prévisible.",
        "Frontend : les fichiers `.mjs` sont désormais servis avec le type MIME JavaScript correct, de sorte que le worker PDF.js se charge proprement.",
      ],
    },
  },
  {
    version: "v0.6.0",
    date: "2026-05-15",
    groups: {
      Features: [
        "Automatisation des releases : `release-please` gère désormais les montées de version et la création des releases GitHub, ce qui donne à la plateforme un pipeline de release entièrement automatisé et auditable.",
      ],
      Fixes: [
        "Le tableau des sinistres du Workbench reflète immédiatement le verdict modifié manuellement et le montant versé dès qu’un sinistre est finalisé.",
        "La CSP du frontend autorise les origines de blobs SAS, de sorte que les aperçus de documents clients s’affichent de façon fiable.",
        "Durcissement de la configuration release-please pour un calcul de version déterministe.",
      ],
    },
  },
  {
    version: "v0.5.0",
    date: "2026-05-15",
    intro: "Cette release consolide des travaux répartis entre v0.3.0 et v0.4.0 (releases administratives par simple tag) et le cycle v0.5.0.",
    groups: {
      Features: [
        "Workbench : migration de l’ancien Workbench de revue d’extraction et de comparaison côte à côte vers la nouvelle plateforme.",
        "Tableau de bord de traitement : enrichi de tuiles KPI, d’un entonnoir de pipeline et d’un graphique de volumes.",
        "Endpoint véhicule : nouvel endpoint de lecture exposant les détails du véhicule aux systèmes consommateurs en aval.",
        "Admin : page « État de la plateforme » pour une vue d’ensemble de la santé du système.",
        "Thèmes et i18n : trois nouveaux thèmes, plus un nettoyage de l’interface sur l’ensemble des tenants clients.",
        "Relecteur de PR par IA : relecteur automatisé de pull requests avec déclenchement manuel par commande, file d’attente CI et prise en charge de la relecture par morceaux pour les diffs dépassant le budget de 200 Ko par appel.",
      ],
      Security: [
        "Durcissement des sessions : délais d’expiration des sessions resserrés sur des valeurs par défaut conformes à SOC 2.",
        "Sécurité du transport : TLS 1.2 imposé et ajout d’un middleware d’en-têtes de sécurité.",
        "Surveillance cloud : activation des niveaux Standard de Microsoft Defender for Cloud sur tous les types de ressources concernés.",
        "Journalisation d’audit et alertes : ajout d’alertes Activity Log, journaux de diagnostic et Storage pour les environnements de production.",
        "Capacité et exploitation : publication d’un Azure Workbook couvrant la planification de capacité et les tableaux de bord opérationnels.",
        "Télémétrie réseau : activation des journaux de flux VNet sur les environnements de production et de démonstration.",
        "Sécurité applicative : ajout d’un workflow d’analyse statique GitHub CodeQL.",
        "Gestion des vulnérabilités : clôture de l’arriéré P1 de constats sur les images de conteneurs Azure ; épinglage des dépendances Python clés pour lever les constats HIGH.",
        "Gestion des dépendances : ajout d’une configuration Dependabot pour les mises à jour de sécurité de routine.",
        "Protection des branches : configuration des règles require-last-push-approval et dismiss-stale-reviews.",
        "Documentation : publication des politiques et runbooks SOC 2 de l’étape 2, de la politique de revue de code et du résumé des preuves Vanta.",
      ],
      Fixes: [
        "Alignement des clés de marque de screening sur les slugs canoniques renommés ; mise à parité du Workbench avec l’ancienne version et raccordement du nouvel endpoint véhicule ; budget de nouvelles tentatives du client IA asynchrone aligné sur le client synchrone.",
        "Frontend : passage de l’image de base de production à une variante nginx-alpine allégée pour lever une CVE ; résolution de problèmes d’export de types ; correction du chemin d’installation pnpm.",
        "Backend : les builds de production utilisent désormais une installation de dépendances allégée pour des images plus petites.",
        "Infrastructure : correction du périmètre de la ressource de stockage partagé ; suppression des faux positifs CodeQL.",
      ],
    },
  },
];

const GROUP_ORDER: Group[] = ["Features", "Improvements", "Fixes", "Security"];
const GROUP_LABEL: Record<Group, string> = { Features: "Fonctionnalités", Improvements: "Améliorations", Fixes: "Correctifs", Security: "Sécurité" };

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Changelog" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Dernière mise à jour :</strong> {LAST_UPDATED}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              Historique public des releases de la plateforme True Aim. Chaque entrée résume les fonctionnalités visibles par les utilisateurs, les améliorations de fiabilité, les correctifs et les travaux de sécurité ou de conformité livrés dans cette release.
            </p>

            {RELEASES.map((release, index) => (
              <article
                key={release.version}
                className={index === 0 ? "mt-14" : "mt-14 pt-14 border-t border-hairline"}
              >
                <header>
                  <Eyebrow>{release.date}</Eyebrow>
                  <h2 className="font-display text-2xl font-bold text-strong mt-1">
                    Plateforme True Aim {release.version}
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
