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
      "Welche Fragen sollten Sie stellen, bevor Sie KI in der Schadenbearbeitung einführen?",
    answer:
      "Zwölf, in vier Gruppen. Herkunft: woher jeder Wert stammt, ob eine Regel oder ein Modell ihn erzeugt hat und was das System tut, wenn Nachweise unvollständig sind. Rekonstruktion: ob eine Entscheidung ein Jahr später nachgebaut werden kann, ob die Versionen, die sie erzeugt haben, in der Akte stehen und wer die Akte ändern kann und wie lange sie aufbewahrt wird. Menschliches Urteil: was der Prüfer sieht, ob Übersteuerungen erfasst werden und daraus gelernt wird und ob sich jede Entscheidung dem Anspruchsteller allein aus der Akte erklären lässt. Kontinuität: die Leistung auf Schadenfällen, die das System nie gesehen hat, die Portabilität der Aufzeichnungen beim Ausstieg und wo Datenverarbeitung und Verantwortung liegen.",
  },
  {
    question:
      "Ändert die Verschiebung des EU AI Act auf Dezember 2027 etwas für die Schadenbearbeitung?",
    answer:
      "Nein. Die Verordnung (EU) 2026/1744 hat den Zeitpunkt, ab dem die meisten Hochrisiko-Pflichten gelten, für eigenständige Systeme nach Anhang III auf den 2. Dezember 2027 verschoben. Die Schadenbearbeitung ist in Anhang III nicht aufgeführt, und die Rechte einer Person, die einer ausschließlich automatisierten Entscheidung unterliegt, gelten nach der DSGVO seit dem 25. Mai 2018. Die Verschiebung ändert den Kalender für andere Systeme. Sie ändert nichts daran, was eine Schadenorganisation den Menschen schuldet, über deren Schadenfälle sie entscheidet.",
  },
  {
    question: "Was macht eine KI-Schadenentscheidung prüfbar?",
    answer:
      "Vier Eigenschaften. Jeder Wert, den die Entscheidung verwendet hat, lässt sich bis zu Quelldokument und Seite zurückverfolgen. Die Entscheidung kann später rekonstruiert werden, weil die Regeln, die Policenversion und das Modell, die sie erzeugt haben, auf der Entscheidung selbst festgehalten sind. Eine Person mit der Befugnis, das Ergebnis zu ändern, hat sie mit den Nachweisen vor Augen geprüft. Und die Akte ist manipulationserkennbar, exportierbar und wird so lange aufbewahrt, wie die Pflichten der Organisation es verlangen.",
  },
  {
    question:
      "Reicht eine menschliche Freigabe, um eine automatisierte Schadenentscheidung belastbar zu machen?",
    answer:
      "Nur wenn die Prüfung echt ist. Der Prüfer muss die Nachweise hinter der Empfehlung sehen und die Befugnis und Kompetenz haben, sie zu ändern. Eine Freigabe, die realistisch niemand verweigern könnte, lässt die Entscheidung in der Substanz ausschließlich automatisiert, und nach der DSGVO behält die betroffene Person die daraus folgenden Rechte.",
  },
  {
    question: "Können KI-Schadenentscheidungen deterministisch sein?",
    answer:
      "Weitgehend ja. Wo eine Police, ein Katalog oder ein Regelwerk in einen Entscheidungsbaum überführt ist, wird das Ergebnis aus den Fakten berechnet, und dieselben Eingaben erzeugen immer dieselbe Entscheidung. Modelle werden gebraucht, um unstrukturierte Nachweise zu lesen und wirklich mehrdeutige Positionen aufzulösen, und eine gut gestaltete Akte kennzeichnet diese Zeilen als probabilistisch, sodass beides nie verwechselt wird.",
  },
  {
    question: "Was sollte ein Schweizer Versicherer von einem KI-System für Schadenfälle erwarten?",
    answer:
      "Die FINMA-Aufsichtsmitteilung 08/2024 vom 18. Dezember 2024 legt dar, was die Aufsicht zu KI-Governance, Inventaren und Risikoklassifizierung, Datenqualität, Tests und laufender Überwachung, Dokumentation, Erklärbarkeit und unabhängiger Überprüfung festgestellt hat, und hält fest, dass die FINMA von beaufsichtigten Instituten, die KI einsetzen, erwartet, ihre Governance, ihr Risikomanagement und ihre Kontrollsysteme entsprechend auszurichten. Nach dem FINMA-Rundschreiben 2018/3 bleibt ein Versicherer, der eine Funktion auslagert, gegenüber der FINMA so verantwortlich, als würde er die Funktion selbst ausüben. Ein System sollte daher jeden dieser Punkte aus seinen eigenen Aufzeichnungen belegen können.",
  },
];
