import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Politique relative aux cookies" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted">Dernière mise à jour : 26 novembre 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Qui nous sommes</h2>
            <p className="text-body leading-[1.6]">
              Ce site web est exploité par <strong className="text-strong">True Aim AG</strong>, numéro d’inscription au registre du commerce <strong className="text-strong">CHE-325.128.066</strong>, dont le siège social est à Zoug, en Suisse. Adresse enregistrée : c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse. La présente politique explique comment nous utilisons les cookies et technologies similaires sur notre site web.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Que sont les cookies ?</h2>
            <p className="text-body leading-[1.6]">
              Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez un site web. Ils aident les sites à fonctionner correctement, améliorent l’expérience utilisateur et fournissent des informations sur la façon dont le site est utilisé. Les cookies peuvent être déposés par nous (cookies internes) ou par des services tiers que nous utilisons.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Comment nous utilisons les cookies</h2>
            <p className="text-body leading-[1.6]">
              Nous utilisons trois catégories de cookies et de technologies similaires.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Essentiels</strong> couvre uniquement l’enregistrement de votre choix sur les cookies. Cette catégorie est toujours active, car nous en avons besoin pour respecter votre choix.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Analyse</strong> couvre Google Analytics 4, chargé via Google Tag Manager. Il nous montre comment les visiteurs utilisent le site, par exemple les pages les plus consultées. Nous voyons ces statistiques sous forme agrégée et nous les utilisons pour améliorer le site.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Suivi HubSpot</strong> couvre le traceur HubSpot. Il reconnaît votre navigateur quand vous revenez, enregistre vos visites et les relie à une demande de démo que vous envoyez. Les visites apparaissent ainsi dans votre fiche de contact dans notre CRM. Dès que vous envoyez une demande, ces données vous concernent personnellement. Le suivi HubSpot a donc son propre choix dans le bandeau cookies.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Nous ne déposons aucun cookie publicitaire.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookies utilisés sur ce site web</h2>
            <p className="text-body leading-[1.6]">
              Aucun cookie n’est déposé avant votre choix dans le bandeau cookies. La durée de vie est le délai après lequel l’élément expire. Votre navigateur peut le supprimer plus tôt.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                <thead>
                  <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Nom</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Déposé par</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Catégorie</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Rôle</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Durée de vie</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>cookie-consent</code> (stockage local, pas un cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Essentiels</td><td className="py-3 pr-4">Enregistre votre choix pour chaque catégorie</td><td className="py-3 pr-4">Jusqu’à ce que vous modifiiez votre choix</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>ta-first-touch</code> (stockage local, pas un cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Analyse</td><td className="py-3 pr-4">Enregistre la page d’arrivée, le site d’origine et les paramètres de campagne, envoyés avec une demande de démo</td><td className="py-3 pr-4">90 jours</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>_ga</code>, <code>_ga_*</code></th><td className="py-3 pr-4">Google Analytics 4, via Google Tag Manager</td><td className="py-3 pr-4">Analyse</td><td className="py-3 pr-4">Mesurent les pages vues et les interactions</td><td className="py-3 pr-4">400 jours</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>hubspotutk</code>, <code>__hstc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Suivi HubSpot</td><td className="py-3 pr-4">Reconnaissent les visiteurs qui reviennent et relient les envois du formulaire de contact aux visites</td><td className="py-3 pr-4">180 jours</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Suivi HubSpot</td><td className="py-3 pr-4">Compte les pages d’une visite</td><td className="py-3 pr-4">30 minutes</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssrc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">Suivi HubSpot</td><td className="py-3 pr-4">Détecte une nouvelle session de navigation</td><td className="py-3 pr-4">Jusqu’à la fermeture du navigateur</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__cf_bm</code></th><td className="py-3 pr-4">HubSpot (sur les domaines propres de HubSpot)</td><td className="py-3 pr-4">Suivi HubSpot</td><td className="py-3 pr-4">Protège les services de HubSpot contre les robots</td><td className="py-3 pr-4">30 minutes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, l’agence qui travaille sur la performance de notre site, a accès à nos comptes Google Tag Manager et Google Analytics et ne dépose aucun cookie propre. Cette liste est mise à jour lorsque nous ajoutons ou retirons un service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Gérer vos préférences en matière de cookies</h2>
            <p className="text-body leading-[1.6]">
              Lors de votre première visite, le bandeau cookies vous demande votre choix. « Tout accepter » autorise l’analyse et le suivi HubSpot, « Refuser » n’autorise ni l’un ni l’autre, et « Gérer les préférences » vous permet de choisir chaque catégorie séparément.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              Vous pouvez modifier ou retirer votre choix à tout moment avec « Préférences en matière de cookies » dans le pied de chaque page. Lorsque vous retirez une catégorie, nous supprimons ses cookies. Vous pouvez aussi supprimer les cookies dans les réglages de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Protection des données et accès international</h2>
            <p className="text-body leading-[1.6]">
              Les données des cookies sont traitées par Google Ireland Limited et HubSpot Ireland Limited (centre de données européen en Allemagne). Lorsqu’un traitement a lieu hors de l’UE, il s’appuie sur les clauses contractuelles types. Pour en savoir plus sur la façon dont nous traitons les données personnelles, consultez notre{" "}
              <Link href="/privacy" className="text-link hover:underline">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Mises à jour de cette politique</h2>
            <p className="text-body leading-[1.6]">
              Nous pouvons mettre à jour la présente politique de temps à autre afin de refléter les évolutions technologiques, les exigences légales ou la façon dont nous exploitons notre site. La dernière version sera toujours disponible sur cette page ou sur demande si une version plus récente existe mais n’a pas encore été publiée.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Contact</h2>
            <p className="text-body leading-[1.6]">
              Pour toute question sur notre utilisation des cookies, vous pouvez nous contacter à{" "}
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
