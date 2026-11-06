import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ScrollText,
  User, ArrowRight } from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { scorecardQuestions, type ScorecardQuestion } from "./questions.fr";
import { faqs } from "./faqs.fr";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Sur cette page" panel; the H2s carry the full questions.
const sections: { id: string; heading: string }[] = [
  { id: "provenance", heading: "Provenance" },
  { id: "reconstruction", heading: "Reconstruction" },
  { id: "human-judgement", heading: "Jugement humain" },
  { id: "continuity", heading: "Continuité" },
  { id: "the-principle", heading: "Le principe derrière True Aim" },
  { id: "using-the-scorecard", heading: "Comment utiliser la grille" },
];

/**
 * One group of scorecard questions as a numbered list of house cards. The
 * numbering runs 1..12 across all four groups, so each list continues from
 * the previous one rather than restarting.
 */
function QuestionGroup({ group }: { group: ScorecardQuestion["group"] }) {
  const items = scorecardQuestions
    .map((item, index) => ({ item, number: index + 1 }))
    .filter(({ item }) => item.group === group);
  return (
    <ol
      start={items[0]?.number}
      role="list"
      className="space-y-4 list-none p-0"
    >
      {items.map(({ item, number }) => (
        <li
          key={item.question}
          className="bg-card shadow-card rounded-pill p-8"
        >
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {number}
            </span>
            <span>{item.question}</span>
          </h3>
          <div className="text-sm text-body leading-[1.6] space-y-3">
            {item.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function AuditabilityScorecardBlogPost({
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
        <TextureBackdrop texture={{ name: "circ", position: "72% 18%" }} />

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

            {/* Standfirst question */}
            <p className="text-base md:text-lg font-medium text-body mb-3">
              Que devez-vous demander avant de confier une décision sur un sinistre à une IA ?
            </p>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              La grille d’évaluation de l’auditabilité de l’IA sinistres
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Douze questions qui montrent si un système d’IA sinistres peut rendre compte de chacune de ses décisions, et comment True Aim répond à chacune.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO, True Aim
                  AG
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                14 min de lecture
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
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          L’auditabilité se décide dans l’architecture.
                        </strong>{" "}
                        Un dossier de décision rédigé sans provenance ne peut pas en être doté après coup.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Les échéances « haut risque » de l’AI Act européen ont été reportées à décembre 2027.
                        </strong>{" "}
                        La gestion des sinistres n’a jamais figuré sur cette liste, et le RGPD encadre les décisions automatisées depuis 2018.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Douze questions en quatre groupes :
                        </strong>{" "}
                        provenance, reconstruction, jugement humain et continuité.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Le test décisif est la reconstruction.
                        </strong>{" "}
                        Prenez un sinistre clos l’an dernier et reconstruisez la décision à partir du seul dossier.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Seuls 24 % des dirigeants d’assurance sont très confiants
                        </strong>{" "}
                        de pouvoir passer une revue indépendante de la gouvernance et des contrôles de l’IA, avec des preuves centralisées, dans les 90 prochains jours. La confiance n’est pas une preuve.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Un sinistre est une série de décisions. Quels documents croire. Quelle clause s’applique. Ce que la police doit. Si une ligne de facture est juste. Automatiser ces décisions est désormais à la portée de toute organisation sinistres. Les automatiser de façon que chacune puisse être expliquée et défendue, devant un client, un auditeur ou un superviseur, des années après la clôture du dossier, est une autre discipline. Cette discipline est le sujet de cet article.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Le calendrier réglementaire a récemment offert un prétexte pour la remettre à plus tard. En juillet 2026, l’Union européenne a reporté la plupart des obligations « haut risque » de l’AI Act, à décembre 2027 pour les systèmes autonomes. La gestion des sinistres n’a jamais figuré parmi les usages que le règlement classe à haut risque, et les droits d’une personne faisant l’objet d’une décision exclusivement automatisée, y compris le droit à des informations utiles sur la logique sous-jacente, s’appliquent en vertu du RGPD depuis 2018. Le report change le calendrier pour d’autres systèmes. Il ne change rien à ce qu’une organisation sinistres doit aux personnes dont elle décide les sinistres. Nous avons exposé les détails séparément dans{" "}
                  <Link
                    href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                    className="text-link underline underline-offset-2"
                  >
                    notre article sur l’AI Act et la gestion des sinistres
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  La raison la plus forte de ne pas attendre est pratique. La preuve se décide dans l’architecture. Un système qui enregistre d’où vient chaque valeur, quelle règle ou quel modèle l’a produite et qui l’a confirmée peut répondre à toute question qu’on lui posera plus tard. Un système qui ne le fait pas ne peut pas être réparé après coup, car ce que le dossier n’a pas saisi le jour même est perdu. La conformité est soit intégrée dès le premier sinistre, soit ajoutée ensuite comme une couche d’explication sur des décisions que personne ne peut reconstruire.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  L’enquête AI Impact Survey 2026 de Grant Thornton, menée auprès de 950 dirigeants dont 100 dans l’assurance, a révélé que seuls{" "}
                  <strong className="text-strong">24%</strong> sont très confiants de pouvoir passer une revue indépendante de la gouvernance et des contrôles de l’IA, avec des preuves centralisées, dans les 90 prochains jours. À cette taille d’échantillon, le chiffre est indicatif, mais la direction est claire, et l’écart est un problème de documentation avant d’être un problème de modélisation.
                </p>

                <p className="text-body leading-[1.6]">
                  Les douze questions ci-dessous sont celles auxquelles, selon nous, tout responsable sinistres devrait pouvoir répondre à propos de toute IA opérant en son nom, qu’elle ait été développée en interne ou achetée. Sous chacune, nous décrivons ce à quoi ressemble une bonne réponse et comment True Aim l’aborde. Dans la plupart des cas, c’est la même réponse, parce que True Aim a été conçu autour de ces questions.
                </p>
              </MotionDiv>

              {/* Group 1: provenance */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="provenance"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Pouvez-vous montrer d’où vient chaque réponse ?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La provenance est le fondement de tout ce qui suit, et la propriété la plus facile à tester. Demandez à voir un sinistre réel.
                </p>

                <QuestionGroup group="Provenance" />
              </MotionDiv>

              {/* Group 2: reconstruction */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="reconstruction"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Pouvez-vous reconstruire une décision close l’an dernier ?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  La reconstruction est ce qui distingue être prêt pour un audit et se préparer à un audit. La préparation est un exercice qui commence quand l’examen est annoncé. La disponibilité est une propriété que le système possède pendant qu’il fonctionne, ou qu’il n’a pas du tout. Seule la seconde peut répondre à une question sur un sinistre clos il y a dix-huit mois.
                </p>

                <QuestionGroup group="Reconstruction" />
              </MotionDiv>

              {/* Group 3: human judgement */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="human-judgement"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’humain dans le processus décide-t-il réellement ?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Le jugement humain est le contrôle sur lequel la plupart des organisations s’appuient et celui qui est le moins souvent testé. Une étape de revue n’est un véritable contrôle que si le réviseur peut voir les preuves et a l’autorité de changer le résultat. En vertu du RGPD, une décision exclusivement automatisée confère à la personne des droits spécifiques, et une validation que personne ne pourrait raisonnablement refuser n’y change rien. Bien conçue, l’étape de revue est aussi celle où l’expertise d’un professionnel des sinistres est le mieux employée : sur le jugement, pas sur l’arithmétique.
                </p>

                <QuestionGroup group="Human judgement" />
              </MotionDiv>

              {/* Group 4: continuity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="continuity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Les preuves survivent-elles aux nouveaux sinistres, au temps et au changement ?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Le dernier groupe regarde au-delà d’une décision isolée, vers les conditions qui l’entourent : comment le système a été éprouvé, ce qui arrive aux enregistrements quand les circonstances changent, et où se situe la responsabilité tout au long du processus.
                </p>

                <QuestionGroup group="Continuity" />
              </MotionDiv>

              {/* The principle */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-principle"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Le principe derrière True Aim
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Tout ce que fait True Aim produit une décision, alimente une décision ou prouve une décision. Un sinistre est rassemblé dans un dossier unique et complet. Les preuves sont testées pour leur intégrité avant toute décision, et ce qui échoue à ce contrôle n’atteint jamais l’étape de décision. Chaque décision est calculée au regard du libellé en vigueur, avec sa justification attachée. Chaque action, d’une personne ou d’une machine, est écrite dans un dossier dont toute altération est détectable et qui peut être reconstruit, exporté et expliqué aussi longtemps qu’il est conservé. L’architecture est décrite en détail dans{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link underline underline-offset-2"
                  >
                    notre article sur les chaînes de preuves
                  </Link>
                  .
                </p>

                <div className="mt-6 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Voilà ce que signifie une conformité intégrée dès le premier sinistre. Le jugement reste chez vous. L’arithmétique, le libellé et les preuves n’ont plus besoin d’y rester.
                  </p>
                </div>
              </MotionDiv>

              {/* Using the scorecard */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="using-the-scorecard"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Comment utiliser la grille
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Choisissez un sinistre clos l’an dernier, idéalement un refus, et parcourez les douze questions sur ce sinistre, à partir du seul dossier. Si la décision peut être reconstruite champ par champ en quelques minutes, l’organisation peut répondre à un client, à un auditeur ou à un superviseur sous n’importe quel régime, et la date de 2027 est une formalité. S’il faut un trimestre, c’est là la vraie échéance, et elle n’a jamais été 2027.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Le test que nous soumettrions à tout conseil d’administration est simple. Si un régulateur demandait demain à parcourir une décision automatisée sur un sinistre, ligne par ligne, pourriez-vous le faire ?
                </p>

                <p className="text-body leading-[1.6]">
                  La grille s’applique à tout système, y compris le nôtre.{" "}
                  <Link href="/trust" className="text-link underline underline-offset-2">
                    Notre Trust Center
                  </Link>{" "}
                  expose comment True Aim répond à chacune de ces questions, et nous sommes ouverts à la discussion.
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
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Choisissez l’auditabilité dès la conception.
                        </strong>{" "}
                        La provenance enregistrée dès le premier sinistre est la seule qui existe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Calculez ce qui peut être calculé.
                        </strong>{" "}
                        Des règles là où le libellé couvre les faits, des modèles là où les preuves sont non structurées, et un dossier qui montre ce qui relève de quoi.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Faites du jugement humain un véritable contrôle.
                        </strong>{" "}
                        Le réviseur voit les preuves, détient l’autorité de changer le résultat, et chaque intervention est consignée avec son motif.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Prouvez d’abord la performance sur des sinistres jamais vus.
                        </strong>{" "}
                        Un taux de précision mesuré sur les sinistres ayant servi à ajuster un système mesure la familiarité, pas la compétence.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Gardez la maîtrise des enregistrements.
                        </strong>{" "}
                        Toute altération détectable, export en un clic et conservation alignée sur vos propres obligations.
                      </span>
                    </li>
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

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.answer}
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
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Construire des chaînes de preuves que les auditeurs acceptent vraiment
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      L’architecture derrière la provenance et la reconstruction.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Pourquoi les pilotes d’IA sinistres s’enlisent avant d’être prêts pour la production
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Pourquoi les tests sur des sinistres jamais vus décident si un pilote atteint la production.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      La gestion des sinistres par IA n’est pas à haut risque au sens de l’AI Act européen
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Pourquoi le report ne change rien pour une organisation sinistres.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sources"
                  className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline scroll-mt-24"
                >
                  Sources
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Règlement (UE) 2026/1744 (omnibus numérique sur l’IA), Journal officiel du 24 juillet 2026, en vigueur le 27 juillet 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Règlement (UE) 2024/1689 (règlement sur l’IA), annexe III et article 113.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Règlement (UE) 2016/679 (RGPD), article 15, paragraphe 1, point h), et article 22.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Communication sur la surveillance 08/2024 : Gouvernance et gestion des risques lors de l’utilisation de l’intelligence artificielle
                    </em>
                    , 18 décembre 2024.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Circulaire 2018/3 : Outsourcing – banques, assureurs et établissements financiers selon la LEFin
                    </em>
                    , modifiée en dernier lieu le 4 novembre 2020, en vigueur le 1er janvier 2021, Cm 24.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, résultats assurance ; enquête menée du 23 février au 18 mars 2026, 950 dirigeants, dont 100 dans l’assurance.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Position réglementaire au 10 septembre 2026. Ceci ne constitue pas un avis juridique.
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
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Le risque zéro n’existe pas. Les décisions explicables, si.
            </h2>
            <p className="text-lg text-body mb-10">
              Discutons de la façon dont ces douze questions s’appliquent à votre gestion des sinistres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/trust" variant="on-dark" size="lg">
                Trust Center
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
