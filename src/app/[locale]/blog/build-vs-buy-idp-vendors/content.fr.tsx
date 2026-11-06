import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Wrench,
  ShoppingCart,
  Scale,
  ClipboardList,
  Target,
} from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Sur cette page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-wrong-question", heading: "La mauvaise question" },
  { id: "when-to-build", heading: "Quand développer" },
  { id: "when-to-buy", heading: "Quand acheter" },
  { id: "the-vendor-evaluation-framework", heading: "Le cadre d’évaluation des fournisseurs" },
  { id: "the-demo-checklist", heading: "La liste de contrôle de la démo" },
  { id: "the-hybrid-path", heading: "La voie hybride" },
  { id: "next-steps", heading: "Prochaines étapes" },
  { id: "key-takeaways", heading: "Points clés" },
];

export default async function BuildVsBuyBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "12% 88%" }} />

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
              Développer ou acheter : ce qu’il faut exiger des fournisseurs d’IDP
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Un cadre d’évaluation pratique pour les équipes d’assurance qui évaluent des solutions d’automatisation des sinistres
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                15 min de lecture
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Guide stratégique
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
              {/* The Wrong Question */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-wrong-question"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La mauvaise question
                </h2>

                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    « Faut-il développer ou acheter notre IA sinistres ? »
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  C’est la mauvaise question. Les fournisseurs vous montreront des démos soignées. Vos développeurs promettront qu’ils peuvent « simplement utiliser GPT-4 ». Aucune des deux perspectives ne reflète la réalité.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La bonne question :{" "}
                  <strong className="text-strong">
                    Qu’est-ce qui doit être vrai pour que cela fonctionne en production, et qui peut réellement le rendre vrai ?
                  </strong>
                </p>

                <p className="text-body leading-[1.6]">
                  Dans notre déploiement chez NSA Services SA, True Aim est passé du premier test à un système opérationnel en sept jours et a réduit de 86 % le temps d’expert sur les sinistres complexes. Le cadre ci-dessous explique comment évaluer les fournisseurs d’IA sinistres sur des preuves plutôt que sur des démonstrations.
                </p>
              </MotionDiv>

              {/* When to Build */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Wrench className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="when-to-build"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Quand développer
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Développer est un investissement en capacités, pas une économie. Choisissez-le pour des raisons stratégiques, pas par crainte des fournisseurs.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Développer a du sens quand :
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Votre logique de police est réellement unique",
                        desc: "Si vos règles de couverture ne peuvent pas être configurées dans un produit du marché, vous vous battrez éternellement contre leur système.",
                      },
                      {
                        title:
                          "Vous avez des capacités en ingénierie ML, et savez les retenir",
                        desc: "Le départ d’un ingénieur ne doit pas paralyser votre système.",
                      },
                      {
                        title: "Le traitement des sinistres est votre avantage concurrentiel",
                        desc: "Certains assureurs se différencient par la rapidité de règlement des sinistres. La plupart, non.",
                      },
                      {
                        title: "Les exigences réglementaires imposent un contrôle total",
                        desc: "Localisation des données en Suisse et dans l’UE, pistes d’audit, explicabilité : certaines autorités de contrôle veulent tout en interne.",
                      },
                      {
                        title:
                          "Vous êtes prêt à attendre 12 à 18 mois avant la production",
                        desc: "C’est un calendrier réaliste pour un développement interne.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Build Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Pièges du développement à éviter :
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « On va simplement utiliser GPT-4. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          Vous atteindrez le même plafond de précision que tout le monde. Un modèle de langage généraliste n’appliquera pas vos conditions de la police de façon fiable sans un ensemble de règles défini.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « Nos développeurs vont trouver. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          Le domaine des sinistres est profond. Des mots composés allemands comme{" "}
                          <em>Abgasrückführungsventil</em> (vanne de recirculation des gaz d’échappement) exigent un vocabulaire automobile qui ne vient pas de Stack Overflow.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « Nous ne voulons pas de dépendance à un fournisseur. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          Vous l’échangerez contre une dépendance interne : envers les ingénieurs qui comprennent votre système sur mesure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Build */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Le coût réel du développement :
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>• 2 à 4 ingénieurs ML pendant plus de 12 mois</li>
                    <li>
                      • Du temps d’experts métier pour l’annotation et la validation (environ 20 heures-personne pour une vérité terrain de 50 sinistres)
                    </li>
                    <li>
                      • Une maintenance continue : les modèles dérivent, les formats de documents changent
                    </li>
                    <li>• Le coût d’opportunité de ne pas livrer plus tôt</li>
                  </ul>
                </div>
              </MotionDiv>

              {/* When to Buy */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="when-to-buy"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Quand acheter
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Acheter est un arbitrage en faveur du délai de mise sur le marché. Choisissez-le parce que vous valorisez le temps, pas parce que vous pensez que c’est « plus facile ».
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Acheter a du sens quand :
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Vous avez besoin de résultats en production en 3 à 6 mois",
                        desc: "Les fournisseurs ont résolu des problèmes que vous n’avez pas encore rencontrés.",
                      },
                      {
                        title:
                          "Vous n’avez pas (ou ne voulez pas construire) de capacité ML",
                        desc: "Recruter et retenir des ingénieurs ML est difficile.",
                      },
                      {
                        title: "Vos types de sinistres sont relativement standards",
                        desc: "Auto, habitation, santé : les fournisseurs ont déjà vu cela.",
                      },
                      {
                        title:
                          "Vous voulez une DSI concentrée sur l’intégration, pas sur la construction de modèles",
                        desc: "Votre avantage concurrentiel ne se situe probablement pas dans la recherche en IA.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Pièges de l’achat à éviter :
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « Ils ont fait une excellente démo. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          Les données de démo sont sélectionnées. Notre système était impeccable sur des documents allemands jusqu’à ce que nous traitions des sinistres français. Les 25 sinistres acceptés ont tous été rejetés à tort.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « Ils annoncent 99 % de précision. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          Demandez : précision sur quoi ? Leur jeu de test ou vos documents ? Précision des décisions ≠ précision métier.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          « C’est du plug and play. »
                        </span>
                        <p className="text-sm text-body mt-1">
                          L’intégration est toujours plus difficile que promis. Les formats de documents varient. Les noms de champs diffèrent. Votre structure de polices a ses particularités.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Buy */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    Le coût réel de l’achat :
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>
                      • Frais de licence (par sinistre, par document ou par plateforme)
                    </li>
                    <li>
                      • Effort d’intégration (généralement 3 à 6 mois, pas 3 à 6 semaines)
                    </li>
                    <li>• Réglage continu (vous devrez encore ajuster)</li>
                    <li>
                      • Dépendance au fournisseur (et s’il pivote, échoue ou se fait racheter ?)
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* Vendor Evaluation Framework */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-vendor-evaluation-framework"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    Le cadre d’évaluation des fournisseurs
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Une approche systématique pour comparer les fournisseurs. Pondérez les catégories selon vos priorités.
                </p>

                {/* Category 1: Accuracy */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Catégorie 1 : précision et évaluation
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Pondération 30 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Ce que vous recherchez
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quelle est votre précision sur jeu de test isolé ?
                          </td>
                          <td className="py-2">
                            Un % précis, une méthodologie expliquée
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quel est votre taux de fausses approbations ?
                          </td>
                          <td className="py-2">Suivi séparément, inférieur à 5 %</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Pouvez-vous montrer les catégories d’erreurs ?
                          </td>
                          <td className="py-2">
                            Une taxonomie existe, l’amélioration est suivie
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Combien d’itérations pour atteindre la précision actuelle ?
                          </td>
                          <td className="py-2">Révèle la discipline, pas la chance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    <strong className="text-denied-dark">Signaux d’alerte :</strong>{" "}
                    « Notre précision est de 99 % » sans explication de la méthodologie de test. Nous avons suivi 14 modes de défaillance distincts dans l’appariement, l’extraction, la logique de couverture et le calcul.
                  </p>
                </div>

                {/* Category 2: Auditability */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Catégorie 2 : auditabilité
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Pondération 25 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Ce que vous recherchez
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Puis-je retracer n’importe quel champ jusqu’à son document source ?
                          </td>
                          <td className="py-2">Au niveau de la page et du caractère</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Journalisez-vous la version du modèle et la confiance ?
                          </td>
                          <td className="py-2">Piste d’audit complète</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Pouvez-vous reproduire une décision vieille de six mois ?
                          </td>
                          <td className="py-2">Reproductibilité totale</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Comment capturez-vous les interventions humaines ?
                          </td>
                          <td className="py-2">Avec justification obligatoire</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Pour les processus réglementés en Suisse et dans l’UE, l’auditabilité n’est pas négociable.
                  </p>
                </div>

                {/* Category 3: Architecture */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Catégorie 3 : architecture
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      Pondération 20 %
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            Ce que vous recherchez
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quelle part est déterministe, quelle part est du ML ?
                          </td>
                          <td className="py-2">
                            Plus de déterminisme = moins de risque
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Quels sont vos seuils de confiance ?
                          </td>
                          <td className="py-2">Asymétriques, configurables</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Comment détectez-vous les décalages de distribution ?
                          </td>
                          <td className="py-2">Une surveillance est en place</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            Quel est votre flux de travail avec intervention humaine ?
                          </td>
                          <td className="py-2">Console QA complète</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Notre architecture : 57 % des éléments sont traités par des règles déterministes (coût LLM nul). Plus la part déterministe est élevée, plus le coût baisse et plus l’explicabilité augmente.
                  </p>
                </div>

                {/* Categories 4 & 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Coûts et exploitation
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        15 %
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Détail du coût par sinistre</li>
                      <li>• Limites de tokens, coupe-circuits</li>
                      <li>• Latences P50, P95, P99</li>
                      <li>• Traitement en langue native</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Risque et sécurité
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        10 %
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Modes de défaillance documentés</li>
                      <li>• Tests de régression automatisés</li>
                      <li>• Repli contrôlé vers l’humain</li>
                      <li>• Localisation des données UE/Suisse</li>
                    </ul>
                  </div>
                </div>
              </MotionDiv>

              {/* Demo Checklist */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Target className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-demo-checklist"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    La liste de contrôle de la démo
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Ce qu’il faut exiger quand les fournisseurs présentent.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Avant la démo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Envoyez 10 à 20 de VOS sinistres</li>
                      <li>• Incluez des cas limites : multilingues, scans de mauvaise qualité</li>
                      <li>• Définissez les critères de succès à l’avance</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Pendant la démo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Faites tourner le système sur VOS documents</li>
                      <li>• Demandez à voir un échec</li>
                      <li>• Remontez jusqu’à la provenance d’un champ</li>
                      <li>• Demandez les scores de confiance</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Après la démo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Comparez la précision annoncée et la précision réelle</li>
                      <li>• Comptez les réponses du type « on ajustera ça »</li>
                      <li>• Évaluez : votre équipe pourrait-elle l’utiliser au quotidien ?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-3">
                    Le test de résistance en 5 minutes
                  </h3>
                  <p className="text-sm text-body">
                    Prenez votre sinistre le plus étrange. Un mot composé allemand comme{" "}
                    <em>Zylinderkopfdichtung</em> (joint de culasse) avec un format de facture français et une décision de couverture limite. S’ils ne peuvent pas le traiter en direct, leurs « 99 % de précision » ne s’appliquent pas à votre réalité.
                  </p>
                </div>
              </MotionDiv>

              {/* The Hybrid Path */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Building className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2
                    id="the-hybrid-path"
                    className="font-display text-[28px] md:text-[32px] font-bold text-strong scroll-mt-24"
                  >
                    La voie hybride
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Envisagez la voie du milieu. Développez une partie, achetez le reste.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Acheter
                      </h3>
                      <p className="text-sm text-body">
                        Extraction de documents, OCR, classification : les fournisseurs sont bons en compréhension générique de documents
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Développer
                      </h3>
                      <p className="text-sm text-body">
                        Règles métier propres à vos polices, logique de couverture : vous êtes meilleur dans votre domaine spécifique
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Garder la maîtrise
                      </h3>
                      <p className="text-sm text-body">
                        Cadre d’évaluation, vérité terrain, suivi de la qualité. Gardez le contrôle de la couche de décision
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Pourquoi cela fonctionne :</strong>{" "}
                    Les fournisseurs gèrent les briques standard. Vous gérez les briques différenciantes. Vous pouvez changer de fournisseur sans réécrire vos règles. Vous gardez le contrôle d’audit sur les décisions finales.
                  </p>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="next-steps"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Prochaines étapes
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      num: "1",
                      title: "Distinguer l’indispensable du souhaitable",
                      desc: "L’auditabilité n’est pas négociable. Le réglage automatique, si.",
                    },
                    {
                      num: "2",
                      title: "Préparer votre jeu de sinistres de démo",
                      desc: "Vingt sinistres, y compris vos cas limites et vos documents multilingues.",
                    },
                    {
                      num: "3",
                      title: "Construire votre grille d’évaluation avant le premier appel fournisseur",
                      desc: "Ne laissez pas les démos ancrer vos critères d’évaluation.",
                    },
                    {
                      num: "4",
                      title: "Décider : que voulez-vous maîtriser sur le long terme ?",
                      desc: "La couche de décision ? La couche d’extraction ? Toute la pile ?",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          {step.title}
                        </h3>
                        <p className="text-sm text-body">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    L’objectif n’est pas d’éviter les fournisseurs ni d’éviter de développer. C’est de prendre une décision éclairée en fonction de votre situation, de votre calendrier et de vos capacités.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  True Aim AG construit des systèmes d’IA auditables pour les marchés réglementés suisses et européens. Ce cadre reflète notre expérience de déploiement.
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
                      "Développer pour une capacité stratégique, pas pour des économies",
                      "Acheter pour la rapidité de mise sur le marché, pas pour la simplicité",
                      "Un cadre d’évaluation des fournisseurs en 5 catégories",
                      "Liste de contrôle de démo : avant, pendant, après",
                      "La voie hybride : acheter le standard, développer la différenciation",
                      "L’auditabilité n’est pas négociable",
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
            <Scale className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Vous évaluez des fournisseurs d’IA sinistres ?
            </h2>
            <p className="text-lg text-body mb-10">
              Nous pouvons vous aider à construire un cadre d’évaluation adapté à vos exigences et à mener des comparaisons objectives de fournisseurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/blog/auditability-evidence-chains" variant="on-dark" size="lg">
                Lire : l’auditabilité
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
