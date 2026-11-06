import type { FaqItem } from "@/components/content/schema";

/**
 * The FAQ as plain text, published as FAQPage JSON-LD. page.tsx renders its own
 * copy of these answers with links; both move into one source with the content
 * layer (chunk 9).
 */
export const faqs: FaqItem[] = [
  {
    question: "Ist KI in der Schadenbearbeitung nach dem EU AI Act hochriskant?",
    answer:
      "Nein. Anhang III führt die Schadenbearbeitung nicht auf. Nummer 5 Buchstabe c erfasst nur Risikobewertung und Preisgestaltung in der Lebens- und Krankenversicherung. Die Entwurfsleitlinien der Kommission zur Einstufung vom 19. Mai 2026 nennen das Schadenmanagement als Beispiel für ein System außerhalb dieser Nummer, selbst bei Krankenversicherungsprodukten. Eine Schadenorganisation in Kfz, Sach, Garantie oder Gewerbe fällt nicht unter das Hochrisiko-Regime, unterliegt aber weiterhin dem Datenschutzrecht und dem sektoralen Versicherungsrecht.",
  },
  {
    question: "Ist KI in der Schadenbearbeitung in der Krankenversicherung hochriskant?",
    answer:
      "Nein. Die Krankenversicherung ist der schärfste Test der Regel, denn das Underwriting in dieser Sparte ist hochriskant. Die Entwurfsleitlinien der Kommission ordnen das Schadenmanagement auch dort außerhalb von Nummer 5 Buchstabe c ein, mit der Begründung, dass die Prüfung eines Anspruchs anhand der Policenbedingungen oder die Ermittlung des zu zahlenden Betrags etwas anderes ist als Risikobewertung oder Preisgestaltung.",
  },
  {
    question: "Gilt die Verschiebung auf Dezember 2027 für die Schadenbearbeitung?",
    answer:
      "Sie hat keine Auswirkung darauf. Der Digitale Omnibus hat den Zeitpunkt verschoben, ab dem die Hochrisiko-Pflichten gelten. Er hat nicht geändert, welche Systeme hochriskant sind. Die Schadenbearbeitung gehörte weder vor noch nach der Verschiebung dazu.",
  },
  {
    question: "Was hat die Verordnung (EU) 2026/1744 geändert?",
    answer:
      "Sie hat die Hochrisiko-Pflichten des AI Act verschoben. Eigenständige Systeme nach Anhang III rücken vom 2. August 2026 auf den 2. Dezember 2027. KI in regulierten Produkten vom 2. August 2027 auf den 2. August 2028. Sie wurde am 24. Juli 2026 veröffentlicht und trat am 27. Juli 2026 in Kraft.",
  },
  {
    question: "Gilt DSGVO Artikel 22 für eine automatisierte Schadenentscheidung?",
    answer:
      "Ja, wo die DSGVO das anwendbare Regime ist. Artikel 22 beschränkt Entscheidungen, die ausschließlich auf automatisierter Verarbeitung beruhen und rechtliche oder ähnlich erhebliche Wirkung entfalten. Ein abgelehnter oder gekürzter Anspruch erreicht diese Schwelle. Er gilt seit dem 25. Mai 2018 und blieb von der Verschiebung des AI Act unberührt. Unternehmen außerhalb der EU unterliegen der entsprechenden Bestimmung ihres eigenen Regimes, etwa dem revidierten Schweizer Datenschutzgesetz.",
  },
  {
    question: "Was gilt als bedeutsame menschliche Beteiligung?",
    answer:
      "Nach den Leitlinien der Artikel-29-Datenschutzgruppe (WP251rev.01) muss die Überprüfung durch jemanden erfolgen, der die Befugnis und Kompetenz hat, die Entscheidung zu ändern. Mitarbeitende, die automatisch erzeugte Ergebnisse nur abzeichnen, holen einen Verantwortlichen nicht aus Artikel 22 heraus.",
  },
  {
    question: "Was müssen Sie über die Logik einer automatisierten Entscheidung offenlegen?",
    answer:
      "In Dun & Bradstreet Austria (C-203/22) verlangte der EuGH das tatsächlich angewandte Verfahren und die Grundsätze, knapp und verständlich mitgeteilt, einschließlich der Frage, wie das Ergebnis bei anderen Daten ausgefallen wäre. Die Herausgabe des Algorithmus selbst erfüllt die Pflicht nicht. Ein Geschäftsgeheimnis erlaubt keine pauschale Verweigerung.",
  },
];
