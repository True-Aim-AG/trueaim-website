import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Conditions d’utilisation" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted">Dernière mise à jour : 8 février 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Qui nous sommes</h2>
            <p className="text-body leading-[1.6]">
              Ce site web est exploité par <strong className="text-strong">True Aim AG</strong>, numéro d’inscription au registre du commerce <strong className="text-strong">CHE-325.128.066</strong>, dont le siège social est à Zoug, en Suisse. Adresse enregistrée : c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse. Les présentes conditions d’utilisation régissent votre accès à ce site web et son utilisation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Acceptation des présentes conditions</h2>
            <p className="text-body leading-[1.6]">
              En accédant à ce site web ou en l’utilisant, vous acceptez les présentes conditions d’utilisation. Si vous ne les acceptez pas, vous ne devriez pas utiliser le site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Objet du site web</h2>
            <p className="text-body leading-[1.6]">
              Ce site web est fourni uniquement à des fins d’information générale, de demandes commerciales et de démonstration. Il s’adresse aux <strong className="text-strong">utilisateurs professionnels</strong>, notamment les clients, les clients potentiels, les investisseurs, les investisseurs potentiels, les partenaires, etc. Aucun produit ni service n’est vendu par l’intermédiaire du site et aucun contrat n’est conclu par l’utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Absence de conseil professionnel ou contraignant</h2>
            <p className="text-body leading-[1.6]">
              Toute information mise à disposition sur ce site web, y compris les descriptions de capacités, les exemples, le contenu du blog, les études de cas et les outils tels que l’Estimateur d’impact, est fournie <strong className="text-strong">à titre purement illustratif et informatif</strong>. Les résultats et les exemples ne constituent ni un conseil professionnel, ni une détermination contraignante, ni un engagement contractuel, et ne doivent pas être considérés comme tels. Toute utilisation de la technologie de True Aim en environnement de production fait l’objet d’accords contractuels distincts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Avertissement sur l’aide à la décision</h2>
            <p className="text-body leading-[1.6]">
              Lorsque le site web fait référence à l’automatisation, à des évaluations, à des estimations ou à des résultats, ceux-ci visent à décrire <strong className="text-strong">des capacités d’aide à la décision uniquement</strong>, sauf accord contraire explicite dans un contrat écrit. La responsabilité finale des décisions, des actions et des résultats reste à l’organisation concernée.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Propriété intellectuelle</h2>
            <p className="text-body leading-[1.6]">
              L’ensemble du contenu de ce site web, y compris les textes, graphiques, logos, schémas et autres éléments, appartient à True Aim AG ou lui est concédé sous licence, et est protégé par les lois applicables en matière de propriété intellectuelle. Vous pouvez consulter et télécharger le contenu à des fins internes et non commerciales uniquement. Vous ne pouvez pas copier, reproduire, modifier, distribuer ni créer d’œuvres dérivées sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Utilisation autorisée</h2>
            <p className="text-body leading-[1.6]">
              Vous ne pouvez utiliser ce site web qu’à des fins licites et d’une manière qui ne porte pas atteinte aux droits d’autrui et ne restreint ni n’entrave l’utilisation du site par d’autres. Vous ne devez pas tenter de perturber le fonctionnement ou la sécurité du site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Liens vers des tiers</h2>
            <p className="text-body leading-[1.6]">
              Ce site web peut contenir des liens vers des sites ou services tiers. True Aim AG n’est pas responsable du contenu, de la disponibilité ou des pratiques des sites tiers et ne les approuve pas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Disponibilité et modifications</h2>
            <p className="text-body leading-[1.6]">
              Nous pouvons modifier, suspendre ou interrompre le site web ou toute partie de celui-ci à tout moment et sans préavis. Nous ne garantissons pas que le site sera disponible sans interruption ni erreur.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Limitation de responsabilité</h2>
            <p className="text-body leading-[1.6]">
              Dans toute la mesure permise par la loi, True Aim AG exclut toute responsabilité pour les pertes ou dommages découlant de votre utilisation de ce site web, de l’impossibilité de l’utiliser ou de la confiance accordée à son contenu, ou en lien avec ceux-ci.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Droit applicable et juridiction</h2>
            <p className="text-body leading-[1.6]">
              Les présentes conditions d’utilisation sont régies par le droit <strong className="text-strong">suisse</strong>. Tout litige en lien avec les présentes conditions d’utilisation relève de la compétence exclusive des tribunaux compétents de Suisse.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Modifications des présentes conditions</h2>
            <p className="text-body leading-[1.6]">
              Nous pouvons mettre à jour les présentes conditions d’utilisation de temps à autre. La dernière version sera toujours disponible sur cette page ou sur demande si une version plus récente existe mais n’a pas encore été publiée.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Contact</h2>
            <p className="text-body leading-[1.6]">
              Pour toute question concernant les présentes conditions d’utilisation, vous pouvez nous contacter à{" "}
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
