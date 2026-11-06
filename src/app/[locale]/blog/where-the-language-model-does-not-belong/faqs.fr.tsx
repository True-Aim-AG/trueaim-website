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
    question: "Un modèle de langage doit-il calculer le montant d’un sinistre ?",
    answer:
      "Non. Franchises, limites et partages de responsabilité ont une seule bonne réponse une fois les faits fixés. Ils relèvent de règles déterministes.",
  },
  {
    question: 'Que signifie « probabiliste » sur un dossier sinistre ?',
    answer:
      "Que l’étape a été résolue par la réponse la plus probable d’un modèle plutôt que par une règle fixe, et qu’elle peut donc ne pas se répéter exactement. Le marquage montre au réviseur où le jugement est intervenu.",
  },
  {
    question: "Les règles peuvent-elles traiter chaque sinistre ?",
    answer:
      "Pas seules. Elles ne sont pas conçues pour cela. Lorsque des preuves manquent, le système les demande. Lorsque le libellé est ambigu, un modèle apparie l’élément sous une étiquette probabiliste. Lorsqu’un sinistre franchit un seuil, un gestionnaire l’examine avec tous les faits, clauses et hypothèses sous les yeux.",
  },
  {
    question: "Comment vérifier qu’un système respecte la frontière ?",
    answer:
      "Prenez un sinistre clos et demandez au système de montrer, étape par étape, si elle a été lue, calculée ou jugée. S’il ne peut pas, la frontière n’est pas dans le dossier.",
  },
];
