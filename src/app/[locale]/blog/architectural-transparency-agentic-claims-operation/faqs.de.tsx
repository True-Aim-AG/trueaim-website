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
    question: "Warum hat die Schadenautomatisierung die Verzögerungen zwischen Unternehmen nicht beseitigt?",
    answer:
      "Herkömmliche Automatisierung arbeitet innerhalb der eigenen Mauern. Sie beschleunigt den internen Arbeitsplatz, aber die Reibung wandert einfach zu den Übergaben zwischen Organisationen. Ein Versicherer kann eine Schadenmeldung in vier Sekunden auslesen, und trotzdem verlieren Sachbearbeiter achtundvierzig Stunden damit, einem PDF-Kostenvoranschlag eines externen Reparaturbetriebs hinterherzulaufen. Solange dieser unternehmensübergreifende Navigationsaufwand nicht beseitigt ist, bleibt die Kette langsam.",
  },
  {
    question: "Bedeutet eine gemeinsame Akte, dass jede Partei alles sieht?",
    answer:
      "Nein. Jeder Beteiligte arbeitet strikt innerhalb seiner definierten Berechtigung. Der Versicherer konfiguriert die Zugriffsregeln einmal, und Informationsbarrieren setzen sie im gesamten Netzwerk durch. Versicherungsnehmer verfolgen die Dokumentprüfung, Vermittler überwachen Binder-Limits, und Dienstleister erhalten Freigaben auf Positionsebene. Alle Parteien arbeiten auf derselben zugrunde liegenden Wahrheit, ohne vertrauliche Daten offenzulegen.",
  },
  {
    question: 'Was bedeutet „Herkunftsnachweis auf Positionsebene“ in der Praxis?',
    answer:
      "Es bedeutet Belastbarkeit von Grund auf. Für jede Entscheidung schreibt das System vier Grundelemente in die Akte: die zugrunde liegenden Fakten und Dokumente, den geltenden Policenwortlaut, die Begründung in einfacher Sprache und den verantwortlichen Akteur (Mensch oder KI). Übersteuert ein Sachbearbeiter eine Empfehlung, bleibt die Begründung erhalten. Keine Blackbox, sondern eine Glasbox.",
  },
  {
    question: "Müssen Versicherer ihre Kern-Schadensysteme ersetzen?",
    answer:
      "Nein. Mehrjährige Plattformablösungen sind zu langsam und bergen untragbare Umsetzungsrisiken. Ein agentisches Betriebssystem orchestriert über Standard-APIs oberhalb Ihrer bestehenden datenführenden Systeme. Sie können mit einem einzelnen reibungsintensiven Modul beginnen, etwa dem Abgleich von Reparaturpreisen oder der Deckungsprüfung, und erweitern, sobald die Akte ihren Wert beweist.",
  },
  {
    question: "Ist das Ziel, Personal in der Schadenbearbeitung abzubauen?",
    answer:
      "Das Designprinzip ist die Aufwertung des Menschen, nicht der Abbau von Arbeit. Ertragsarme Verwaltung (das Lesen, Abtippen und Nachtelefonieren) zu beseitigen, gibt Ihren Fachkräften Stunden zurück. Sachbearbeiter gewinnen ihre Zeit für die Entscheidungen mit hohem Einsatz zurück: komplexe Grenzfälle lösen, verunsicherte Versicherungsnehmer beraten und Zeichnungsregeln verfeinern.",
  },
  {
    question: "Was ist der praktischste Ausgangspunkt?",
    answer:
      "Ein begrenzter Pilot. Bringen Sie ein Partnernetzwerk und eine Sparte auf eine gemeinsame Akte. Messen Sie über neunzig Tage die echten Signale: weniger Statusanfragen, schnellere Rechnungsdurchlaufzeiten und ein messbarer Rückgang strittiger Regulierungen.",
  },
];
