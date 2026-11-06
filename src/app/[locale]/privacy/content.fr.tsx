import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-10-19";

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
                <li><strong className="text-strong">Données du site web :</strong> adresse IP, métadonnées du navigateur et pages visitées, collectées via les journaux serveur standard et, uniquement après votre acceptation des cookies d’analyse, via Google Tag Manager et Google Analytics 4, comme décrit dans notre politique relative aux cookies.</li>
                <li><strong className="text-strong">Données du formulaire de contact :</strong> les informations que vous saisissez dans le formulaire, ainsi que les champs d’attribution que le site enregistre avec votre envoi : la page sur laquelle vous êtes arrivé, le site référent, les paramètres de campagne (UTM) et votre réponse à « Comment avez-vous entendu parler de nous ? ». Ces données sont envoyées à HubSpot, notre CRM, et une copie est inscrite dans une feuille de calcul de notre Google Workspace, qui notifie notre équipe par e-mail (voir section 5).</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Bases juridiques du traitement (RGPD / LPD suisse)</h2>
              <p className="text-body leading-[1.6]">
                Exécution du contrat, intérêt légitime à exploiter et sécuriser le Service, consentement lorsqu’il est requis, et obligation légale.
              </p>
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
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, hébergé dans le centre de données européen de HubSpot en Allemagne) : reçoit les envois du formulaire de contact, y compris les champs d’attribution listés à la section 2, et, uniquement après votre acceptation des cookies d’analyse, enregistre vos visites sur ce site.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited) : une feuille de calcul de notre Google Workspace reçoit une copie de chaque envoi du formulaire de contact et adresse une notification par e-mail à notre équipe.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong> : l’agence qui travaille sur la performance de notre site, avec un accès à Google Tag Manager, Google Analytics et Google Search Console ; elle n’a aucun accès aux données des clients ou des Tenants.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Transferts internationaux</h2>
              <p className="text-body leading-[1.6]">
                Les données personnelles traitées dans le Service sont stockées en Suisse. Les données du formulaire de contact sont stockées dans l’Union européenne, dans le centre de données européen de HubSpot et dans notre Google Workspace. Lorsqu’un traitement a lieu hors de Suisse, de l’UE ou de l’EEE, y compris des transferts vers les États-Unis, nous nous appuyons sur les cadres EU-U.S. et Swiss-U.S. Data Privacy Framework ou sur les clauses contractuelles types. Notre liste des sous-traitants ultérieurs indique le lieu et la base du transfert pour chaque prestataire.
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
                Nous ne conservons les données personnelles que le temps nécessaire pour fournir le Service et respecter nos obligations légales. Les données du Tenant sont conservées pendant la durée de son abonnement, plus la période de restitution/suppression convenue contractuellement. Les durées de conservation spécifiques sont documentées dans notre calendrier interne de conservation des données et reflétées dans l’accord de traitement des données conclu avec chaque Tenant.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Vos droits</h2>
              <p className="text-body leading-[1.6]">
                Sous réserve du droit applicable (y compris le RGPD et la LPD suisse), vous disposez de droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition. Si vous êtes utilisateur final d’un Tenant, veuillez d’abord contacter le Tenant ; nous l’aiderons à répondre à votre demande. Pour nous contacter directement, écrivez à{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. Vous avez également le droit d’introduire une réclamation auprès d’une autorité de contrôle. En Suisse, le Préposé fédéral à la protection des données et à la transparence (PFPDT) ; dans l’UE, votre autorité locale de protection des données.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Décisions automatisées</h2>
              <p className="text-body leading-[1.6]">
                Le Service prend en charge un traitement des sinistres avec intervention humaine. Les résultats de notre intelligence documentaire et de nos modèles de langage sont des recommandations adressées aux opérateurs du Tenant ; les décisions finales sont prises par le personnel autorisé du Tenant. True Aim ne prend à l’égard des utilisateurs finaux aucune décision exclusivement automatisée produisant des effets juridiques ou les affectant de manière similaire.
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
