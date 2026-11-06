/**
 * The FAQ, in one place. `page.tsx` renders `answer` and `layout.tsx`
 * publishes it as FAQPage JSON-LD, so the visible answers and the
 * machine-readable ones are the same text.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Perché l’automazione dei sinistri non ha eliminato i ritardi tra le aziende?",
    answer:
      "L’automazione tradizionale opera dentro le vostre mura. Accelera la postazione interna, ma l’attrito migra semplicemente ai passaggi di consegna tra organizzazioni. Un assicuratore può analizzare una denuncia di sinistro in quattro secondi, eppure i liquidatori perdono ancora quarantotto ore a inseguire un preventivo PDF di un riparatore esterno. Finché non si elimina quella tassa di navigazione tra aziende, la catena resta lenta.",
  },
  {
    question: "Un fascicolo condiviso significa che ogni parte vede tutto?",
    answer:
      "No. Ogni partecipante opera strettamente entro la propria autorizzazione definita. L’assicuratore configura le regole di accesso una volta, e le barriere informative le applicano su tutta la rete. Gli assicurati seguono la verifica dei documenti, gli intermediari monitorano i limiti del binder e i fornitori ricevono approvazioni voce per voce. Ogni parte lavora sulla stessa verità sottostante senza esporre dati riservati.",
  },
  {
    question: 'Cosa significa «provenienza a livello di riga» nella pratica?',
    answer:
      "Significa difendibilità fin dalla progettazione. Per ogni decisione il sistema scrive nel fascicolo quattro primitive: i fatti e i documenti di origine, il testo di polizza in vigore, il ragionamento in linguaggio semplice e l’attore responsabile (umano o IA). Se un liquidatore annulla una raccomandazione, la motivazione viene conservata. Non una scatola nera, ma una scatola di vetro.",
  },
  {
    question: "Gli assicuratori devono sostituire i loro sistemi core per i sinistri?",
    answer:
      "No. Le sostituzioni di piattaforma pluriennali sono troppo lente e comportano rischi di consegna inaccettabili. Un sistema operativo agentico orchestra al di sopra dei vostri sistemi di riferimento esistenti tramite API standard. Potete iniziare con un singolo modulo ad alto attrito, come il confronto dei prezzi di riparazione o la verifica della copertura, ed espandervi man mano che il fascicolo dimostra il proprio valore.",
  },
  {
    question: "L’obiettivo è ridurre il personale sinistri?",
    answer:
      "Il principio progettuale è la valorizzazione dell’umano, non la riduzione del lavoro. Eliminare l’amministrazione a basso rendimento (la lettura, la ridigitazione e gli inseguimenti telefonici) restituisce ore ai vostri specialisti. I liquidatori recuperano tempo per le decisioni ad alta posta: risolvere casi limite complessi, assistere assicurati in difficoltà e affinare le regole di sottoscrizione.",
  },
  {
    question: "Qual è il punto di partenza più pratico?",
    answer:
      "Un pilota circoscritto. Portate una rete di partner e una linea di business su un fascicolo condiviso. In novanta giorni misurate i segnali reali: meno richieste di stato, tempi di gestione delle fatture più rapidi e un calo misurabile delle liquidazioni contestate.",
  },
];
