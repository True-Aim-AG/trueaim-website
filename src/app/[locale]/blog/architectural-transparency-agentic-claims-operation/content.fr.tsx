import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  ScrollText,
  User,
} from "lucide-react";
import { ButtonLink } from "@/components/brand/Button";
import { ComparisonTable, FaqBlock, TextureBackdrop } from "@/components/content";
import {
  ClaimChainDiagram,
  PriceEngineDiagram,
  SharedRecordDiagram,
} from "./diagrams.fr";
import { faqs } from "./faqs.fr";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Sur cette page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "sovereign-fragment-problem", heading: "Le problème des fragments souverains" },
  { id: "glass-box", heading: "La boîte de verre" },
  { id: "price-integrity", heading: "L’intégrité empirique des prix" },
  { id: "four-pillars", heading: "Les quatre piliers" },
  { id: "judgement-dividend", heading: "Le dividende du jugement" },
  { id: "implementation-controls", heading: "Réalités structurelles" },
  { id: "implementation-roadmap", heading: "La feuille de route de mise en œuvre" },
  { id: "core-takeaways", heading: "Points essentiels" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const partyViews: BulletItem[] = [
  {
    text: "L’assureur travaille depuis un poste de gouvernance d’entreprise avec un suivi instantané de la conformité réglementaire.",
  },
  {
    text: "L’assuré suit en temps réel l’ingestion des preuves et observe directement à l’écran quels documents sont vérifiés et quelles exigences restent en suspens.",
  },
  {
    text: "L’intermédiaire surveille la consommation de capacité, les limites de sa délégation et les indicateurs de SLA en temps réel sans émettre de demande de statut.",
  },
  {
    text: "Le prestataire spécialisé soumet des devis ligne par ligne et reçoit une validation immédiate et déterministe au regard des conditions de couverture.",
  },
];

const decisionRecord: string[] = [
  "le fondement factuel exact et les pièces justificatives retenues ;",
  "la règle précise, le modèle statistique ou la version du libellé contractuel en vigueur ;",
  "la justification déterministe en langage clair ;",
  "l’identité exacte de l’acteur humain ou agentique qui exécute le changement.",
];

const priceSteps: NumberedItem[] = [
  {
    title: "Vérification déterministe ligne par ligne",
    body: "Chaque poste devisé est testé au regard de distributions de prix empiriques et dynamiques, dérivées de factures vérifiées et réglées, par corps de métier et par zone postale.",
  },
  {
    title: "Validation instantanée",
    body: "Les devis conformes aux distributions régionales vérifiées sont approuvés en moins d’une seconde.",
  },
  {
    title: "Localisation des écarts",
    body: "Les factures présentant des anomalies statistiques sont renvoyées immédiatement, avec l’identification précise des postes en écart et du delta exact par rapport au prix de référence.",
  },
  {
    title: "Isolement des cas limites",
    body: "Les postes non structurés ou groupés qui ne peuvent être vérifiés systématiquement sont mis de côté pour l’évaluation d’un gestionnaire senior.",
  },
];

const pillars = [
  {
    label: "Ingestion et orchestration",
    cells: [
      "Réception des sinistres multicanale, analyse continue du contexte et distribution agentique des tâches.",
      "Élimine la taxe de navigation administrative aux frontières internes et externes.",
    ],
  },
  {
    label: "Décision de couverture",
    cells: [
      "Calcul contractuel déterministe, ligne par ligne, qui relie les faits au libellé de la police.",
      "Déterminations juridiques vérifiables, en langage clair, exécutées en quelques millisecondes.",
    ],
  },
  {
    label: "Comparaison au marché",
    cells: [
      "Test empirique continu des prix au regard des courbes de variance par métier, par ligne et par région.",
      "Éradique les fuites d’indemnisation opérationnelles avec une équité absolue envers les réseaux de prestataires.",
    ],
  },
  {
    label: "Audit et gouvernance",
    cells: [
      "Journalisation continue des décisions, des documents source et des critères réglementaires.",
      "Génère un dossier d’audit instantané et immuable. Défendable dès la conception.",
    ],
  },
];

const judgementWork: BulletItem[] = [
  {
    lead: "L’arbitrage des cas limites :",
    text: "Intervenir dans les sinistres catastrophiques, ambigus ou juridiquement sensibles, où l’empathie humaine et le discernement contextuel déterminent l’issue.",
  },
  {
    lead: "La relation avec l’assuré :",
    text: "Mener des échanges nuancés et de haute confiance avec les demandeurs lorsque la couverture doit être modifiée ou refusée, armé de l’intégralité du raisonnement en langage clair qui fonde la décision.",
  },
  {
    lead: "L’amélioration systémique des règles :",
    text: "Agir en ingénieur des opérations internes, en analysant les schémas structurels d’intervention pour identifier où les directives de souscription ou les règles automatisées sont ambiguës, obsolètes ou trop restrictives.",
  },
];

const controls: BulletItem[] = [
  {
    lead: "La participation à l’écosystème exige une valeur réelle :",
    text: "Les réparateurs externes et les gestionnaires délégués n’adopteront pas le poste de travail d’un assureur s’il fonctionne comme un portail de surveillance numérique. Le dossier partagé ne réussit que si les partenaires externes en tirent une utilité tangible : validations automatisées ligne par ligne, autorisations de paiement en moins d’une journée et exigences sans ambiguïté.",
  },
  {
    lead: "Conception architecturale des habilitations :",
    text: "Les paramètres de permission ne peuvent pas être ajustés à la légère. L’assureur définit la visibilité structurelle une fois ; le système d’exploitation l’applique mathématiquement sur toutes les interfaces.",
  },
  {
    lead: "Rigueur des distributions :",
    text: "La comparaison algorithmique des prix n’est fiable que dans la mesure où le jeu de données sous-jacent l’est. Les prix de référence doivent être calculés à partir de factures empiriques, segmentées strictement par métier, catégorie et micro-marché régional.",
  },
  {
    lead: "Souveraineté de l’autorité déléguée :",
    text: "Un courtier opérant sous une délégation autorisée détient des droits de décision distincts de ceux d’un intermédiaire non mandaté. La machine à états doit refléter en continu qui détient l’autorité de décision sur chaque poste, en parfait alignement avec le contrat de souscription sous-jacent.",
  },
];

const roadmap: NumberedItem[] = [
  {
    title: "Isoler les lignes de fracture",
    body: "Cartographier chaque entité juridique souveraine qui touche une même branche, entreprises ou particuliers. Documenter précisément où le dossier de preuves se fracture et bascule dans la correspondance manuelle.",
  },
  {
    title: "Codifier la matrice des habilitations",
    body: "Formuler les politiques d’accès aux données pour chaque groupe de parties prenantes (assuré, courtier, gestionnaire et prestataire tiers) avant de déployer la moindre interface.",
  },
  {
    title: "Déployer un pilote à périmètre limité",
    body: "Intégrer un seul réseau de partenaires et une seule branche d’activité sur un dossier partagé. Mesurer sur quatre-vingt-dix jours le volume de demandes sortantes, les délais de traitement des factures et le taux de règlements contestés.",
  },
  {
    title: "Imposer la justification en langage clair",
    body: "Interdire l’enregistrement de décisions dépourvues de justification claire en langage courant. Un journal système sans justification explicite n’est qu’un échappement numérique, pas une défense juridique.",
  },
  {
    title: "Réinvestir le dividende du jugement",
    body: "Réallouer délibérément les heures des gestionnaires. Faire passer le personnel sinistres de la saisie de données à faible rendement vers l’ingénierie des risques à forte valeur, la négociation des règlements et l’architecture des règles.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "La réalité multipartite :",
    text: "Un sinistre complexe est par nature un dossier de preuves distribué. L’automatisation intra-entreprise ne fait que repousser le travail vers les frontières à forte friction entre organisations indépendantes.",
  },
  {
    lead: "Un système d’exploitation partagé :",
    text: "Un système d’exploitation agentique, fonctionnant comme une machine à états unifiée sous des habilitations rigoureuses par rôle, fait de la transparence inter-organisationnelle une propriété architecturale intrinsèque.",
  },
  {
    lead: "L’auditabilité en boîte de verre :",
    text: "La confiance d’entreprise exige une provenance continue au niveau de la ligne : l’enregistrement des faits exacts, des versions du libellé, du raisonnement en langage clair et des acteurs humains ou systèmes derrière chaque décision.",
  },
  {
    lead: "Le gestionnaire revalorisé :",
    text: "Les systèmes autonomes lèvent la taxe de navigation administrative et rendent aux gestionnaires sinistres le travail qui justifie l’investissement de l’entreprise : le jugement humain complexe, les relations avec les partenaires et la conception systémique des opérations.",
  },
];

/** A numbered list of house cards, one step or item per card. */
function NumberedCards({ items }: { items: NumberedItem[] }) {
  return (
    <ol role="list" className="space-y-4 list-none p-0">
      {items.map((item, index) => (
        <li key={item.title} className="bg-card shadow-card rounded-pill p-8">
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {index + 1}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="text-sm text-body leading-[1.6]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** A numbered list without titles, for items that are one line each. */
function NumberedList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ol role="list" className={`space-y-3 list-none p-0 text-body leading-[1.6] ${className}`}>
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
          >
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: BulletItem[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 text-body leading-[1.6] ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
          <span>
            {item.lead && (
              <>
                <strong className="text-strong">{item.lead}</strong>{" "}
              </>
            )}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ta-blue pl-6 my-8">
      <p className="text-body-lg text-strong">{children}</p>
    </div>
  );
}

export default async function ArchitecturalTransparencyBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              Tous les articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Le problème de l’automatisation des sinistres en silos
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Transparence architecturale et essor de l’organisation sinistres agentique
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO et cofondateur de True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                8 min de lecture
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0 max-w-3xl space-y-12">
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Résumé
                  </h2>
                  <p className="text-body leading-[1.6]">
                    Un sinistre n’a jamais existé dans les quatre murs d’une seule entreprise. L’assuré, le souscripteur, le délégataire, le réparateur spécialisé et l’expert en sinistres détiennent chacun des fragments souverains d’une vérité non partagée. L’automatisation historique s’arrêtait aux frontières internes, accélérant des postes isolés tout en laissant l’écosystème élargi dans l’immobilisme administratif. La voie à suivre n’est pas un nouveau chatbot ponctuel ni une boîte de réception automatisée. C’est un système d’exploitation agentique ancré à un dossier unifié, orchestrant l’exécution multipartite sous des habilitations mathématiques, chaque décision discrétionnaire étant journalisée avec une provenance au niveau de la ligne. La transparence cesse d’être une courtoisie. Elle devient une garantie architecturale.
                  </p>
                </div>

                <PullQuote>L’automatisation historique des sinistres est morte.</PullQuote>

                <p className="text-body leading-[1.6] mb-5">
                  Pendant dix ans, la suite logicielle d’assurance s’est vendue sur un seul indicateur : la vitesse. Réception plus rapide, reconnaissance optique plus rapide, triage plus rapide. Des milliards plus tard, les assureurs ont construit des postes ultra-rapides prisonniers de réseaux profondément lents.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Un assureur peut déployer des modèles génératifs pour ingérer une déclaration de sinistre en quatre secondes et calculer la couverture ligne par ligne. Pourtant, ce même assureur passe quarante-huit heures à courir après la pièce jointe d’un réparateur régional, et trois semaines à assembler une piste d’audit d’investigation pour une autorité de contrôle.
                </p>

                <p className="text-body leading-[1.6]">
                  Les heures rendues à un gestionnaire interne ont toujours été le moindre des gains. Le véritable enjeu, c’est ce que devient une organisation sinistres quand la taxe de navigation systémique, ce frottement manuel de la réconciliation des faits à travers les frontières d’entreprise, est éliminée par conception.
                </p>
              </MotionDiv>

              {/* The sovereign fragment problem */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sovereign-fragment-problem"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le problème des fragments souverains
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Prenons un sinistre habitation standard ou un sinistre auto complexe.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’assuré déclare un sinistre. Un intermédiaire valide la couverture sous une délégation de souscription. L’assureur statue sur la responsabilité. Un prestataire chiffre la remise en état. Un expert vérifie les dommages matériels.
                </p>

                <p className="text-body leading-[1.6]">
                  Cinq entités juridiques distinctes. Cinq bases de données isolées. Cinq conventions de tenue de dossiers divergentes.
                </p>

                <ClaimChainDiagram />

                <p className="text-body leading-[1.6] mb-5">
                  Parce qu’aucun participant ne possède la matrice factuelle complète, chaque organisation tient son propre dossier fantôme défensif. Le sinistre est démonté, traduit et réassemblé à chaque frontière qu’il franchit. Le statut se négocie par téléphone. Les devis traversent les pare-feux d’entreprise sous forme de PDF statiques. Les approbations reviennent en correspondance non indexée.
                </p>

                <p className="text-body leading-[1.6]">
                  Chaque franchissement de frontière prélève un tarif invisible : un avenant manquant, un délai non comptabilisé, une justification de décision qui n’existe que dans la mémoire d’un gestionnaire senior. Ce que le secteur appelle une « opération de bout en bout » est en réalité une chaîne ad hoc d’entreprises déconnectées qui tentent de se synchroniser par la friction humaine.
                </p>
              </MotionDiv>

              {/* The glass box */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="glass-box"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La boîte de verre : la transparence comme primitive architecturale
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Automatiser à l’intérieur du périmètre d’une entreprise ne peut pas résoudre une rupture inter-organisationnelle. Quand l’automatisation s’arrête à la frontière de l’entreprise, la friction s’accumule simplement à la périphérie.
                </p>

                <p className="text-body leading-[1.6]">
                  L’alternative architecturale est un système d’exploitation agentique bâti sur un dossier sinistre unique et synchronisé. Une seule machine à états sous-jacente ; plusieurs interfaces souveraines, cloisonnées par rôle.
                </p>

                <SharedRecordDiagram />

                <BulletList items={partyViews} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Chaque partie accède précisément à ce qu’elle est juridiquement et commercialement en droit de voir, grâce à des barrières informationnelles natives. Chaque participant travaille à partir d’une base identique et immuable.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Sous cette architecture se trouve une discipline stricte : chaque action distincte qui modifie un sinistre est calculée comme une décision formelle et enregistrée avec une provenance au niveau de la ligne. Qu’il s’agisse de vérifier la prise d’effet de la police, de confirmer l’applicabilité de la couverture, de comparer un taux horaire au marché ou d’orienter un sinistre anormal vers la lutte antifraude, le moteur enregistre :
                </p>

                <NumberedList items={decisionRecord} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Si un gestionnaire humain passe outre une détermination automatisée, l’architecture impose une justification explicite et motivée.
                </p>

                <p className="text-body leading-[1.6]">
                  C’est ici que l’auditabilité passe d’une reconstruction réactive à une réalité ambiante. La transparence entre organisations a historiquement été une courtoisie intermittente. Dans une architecture agentique, c’est une propriété immuable du système.
                </p>

                <PullQuote>
                  Pas une boîte noire. Une boîte de verre : auditable dès la conception, vérifiable cryptographiquement et ouverte à chaque partie prenante légitime de la chaîne de valeur.
                </PullQuote>
              </MotionDiv>

              {/* Empirical price integrity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="price-integrity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’ingénierie de précision sur le terrain : l’intégrité empirique des prix
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nulle part le coût de l’opacité structurelle n’est plus visible que dans les devis de la chaîne de prestataires, où les fuites de règlement (leakage) non surveillées se concentrent sur la longue traîne.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Historiquement, les assureurs géraient la friction des devis par des contrôles arbitraires et grossiers : les factures dépassant un plafond monétaire arbitraire étaient confiées à des experts indépendants à grands frais ; celles en dessous étaient validées d’un geste ou évaluées à l’intuition du gestionnaire. Sur des marchés régionaux complexes, comme la remise en état de bâtiments en Suisse, les assureurs travaillaient avec des tarifs associatifs statiques et théoriques (suissetec, EIT.swiss) qui ne reflétaient pas la dynamique réelle et locale des règlements.
                </p>

                <p className="text-body leading-[1.6]">
                  Dans une architecture ouverte et agentique, la validation des devis passe du débat subjectif au calcul empirique :
                </p>

                <PriceEngineDiagram />

                <NumberedCards items={priceSteps} />

                <p className="text-body leading-[1.6] mt-8 mb-5">
                  Quand un prestataire peut valider un devis au regard du prix de référence du marché avant de l’envoyer, la nature de la relation change. Une demande de nouveau devis n’est plus un litige conflictuel ; c’est une réconciliation objective et automatisée. Les modèles de distribution sous-jacents s’affinent dynamiquement à chaque règlement décidé.
                </p>

                <p className="text-body leading-[1.6]">
                  L’intégrité des prix cesse d’être un point de contentieux entre entreprises. Elle devient une preuve partagée et incontestable.
                </p>
              </MotionDiv>

              {/* The four pillars */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-pillars"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Les quatre piliers du système d’exploitation des sinistres
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Une architecture sinistres d’entreprise exige des composants modulaires qui orchestrent l’agentivité de bout en bout. Ces capacités ne sont pas linéaires ; elles s’interconnectent nativement :
                </p>

                <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
                  <ComparisonTable
                    caption="Les quatre piliers du système d’exploitation des sinistres"
                    columns={["Module", "Fonction principale", "Résultat pour l’entreprise"]}
                    rows={pillars}
                  />
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Les assureurs n’ont pas besoin de se lancer dans des transformations pluriannuelles et risquées de leur plateforme cœur pour capter cette valeur. Ils peuvent mettre en œuvre une seule capacité, comme la comparaison des prix ou la vérification de couverture, et étendre de façon modulaire à mesure que le dossier partagé démontre son retour sur investissement.
                </p>

                <p className="text-body leading-[1.6]">
                  C’est le modèle opérationnel de l’assureur de premier rang : les intermédiaires démontrent leur conformité à la délégation par des données en direct plutôt que par des audits annuels. Les réseaux de réparateurs échangent la friction contre la rapidité de paiement. Quand l’autorité de contrôle de l’assurance adresse une demande formelle, l’assureur présente un dossier de décision complet généré en quelques secondes, pas une reconstruction d’investigation paniquée assemblée sur des mois.
                </p>

                <PullQuote>Décidé en quelques minutes. Défendu pendant des années.</PullQuote>
              </MotionDiv>

              {/* The judgement dividend */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="judgement-dividend"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le dividende du jugement : élever l’humain plutôt que le remplacer
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Le discours dominant sur l’IA en entreprise se concentre sur la réduction de la main-d’œuvre. Cette thèse se méprend sur la nature du risque professionnel.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  True Aim ne remplace pas le professionnel des sinistres ; il dissout l’échafaudage administratif qui l’empêchait d’exercer son métier. En déléguant la lecture des documents, la traduction en données structurées, la vérification des prix de base et la communication de statut à un système d’exploitation agentique sous-jacent, les gestionnaires récupèrent leur semaine de travail pour les tâches qui exigent un raisonnement stratégique à fort enjeu :
                </p>

                <BulletList items={judgementWork} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Les tableaux de bord de performance de la direction s’adapteront en conséquence. Le délai de traitement et le coût par dossier étaient les indicateurs grossiers de l’ère manuelle. L’entreprise qui opère sur un dossier agentique partagé surveille la cohérence des décisions, l’explicabilité ligne par ligne, l’élimination systématique des points de contact avec les partenaires et la réduction des taux de litige.
                </p>
              </MotionDiv>

              {/* Structural realities */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-controls"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Réalités structurelles et contrôles de mise en œuvre
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Transformer un réseau opérationnel exige de reconnaître les contraintes architecturales dès le jour zéro :
                </p>

                <BulletList items={controls} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  La conformité n’est pas une réflexion après coup posée sur des flux hérités. Elle est intégrée à la transaction dès le premier enregistrement ingéré.
                </p>
              </MotionDiv>

              {/* The implementation roadmap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-roadmap"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La feuille de route de mise en œuvre
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La transformation de l’entreprise n’exige pas une migration spéculative en big bang. Elle exige une exécution précise et par phases :
                </p>

                <NumberedCards items={roadmap} />

                <p className="text-body leading-[1.6] mt-8">
                  Les assureurs qui réussissent cette transition établiront le standard technologique et opérationnel de leurs partenaires commerciaux. Ceux qui continuent à déployer des solutions ponctuelles localisées ne feront que financer un poste plus rapide au sein d’une chaîne obsolète.
                </p>
              </MotionDiv>

              {/* Core takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Points essentiels
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {takeaways.map((takeaway) => (
                      <li key={takeaway.text} className="flex items-start gap-3">
                        <CheckCircle
                          aria-hidden="true"
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-body leading-[1.6]">
                          <strong className="text-strong">{takeaway.lead}</strong>{" "}
                          {takeaway.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-body-lg text-strong mt-8">
                  Quelles frontières architecturales de votre infrastructure sinistres actuelle génèrent aujourd’hui le plus de frottement administratif ? Échangeons dans les commentaires.
                </p>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="faq"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Questions fréquentes
                </h2>

                <FaqBlock faqs={faqs} />
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Navigation dans l’article">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  Sur cette page
                </h2>
                <nav aria-label="Sur cette page">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-body hover:text-accent transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Voir le Trust Center
                    <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Décidé en quelques minutes. Défendu pendant des années.
            </h2>
            <p className="text-lg text-body mb-10">
              Discutons de ce qu’un dossier sinistre partagé changerait dans votre gestion des sinistres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                <Calculator aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
                Estimer l’impact
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
