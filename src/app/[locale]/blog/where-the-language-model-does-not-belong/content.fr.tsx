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
import { FaqBlock, TextureBackdrop } from "@/components/content";
import { operations } from "./operations.fr";
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
  { id: "three-operations", heading: "Les trois opérations fondamentales" },
  { id: "computing-belongs-to-rules", heading: "Pourquoi le calcul revient aux règles" },
  { id: "where-a-model-earns-its-place", heading: "Là où un modèle mérite sa place" },
  { id: "when-you-cannot-separate", heading: "Quand on ne peut pas séparer les deux" },
  { id: "one-claim", heading: "La frontière sur un sinistre" },
  { id: "handover-points", heading: "Là où les règles s’arrêtent" },
  { id: "how-true-aim-draws-the-line", heading: "Comment True Aim trace la frontière" },
  { id: "claim-record", heading: "Ce qu’un dossier sinistre doit montrer" },
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const modelJobs: NumberedItem[] = [
  {
    title: "Extraction des documents et des preuves (Lecture)",
    body: "Les règles ne savent pas lire une photographie ni une note manuscrite. Les agents fondés sur des modèles de langage, si. Transformer des preuves non structurées en faits structurés est le travail qui leur convient le mieux. La discipline consiste à garder chaque agent étroit. Un agent qui ne fait qu’extraire est bien plus facile à vérifier qu’un agent qui lit, extrait, trie et explique en une seule passe.",
  },
  {
    title: "Résolution marquée des ambiguïtés (Jugement)",
    body: "Quand un élément est réellement ambigu et qu’aucune règle ne le tranche, un modèle peut faire l’appariement. Ce qui rend cela acceptable, c’est l’étiquette. Le dossier marque cette ligne comme probabiliste plutôt que déterministe, de sorte qu’un réviseur voit exactement quelles parties de la décision ont fait appel au jugement et où regarder en premier.",
  },
];

const claimSteps: NumberedItem[] = [
  {
    title: "Lecture",
    body: "Un agent extrait des documents de réparation les faits dont les règles ont besoin : ce qui a été réparé et ce qui a causé le dommage. Chaque valeur renvoie à son document source.",
  },
  {
    title: "Calcul",
    body: "Le moteur applique les conditions de la police et les règles métier à ces faits. La ligne revient couverte au titre de la clause 2.2A. L’explication s’enracine dans le libellé, elle n’est pas composée après coup. Toute franchise, limite ou plafond est ensuite calculée, le calcul étant montré ligne par ligne.",
  },
  {
    title: "Jugement",
    body: "Lorsqu’une ligne de facture ne correspond nettement à aucune règle, un modèle fait l’appariement et cette ligne seule porte une étiquette probabiliste. Les lignes voisines restent déterministes.",
  },
  {
    title: "Revue humaine",
    body: "L’intégralité de la piste d’audit peut être exportée à tout moment. Un gestionnaire examine le sinistre. Toute modification qu’il apporte exige un motif consigné directement dans le dossier.",
  },
];

const summaryPoints: BulletItem[] = [
  {
    lead: "La lecture revient aux modèles d’IA :",
    text: "Transformer des PDF, des photographies, des e-mails et des notes manuscrites non structurés en faits structurés.",
  },
  {
    lead: "Le calcul revient strictement aux règles :",
    text: "Calculer les limites, les franchises, les abattements et les répartitions de coassurance a exactement une bonne réponse. Un modèle ne peut en proposer qu’une probable.",
  },
  {
    lead: "Le jugement peut faire appel à un modèle, à condition d’être marqué comme tel :",
    text: "Lorsque le libellé laisse un élément ouvert, le dossier doit montrer que la ligne a été résolue par un modèle et non par une règle.",
  },
];

const stepKinds: BulletItem[] = [
  {
    lead: "Une étape déterministe",
    text: "est une étape où les mêmes entrées produisent toujours la même sortie. Une règle écrite sous forme d’arbre de décision se comporte ainsi : à partir des faits, le résultat est calculé, pas prédit.",
  },
  {
    lead: "Une étape probabiliste",
    text: "produit la réponse la plus probable d’après ce qu’elle a vu. Parce qu’un modèle de langage est probabiliste par construction, les mêmes entrées peuvent produire une réponse différente lors d’une autre exécution ou avec une autre version du modèle.",
  },
];

const handovers: BulletItem[] = [
  {
    lead: "Passage de main 1 : preuves manquantes.",
    text: "Si un document manque ou qu’une valeur ne peut être extraite, la bonne réponse est de la demander. Le sinistre attend le fait au lieu d’avancer sur une approximation.",
  },
  {
    lead: "Passage de main 2 : ambiguïté réelle.",
    text: "Lorsqu’une ligne de facture ne correspond nettement à aucune entrée de catalogue, un modèle apparie l’élément et le dossier le marque comme probabiliste. Le jugement se tient à côté de l’arithmétique, clairement étiqueté.",
  },
  {
    lead: "Passage de main 3 : seuils définis par l’assureur.",
    text: "Les seuils sur le montant du sinistre, l’écart par rapport aux résultats attendus ou les niveaux de confiance sont fixés par l’assureur. Un sinistre qui franchit un seuil est orienté vers un gestionnaire, qui voit les faits, la clause appliquée et chaque hypothèse retenue. Si une hypothèse ne tient pas, le gestionnaire la corrige et le résultat est recalculé.",
  },
];

const engineParts: BulletItem[] = [
  {
    lead: "Arbres de décision déterministes :",
    text: "Les conditions de police, les catalogues et les référentiels de règles sont convertis en arbres de décision. À partir des faits, le résultat est calculé plutôt que prédit. Mêmes entrées, même décision, à chaque fois.",
  },
  {
    lead: "Agents spécialisés par tâche :",
    text: "Les agents lisent photographies, PDF, écriture manuscrite, e-mails et texte libre pour en extraire des faits structurés. Chaque agent fait un seul travail, étroitement défini.",
  },
  {
    lead: "Appariement par modèle étiqueté :",
    text: "Lorsqu’un élément est réellement ambigu, un modèle l’apparie et marque cette ligne comme probabiliste dans le dossier.",
  },
  {
    lead: "Contrôle avec intervention humaine :",
    text: "Les résultats de couverture remontent à la clause qui les fonde. La revue humaine est déclenchée par des seuils fixés par l’assureur. Chaque modification apportée par une personne porte un motif.",
  },
];

const recordPoints: BulletItem[] = [
  { text: "Chaque fait porte la page du document dont il provient." },
  { text: "Chaque chiffre porte la clause ou la règle qui l’a produit." },
  {
    text: "Chaque jugement est marqué comme un jugement, afin que le réviseur sache où tester en premier.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "Séparation des outils :",
    text: "Lire, calculer et juger sont des étapes de natures différentes et exigent des outils différents.",
  },
  {
    lead: "Des règles pour le calcul :",
    text: "Le calcul revient aux règles. Une réponse probable à une opération arithmétique est un nouveau mode de défaillance sans aucun avantage.",
  },
  {
    lead: "Usage étiqueté des modèles :",
    text: "Un modèle mérite sa place dans la lecture et, marqué comme probabiliste, dans le jugement.",
  },
  {
    lead: "Des frontières de passage de main définies :",
    text: "Les règles s’arrêtent aux preuves manquantes, à l’ambiguïté réelle et aux seuils de l’assureur. Chacun est un passage de main que le dossier montre, pas une lacune qu’il cache.",
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

export default async function LanguageModelBoundaryBlogPost({
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
              Là où le modèle de langage n’a pas sa place
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Concevoir une IA défendable pour la gestion des sinistres
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
                7 min de lecture
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
                  <p className="text-body leading-[1.6] mb-4">
                    Une décision sur un sinistre n’est pas une étape unique. C’est une chaîne de bout en bout d’actions plus petites, classées en trois types distincts : <strong className="text-strong">Lecture</strong>,{" "}
                    <strong className="text-strong">Calcul</strong> et{" "}
                    <strong className="text-strong">Jugement</strong>.
                  </p>
                  <BulletList items={summaryPoints} />
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Le choix de conception qui compte n’est pas « règles ou modèles ». C’est de garder la frontière entre les deux visible à chaque étape du dossier.
                  </p>
                </div>
              </MotionDiv>

              {/* The three core operations */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="three-operations"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Les trois opérations fondamentales d’une décision sur un sinistre
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  L’IA dans les sinistres est généralement présentée comme un choix entre règles et modèles. Mais une décision sur un sinistre n’est pas un acte unique. C’est une chaîne d’étapes, et chacune exige le bon outil :
                </p>

                <NumberedCards
                  items={operations.map((operation) => ({
                    title: operation.name,
                    body: operation.description,
                  }))}
                />

                <p className="text-body leading-[1.6] mt-8">
                  La plupart des sinistres contiennent les trois. Ce qui compte, c’est que quelqu’un puisse voir, après coup, de quel type était chaque étape.
                </p>
              </MotionDiv>

              {/* Why computing belongs to rules */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="computing-belongs-to-rules"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Pourquoi le calcul revient aux règles, sans exception
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’arithmétique sur une limite écrite a une seule bonne réponse. Une répartition de coassurance d’un montant connu à un pourcentage connu n’a pas de résultat probable. Elle a un résultat.
                </p>

                <BulletList items={stepKinds} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  C’est une force quand il s’agit de lire des preuves désordonnées. Sur un calcul, c’est simplement une nouvelle façon de se tromper, sans contrepartie. Un modèle qui applique correctement une franchise sur chaque sinistre de test n’est toujours pas devenu une règle. L’exécution suivante n’est pas liée aux précédentes.
                </p>

                <p className="text-body leading-[1.6]">
                  Franchises, abattements, seuils, plafonds, limites, partages de responsabilité, coassurance et vétusté relèvent tous du calcul. Aucun n’a besoin d’un modèle.
                </p>
              </MotionDiv>

              {/* Where a model earns its place */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-a-model-earns-its-place"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Là où un modèle mérite sa place
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Un modèle mérite sa place en résolvant des tâches où des règles fixes ne peuvent pas fonctionner :
                </p>

                <NumberedCards items={modelJobs} />
              </MotionDiv>

              {/* When you cannot separate the two */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="when-you-cannot-separate"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ce qui se passe quand on ne peut pas séparer les deux
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Si l’extraction, le jugement et l’arithmétique se produisent à l’intérieur d’un seul appel de modèle, la décision ne peut être décrite que dans son ensemble. La sortie est une réponse unique, sans rien à inspecter à l’intérieur.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Toute explication est rédigée après coup, comme une narration de ce qui s’est probablement passé. Elle peut sembler plausible, mais ce n’est pas un dossier.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ce qui rend une décision difficile à défendre, c’est rarement qu’un modèle y ait participé. C’est que personne ne peut séparer les étapes où il a participé de celles où il ne l’a pas fait. Une décision qui n’est pas une boîte noire est une décision dont chaque étape peut être ouverte séparément, avec sa nature inscrite dessus.
                </p>

                <p className="text-body leading-[1.6]">
                  Cette propriété doit être conçue dans le système dès le premier jour. Un dossier qui n’a jamais enregistré quelles étapes ont été calculées ne peut pas être découpé en étapes par la suite.
                </p>
              </MotionDiv>

              {/* The boundary on one claim */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="one-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  À quoi ressemble la frontière sur un sinistre
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Prenons une ligne bris de glace sur un sinistre auto :
                </p>

                <NumberedCards items={claimSteps} />
              </MotionDiv>

              {/* Where rules stop */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="handover-points"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Là où les règles s’arrêtent : les trois points de passage de main
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Un arbre de décision est exactement aussi complet que les faits qu’on lui donne et le libellé à partir duquel il a été construit. Un moteur bien conçu traite les limites des règles comme des passages de main définis, pas comme des lacunes :
                </p>

                <BulletList items={handovers} />
              </MotionDiv>

              {/* How True Aim draws the line */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="how-true-aim-draws-the-line"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Comment True Aim trace la frontière
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Le moteur de décision de True Aim est un hybride de deux technologies. La frontière entre elles est le choix de conception central :
                </p>

                <BulletList items={engineParts} />
              </MotionDiv>

              {/* What a claim record should show */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="claim-record"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ce qu’un dossier sinistre doit pouvoir montrer
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Chaque sinistre clos est relu : par le gestionnaire avant validation, par le client quand un résultat est contesté ou par un auditeur un an plus tard. Tous posent la même question : comment en est-on arrivé là ?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Un dossier qui garde les trois types d’étapes séparés répond directement :
                </p>

                <BulletList items={recordPoints} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Un dossier qui ne conserve que le résultat final ne peut pas répondre du tout. Il ne peut offrir qu’une description rédigée après les faits. Une description n’est pas une preuve.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Points clés
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

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="related-reading"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Lectures associées
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La gestion des sinistres par IA n’est pas à haut risque au sens de l’AI Act européen
                    </Link>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-auditability-scorecard"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La grille d’évaluation de l’auditabilité de l’IA sinistres
                    </Link>
                  </div>
                </div>
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
              Le risque zéro n’existe pas. Les décisions explicables, si.
            </h2>
            <p className="text-lg text-body mb-10">
              Discutons de la façon dont cette frontière s’applique à votre gestion des sinistres.
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
