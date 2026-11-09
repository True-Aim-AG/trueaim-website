/**
 * The three kinds of step inside a claim decision, in one place. `page.tsx`
 * renders them and `layout.tsx` publishes them as an ItemList in JSON-LD, so
 * the visible list and the machine-readable one are the same text.
 */
export type Operation = {
  name: string;
  description: string;
};

export const operations: Operation[] = [
  {
    name: "Lettura (dalle prove ai fatti)",
    description:
      "Trasformare prove grezze in fatti strutturati. I sinistri arrivano come fotografie, PDF, scrittura a mano, e-mail e testo libero. La lettura estrae ciò che dicono (il numero di polizza, la data del sinistro, il pezzo riparato o l’importo fatturato) e collega ogni valore al suo documento di origine.",
  },
  {
    name: "Calcolo (applicare regole e numeri)",
    description:
      "Applicare a quei fatti regole scritte e calcoli. Il pezzo è coperto in base al testo? Quale franchigia si applica? L’importo supera un limite? Come si ripartisce la responsabilità? Una volta fissati i fatti, ognuna di queste domande ha una sola risposta corretta, stabilita da polizza, catalogo o regolamento.",
  },
  {
    name: "Giudizio (risolvere i punti aperti)",
    description:
      "Risolvere ciò che il testo scritto lascia aperto. Una voce di fattura descrive un pezzo con parole che nessuna voce di catalogo usa. Oppure una clausola si può ragionevolmente leggere in due modi. Nessuna regola lo decide, quindi qualcuno (o qualcosa) deve prendere una decisione.",
  },
];
