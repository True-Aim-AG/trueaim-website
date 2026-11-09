import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function PAIAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Manuel PAIA" texture={{ name: "circ", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Dernière mise à jour : 8 février 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-sm text-muted italic">
              Établi conformément au Promotion of Access to Information Act (loi n° 2 de 2000)
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Introduction</h2>
              <p className="text-body leading-[1.6]">
                Le présent manuel PAIA a été établi conformément à l’article 51 du Promotion of Access to Information Act, 2000 (« PAIA ») et intègre les exigences pertinentes du Protection of Personal Information Act, 2013 (« POPIA »). Il a pour objet de définir les procédures de demande d’accès aux documents détenus par <strong className="text-strong">True Aim AG</strong> et de fournir les informations exigées par le PAIA et le POPIA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Coordonnées de la société</h2>
              <div className="space-y-2 text-body leading-[1.6]">
                <p><span className="font-medium text-strong">Raison sociale :</span> True Aim AG</p>
                <p><span className="font-medium text-strong">Numéro d’immatriculation :</span> CHE-325.128.066</p>
                <p><span className="font-medium text-strong">Siège social :</span> Zoug, Suisse</p>
                <p><span className="font-medium text-strong">Adresse enregistrée :</span> c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse</p>
                <p><span className="font-medium text-strong">E-mail de contact :</span>{" "}
                  <a href="mailto:info@trueaim.ai" className="text-link hover:underline">info@trueaim.ai</a>
                </p>
              </div>
              <p className="text-body leading-[1.6] mt-4">
                True Aim AG est une société établie en Suisse et active à l’international, y compris pour certaines activités de traitement de données en lien avec l’Afrique du Sud.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Responsable de l’information (Information Officer)</h2>
              <p className="text-body leading-[1.6]">
                Le responsable de l’information de True Aim AG est le <strong className="text-strong">Chief Executive Officer (CEO) de True Aim AG</strong>. Aucun responsable adjoint de l’information n’a été désigné.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Toute demande relative au PAIA et au POPIA doit être adressée par e-mail à :{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Guide d’utilisation du PAIA</h2>
              <p className="text-body leading-[1.6]">
                La Commission sud-africaine des droits de l’homme a rédigé un guide expliquant comment utiliser le PAIA, y compris la façon de soumettre une demande d’accès. Ce guide est disponible sur le site web ou dans les bureaux de la Commission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Documents disponibles sans demande PAIA</h2>
              <p className="text-body leading-[1.6] mb-4">
                Les documents suivants sont disponibles sans demande PAIA formelle :
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Informations publiées sur le site web de True Aim</li>
                <li>Supports marketing publics</li>
                <li>Articles de blog et études de cas publiés</li>
                <li>Communications publiques d’ordre institutionnel ou réglementaire</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Catégories de documents détenus</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG peut détenir des documents relatifs à son administration, à ses activités commerciales, à ses finances, à son personnel, à ses systèmes d’information, à ses relations d’affaires et à ses obligations de conformité, y compris des informations personnelles au sens du POPIA. L’accès à ces documents est soumis aux limitations et aux motifs de refus prévus par le PAIA et les autres lois applicables.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Documents relatifs aux informations personnelles (POPIA)</h2>
              <p className="text-body leading-[1.6] mb-4">
                True Aim AG traite des informations personnelles à des fins légitimes liées à son activité, notamment :
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Gestion des contacts et des demandes</li>
                <li>Demandes de démo et planification de réunions</li>
                <li>Communications professionnelles</li>
                <li>Fins opérationnelles et administratives</li>
                <li>Conformité légale ou réglementaire</li>
              </ul>
              <p className="text-body leading-[1.6] mt-4">
                Les informations personnelles sont traitées principalement en <strong className="text-strong">Suisse</strong>, avec des garanties techniques et organisationnelles appropriées. Lorsque des informations personnelles concernent des personnes concernées sud-africaines, le traitement est mené d’une manière alignée sur les principes du POPIA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Procédure de demande</h2>
              <p className="text-body leading-[1.6]">
                Les demandes d’accès à des documents doivent être adressées par écrit, par e-mail, au responsable de l’information à{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>. Le demandeur doit fournir des détails suffisants pour identifier le document demandé et indiquer la forme d’accès souhaitée. Une preuve d’identité est exigée avant le traitement de la demande.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Frais</h2>
              <p className="text-body leading-[1.6]">
                Le cas échéant, des frais de demande peuvent être facturés conformément au PAIA. Tous frais applicables seront communiqués avant le traitement de la demande.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Motifs de refus</h2>
              <p className="text-body leading-[1.6]">
                L’accès aux documents peut être refusé pour les motifs prévus par le PAIA, notamment la protection des informations personnelles, des informations commerciales confidentielles, de la propriété intellectuelle et des secrets d’affaires, le secret professionnel de l’avocat et des considérations de sécurité ou de sûreté.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Disponibilité du présent manuel</h2>
              <p className="text-body leading-[1.6]">
                La dernière version du manuel PAIA sera toujours disponible sur cette page ou sur demande si une version plus récente existe mais n’a pas encore été publiée. Vous pouvez la demander par e-mail à{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Mises à jour</h2>
              <p className="text-body leading-[1.6]">
                Le présent manuel peut être mis à jour de temps à autre pour refléter les évolutions de la législation ou des pratiques de l’entreprise.
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
