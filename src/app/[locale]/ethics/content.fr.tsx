import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Éthique et signalement confidentiel" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Dernière mise à jour :</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG s’engage à agir avec intégrité et à offrir un canal sûr pour faire part de préoccupations concernant d’éventuels manquements, violations éthiques, problèmes de sécurité ou de confidentialité, ou infractions à la loi ou aux politiques de l’entreprise.
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Comment signaler</h2>
              <p className="text-body leading-[1.6]">
                Envoyez un e-mail à{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>. Cette boîte de réception est consultée par le CEO. Vous pouvez donner autant ou aussi peu de détails que vous le souhaitez.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Effectuer un signalement anonyme</h2>
              <p className="text-body leading-[1.6] mb-3">
                Si vous préférez effectuer un signalement anonyme, vous pouvez :
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Envoyer votre e-mail depuis un fournisseur de messagerie anonyme (par exemple un compte webmail gratuit qui ne vous identifie pas).</li>
                <li>Envoyer un courrier à : True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Suisse, avec la mention « Confidentiel : signalement éthique ».</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Nous ne chercherons pas à identifier les auteurs de signalements anonymes. Nous poserons toutefois, lorsque c’est possible, des questions complémentaires par le même canal.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Comment nous traitons les signalements</h2>
              <p className="text-body leading-[1.6]">
                Les signalements sont examinés par le CEO. Si un signalement concerne le CEO, il doit être adressé au président du conseil d’administration à la même adresse, à son attention. Nous accusons réception des signalements non anonymes sous cinq jours ouvrés. Les enquêtes sont menées de la façon la plus confidentielle possible, dans le respect de notre devoir d’enquêter et d’y remédier.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Interdiction des représailles</h2>
              <p className="text-body leading-[1.6]">
                True Aim interdit toutes représailles à l’encontre de quiconque fait part de bonne foi d’une préoccupation par ce canal ou participe à une enquête. Les représailles constituent elles-mêmes un motif de sanction disciplinaire pouvant aller jusqu’au licenciement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Politiques associées</h2>
              <p className="text-body leading-[1.6]">
                Ce canal est décrit dans notre code de conduite et notre politique relative aux lanceurs d’alerte, dont des copies sont disponibles pour les employés et les prestataires, et pour les tiers sur demande à{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
