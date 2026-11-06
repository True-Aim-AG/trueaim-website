import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function AITransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Transparence et contrôle de l’IA" texture={{ name: "glass", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Dernière mise à jour : 22 février 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Objet de la présente déclaration</h2>
              <p className="text-body leading-[1.6]">
                La présente déclaration décrit la façon dont True Aim AG aborde la conception et l’utilisation de l’intelligence artificielle dans ses produits. Elle précise le rôle de l’IA dans nos systèmes, les limites dans lesquelles elle opère et les mécanismes de supervision appliqués. Elle reflète notre approche à la date de dernière mise à jour indiquée ci-dessus et peut être révisée de temps à autre à mesure qu’évoluent notre architecture, nos pratiques de gouvernance et l’environnement réglementaire. Elle est fournie à des fins de transparence uniquement et ne constitue ni un engagement contractuel ni une qualification réglementaire formelle.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Notre approche de conception</h2>
              <p className="text-body leading-[1.6]">
                True Aim construit une infrastructure de décision assistée par l’IA pour les secteurs réglementés. Nos systèmes sont conçus pour soutenir l’analyse structurée, l’interprétation et l’exécution de flux de travail dans des limites de contrôle définies. Des composants d’IA contribuent à la compréhension de documents, à l’extraction de données, à la classification et au soutien analytique à différentes étapes de la chaîne de traitement. L’examen humain et le contrôle organisationnel restent au cœur des environnements de production. Les décisions et les résultats doivent pouvoir faire l’objet d’une explication et d’un examen structurés.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Où l’IA est utilisée</h2>
              <p className="text-body leading-[1.6]">
                Dans nos produits, l’IA peut servir à convertir des documents en texte structuré, à classer des types de documents, à extraire des informations structurées et à soutenir le traitement analytique. L’IA peut soutenir l’analyse même lorsque les informations sont complètes et sans ambiguïté, dans le cadre de l’accélération des flux de travail et du traitement structuré. Les composants d’IA opèrent à des étapes définies de l’architecture du système et sont intégrés dans des contrôles plus larges fondés sur des règles et des flux de travail.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Où l’IA n’est pas utilisée</h2>
              <p className="text-body leading-[1.6]">
                Les composants d’IA ne sont pas conçus pour assumer de façon autonome une autorité organisationnelle ni pour agir en dehors des étapes de flux de travail définies. La responsabilité finale des décisions, des actions et des résultats reste à l’organisation qui utilise le système. Si une organisation choisit d’automatiser une étape ou une action opérationnelle ultérieure à la suite d’une sortie, d’une recommandation ou d’une analyse du système, cette décision et ses conséquences lui incombent. Cela vaut que l’étape ultérieure soit manuelle, semi-automatisée ou automatisée par configuration du système.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Supervision et contrôle des flux de travail</h2>
              <p className="text-body leading-[1.6]">
                Les systèmes de True Aim sont conçus pour soutenir la contrôle humain au sein des flux de travail de production. Les utilisateurs peuvent examiner les sorties du système, évaluer les informations à l’appui et appliquer leur propre jugement avant de finaliser les résultats. Des autorisations basées sur les rôles et des contrôles de flux de travail restreignent l’accès aux modifications de configuration et aux ajustements de la logique de décision. Les sorties du système ont un caractère consultatif, sauf définition contraire dans un accord écrit distinct.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Auditabilité et traçabilité</h2>
              <p className="text-body leading-[1.6]">
                Les systèmes de True Aim sont conçus pour soutenir l’auditabilité et l’examen a posteriori. Les étapes de traitement peuvent être enregistrées de façon à permettre la traçabilité des résultats jusqu’aux documents source, aux règles appliquées et aux configurations du système en vigueur au moment du traitement. Cette journalisation structurée vise à soutenir l’examen, l’assurance qualité et l’analyse de conformité dans les environnements réglementés.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Principes de traitement des données</h2>
              <p className="text-body leading-[1.6]">
                True Aim n’entraîne pas de modèles d’IA de fondation sur les données de ses clients. Les composants d’IA fonctionnent via des services d’IA managés et traitent les données à des fins d’inférence dans le cadre du flux de travail défini. La sécurité, le chiffrement et les contrôles d’accès sont appliqués conformément à nos pratiques générales de sécurité de l’information. La conservation et la suppression des données sont régies par les dispositions contractuelles et les exigences légales applicables.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Conception fondée sur les risques</h2>
              <p className="text-body leading-[1.6]">
                Nos systèmes sont développés en tenant compte des cas d’usage réglementés. Des mesures architecturales soutiennent l’explicabilité, l’examen structuré, le contrôle d’accès et la transparence opérationnelle. Nous continuons d’affiner nos pratiques techniques et de gouvernance à mesure qu’évoluent les normes réglementaires et les attentes du secteur.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Évolution des systèmes</h2>
              <p className="text-body leading-[1.6]">
                True Aim opère dans un environnement technologique en évolution rapide. L’architecture du système, les fournisseurs de modèles, les méthodes de traitement et les mécanismes de contrôle peuvent évoluer avec le temps. La présente déclaration décrit notre approche générale au moment de sa publication et doit être lue dans ce contexte.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contact</h2>
              <p className="text-body leading-[1.6]">
                Pour toute question sur notre approche de l’utilisation ou de la supervision de l’IA, vous pouvez nous contacter à{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Société : True Aim AG<br />
                Siège social : Zoug, Suisse
              </p>
            </section>

            <div className="pt-4">
              <ButtonLink href="/contact" variant="primary" size="md">
                Nous contacter
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
