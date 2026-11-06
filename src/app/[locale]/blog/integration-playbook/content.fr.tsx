import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Workflow,
  Plug,
  Radio,
  MousePointer2,
  ShieldCheck,
  FileSignature,
  Server,
  ChevronRight,
} from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { IntegrationPatternA } from "@/components/diagrams/IntegrationPatternA";
import { IntegrationPatternB } from "@/components/diagrams/IntegrationPatternB";

const fadeIn = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } as const,
};

const principles = [
  {
    title: "Partir du résultat, remonter vers l’intégration.",
    body: "Nous partons du résultat métier et remontons vers la surface d’intégration. Une surface d’intégration minimale pour une valeur métier maximale, pas de couverture pour elle-même.",
  },
  {
    title: "Rejoindre les systèmes là où ils sont.",
    body: "Nous nous adaptons aux interfaces disponibles chez le client : API, dépôts de fichiers, files d’attente, flux d’événements ou, dans des cas étroits, l’interface historique elle-même. Nous ne forçons pas l’ajustement.",
  },
  {
    title: "Les données partagées avec nous ne quittent pas notre infrastructure.",
    body: "Aucune donnée client n’est envoyée à des fournisseurs de modèles tiers. L’inférence tourne sur des modèles hébergés dans notre environnement.",
  },
  {
    title: "Asynchrone et par lots par défaut ; synchrone seulement là où la latence l’exige.",
    body: "La plupart du travail sur les sinistres tolère quelques minutes de latence. Construire en synchrone partout est une taxe que nous refusons de payer au nom du client.",
  },
  {
    title: "Lecture légère, écriture délibérée.",
    body: "Nous récupérons ce dont nous avons besoin pour faire le travail. Nous n’écrivons pas dans les systèmes de référence avant qu’un humain n’ait approuvé.",
  },
  {
    title: "Chaque action journalisée, hachée, rejouable.",
    body: "Aligné sur DORA et prêt pour l’AI Act européen. Chaque prompt, version de modèle, nombre de tokens et intervention humaine est capturé au niveau de chaque sinistre.",
  },
];

const patterns = [
  {
    icon: Archive,
    name: "Lots sécurisés via un stockage partagé",
    when:
      "Le client peut déposer des documents et des données structurées à un emplacement de stockage auquel nous avons tous deux accès, et le cas d’usage tolère la latence du traitement par lots.",
    how: "Nous récupérons les entrées selon un calendrier ou à l’arrivée, les traitons dans notre environnement et écrivons les sorties à un emplacement de retour. Typiquement un fichier structuré par dossier plus un journal de traitement. Porté par le schéma A ci-dessous.",
  },
  {
    icon: Workflow,
    name: "Orchestration de flux de travail sur des backends hétérogènes",
    when:
      "Les données du client vivent dans plusieurs systèmes (CRM, dépôts documentaires, bases relationnelles, dumps, messagerie) et le flux de travail a besoin d’une surface unifiée pour les utilisateurs.",
    how: "Un backend d’orchestration lit les sources pertinentes, l’interface True Aim héberge le flux de travail utilisateur et, à la clôture, nous écrivons un artefact de retour standard pour réintégration dans les systèmes historiques. Porté par le schéma B ci-dessous.",
  },
  {
    icon: Plug,
    name: "Intégration API directe",
    when:
      "Une consultation interactive ou une écriture en retour où la latence ou l’exactitude exigent un aller-retour synchrone. Valider un numéro de police à la déclaration de sinistre, ou récupérer un seul enregistrement de couverture à la demande.",
    how: "Intégration REST ou webhook avec l’API du client. Nous gardons ces surfaces petites et bien définies. Authentification via OAuth2, mTLS ou JWT signés selon le standard du client.",
  },
  {
    icon: Radio,
    name: "File d’événements et de messages",
    when:
      "Flux à fort volume (ingestion des déclarations de sinistre, diffusion de statut à plusieurs parties prenantes) où la contre-pression et la durabilité comptent.",
    how: "Nous consommons depuis la file du client (Kafka, Service Bus, SQS ou équivalent) et publions en retour sur un topic dédié pour les consommateurs en aval.",
  },
  {
    icon: MousePointer2,
    name: "Saisie de données pilotée par navigateur dans des interfaces historiques",
    when:
      "Un flux de travail étroit et à forte valeur pour lequel aucune API n’existe et dont la construction ne se justifie pas.",
    how: "Une automatisation isolée effectue la saisie directement dans l’interface historique pour le compte d’un opérateur. Nous réservons ce schéma aux cas où la valeur justifie clairement l’empreinte opérationnelle. Ce n’est pas l’option par défaut.",
  },
];

const phases = [
  {
    label: "Phase 01",
    title: "Semaine zéro : découverte",
    goal: "Comprendre le modèle opérationnel cible du premier cas d’usage, les systèmes impliqués, les formes de données et l’enveloppe de risque.",
    time: "Le responsable métier du cas d’usage, un responsable ingénierie, un responsable opérations. Environ deux à trois sessions de travail.",
    outputs: [
      "Définition du cas d’usage avec un résultat métier mesurable",
      "Inventaire des systèmes et disponibilité des interfaces (API, fichier, file, UI seule)",
      "Échantillons de formes de données (sinistre, police, types de documents)",
      "Modèle d’authentification et de réseau",
      "Points de contrôle avec intervention humaine et seuils de risque",
      "Exigences d’audit et de conformité (DORA, AI Act européen, contrôles internes)",
    ],
  },
  {
    label: "Phase 02",
    title: "Semaines une à quatre : sprint de construction",
    goal: "Mettre en place l’intégration de bout en bout pour le cas d’usage convenu, sur des données client réelles dans un environnement hors production.",
    time: "Points de contrôle planifiés en fin de semaine une (contrats d’interface), semaine deux (premier passage de bout en bout), semaine quatre (recette utilisateur).",
    outputs: [
      "Intégration fonctionnelle dans un environnement accessible au client",
      "Contrats d’interface (formes de requête/réponse, sémantique des erreurs, politique de nouvelle tentative)",
      "Runbook opérationnel (déploiement, retour arrière, escalade d’astreinte)",
      "Spécification du journal d’audit (ce qui est capturé, où c’est stocké, comment on y accède)",
      "Jeu de données de test et harnais de rejeu",
    ],
  },
  {
    label: "Phase 03",
    title: "Déploiement progressif",
    goal: "Passer le cas d’usage en production derrière une montée en charge contrôlée, puis étendre aux cas d’usage adjacents.",
    time: "Montée en charge par type de sinistre, puis par pourcentage de volume, avec une couverture humaine large au départ qui se resserre à mesure que la confiance s’accumule.",
    outputs: [
      "Chaque cas d’usage suivant réutilise la surface d’intégration construite en semaine zéro, de sorte que le coût marginal du deuxième et du troisième cas d’usage est nettement inférieur à celui du premier.",
    ],
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "L’humain dans la boucle",
    body: "Chaque décision lourde de conséquences passe par un point de contrôle configurable. Le client choisit ce qui est automatique, ce qui est revu et ce qui est approuvé. Nous ne déployons pas d’agents opérant hors de cette enveloppe.",
  },
  {
    icon: FileSignature,
    title: "Piste d’audit",
    body: "Chaque action (appel de modèle, prompt, version de modèle, nombre de tokens, intervention humaine, appel système) est capturée au niveau de chaque sinistre, hachée cryptographiquement, horodatée et exportable. Cela répond aux exigences de résilience opérationnelle de DORA et aux obligations de transparence de l’AI Act européen.",
  },
  {
    icon: Server,
    title: "Localisation des données",
    body: "Les données client partagées avec nous restent dans notre infrastructure. Nous ne faisons pas transiter les données client par des fournisseurs de modèles tiers. Lorsque le client l’exige, nous déployons l’intégralité du pipeline de traitement dans son tenant cloud.",
  },
];

const tableOfContents = [
  { num: "01", label: "Résumé", anchor: "executive-summary" },
  { num: "02", label: "Principes d’intégration", anchor: "principles" },
  { num: "03", label: "Schémas que nous utilisons", anchor: "patterns" },
  { num: "04", label: "Schémas en pratique", anchor: "practice" },
  { num: "05", label: "Comment nous livrons", anchor: "deliver" },
  { num: "06", label: "Engagements", anchor: "commitments" },
];

export default async function IntegrationPlaybookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen relative">
      {/* Confidential ribbon */}
      <div className="border-y border-hairline bg-lilac">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-caption-sm text-subtle">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Interne &middot; Non référencé
          </span>
          <span className="hidden sm:inline">Doc &middot; TA-IPB / v1.0 / 2026</span>
        </div>
      </div>

      {/* === HERO === */}
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        <GridPattern className="absolute inset-x-0 top-0 hidden h-[600px] md:block" />

        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-caption-sm text-subtle hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            True Aim
          </Link>

          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="text-caption-sm text-accent mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-ta-blue" />
              Playbook
              <span className="text-subtle">/</span>
              <span className="text-subtle">Intégration</span>
            </div>

            <h1
              className="font-display font-bold text-strong leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
            >
              Le playbook
              <br />
              <span className="italic font-normal text-accent">
                d’intégration
              </span>{" "}
              True Aim.
            </h1>

            <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mb-16">
              Comment nous nous branchons sur les paysages existants, quels schémas nous utilisons et comment se déroule une première intégration.
            </p>
          </MotionDiv>

          {/* Spec strip */}
          <MotionDiv {...fadeIn}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Schémas", value: "5" },
                { label: "Phases", value: "3" },
                { label: "Première intégration", value: "4–6 sem." },
                { label: "Localisation des données", value: "Chez le client" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card shadow-card rounded-pill px-6 py-5"
                >
                  <div className="text-caption-sm text-subtle mb-2">
                    {stat.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-strong">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* === LAYOUT BODY === */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-12 gap-y-16">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-caption-sm text-subtle mb-4 pb-3 border-b border-hairline">
                Sommaire
              </div>
              <ol className="space-y-2.5">
                {tableOfContents.map((item) => (
                  <li key={item.num}>
                    <a
                      href={`#${item.anchor}`}
                      className="group flex items-baseline gap-3 text-sm text-body hover:text-accent transition-colors"
                    >
                      <span className="text-[10px] font-medium tabular-nums text-subtle group-hover:text-accent transition-colors">
                        {item.num}
                      </span>
                      <span className="leading-snug">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pt-6 border-t border-hairline space-y-2 text-caption-sm text-subtle">
                <div className="flex justify-between">
                  <span>Lecture</span>
                  <span className="text-body">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Public</span>
                  <span className="text-body">Ing. / Ops</span>
                </div>
                <div className="flex justify-between">
                  <span>Statut</span>
                  <span className="text-accent">En ligne</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            {/* === 01 EXECUTIVE SUMMARY === */}
            <article id="executive-summary" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="01" eyebrow="Résumé" />

                <div className="space-y-6 max-w-3xl">
                  <p className="text-body-lg text-strong font-light">
                    True Aim s’intègre aux systèmes cœur d’assurance, aux plateformes documentaires, aux fournisseurs d’IA et aux canaux de communication grâce à un petit ensemble de schémas bien compris. Nous partons du résultat métier et remontons vers la surface d’intégration. L’objectif est{" "}
                    <span className="font-medium text-accent">
                      la plus petite empreinte d’intégration qui délivre la valeur
                    </span>
                    , pas une couverture pour elle-même.
                  </p>

                  <p className="text-body leading-[1.6]">
                    Les données client partagées avec nous restent dans notre infrastructure. Nous n’envoyons pas de données client à des fournisseurs de modèles tiers. Chaque action du système est journalisée, hachée et rejouable. Chaque décision lourde de conséquences passe par un point de contrôle humain que le client configure.
                  </p>

                  <p className="text-body leading-[1.6]">
                    Ce document expose les principes, les schémas, deux implémentations de référence et le déroulement d’une première intégration en quatre à six semaines.
                  </p>
                </div>
              </MotionDiv>
            </article>

            {/* === 02 PRINCIPLES === */}
            <article id="principles" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="02" eyebrow="Principes d’intégration" />

                <ol className="space-y-px border-y border-hairline">
                  {principles.map((p, idx) => (
                    <li
                      key={p.title}
                      className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-6 py-7 border-b border-hairline last:border-b-0 group hover:bg-surface-muted transition-colors -mx-4 md:-mx-6 px-4 md:px-6"
                    >
                      <div className="font-display text-3xl md:text-5xl font-light text-accent leading-none tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-strong mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-body leading-[1.6] max-w-2xl">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </MotionDiv>
            </article>

            {/* === 03 PATTERNS === */}
            <article id="patterns" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="03" eyebrow="Schémas d’intégration que nous utilisons" />

                <p className="text-body leading-[1.6] max-w-2xl mb-10">
                  Un court catalogue. La plupart des projets en combinent deux ou trois.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patterns.map((pattern, idx) => {
                    const Icon = pattern.icon;
                    const isLastOdd =
                      idx === patterns.length - 1 && patterns.length % 2 === 1;
                    return (
                      <div
                        key={pattern.name}
                        className={`bg-card shadow-card rounded-pill p-7 flex flex-col gap-5 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch ${
                          isLastOdd ? "md:col-span-2" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-caption-sm text-subtle">
                            P/{String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 h-px bg-hairline" />
                          <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-strong leading-tight">
                          {pattern.name}
                        </h3>

                        <div className="space-y-4 text-sm">
                          <Field label="Quand l’utiliser" value={pattern.when} />
                          <Field label="Comment ça marche" value={pattern.how} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === 04 REFERENCE PATTERNS === */}
            <article id="practice" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="04" eyebrow="Schémas de référence en pratique" />
              </MotionDiv>

              {/* Pattern A */}
              <MotionDiv {...fadeIn} className="mb-20">
                <div className="text-caption-sm text-accent mb-3">
                  Schéma A &middot; Assureur suisse
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Décisions complexes sur sinistres
                  <br className="hidden md:block" /> pilotées par les documents.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  Les documents arrivent à un emplacement de stockage appartenant au client. Un lecteur par lots True Aim, exécuté dans notre environnement Azure, les récupère selon un calendrier. La décision sur les sinistres complexes et l’extraction des données clés tournent de notre côté. Un petit nombre d’appels d’enrichissement externes (recherche de pièces, géolocalisation) sont effectués pour des cas d’usage précis. Une consultation unique de la police dans l’ERP du client fournit le contexte de couverture. Les utilisateurs réalisent la revue dans la plateforme True Aim. À l’approbation, nous déposons un fichier JSON structuré par sinistre avec la décision, plus un journal de traitement contenant les métadonnées, les versions de modèle et les erreurs éventuelles, à un emplacement de retour dans l’infrastructure du client.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10 italic">
                  Les données client partagées avec nous restent dans le tenant Azure de True Aim. Aucune donnée client n’est envoyée à des fournisseurs de modèles tiers.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternA locale="fr" />}
                  figureLabel="Fig. A"
                  caption="Schéma A : décisions complexes sur sinistres pilotées par les documents."
                />

                <ProvesCallout>
                  Nous pouvons faire tourner un pipeline de décision de bout en bout avec une surface d’intégration minimale (deux emplacements de stockage et une API ERP), garder les données client dans notre environnement et renvoyer un artefact propre et structuré que le client peut ingérer comme il le souhaite.
                </ProvesCallout>
              </MotionDiv>

              {/* Pattern B */}
              <MotionDiv {...fadeIn}>
                <div className="text-caption-sm text-accent mb-3">
                  Schéma B &middot; Opérations d’assurance aux États-Unis
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6 leading-tight">
                  Orchestration multi-sources
                  <br className="hidden md:block" /> avec flux de travail SLA.
                </h3>

                <p className="text-body leading-[1.6] max-w-3xl mb-5">
                  Les données de travail du client vivent dans plusieurs systèmes : un CRM, Google Workspace, une base Postgres, des dumps SQL périodiques d’assureurs en amont et un canal WhatsApp pour les communications clients entrantes. Un backend d’orchestration True Aim (n8n) lit chaque source et assemble des dossiers sinistres de travail. Les utilisateurs réalisent le flux de travail de traitement des sinistres dans l’interface True Aim, qui suit les communications et les SLA sur tout le cycle de vie. À la clôture, True Aim génère un fichier plat standard pour réintégration dans les divers systèmes historiques des assureurs.
                </p>

                <p className="text-body leading-[1.6] max-w-3xl mb-10">
                  Pour un petit nombre de flux de travail à forte valeur où aucune API n’existe côté récepteur, une intégration par navigateur effectue la saisie directement dans l’interface de l’assureur. Nous réservons ce schéma aux cas où la valeur justifie clairement l’empreinte opérationnelle.
                </p>

                <DiagramFigure
                  diagram={<IntegrationPatternB locale="fr" />}
                  figureLabel="Fig. B"
                  caption="Schéma B : orchestration multi-sources avec flux de travail SLA."
                />

                <ProvesCallout>
                  Nous pouvons mettre en place une surface de travail fonctionnelle sur un paysage backend fragmenté sans imposer au client la construction lourde d’une API synchrone, et renvoyer les résultats par le canal que le système récepteur prend réellement en charge.
                </ProvesCallout>
              </MotionDiv>
            </article>

            {/* === 05 HOW WE DELIVER === */}
            <article id="deliver" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="05" eyebrow="Comment nous livrons" />

                <p className="text-body leading-[1.6] max-w-2xl mb-12">
                  Une première intégration se déroule en trois phases. Le schéma se répète pour chaque cas d’usage suivant, avec des délais plus courts à mesure que la connaissance côté client s’accumule.
                </p>

                <div className="space-y-px">
                  {phases.map((phase, idx) => (
                    <div
                      key={phase.label}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-4 md:gap-x-10 py-10 border-t border-hairline last:border-b last:border-b-hairline relative"
                    >
                      <div className="md:sticky md:top-24 md:self-start">
                        <div className="text-caption-sm text-subtle mb-2">
                          {phase.label}
                        </div>
                        <div className="font-display text-5xl md:text-6xl font-light text-accent leading-none tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="space-y-6 max-w-2xl">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-strong leading-tight">
                          {phase.title}
                        </h3>

                        <PhaseField label="Objectif" value={phase.goal} />
                        <PhaseField
                          label={
                            idx === 2
                              ? "Comment"
                              : idx === 0
                              ? "Temps client"
                              : "Temps client"
                          }
                          value={phase.time}
                        />

                        <div>
                          <div className="text-caption-sm text-subtle mb-3">
                            {idx === 2 ? "Résultat" : "Livrables"}
                          </div>
                          <ul className="space-y-2.5">
                            {phase.outputs.map((o) => (
                              <li
                                key={o}
                                className="flex items-start gap-3 text-body leading-relaxed"
                              >
                                <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            </article>

            {/* === 06 COMMITMENTS === */}
            <article id="commitments" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader
                  num="06"
                  eyebrow="Engagements valables à chaque phase"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {commitments.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.title}
                        className="relative bg-card shadow-card rounded-pill p-7 flex flex-col gap-5 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-pill bg-lilac grid place-items-center text-accent">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <span className="text-caption-sm text-subtle">
                            C/{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-strong leading-tight">
                          {c.title}
                        </h3>

                        <p className="text-sm text-body leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === END / CTA === */}
            <article>
              <MotionDiv {...fadeIn}>
                <div className="border-t border-hairline pt-14">
                  <div className="text-caption-sm text-subtle mb-6">
                    Fin du document
                  </div>
                  <h2
                    className="font-display font-bold text-strong leading-[1.05] mb-8"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
                  >
                    Envie de parcourir tout cela <br className="hidden md:block" />
                    au regard de votre propre paysage ?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonLink href="/contact" variant="primary" size="md">
                      Lancer une session de découverte
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </ButtonLink>
                    <ButtonLink href="/technology" variant="secondary" size="md">
                      Comment fonctionne la technologie
                    </ButtonLink>
                  </div>
                </div>
              </MotionDiv>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ num, eyebrow }: { num: string; eyebrow: string }) {
  return (
    <header className="mb-10">
      <div className="flex items-baseline gap-5 mb-3">
        <span className="font-display text-sm text-accent tabular-nums">
          {num}
        </span>
        <div className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-strong leading-[1.05]">
        {eyebrow}
      </h2>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-caption-sm text-subtle mb-1.5">
        {label}
      </div>
      <p className="text-body leading-relaxed">{value}</p>
    </div>
  );
}

function PhaseField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2 sm:gap-6">
      <div className="text-caption-sm text-subtle sm:pt-1">
        {label}
      </div>
      <p className="text-body leading-relaxed">{value}</p>
    </div>
  );
}

function DiagramFigure({
  diagram,
  figureLabel,
  caption,
}: {
  diagram: React.ReactNode;
  figureLabel: string;
  caption: string;
}) {
  return (
    <figure className="relative my-4">
      {/* Frame label */}
      <div className="flex items-center gap-3 mb-3 text-caption-sm text-subtle">
        <span className="text-accent">{figureLabel}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <div className="relative rounded-none shadow-card bg-lilac overflow-hidden p-6 md:p-8">
        {/* Corner ticks */}
        <span aria-hidden className="absolute top-0 left-0 w-3 h-3 border-l border-t border-ta-blue/60" />
        <span aria-hidden className="absolute top-0 right-0 w-3 h-3 border-r border-t border-ta-blue/60" />
        <span aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-ta-blue/60" />
        <span aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-ta-blue/60" />

        {diagram}
      </div>

      <figcaption className="mt-3 text-sm text-muted italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function ProvesCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 bg-lilac rounded-pill px-8 py-6">
      <div className="text-caption-sm text-accent mb-2">
        Ce que cela prouve
      </div>
      <p className="text-body-lg text-strong font-light max-w-3xl">
        {children}
      </p>
    </div>
  );
}
