import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/brand/Button";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Politique de confidentialité (version précédente)
          </h1>
          <p className="text-sm text-muted mb-2">
            Dernière mise à jour : 8 février 2026
          </p>
          <div className="bg-lilac rounded-pill px-8 py-6 mb-8">
            <p className="text-sm text-body leading-[1.6]">
              Ceci est une version précédente archivée de notre politique de confidentialité. La politique en vigueur se trouve à l’adresse{" "}
              <Link href="/privacy" className="text-link hover:underline font-medium">
                trueaim.ai/privacy
              </Link>.
            </p>
          </div>

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Qui nous sommes</h2>
              <p className="text-body leading-[1.6]">
                Ce site web est exploité par <strong className="text-strong">True Aim AG</strong>, numéro d’immatriculation <strong className="text-strong">CHE-325.128.066</strong>, dont le siège social est situé à Zoug, en Suisse. Adresse enregistrée : c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse. La présente politique de confidentialité explique comment nous collectons, utilisons et protégeons les données personnelles lorsque vous interagissez avec notre site web.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Champ d’application de la présente politique</h2>
              <p className="text-body leading-[1.6]">
                La présente politique de confidentialité s’applique aux données personnelles collectées via notre site web public, y compris les formulaires de contact, les formulaires de demande de démo et les liens de prise de rendez-vous. Elle ne régit pas le traitement des données dans le cadre d’accords commerciaux ou de contrats clients, qui sont soumis à des conditions contractuelles distinctes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Données personnelles que nous collectons</h2>
              <p className="text-body leading-[1.6]">
                Nous collectons les données personnelles que vous nous fournissez volontairement lorsque vous nous contactez ou demandez une démonstration. Il peut s’agir de vos nom et prénom, de votre adresse e-mail professionnelle, du nom de votre entreprise, de votre fonction, de votre pays et de toute information que vous choisissez d’indiquer dans les champs de texte libre ou que vous nous transmettez ponctuellement à notre demande. Si vous prenez rendez-vous via un lien d’agenda, nous pouvons également recevoir des informations liées à la planification. Nous pouvons en outre collecter des données techniques telles que, entre autres, l’adresse IP, le type de navigateur et des données d’utilisation, par le biais de cookies et d’outils d’analyse.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Comment nous utilisons les données personnelles</h2>
              <p className="text-body leading-[1.6]">
                Nous utilisons les données personnelles pour répondre aux demandes, organiser des démos ou des rendez-vous, communiquer avec des clients et partenaires potentiels, améliorer notre site web et comprendre comment il est utilisé. Lorsque vous y avez consenti, nous pouvons également utiliser vos coordonnées pour vous envoyer des communications pertinentes au sujet de True Aim et de nos services. Nous ne vendons pas de données personnelles et ne les utilisons pas à des fins de prise de décision automatisée affectant des personnes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Base juridique du traitement</h2>
              <p className="text-body leading-[1.6]">
                Nous traitons les données personnelles sur la base de votre consentement, de nos intérêts légitimes à exploiter et améliorer notre site web et à répondre aux demandes commerciales et, le cas échéant, pour respecter des obligations légales. Vous pouvez retirer votre consentement à tout moment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Hébergement des données et transferts internationaux</h2>
              <p className="text-body leading-[1.6]">
                Notre infrastructure principale d’hébergement et de sécurité des données est située en <strong className="text-strong">Suisse</strong>. Les données personnelles peuvent être consultées ou traitées depuis d’autres juridictions lorsque cela est nécessaire pour exploiter notre site web ou soutenir nos activités. En cas de transfert international, nous prenons les mesures appropriées pour assurer une protection adéquate des données, en accord avec les normes suisses et de l’UE.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Conservation des données</h2>
              <p className="text-body leading-[1.6]">
                Nous ne conservons les données personnelles que le temps nécessaire aux finalités décrites dans la présente politique, sauf si une durée de conservation plus longue est exigée ou autorisée par la loi. Les informations transmises via les formulaires de contact ou de démonstration sont généralement conservées à des fins de suivi commercial et de tenue de registres.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Sécurité des données</h2>
              <p className="text-body leading-[1.6]">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre l’accès non autorisé, la perte ou l’utilisation abusive. Bien qu’aucun système ne puisse être garanti totalement sûr, nous prenons la protection des données au sérieux et nous efforçons de mettre en place les garanties appropriées.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Vos droits</h2>
              <p className="text-body leading-[1.6]">
                Selon votre lieu de résidence et le droit applicable, vous pouvez avoir le droit de demander l’accès à vos données personnelles, d’en demander la rectification ou l’effacement, de vous opposer au traitement ou d’en demander la limitation, ou de retirer votre consentement. Vous pouvez adresser vos demandes en nous contactant à{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Afrique du Sud et POPIA</h2>
              <p className="text-body leading-[1.6]">
                Lorsque des données personnelles sont traitées en Afrique du Sud ou depuis ce pays, nous prenons des mesures pour nous aligner sur le Protection of Personal Information Act (POPIA). Notre{" "}
                <Link href="/paia" className="text-link hover:underline">
                  manuel PAIA
                </Link>{" "}
                fournit de plus amples informations sur les demandes d’accès à l’information en vertu du droit sud-africain.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Cookies et outils d’analyse</h2>
              <p className="text-body leading-[1.6]">
                Nous utilisons des cookies et des technologies similaires comme décrit dans notre{" "}
                <Link href="/cookies" className="text-link hover:underline">
                  politique relative aux cookies
                </Link>. Les outils d’analyse nous aident à comprendre l’utilisation du site web et à en améliorer les performances. Vous pouvez gérer vos préférences en matière de cookies à tout moment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Modifications de la présente politique</h2>
              <p className="text-body leading-[1.6]">
                Nous pouvons mettre à jour la présente politique de confidentialité de temps à autre pour refléter l’évolution des exigences légales, des technologies ou de nos pratiques. La dernière version sera toujours disponible sur cette page, ou sur demande si une version plus récente existe mais n’a pas encore été publiée.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Contact</h2>
              <p className="text-body leading-[1.6]">
                Si vous avez des questions concernant la présente politique de confidentialité ou la manière dont nous traitons les données personnelles, vous pouvez nous contacter à{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Société : True Aim AG<br />
                Siège social : Zoug, Suisse
              </p>
            </section>

            <div className="pt-4">
              <ButtonLink href="/contact" variant="primary" size="md">
                Nous contacter
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
