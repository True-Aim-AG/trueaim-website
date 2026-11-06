import type { FaqItem } from "@/components/content/schema";

/**
 * The FAQ as plain text, published as FAQPage JSON-LD. page.tsx renders its own
 * copy of these answers with links; both move into one source with the content
 * layer (chunk 9).
 */
export const faqs: FaqItem[] = [
  {
    question: "La gestione dei sinistri con IA è ad alto rischio secondo l’AI Act europeo?",
    answer:
      "No. L’allegato III non elenca la gestione dei sinistri. Il punto 5, lettera c), copre solo la valutazione del rischio e la tariffazione nell’assicurazione vita e salute. La bozza di linee guida della Commissione sulla classificazione, del 19 maggio 2026, cita la gestione dei sinistri come esempio di sistema che esula da quel punto, anche per i prodotti di assicurazione salute. Un’attività di gestione sinistri auto, property, garanzia o rami commerciali resta fuori dal regime ad alto rischio, pur rimanendo soggetta al diritto della protezione dei dati e al diritto assicurativo di settore.",
  },
  {
    question: "La gestione dei sinistri con IA è ad alto rischio nell’assicurazione salute?",
    answer:
      "No. L’assicurazione salute è il test più severo della regola, perché la sottoscrizione in quel ramo è ad alto rischio. La bozza di linee guida della Commissione colloca comunque la gestione dei sinistri fuori dal punto 5, lettera c), sulla base del fatto che verificare una richiesta rispetto alle condizioni di polizza o determinare l’importo da pagare è distinto dalla valutazione del rischio o dalla tariffazione.",
  },
  {
    question: "Il differimento a dicembre 2027 si applica alla gestione dei sinistri?",
    answer:
      "Non ha alcun effetto su di essa. L’omnibus digitale ha differito la data da cui iniziano ad applicarsi gli obblighi ad alto rischio. Non ha cambiato quali sistemi sono ad alto rischio. La gestione dei sinistri non era tra questi né prima né dopo il differimento.",
  },
  {
    question: "Cosa ha cambiato il regolamento (UE) 2026/1744?",
    answer:
      "Ha differito gli obblighi ad alto rischio dell’AI Act. I sistemi autonomi dell’allegato III passano dal 2 agosto 2026 al 2 dicembre 2027. L’IA integrata in prodotti regolamentati passa dal 2 agosto 2027 al 2 agosto 2028. È stato pubblicato il 24 luglio 2026 ed è entrato in vigore il 27 luglio 2026.",
  },
  {
    question: "L’articolo 22 del GDPR si applica a una decisione automatizzata su un sinistro?",
    answer:
      "Sì, dove il GDPR è il regime applicabile. L’articolo 22 limita le decisioni basate unicamente su un trattamento automatizzato che producono effetti giuridici o incidono in modo analogo significativamente. Un sinistro respinto o ridotto raggiunge quella soglia. Si applica dal 25 maggio 2018 e non è stato toccato dal differimento dell’AI Act. Le operazioni fuori dall’UE rispondono alla disposizione equivalente del proprio regime, come la legge federale svizzera riveduta sulla protezione dei dati.",
  },
  {
    question: "Cosa conta come intervento umano significativo?",
    answer:
      "Secondo le linee guida del Gruppo di lavoro Articolo 29 (WP251rev.01), la revisione deve essere svolta da qualcuno con l’autorità e la competenza per cambiare la decisione. Dipendenti che si limitano a ratificare risultati generati automaticamente non portano un titolare fuori dall’articolo 22.",
  },
  {
    question: "Cosa dovete rivelare sulla logica di una decisione automatizzata?",
    answer:
      "In Dun & Bradstreet Austria (C-203/22) la CGUE ha richiesto la procedura e i principi effettivamente applicati, comunicati in modo conciso e intelligibile, incluso come l’esito sarebbe cambiato se i dati fossero stati diversi. Fornire l’algoritmo in sé non assolve l’obbligo. Un segreto commerciale non consente un rifiuto generalizzato.",
  },
];
