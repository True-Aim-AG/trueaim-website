import type { ReactNode } from "react";

/**
 * The twelve scorecard questions, in one place.
 *
 * `page.tsx` renders `body`; `layout.tsx` publishes `question` and
 * `plainAnswer` as an ItemList in JSON-LD. Keeping both readings in the same
 * array is what stops the visible checklist and the machine-readable one from
 * drifting apart. Each answer sets out the standard, then how True Aim meets
 * it.
 */
export type ScorecardQuestion = {
  group: "Provenance" | "Reconstruction" | "Human judgement" | "Continuity";
  question: string;
  /** Plain-text guidance, for structured data. */
  plainAnswer: string;
  /** The same guidance with the article's emphasis, for the page. */
  body: ReactNode;
};

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    group: "Provenance",
    question:
      "Können Sie bei jedem abgeschlossenen Schadenfall jeden Wert, den die Entscheidung verwendet hat, bis zu dem Dokument und der Seite zurückverfolgen, aus denen er stammt?",
    plainAnswer:
      "Der Maßstab ist eine Akte, in der jeder Wert, auf den sich die Entscheidung stützt, auf seine Quelle verweist: der geforderte Betrag auf die Rechnungsposition, das Schadendatum auf den Bericht, die Deckungslage auf die Klausel. Die Aussage, das System habe Zugriff auf alle Dokumente gehabt, beschreibt eine Eingabe. Sie beschreibt keine Akte. True Aim zieht eine sichtbare Linie von jedem Datenpunkt zu der exakten Stelle im Quelldokument, aus der er stammt, sodass ein Sachbearbeiter validiert, statt neu zu ermitteln. Extrahierte Werte tragen diesen Herkunftsnachweis bis auf Seite und Textbereich, und wir messen, welcher Anteil jedes Schadenfalls ihn trägt, statt vollständige Abdeckung anzunehmen.",
    body: (
      <>
        <p>
          Der Maßstab ist eine Akte, in der jeder Wert, auf den sich die Entscheidung stützt, auf seine Quelle verweist: der geforderte Betrag auf die Rechnungsposition, das Schadendatum auf den Bericht, die Deckungslage auf die Klausel. Die Aussage, das System habe Zugriff auf alle Dokumente gehabt, beschreibt eine Eingabe. Sie beschreibt keine Akte.
        </p>
        <p>
          True Aim zieht eine sichtbare Linie von jedem Datenpunkt zu der exakten Stelle im Quelldokument, aus der er stammt, sodass ein Sachbearbeiter validiert, statt neu zu ermitteln. Extrahierte Werte tragen diesen Herkunftsnachweis bis auf Seite und Textbereich, und wir messen, welcher Anteil jedes Schadenfalls ihn trägt, statt vollständige Abdeckung anzunehmen.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Welche Teile der Entscheidung wurden von Regeln berechnet und welche von einem Modell erzeugt, und zeigt die Akte den Unterschied?",
    plainAnswer:
      "Je größer der Anteil einer Entscheidung, der auf deterministischer Logik läuft, desto weniger ist hinterher zu erklären, denn die Regel ist die Erklärung. Der Maßstab ist eine Akte, die Zeile für Zeile zeigt, welche Teile aus dem Wortlaut berechnet und welche von einem Modell erzeugt wurden, sodass Urteil nie mit Arithmetik verwechselt wird. True Aim überführt eine Police, einen Katalog oder ein Regelwerk in einen Entscheidungsbaum. Wo die Regeln die Fakten abdecken, wird das Ergebnis berechnet, nicht vorhergesagt, und dieselben Eingaben erzeugen immer dieselbe Entscheidung. Agenten lesen die unstrukturierten Nachweise, die Fotos, PDFs, Handschrift, E-Mails und Freitexte, und verwandeln sie in die strukturierten Fakten, die die Engine braucht. Jeder Agent erledigt eine eng umrissene Aufgabe, sodass bei einem Fehler sofort klar ist, wo er liegt, und er genau dort korrigiert wird. Wo eine Position wirklich mehrdeutig ist und keine Regel sie auflöst, übernimmt ein Modell die Zuordnung, und die Akte kennzeichnet diese Zeile als probabilistisch.",
    body: (
      <>
        <p>
          Je größer der Anteil einer Entscheidung, der auf deterministischer Logik läuft, desto weniger ist hinterher zu erklären, denn die Regel <em>ist</em>{" "}
          die Erklärung. Der Maßstab ist eine Akte, die Zeile für Zeile zeigt, welche Teile aus dem Wortlaut berechnet und welche von einem Modell erzeugt wurden, sodass Urteil nie mit Arithmetik verwechselt wird.
        </p>
        <p>
          True Aim überführt eine Police, einen Katalog oder ein Regelwerk in einen Entscheidungsbaum. Wo die Regeln die Fakten abdecken, wird das Ergebnis berechnet, nicht vorhergesagt, und dieselben Eingaben erzeugen immer dieselbe Entscheidung. Agenten lesen die unstrukturierten Nachweise, die Fotos, PDFs, Handschrift, E-Mails und Freitexte, und verwandeln sie in die strukturierten Fakten, die die Engine braucht. Jeder Agent erledigt eine eng umrissene Aufgabe, sodass bei einem Fehler sofort klar ist, wo er liegt, und er genau dort korrigiert wird. Wo eine Position wirklich mehrdeutig ist und keine Regel sie auflöst, übernimmt ein Modell die Zuordnung, und die Akte kennzeichnet diese Zeile als probabilistisch.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Was geschieht, wenn die Nachweise unvollständig oder mehrdeutig sind, und wer hat dieses Verhalten festgelegt?",
    plainAnswer:
      "Unsicherheit ist kein Fehlerzustand. Sie ist eine Weiterleitungsentscheidung, und sie gehört der Schadenorganisation, nicht der Software. Der Maßstab ist ein definiertes Verhalten, das die Organisation kontrolliert: an einen Sachbearbeiter weiterleiten, den Schadenfall anhalten, das fehlende Dokument anfordern. Ein Konfidenzwert ohne Konsequenz ist eine Zahl, keine Kontrolle. Bei True Aim werden Schwellenwerte, Weiterleitungsregeln, Dunkelverarbeitungsgrenzen und Toleranzen vom Kunden konfiguriert. Ein Schadenfall wird nur dann automatisch entschieden, wenn Wert, Abweichung und Konfidenz alle die Tests bestehen, die der Kunde festgelegt hat. Was die Nachweise bestätigen, wird von dem getrennt, was nur ein Mensch bestätigen kann, sodass die Zeit der Sachbearbeiter dort eingesetzt wird, wo sie die Antwort verändert.",
    body: (
      <>
        <p>
          Unsicherheit ist kein Fehlerzustand. Sie ist eine Weiterleitungsentscheidung, und sie gehört der Schadenorganisation, nicht der Software. Der Maßstab ist ein definiertes Verhalten, das die Organisation kontrolliert: an einen Sachbearbeiter weiterleiten, den Schadenfall anhalten, das fehlende Dokument anfordern. Ein Konfidenzwert ohne Konsequenz ist eine Zahl, keine Kontrolle.
        </p>
        <p>
          Bei True Aim werden Schwellenwerte, Weiterleitungsregeln, Dunkelverarbeitungsgrenzen und Toleranzen vom Kunden konfiguriert. Ein Schadenfall wird nur dann automatisch entschieden, wenn Wert, Abweichung und Konfidenz alle die Tests bestehen, die der Kunde festgelegt hat. Was die Nachweise bestätigen, wird von dem getrennt, was nur ein Mensch bestätigen kann, sodass die Zeit der Sachbearbeiter dort eingesetzt wird, wo sie die Antwort verändert.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Wäre die Entscheidung bei demselben Schadenfall und denselben Dokumenten ein Jahr später dieselbe, und könnten Sie es beweisen?",
    plainAnswer:
      "Der Maßstab ist ein Ja für jeden deterministischen Teil der Entscheidung, mit dem erneuten Durchlauf als Beweis, und eine genaue Aufstellung, welche Teile probabilistisch waren und daher nur unter der Modellversion und den Einstellungen reproduzierbar sind, die sie erzeugt haben. Ein System, das seine eigene Ausgabe nicht reproduzieren kann, kann sie nicht verteidigen. True Aim kann eine Entscheidungskette auf Abruf erneut validieren oder erneut ausführen. Regelbasierte Ergebnisse reproduzieren sich per Konstruktion. Für jeden Modellaufruf hält die Akte Modell, Prompt-Vorlage, Engine, Temperatur, Seed, Determinismus-Einstellung und Konfidenz fest, sodass ein probabilistischer Schritt unter den Bedingungen untersucht werden kann, die ihn erzeugt haben.",
    body: (
      <>
        <p>
          Der Maßstab ist ein Ja für jeden deterministischen Teil der Entscheidung, mit dem erneuten Durchlauf als Beweis, und eine genaue Aufstellung, welche Teile probabilistisch waren und daher nur unter der Modellversion und den Einstellungen reproduzierbar sind, die sie erzeugt haben. Ein System, das seine eigene Ausgabe nicht reproduzieren kann, kann sie nicht verteidigen.
        </p>
        <p>
          True Aim kann eine Entscheidungskette auf Abruf erneut validieren oder erneut ausführen. Regelbasierte Ergebnisse reproduzieren sich per Konstruktion. Für jeden Modellaufruf hält die Akte Modell, Prompt-Vorlage, Engine, Temperatur, Seed, Determinismus-Einstellung und Konfidenz fest, sodass ein probabilistischer Schritt unter den Bedingungen untersucht werden kann, die ihn erzeugt haben.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Sind der Policenwortlaut, die Regeln und das Modell, die eine Entscheidung erzeugt haben, auf der Entscheidung selbst festgehalten, in der damals geltenden Version?",
    plainAnswer:
      "Auf der Akte selbst, nicht in einer Release Note. Eine anderswo geführte Versionshistorie ist ein anderes Dokument über einen anderen Tag. Der Maßstab ist eine Entscheidung, die die angewandte Klausel, den Katalogeintrag oder die Geschäftsregel benennt, in der in diesem Moment geltenden Version, zusammen mit dem beteiligten Modell und Prompt. True Aim schreibt jede Handlung, von einer Person oder einer Maschine, mit Modell, Prompt, Regelversion und Konfidenz in die Akte und hält fest, welche Version des Wortlauts, des Katalogs oder der Geschäftsregel zum Zeitpunkt der Entscheidung galt. Entscheidungen werden an den Regeln gemessen, die tatsächlich galten.",
    body: (
      <>
        <p>
          Auf der Akte selbst, nicht in einer Release Note. Eine anderswo geführte Versionshistorie ist ein anderes Dokument über einen anderen Tag. Der Maßstab ist eine Entscheidung, die die angewandte Klausel, den Katalogeintrag oder die Geschäftsregel benennt, in der in diesem Moment geltenden Version, zusammen mit dem beteiligten Modell und Prompt.
        </p>
        <p>
          True Aim schreibt jede Handlung, von einer Person oder einer Maschine, mit Modell, Prompt, Regelversion und Konfidenz in die Akte und hält fest, welche Version des Wortlauts, des Katalogs oder der Geschäftsregel zum Zeitpunkt der Entscheidung galt. Entscheidungen werden an den Regeln gemessen, die tatsächlich galten.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Wer kann eine Entscheidungsakte ändern, wie würden Sie es merken, und wie lange wird die Akte aufbewahrt?",
    plainAnswer:
      "Eine Akte, die sich spurlos ändern lässt, ist ein Entwurf. Der Maßstab ist eine manipulationserkennbare Akte und eine bewusst festgelegte Aufbewahrungsfrist, die den eigenen Pflichten der Organisation entspricht, die den Schadenfall meist um Jahre überdauern. Der Schadenfall, zu dem Sie befragt werden, ist oft älter als das Protokoll, das Sie aufbewahrt haben. True Aim hasht jeden aufgezeichneten Eintrag, sodass jede Änderung erkennbar ist und die Akte so gebaut ist, dass sie einer Anfechtung in Streitfall, Prüfung oder vor Gericht standhält. Die Aufbewahrung wird pro Kunde entsprechend dessen eigenen Aufbewahrungspflichten konfiguriert, und der Aufbewahrungsstatus jedes Schadenfalls steht in derselben Akte wie seine Dokumente, Ereignisse und Entscheidungen.",
    body: (
      <>
        <p>
          Eine Akte, die sich spurlos ändern lässt, ist ein Entwurf. Der Maßstab ist eine manipulationserkennbare Akte und eine bewusst festgelegte Aufbewahrungsfrist, die den eigenen Pflichten der Organisation entspricht, die den Schadenfall meist um Jahre überdauern. Der Schadenfall, zu dem Sie befragt werden, ist oft älter als das Protokoll, das Sie aufbewahrt haben.
        </p>
        <p>
          True Aim hasht jeden aufgezeichneten Eintrag, sodass jede Änderung erkennbar ist und die Akte so gebaut ist, dass sie einer Anfechtung in Streitfall, Prüfung oder vor Gericht standhält. Die Aufbewahrung wird pro Kunde entsprechend dessen eigenen Aufbewahrungspflichten konfiguriert, und der Aufbewahrungsstatus jedes Schadenfalls steht in derselben Akte wie seine Dokumente, Ereignisse und Entscheidungen.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Was sieht der Prüfer im Moment der Freigabe tatsächlich, und kann er das Ergebnis ändern?",
    plainAnswer:
      "Ein Prüfschritt schützt den Kunden nur, wenn der Prüfer die Empfehlung, die Nachweise dahinter und die Annahmen darunter sieht und die Befugnis hat, jede davon zu ändern. Ein Prüfer, der nur ein Urteil sieht, genehmigt eine Schlussfolgerung, statt einen Schadenfall zu prüfen. True Aim erzeugt eine Empfehlung mit ihrer vollständigen Begründung, die eine Person bestätigt. Jede Annahme hinter der Feststellung wird in einem Panel der Deckungsannahmen ausgewiesen und kann übersteuert werden, jede Zeile trägt die Klausel oder Regel, auf der sie beruht, und jede Summe wird live neu berechnet, wenn eine Deckung umgeschaltet wird, sodass der Sachbearbeiter die finanzielle Wirkung einer Änderung sieht, bevor er sie bestätigt.",
    body: (
      <>
        <p>
          Ein Prüfschritt schützt den Kunden nur, wenn der Prüfer die Empfehlung, die Nachweise dahinter und die Annahmen darunter sieht und die Befugnis hat, jede davon zu ändern. Ein Prüfer, der nur ein Urteil sieht, genehmigt eine Schlussfolgerung, statt einen Schadenfall zu prüfen.
        </p>
        <p>
          True Aim erzeugt eine Empfehlung mit ihrer vollständigen Begründung, die eine Person bestätigt. Jede Annahme hinter der Feststellung wird in einem Panel der Deckungsannahmen ausgewiesen und kann übersteuert werden, jede Zeile trägt die Klausel oder Regel, auf der sie beruht, und jede Summe wird live neu berechnet, wenn eine Deckung umgeschaltet wird, sodass der Sachbearbeiter die finanzielle Wirkung einer Änderung sieht, bevor er sie bestätigt.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Wenn ein Sachbearbeiter das System übersteuert, wird der Grund erfasst, und lernt jemand daraus?",
    plainAnswer:
      "Übersteuerungen sind das wertvollste Qualitätssignal, das eine Schadenorganisation besitzt. Jede ist ein Fall, in dem eine erfahrene Person dem System widersprochen hat, und der Grund wird entweder erfasst und ausgewertet oder geht verloren. Der Maßstab ist eine Begründungspflicht bei jeder Übersteuerung und eine Routine, die sie auswertet. True Aim verlangt für jede menschliche Änderung eine Begründung und kennzeichnet Kulanz separat, sodass eine Zahlung außerhalb der Deckung nie das Modell trainiert. Menschliche und automatisierte Entscheidungen werden in der Schadenakte nebeneinander gezählt, was der Organisation zugleich einen sauberen Prüfpfad und saubere Trainingsdaten liefert.",
    body: (
      <>
        <p>
          Übersteuerungen sind das wertvollste Qualitätssignal, das eine Schadenorganisation besitzt. Jede ist ein Fall, in dem eine erfahrene Person dem System widersprochen hat, und der Grund wird entweder erfasst und ausgewertet oder geht verloren. Der Maßstab ist eine Begründungspflicht bei jeder Übersteuerung und eine Routine, die sie auswertet.
        </p>
        <p>
          True Aim verlangt für jede menschliche Änderung eine Begründung und kennzeichnet Kulanz separat, sodass eine Zahlung außerhalb der Deckung nie das Modell trainiert. Menschliche und automatisierte Entscheidungen werden in der Schadenakte nebeneinander gezählt, was der Organisation zugleich einen sauberen Prüfpfad und saubere Trainingsdaten liefert.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Könnten Sie jede einzelne Entscheidung dem Anspruchsteller in einfacher Sprache allein aus der Akte erklären?",
    plainAnswer:
      "Die Person auf der anderen Seite eines Schadenfalls hat ein Recht darauf zu verstehen, warum so entschieden wurde. Der Maßstab ist eine Erklärung, die aus der Akte selbst zusammengesetzt ist: die zugrunde gelegten Fakten, die angewandte Klausel und die durchgeführte Berechnung, in einer Sprache, der der Anspruchsteller folgen kann. Muss die Erklärung von Hand rekonstruiert werden, war die Akte unvollständig. True Aim entscheidet die Deckung Zeile für Zeile, jede Zeile anhand einer konkreten Klausel oder konfigurierten Geschäftsregel begründet, zitiert und erklärt, mit der vollständigen Arithmetik für Selbstbeteiligung, Limits, Obergrenzen und Haftung. Abgelehnte Zeilen werden direkt im Quelldokument durchgestrichen und als PDF exportiert, sodass der Kunde die Begründung an seiner eigenen Rechnung sieht.",
    body: (
      <>
        <p>
          Die Person auf der anderen Seite eines Schadenfalls hat ein Recht darauf zu verstehen, warum so entschieden wurde. Der Maßstab ist eine Erklärung, die aus der Akte selbst zusammengesetzt ist: die zugrunde gelegten Fakten, die angewandte Klausel und die durchgeführte Berechnung, in einer Sprache, der der Anspruchsteller folgen kann. Muss die Erklärung von Hand rekonstruiert werden, war die Akte unvollständig.
        </p>
        <p>
          True Aim entscheidet die Deckung Zeile für Zeile, jede Zeile anhand einer konkreten Klausel oder konfigurierten Geschäftsregel begründet, zitiert und erklärt, mit der vollständigen Arithmetik für Selbstbeteiligung, Limits, Obergrenzen und Haftung. Abgelehnte Zeilen werden direkt im Quelldokument durchgestrichen und als PDF exportiert, sodass der Kunde die Begründung an seiner eigenen Rechnung sieht.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Wie schneidet das System bei Schadenfällen ab, die es nie gesehen hat, und was hat sich seit dem letzten solchen Test geändert?",
    plainAnswer:
      "Eine Genauigkeit, die auf den Schadenfällen gemessen wurde, auf die ein System abgestimmt ist, misst Vertrautheit, nicht Kompetenz. Der Maßstab ist ein Test auf Schadenfällen, die das System nie gesehen hat, gekennzeichnet von einem erfahrenen Sachbearbeiter, mit schriftlich festgehaltenen Fehlermodi und dokumentierter Abhilfe. Bei True Aim brachten dreißig ungesehene Schadenfälle Fehlermodi zutage, die der Entwicklungsdatensatz nicht abgedeckt hatte, und genau dafür ist ein solcher Test da. Die Lücke zu schließen bedeutete mehr Ground Truth und, für die Auszahlungsformel, sich mit einem Sachbearbeiter zusammenzusetzen und die Berechnungen von Hand durchzugehen. Kein Prompt-Engineering behebt einen Fehler in der Geschäftslogik. Diese Arbeit entscheidet, ob ein Pilot die Produktion erreicht.",
    body: (
      <>
        <p>
          Eine Genauigkeit, die auf den Schadenfällen gemessen wurde, auf die ein System abgestimmt ist, misst Vertrautheit, nicht Kompetenz. Der Maßstab ist ein Test auf Schadenfällen, die das System nie gesehen hat, gekennzeichnet von einem erfahrenen Sachbearbeiter, mit schriftlich festgehaltenen Fehlermodi und dokumentierter Abhilfe.
        </p>
        <p>
          Bei True Aim brachten dreißig ungesehene Schadenfälle Fehlermodi zutage, die der Entwicklungsdatensatz nicht abgedeckt hatte, und genau dafür ist ein solcher Test da. Die Lücke zu schließen bedeutete mehr Ground Truth und, für die Auszahlungsformel, sich mit einem Sachbearbeiter zusammenzusetzen und die Berechnungen von Hand durchzugehen. Kein Prompt-Engineering behebt einen Fehler in der Geschäftslogik. Diese Arbeit entscheidet, ob ein Pilot die Produktion erreicht.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Wenn Sie das System wechseln, nehmen Sie die Entscheidungsakten in einer Form mit, die Sie ohne die Software lesen können?",
    plainAnswer:
      "Entscheidungsakten gehören der Schadenorganisation, nicht der Software, die sie erzeugt hat. Der Maßstab ist ein Export, den ein Mensch ohne das System lesen kann: die Dokumente, die Entscheidungen, die Begründungen und die Versionen, in einem offenen Format. Ein Prüfpfad, der sich nur in dem System öffnen lässt, das ihn erzeugt hat, ist kein Prüfpfad. True Aim exportiert die vollständige Akte eines Schadenfalls, jede Handlung einer Person oder Maschine mit Modell, Prompt, Regelversion und Konfidenz, als ein einziges Prüfpaket mit einem Klick.",
    body: (
      <>
        <p>
          Entscheidungsakten gehören der Schadenorganisation, nicht der Software, die sie erzeugt hat. Der Maßstab ist ein Export, den ein Mensch ohne das System lesen kann: die Dokumente, die Entscheidungen, die Begründungen und die Versionen, in einem offenen Format. Ein Prüfpfad, der sich nur in dem System öffnen lässt, das ihn erzeugt hat, ist kein Prüfpfad.
        </p>
        <p>
          True Aim exportiert die vollständige Akte eines Schadenfalls, jede Handlung einer Person oder Maschine mit Modell, Prompt, Regelversion und Konfidenz, als ein einziges Prüfpaket mit einem Klick.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Wo werden Schadendaten verarbeitet, von wem, und wer ist für jede in Ihrem Namen getroffene Entscheidung verantwortlich?",
    plainAnswer:
      "Eine Schadenorganisation bleibt für jede in ihrem Namen getroffene Entscheidung verantwortlich, egal welche Software sie getroffen hat. Die Schweizer Aufsicht ist in diesem Punkt eindeutig: Die FINMA erwartet von Instituten, die KI einsetzen, dass sie ihre Governance, ihr Risikomanagement und ihre Kontrollsysteme entsprechend ausrichten, und ein Versicherer, der eine Funktion auslagert, bleibt gegenüber der FINMA so verantwortlich, als würde er sie selbst ausüben. Der Maßstab ist eine veröffentlichte Liste der Auftragsverarbeiter, ein bekannter Verarbeitungsort und eine Akte, die für jede Entscheidung zeigt, ob ein Mensch oder ein System sie getroffen hat. True Aim speichert und verarbeitet Kundendaten auf Microsoft Azure in der Region Switzerland North und überträgt sie für die routinemäßige Verarbeitung nicht aus der Schweiz hinaus. Unsere Liste der Unterauftragsverarbeiter ist auf Anfrage erhältlich, mit Dienst, Datenkategorien und Verarbeitungsort für jeden. Die Schadenakte zählt menschliche und automatisierte Entscheidungen getrennt und listet jede Handlung chronologisch nach Akteur auf, sodass die Verantwortung für jede Entscheidung sichtbar ist und nicht pauschal behauptet wird.",
    body: (
      <>
        <p>
          Eine Schadenorganisation bleibt für jede in ihrem Namen getroffene Entscheidung verantwortlich, egal welche Software sie getroffen hat. Die Schweizer Aufsicht ist in diesem Punkt eindeutig: Die FINMA erwartet von Instituten, die KI einsetzen, dass sie ihre Governance, ihr Risikomanagement und ihre Kontrollsysteme entsprechend ausrichten, und ein Versicherer, der eine Funktion auslagert, bleibt gegenüber der FINMA so verantwortlich, als würde er sie selbst ausüben. Der Maßstab ist eine veröffentlichte Liste der Auftragsverarbeiter, ein bekannter Verarbeitungsort und eine Akte, die für jede Entscheidung zeigt, ob ein Mensch oder ein System sie getroffen hat.
        </p>
        <p>
          True Aim speichert und verarbeitet Kundendaten auf Microsoft Azure in der Region Switzerland North und überträgt sie für die routinemäßige Verarbeitung nicht aus der Schweiz hinaus. Unsere Liste der Unterauftragsverarbeiter ist auf Anfrage erhältlich, mit Dienst, Datenkategorien und Verarbeitungsort für jeden. Die Schadenakte zählt menschliche und automatisierte Entscheidungen getrennt und listet jede Handlung chronologisch nach Akteur auf, sodass die Verantwortung für jede Entscheidung sichtbar ist und nicht pauschal behauptet wird.
        </p>
      </>
    ),
  },
];
