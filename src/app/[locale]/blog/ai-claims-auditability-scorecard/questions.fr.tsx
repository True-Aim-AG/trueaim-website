import type { ReactNode } from "react";

/**
 * The twelve scorecard questions, in one place.
 *
 * `page.tsx` renders `body`; `layout.tsx` publishes `question` and
 * `plainAnswer` as an ItemList in JSON-LD. Keeping both readings in the same
 * array is what stops the visible checklist and the machine-readable one from
 * drifting apart. Each answer sets out the standard, then how True Aim meets
 * it.
 */
export type ScorecardQuestion = {
  group: "Provenance" | "Reconstruction" | "Human judgement" | "Continuity";
  question: string;
  /** Plain-text guidance, for structured data. */
  plainAnswer: string;
  /** The same guidance with the article's emphasis, for the page. */
  body: ReactNode;
};

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    group: "Provenance",
    question:
      "Pour tout sinistre clos, pouvez-vous retracer chaque valeur utilisée par la décision jusqu’au document et à la page dont elle provient ?",
    plainAnswer:
      "La norme est un dossier dans lequel chaque valeur sur laquelle la décision s’est appuyée pointe vers sa source : le montant réclamé vers la ligne de facture, la date du sinistre vers le rapport, la position de couverture vers la clause. Affirmer que le système avait accès à tous les documents décrit une entrée. Cela ne décrit pas un dossier. True Aim trace une ligne visuelle de chaque donnée jusqu’à l’endroit exact du document source dont elle provient, de sorte qu’un gestionnaire valide au lieu de réenquêter. Les valeurs extraites portent cette provenance jusqu’à la page et à la zone de texte, et nous mesurons quelle part de chaque sinistre la porte au lieu de supposer qu’elle est complète.",
    body: (
      <>
        <p>
          La norme est un dossier dans lequel chaque valeur sur laquelle la décision s’est appuyée pointe vers sa source : le montant réclamé vers la ligne de facture, la date du sinistre vers le rapport, la position de couverture vers la clause. Affirmer que le système avait accès à tous les documents décrit une entrée. Cela ne décrit pas un dossier.
        </p>
        <p>
          True Aim trace une ligne visuelle de chaque donnée jusqu’à l’endroit exact du document source dont elle provient, de sorte qu’un gestionnaire valide au lieu de réenquêter. Les valeurs extraites portent cette provenance jusqu’à la page et à la zone de texte, et nous mesurons quelle part de chaque sinistre la porte au lieu de supposer qu’elle est complète.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Quelles parties de la décision ont été calculées par des règles et lesquelles produites par un modèle, et le dossier montre-t-il la différence ?",
    plainAnswer:
      "Plus la part d’une décision qui repose sur une logique déterministe est grande, moins il reste à expliquer ensuite, parce que la règle est l’explication. La norme est un dossier qui montre, ligne par ligne, quelles parties ont été calculées à partir du libellé et lesquelles ont été produites par un modèle, de sorte que le jugement ne soit jamais pris pour de l’arithmétique. True Aim convertit une police, un catalogue ou un référentiel de règles en arbre de décision. Là où les règles couvrent les faits, le résultat est calculé, pas prédit, et les mêmes entrées produisent toujours la même décision. Des agents lisent les preuves non structurées, les photographies, PDF, écritures manuscrites, e-mails et textes libres, et les transforment en faits structurés dont le moteur a besoin. Chaque agent accomplit une tâche étroite, de sorte que lorsqu’une erreur survient, on voit immédiatement où, et elle est corrigée à cet endroit. Lorsqu’un élément est réellement ambigu et qu’aucune règle ne le tranche, un modèle fait l’appariement et le dossier marque cette ligne comme probabiliste.",
    body: (
      <>
        <p>
          Plus la part d’une décision qui repose sur une logique déterministe est grande, moins il reste à expliquer ensuite, parce que la règle <em>est</em>{" "}
          l’explication. La norme est un dossier qui montre, ligne par ligne, quelles parties ont été calculées à partir du libellé et lesquelles ont été produites par un modèle, de sorte que le jugement ne soit jamais pris pour de l’arithmétique.
        </p>
        <p>
          True Aim convertit une police, un catalogue ou un référentiel de règles en arbre de décision. Là où les règles couvrent les faits, le résultat est calculé, pas prédit, et les mêmes entrées produisent toujours la même décision. Des agents lisent les preuves non structurées, les photographies, PDF, écritures manuscrites, e-mails et textes libres, et les transforment en faits structurés dont le moteur a besoin. Chaque agent accomplit une tâche étroite, de sorte que lorsqu’une erreur survient, on voit immédiatement où, et elle est corrigée à cet endroit. Lorsqu’un élément est réellement ambigu et qu’aucune règle ne le tranche, un modèle fait l’appariement et le dossier marque cette ligne comme probabiliste.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Que se passe-t-il lorsque les preuves sont incomplètes ou ambiguës, et qui a décidé de ce comportement ?",
    plainAnswer:
      "L’incertitude n’est pas un état d’échec. C’est une décision d’orientation, et elle appartient à l’organisation sinistres, pas au logiciel. La norme est un comportement défini que l’organisation contrôle : orienter vers un gestionnaire, mettre le sinistre en attente, demander le document manquant. Un score de confiance sans conséquence attachée est un chiffre, pas un contrôle. Chez True Aim, les seuils, les règles d’orientation, les limites de traitement automatique de bout en bout et les tolérances sont configurés par le client. Un sinistre n’est décidé automatiquement que lorsque le montant, l’écart et la confiance passent tous les tests que le client a fixés. Ce que les preuves confirment est séparé de ce que seule une personne peut confirmer, de sorte que le temps des gestionnaires est consacré là où il change la réponse.",
    body: (
      <>
        <p>
          L’incertitude n’est pas un état d’échec. C’est une décision d’orientation, et elle appartient à l’organisation sinistres, pas au logiciel. La norme est un comportement défini que l’organisation contrôle : orienter vers un gestionnaire, mettre le sinistre en attente, demander le document manquant. Un score de confiance sans conséquence attachée est un chiffre, pas un contrôle.
        </p>
        <p>
          Chez True Aim, les seuils, les règles d’orientation, les limites de traitement automatique de bout en bout et les tolérances sont configurés par le client. Un sinistre n’est décidé automatiquement que lorsque le montant, l’écart et la confiance passent tous les tests que le client a fixés. Ce que les preuves confirment est séparé de ce que seule une personne peut confirmer, de sorte que le temps des gestionnaires est consacré là où il change la réponse.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Pour le même sinistre et les mêmes documents un an plus tard, la décision serait-elle identique, et pourriez-vous le prouver ?",
    plainAnswer:
      "La norme est un oui pour chaque partie déterministe de la décision, avec la réexécution pour le prouver, et un compte rendu exact des parties qui étaient probabilistes et ne sont donc reproductibles que sous la version du modèle et les réglages qui les ont produites. Un système qui ne peut pas reproduire sa propre sortie ne peut pas la défendre. True Aim peut revalider ou réexécuter une chaîne de décision à la demande. Les résultats fondés sur des règles se reproduisent par construction. Pour chaque appel de modèle, le dossier conserve le modèle, le gabarit de prompt, le moteur, la température, la graine, le réglage de déterminisme et la confiance, de sorte qu’une étape probabiliste peut être examinée dans les conditions qui l’ont produite.",
    body: (
      <>
        <p>
          La norme est un oui pour chaque partie déterministe de la décision, avec la réexécution pour le prouver, et un compte rendu exact des parties qui étaient probabilistes et ne sont donc reproductibles que sous la version du modèle et les réglages qui les ont produites. Un système qui ne peut pas reproduire sa propre sortie ne peut pas la défendre.
        </p>
        <p>
          True Aim peut revalider ou réexécuter une chaîne de décision à la demande. Les résultats fondés sur des règles se reproduisent par construction. Pour chaque appel de modèle, le dossier conserve le modèle, le gabarit de prompt, le moteur, la température, la graine, le réglage de déterminisme et la confiance, de sorte qu’une étape probabiliste peut être examinée dans les conditions qui l’ont produite.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Le libellé de la police, les règles et le modèle qui ont produit une décision sont-ils consignés sur la décision elle-même, dans la version en vigueur ?",
    plainAnswer:
      "Sur le dossier lui-même, pas dans une note de version. Un historique des versions tenu ailleurs est un autre document sur un autre jour. La norme est une décision qui nomme la clause, l’entrée de catalogue ou la règle métier appliquée, dans la version en vigueur à ce moment-là, ainsi que le modèle et le prompt qui y ont participé. True Aim écrit chaque action, d’une personne ou d’une machine, dans le dossier avec le modèle, le prompt, la version de la règle et la confiance attachés, et consigne quelle version du libellé, du catalogue ou de la règle métier était en vigueur au moment de la décision. Les décisions sont jugées au regard des règles qui s’appliquaient réellement.",
    body: (
      <>
        <p>
          Sur le dossier lui-même, pas dans une note de version. Un historique des versions tenu ailleurs est un autre document sur un autre jour. La norme est une décision qui nomme la clause, l’entrée de catalogue ou la règle métier appliquée, dans la version en vigueur à ce moment-là, ainsi que le modèle et le prompt qui y ont participé.
        </p>
        <p>
          True Aim écrit chaque action, d’une personne ou d’une machine, dans le dossier avec le modèle, le prompt, la version de la règle et la confiance attachés, et consigne quelle version du libellé, du catalogue ou de la règle métier était en vigueur au moment de la décision. Les décisions sont jugées au regard des règles qui s’appliquaient réellement.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Qui peut modifier un dossier de décision, comment le sauriez-vous, et combien de temps le dossier est-il conservé ?",
    plainAnswer:
      "Un dossier qui peut être modifié sans trace est un brouillon. La norme est un dossier dont toute altération est détectable et une durée de conservation fixée délibérément pour correspondre aux obligations propres de l’organisation, qui dépassent généralement le sinistre de plusieurs années. Le sinistre sur lequel on vous interroge est souvent plus ancien que le journal que vous avez conservé. True Aim hache chaque élément enregistré, de sorte que toute altération est détectable et que le dossier est conçu pour résister à une contestation en litige, en audit ou devant un tribunal. La conservation est configurée par client pour correspondre à ses propres obligations de tenue de registres, et le statut de conservation de chaque sinistre figure dans le même dossier que ses documents, événements et décisions.",
    body: (
      <>
        <p>
          Un dossier qui peut être modifié sans trace est un brouillon. La norme est un dossier dont toute altération est détectable et une durée de conservation fixée délibérément pour correspondre aux obligations propres de l’organisation, qui dépassent généralement le sinistre de plusieurs années. Le sinistre sur lequel on vous interroge est souvent plus ancien que le journal que vous avez conservé.
        </p>
        <p>
          True Aim hache chaque élément enregistré, de sorte que toute altération est détectable et que le dossier est conçu pour résister à une contestation en litige, en audit ou devant un tribunal. La conservation est configurée par client pour correspondre à ses propres obligations de tenue de registres, et le statut de conservation de chaque sinistre figure dans le même dossier que ses documents, événements et décisions.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Au moment de la validation, que voit réellement le réviseur, et peut-il changer le résultat ?",
    plainAnswer:
      "Une étape de revue ne protège le client que si le réviseur voit la recommandation, les preuves qui la fondent et les hypothèses qui la sous-tendent, et détient l’autorité de modifier chacune d’elles. Un réviseur qui ne voit qu’un verdict approuve une conclusion, il n’examine pas un sinistre. True Aim produit une recommandation avec son raisonnement complet, qu’une personne confirme. Chaque hypothèse derrière la détermination est énoncée dans un panneau d’hypothèses de couverture et peut être modifiée, chaque ligne porte la clause ou la règle sur laquelle elle repose, et chaque total se recalcule en direct lorsqu’une garantie est activée ou désactivée, de sorte que le gestionnaire voit l’effet financier d’un changement avant de le valider.",
    body: (
      <>
        <p>
          Une étape de revue ne protège le client que si le réviseur voit la recommandation, les preuves qui la fondent et les hypothèses qui la sous-tendent, et détient l’autorité de modifier chacune d’elles. Un réviseur qui ne voit qu’un verdict approuve une conclusion, il n’examine pas un sinistre.
        </p>
        <p>
          True Aim produit une recommandation avec son raisonnement complet, qu’une personne confirme. Chaque hypothèse derrière la détermination est énoncée dans un panneau d’hypothèses de couverture et peut être modifiée, chaque ligne porte la clause ou la règle sur laquelle elle repose, et chaque total se recalcule en direct lorsqu’une garantie est activée ou désactivée, de sorte que le gestionnaire voit l’effet financier d’un changement avant de le valider.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Lorsqu’un gestionnaire passe outre le système, le motif est-il consigné, et quelqu’un en tire-t-il des enseignements ?",
    plainAnswer:
      "Les interventions humaines sont le signal de qualité le plus précieux que possède une organisation sinistres. Chacune est un cas où une personne expérimentée a été en désaccord avec le système, et le motif est soit consigné et étudié, soit perdu. La norme est un motif obligatoire à chaque intervention et une routine qui les lit. True Aim exige un motif pour chaque modification humaine et signale séparément les gestes commerciaux, de sorte qu’un paiement hors couverture n’entraîne jamais le modèle. Les décisions humaines et automatisées sont comptées côte à côte dans le dossier sinistre, ce qui donne à l’organisation une piste d’audit propre et des données d’entraînement propres en même temps.",
    body: (
      <>
        <p>
          Les interventions humaines sont le signal de qualité le plus précieux que possède une organisation sinistres. Chacune est un cas où une personne expérimentée a été en désaccord avec le système, et le motif est soit consigné et étudié, soit perdu. La norme est un motif obligatoire à chaque intervention et une routine qui les lit.
        </p>
        <p>
          True Aim exige un motif pour chaque modification humaine et signale séparément les gestes commerciaux, de sorte qu’un paiement hors couverture n’entraîne jamais le modèle. Les décisions humaines et automatisées sont comptées côte à côte dans le dossier sinistre, ce qui donne à l’organisation une piste d’audit propre et des données d’entraînement propres en même temps.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Pourriez-vous expliquer n’importe quelle décision au demandeur, en langage clair, à partir du seul dossier ?",
    plainAnswer:
      "La personne de l’autre côté d’un sinistre a le droit de comprendre pourquoi il a été décidé ainsi. La norme est une explication assemblée à partir du dossier lui-même : les faits retenus, la clause appliquée et le calcul effectué, dans un langage que le demandeur peut suivre. Si l’explication doit être reconstruite à la main, le dossier était incomplet. True Aim décide la couverture ligne par ligne, chaque ligne justifiée au regard d’une clause précise ou d’une règle métier configurée, citée et expliquée, avec l’arithmétique de la franchise, des limites, des plafonds et de la responsabilité exposée en détail. Les lignes rejetées sont barrées sur le document source lui-même et exportées en PDF, de sorte que le client voit le raisonnement sur sa propre facture.",
    body: (
      <>
        <p>
          La personne de l’autre côté d’un sinistre a le droit de comprendre pourquoi il a été décidé ainsi. La norme est une explication assemblée à partir du dossier lui-même : les faits retenus, la clause appliquée et le calcul effectué, dans un langage que le demandeur peut suivre. Si l’explication doit être reconstruite à la main, le dossier était incomplet.
        </p>
        <p>
          True Aim décide la couverture ligne par ligne, chaque ligne justifiée au regard d’une clause précise ou d’une règle métier configurée, citée et expliquée, avec l’arithmétique de la franchise, des limites, des plafonds et de la responsabilité exposée en détail. Les lignes rejetées sont barrées sur le document source lui-même et exportées en PDF, de sorte que le client voit le raisonnement sur sa propre facture.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Comment le système se comporte-t-il sur des sinistres qu’il n’a jamais vus, et qu’est-ce qui a changé après le dernier test de ce type ?",
    plainAnswer:
      "Un taux de précision mesuré sur les sinistres ayant servi à ajuster un système mesure la familiarité, pas la compétence. La norme est un test sur des sinistres que le système n’a jamais vus, annotés par un gestionnaire expérimenté, avec les modes de défaillance consignés et le remède enregistré. Chez True Aim, trente sinistres jamais vus ont fait apparaître des modes de défaillance que le jeu de développement n’avait pas couverts, ce qui est précisément la raison d’être d’un tel test. Combler l’écart a demandé davantage de vérité terrain et, pour la formule de règlement, de s’asseoir avec un gestionnaire et de refaire les calculs à la main. Aucune ingénierie de prompt ne corrige une erreur de logique métier. C’est ce travail qui décide si un pilote atteint la production.",
    body: (
      <>
        <p>
          Un taux de précision mesuré sur les sinistres ayant servi à ajuster un système mesure la familiarité, pas la compétence. La norme est un test sur des sinistres que le système n’a jamais vus, annotés par un gestionnaire expérimenté, avec les modes de défaillance consignés et le remède enregistré.
        </p>
        <p>
          Chez True Aim, trente sinistres jamais vus ont fait apparaître des modes de défaillance que le jeu de développement n’avait pas couverts, ce qui est précisément la raison d’être d’un tel test. Combler l’écart a demandé davantage de vérité terrain et, pour la formule de règlement, de s’asseoir avec un gestionnaire et de refaire les calculs à la main. Aucune ingénierie de prompt ne corrige une erreur de logique métier. C’est ce travail qui décide si un pilote atteint la production.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Si vous changez de système, les dossiers de décision partent-ils avec vous sous une forme lisible sans le logiciel ?",
    plainAnswer:
      "Les dossiers de décision appartiennent à l’organisation sinistres, pas au logiciel qui les a produits. La norme est un export qu’une personne peut lire sans le système : les documents, les décisions, les motifs et les versions, dans un format ouvert. Une piste d’audit qui ne s’ouvre que dans le système qui l’a produite n’est pas une piste d’audit. True Aim exporte le dossier complet d’un sinistre, chaque action d’une personne ou d’une machine avec son modèle, son prompt, sa version de règle et sa confiance, en un seul dossier d’audit, en un clic.",
    body: (
      <>
        <p>
          Les dossiers de décision appartiennent à l’organisation sinistres, pas au logiciel qui les a produits. La norme est un export qu’une personne peut lire sans le système : les documents, les décisions, les motifs et les versions, dans un format ouvert. Une piste d’audit qui ne s’ouvre que dans le système qui l’a produite n’est pas une piste d’audit.
        </p>
        <p>
          True Aim exporte le dossier complet d’un sinistre, chaque action d’une personne ou d’une machine avec son modèle, son prompt, sa version de règle et sa confiance, en un seul dossier d’audit, en un clic.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Où les données des sinistres sont-elles traitées, par qui, et qui est responsable de chaque décision prise en votre nom ?",
    plainAnswer:
      "Une organisation sinistres reste responsable de chaque décision prise en son nom, quel que soit le logiciel qui l’a prise. La surveillance suisse est explicite sur ce point : la FINMA attend des établissements qui utilisent l’IA qu’ils alignent leur gouvernance, leur gestion des risques et leurs systèmes de contrôle en conséquence, et un assureur qui externalise une fonction reste responsable envers la FINMA comme s’il l’exerçait lui-même. La norme est une liste publiée des sous-traitants, un lieu de traitement connu et un dossier qui montre, pour chaque décision, si une personne ou un système l’a prise. True Aim stocke et traite les données clients sur Microsoft Azure dans la région Switzerland North et ne les transfère pas hors de Suisse pour le traitement courant. Notre liste de sous-traitants ultérieurs est disponible sur demande, avec le service, les catégories de données et le lieu de traitement pour chacun. Le dossier sinistre compte séparément les décisions humaines et automatisées et liste chaque action chronologiquement par acteur, de sorte que la responsabilité est visible pour chaque décision, et non affirmée pour l’ensemble.",
    body: (
      <>
        <p>
          Une organisation sinistres reste responsable de chaque décision prise en son nom, quel que soit le logiciel qui l’a prise. La surveillance suisse est explicite sur ce point : la FINMA attend des établissements qui utilisent l’IA qu’ils alignent leur gouvernance, leur gestion des risques et leurs systèmes de contrôle en conséquence, et un assureur qui externalise une fonction reste responsable envers la FINMA comme s’il l’exerçait lui-même. La norme est une liste publiée des sous-traitants, un lieu de traitement connu et un dossier qui montre, pour chaque décision, si une personne ou un système l’a prise.
        </p>
        <p>
          True Aim stocke et traite les données clients sur Microsoft Azure dans la région Switzerland North et ne les transfère pas hors de Suisse pour le traitement courant. Notre liste de sous-traitants ultérieurs est disponible sur demande, avec le service, les catégories de données et le lieu de traitement pour chacun. Le dossier sinistre compte séparément les décisions humaines et automatisées et liste chaque action chronologiquement par acteur, de sorte que la responsabilité est visible pour chaque décision, et non affirmée pour l’ensemble.
        </p>
      </>
    ),
  },
];
