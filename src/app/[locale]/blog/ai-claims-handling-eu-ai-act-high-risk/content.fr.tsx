import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const annexRows: [string, string][] = [
  [
    "Examen des demandes d’assurance vie, où le système traite l’âge, l’état de santé, les antécédents familiaux, le mode de vie et la profession au regard de tables de mortalité pour orienter l’acceptation et les conditions",
    "Gestion des sinistres en assurance santé une fois l’événement assuré survenu : vérifier si une demande est valable au titre des conditions de la police ou déterminer le montant à payer",
  ],
  [
    "Prédiction du coût médical annuel attendu pour un groupe de risque, où le chiffre obtenu devient la prime facturée à ce groupe",
    "Gestion des sinistres utilisée pour améliorer l’exactitude du traitement et de la prise de décision, par exemple en validant les informations du demandeur auprès de bases de données externes",
  ],
  [
    "",
    "Conception de produits d’assurance vie, lorsqu’elle n’est pas utilisée pour l’évaluation des risques ou la tarification de cas individuels",
  ],
];

const regimeRows: [string, string, string][] = [
  [
    "AI Act européen, chapitre haut risque (annexe III)",
    "Évaluation des risques et tarification vie et santé. Pas la gestion des sinistres.",
    "Reporté au 2 décembre 2027 pour les systèmes autonomes ; 2 août 2028 pour l’IA intégrée à des produits réglementés",
  ],
  [
    "RGPD, article 22",
    "Décisions fondées exclusivement sur un traitement automatisé produisant des effets juridiques ou similairement significatifs, comme un sinistre refusé ou réduit",
    "25 mai 2018",
  ],
  [
    "Loi fédérale suisse révisée sur la protection des données",
    "Sa propre restriction des décisions individuelles automatisées, pour les opérations établies en Suisse",
    "En vigueur",
  ],
  [
    "UK GDPR",
    "L’équivalent de ces règles conservé par le Royaume-Uni",
    "En vigueur",
  ],
  [
    "Avis de l’EIOPA EIOPA-BoS-25-360",
    "Attentes de la surveillance pour l’IA en assurance qui n’est ni interdite ni à haut risque : gouvernance, explicabilité, tenue de registres",
    "6 août 2025",
  ],
];

const governanceStats: { value: string; label: string }[] = [
  {
    value: "61 %",
    label:
      "des dirigeants d’assurance disent que leur conseil a établi des politiques de gouvernance de l’IA.",
  },
  {
    value: "68 %",
    label:
      "disent que leurs contrôles de l’IA existent, mais que les preuves sont fragmentées entre équipes et outils.",
  },
  {
    value: "24 %",
    label:
      "sont très confiants de pouvoir réussir une revue indépendante de la gouvernance de l’IA sous 90 jours.",
  },
  {
    value: "44 %",
    label:
      "disent que des difficultés de gouvernance ou de conformité ont contribué à l’échec ou à la sous-performance de projets d’IA.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "La gestion des sinistres par IA est-elle à haut risque au sens de l’AI Act européen ?",
    a: "Non. L’annexe III ne mentionne pas la gestion des sinistres. Le point 5, c) ne couvre que l’évaluation des risques et la tarification en assurance vie et santé. Le projet de lignes directrices de la Commission sur la classification, du 19 mai 2026, cite la gestion des sinistres comme exemple de système sortant de ce point, même pour des produits d’assurance santé. Une activité de gestion de sinistres auto, habitation, garantie ou entreprises échappe au régime haut risque, tout en restant soumise au droit de la protection des données et au droit sectoriel de l’assurance.",
  },
  {
    q: "La gestion des sinistres par IA est-elle à haut risque en assurance santé ?",
    a: "Non. L’assurance santé est le test le plus exigeant de la règle, car la souscription dans cette branche est à haut risque. Le projet de lignes directrices de la Commission y place pourtant la gestion des sinistres hors du point 5, c), au motif que vérifier une demande au regard des conditions de la police ou déterminer le montant à payer est distinct de l’évaluation des risques ou de la tarification.",
  },
  {
    q: "Le report à décembre 2027 s’applique-t-il à la gestion des sinistres ?",
    a: "Il n’a aucun effet sur elle. L’omnibus numérique a reporté la date à laquelle les obligations haut risque commencent à s’appliquer. Il n’a pas modifié la liste des systèmes à haut risque. La gestion des sinistres n’en faisait pas partie, ni avant ni après le report.",
  },
  {
    q: "Qu’a changé le règlement (UE) 2026/1744 ?",
    a: "Il a reporté les obligations haut risque de l’AI Act. Les systèmes autonomes de l’annexe III passent du 2 août 2026 au 2 décembre 2027. L’IA intégrée à des produits réglementés passe du 2 août 2027 au 2 août 2028. Il a été publié le 24 juillet 2026 et est entré en vigueur le 27 juillet 2026.",
  },
  {
    q: "L’article 22 du RGPD s’applique-t-il à une décision automatisée sur un sinistre ?",
    a: "Oui, lorsque le RGPD est le régime applicable. L’article 22 restreint les décisions fondées exclusivement sur un traitement automatisé qui produisent des effets juridiques ou similairement significatifs. Un sinistre refusé ou réduit atteint ce seuil. Il s’applique depuis le 25 mai 2018 et n’a pas été touché par le report de l’AI Act. Les opérations hors UE relèvent de la disposition équivalente de leur propre régime, comme la loi fédérale suisse révisée sur la protection des données.",
  },
  {
    q: "Qu’est-ce qu’une intervention humaine significative ?",
    a: "Selon les lignes directrices du groupe de travail « Article 29 » (WP251rev.01), la revue doit être effectuée par une personne ayant l’autorité et la compétence de modifier la décision. Des employés qui avalisent machinalement des résultats générés automatiquement ne font pas sortir un responsable du traitement du champ de l’article 22.",
  },
  {
    q: "Que devez-vous divulguer sur la logique d’une décision automatisée ?",
    a: (
      <>
        Dans <em>Dun &amp; Bradstreet Austria</em> (C-203/22), la CJUE a exigé la procédure et les principes effectivement appliqués, communiqués de façon concise et intelligible, y compris la façon dont le résultat aurait différé si les données avaient été différentes. Fournir l’algorithme lui-même ne suffit pas à s’acquitter de l’obligation. Un secret d’affaires ne permet pas un refus général.
      </>
    ),
  },
];

// Short labels for the "Sur cette page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "is-ai-claims-handling-high-risk-under-the-eu-ai", heading: "La gestion des sinistres par IA est-elle à haut risque au sens de l’AI Act ?" },
  { id: "four-terms-that-decide-the-answer", heading: "Quatre termes qui décident de la réponse" },
  { id: "if-you-do-have-an-annex-iii-system-profiling-clo", heading: "Si vous avez un système de l’annexe III, le profilage ferme la sortie" },
  { id: "which-regime-actually-binds-a-european-claims-op", heading: "Quel régime encadre réellement une organisation sinistres européenne ?" },
  { id: "does-gdpr-article-22-apply-to-an-automated-claim", heading: "L’article 22 du RGPD s’applique-t-il à une décision automatisée sur un sinistre ?" },
  { id: "where-the-sector-supervisor-sits", heading: "Où se situe le superviseur sectoriel" },
  { id: "what-does-it-cost-to-be-unable-to-explain-a-deci", heading: "Que coûte l’incapacité d’expliquer une décision ?" },
  { id: "the-gap-that-will-actually-catch-carriers", heading: "L’écart qui piégera vraiment les assureurs" },
  { id: "why-the-2027-date-does-not-help", heading: "Pourquoi la date de 2027 n’aide pas" },
  { id: "the-test-worth-running-this-week", heading: "Le test à faire cette semaine" },
  { id: "key-takeaways", heading: "Points clés" },
  { id: "frequently-asked-questions", heading: "Questions fréquentes" },
  { id: "related-reading", heading: "Lectures associées" },
];

export default async function EUAIActClaimsBlogPost({ params }: { params: Promise<{ locale: string }> }) {
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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Tous les articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              La gestion des sinistres par IA n’est pas à haut risque au sens de l’AI Act européen. Voici ce qui l’encadre.
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              La gestion des sinistres est absente de l’annexe III. L’article 22 du RGPD l’encadre quand même. Seuls 24 % des assureurs disent pouvoir réussir une revue de gouvernance en 90 jours.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min de lecture
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Analyse réglementaire
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
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    La réponse courte
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          La gestion des sinistres n’est pas dans l’annexe III.
                        </strong>{" "}
                        Le projet de lignes directrices de la Commission sur la classification cite lui-même la gestion des sinistres comme exemple de système sortant du point 5, c), et il prend l’assurance santé, la seule branche où la souscription{" "}
                        <em>est</em> à haut risque, pour faire la démonstration.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Le report de l’omnibus numérique ne change rien pour une organisation sinistres.
                        </strong>{" "}
                        Le chapitre déplacé à décembre 2027 n’a jamais été celui qui vous régissait.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          C’est l’article 22 du RGPD qui encadre
                        </strong>
                        . Il s’applique depuis le 25 mai 2018. Un sinistre refusé ou réduit en relève pleinement. Les opérations suisses et britanniques relèvent de leurs propres équivalents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          L’EIOPA a déjà dit aux superviseurs ce qu’elle attend
                        </strong>
                         : des résultats explicables et des enregistrements reproductibles en vertu du droit sectoriel existant, à l’échelle de l’impact du système.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Le test, c’est la reconstruction.
                        </strong>{" "}
                        Si vous ne pouvez pas reconstruire une décision close à la demande, l’échéance manquée était 2018, pas 2027.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Le 24 juillet 2026, l’omnibus numérique sur l’IA a été publié au Journal officiel sous la forme du règlement (UE) 2026/1744. Il est entré en vigueur trois jours plus tard. Les obligations haut risque de l’AI Act (règlement européen sur l’IA) pour les systèmes autonomes de l’annexe III passent du 2 août 2026 au 2 décembre 2027. Pour l’IA intégrée à des produits réglementés, du 2 août 2027 au 2 août 2028.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Seize mois de plus, donc.
                </p>

                <p className="text-body leading-[1.6]">
                  Une organisation sinistres ne les a pas obtenus. Non parce que le report est étroit, mais parce que la gestion des sinistres n’a jamais figuré dans le chapitre qui a été déplacé.
                </p>
              </MotionDiv>

              {/* Is AI claims handling high-risk */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="is-ai-claims-handling-high-risk-under-the-eu-ai"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  La gestion des sinistres par IA est-elle à haut risque au sens de l’AI Act européen ?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Non. L’annexe III ne la mentionne pas.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Le point 5 de l’annexe III couvre l’accès aux services privés et publics essentiels. Il nomme quatre choses : l’évaluation de l’éligibilité aux prestations essentielles d’aide publique, lorsqu’elle est utilisée par ou pour le compte d’autorités publiques ; l’évaluation de la solvabilité ou l’établissement d’une note de crédit, à l’exclusion des systèmes de détection de la fraude financière ;{" "}
                  <strong className="text-strong">
                    l’évaluation des risques et la tarification en ce qui concerne les personnes physiques en matière d’assurance vie et d’assurance maladie
                  </strong>
                   ; et l’évaluation, la classification et la répartition des appels d’urgence.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’évaluation des risques et la tarification vie et santé sont dans le champ. La gestion des sinistres auto, habitation, garantie et entreprises ne l’est pas.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  La Commission le dit désormais elle-même. Son projet de lignes directrices sur la classification des systèmes d’IA à haut risque, publié le 19 mai 2026 et ouvert à consultation jusqu’au 23 juin, présente des exemples détaillés des deux côtés de la ligne.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Annexe III, point 5, c) : les exemples détaillés de la Commission
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Dans le point 5, c) : haut risque
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Hors du point 5, c)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {annexRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4">{row[0]}</td>
                            <td className="py-3">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Le raisonnement de la Commission pour l’exclusion mérite d’être lu dans ses propres termes :
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Ces cas d’usage sont distincts de la réalisation d’une évaluation des risques ou d’une tarification, même si leur résultat peut affecter le bénéfice de l’assurance santé.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Notez quelle branche cet exemple utilise. L’assurance santé est le seul endroit où la souscription <em>est</em>{" "}
                  à haut risque. La gestion des sinistres sort du cas d’usage même là. Les lignes directrices sont un projet et ne sont pas contraignantes. La Commission dit explicitement que l’interprétation qui fait autorité revient à la Cour de justice. Mais elles sont la déclaration officielle la plus claire disponible et elles vont dans le même sens.
                </p>

                <p className="text-body leading-[1.6]">
                  Voilà la réponse à la question. C’est aussi là que la plupart des lectures s’arrêtent et que commencent les deux choses qui décident réellement de votre exposition. Ce sont des questions différentes pour des systèmes différents. Les confondre, c’est ainsi que les plans de conformité déraillent.
                </p>
              </MotionDiv>

              {/* Four terms */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-terms-that-decide-the-answer"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quatre termes qui décident de la réponse
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 space-y-5">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Annexe III.</strong>{" "}
                    La liste des cas d’usage à haut risque du règlement (UE) 2024/1689. Un système n’est à haut risque par cette voie que s’il correspond à un cas d’usage de la liste. La proximité avec un cas d’usage listé n’en est pas l’appartenance.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Profilage.</strong>{" "}
                    Évaluation automatisée d’aspects personnels d’une personne physique : situation économique, santé, fiabilité, comportement. L’AI Act emprunte le terme au RGPD. Il pèse d’un poids décisif à l’article 6, paragraphe 3.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">
                      Une décision exclusivement automatisée.
                    </strong>{" "}
                    Au sens de l’article 22 du RGPD, une décision prise sans intervention humaine significative qui produit des effets juridiques ou similairement significatifs. Un humain qui ne peut pas, en pratique, renverser le résultat ne prend pas la décision conjointement.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">L’aptitude à l’audit.</strong>{" "}
                    La capacité de reconstruire une décision passée à partir des enregistrements que le système a produits à l’époque. Elle est distincte de la préparation à l’audit, exercice que l’on mène avant un examen.
                  </p>
                </div>
              </MotionDiv>

              {/* Profiling closes the exit */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="if-you-do-have-an-annex-iii-system-profiling-clo"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Si vous avez un système de l’annexe III, le profilage ferme la sortie
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Ceci s’applique à l’évaluation des risques et à la tarification vie et santé, pas à la gestion des sinistres. Si vous exploitez ces systèmes, lisez la suite. Sinon, passez à la section suivante, car l’article 6, paragraphe 3, n’a rien à vous dire.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Les assureurs relevant de l’annexe III prévoient généralement de s’en échapper par l’article 6, paragraphe 3, qui lève le statut haut risque lorsqu’un système « ne présente pas de risque important de préjudice pour la santé, la sécurité ou les droits fondamentaux des personnes physiques, y compris en n’ayant pas d’incidence significative sur le résultat de la prise de décision » et remplit l’une de quatre conditions : une tâche procédurale étroite, l’amélioration d’une activité humaine déjà achevée, la détection de schémas sans remplacer l’évaluation humaine ou une tâche préparatoire.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Une phrase annule les quatre :
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Nonobstant le premier alinéa, un système d’IA visé à l’annexe III est toujours considéré comme étant à haut risque lorsqu’il effectue un profilage de personnes physiques.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Un modèle de tarification vie ou santé qui segmente des individus selon leur situation économique, leur santé, leur fiabilité ou leur comportement est du profilage. La dérogation ne l’atteint pas.
                </p>

                <p className="text-body leading-[1.6]">
                  L’article 6, paragraphe 4, boucle ensuite la boucle. Un fournisseur qui estime qu’un système de l’annexe III n’est pas à haut risque doit documenter cette évaluation avant la mise sur le marché ou la mise en service, l’enregistrer malgré tout au titre de l’article 49, paragraphe 2, et produire la documentation aux autorités nationales compétentes sur demande. « Pas à haut risque » est un dépôt, pas une absence de paperasse.
                </p>
              </MotionDiv>

              {/* Which regime binds */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="which-regime-actually-binds-a-european-claims-op"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Quel régime encadre réellement une organisation sinistres européenne ?
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Ce qui atteint une organisation sinistres et à partir de quand
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Instrument
                          </th>
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Ce qu’il atteint
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            S’applique à partir du
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {regimeRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4 font-display font-medium text-strong">
                              {row[0]}
                            </td>
                            <td className="py-3 pr-4">{row[1]}</td>
                            <td className="py-3">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  Le schéma est celui qui piège les gens. L’instrument auquel tout le monde se prépare est celui qui ne les atteint pas. L’instrument qui les atteint est en vigueur depuis huit ans.
                </p>
              </MotionDiv>

              {/* Article 22 */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="does-gdpr-article-22-apply-to-an-automated-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’article 22 du RGPD s’applique-t-il à une décision automatisée sur un sinistre ?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Oui. Contrairement à l’AI Act, il s’applique depuis le 25 mai 2018.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Une réserve avant le détail. Le RGPD n’est pas le seul régime de protection des données dont peut relever une organisation sinistres européenne. L’instrument qui vous lie dépend de votre lieu d’établissement et des personnes dont vous traitez les données. Ce qui suit est l’analyse du RGPD. Lisez-la comme le schéma plutôt que comme la carte complète, et confirmez l’instrument qui régit votre propre portefeuille.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’article 22 restreint les décisions fondées exclusivement sur un traitement automatisé qui produisent des effets juridiques ou similairement significatifs. Un sinistre refusé ou réduit franchit ce seuil.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Trois sources définissent ce que cela exige désormais. Aucune n’a bougé en juillet.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Les scores automatisés peuvent être eux-mêmes des décisions.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Dans <em>OQ c. Land Hessen</em>, l’affaire SCHUFA (C-634/21, 7 décembre 2023), la CJUE a jugé que la génération automatisée d’une valeur de probabilité concernant la capacité d’une personne à honorer des engagements de paiement constitue elle-même une décision individuelle automatisée au sens de l’article 22, paragraphe 1, lorsqu’un tiers qui reçoit cette valeur s’y fonde fortement pour établir, exécuter ou résilier un contrat. L’obligation pèse sur la partie qui produit le score, pas seulement sur celle qui agit en fonction de lui.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Une validation n’est pas un contrôle.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Selon les lignes directrices du groupe de travail « Article 29 » sur la prise de décision automatisée (WP251rev.01), approuvées par le CEPD, l’intervention humaine n’échappe à l’article 22 que si elle est significative, exercée par une personne ayant l’autorité et la compétence de modifier la décision. Les lignes directrices indiquent directement que des employés qui avalisent machinalement des profils générés automatiquement ne feront pas sortir un responsable du traitement du champ de l’article 22.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Une explication a un standard défini.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Dans <em>Dun &amp; Bradstreet Austria</em> (C-203/22, 27 février 2025), la CJUE a précisé ce qu’exigent les « informations utiles concernant la logique sous-jacente » au titre de l’article 15, paragraphe 1, point h) : la procédure et les principes effectivement appliqués pour parvenir à la décision, communiqués de façon concise et intelligible. La Cour n’a pas exigé un récit causal de la façon dont les données d’un individu ont déterminé son résultat. Elle a indiqué au contraire qu’expliquer comment le résultat aurait différé si les données avaient été différentes peut satisfaire à l’obligation. Elle a aussi jugé que remettre l’algorithme ne s’en acquitte pas, car une formule mathématique complexe n’est ni concise ni intelligible. Elle a jugé enfin qu’un secret d’affaires ne permet pas un refus général : le responsable du traitement doit soumettre les informations litigieuses à l’autorité de contrôle ou à un tribunal pour mise en balance.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  C’est un standard comparatif, pas narratif. Y répondre exige de savoir ce que le système a réellement fait avec quelles entrées.
                </p>
              </MotionDiv>

              {/* EIOPA */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-the-sector-supervisor-sits"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Où se situe le superviseur sectoriel
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’
                  <em>avis de l’EIOPA sur la gouvernance et la gestion des risques de l’IA</em>{" "}
                  (EIOPA-BoS-25-360, 6 août 2025) s’adresse aux superviseurs nationaux et traite spécifiquement des systèmes d’IA en assurance qui ne sont ni interdits ni à haut risque au sens de l’AI Act. Il s’appuie sur la directive sur la distribution d’assurances, Solvabilité II, le règlement sur la résilience opérationnelle numérique et les règlements délégués Solvabilité II et DDA, pas sur l’AI Act.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Son propre cadrage est le point à retenir. Ces systèmes, dit-il, « continuent de fonctionner sous la législation sectorielle existante sans nouvelles exigences », les exceptions étant certaines obligations de transparence, la promotion de la maîtrise de l’IA par le personnel et des codes de conduite volontaires. L’EIOPA n’ajoute pas un régime. Elle dit aux superviseurs que celui déjà en vigueur s’applique.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Dans ce cadre, les entreprises devraient veiller à ce que les résultats des systèmes d’IA puissent être expliqués de façon utile et conserver des enregistrements appropriés des données d’entraînement et de test ainsi que des méthodologies de modélisation, afin de permettre la reproductibilité et la traçabilité. Les attentes sont proportionnées à l’impact : limitées pour les systèmes qui touchent à peine les clients, plus strictes pour ceux qui les touchent.
                </p>

                <p className="text-body leading-[1.6]">
                  La gestion des sinistres quitte donc le chapitre le plus lourd de l’AI Act et arrive, par une autre voie, à un ensemble d’attentes proportionné mais réel. L’obligation ne disparaît pas. Elle change d’adresse.
                </p>
              </MotionDiv>

              {/* Cost of not explaining */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-does-it-cost-to-be-unable-to-explain-a-deci"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Que coûte l’incapacité d’expliquer une décision ?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’autorité de protection des données de Hambourg a infligé à un prestataire de services financiers une amende de 492 000 EUR, rapportée le 30 septembre 2025. L’entreprise rejetait automatiquement des demandes de carte de crédit, y compris de demandeurs à la solvabilité manifestement bonne, sans contrôle humain. Le constat de l’autorité de contrôle n’était pas que le modèle avait tort. C’était que l’entreprise n’expliquait pas correctement la logique de ses décisions algorithmiques et ne donnait pas un accès suffisant au raisonnement sous-jacent quand on le lui demandait.
                </p>

                <p className="text-body leading-[1.6]">
                  L’autorité a expressément traité la coopération de l’entreprise comme une circonstance atténuante importante. C’était le prix réduit.
                </p>
              </MotionDiv>

              {/* The gap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-gap-that-will-actually-catch-carriers"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’écart qui piégera vraiment les assureurs
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  L’enquête AI Impact Survey 2026 de Grant Thornton, menée du 23 février au 18 mars 2026 auprès de 950 dirigeants dont 100 dans l’assurance, a constaté :
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {governanceStats.map((stat) => (
                    <div
                      key={stat.value}
                      className="bg-card shadow-card rounded-pill px-[29px] py-[27px]"
                    >
                      <div className="text-kpi text-accent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-body leading-[1.6]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  La propre lecture de Grant Thornton : « La plupart des assureurs ont déjà des politiques de gouvernance de l’IA, mais ils n’ont pas bâti l’infrastructure opérationnelle pour les prouver et les tester. »
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  La distance entre 61 et 24 est tout le problème. Cette même fragmentation est ce qui laisse les pilotes en deçà de la production, pour la même raison : elle est structurelle plutôt qu’un défaut de modélisation et elle se découvre tard. Nous avons traité ce schéma dans{" "}
                  <Link
                    href="/blog/why-claims-ai-pilots-stall"
                    className="text-link hover:underline"
                  >
                    pourquoi les pilotes d’IA sinistres s’enlisent avant d’être prêts pour la production
                  </Link>
                  .
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Une politique est une affirmation sur votre comportement. Une preuve démontre que vous l’avez eu. Les superviseurs examinent la seconde.
                  </p>
                </div>
              </MotionDiv>

              {/* Why 2027 does not help */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="why-the-2027-date-does-not-help"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Pourquoi la date de 2027 n’aide pas
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  La provenance au niveau du champ, des journaux de décision à altération détectable et des enregistrements de décision versionnés et reproductibles sont des propriétés architecturales. Elles se décident lors de la conception du pipeline et ne peuvent pas être ajoutées ensuite, car un journal écrit sans provenance ne peut pas en être enrichi plus tard. La décision qu’il consignait a disparu.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  C’est pourquoi l’aptitude à l’audit et la préparation à l’audit sont deux choses différentes. La préparation est un exercice mené avant un examen. L’aptitude est une propriété que le système a pendant qu’il fonctionne, ou qu’il n’a pas du tout. Une seule des deux répond à une question sur un sinistre clos l’an dernier.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Une explication est une opinion sur une décision. La provenance en est la preuve. <em>Dun &amp; Bradstreet</em> demande ce que le système aurait produit à partir d’autres entrées. Seule la seconde peut répondre. L’architecture que nous utilisons pour la produire est exposée dans{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link hover:underline"
                  >
                    auditabilité de l’IA sinistres : construire des chaînes de preuves que les auditeurs acceptent vraiment
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6]">
                  Il y a une conséquence de conception qu’il vaut la peine d’énoncer clairement. Plus une décision repose sur des règles déterministes plutôt que sur un modèle, moins il faut en expliquer sous un standard comparatif, parce que la règle <em>est</em> l’explication. Sur un programme européen de garantie automobile, nous appliquons les règles de couverture du client à chaque ligne de facture et limitons le modèle à la lecture des documents. C’est un choix architectural assorti d’un dividende de conformité, pas une mesure de conformité boulonnée après coup.
                </p>
              </MotionDiv>

              {/* The test */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-test-worth-running-this-week"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le test à faire cette semaine
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Prenez un sinistre clos de l’an dernier. Demandez à votre équipe de reconstruire la décision : chaque champ et sa provenance, quelle version du modèle a tourné, ce qu’un humain a changé et sur quelle base. Les douze questions à poser à ce dossier sont exposées dans{" "}
                  <Link
                    href="/blog/ai-claims-auditability-scorecard"
                    className="text-link hover:underline"
                  >
                    la grille d’évaluation de l’auditabilité de l’IA sinistres
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Si cela prend un clic, vous pouvez répondre à un superviseur sous n’importe lequel des régimes ci-dessus. La date de 2027 est une formalité.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Si cela prend un trimestre, vous avez trouvé la vraie échéance. Ce n’était pas le 2 décembre 2027. C’était le 25 mai 2018. Le report ne l’a pas déplacée.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Reconstruire une décision à la demande est ce pour quoi{" "}
                    <Link
                      href="/platform/claims-decisioning"
                      className="underline hover:no-underline"
                    >
                      Automated Coverage Check
                    </Link>{" "}
                    est conçu : compréhension agentique des documents en entrée, logique déterministe pour la décision et un enregistrement des deux.
                  </p>
                </div>
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
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          La gestion des sinistres n’est pas listée à l’annexe III.
                        </strong>{" "}
                        Seules l’évaluation des risques et la tarification vie et santé y figurent, au point 5, c). Le projet de lignes directrices de la Commission sur la classification, du 19 mai 2026, cite la gestion des sinistres comme exemple de système sortant de ce point, même en assurance santé.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Le report de l’omnibus numérique n’aide pas une organisation sinistres
                        </strong>
                        , parce que le chapitre déplacé n’a jamais été celui qui la régissait.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          L’article 22 du RGPD est la contrainte qui s’impose dans l’UE
                        </strong>
                        . Il s’applique depuis le 25 mai 2018. Un sinistre refusé ou réduit en relève pleinement. Les opérations suisses et britanniques relèvent de leurs propres équivalents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          La clause de profilage de l’article 6, paragraphe 3, est un piège pour les seuls systèmes vie et santé.
                        </strong>{" "}
                        Elle ne peut ni sauver ni condamner un système qui n’a jamais été dans l’annexe III.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Une politique n’est pas une preuve.
                        </strong>{" "}
                        61 % des assureurs ont des politiques de gouvernance de l’IA au niveau du conseil ; 24 % pensent pouvoir réussir une revue de gouvernance en 90 jours.
                      </span>
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="frequently-asked-questions"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Questions fréquentes
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
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
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Pourquoi les pilotes d’IA sinistres s’enlisent avant d’être prêts pour la production
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Les raisons structurelles pour lesquelles les pilotes n’atteignent pas la production.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Auditabilité de l’IA sinistres : construire des chaînes de preuves que les auditeurs acceptent vraiment
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      L’architecture derrière le test de reconstruction ci-dessus.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/case-studies/vehicle-warranty-claims"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Les mêmes décisions sur les sinistres, en une fraction du temps.
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Le programme de garantie automobile mentionné ci-dessus.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline">
                  Sources
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Règlement (UE) 2026/1744 (omnibus numérique sur l’IA), Journal officiel, 24 juillet 2026 ; en vigueur le 27 juillet 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Règlement (UE) 2024/1689 (règlement sur l’IA), annexe III, point 5 ; article 6, paragraphes 3 et 4 ; article 49, paragraphe 2.{" "}
                    <a
                      href="https://artificialintelligenceact.eu/annex/3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      artificialintelligenceact.eu
                    </a>
                  </li>
                  <li>
                    Commission européenne,{" "}
                    <em>
                      Projet de lignes directrices sur la classification des systèmes d’IA à haut risque
                    </em>{" "}
                    (volume annexe III), 19 mai 2026 ; consultation clôturée le 23 juin 2026 ; non contraignant.{" "}
                    <a
                      href="https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      digital-strategy.ec.europa.eu
                    </a>
                  </li>
                  <li>
                    CJUE, <em>OQ c. Land Hessen</em> (SCHUFA), C-634/21, 7 décembre 2023.
                  </li>
                  <li>
                    CJUE,{" "}
                    <em>
                      CK c. Magistrat der Stadt Wien / Dun &amp; Bradstreet Austria GmbH
                    </em>
                    , C-203/22, 27 février 2025.
                  </li>
                  <li>
                    Groupe de travail « Article 29 »,{" "}
                    <em>
                      Lignes directrices relatives à la prise de décision individuelle automatisée et au profilage
                    </em>
                    , WP251rev.01, approuvées par le CEPD.
                  </li>
                  <li>
                    EIOPA,{" "}
                    <em>
                      Avis sur la gouvernance et la gestion des risques de l’intelligence artificielle
                    </em>
                    , EIOPA-BoS-25-360, 6 août 2025.{" "}
                    <a
                      href="https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eiopa.europa.eu
                    </a>
                  </li>
                  <li>
                    Commissaire de Hambourg à la protection des données et à la liberté d’information, amende de 492 000 EUR, rapportée le 30 septembre 2025.
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, résultats assurance ; enquête menée du 23 février au 18 mars 2026, 950 dirigeants, dont 100 dans l’assurance.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Position réglementaire au 31 juillet 2026. Ceci ne constitue pas un avis juridique. Faites confirmer la classification et le calendrier de vos propres systèmes par un conseil qualifié.
                </p>
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
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Pouvez-vous reconstruire la décision de l’an dernier ?
            </h2>
            <p className="text-lg text-body mb-10">
              Nous construisons des systèmes sinistres où chaque décision peut être reconstruite à partir de l’enregistrement qu’elle a produit à l’époque.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/platform/claims-decisioning" variant="on-dark" size="lg">
                Automated Coverage Check
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
