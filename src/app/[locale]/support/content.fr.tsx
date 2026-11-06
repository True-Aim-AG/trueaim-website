import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Assistance client" texture={{ name: "glass", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Dernière mise à jour :</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Comment nous joindre</h2>
              <p className="text-body leading-[1.6]">
                Pour l’assistance produit, écrivez à{" "}
                <a href="mailto:support@trueaim.ai" className="text-link hover:underline">support@trueaim.ai</a>. Merci d’indiquer le nom de votre tenant, l’utilisateur concerné, une description du problème et toute capture d’écran ou message d’erreur.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Horaires et délais de réponse</h2>
              <p className="text-body leading-[1.6] mb-3">
                Nos horaires sont du lundi au vendredi, de 9 h à 18 h, heure d’Europe centrale, hors jours fériés suisses. Nos délais de première réponse cibles sont :
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Gravité 1 (panne de production ou perte de données) :</strong> sous 4 heures ouvrées.</li>
                <li><strong className="text-strong">Gravité 2 (fonctionnalité majeure indisponible) :</strong> sous 1 jour ouvré.</li>
                <li><strong className="text-strong">Gravité 3 / 4 (questions, problèmes mineurs) :</strong> sous 3 jours ouvrés.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Les niveaux de service spécifiques aux clients payants sont régis par le contrat applicable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Autres canaux de contact</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Ventes et partenariats :{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-link hover:underline">hello@trueaim.ai</a>
                </li>
                <li>Confidentialité et protection des données :{" "}
                  <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>{" "}
                  (voir{" "}
                  <Link href="/privacy" className="text-link hover:underline">Politique de confidentialité</Link>)
                </li>
                <li>Signalements de sécurité :{" "}
                  <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>{" "}
                  (voir{" "}
                  <Link href="/security" className="text-link hover:underline">Sécurité</Link>)
                </li>
                <li>Éthique et signalements confidentiels :{" "}
                  <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>{" "}
                  (voir{" "}
                  <Link href="/ethics" className="text-link hover:underline">Éthique et signalement</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
