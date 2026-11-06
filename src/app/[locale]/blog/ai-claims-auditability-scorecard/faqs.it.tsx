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
    question:
      "Quali domande porre prima di adottare l’IA nella gestione dei sinistri?",
    answer:
      "Dodici, in quattro gruppi. Provenienza: da dove viene ogni valore, se l’ha prodotto una regola o un modello e cosa fa il sistema quando le prove sono incomplete. Ricostruzione: se una decisione può essere ricostruita un anno dopo, se le versioni che l’hanno prodotta sono nel fascicolo, chi può modificare il fascicolo e per quanto tempo viene conservato. Giudizio umano: cosa vede il revisore, se gli interventi umani vengono registrati e se se ne trae insegnamento, e se ogni decisione può essere spiegata al richiedente dal solo fascicolo. Continuità: le prestazioni su sinistri che il sistema non ha mai visto, la portabilità delle registrazioni all’uscita e dove risiedono il trattamento dei dati e la responsabilità.",
  },
  {
    question:
      "Il differimento dell’AI Act europeo a dicembre 2027 cambia qualcosa per la gestione dei sinistri?",
    answer:
      "No. Il regolamento (UE) 2026/1744 ha spostato al 2 dicembre 2027 la data da cui la maggior parte degli obblighi «alto rischio» si applica ai sistemi indipendenti elencati nell’allegato III. La gestione dei sinistri non è elencata nell’allegato III, e i diritti di una persona soggetta a una decisione esclusivamente automatizzata si applicano ai sensi del GDPR dal 25 maggio 2018. Il differimento cambia il calendario per altri sistemi. Non cambia ciò che un’organizzazione sinistri deve alle persone sui cui sinistri decide.",
  },
  {
    question: "Cosa rende verificabile una decisione di IA su un sinistro?",
    answer:
      "Quattro proprietà. Ogni valore usato dalla decisione risale al documento di origine e alla pagina. La decisione può essere ricostruita in seguito, perché le regole, la versione della polizza e il modello che l’hanno prodotta sono registrati sulla decisione stessa. Una persona con l’autorità di cambiare l’esito l’ha esaminata con le prove davanti. E il fascicolo ha manomissioni rilevabili, è esportabile e viene conservato per tutto il tempo richiesto dagli obblighi dell’organizzazione.",
  },
  {
    question:
      "Un’approvazione umana basta a rendere difendibile una decisione automatizzata su un sinistro?",
    answer:
      "Solo se la revisione è reale. Il revisore deve vedere le prove dietro la raccomandazione e avere l’autorità e la competenza per modificarla. Un’approvazione che nessuno potrebbe realisticamente rifiutare lascia la decisione esclusivamente automatizzata nella sostanza, e ai sensi del GDPR la persona interessata conserva i diritti che ne derivano.",
  },
  {
    question: "Le decisioni di IA sui sinistri possono essere deterministiche?",
    answer:
      "In larga parte sì. Dove una polizza, un catalogo o un regolamento è convertito in un albero decisionale, l’esito è calcolato dai fatti e gli stessi input producono sempre la stessa decisione. I modelli servono per leggere prove non strutturate e risolvere voci davvero ambigue, e un fascicolo ben progettato marca quelle righe come probabilistiche così che le due cose non vengano mai confuse.",
  },
  {
    question: "Cosa dovrebbe aspettarsi un assicuratore svizzero da un sistema di IA per i sinistri?",
    answer:
      "La comunicazione FINMA sulla vigilanza 08/2024 del 18 dicembre 2024 espone quanto la vigilanza ha riscontrato su governance dell’IA, inventari e classificazione dei rischi, qualità dei dati, test e monitoraggio continuo, documentazione, spiegabilità e revisione indipendente, e afferma che la FINMA si aspetta che gli istituti assoggettati che utilizzano l’IA allineino di conseguenza governance, gestione dei rischi e sistemi di controllo. Ai sensi della circolare FINMA 2018/3, un assicuratore che esternalizza una funzione resta responsabile nei confronti della FINMA come se la svolgesse direttamente. Un sistema dovrebbe quindi poter dimostrare ciascuno di questi punti dalle proprie registrazioni.",
  },
];
