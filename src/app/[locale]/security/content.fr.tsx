import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-10-31";

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="La sécurité chez True Aim" texture={{ name: "circ", position: "12% 88%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Dernière mise à jour :</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="bg-lilac rounded-[12px] px-8 py-6 mb-8">
            <p className="text-body leading-[1.6]">
              <strong className="text-strong">Signaler une vulnérabilité :</strong>{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline font-medium">
                security@trueaim.ai
              </a>
              . Nous accusons réception des signalements sous 5 jours ouvrés. Voir{" "}
              <a href="#responsible-disclosure" className="text-link hover:underline">
                Divulgation responsable
              </a>.
            </p>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG exploite une plateforme de traitement des sinistres pour les assureurs, les courtiers et toute entité de la chaîne de valeur de l’assurance qui gère ou traite des sinistres. La sécurité est une exigence fondamentale de notre Service, et nos clients nous confient les données personnelles de leurs assurés. Cette page décrit notre programme de sécurité dans ses grandes lignes. Pour des preuves complètes de niveau audit (rapport SOC 2 Type II une fois émis, certificat ISO 27001, liste des sous-traitants ultérieurs, accord de traitement des données), contactez{" "}
              <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Ces documents sont disponibles sous accord de confidentialité (NDA).
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Cadres de conformité</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">ISO/IEC 27001:2022</strong> : certifié par A-LIGN, certificat ISMS-TR-090426, délivré le 4 septembre 2026, valable jusqu’au 4 septembre 2029.</li>
                <li><strong className="text-strong">SOC 2 Type II</strong> : audité, couvrant la période du 1er mai au 31 juillet 2026 ; le rapport final a été émis.</li>
                <li><strong className="text-strong">LPD suisse</strong> et <strong className="text-strong">RGPD</strong> : aligné en qualité de sous-traitant pour les données des clients.</li>
                <li><strong className="text-strong">AI Act</strong> (règlement européen sur l’IA) : dossier technique IA (AI Technical File) tenu à jour pour Automated Coverage Check ; l’état de préparation actuel est documenté et suivi.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Où les données sont traitées</h2>
              <p className="text-body leading-[1.6]">
                Les données des clients au repos sont stockées sur Microsoft Azure dans la région Switzerland North. L’hébergement et l’inférence IA restent en Suisse, dans l’EEE ou au Royaume-Uni ; les exceptions figurent dans la liste des sous-traitants ultérieurs, annexe 2 de notre accord de traitement des données.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Sous-traitants ultérieurs</h2>
              <p className="text-body leading-[1.6]">
                Nous utilisons un ensemble limité de services Microsoft Azure pour l’hébergement, l’inférence IA et la télémétrie opérationnelle, ainsi que Google Cloud (modèles Gemini pour l’inférence IA dans l’UE), Google Workspace (messagerie professionnelle), Slack (communication interne de l’équipe) et Sentry (journaux d’erreurs techniques uniquement). La liste actuelle constitue l’annexe 2 de notre accord de traitement des données et est disponible sur demande. Nous informons les clients à l’avance de tout changement. Les outils strictement internes (gestion du code source, CI/CD, CRM) qui ne traitent pas de données de production des Tenants ne sont pas des sous-traitants ultérieurs vis-à-vis de nos clients et ne sont pas listés.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Chiffrement</h2>
              <p className="text-body leading-[1.6]">
                Toutes les données sont chiffrées en transit (TLS 1.2 ou supérieur) et au repos (AES-256 via le chiffrement de la plateforme Azure). Les secrets applicatifs sont stockés dans Azure Key Vault, avec suppression réversible (soft delete) et protection contre la purge activées.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contrôle d’accès</h2>
              <p className="text-body leading-[1.6]">
                L’accès aux données des clients est réservé au personnel autorisé de True Aim, selon le principe du moindre privilège et du besoin d’en connaître, appliqué par des contrôles d’accès basés sur les rôles et des identités managées Azure. L’authentification multifacteur est obligatoire pour tous les comptes des employés.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Surveillance et réponse aux incidents</h2>
              <p className="text-body leading-[1.6]">
                Nous exploitons une journalisation, des alertes et une surveillance continues de l’environnement de production via Microsoft Defender for Cloud et Azure Monitor. Nous disposons d’une procédure documentée de réponse aux incidents. Les clients sont informés des incidents de sécurité confirmés affectant leurs données dans les meilleurs délais et conformément à notre accord de traitement des données.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Gestion des vulnérabilités</h2>
              <p className="text-body leading-[1.6]">
                Nous surveillons nos dépendances logicielles et notre infrastructure à la recherche de vulnérabilités connues, par analyse automatisée et via Microsoft Defender. Les constats sont triés selon des SLA de gravité documentés. Nous faisons appel à des testeurs d’intrusion tiers de façon récurrente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Sécurité du personnel</h2>
              <p className="text-body leading-[1.6]">
                Tout le personnel fait l’objet d’une vérification des antécédents, accepte des obligations de confidentialité et suit une formation de sensibilisation à la sécurité et à la protection des données.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Continuité d’activité</h2>
              <p className="text-body leading-[1.6]">
                Les données des clients sont sauvegardées selon un calendrier régulier, avec des procédures de restauration documentées. Nous testons périodiquement nos procédures de reprise après sinistre.
              </p>
            </section>

            <section id="responsible-disclosure" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Divulgation responsable</h2>
              <p className="text-body leading-[1.6]">
                Si vous pensez avoir découvert une vulnérabilité de sécurité dans notre Service ou sur ce site web, veuillez la signaler à{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Nous nous engageons à accuser réception de votre signalement sous 5 jours ouvrés et à collaborer avec vous de bonne foi pour analyser et corriger les problèmes vérifiés. Nous n’engagerons aucune action en justice contre les chercheurs qui suivent ce processus de divulgation, agissent de bonne foi et ne consultent, ne modifient ni ne suppriment aucune donnée au-delà de ce qui est nécessaire pour démontrer une vulnérabilité. Voir aussi notre canal{" "}
                <Link href="/ethics" className="text-link hover:underline">Éthique et signalement</Link>{" "}
                pour les manquements sans lien avec la sécurité.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contact</h2>
              <p className="text-body leading-[1.6]">
                Pour les questions de sécurité :{" "}
                <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>. Pour les questions de confidentialité et de protection des données :{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
