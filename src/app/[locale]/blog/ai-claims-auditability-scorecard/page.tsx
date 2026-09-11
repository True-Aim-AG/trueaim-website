import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  Clock,
  ScrollText,
  User,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { scorecardQuestions, type ScorecardQuestion } from "./questions";
import { faqs } from "./faqs";

/**
 * Rendered as a server component with no scroll animation, unlike the older
 * posts. A 3,000 word article whose body starts at `opacity: 0` is invisible
 * until framer-motion hydrates, which costs first paint and hurts anyone on a
 * slow connection. The layout is otherwise the house style.
 */

// Short labels for the "On this page" panel; the H2s carry the full questions.
const sections: { id: string; heading: string }[] = [
  { id: "provenance", heading: "Provenance" },
  { id: "reconstruction", heading: "Reconstruction" },
  { id: "human-judgement", heading: "Human judgement" },
  { id: "continuity", heading: "Continuity" },
  { id: "the-principle", heading: "The principle behind True Aim" },
  { id: "using-the-scorecard", heading: "How to use the scorecard" },
];

const topics = [
  "Auditability",
  "Best Practice",
  "Decision Provenance",
  "Human Oversight",
  "FINMA",
  "Claims AI",
];

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
        <li key={item.question} className="glass-panel p-6">
          <h3 className="flex gap-3 font-semibold text-[var(--text-primary)] mb-3">
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm inline-flex items-center justify-center"
            >
              {number}
            </span>
            <span>{item.question}</span>
          </h3>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
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
      <EnglishOnlyBanner />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div
          aria-hidden="true"
          className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl"
        />

        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            All Articles
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
              <ClipboardCheck aria-hidden="true" className="w-4 h-4" />
              Best Practice
            </span>
          </div>

          <p className="text-base md:text-lg font-medium text-[var(--text-secondary)] mb-3">
            What should you ask before you trust AI with a claims decision?
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
            The AI Claims Auditability Scorecard
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            Twelve questions that show whether an AI claims system can account
            for every decision it makes, and how True Aim answers each one.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <User aria-hidden="true" className="w-4 h-4" />
              <span>
                <span className="text-[var(--text-secondary)]">
                  Reuben John
                </span>
                , CEO, True Aim AG
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar aria-hidden="true" className="w-4 h-4" />
              <time dateTime="2026-09-10">10 September 2026</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="w-4 h-4" />
              14 min read
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_16rem] gap-12">
            <article className="min-w-0 space-y-12">
              {/* The short answer */}
              <div>
                <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)] mb-8">
                  <h2 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                    The short answer
                  </h2>
                  <ul className="space-y-3 text-[var(--text-secondary)] leading-relaxed list-disc pl-5 marker:text-[var(--primary)]">
                    <li>
                      <strong className="text-[var(--text-primary)]">
                        Auditability is decided by architecture.
                      </strong>{" "}
                      A decision record written without provenance cannot be
                      given it afterwards.
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">
                        The EU AI Act&apos;s high-risk deadlines moved to
                        December 2027.
                      </strong>{" "}
                      Claims handling was never on that list, and GDPR has
                      governed automated decisions since 2018.
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">
                        Twelve questions in four groups:
                      </strong>{" "}
                      provenance, reconstruction, human judgement and
                      continuity.
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">
                        The decisive test is reconstruction.
                      </strong>{" "}
                      Take one claim closed last year and rebuild the decision
                      from the record alone.
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">
                        Only 24% of insurance leaders are very confident
                      </strong>{" "}
                      they could pass an independent review of AI governance and
                      controls, with centralised evidence, in the next 90 days.
                      Confidence is not evidence.
                    </li>
                  </ul>
                </div>

                <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-6">
                  A claim is a series of decisions. Which documents to trust.
                  Which clause applies. What the policy owes. Whether a line
                  item is fair. Automating those decisions is now within the
                  reach of any claims operation. Automating them so that each
                  one can be explained and defended, to a customer, an auditor
                  or a supervisor, years after the file was closed, is a
                  different discipline. That discipline is the subject of this
                  article.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The regulatory calendar has recently offered an excuse to
                  postpone it. In July 2026 the European Union deferred most of
                  the AI Act&apos;s high-risk obligations, to December 2027 for
                  standalone systems. Claims handling was never among the uses
                  the Act lists as high-risk, and the rights of a person subject
                  to a solely automated decision, including the right to
                  meaningful information about the logic involved, have applied
                  under GDPR since 2018. The deferral changes the calendar for
                  other systems. It does not change what a claims operation
                  owes the people whose claims it decides. We have set out the
                  detail separately in{" "}
                  <Link
                    href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                    className="text-[var(--primary)] hover:underline"
                  >
                    our article on the AI Act and claims handling
                  </Link>
                  .
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The stronger reason not to wait is practical. Evidence is
                  decided by architecture. A system that records where every
                  value came from, which rule or model produced it and who
                  confirmed it can answer any question put to it later. A
                  system that does not cannot be repaired after the fact,
                  because whatever the record failed to capture on the day is
                  gone. Compliance is either built in from the first claim or
                  added afterwards as a layer of explanation over decisions
                  nobody can reconstruct.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Grant Thornton&apos;s 2026 AI Impact Survey, fielded across
                  950 executives including 100 in insurance, found that only{" "}
                  <strong className="text-[var(--text-primary)]">24%</strong>{" "}
                  are very confident they could pass an independent review of AI
                  governance and controls, with centralised evidence, in the
                  next 90 days. At that sample size the figure is indicative,
                  but the direction is clear, and the gap is a records problem
                  before it is a modelling problem.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed">
                  The twelve questions below are the ones we believe every
                  claims leader should be able to answer about any AI operating
                  in their name, whether it was built in house or brought in.
                  Under each we set out what good looks like and how True Aim
                  approaches it. In most cases those are the same answer,
                  because True Aim was designed around these questions.
                </p>
              </div>

              {/* Group 1: provenance */}
              <div>
                <h2
                  id="provenance"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Can you show where each answer came from?
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Provenance is the foundation of everything that follows, and
                  the easiest property to test. Ask to see one real claim.
                </p>

                <QuestionGroup group="Provenance" />
              </div>

              {/* Group 2: reconstruction */}
              <div>
                <h2
                  id="reconstruction"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Can you rebuild a decision you closed last year?
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Reconstruction is what separates being ready for an audit
                  from preparing for one. Preparation is an exercise that begins
                  when the examination is announced. Readiness is a property
                  the system has while it runs, or does not have at all. Only
                  the second can answer a question about a claim closed
                  eighteen months ago.
                </p>

                <QuestionGroup group="Reconstruction" />
              </div>

              {/* Group 3: human judgement */}
              <div>
                <h2
                  id="human-judgement"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Is the human in the process genuinely deciding?
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Human judgement is the control most operations rely on and
                  the one least often tested. A review step is a genuine
                  control only when the reviewer can see the evidence and has
                  the authority to change the outcome. Under GDPR, a decision
                  that is solely automated gives the individual specific
                  rights, and a sign-off that nobody could realistically refuse
                  does not alter that. Designed well, the review step is also
                  where a claims professional&apos;s expertise is used best: on
                  the judgement, not the arithmetic.
                </p>

                <QuestionGroup group="Human judgement" />
              </div>

              {/* Group 4: continuity */}
              <div>
                <h2
                  id="continuity"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Does the evidence survive new claims, time and change?
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The last group looks beyond a single decision to the
                  conditions around it: how the system was proven, what happens
                  to the records when circumstances change, and where
                  accountability sits throughout.
                </p>

                <QuestionGroup group="Continuity" />
              </div>

              {/* The principle */}
              <div>
                <h2
                  id="the-principle"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  The principle behind True Aim
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Everything True Aim does either produces a decision, feeds a
                  decision or proves a decision. A claim is brought into a
                  single, complete record. The evidence is tested for integrity
                  before anything is decided, and anything that fails that gate
                  never reaches the decision stage. Each decision is computed
                  against the wording in force, with its reason attached. Every
                  action, by a person or a machine, is written to a
                  tamper-evident record that can be reconstructed, exported and
                  explained for as long as it is kept. The architecture is
                  described in full in{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-[var(--primary)] hover:underline"
                  >
                    our article on evidence chains
                  </Link>
                  .
                </p>

                <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)]">
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    That is what it means for compliance to be built in from the
                    first claim. The judgment stays with you. The arithmetic,
                    the wording and the evidence no longer need to.
                  </p>
                </div>
              </div>

              {/* Using the scorecard */}
              <div>
                <h2
                  id="using-the-scorecard"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  How to use the scorecard
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Choose one claim you closed last year, ideally a declined one,
                  and work through the twelve questions against that claim,
                  from the record alone. If the decision can be rebuilt field by
                  field in minutes, the operation can answer a customer, an
                  auditor or a supervisor under any regime, and the 2027 date is
                  a formality. If it takes a quarter, that is the real deadline,
                  and it was never 2027.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The test we would put to any board is simple. If a regulator
                  asked tomorrow to walk through one automated claims decision,
                  line by line, could you?
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed">
                  The scorecard applies to any system, including ours.{" "}
                  <Link
                    href="/trust"
                    className="text-[var(--primary)] hover:underline"
                  >
                    Our Trust Center
                  </Link>{" "}
                  sets out how True Aim answers each of these questions, and we
                  welcome the conversation.
                </p>
              </div>

              {/* Key takeaways */}
              <div>
                <h2
                  id="key-takeaways"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Key takeaways
                </h2>

                <div className="glass-panel-light p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Choose auditability at the point of design.
                        </strong>{" "}
                        Provenance recorded from the first claim is the only
                        kind there is.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Compute what can be computed.
                        </strong>{" "}
                        Rules where the wording covers the facts, models where
                        the evidence is unstructured, and a record that shows
                        which is which.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Make human judgement a real control.
                        </strong>{" "}
                        The reviewer sees the evidence, holds the authority to
                        change the outcome, and every override is captured with
                        its reason.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Prove performance on unseen claims first.
                        </strong>{" "}
                        An accuracy figure measured on the claims a system was
                        tuned against measures familiarity, not competence.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Keep the records yours.
                        </strong>{" "}
                        Tamper-evident, exportable in one click and retained to
                        match your own obligations.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2
                  id="faq"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Frequently asked questions
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="glass-panel p-6">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related reading */}
              <div>
                <h2
                  id="related-reading"
                  className="text-2xl font-bold text-[var(--text-primary)] mb-6 scroll-mt-24"
                >
                  Related reading
                </h2>

                <div className="space-y-4">
                  <div className="glass-panel-light p-5">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-medium text-[var(--primary)] hover:underline"
                    >
                      Building evidence chains that auditors actually accept
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      The architecture behind provenance and reconstruction.
                    </p>
                  </div>
                  <div className="glass-panel-light p-5">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-medium text-[var(--primary)] hover:underline"
                    >
                      Why AI pilots in claims stall before production readiness
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      Why testing on unseen claims decides whether a pilot
                      reaches production.
                    </p>
                  </div>
                  <div className="glass-panel-light p-5">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-medium text-[var(--primary)] hover:underline"
                    >
                      AI claims handling is not high-risk under the EU AI Act
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      Why the deferral changes nothing for a claims operation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div>
                <h2
                  id="sources"
                  className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6 pt-6 border-t border-[var(--border)] scroll-mt-24"
                >
                  Sources
                </h2>

                <ul className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
                  <li>
                    Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official
                    Journal 24 July 2026, in force 27 July 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regulation (EU) 2024/1689 (AI Act), Annex III and Article
                    113.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regulation (EU) 2016/679 (GDPR), Articles 15(1)(h) and 22.{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Guidance 08/2024: Governance and risk management when
                      using artificial intelligence
                    </em>
                    , 18 December 2024.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    FINMA,{" "}
                    <em>
                      Circular 2018/3: Outsourcing &ndash; banks, insurance
                      companies and selected financial institutions under FinIA
                    </em>
                    , last amended 4 November 2020, in force 1 January 2021,
                    margin no. 24.{" "}
                    <a
                      href="https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      finma.ch
                    </a>
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>,
                    insurance findings; fielded 23 February to 18 March 2026,
                    950 executives, 100 in insurance.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-[var(--border)] text-sm text-[var(--text-muted)] italic">
                  Regulatory position stated as at 10 September 2026. This is
                  not legal advice.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside aria-label="Article navigation">
              <div className="glass-panel p-6">
                <h2 className="font-semibold text-[var(--text-primary)] mb-4">
                  On this page
                </h2>
                <nav aria-label="On this page">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/trust"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white text-sm font-medium whitespace-nowrap hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    How we answer these
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollText
            aria-hidden="true"
            className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Zero Risk Does Not Exist. Explainable Decisions Do.
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Discuss how these twelve questions apply to your claims operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Get in Touch
              <ArrowRight aria-hidden="true" className="w-5 h-5" />
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
            >
              Trust Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
