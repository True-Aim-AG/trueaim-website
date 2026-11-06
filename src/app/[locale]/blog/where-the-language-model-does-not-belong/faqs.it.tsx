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
    question: "Un modello linguistico dovrebbe calcolare l’importo di un sinistro?",
    answer:
      "No. Franchigie, limiti e ripartizioni di responsabilità hanno una sola risposta corretta una volta fissati i fatti. Spettano a regole deterministiche.",
  },
  {
    question: 'Cosa significa «probabilistico» in un fascicolo sinistro?',
    answer:
      "Che il passaggio è stato risolto dalla risposta più probabile di un modello anziché da una regola fissa, quindi potrebbe non ripetersi esattamente. La marcatura mostra al revisore dove è intervenuto il giudizio.",
  },
  {
    question: "Le regole possono gestire ogni sinistro?",
    answer:
      "Non da sole. Non sono progettate per questo. Dove mancano prove, il sistema le richiede. Dove il testo è ambiguo, un modello abbina la voce sotto un’etichetta probabilistica. Dove un sinistro supera una soglia, un liquidatore lo esamina con tutti i fatti, le clausole e le ipotesi in vista.",
  },
  {
    question: "Come si verifica se un sistema rispetta il confine?",
    answer:
      "Prendete un sinistro chiuso e chiedete al sistema di mostrare, passaggio per passaggio, se è stato letto, calcolato o giudicato. Se non ci riesce, il confine non è nel fascicolo.",
  },
];
