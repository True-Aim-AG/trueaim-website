import type { FaqItem } from "@/components/content/schema";

/**
 * The FAQ as plain text, published as FAQPage JSON-LD. page.tsx renders its own
 * copy of these answers with links; both move into one source with the content
 * layer (chunk 9).
 */
export const faqs: FaqItem[] = [
  {
    question: "La gestion des sinistres par IA est-elle à haut risque au sens de l’AI Act européen ?",
    answer:
      "Non. L’annexe III ne mentionne pas la gestion des sinistres. Le point 5, c) ne couvre que l’évaluation des risques et la tarification en assurance vie et santé. Le projet de lignes directrices de la Commission sur la classification, du 19 mai 2026, cite la gestion des sinistres comme exemple de système sortant de ce point, même pour des produits d’assurance santé. Une activité de gestion de sinistres auto, habitation, garantie ou entreprises échappe au régime haut risque, tout en restant soumise au droit de la protection des données et au droit sectoriel de l’assurance.",
  },
  {
    question: "La gestion des sinistres par IA est-elle à haut risque en assurance santé ?",
    answer:
      "Non. L’assurance santé est le test le plus exigeant de la règle, car la souscription dans cette branche est à haut risque. Le projet de lignes directrices de la Commission y place pourtant la gestion des sinistres hors du point 5, c), au motif que vérifier une demande au regard des conditions de la police ou déterminer le montant à payer est distinct de l’évaluation des risques ou de la tarification.",
  },
  {
    question: "Le report à décembre 2027 s’applique-t-il à la gestion des sinistres ?",
    answer:
      "Il n’a aucun effet sur elle. L’omnibus numérique a reporté la date à laquelle les obligations haut risque commencent à s’appliquer. Il n’a pas modifié la liste des systèmes à haut risque. La gestion des sinistres n’en faisait pas partie, ni avant ni après le report.",
  },
  {
    question: "Qu’a changé le règlement (UE) 2026/1744 ?",
    answer:
      "Il a reporté les obligations haut risque de l’AI Act. Les systèmes autonomes de l’annexe III passent du 2 août 2026 au 2 décembre 2027. L’IA intégrée à des produits réglementés passe du 2 août 2027 au 2 août 2028. Il a été publié le 24 juillet 2026 et est entré en vigueur le 27 juillet 2026.",
  },
  {
    question: "L’article 22 du RGPD s’applique-t-il à une décision automatisée sur un sinistre ?",
    answer:
      "Oui, lorsque le RGPD est le régime applicable. L’article 22 restreint les décisions fondées exclusivement sur un traitement automatisé qui produisent des effets juridiques ou similairement significatifs. Un sinistre refusé ou réduit atteint ce seuil. Il s’applique depuis le 25 mai 2018 et n’a pas été touché par le report de l’AI Act. Les opérations hors UE relèvent de la disposition équivalente de leur propre régime, comme la loi fédérale suisse révisée sur la protection des données.",
  },
  {
    question: "Qu’est-ce qu’une intervention humaine significative ?",
    answer:
      "Selon les lignes directrices du groupe de travail « Article 29 » (WP251rev.01), la revue doit être effectuée par une personne ayant l’autorité et la compétence de modifier la décision. Des employés qui avalisent machinalement des résultats générés automatiquement ne font pas sortir un responsable du traitement du champ de l’article 22.",
  },
  {
    question: "Que devez-vous divulguer sur la logique d’une décision automatisée ?",
    answer:
      "Dans Dun & Bradstreet Austria (C-203/22), la CJUE a exigé la procédure et les principes effectivement appliqués, communiqués de façon concise et intelligible, y compris la façon dont le résultat aurait différé si les données avaient été différentes. Fournir l’algorithme lui-même ne suffit pas à s’acquitter de l’obligation. Un secret d’affaires ne permet pas un refus général.",
  },
];
