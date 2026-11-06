import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Supporto clienti" texture={{ name: "glass", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Ultimo aggiornamento:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Come contattarci</h2>
              <p className="text-body leading-[1.6]">
                Per l’assistenza sul prodotto, scrivete a{" "}
                <a href="mailto:support@trueaim.ai" className="text-link hover:underline">support@trueaim.ai</a>. Indicate il nome del vostro tenant, l’utente interessato, una descrizione del problema ed eventuali schermate o messaggi di errore.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Orari e tempi di risposta</h2>
              <p className="text-body leading-[1.6] mb-3">
                L’orario di lavoro è dal lunedì al venerdì, dalle 9:00 alle 18:00, ora dell’Europa centrale, esclusi i giorni festivi svizzeri. I nostri tempi di prima risposta indicativi sono:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Gravità 1 (interruzione della produzione o perdita di dati):</strong> entro 4 ore lavorative.</li>
                <li><strong className="text-strong">Gravità 2 (funzionalità principale non disponibile):</strong> entro 1 giorno lavorativo.</li>
                <li><strong className="text-strong">Gravità 3 / 4 (domande, problemi minori):</strong> entro 3 giorni lavorativi.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                I livelli di servizio specifici per i clienti paganti sono regolati dal contratto applicabile.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Altri canali di contatto</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Vendite e partnership:{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-link hover:underline">hello@trueaim.ai</a>
                </li>
                <li>Privacy e protezione dei dati:{" "}
                  <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>{" "}
                  (si veda{" "}
                  <Link href="/privacy" className="text-link hover:underline">Informativa sulla privacy</Link>)
                </li>
                <li>Segnalazioni di sicurezza:{" "}
                  <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>{" "}
                  (si veda{" "}
                  <Link href="/security" className="text-link hover:underline">Sicurezza</Link>)
                </li>
                <li>Etica e segnalazioni confidenziali:{" "}
                  <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>{" "}
                  (si veda{" "}
                  <Link href="/ethics" className="text-link hover:underline">Etica e segnalazioni</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
