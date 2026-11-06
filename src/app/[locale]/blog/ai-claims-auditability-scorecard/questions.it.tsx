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
      "Per qualsiasi sinistro chiuso, potete risalire da ogni valore usato dalla decisione al documento e alla pagina da cui proviene?",
    plainAnswer:
      "Lo standard è un fascicolo in cui ogni valore su cui la decisione si è basata rimanda alla sua fonte: l’importo richiesto alla voce di fattura, la data del sinistro al rapporto, la posizione di copertura alla clausola. Affermare che il sistema aveva accesso a tutti i documenti descrive un input. Non descrive un fascicolo. True Aim traccia una linea visiva da ogni dato al punto esatto del documento di origine da cui proviene, così un liquidatore valida invece di indagare di nuovo. I valori estratti portano quella provenienza fino alla pagina e all’area di testo, e misuriamo quanta parte di ogni sinistro la porta invece di presumere che la copertura sia completa.",
    body: (
      <>
        <p>
          Lo standard è un fascicolo in cui ogni valore su cui la decisione si è basata rimanda alla sua fonte: l’importo richiesto alla voce di fattura, la data del sinistro al rapporto, la posizione di copertura alla clausola. Affermare che il sistema aveva accesso a tutti i documenti descrive un input. Non descrive un fascicolo.
        </p>
        <p>
          True Aim traccia una linea visiva da ogni dato al punto esatto del documento di origine da cui proviene, così un liquidatore valida invece di indagare di nuovo. I valori estratti portano quella provenienza fino alla pagina e all’area di testo, e misuriamo quanta parte di ogni sinistro la porta invece di presumere che la copertura sia completa.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Quali parti della decisione sono state calcolate da regole e quali prodotte da un modello, e il fascicolo mostra la differenza?",
    plainAnswer:
      "Quanto maggiore è la parte di una decisione che si basa su logica deterministica, tanto meno c’è da spiegare in seguito, perché la regola è la spiegazione. Lo standard è un fascicolo che mostra, riga per riga, quali parti sono state calcolate dal testo e quali prodotte da un modello, così che il giudizio non venga mai confuso con l’aritmetica. True Aim converte una polizza, un catalogo o un regolamento in un albero decisionale. Dove le regole coprono i fatti, l’esito è calcolato, non previsto, e gli stessi input producono sempre la stessa decisione. Gli agenti leggono le prove non strutturate, le fotografie, i PDF, la scrittura a mano, le e-mail e il testo libero, e le trasformano nei fatti strutturati di cui il motore ha bisogno. Ogni agente svolge un solo compito ristretto, così quando qualcosa è sbagliato è subito chiaro dove, e viene corretto in quel punto. Dove una voce è davvero ambigua e nessuna regola la risolve, un modello esegue l’abbinamento e il fascicolo marca quella riga come probabilistica.",
    body: (
      <>
        <p>
          Quanto maggiore è la parte di una decisione che si basa su logica deterministica, tanto meno c’è da spiegare in seguito, perché la regola <em>è</em>{" "}
          la spiegazione. Lo standard è un fascicolo che mostra, riga per riga, quali parti sono state calcolate dal testo e quali prodotte da un modello, così che il giudizio non venga mai confuso con l’aritmetica.
        </p>
        <p>
          True Aim converte una polizza, un catalogo o un regolamento in un albero decisionale. Dove le regole coprono i fatti, l’esito è calcolato, non previsto, e gli stessi input producono sempre la stessa decisione. Gli agenti leggono le prove non strutturate, le fotografie, i PDF, la scrittura a mano, le e-mail e il testo libero, e le trasformano nei fatti strutturati di cui il motore ha bisogno. Ogni agente svolge un solo compito ristretto, così quando qualcosa è sbagliato è subito chiaro dove, e viene corretto in quel punto. Dove una voce è davvero ambigua e nessuna regola la risolve, un modello esegue l’abbinamento e il fascicolo marca quella riga come probabilistica.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Cosa succede quando le prove sono incomplete o ambigue, e chi ha deciso quel comportamento?",
    plainAnswer:
      "L’incertezza non è uno stato di errore. È una decisione di instradamento, e appartiene all’organizzazione sinistri, non al software. Lo standard è un comportamento definito che l’organizzazione controlla: inviare a un liquidatore, sospendere il sinistro, richiedere il documento mancante. Un punteggio di confidenza senza conseguenze collegate è un numero, non un controllo. In True Aim soglie, regole di instradamento, limiti di elaborazione automatica e tolleranze sono configurati dal cliente. Un sinistro viene deciso automaticamente solo quando valore, scostamento e confidenza superano tutti i test che il cliente ha stabilito. Ciò che le prove confermano è separato da ciò che solo una persona può confermare, così il tempo dei liquidatori viene speso dove cambia la risposta.",
    body: (
      <>
        <p>
          L’incertezza non è uno stato di errore. È una decisione di instradamento, e appartiene all’organizzazione sinistri, non al software. Lo standard è un comportamento definito che l’organizzazione controlla: inviare a un liquidatore, sospendere il sinistro, richiedere il documento mancante. Un punteggio di confidenza senza conseguenze collegate è un numero, non un controllo.
        </p>
        <p>
          In True Aim soglie, regole di instradamento, limiti di elaborazione automatica e tolleranze sono configurati dal cliente. Un sinistro viene deciso automaticamente solo quando valore, scostamento e confidenza superano tutti i test che il cliente ha stabilito. Ciò che le prove confermano è separato da ciò che solo una persona può confermare, così il tempo dei liquidatori viene speso dove cambia la risposta.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "A parità di sinistro e di documenti, un anno dopo la decisione sarebbe la stessa, e potreste dimostrarlo?",
    plainAnswer:
      "Lo standard è un sì per ogni parte deterministica della decisione, con la riesecuzione a dimostrarlo, e un resoconto esatto di quali parti erano probabilistiche e sono quindi riproducibili solo con la versione del modello e le impostazioni che le hanno prodotte. Un sistema che non può riprodurre il proprio output non può difenderlo. True Aim può riconvalidare o rieseguire una catena decisionale su richiesta. Gli esiti basati su regole si riproducono per costruzione. Per ogni chiamata al modello il fascicolo conserva modello, template del prompt, motore, temperatura, seed, impostazione di determinismo e confidenza, così un passaggio probabilistico può essere esaminato nelle condizioni che lo hanno prodotto.",
    body: (
      <>
        <p>
          Lo standard è un sì per ogni parte deterministica della decisione, con la riesecuzione a dimostrarlo, e un resoconto esatto di quali parti erano probabilistiche e sono quindi riproducibili solo con la versione del modello e le impostazioni che le hanno prodotte. Un sistema che non può riprodurre il proprio output non può difenderlo.
        </p>
        <p>
          True Aim può riconvalidare o rieseguire una catena decisionale su richiesta. Gli esiti basati su regole si riproducono per costruzione. Per ogni chiamata al modello il fascicolo conserva modello, template del prompt, motore, temperatura, seed, impostazione di determinismo e confidenza, così un passaggio probabilistico può essere esaminato nelle condizioni che lo hanno prodotto.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Il testo di polizza, le regole e il modello che hanno prodotto una decisione sono registrati sulla decisione stessa, nella versione in vigore?",
    plainAnswer:
      "Sul fascicolo stesso, non in una nota di rilascio. Una cronologia delle versioni tenuta altrove è un altro documento su un altro giorno. Lo standard è una decisione che indica la clausola, la voce di catalogo o la regola di business applicata, nella versione in vigore in quel momento, insieme al modello e al prompt che vi hanno partecipato. True Aim scrive ogni azione, di una persona o di una macchina, nel fascicolo con modello, prompt, versione della regola e confidenza allegati, e registra quale versione del testo, del catalogo o della regola di business era in vigore quando la decisione è stata presa. Le decisioni sono giudicate rispetto alle regole che si applicavano davvero.",
    body: (
      <>
        <p>
          Sul fascicolo stesso, non in una nota di rilascio. Una cronologia delle versioni tenuta altrove è un altro documento su un altro giorno. Lo standard è una decisione che indica la clausola, la voce di catalogo o la regola di business applicata, nella versione in vigore in quel momento, insieme al modello e al prompt che vi hanno partecipato.
        </p>
        <p>
          True Aim scrive ogni azione, di una persona o di una macchina, nel fascicolo con modello, prompt, versione della regola e confidenza allegati, e registra quale versione del testo, del catalogo o della regola di business era in vigore quando la decisione è stata presa. Le decisioni sono giudicate rispetto alle regole che si applicavano davvero.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Chi può modificare un fascicolo decisionale, come ve ne accorgereste, e per quanto tempo viene conservato il fascicolo?",
    plainAnswer:
      "Un fascicolo che può essere modificato senza lasciare traccia è una bozza. Lo standard è un fascicolo con manomissioni rilevabili e un periodo di conservazione stabilito deliberatamente per corrispondere agli obblighi propri dell’organizzazione, che di solito superano il sinistro di anni. Il sinistro su cui vi interrogano è spesso più vecchio del registro che avete conservato. True Aim applica un hash a ogni elemento registrato, così ogni alterazione è rilevabile e il fascicolo è costruito per resistere a una contestazione in sede di controversia, audit o tribunale. La conservazione è configurata per ciascun cliente in base ai suoi obblighi di tenuta dei registri, e lo stato di conservazione di ogni sinistro si trova nello stesso fascicolo dei suoi documenti, eventi e decisioni.",
    body: (
      <>
        <p>
          Un fascicolo che può essere modificato senza lasciare traccia è una bozza. Lo standard è un fascicolo con manomissioni rilevabili e un periodo di conservazione stabilito deliberatamente per corrispondere agli obblighi propri dell’organizzazione, che di solito superano il sinistro di anni. Il sinistro su cui vi interrogano è spesso più vecchio del registro che avete conservato.
        </p>
        <p>
          True Aim applica un hash a ogni elemento registrato, così ogni alterazione è rilevabile e il fascicolo è costruito per resistere a una contestazione in sede di controversia, audit o tribunale. La conservazione è configurata per ciascun cliente in base ai suoi obblighi di tenuta dei registri, e lo stato di conservazione di ogni sinistro si trova nello stesso fascicolo dei suoi documenti, eventi e decisioni.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Al momento dell’approvazione, cosa vede davvero il revisore, e può cambiare l’esito?",
    plainAnswer:
      "Una fase di revisione protegge il cliente solo quando il revisore vede la raccomandazione, le prove alla sua base e le ipotesi sottostanti, e ha l’autorità di cambiare ciascuna di esse. Un revisore che vede solo un verdetto sta approvando una conclusione, non esaminando un sinistro. True Aim produce una raccomandazione con il suo ragionamento completo, che una persona conferma. Ogni ipotesi alla base della determinazione è indicata in un pannello delle ipotesi di copertura e può essere modificata, ogni riga porta la clausola o la regola su cui si fonda, e ogni totale si ricalcola in tempo reale quando una copertura viene attivata o disattivata, così il liquidatore vede l’effetto finanziario di una modifica prima di confermarla.",
    body: (
      <>
        <p>
          Una fase di revisione protegge il cliente solo quando il revisore vede la raccomandazione, le prove alla sua base e le ipotesi sottostanti, e ha l’autorità di cambiare ciascuna di esse. Un revisore che vede solo un verdetto sta approvando una conclusione, non esaminando un sinistro.
        </p>
        <p>
          True Aim produce una raccomandazione con il suo ragionamento completo, che una persona conferma. Ogni ipotesi alla base della determinazione è indicata in un pannello delle ipotesi di copertura e può essere modificata, ogni riga porta la clausola o la regola su cui si fonda, e ogni totale si ricalcola in tempo reale quando una copertura viene attivata o disattivata, così il liquidatore vede l’effetto finanziario di una modifica prima di confermarla.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Quando un liquidatore si discosta dalla decisione del sistema, la motivazione viene registrata, e qualcuno ne trae insegnamento?",
    plainAnswer:
      "Gli interventi umani sono il segnale di qualità più prezioso che un’organizzazione sinistri possiede. Ognuno è un caso in cui una persona esperta non era d’accordo con il sistema, e la motivazione viene registrata e studiata oppure va perduta. Lo standard è una motivazione obbligatoria per ogni intervento e una routine che la legge. True Aim richiede una motivazione per ogni modifica umana e segnala separatamente le liquidazioni per cortesia commerciale, così un pagamento fuori copertura non addestra mai il modello. Le decisioni umane e automatizzate sono conteggiate fianco a fianco nel fascicolo sinistro, il che dà all’organizzazione al tempo stesso un audit trail pulito e dati di addestramento puliti.",
    body: (
      <>
        <p>
          Gli interventi umani sono il segnale di qualità più prezioso che un’organizzazione sinistri possiede. Ognuno è un caso in cui una persona esperta non era d’accordo con il sistema, e la motivazione viene registrata e studiata oppure va perduta. Lo standard è una motivazione obbligatoria per ogni intervento e una routine che la legge.
        </p>
        <p>
          True Aim richiede una motivazione per ogni modifica umana e segnala separatamente le liquidazioni per cortesia commerciale, così un pagamento fuori copertura non addestra mai il modello. Le decisioni umane e automatizzate sono conteggiate fianco a fianco nel fascicolo sinistro, il che dà all’organizzazione al tempo stesso un audit trail pulito e dati di addestramento puliti.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Potreste spiegare qualsiasi singola decisione al richiedente, in linguaggio semplice, dal solo fascicolo?",
    plainAnswer:
      "La persona dall’altra parte di un sinistro ha il diritto di capire perché è stato deciso così. Lo standard è una spiegazione assemblata dal fascicolo stesso: i fatti considerati, la clausola applicata e il calcolo eseguito, in un linguaggio che il richiedente può seguire. Se la spiegazione deve essere ricostruita a mano, il fascicolo era incompleto. True Aim decide la copertura riga per riga, ogni riga giustificata rispetto a una clausola specifica o a una regola di business configurata, citata e spiegata, con l’aritmetica di franchigia, limiti, massimali e responsabilità esposta per intero. Le righe respinte sono barrate sul documento di origine stesso ed esportate in PDF, così il cliente vede il ragionamento sulla propria fattura.",
    body: (
      <>
        <p>
          La persona dall’altra parte di un sinistro ha il diritto di capire perché è stato deciso così. Lo standard è una spiegazione assemblata dal fascicolo stesso: i fatti considerati, la clausola applicata e il calcolo eseguito, in un linguaggio che il richiedente può seguire. Se la spiegazione deve essere ricostruita a mano, il fascicolo era incompleto.
        </p>
        <p>
          True Aim decide la copertura riga per riga, ogni riga giustificata rispetto a una clausola specifica o a una regola di business configurata, citata e spiegata, con l’aritmetica di franchigia, limiti, massimali e responsabilità esposta per intero. Le righe respinte sono barrate sul documento di origine stesso ed esportate in PDF, così il cliente vede il ragionamento sulla propria fattura.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Come si comporta il sistema su sinistri che non ha mai visto, e cosa è cambiato dopo l’ultimo test di questo tipo?",
    plainAnswer:
      "Un’accuratezza misurata sui sinistri su cui un sistema è stato messo a punto misura la familiarità, non la competenza. Lo standard è un test su sinistri che il sistema non ha mai visto, etichettati da un liquidatore esperto, con le modalità di errore annotate e il rimedio registrato. In True Aim, trenta sinistri mai visti hanno fatto emergere modalità di errore che il set di sviluppo non aveva coperto, ed è esattamente a questo che serve un test del genere. Colmare il divario ha richiesto più ground truth e, per la formula di liquidazione, sedersi con un liquidatore e rifare i calcoli a mano. Nessun prompt engineering corregge un errore di logica di business. È quel lavoro a decidere se un progetto pilota arriva in produzione.",
    body: (
      <>
        <p>
          Un’accuratezza misurata sui sinistri su cui un sistema è stato messo a punto misura la familiarità, non la competenza. Lo standard è un test su sinistri che il sistema non ha mai visto, etichettati da un liquidatore esperto, con le modalità di errore annotate e il rimedio registrato.
        </p>
        <p>
          In True Aim, trenta sinistri mai visti hanno fatto emergere modalità di errore che il set di sviluppo non aveva coperto, ed è esattamente a questo che serve un test del genere. Colmare il divario ha richiesto più ground truth e, per la formula di liquidazione, sedersi con un liquidatore e rifare i calcoli a mano. Nessun prompt engineering corregge un errore di logica di business. È quel lavoro a decidere se un progetto pilota arriva in produzione.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Se cambiate sistema, i fascicoli decisionali vi seguono in una forma leggibile senza il software?",
    plainAnswer:
      "I fascicoli decisionali appartengono all’organizzazione sinistri, non al software che li ha prodotti. Lo standard è un’esportazione che una persona può leggere senza il sistema: i documenti, le decisioni, le motivazioni e le versioni, in un formato aperto. Un audit trail che si apre solo dentro il sistema che lo ha prodotto non è un audit trail. True Aim esporta il fascicolo completo di un sinistro, ogni azione di una persona o di una macchina con modello, prompt, versione della regola e confidenza allegati, come un unico pacchetto di audit con un clic.",
    body: (
      <>
        <p>
          I fascicoli decisionali appartengono all’organizzazione sinistri, non al software che li ha prodotti. Lo standard è un’esportazione che una persona può leggere senza il sistema: i documenti, le decisioni, le motivazioni e le versioni, in un formato aperto. Un audit trail che si apre solo dentro il sistema che lo ha prodotto non è un audit trail.
        </p>
        <p>
          True Aim esporta il fascicolo completo di un sinistro, ogni azione di una persona o di una macchina con modello, prompt, versione della regola e confidenza allegati, come un unico pacchetto di audit con un clic.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Dove vengono trattati i dati dei sinistri, da chi, e chi è responsabile di ogni decisione presa in vostro nome?",
    plainAnswer:
      "Un’organizzazione sinistri resta responsabile di ogni decisione presa in suo nome, qualunque sia il software che l’ha presa. La vigilanza svizzera è esplicita sul punto: la FINMA si aspetta che gli istituti che utilizzano l’IA allineino di conseguenza governance, gestione dei rischi e sistemi di controllo, e un assicuratore che esternalizza una funzione resta responsabile nei confronti della FINMA come se la svolgesse direttamente. Lo standard è un elenco pubblicato dei responsabili del trattamento, un luogo di trattamento noto e un fascicolo che mostra, per ogni decisione, se l’ha presa una persona o un sistema. True Aim archivia ed elabora i dati dei clienti su Microsoft Azure nella regione Switzerland North e non li trasferisce fuori dalla Svizzera per il trattamento ordinario. Il nostro elenco dei sub-responsabili è disponibile su richiesta, con servizio, categorie di dati e luogo di trattamento per ciascuno. Il fascicolo sinistro conteggia separatamente le decisioni umane e automatizzate ed elenca ogni azione in ordine cronologico per attore, così la responsabilità è visibile per ogni decisione, non affermata per l’insieme.",
    body: (
      <>
        <p>
          Un’organizzazione sinistri resta responsabile di ogni decisione presa in suo nome, qualunque sia il software che l’ha presa. La vigilanza svizzera è esplicita sul punto: la FINMA si aspetta che gli istituti che utilizzano l’IA allineino di conseguenza governance, gestione dei rischi e sistemi di controllo, e un assicuratore che esternalizza una funzione resta responsabile nei confronti della FINMA come se la svolgesse direttamente. Lo standard è un elenco pubblicato dei responsabili del trattamento, un luogo di trattamento noto e un fascicolo che mostra, per ogni decisione, se l’ha presa una persona o un sistema.
        </p>
        <p>
          True Aim archivia ed elabora i dati dei clienti su Microsoft Azure nella regione Switzerland North e non li trasferisce fuori dalla Svizzera per il trattamento ordinario. Il nostro elenco dei sub-responsabili è disponibile su richiesta, con servizio, categorie di dati e luogo di trattamento per ciascuno. Il fascicolo sinistro conteggia separatamente le decisioni umane e automatizzate ed elenca ogni azione in ordine cronologico per attore, così la responsabilità è visibile per ogni decisione, non affermata per l’insieme.
        </p>
      </>
    ),
  },
];
