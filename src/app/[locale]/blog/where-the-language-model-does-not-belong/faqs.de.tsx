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
    question: "Sollte ein Sprachmodell eine Schadenzahlung berechnen?",
    answer:
      "Nein. Selbstbeteiligungen, Limits und Haftungsquoten haben genau eine richtige Antwort, sobald die Fakten feststehen. Sie gehören zu deterministischen Regeln.",
  },
  {
    question: 'Was bedeutet „probabilistisch“ in einer Schadenakte?',
    answer:
      "Dass der Schritt durch die wahrscheinlichste Antwort eines Modells gelöst wurde und nicht durch eine feste Regel, sodass er sich möglicherweise nicht exakt wiederholt. Die Kennzeichnung zeigt einem Prüfer, wo Urteilsvermögen im Spiel war.",
  },
  {
    question: "Können Regeln jeden Schadenfall bewältigen?",
    answer:
      "Nicht allein. Dafür sind sie nicht gemacht. Fehlen Belege, fragt das System danach. Ist der Wortlaut mehrdeutig, ordnet ein Modell die Position unter einer probabilistischen Kennzeichnung zu. Überschreitet ein Schadenfall einen Schwellenwert, prüft ihn ein Sachbearbeiter mit allen Fakten, Klauseln und Annahmen im Blick.",
  },
  {
    question: "Wie prüft man, ob ein System die Grenze einhält?",
    answer:
      "Nehmen Sie einen abgeschlossenen Schadenfall und lassen Sie sich vom System pro Schritt zeigen, ob er gelesen, berechnet oder beurteilt wurde. Kann es das nicht, steckt die Grenze nicht in der Akte.",
  },
];
