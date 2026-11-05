import { setRequestLocale } from "next-intl/server";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Termini di utilizzo" texture={{ name: "glass", position: "100% 100%" }}>
        <p className="mt-6 text-sm text-muted">Ultimo aggiornamento: 8 febbraio 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Chi siamo</h2>
            <p className="text-body leading-[1.6]">
              Questo sito web è gestito da <strong className="text-strong">True Aim AG</strong>, numero di iscrizione al registro di commercio <strong className="text-strong">CHE-325.128.066</strong>, con sede legale a Zugo, Svizzera. Indirizzo registrato: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Svizzera. I presenti Termini di utilizzo regolano il vostro accesso a questo sito web e il suo utilizzo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Accettazione dei presenti Termini</h2>
            <p className="text-body leading-[1.6]">
              Accedendo a questo sito web o utilizzandolo, accettate i presenti Termini di utilizzo. Se non li accettate, non dovete utilizzare il sito.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Finalità del sito web</h2>
            <p className="text-body leading-[1.6]">
              Questo sito web è fornito esclusivamente a scopo di informazione generale, richieste commerciali e dimostrazione. È destinato a <strong className="text-strong">utenti professionali</strong>, tra cui clienti, potenziali clienti, investitori, potenziali investitori, partner ecc. Nessun prodotto o servizio viene venduto tramite il sito e nessun contratto si conclude con l’utilizzo del sito.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Nessuna consulenza professionale o vincolante</h2>
            <p className="text-body leading-[1.6]">
              Qualsiasi informazione resa disponibile su questo sito web, comprese le descrizioni di funzionalità, gli esempi, i contenuti del blog, i casi studio e gli strumenti come la Stima dell’impatto, è fornita <strong className="text-strong">a scopo puramente illustrativo e informativo</strong>. Risultati ed esempi non costituiscono consulenza professionale, determinazioni vincolanti o impegni contrattuali e non devono essere considerati tali. Qualsiasi utilizzo della tecnologia di True Aim in ambienti di produzione è soggetto a separati accordi contrattuali.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Avvertenza sul supporto decisionale</h2>
            <p className="text-body leading-[1.6]">
              Dove il sito web fa riferimento ad automazione, valutazioni, stime o esiti, questi intendono descrivere <strong className="text-strong">esclusivamente funzionalità di supporto decisionale</strong>, salvo diverso accordo esplicito in un contratto scritto. La responsabilità finale per decisioni, azioni ed esiti resta all’organizzazione interessata.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Proprietà intellettuale</h2>
            <p className="text-body leading-[1.6]">
              Tutti i contenuti di questo sito web, compresi testi, grafica, loghi, diagrammi e altri materiali, sono di proprietà di True Aim AG o concessi in licenza alla stessa e sono protetti dalle leggi applicabili in materia di proprietà intellettuale. Potete visualizzare e scaricare i contenuti solo per uso interno e non commerciale. Non potete copiare, riprodurre, modificare, distribuire o creare opere derivate senza previa autorizzazione scritta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Utilizzo consentito</h2>
            <p className="text-body leading-[1.6]">
              Potete utilizzare questo sito web solo per scopi leciti e in modo da non violare i diritti altrui né limitare o impedire ad altri l’utilizzo del sito. Non dovete tentare di interferire con il funzionamento o la sicurezza del sito.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Link a terzi</h2>
            <p className="text-body leading-[1.6]">
              Questo sito web può contenere link a siti o servizi di terzi. True Aim AG non è responsabile del contenuto, della disponibilità o delle prassi dei siti di terzi e non li approva.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Disponibilità e modifiche</h2>
            <p className="text-body leading-[1.6]">
              Possiamo modificare, sospendere o interrompere il sito web o qualsiasi sua parte in qualsiasi momento e senza preavviso. Non garantiamo che il sito sia disponibile senza interruzioni o errori.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Limitazione di responsabilità</h2>
            <p className="text-body leading-[1.6]">
              Nella misura massima consentita dalla legge, True Aim AG esclude ogni responsabilità per perdite o danni derivanti da o connessi al vostro utilizzo di questo sito web, all’impossibilità di utilizzarlo o all’affidamento sui suoi contenuti.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Legge applicabile e foro competente</h2>
            <p className="text-body leading-[1.6]">
              I presenti Termini di utilizzo sono regolati dal diritto <strong className="text-strong">svizzero</strong>. Qualsiasi controversia connessa ai presenti Termini di utilizzo è soggetta alla giurisdizione esclusiva dei tribunali competenti della Svizzera.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Modifiche ai presenti Termini</h2>
            <p className="text-body leading-[1.6]">
              Possiamo aggiornare di tanto in tanto i presenti Termini di utilizzo. La versione più recente sarà sempre disponibile su questa pagina o su richiesta, se esiste una versione successiva non ancora pubblicata.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Contatti</h2>
            <p className="text-body leading-[1.6]">
              Se avete domande sui presenti Termini di utilizzo, potete contattarci a{" "}
              <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                info@trueaim.ai
              </a>.
            </p>
            <p className="text-body leading-[1.6] mt-2">
              Società: True Aim AG<br />
              Sede legale: Zugo, Svizzera
            </p>
          </section>

          <div className="pt-4">
            <ButtonLink href="/contact" variant="primary" size="md">
              Contattaci
            </ButtonLink>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
