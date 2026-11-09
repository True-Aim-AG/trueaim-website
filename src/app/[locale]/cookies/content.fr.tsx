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
        <p className="mt-6 text-sm text-muted">Dernière mise à jour : 19 octobre 2026</p>
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
              Nous utilisons des cookies aux fins suivantes. Les cookies essentiels sont nécessaires au bon fonctionnement du site et ne peuvent pas être désactivés. Ils prennent en charge des fonctions de base telles que la navigation entre les pages, l’envoi de formulaires et la sécurité. Les cookies d’analyse nous aident à comprendre comment les visiteurs utilisent notre site, par exemple quelles pages sont les plus consultées et comment les utilisateurs se déplacent sur le site. Ces informations servent à améliorer la performance et la convivialité du site. Les données d’analyse sont agrégées et n’identifient pas directement les utilisateurs individuels. Nous ne déposons aucun cookie marketing ou publicitaire.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookies utilisés sur ce site web</h2>
            <p className="text-body leading-[1.6]">
              Aucun cookie n’est déposé avant que vous ayez fait un choix dans le bandeau cookies. Les cookies et technologies similaires présents sur ce site sont :
            </p>
            <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
              <li><strong className="text-strong">Choix de consentement</strong> (enregistré par ce site dans le stockage local de votre navigateur, pas un cookie) : mémorise si vous avez accepté ou refusé les cookies d’analyse.</li>
              <li><strong className="text-strong">Google Analytics 4, chargé via Google Tag Manager</strong> (<code>_ga</code>, <code>_ga_*</code>) : déposés uniquement après votre acceptation des cookies d’analyse ; mesurent les pages vues et les interactions.</li>
              <li><strong className="text-strong">HubSpot</strong> (<code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code>, <code>__hssrc</code>) : déposés uniquement après votre acceptation des cookies d’analyse ; reconnaissent les visiteurs récurrents et relient les envois du formulaire de contact aux visites.</li>
            </ul>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, l’agence qui travaille sur la performance de notre site, a accès à nos comptes Google Tag Manager et Google Analytics et ne dépose aucun cookie propre. Cette liste est mise à jour lorsque nous ajoutons ou retirons un service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Gérer vos préférences en matière de cookies</h2>
            <p className="text-body leading-[1.6]">
              Lorsque vous visitez notre site, vous avez la possibilité d’accepter ou de refuser les cookies non essentiels. Vous pouvez également gérer ou supprimer les cookies à tout moment dans les paramètres de votre navigateur. Veuillez noter que la désactivation des cookies essentiels peut affecter le fonctionnement du site.
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
