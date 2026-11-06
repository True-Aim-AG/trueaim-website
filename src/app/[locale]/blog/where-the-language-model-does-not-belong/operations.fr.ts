/**
 * The three kinds of step inside a claim decision, in one place. `page.tsx`
 * renders them and `layout.tsx` publishes them as an ItemList in JSON-LD, so
 * the visible list and the machine-readable one are the same text.
 */
export type Operation = {
  name: string;
  description: string;
};

export const operations: Operation[] = [
  {
    name: "Lecture (des preuves aux faits)",
    description:
      "Transformer des preuves brutes en faits structurés. Les sinistres arrivent sous forme de photographies, de PDF, d’écriture manuscrite, d’e-mails et de texte libre. La lecture en extrait ce qu’ils disent (le numéro de police, la date du sinistre, la pièce réparée ou le montant facturé) et relie chaque valeur à son document source.",
  },
  {
    name: "Calcul (application des règles et des chiffres)",
    description:
      "Appliquer les règles écrites et les calculs à ces faits. La pièce est-elle couverte au titre du libellé ? Quelle franchise s’applique ? Le montant dépasse-t-il une limite ? Comment la responsabilité est-elle répartie ? Une fois les faits fixés, chacune de ces questions a une seule bonne réponse, fixée par la police, le catalogue ou le référentiel de règles.",
  },
  {
    name: "Jugement (résolution des points ouverts)",
    description:
      "Résoudre ce que le libellé écrit laisse ouvert. Une ligne de facture décrit une pièce avec des mots qu’aucune entrée de catalogue n’utilise. Ou une clause peut raisonnablement se lire de deux façons. Aucune règle ne tranche, donc quelqu’un (ou quelque chose) doit décider.",
  },
];
