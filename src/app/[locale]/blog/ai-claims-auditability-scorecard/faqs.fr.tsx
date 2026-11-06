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
    question:
      "Quelles questions poser avant d’adopter l’IA dans la gestion des sinistres ?",
    answer:
      "Douze, en quatre groupes. Provenance : d’où vient chaque valeur, si une règle ou un modèle l’a produite et ce que fait le système quand les preuves sont incomplètes. Reconstruction : si une décision peut être reconstruite un an plus tard, si les versions qui l’ont produite figurent au dossier, qui peut modifier le dossier et combien de temps il est conservé. Jugement humain : ce que voit le réviseur, si les interventions humaines sont consignées et exploitées, et si toute décision peut être expliquée au demandeur à partir du seul dossier. Continuité : la performance sur des sinistres que le système n’a jamais vus, la portabilité des enregistrements à la sortie et où se situent le traitement des données et la responsabilité.",
  },
  {
    question:
      "Le report de l’AI Act européen à décembre 2027 change-t-il quelque chose pour la gestion des sinistres ?",
    answer:
      "Non. Le règlement (UE) 2026/1744 a reporté au 2 décembre 2027 la date à partir de laquelle la plupart des obligations « haut risque » s’appliquent aux systèmes autonomes listés à l’annexe III. La gestion des sinistres ne figure pas à l’annexe III, et les droits d’une personne faisant l’objet d’une décision exclusivement automatisée s’appliquent en vertu du RGPD depuis le 25 mai 2018. Le report change le calendrier pour d’autres systèmes. Il ne change rien à ce qu’une organisation sinistres doit aux personnes dont elle décide les sinistres.",
  },
  {
    question: "Qu’est-ce qui rend une décision d’IA sur un sinistre auditable ?",
    answer:
      "Quatre propriétés. Chaque valeur utilisée par la décision remonte à son document source et à sa page. La décision peut être reconstruite plus tard, parce que les règles, la version de la police et le modèle qui l’ont produite sont consignés sur la décision elle-même. Une personne ayant l’autorité de changer le résultat l’a examinée avec les preuves sous les yeux. Et le dossier est à altération détectable, exportable et conservé aussi longtemps que les obligations de l’organisation l’exigent.",
  },
  {
    question:
      "Une validation humaine suffit-elle à rendre défendable une décision automatisée sur un sinistre ?",
    answer:
      "Seulement si la revue est réelle. Le réviseur doit voir les preuves derrière la recommandation et détenir l’autorité et la compétence pour la modifier. Une validation que personne ne pourrait raisonnablement refuser laisse la décision exclusivement automatisée en substance, et en vertu du RGPD la personne concernée conserve les droits qui en découlent.",
  },
  {
    question: "Les décisions d’IA sur les sinistres peuvent-elles être déterministes ?",
    answer:
      "En grande partie, oui. Lorsqu’une police, un catalogue ou un référentiel de règles est converti en arbre de décision, le résultat est calculé à partir des faits, et les mêmes entrées produisent toujours la même décision. Des modèles sont nécessaires pour lire des preuves non structurées et trancher des éléments réellement ambigus, et un dossier bien conçu marque ces lignes comme probabilistes pour que les deux ne soient jamais confondus.",
  },
  {
    question: "Qu’un assureur suisse doit-il attendre d’un système d’IA sinistres ?",
    answer:
      "La communication FINMA sur la surveillance 08/2024 du 18 décembre 2024 expose ce que la surveillance a constaté en matière de gouvernance de l’IA, d’inventaires et de classification des risques, de qualité des données, de tests et de suivi continu, de documentation, d’explicabilité et de revue indépendante, et indique que la FINMA attend des établissements assujettis qui utilisent l’IA qu’ils alignent leur gouvernance, leur gestion des risques et leurs systèmes de contrôle en conséquence. En vertu de la circulaire FINMA 2018/3, un assureur qui externalise une fonction reste responsable envers la FINMA comme s’il l’exerçait lui-même. Un système doit donc pouvoir prouver chacun de ces points à partir de ses propres enregistrements.",
  },
];
