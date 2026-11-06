import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Sur cette page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-accuracy-illusion", heading: "L’illusion de la précision" },
  { id: "what-changes-between-demo-and-production", heading: "Ce qui change entre la démo et la production" },
  { id: "the-three-metrics-that-matter", heading: "Les trois indicateurs qui comptent" },
  { id: "what-moves-a-pilot-forward", heading: "Ce qui fait avancer un pilote" },
  { id: "operational-takeaway", heading: "Conclusion opérationnelle" },
  { id: "key-takeaways", heading: "Points clés" },
];

export default async function WhyClaimsAIPilotsStallBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "50% 50%" }} />

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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Tous les articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Pourquoi les pilotes d’IA sinistres s’enlisent avant d’être prêts pour la production
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              De nombreux pilotes d’IA sinistres annoncent une précision autour de 95 %. Des mois plus tard, ils ne sont toujours pas en production. La cause profonde tient à la discipline de mesure et au réalisme des conditions de production.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                10 min de lecture
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Analyse technique approfondie
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
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    Ce schéma est courant sur le marché. Il est rarement dû à un manque de budget ou de soutien de la direction. Dans la plupart des cas, la cause profonde tient à la discipline de mesure et au réalisme des conditions de production.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Dans les premiers pilotes, la précision annoncée est souvent calculée sur des données de développement. Ce sont des sinistres sur lesquels le système a déjà été ajusté pendant la configuration. Évaluée sur des données de production jamais vues, la précision retombe fréquemment entre 70 et 80 %. L’écart entre ces deux chiffres détermine si un système peut être déployé en toute sécurité.
                </p>
              </MotionDiv>

              {/* The Accuracy Illusion */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-accuracy-illusion"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’illusion de la précision
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Quand quelqu’un annonce 95 % de précision, la première question devrait être simple : mesurée sur quel jeu de données ?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La plupart des pilotes s’appuient sur des jeux de développement sélectionnés. Ces jeux sont utiles pour ajuster les prompts, les règles et les pipelines d’extraction. Ils ne sont pas représentatifs de toute la variabilité de la production.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La production comprend des variantes de polices, des formats de factures inconnus, des différences de langue, des cas limites rares et une qualité de données inégale. Un modèle performant sur des données sélectionnées peut échouer silencieusement sur de vrais sinistres.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Ce qui compte, c’est la performance sur un jeu de test isolé (holdout) : des sinistres que le système n’a jamais vus, tirés directement des archives de production, stratifiés selon l’acceptation et le refus, le montant du sinistre, la langue, la marque du véhicule et la complexité des documents.
                </p>

                {/* Key stat callout */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-semibold text-strong">
                      L’écart en pratique
                    </h3>
                  </div>
                  <p className="text-sm text-muted">
                    Cet écart n’était pas dû au hasard. Il a révélé une logique de couverture manquante, des lacunes de vocabulaire et des faiblesses structurelles de l’extraction.
                  </p>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Un pilote mesuré uniquement sur des données de développement crée de la confiance. Un pilote mesuré sur un jeu de test isolé crée de la clarté.
                  </p>
                </div>
              </MotionDiv>

              {/* What Changes Between Demo and Production */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-changes-between-demo-and-production"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ce qui change entre la démo et la production
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Le passage de la démo à la production introduit un décalage de distribution. Les caractéristiques des sinistres réels diffèrent sensiblement des données de test.
                </p>

                <div className="space-y-6">
                  {/* Coverage categories */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Layers className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Complexité de la couverture
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Nous avions d’abord modélisé moins de catégories de couverture que la production ne l’exigeait. Lorsque des catégories supplémentaires sont entrées dans le pipeline, le système a produit des résultats affirmés avec assurance mais erronés. Après extension de la logique de couverture, la précision s’est nettement améliorée en une seule itération.
                    </p>
                    <div className="mt-4 p-3 bg-lilac rounded-pill">
                      <p className="text-sm font-medium text-accent">
                        Le modèle n’était pas instable. Le modèle du domaine était incomplet.
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <BookOpen className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Complexité linguistique
                        </h3>
                        <p className="text-sm text-muted">
                          L’allemand et le français exigent un traitement distinct
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Les sinistres en allemand et en français ont exigé des vocabulaires et une logique de traitement distincts. Les mots composés allemands se comportent différemment de la terminologie française. Sans modélisation explicite, des classes entières de sinistres valides étaient rejetées.
                    </p>
                  </div>

                  {/* Document structure */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Target className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Structure des documents
                        </h3>
                        <p className="text-sm text-muted">
                          Les variations de mise en page provoquent des erreurs d’extraction
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Factures multicolonnes, sauts de page, lignes de facture dupliquées et différences de mise en page ont entraîné des montants manquants ou comptés deux fois lorsque la logique d’extraction ne tenait pas compte du format.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mt-6">
                  Ce sont des réalités opérationnelles ordinaires, pas des cas limites rares. Si un pilote n’a pas été soumis à ces conditions, la précision annoncée n’est que partiellement informative.
                </p>
              </MotionDiv>

              {/* The Three Metrics That Matter */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-three-metrics-that-matter"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Les trois indicateurs qui comptent
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Un chiffre de précision unique masque des arbitrages opérationnels. Trois indicateurs donnent une meilleure visibilité sur la maturité pour la production.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="denied" emphasis="light" size="sm">Taux de fausses approbations</StatusPill>
                    </div>
                    <p className="text-sm text-body mb-2">
                      Il mesure l’exposition financière. Une fausse approbation signifie qu’un sinistre a été payé à tort. Même un faible pourcentage peut peser sensiblement sur les surpaiements et l’exposition en audit.
                    </p>
                    <p className="text-xs text-subtle">
                      Ramener le taux de fausses approbations à un niveau acceptable a exigé une extension structurée du domaine, un affinage du vocabulaire et un calibrage des seuils.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="referred" emphasis="light" size="sm">Taux de faux refus</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Il mesure l’impact client et opérationnel. Les refus injustifiés entraînent réclamations, reprises, escalades et risque de réputation.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="progress" emphasis="light" size="sm">Taux de transmission pour examen</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      Il mesure la profondeur de l’automatisation. Si une grande part des sinistres est renvoyée à des réviseurs humains, le système n’a pas réduit la charge de travail de façon significative.
                    </p>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    Avant d’entamer des discussions sur la mise en production, demandez aux fournisseurs ces trois indicateurs, mesurés sur un jeu de test isolé correctement défini et ventilés par type de sinistre et par langue. S’ils ne peuvent pas fournir ce niveau de détail, le pilote n’a pas encore atteint la maturité opérationnelle.
                  </p>
                </div>
              </MotionDiv>

              {/* What Moves a Pilot Forward */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-moves-a-pilot-forward"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ce qui fait avancer un pilote
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Les progrès ne sont pas venus d’un remplacement de la technologie. Ils sont venus de cycles d’évaluation disciplinés.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Nous avons constitué un jeu de test isolé, stratifié par résultat, montant, langue et complexité structurelle. Un gestionnaire sinistres senior a annoté chaque sinistre. Ce jeu a été mis en quarantaine et jamais utilisé pour l’ajustement.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    La boucle d’itération
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Mesurer", "Diagnostiquer", "Corriger", "Retester"].map(
                      (step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center">
                            <span className="text-sm font-display font-semibold text-accent">
                              {i + 1}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-strong">
                            {step}
                          </span>
                          {i < 3 && (
                            <ArrowRight className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-body leading-[1.6]">
                    Chaque itération a suivi la même boucle. Une architecture hybride s’est avérée nécessaire. Des règles déterministes ont pris en charge les définitions de couverture claires et la logique structurée. Des modèles de langage ont pris en charge les descriptions ambiguës et l’interprétation contextuelle. Chaque composant a été cantonné au rôle qu’il remplit le mieux.
                  </p>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Des seuils de confiance conçus à dessein
                  </h3>
                  <p className="text-sm text-body leading-[1.6]">
                    Les seuils de confiance étaient asymétriques par conception. Les approbations exigeaient une confiance plus élevée que les refus. Les décisions à faible confiance étaient orientées vers une revue humaine pour se prémunir contre l’exposition financière.
                  </p>
                </div>

                {/* Results callout */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display font-semibold text-strong">
                      Résultats
                    </h3>
                  </div>
                  <p className="text-sm text-body">
                    La plus grande amélioration isolée est venue de l’extension des catégories de couverture, pas du changement de modèles. La modélisation du domaine et la discipline de mesure ont été les principaux moteurs de la stabilité.
                  </p>
                </div>
              </MotionDiv>

              {/* Operational Takeaway */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="operational-takeaway"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Conclusion opérationnelle
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  De nombreux pilotes d’IA sinistres s’enlisent parce qu’ils sont mesurés avec optimisme et développés par incréments sans évaluation structurée. Franchir le plateau des 70 à 80 % exige :
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Un jeu de test isolé correctement stratifié, issu de données de production réelles",
                    "Une séparation claire entre fausses approbations, faux refus et transmissions pour examen",
                    "Une modélisation explicite de la couverture sur toutes les catégories de polices",
                    "Un vocabulaire conçu par langue",
                    "Des seuils de confiance alignés sur le risque financier et opérationnel",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-body">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    L’automatisation des sinistres est viable. Elle exige une mesure honnête, des indicateurs clairs et une ingénierie délibérée du domaine.
                  </p>
                </div>

                <p className="mt-6 text-body leading-[1.6]">
                  Si vous évaluez un pilote ou préparez une mise en production et souhaitez confronter votre approche à un cadre de test isolé structuré, nous sommes disponibles pour partager la façon dont nous structurons l’évaluation et l’itération.
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
                    {[
                      "La précision sur le jeu de développement masque les écarts en production",
                      "Les jeux de test isolés révèlent la performance réelle",
                      "Suivre les fausses approbations, les faux refus et le taux de transmission pour examen",
                      "La modélisation du domaine apporte plus d’amélioration que les changements de modèle",
                      "Des seuils de confiance asymétriques protègent contre le risque financier",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body leading-[1.6]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
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
            <BarChart3 className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Prêt à dépasser le stade du pilote ?
            </h2>
            <p className="text-lg text-body mb-10">
              Nous pouvons vous aider à structurer des cadres d’évaluation qui transforment les pilotes en systèmes prêts pour la production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                Découvrir en action
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
