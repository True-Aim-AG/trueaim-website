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
    name: "Lesen (von Belegen zu Fakten)",
    description:
      "Rohe Belege in strukturierte Fakten verwandeln. Schadenfälle kommen als Fotos, PDFs, Handschrift, E-Mails und Freitext an. Das Lesen holt heraus, was sie sagen (die Policennummer, das Schadendatum, das reparierte Teil oder den Rechnungsbetrag), und verknüpft jeden Wert zurück mit seinem Quelldokument.",
  },
  {
    name: "Rechnen (Regeln und Zahlen anwenden)",
    description:
      "Schriftliche Regeln und Berechnungen auf diese Fakten anwenden. Ist das Teil nach dem Wortlaut gedeckt? Welche Selbstbeteiligung gilt? Überschreitet der Betrag ein Limit? Wie wird die Haftung aufgeteilt? Sobald die Fakten feststehen, hat jede dieser Fragen genau eine richtige Antwort, vorgegeben durch Police, Katalog oder Regelwerk.",
  },
  {
    name: "Urteilen (offene Punkte klären)",
    description:
      "Klären, was der schriftliche Wortlaut offenlässt. Eine Rechnungsposition beschreibt ein Teil mit Worten, die kein Katalogeintrag verwendet. Oder eine Klausel lässt sich vernünftigerweise auf zwei Arten lesen. Keine Regel entscheidet das, also muss jemand (oder etwas) eine Entscheidung treffen.",
  },
];
