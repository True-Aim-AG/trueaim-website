/**
 * The FAQ, in one place. `page.tsx` renders `answer` and `layout.tsx`
 * publishes it as FAQPage JSON-LD, so the visible answers and the
 * machine-readable ones are the same text.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Pourquoi l’automatisation des sinistres n’a-t-elle pas supprimé les délais entre entreprises ?",
    answer:
      "L’automatisation traditionnelle opère à l’intérieur de vos propres murs. Elle accélère le poste interne, mais la friction migre simplement vers les passages de relais entre organisations. Un assureur peut analyser une déclaration de sinistre en quatre secondes, et pourtant les gestionnaires perdent encore quarante-huit heures à courir après un devis PDF d’un réparateur externe. Tant que cette taxe de navigation inter-entreprises n’est pas éliminée, la chaîne reste lente.",
  },
  {
    question: "Un dossier partagé signifie-t-il que chaque partie voit tout ?",
    answer:
      "Non. Chaque participant opère strictement dans le cadre de son habilitation définie. L’assureur configure les règles d’accès une fois, et des barrières informationnelles les appliquent sur tout le réseau. Les assurés suivent la vérification des documents, les intermédiaires surveillent les limites de délégation et les prestataires reçoivent des validations ligne par ligne. Chaque partie travaille à partir de la même vérité sous-jacente sans exposer de données confidentielles.",
  },
  {
    question: 'Que signifie « provenance au niveau de la ligne » en pratique ?',
    answer:
      "Cela signifie un caractère défendable dès la conception. Pour chaque décision, le système écrit quatre primitives dans le dossier : les faits et documents source, le libellé de police en vigueur, le raisonnement en langage clair et l’acteur responsable (humain ou IA). Si un gestionnaire passe outre une recommandation, la justification est conservée. Pas une boîte noire, mais une boîte de verre.",
  },
  {
    question: "Les assureurs doivent-ils remplacer leurs systèmes cœur de sinistres ?",
    answer:
      "Non. Les remplacements de plateforme sur plusieurs années sont trop lents et comportent un risque de livraison inacceptable. Un système d’exploitation agentique orchestre au-dessus de vos systèmes de référence existants via des API standard. Vous pouvez commencer par un seul module à forte friction, comme la comparaison des prix de réparation ou la vérification de couverture, et étendre à mesure que le dossier prouve sa valeur.",
  },
  {
    question: "L’objectif est-il de réduire les effectifs sinistres ?",
    answer:
      "Le principe de conception est l’élévation de l’humain, pas la réduction de la main-d’œuvre. Supprimer l’administration à faible rendement (la lecture, la ressaisie et les relances téléphoniques) rend des heures à vos spécialistes. Les gestionnaires récupèrent leur temps pour les décisions à fort enjeu : résoudre les cas limites complexes, accompagner des assurés en détresse et affiner les règles de souscription.",
  },
  {
    question: "Quel est le point de départ le plus pratique ?",
    answer:
      "Un pilote à périmètre limité. Placez un réseau de partenaires et une branche d’activité sur un dossier partagé. Sur quatre-vingt-dix jours, mesurez les vrais signaux : moins de demandes de statut, un traitement plus rapide des factures et une baisse mesurable des règlements contestés.",
  },
];
