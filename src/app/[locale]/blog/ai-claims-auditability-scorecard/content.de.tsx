import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ScrollText,
  User, ArrowRight } from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { scorecardQuestions, type ScorecardQuestion } from "./questions.de";
import { faqs } from "./faqs.de";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Auf dieser Seite" panel; the H2s carry the full questions.
const sections: { id: string; heading: string }[] = [
  { id: "provenance", heading: "Herkunft" },
  { id: "reconstruction", heading: "Rekonstruktion" },
  { id: "human-judgement", heading: "Menschliches Urteil" },
  { id: "continuity", heading: "Kontinuität" },
  { id: "the-principle", heading: "Das Prinzip hinter True Aim" },
  { id: "using-the-scorecard", heading: "So nutzen Sie die Scorecard" },
];

/**
 * One group of scorecard questions as a numbered list of house cards. The
 * numbering runs 1..12 across all four groups, so each list continues from
 * the previous one rather than restarting.
 */
function QuestionGroup({ group }: { group: ScorecardQuestion["group"] }) {
  const items = scorecardQuestions
    .map((item, index) => ({ item, number: index + 1 }))
    .filter(({ item }) => item.group === group);
  return (
    <ol
      start={items[0]?.number}
      role="list"
      className="space-y-4 list-none p-0"
    >
      {items.map(({ item, number }) => (
        <li
          key={item.question}
          className="bg-card shadow-card rounded-pill p-8"
        >
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {number}
            </span>
            <span>{item.question}</span>
          </h3>
          <div className="text-sm text-body leading-[1.6] space-y-3">
            {item.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function AuditabilityScorecardBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "72% 18%" }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              Alle Artikel
            </Link>

            {/* Standfirst question */}
            <p className="text-base md:text-lg font-medium text-body mb-3">
              Was sollten Sie fragen, bevor Sie einer KI eine Schadenentscheidung anvertrauen?
            </p>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Die Prüfbarkeits-Scorecard für KI in der Schadenbearbeitung
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Zwölf Fragen, die zeigen, ob ein KI-System für Schadenfälle jede seiner Entscheidungen belegen kann, und wie True Aim jede davon beantwortet.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO, True Aim
                  AG
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                14 Min. Lesezeit
              </div>
              <Link href="/authors/reuben-john" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                Über den Autor
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0 max-w-3xl space-y-12">
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    Die kurze Antwort
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Prüfbarkeit entscheidet sich in der Architektur.
                        </strong>{" "}
                        Eine Entscheidungsakte, die ohne Herkunftsnachweise geschrieben wurde, lässt sich nachträglich nicht damit ausstatten.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Die Hochrisiko-Fristen des EU AI Act (KI-Verordnung) wurden auf Dezember 2027 verschoben.
                        </strong>{" "}
                        Die Schadenbearbeitung stand nie auf dieser Liste, und die DSGVO regelt automatisierte Entscheidungen seit 2018.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Zwölf Fragen in vier Gruppen:
                        </strong>{" "}
                        Herkunft, Rekonstruktion, menschliches Urteil und Kontinuität.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Der entscheidende Test ist die Rekonstruktion.
                        </strong>{" "}
                        Nehmen Sie einen im letzten Jahr abgeschlossenen Schadenfall und bauen Sie die Entscheidung allein aus der Akte nach.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Nur 24 % der Führungskräfte in der Versicherungsbranche sind sehr zuversichtlich,
                        </strong>{" "}
                        in den nächsten 90 Tagen eine unabhängige Prüfung ihrer KI-Governance und -Kontrollen mit zentral vorliegenden Nachweisen zu bestehen. Zuversicht ist kein Nachweis.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  Ein Schadenfall ist eine Folge von Entscheidungen. Welchen Dokumenten zu vertrauen ist. Welche Klausel gilt. Was die Police schuldet. Ob eine Rechnungsposition angemessen ist. Diese Entscheidungen zu automatisieren, ist heute für jede Schadenorganisation erreichbar. Sie so zu automatisieren, dass jede einzelne gegenüber einem Kunden, einem Prüfer oder einer Aufsichtsbehörde noch Jahre nach Abschluss der Akte erklärt und verteidigt werden kann, ist eine andere Disziplin. Diese Disziplin ist das Thema dieses Artikels.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Der regulatorische Kalender hat zuletzt einen Vorwand geliefert, dies aufzuschieben. Im Juli 2026 hat die Europäische Union die meisten Hochrisiko-Pflichten des AI Act verschoben, für eigenständige Systeme auf Dezember 2027. Die Schadenbearbeitung gehörte nie zu den Anwendungen, die die Verordnung als hochriskant einstuft, und die Rechte einer Person, die einer ausschließlich automatisierten Entscheidung unterliegt, einschließlich des Rechts auf aussagekräftige Informationen über die involvierte Logik, gelten nach der DSGVO seit 2018. Die Verschiebung ändert den Kalender für andere Systeme. Sie ändert nichts daran, was eine Schadenorganisation den Menschen schuldet, über deren Schadenfälle sie entscheidet. Die Einzelheiten haben wir separat dargelegt in{" "}
                  <Link
                    href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                    className="text-link underline underline-offset-2"
                  >
                    unserem Artikel zum AI Act und zur Schadenbearbeitung
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Der stärkere Grund, nicht zu warten, ist praktischer Natur. Nachweise entscheiden sich in der Architektur. Ein System, das festhält, woher jeder Wert stammt, welche Regel oder welches Modell ihn erzeugt hat und wer ihn bestätigt hat, kann jede Frage beantworten, die ihm später gestellt wird. Ein System, das das nicht tut, lässt sich nachträglich nicht reparieren, denn was die Akte an jenem Tag nicht erfasst hat, ist verloren. Compliance ist entweder vom ersten Schadenfall an eingebaut oder wird nachträglich als Erklärungsschicht über Entscheidungen gelegt, die niemand rekonstruieren kann.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Die AI Impact Survey 2026 von Grant Thornton, erhoben unter 950 Führungskräften, davon 100 aus der Versicherungsbranche, ergab, dass nur{" "}
                  <strong className="text-strong">24 %</strong> sehr zuversichtlich sind, in den nächsten 90 Tagen eine unabhängige Prüfung ihrer KI-Governance und -Kontrollen mit zentral vorliegenden Nachweisen zu bestehen. Bei dieser Stichprobengröße ist der Wert indikativ, aber die Richtung ist klar, und die Lücke ist zuerst ein Problem der Aufzeichnungen, bevor sie ein Problem der Modellierung ist.
                </p>

                <p className="text-body leading-[1.6]">
                  Die zwölf Fragen unten sind diejenigen, die unserer Überzeugung nach jede Führungskraft im Schadenbereich zu jeder KI beantworten können sollte, die in ihrem Namen arbeitet, ob selbst entwickelt oder eingekauft. Unter jeder Frage legen wir dar, was eine gute Antwort auszeichnet und wie True Aim an sie herangeht. In den meisten Fällen ist das dieselbe Antwort, denn True Aim wurde um diese Fragen herum entworfen.
                </p>
              </MotionDiv>

              {/* Group 1: provenance */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="provenance"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Können Sie zeigen, woher jede Antwort stammt?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Die Herkunft ist das Fundament für alles Weitere und die am einfachsten zu prüfende Eigenschaft. Lassen Sie sich einen echten Schadenfall zeigen.
                </p>

                <QuestionGroup group="Provenance" />
              </MotionDiv>

              {/* Group 2: reconstruction */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="reconstruction"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Können Sie eine Entscheidung nachbauen, die Sie letztes Jahr getroffen haben?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Rekonstruktion ist das, was Prüfungsbereitschaft von Prüfungsvorbereitung trennt. Vorbereitung ist eine Übung, die beginnt, wenn die Prüfung angekündigt wird. Bereitschaft ist eine Eigenschaft, die das System im laufenden Betrieb hat oder überhaupt nicht. Nur die zweite kann eine Frage zu einem vor achtzehn Monaten abgeschlossenen Schadenfall beantworten.
                </p>

                <QuestionGroup group="Reconstruction" />
              </MotionDiv>

              {/* Group 3: human judgement */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="human-judgement"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Entscheidet der Mensch im Prozess wirklich?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Das menschliche Urteil ist die Kontrolle, auf die sich die meisten Organisationen verlassen, und die am seltensten geprüfte. Ein Prüfschritt ist nur dann eine echte Kontrolle, wenn der Prüfer die Nachweise sehen kann und die Befugnis hat, das Ergebnis zu ändern. Nach der DSGVO verleiht eine ausschließlich automatisierte Entscheidung der betroffenen Person bestimmte Rechte, und eine Freigabe, die realistisch niemand verweigern könnte, ändert daran nichts. Gut gestaltet ist der Prüfschritt zugleich der Ort, an dem die Expertise einer Schadenfachkraft am besten eingesetzt wird: für das Urteil, nicht für die Arithmetik.
                </p>

                <QuestionGroup group="Human judgement" />
              </MotionDiv>

              {/* Group 4: continuity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="continuity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Überstehen die Nachweise neue Schadenfälle, Zeit und Veränderung?
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Die letzte Gruppe blickt über die einzelne Entscheidung hinaus auf die Bedingungen um sie herum: wie das System erprobt wurde, was mit den Aufzeichnungen geschieht, wenn sich die Umstände ändern, und wo die Verantwortung durchgehend liegt.
                </p>

                <QuestionGroup group="Continuity" />
              </MotionDiv>

              {/* The principle */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-principle"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Das Prinzip hinter True Aim
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Alles, was True Aim tut, erzeugt entweder eine Entscheidung, speist eine Entscheidung oder belegt eine Entscheidung. Ein Schadenfall wird in eine einzige, vollständige Akte überführt. Die Nachweise werden auf Integrität geprüft, bevor irgendetwas entschieden wird, und was an diesem Tor scheitert, erreicht die Entscheidungsstufe nie. Jede Entscheidung wird anhand des geltenden Wortlauts berechnet, mit ihrer Begründung daran. Jede Handlung, von einer Person oder einer Maschine, wird in eine manipulationserkennbare Akte geschrieben, die so lange rekonstruiert, exportiert und erklärt werden kann, wie sie aufbewahrt wird. Die Architektur ist vollständig beschrieben in{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link underline underline-offset-2"
                  >
                    unserem Artikel zu Nachweisketten
                  </Link>
                  .
                </p>

                <div className="mt-6 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Das bedeutet es, wenn Compliance vom ersten Schadenfall an eingebaut ist. Das Urteil bleibt bei Ihnen. Arithmetik, Wortlaut und Nachweise müssen es nicht mehr.
                  </p>
                </div>
              </MotionDiv>

              {/* Using the scorecard */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="using-the-scorecard"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  So nutzen Sie die Scorecard
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Wählen Sie einen Schadenfall, den Sie letztes Jahr abgeschlossen haben, idealerweise einen abgelehnten, und gehen Sie die zwölf Fragen an diesem Fall durch, allein anhand der Akte. Lässt sich die Entscheidung Feld für Feld in Minuten nachbauen, kann die Organisation einem Kunden, einem Prüfer oder einer Aufsichtsbehörde unter jedem Regime antworten, und das Datum 2027 ist eine Formalität. Dauert es ein Quartal, ist das die echte Frist, und sie lag nie bei 2027.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Der Test, den wir jedem Vorstand stellen würden, ist einfach. Wenn eine Aufsichtsbehörde morgen darum bäte, eine automatisierte Schadenentscheidung Zeile für Zeile durchzugehen: Könnten Sie das?
                </p>

                <p className="text-body leading-[1.6]">
                  Die Scorecard gilt für jedes System, auch für unseres.{" "}
                  <Link href="/trust" className="text-link underline underline-offset-2">
                    Unser Trust Center
                  </Link>{" "}
                  zeigt, wie True Aim jede dieser Fragen beantwortet, und wir freuen uns auf das Gespräch.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Das Wichtigste in Kürze
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Entscheiden Sie sich für Prüfbarkeit beim Design.
                        </strong>{" "}
                        Herkunft, die vom ersten Schadenfall an aufgezeichnet wird, ist die einzige, die es gibt.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Berechnen Sie, was sich berechnen lässt.
                        </strong>{" "}
                        Regeln, wo der Wortlaut die Fakten abdeckt, Modelle, wo die Nachweise unstrukturiert sind, und eine Akte, die beides auseinanderhält.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Machen Sie das menschliche Urteil zu einer echten Kontrolle.
                        </strong>{" "}
                        Der Prüfer sieht die Nachweise, hat die Befugnis, das Ergebnis zu ändern, und jede Übersteuerung wird mit ihrer Begründung erfasst.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Belegen Sie die Leistung zuerst auf ungesehenen Schadenfällen.
                        </strong>{" "}
                        Eine Genauigkeit, die auf den Schadenfällen gemessen wurde, auf die ein System abgestimmt ist, misst Vertrautheit, nicht Kompetenz.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Behalten Sie die Aufzeichnungen in Ihrer Hand.
                        </strong>{" "}
                        Manipulationserkennbar, mit einem Klick exportierbar und so lange aufbewahrt, wie Ihre eigenen Pflichten es verlangen.
                      </span>
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="faq"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Häufige Fragen
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionDiv>

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="related-reading"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Weiterführende Artikel
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Nachweisketten bauen, die Prüfer tatsächlich akzeptieren
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Die Architektur hinter Herkunft und Rekonstruktion.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Warum KI-Piloten in der Schadenbearbeitung vor der Produktionsreife stecken bleiben
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Warum Tests auf ungesehenen Schadenfällen entscheiden, ob ein Pilot die Produktion erreicht.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      KI in der Schadenbearbeitung ist nach dem EU AI Act nicht hochriskant
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      Warum die Verschiebung für eine Schadenorganisation nichts ändert.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sources"
                  className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline scroll-mt-24"
                >
                  Quellen
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Verordnung (EU) 2026/1744 (Digitaler Omnibus zu KI), Amtsblatt vom 24. Juli 2026, in Kraft seit 27. Juli 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Verordnung (EU) 2024/1689 (KI-Verordnung), Anhang III und Artikel 113.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Verordnung (EU) 2016/679 (DSGVO), Artikel 15 Absatz 1 Buchstabe h und Artikel 22.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Aufsichtsmitteilung 08/2024: Governance und Risikomanagement beim Einsatz von Künstlicher Intelligenz
                    </em>
                    , 18. Dezember 2024.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Rundschreiben 2018/3: Outsourcing – Banken, Versicherer und nach FINIG beaufsichtigte Institute
                    </em>
                    , zuletzt geändert am 4. November 2020, in Kraft seit 1. Januar 2021, Rz 24.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>, Ergebnisse für die Versicherungsbranche; Erhebung vom 23. Februar bis 18. März 2026, 950 Führungskräfte, davon 100 aus der Versicherungsbranche.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link underline underline-offset-2"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Regulatorischer Stand: 10. September 2026. Dies ist keine Rechtsberatung.
                </p>
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Artikelnavigation">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  Auf dieser Seite
                </h2>
                <nav aria-label="Auf dieser Seite">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-body hover:text-accent transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Zum Trust Center
                    <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Null Risiko gibt es nicht. Erklärbare Entscheidungen schon.
            </h2>
            <p className="text-lg text-body mb-10">
              Besprechen Sie mit uns, wie diese zwölf Fragen auf Ihre Schadenbearbeitung zutreffen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Kontakt aufnehmen
              </ButtonLink>
              <ButtonLink href="/trust" variant="on-dark" size="lg">
                Trust Center
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
