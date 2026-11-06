import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Etica e segnalazioni confidenziali" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Ultimo aggiornamento:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG si impegna a operare con integrità e a offrire un canale sicuro per sollevare preoccupazioni su possibili condotte scorrette, violazioni etiche, problemi di sicurezza o privacy, o violazioni della legge o delle politiche aziendali.
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Come segnalare</h2>
              <p className="text-body leading-[1.6]">
                Inviate un’e-mail a{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>. Questa casella è monitorata dal CEO. Potete includere tanti o pochi dettagli, a vostra scelta.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Segnalare in forma anonima</h2>
              <p className="text-body leading-[1.6] mb-3">
                Se preferite segnalare in forma anonima, potete:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Inviare l’e-mail da un provider di posta anonimo (ad esempio un account webmail gratuito che non vi identifichi).</li>
                <li>Inviare una lettera a: True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera, con la dicitura «Confidenziale: segnalazione etica».</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Non cercheremo di identificare chi segnala in forma anonima. Porremo tuttavia, ove possibile, domande di approfondimento tramite lo stesso canale.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Come gestiamo le segnalazioni</h2>
              <p className="text-body leading-[1.6]">
                Le segnalazioni sono esaminate dal CEO. Se una segnalazione riguarda il CEO, va indirizzata al presidente del consiglio di amministrazione allo stesso indirizzo, alla sua attenzione. Confermiamo la ricezione delle segnalazioni non anonime entro cinque giorni lavorativi. Le indagini sono condotte nel modo più riservato possibile, in coerenza con il nostro dovere di indagare e porre rimedio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Divieto di ritorsione</h2>
              <p className="text-body leading-[1.6]">
                True Aim vieta ogni ritorsione contro chi, in buona fede, solleva una preoccupazione tramite questo canale o partecipa a un’indagine. La ritorsione è essa stessa motivo di provvedimento disciplinare, fino al licenziamento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Politiche correlate</h2>
              <p className="text-body leading-[1.6]">
                Questo canale è descritto nel nostro Codice di condotta e nella nostra Policy sul whistleblowing, disponibili per dipendenti e collaboratori esterni e, su richiesta, per i terzi scrivendo a{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
