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
    "Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irlande",
  service:
    "Infrastructure cloud et hébergement (Microsoft Azure), déployés dans le tenant Azure de True Aim. Cela couvre le calcul, la base de données, le stockage, l’inférence des modèles d’IA (Azure OpenAI), le traitement des documents, la gestion des clés, la surveillance et le réseau.",
  data:
    "Toutes les catégories de données personnelles énumérées à l’annexe 3 de l’accord de traitement des données : données d’identification, références de police et de sinistre, données liées au sinistre (y compris des données personnelles sensibles lorsque le sinistre l’exige) et données financières. Également la télémétrie de la plateforme (métadonnées des requêtes) et les données de compte des utilisateurs autorisés.",
  location:
    "Toutes les données au repos sont stockées dans la région Switzerland North (Zurich), avec des sauvegardes dans la région Switzerland West (Genève). Le traitement des documents s’exécute dans Switzerland North. L’inférence des modèles d’IA passe par la ressource Azure OpenAI de True Aim dans Switzerland North. L’inférence peut être traitée en Suisse ou dans l’UE. Les prompts et les sorties ne sont pas stockés en dehors de Switzerland North. La surveillance des abus d’Azure OpenAI constitue une exception quant aux personnes pouvant accéder aux données ; voir ci-dessous.",
  access:
    "Le personnel autorisé de True Aim, via le tenant Azure de True Aim. Le personnel de Microsoft ne peut accéder aux données que dans la mesure permise par le Microsoft Products and Services Data Protection Addendum (DPA Microsoft), par exemple pour fournir une assistance.",
  transfers:
    "Pour tout transfert hors de l’UE, de l’EEE, du Royaume-Uni ou de la Suisse, le DPA Microsoft du 22 mai 2026 intègre les clauses contractuelles types de l’UE de 2021, module sous-traitant à sous-traitant, entre Microsoft Ireland Operations Limited et Microsoft Corporation. Microsoft s’engage à respecter le droit suisse de la protection des données pour les données personnelles provenant de Suisse. Microsoft est également certifiée au titre de l’EU-U.S. Data Privacy Framework et du Swiss-U.S. Data Privacy Framework.",
  exception: {
    title: "Exception : surveillance des abus d’Azure OpenAI",
    body: (
      <>
        <p>
          Microsoft exerce une surveillance des abus sur Azure OpenAI, et elle est activée pour la ressource de True Aim. Microsoft peut conserver les prompts et les sorties que ses systèmes signalent pour examen. Elle les stocke dans Switzerland North, la région Azure de la ressource. Microsoft ne publie aucune durée de conservation pour ces données.
        </p>
        <p className="mt-3">
          L’examen est automatisé par défaut. Des employés autorisés de Microsoft n’examinent le contenu signalé que lorsque l’examen automatisé n’est pas concluant. Microsoft ne s’engage à recourir à des examinateurs situés dans l’EEE que pour les déploiements dans l’EEE. Elle ne prend aucun engagement de ce type pour la Suisse ; ces examinateurs peuvent donc se trouver hors de Suisse, de l’EEE et du Royaume-Uni. C’est l’exception à l’engagement de True Aim de maintenir l’hébergement et l’inférence en Suisse, dans l’EEE ou au Royaume-Uni.
        </p>
        <p className="mt-3">
          Microsoft n’utilise pas ces données pour entraîner des modèles. Sources :{" "}
          <a href={MS_ABUSE_MONITORING} className="text-link hover:underline">
            Azure OpenAI abuse monitoring
          </a>{" "}
          et{" "}
          <a href={MS_DATA_PRIVACY} className="text-link hover:underline">
            Data, privacy and security for Azure OpenAI
          </a>{" "}
          (Microsoft Learn, mai 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE_CLOUD: SubProcessor = {
  id: "google-cloud",
  name: "Google Cloud EMEA Limited",
  entity: "Google Cloud EMEA Limited, 70 Sir John Rogerson’s Quay, Dublin 2, Irlande",
  service:
    "Inférence d’IA avec les modèles Gemini de Google sur Google Cloud (Vertex AI), comme fournisseur de modèles alternatif aux côtés d’Azure OpenAI.",
  data: "Les mêmes documents et données de sinistre que ceux que la plateforme envoie à Azure OpenAI.",
  location: "Union européenne. Google stocke et traite les données dans l’UE.",
  access: (
    <>
      Le personnel de Google peut accéder aux données à des fins de maintenance et d’assistance depuis les pays listés à l’adresse{" "}
      <a href={GOOGLE_CLOUD_SUBPROCESSORS} className="text-link hover:underline">
        cloud.google.com/terms/subprocessors
      </a>
      . Les sociétés d’assistance externes ne voient les données que si True Aim les partage dans un dossier d’assistance. La surveillance des abus de Vertex AI constitue une exception quant aux personnes pouvant accéder aux données ; voir ci-dessous.
    </>
  ),
  transfers:
    "Google Cloud Data Processing Addendum du 8 juin 2026, qui couvre la LPD suisse, avec les clauses contractuelles types de l’UE. Google LLC est également certifiée au titre des Data Privacy Frameworks EU-U.S. et Swiss-U.S.",
  exception: {
    title: "Exception : surveillance des abus de Vertex AI",
    body: (
      <>
        <p>
          Google exerce une surveillance des abus sur les modèles Gemini dans Vertex AI, et elle est activée pour le projet Google Cloud de True Aim. Google ne stocke un prompt que lorsque ses classificateurs de sécurité automatisés signalent un abus possible. Elle conserve le prompt jusqu’à 90 jours, dans la région sélectionnée pour le projet, qui se trouve dans l’Union européenne.
        </p>
        <p className="mt-3">
          Des employés autorisés de Google peuvent examiner les prompts signalés. Google n’indique pas où se trouvent ces examinateurs ; ils peuvent donc se trouver hors de Suisse, de l’EEE et du Royaume-Uni. C’est l’exception à l’engagement de True Aim de maintenir l’hébergement et l’inférence en Suisse, dans l’EEE ou au Royaume-Uni.
        </p>
        <p className="mt-3">
          Google n’utilise pas ces données pour entraîner ou affiner des modèles. Source :{" "}
          <a href={GOOGLE_ABUSE_MONITORING} className="text-link hover:underline">
            Vertex AI abuse monitoring
          </a>{" "}
          (documentation Google Cloud, octobre 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE: SubProcessor = {
  id: "google",
  name: "Google Ireland Limited",
  entity: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande",
  service:
    "Messagerie professionnelle, stockage de documents et agenda (Google Workspace), utilisés pour les communications avec les clients et la coordination opérationnelle. Pour les clients qui soumettent leurs sinistres par e-mail, il reçoit aussi la correspondance et les pièces jointes relatives aux sinistres dans une boîte dédiée, où la plateforme les collecte automatiquement.",
  data:
    "Données d’identification. Données personnelles liées aux sinistres, y compris pièces d’identité et autres pièces jointes, dans la correspondance relative aux sinistres que les clients envoient par e-mail. Toute donnée personnelle liée à un sinistre que les clients ou les personnes concernées incluent dans d’autres correspondances ou documents partagés.",
  location:
    "Union européenne (région de données Google Workspace réglée sur l’Europe) pour les données au repos couvertes par la région de données.",
  access:
    "Le personnel autorisé de True Aim disposant de comptes Google Workspace. Le personnel de Google ne peut accéder aux données que dans la mesure permise par le Google Cloud / Workspace Data Processing Addendum, par exemple pour fournir une assistance.",
  transfers:
    "Les données hors du périmètre de la région de données, ainsi que l’accès du personnel de Google à des fins d’assistance, peuvent impliquer un traitement en dehors de l’UE. Le Google Cloud / Workspace Data Processing Addendum intègre les clauses contractuelles types de l’UE pour ces transferts.",
};

const SLACK: SubProcessor = {
  id: "slack",
  name: "Slack Technologies Limited",
  entity:
    "Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street Upper, Dublin 2, D02 W085, Irlande",
  service:
    "Communication interne de l’équipe, utilisée par le personnel de True Aim pour coordonner les opérations et résoudre les incidents. Des données personnelles liées aux sinistres peuvent y être mentionnées.",
  data:
    "Données d’identification, ainsi que toute donnée personnelle liée à un sinistre que le personnel mentionne dans des messages, des fils de discussion ou des fichiers partagés.",
  location: "Union européenne (résidence des données Slack dans l’UE pour les messages et les fichiers partagés au repos).",
  access:
    "Le personnel autorisé de True Aim dans l’espace de travail Slack de True Aim. Le personnel de Slack ne peut accéder aux données que dans la mesure permise par le Slack Data Processing Addendum, par exemple pour fournir une assistance.",
  transfers:
    "Les données hors du périmètre de la résidence des données Slack, ainsi que l’accès du personnel de Slack à des fins d’assistance, peuvent impliquer un traitement en dehors de l’UE. Le Slack Data Processing Addendum intègre les clauses contractuelles types de l’UE pour ces transferts.",
};

const SENTRY: SubProcessor = {
  id: "sentry",
  name: "Functional Software, Inc. d/b/a Sentry",
  entity:
    "Functional Software, Inc. d/b/a Sentry, 45 Fremont Street, 8th Floor, San Francisco, CA 94105, États-Unis",
  service: "Surveillance des erreurs et des performances de la plateforme.",
  data:
    "La plateforme retire les données clients de chaque rapport d’erreur avant que le rapport ne quitte la plateforme. Sentry ne reçoit que les types d’erreur, les routes de pages et des identifiants techniques, dont un numéro d’utilisateur interne sans nom ni e-mail. En seconde couche, Sentry retire également de son côté les champs sensibles, par leur nom, lorsqu’il reçoit un événement.",
  location:
    "Les rapports d’erreur sont stockés dans l’Union européenne (Francfort, Allemagne). Les données de compte aux États-Unis ne couvrent que les identifiants de connexion du personnel de True Aim.",
  access:
    "Le personnel autorisé de True Aim disposant de comptes Sentry. Le personnel de Sentry accède aux données à distance, à des fins d’assistance et d’exploitation, depuis les États-Unis, l’Autriche, le Canada et les Pays-Bas.",
  transfers:
    "Les transferts vers les États-Unis reposent sur l’EU-U.S. Data Privacy Framework, son extension britannique (UK Extension) et le Swiss-U.S. Data Privacy Framework, avec les clauses contractuelles types en solution de repli.",
};

const GROUPS: SubProcessorGroup[] = [
  {
    id: "group-a",
    title: "Groupe A : traite des données personnelles des clients",
    intro: "Ces sous-traitants ultérieurs traitent des données personnelles des clients pour fournir la plateforme et les services.",
    members: [MICROSOFT, GOOGLE_CLOUD, GOOGLE, SLACK],
  },
  {
    id: "group-b",
    title: "Groupe B : reçoit uniquement des rapports d’erreur techniques",
    intro:
      "Ce sous-traitant ultérieur reçoit uniquement des rapports d’erreur techniques, dont la plateforme retire les données clients.",
    members: [SENTRY],
  },
];

const VERSION_HISTORY = [
  {
    version: "1.6",
    date: EFFECTIVE_DATE,
    summary:
      "Entrée Microsoft clarifiée : les catégories de données personnelles renvoient à l’annexe 3 de l’accord de traitement des données, la localisation précise que l’inférence peut être traitée en Suisse ou dans l’UE tandis que les prompts et les sorties ne sont pas stockés en dehors de Switzerland North, et l’entité est nommée Microsoft Ireland Operations Limited dans toute l’entrée.",
  },
  {
    version: "1.5",
    date: "2026-10-31",
    summary:
      "Précisé que Microsoft Azure exécute l’inférence des modèles d’IA en Suisse et dans l’Union européenne, sans date de fin. Ajout de l’exception relative à la surveillance des abus de Vertex AI à l’entrée Google Cloud EMEA Limited.",
  },
  {
    version: "1.4",
    date: "2026-10-23",
    summary:
      "Ajout de Google Cloud EMEA Limited (modèles Gemini sur Google Cloud) au groupe A comme fournisseur alternatif d’inférence d’IA.",
  },
  {
    version: "1.3",
    date: "2026-10-20",
    summary:
      "Liste scindée en deux groupes. Ajout de l’accès et de la base de transfert pour chaque sous-traitant ultérieur. Précisé où Azure conserve les sauvegardes et exécute l’inférence d’IA, ainsi que l’exception relative à la surveillance des abus d’Azure OpenAI. Module de transfert Microsoft nommé. Entrée Sentry corrigée : la plateforme retire les données clients de chaque rapport d’erreur avant qu’il ne quitte la plateforme.",
  },
  {
    version: "1.2",
    date: "2026-10-14",
    summary:
      "Entrée Sentry corrigée : métadonnées de compte stockées aux États-Unis, lieux d’accès à distance et données personnelles concernées.",
  },
  {
    version: "1.1",
    date: "2026-09-24",
    summary:
      "Ajout de Sentry. Entrée Google Workspace élargie aux sinistres soumis par e-mail. Précisé où Microsoft Azure exécute l’inférence d’IA.",
  },
  {
    version: "1.0",
    date: "2026-08-17",
    summary:
      "Première publication en tant qu’annexe 2 de l’accord de traitement des données daté du 16 août 2026.",
  },
];

const TOC = [
  ...GROUPS.flatMap((group) => [
    { id: group.id, label: group.title, nested: false },
    ...group.members.map(({ id, name }) => ({ id, label: name, nested: true })),
  ]),
  { id: "version-history", label: "Historique des versions", nested: false },
];

type FieldKey = "entity" | "service" | "data" | "location" | "access" | "transfers";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "entity", label: "Entité" },
  { key: "service", label: "Service" },
  { key: "data", label: "Données personnelles concernées" },
  { key: "location", label: "Localisation" },
  { key: "access", label: "Accès" },
  { key: "transfers", label: "Base de transfert" },
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
        eyebrow="Annexe 2 de l’accord de traitement des données"
        title="Liste des sous-traitants ultérieurs"
        texture={{ name: "circ", position: "72% 18%" }}
      >
        <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted">Version</dt>
          <dd className="text-strong font-medium">{VERSION}</dd>
          <dt className="text-muted">Date d’entrée en vigueur</dt>
          <dd className="text-strong font-medium">{EFFECTIVE_DATE}</dd>
          <dt className="text-muted">Dernière mise à jour</dt>
          <dd className="text-strong font-medium">{LAST_UPDATED}</dd>
          <dt className="text-muted">Base juridique</dt>
          <dd className="text-strong font-medium">LPD suisse art. 9 ; RGPD art. 28</dd>
        </dl>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">
          <div className={cn(CARD, "p-6 md:p-8 mb-8")}>
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Sommaire</h2>
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
            Cette liste constitue l’annexe 2 de l’accord de traitement des données de True Aim AG. Telle que mise à jour conformément à cet accord, elle est la liste en vigueur aux fins de l’accord.
          </p>

          <p className="text-body leading-[1.6] mt-4">
            True Aim maintient l’hébergement et l’inférence d’IA en Suisse, dans l’EEE ou au Royaume-Uni. Toute exception est indiquée sur cette page sous le sous-traitant ultérieur concerné. Les sous-traitants ultérieurs du groupe A traitent des données personnelles des clients. Le sous-traitant ultérieur du groupe B reçoit uniquement des rapports d’erreur techniques.
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
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Historique des versions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Version</th>
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Date d’entrée en vigueur</th>
                    <th className="text-left py-3 font-display font-medium text-strong align-top">Résumé des modifications</th>
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
            Des questions sur cette liste ? Contactez{" "}
            <a href="mailto:info@trueaim.ai" className="text-link hover:underline">
              info@trueaim.ai
            </a>
            .
          </p>
          <p className="text-sm text-muted mt-3">
            True Aim AG · Metallstrasse 9, 6300 Zug, Suisse · CHE-325.128.066
          </p>
        </div>
      </section>
    </div>
  );
}
