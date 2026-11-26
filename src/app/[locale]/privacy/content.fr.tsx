import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-11-26";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "roles", label: "1. Rôles" },
  { id: "categories", label: "2. Catégories de données personnelles que nous traitons" },
  { id: "lawful-bases", label: "3. Bases juridiques du traitement" },
  { id: "use", label: "4. Comment nous utilisons les données personnelles" },
  { id: "sub-processors", label: "5. Sous-traitants ultérieurs et communications" },
  { id: "transfers", label: "6. Transferts internationaux" },
  { id: "security", label: "7. Sécurité" },
  { id: "retention", label: "8. Conservation" },
  { id: "rights", label: "9. Vos droits" },
  { id: "automated", label: "10. Décisions automatisées" },
  { id: "changes", label: "11. Modifications de cette politique" },
  { id: "contact", label: "12. Contact" },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Politique de confidentialité" texture={{ name: "circ", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted">
          <strong className="text-strong">Date d’entrée en vigueur :</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong className="text-strong">Dernière mise à jour :</strong> {LAST_UPDATED}
        </p>
        <p className="mt-2 text-sm text-muted">
          Versions précédentes :{" "}
          <Link href="/privacy-legacy" className="text-link hover:underline">
            v1 (févr. 2026)
          </Link>
        </p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Sommaire</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-link hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG (« True Aim », « nous ») fournit une plateforme multi-locataire de traitement des sinistres (le « Service »). La présente politique de confidentialité décrit comment nous collectons, utilisons, communiquons et protégeons les données personnelles lorsque nos clients (les « Tenants ») et leurs utilisateurs finaux (collectivement, « vous ») interagissent avec notre Service ou avec ce site web.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Rôles</h2>
              <p className="text-body leading-[1.6]">
                Pour les données personnelles qu’un Tenant soumet au sujet de ses utilisateurs finaux dans le cadre du Service, le Tenant est le responsable du traitement et True Aim agit en qualité de sous-traitant au titre d’un accord de traitement des données. Pour les données personnelles que nous collectons directement, y compris les informations de compte des administrateurs des Tenants et les données des visiteurs du site marketing, True Aim agit en qualité de responsable du traitement.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Catégories de données personnelles que nous traitons</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Données de compte :</strong> nom, e-mail, organisation, fonction, métadonnées d’authentification.</li>
                <li><strong className="text-strong">Données de sinistres soumises par les Tenants :</strong> descriptions de sinistres, identifiants des demandeurs, dates de survenance, numéros de police, documents téléversés.</li>
                <li><strong className="text-strong">Données dérivées :</strong> données structurées extraites des documents téléversés par nos composants d’intelligence documentaire et de modèles de langage.</li>
                <li><strong className="text-strong">Données d’utilisation et de télémétrie :</strong> journaux applicatifs, entrées de la piste d’audit, métadonnées des requêtes, indicateurs opérationnels.</li>
                <li><strong className="text-strong">Données du site web :</strong> adresse IP, métadonnées du navigateur et pages visitées, collectées via les journaux serveur standard. Uniquement après votre acceptation des cookies d’analyse, Google Tag Manager et Google Analytics 4 collectent aussi ces données. Uniquement après votre acceptation du suivi HubSpot, le traceur HubSpot reconnaît votre navigateur lors de vos visites suivantes et relie vos visites à une demande de démo que vous envoyez. Notre <Link href="/cookies" className="text-link hover:underline">politique de cookies</Link> indique chaque cookie et sa durée de vie.</li>
                <li><strong className="text-strong">Données du formulaire de contact :</strong> les informations que vous saisissez dans le formulaire, ainsi que les champs d’attribution que le site enregistre avec votre envoi : la première page sur laquelle vous êtes arrivé, le site d’origine et les paramètres de campagne (UTM), et votre réponse à « Comment avez-vous entendu parler de nous ? » si vous en donnez une. Ces données sont envoyées à HubSpot, notre CRM, et une copie est écrite dans une feuille de calcul de notre Google Workspace, qui avertit notre équipe par e-mail (voir la section 5). Le prénom, le nom, l’e-mail professionnel, l’entreprise, la fonction, le pays et le domaine d’intérêt sont obligatoires : nous en avons besoin pour savoir qui nous écrit, pour quelle entreprise et quel marché, et quel produit vous montrer. Sans eux, nous ne pouvons pas répondre à votre demande. La façon dont vous nous avez connus, votre volume de sinistres et votre message sont facultatifs.</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Bases juridiques du traitement (RGPD / LPD suisse)</h2>
              <p className="text-body leading-[1.6]">
                Ce tableau relie chaque finalité aux données utilisées et à sa base juridique selon le RGPD. Lorsque la LPD suisse exige un motif justificatif, nous nous appuyons sur le même motif.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                  <thead>
                    <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Finalité</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Données</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Base juridique</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Notre intérêt légitime</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Répondre à votre demande de démo ou de contact</th><td className="py-3 pr-4">Données du formulaire de contact</td><td className="py-3 pr-4">Mesures précontractuelles prises à votre demande (art. 6.1.b)</td><td className="py-3 pr-4">Sans objet</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Savoir comment vous nous avez trouvés</th><td className="py-3 pr-4">Champs d’attribution : page d’arrivée, site d’origine, paramètres UTM, la façon dont vous nous avez connus</td><td className="py-3 pr-4">Intérêt légitime (art. 6.1.f)</td><td className="py-3 pr-4">Savoir quels canaux apportent des demandes, pour bien utiliser notre budget marketing</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Assurer le suivi de votre demande en tant que prospect professionnel</th><td className="py-3 pr-4">Données du formulaire de contact dans notre CRM</td><td className="py-3 pr-4">Intérêt légitime (art. 6.1.f)</td><td className="py-3 pr-4">Vendre notre Service aux assureurs et à leurs collaborateurs. Vous pouvez vous y opposer à tout moment.</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Exploiter et sécuriser ce site</th><td className="py-3 pr-4">Données du site issues des journaux serveur</td><td className="py-3 pr-4">Intérêt légitime (art. 6.1.f)</td><td className="py-3 pr-4">Garder le site disponible et sûr</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Statistiques du site</th><td className="py-3 pr-4">Données de Google Analytics 4</td><td className="py-3 pr-4">Votre consentement (art. 6.1.a)</td><td className="py-3 pr-4">Sans objet</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Relier vos visites à votre demande de démo</th><td className="py-3 pr-4">Données du suivi HubSpot</td><td className="py-3 pr-4">Votre consentement (art. 6.1.a)</td><td className="py-3 pr-4">Sans objet</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Conserver la trace de votre choix sur les cookies</th><td className="py-3 pr-4">Votre choix de consentement</td><td className="py-3 pr-4">Obligation légale de démontrer le consentement (art. 6.1.c et art. 7.1)</td><td className="py-3 pr-4">Sans objet</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Fournir le Service aux Tenants</th><td className="py-3 pr-4">Données de sinistres et données dérivées</td><td className="py-3 pr-4">Nous traitons ces données pour le Tenant, sur ses instructions et selon l’accord de traitement des données. Le Tenant fixe la base juridique.</td><td className="py-3 pr-4">Non applicable</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Gérer les comptes utilisateurs et les accès des Tenants</th><td className="py-3 pr-4">Données de compte</td><td className="py-3 pr-4">Intérêt légitime (art. 6.1.f)</td><td className="py-3 pr-4">Fournir le Service que votre organisation a commandé</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Détecter et prévenir les incidents de sécurité</th><td className="py-3 pr-4">Données d’utilisation et de télémétrie, piste d’audit</td><td className="py-3 pr-4">Intérêt légitime (art. 6.1.f)</td><td className="py-3 pr-4">Protéger le Service et les données des Tenants</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Respecter nos obligations légales, par exemple comptables</th><td className="py-3 pr-4">Les données que la loi exige</td><td className="py-3 pr-4">Obligation légale (art. 6.1.c)</td><td className="py-3 pr-4">Sans objet</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Comment nous utilisons les données personnelles</h2>
              <p className="text-body leading-[1.6]">
                Pour fournir et exploiter le Service ; authentifier les utilisateurs ; détecter, analyser et prévenir les incidents de sécurité ; respecter nos obligations légales ; et améliorer le Service sous une forme agrégée et non identifiante. Nous ne vendons pas de données personnelles et nous n’utilisons pas les données des Tenants pour entraîner des modèles de fondation.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Sous-traitants ultérieurs et communications</h2>
              <p className="text-body leading-[1.6]">
                Nous hébergeons le Service sur Microsoft Azure dans la région Switzerland North. La liste en vigueur de nos sous-traitants ultérieurs actifs, précisant le service fourni par chacun, les catégories de données personnelles concernées et le lieu de traitement, est publiée en annexe 2 de notre accord de traitement des données client, disponible sur demande.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Les outils utilisés en interne (gestion du code source, CI/CD, CRM) qui ne traitent pas de données de production des Tenants ne sont pas des sous-traitants ultérieurs au sens de nos clients et n’y figurent pas. Nous ne communiquons pas de données personnelles à d’autres tiers, sauf obligation légale ou instruction expresse d’un Tenant.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Ce site web utilise les services suivants. Aucun d’eux ne reçoit de données de Tenants ou de sinistres par l’intermédiaire de ce site.
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Google Tag Manager et Google Analytics 4</strong> (Google Ireland Limited) : chargés uniquement après votre acceptation des cookies d’analyse ; mesurent les pages vues et les interactions ; GA4 n’enregistre ni ne conserve les adresses IP ; aucune donnée personnelle n’est placée dans la couche de données.</li>
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, hébergé dans le centre de données européen de HubSpot en Allemagne) : reçoit les envois du formulaire de contact, y compris les champs d’attribution indiqués à la section 2. Uniquement après votre acceptation du suivi HubSpot, il enregistre aussi vos visites sur ce site et les relie à votre envoi. Le suivi HubSpot a son propre choix dans le bandeau cookies, distinct de l’analyse.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited) : une feuille de calcul de notre Google Workspace reçoit une copie de chaque envoi du formulaire de contact et adresse une notification par e-mail à notre équipe.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong> (États-Unis) : l’agence qui travaille sur la performance de notre site, avec un accès à Google Tag Manager, Google Analytics et Google Search Console ; elle n’a aucun accès aux données des clients ou des Tenants.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Transferts internationaux</h2>
              <p className="text-body leading-[1.6]">
                Les données personnelles traitées dans le Service sont stockées en Suisse. Les données du formulaire de contact sont stockées dans l’Union européenne, dans le centre de données européen de HubSpot et dans notre Google Workspace. Firon Marketing LLC, notre agence web, est établie aux États-Unis et a accès à Google Tag Manager et à Google Analytics. Lorsqu’un traitement a lieu hors de Suisse, de l’UE ou de l’EEE, y compris des transferts vers les États-Unis, nous nous appuyons sur les cadres EU-U.S. et Swiss-U.S. Data Privacy Framework ou sur les clauses contractuelles types. Notre liste des sous-traitants ultérieurs indique le lieu et la base du transfert pour chaque prestataire.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Sécurité</h2>
              <p className="text-body leading-[1.6]">
                Nous protégeons les données personnelles par des contrôles administratifs, techniques et physiques, notamment le chiffrement en transit et au repos, la ségrégation des réseaux, l’accès selon le principe du moindre privilège, l’authentification multifacteur et une surveillance continue. Notre dispositif de sécurité est décrit plus en détail sur{" "}
                <Link href="/security" className="text-link hover:underline">
                  trueaim.ai/security
                </Link>
                .
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Conservation</h2>
              <p className="text-body leading-[1.6]">
                Nous conservons les données personnelles uniquement le temps nécessaire aux finalités de la section 3, ou le temps exigé par la loi. Ces durées s’appliquent :
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Données du formulaire de contact et données des prospects:</strong> dans HubSpot et dans notre Google Workspace : conservées tant que la relation d’affaires est active, et supprimées lorsque nous n’en avons plus besoin.</li>
                <li><strong className="text-strong">Google Analytics 4:</strong> données d’événements 2 mois, données utilisateur 14 mois.</li>
                <li><strong className="text-strong">Journaux serveur du site:</strong> nous ne conservons aucun journal serveur propre. Microsoft Azure, notre hébergeur, traite les données d’accès pour diffuser le site et les conserve selon ses propres règles.</li>
                <li><strong className="text-strong">Cookies et votre choix de consentement:</strong> comme indiqué dans notre <Link href="/cookies" className="text-link hover:underline">politique de cookies</Link>.</li>
                <li><strong className="text-strong">Données des Tenants dans le Service:</strong> supprimées ou restituées au plus tard 90 jours après la fin du contrat du Tenant. Documents de sinistre : 7 ans après la clôture du sinistre, ou à la fin du contrat si elle intervient avant. Données personnelles de la piste d’audit : supprimées ou anonymisées au plus tard à la fin du contrat. L’enregistrement du processus sans données personnelles : 7 ans, comme prévu dans le contrat client.</li>
                <li><strong className="text-strong">Données de compte:</strong> invitations d’utilisateurs 30 jours après acceptation ou expiration ; données des utilisateurs et des adhésions 90 jours après suppression.</li>
                <li><strong className="text-strong">Journaux de sécurité du Service:</strong> 365 jours. Entrées qui identifient des utilisateurs d’un Tenant : 365 jours, ou jusqu’à la fin du contrat si elle intervient avant.</li>
                <li><strong className="text-strong">Pièces comptables:</strong> 10 ans, comme l’exige le droit suisse (art. 958f CO).</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                L’accord de traitement des données conclu avec chaque Tenant fixe les durées contraignantes pour les données des Tenants.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Vos droits</h2>
              <p className="text-body leading-[1.6]">
                Sous réserve du droit applicable (y compris le RGPD et la LPD suisse), vous disposez de droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition. Si vous êtes utilisateur final d’un Tenant, veuillez d’abord contacter le Tenant ; nous l’aiderons à répondre à votre demande. Pour nous contacter directement, écrivez à{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. Vous avez également le droit d’introduire une réclamation auprès d’une autorité de contrôle. En Suisse, le Préposé fédéral à la protection des données et à la transparence (PFPDT) ; dans l’UE, votre autorité locale de protection des données.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Vous pouvez vous opposer à tout moment au traitement fondé sur notre intérêt légitime. Lorsque nous nous appuyons sur votre consentement (cookies d’analyse et suivi HubSpot), vous pouvez le retirer à tout moment, aussi facilement que vous l’avez donné : ouvrez « Préférences en matière de cookies » dans le pied de chaque page. Le retrait n’affecte pas le traitement effectué avant celui-ci.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Décisions automatisées</h2>
              <p className="text-body leading-[1.6]">
                Le Service prend en charge un traitement des sinistres avec intervention humaine. Les résultats de notre intelligence documentaire et de nos modèles de langage sont des recommandations adressées aux opérateurs du Tenant ; les décisions finales sont prises par le personnel autorisé du Tenant. True Aim ne prend à l’égard des utilisateurs finaux aucune décision exclusivement automatisée produisant des effets juridiques les concernant ou les affectant de manière significative de façon similaire.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Modifications de cette politique</h2>
              <p className="text-body leading-[1.6]">
                Nous mettrons cette politique à jour à mesure que nos pratiques évoluent. La date « Dernière mise à jour » en haut de cette page indique la révision la plus récente. Les changements importants seront communiqués aux Tenants actifs.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Contact</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse.<br />
                E-mail :{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
