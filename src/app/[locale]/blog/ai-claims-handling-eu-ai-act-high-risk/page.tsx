import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const annexRows: [string, string][] = [
  [
    "Reviewing life insurance applications, where the system processes age, health status, family history, lifestyle and occupation against mortality tables to guide acceptance and terms",
    "Claims management in health insurance once the insured event has happened: verifying whether a claim is valid under the policy terms or determining the amount payable",
  ],
  [
    "Predicting the expected annual medical cost for a risk group, where the resulting figure becomes the premium charged to that group",
    "Claims management used to improve the accuracy of claims processing and decision-making, such as validating claimant information against external databases",
  ],
  [
    "",
    "Product design for life insurance, where it is not used for risk assessment or pricing in individual cases",
  ],
];

const regimeRows: [string, string, string][] = [
  [
    "EU AI Act, high-risk chapter (Annex III)",
    "Life and health risk assessment and pricing. Not claims handling.",
    "Deferred to 2 December 2027 for standalone systems; 2 August 2028 for AI embedded in regulated products",
  ],
  [
    "GDPR Article 22",
    "Decisions based solely on automated processing producing legal or similarly significant effects, such as a declined or reduced claim",
    "25 May 2018",
  ],
  [
    "Switzerland's revised Federal Act on Data Protection",
    "Its own restriction on automated individual decision-making, for Swiss-established operations",
    "In force",
  ],
  [
    "UK GDPR",
    "The United Kingdom's retained equivalent of these rules",
    "In force",
  ],
  [
    "EIOPA Opinion EIOPA-BoS-25-360",
    "Supervisory expectations for insurance AI that is neither prohibited nor high-risk: governance, explainability, record-keeping",
    "6 August 2025",
  ],
];

const governanceStats: { value: string; label: string }[] = [
  {
    value: "61%",
    label:
      "of insurance leaders say their boards have established AI governance policies.",
  },
  {
    value: "68%",
    label:
      "say their AI controls exist, but the evidence is fragmented across teams and tools.",
  },
  {
    value: "24%",
    label:
      "are very confident they could pass an independent AI governance review within 90 days.",
  },
  {
    value: "44%",
    label:
      "say governance or compliance challenges have contributed to AI project failure or underperformance.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is AI claims handling high-risk under the EU AI Act?",
    a: "No. Annex III does not list claims handling. Point 5(c) covers risk assessment and pricing for life and health insurance only. The Commission's draft classification guidelines of 19 May 2026 give claims management as an example of a system falling outside that point, even for health insurance products. A motor, property, warranty or commercial-lines claims operation falls outside the high-risk regime, though it remains subject to data protection law and to sectoral insurance law.",
  },
  {
    q: "Is AI claims handling high-risk in health insurance?",
    a: "No. Health insurance is the sharpest test of the rule, because underwriting in that line is high-risk. The Commission's draft guidelines still place claims management outside point 5(c) there, on the basis that verifying a claim against policy terms or determining the amount payable is distinct from risk assessment or pricing.",
  },
  {
    q: "Does the December 2027 deferral apply to claims handling?",
    a: "It has no effect on it. The Digital Omnibus deferred the date on which high-risk obligations begin to apply. It did not change which systems are high-risk. Claims handling was not among them before the deferral or after it.",
  },
  {
    q: "What did Regulation (EU) 2026/1744 change?",
    a: "It deferred the AI Act's high-risk obligations. Standalone Annex III systems move from 2 August 2026 to 2 December 2027. AI embedded in regulated products moves from 2 August 2027 to 2 August 2028. It was published on 24 July 2026 and entered into force on 27 July 2026.",
  },
  {
    q: "Does GDPR Article 22 apply to an automated claims decision?",
    a: "Yes, where the GDPR is the applicable regime. Article 22 restricts decisions based solely on automated processing that produce legal effects or similarly significant effects. A declined or reduced claim meets that threshold. It has applied since 25 May 2018 and was unaffected by the AI Act deferral. Operations outside the EU answer to the equivalent provision in their own regime, such as Switzerland's revised Federal Act on Data Protection.",
  },
  {
    q: "What counts as meaningful human involvement?",
    a: "Under Article 29 Working Party guidance (WP251rev.01), review must be carried out by someone with the authority and competence to change the decision. Employees rubber-stamping automatically generated outputs do not take a controller outside Article 22.",
  },
  {
    q: "What must you disclose about the logic of an automated decision?",
    a: (
      <>
        In <em>Dun &amp; Bradstreet Austria</em> (C-203/22) the CJEU required the
        procedure and principles actually applied, communicated concisely and
        intelligibly, including how the outcome would differ had the data been
        different. Supplying the algorithm itself does not discharge the duty. A
        trade secret does not permit a blanket refusal.
      </>
    ),
  },
];

const sidebarTakeaways = [
  "Claims handling is absent from Annex III",
  "The Digital Omnibus deferral changes nothing for claims",
  "GDPR Article 22 has bound claims decisions since 2018",
  "Article 6(3) profiling override applies to life and health only",
  "EIOPA expects explainability under existing sectoral law",
  "Policy is not evidence: 61% have policies, 24% could prove them",
];

export default async function EUAIActClaimsBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-16">
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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              AI Claims Handling Is Not High-Risk Under the EU AI Act. Here Is
              What Binds It Instead.
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Claims handling is absent from Annex III. GDPR Article 22 binds it
              anyway. Only 24% of insurers say they could pass a governance
              review in 90 days.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Regulatory Analysis
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 max-w-3xl space-y-12">
              {/* The short answer */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-subtle mb-4">
                    The short answer
                  </h2>
                  <ul className="space-y-3 text-body leading-[1.6]">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          Claims handling is not in Annex III.
                        </strong>{" "}
                        The Commission&apos;s own draft classification
                        guidelines name claims management as an example of a
                        system falling outside point 5(c), and they use health
                        insurance, the one line where underwriting{" "}
                        <em>is</em> high-risk, to make the point.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          The Digital Omnibus deferral changes nothing for a
                          claims operation.
                        </strong>{" "}
                        The chapter that moved to December 2027 was never the
                        chapter that governed you.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          GDPR Article 22 is what binds
                        </strong>
                        . It has applied since 25 May 2018. A declined or
                        reduced claim sits squarely inside it. Swiss and UK
                        operations answer to their own equivalents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          EIOPA has already told supervisors what it expects
                        </strong>
                        : explainable outcomes and reproducible records under
                        existing sectoral law, scaled to the impact of the
                        system.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">&bull;</span>
                      <span>
                        <strong className="text-strong">
                          The test is reconstruction.
                        </strong>{" "}
                        If you cannot rebuild a closed decision on demand, the
                        deadline you missed was 2018, not 2027.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-body-lg text-strong mb-6">
                  On 24 July 2026 the Digital Omnibus on AI was published in the
                  Official Journal as Regulation (EU) 2026/1744. It entered into
                  force three days later. High-risk obligations for standalone
                  Annex III systems move from 2 August 2026 to 2 December 2027.
                  For AI embedded in regulated products, from 2 August 2027 to 2
                  August 2028.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Sixteen extra months, then.
                </p>

                <p className="text-body leading-[1.6]">
                  A claims operation did not get them. Not because the deferral
                  is narrow, but because claims handling was never in the
                  chapter that moved.
                </p>
              </MotionDiv>

              {/* Is AI claims handling high-risk */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Is AI claims handling high-risk under the EU AI Act?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  No. Annex III does not list it.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Point 5 of Annex III covers access to essential private and
                  public services. It names four things: evaluating eligibility
                  for essential public assistance benefits, where used by or on
                  behalf of public authorities; evaluating creditworthiness or
                  establishing a credit score, excluding systems used to detect
                  financial fraud;{" "}
                  <strong className="text-strong">
                    risk assessment and pricing in relation to natural persons
                    in the case of life and health insurance
                  </strong>
                  ; and the evaluation, classification and dispatch of emergency
                  calls.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Life and health risk assessment and pricing is in scope.
                  Motor, property, warranty and commercial-lines claims handling
                  is not.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  The Commission now says so itself. Its draft guidelines on the
                  classification of high-risk AI systems, published on 19 May
                  2026 and open for consultation until 23 June, set out worked
                  examples on both sides of the line.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    Annex III point 5(c): the Commission&apos;s worked examples
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Inside point 5(c): high-risk
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Outside point 5(c)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {annexRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4">{row[0]}</td>
                            <td className="py-3">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  The Commission&apos;s reasoning for the exclusion is worth
                  reading in its own words:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    These use cases are distinct from carrying out a risk
                    assessment or pricing, even though their outcome might
                    affect the enjoyment of the health insurance.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  Note which line of business that example uses. Health
                  insurance is the one place where underwriting <em>is</em>{" "}
                  high-risk. Claims management falls outside the use case even
                  there. The guidelines are draft and non-binding. The
                  Commission is explicit that authoritative interpretation of
                  the AI Act rests with the Court of Justice. But they are the
                  clearest official statement available and they point the same
                  way.
                </p>

                <p className="text-body leading-[1.6]">
                  That is the answer to the question. It is also where most
                  readings stop and where the two things that actually decide
                  your exposure begin. They are different questions for
                  different systems. Conflating them is how compliance plans go
                  wrong.
                </p>
              </MotionDiv>

              {/* Four terms */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Four terms that decide the answer
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 space-y-5">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Annex III.</strong>{" "}
                    The list of high-risk use cases in Regulation (EU)
                    2024/1689. A system is high-risk under this route only if it
                    matches a use case on the list. Adjacency to a listed use
                    case is not membership of it.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Profiling.</strong>{" "}
                    Automated evaluation of personal aspects of a natural
                    person: economic situation, health, reliability, behaviour.
                    The AI Act borrows the term from the GDPR. It carries
                    decisive weight in Article 6(3).
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">
                      A solely automated decision.
                    </strong>{" "}
                    Under GDPR Article 22, a decision reached without meaningful
                    human involvement that produces legal effects or similarly
                    significant ones. A human who cannot in practice overturn
                    the output does not make the decision jointly.
                  </p>
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Audit-readiness.</strong>{" "}
                    The property of being able to reconstruct a past decision
                    from records the system produced at the time. It is distinct
                    from audit-preparation, which is an exercise you run before
                    an examination.
                  </p>
                </div>
              </MotionDiv>

              {/* Profiling closes the exit */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  If you do have an Annex III system, profiling closes the exit
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  This applies to life and health risk assessment and pricing,
                  not to claims handling. If you run those systems, read on. If
                  you do not, skip to the next section, because Article 6(3) has
                  nothing to say about you.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Carriers inside Annex III generally plan to escape via Article
                  6(3), which lifts high-risk status where a system &ldquo;does
                  not pose a significant risk of harm to the health, safety or
                  fundamental rights of natural persons, including by not
                  materially influencing the outcome of decision making&rdquo;
                  and meets one of four conditions: a narrow procedural task,
                  improving a previously completed human activity, detecting
                  patterns without replacing human assessment or performing a
                  preparatory task.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  One sentence cancels all four:
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-6">
                  <p className="text-body-lg text-strong italic">
                    Notwithstanding the first subparagraph, an AI system
                    referred to in Annex III shall always be considered to be
                    high-risk where the AI system performs profiling of natural
                    persons.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6] mb-5">
                  A life or health pricing model that segments individuals on
                  economic situation, health, reliability or behaviour is
                  profiling. The derogation does not reach it.
                </p>

                <p className="text-body leading-[1.6]">
                  Article 6(4) then closes the loop. A provider who considers an
                  Annex III system not high-risk must document that assessment
                  before the system is placed on the market or put into service,
                  register it under Article 49(2) regardless and produce the
                  documentation to national competent authorities on request.
                  Not-high-risk is a filing, not an absence of paperwork.
                </p>
              </MotionDiv>

              {/* Which regime binds */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Which regime actually binds a European claims operation?
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h3 className="text-caption-sm text-subtle mb-4">
                    What reaches a claims operation and from when
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            Instrument
                          </th>
                          <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">
                            What it reaches
                          </th>
                          <th className="text-left py-3 font-display font-medium text-strong align-top">
                            Applies from
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        {regimeRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-hairline align-top"
                          >
                            <td className="py-3 pr-4 font-display font-medium text-strong">
                              {row[0]}
                            </td>
                            <td className="py-3 pr-4">{row[1]}</td>
                            <td className="py-3">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  The pattern is the one that catches people out. The instrument
                  everyone is preparing for is the one that does not reach them.
                  The instrument that does reach them has been in force for
                  eight years.
                </p>
              </MotionDiv>

              {/* Article 22 */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Does GDPR Article 22 apply to an automated claims decision?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Yes. Unlike the AI Act it has applied since 25 May 2018.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  One qualifier before the detail. The GDPR is not the only data
                  protection regime a European claims operation can answer to.
                  Which instrument binds you depends on where you are
                  established and whose data you process. What follows is the
                  GDPR&apos;s analysis. Read it as the pattern rather than the
                  whole map and confirm the instrument that governs your own
                  book.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Article 22 restricts decisions based solely on automated
                  processing that produce legal effects or similarly significant
                  ones. A declined or reduced claim meets that bar.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  Three sources define what that now requires. None of them
                  moved in July.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Automated scores can themselves be decisions.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>OQ v Land Hessen</em>, the SCHUFA case (C-634/21, 7
                      December 2023), the CJEU held that the automated
                      generation of a probability value about a person&apos;s
                      ability to meet payment commitments is itself automated
                      individual decision-making under Article 22(1), where a
                      third party receiving that value draws strongly on it to
                      establish, implement or terminate a contract. The duty
                      attaches to the party producing the score, not only the
                      party acting on it.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      A sign-off is not oversight.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      Under the Article 29 Working Party guidelines on automated
                      decision-making (WP251rev.01), endorsed by the EDPB, human
                      involvement escapes Article 22 only where it is
                      meaningful, carried out by someone with the authority and
                      competence to change the decision. The guidelines state
                      directly that employees rubber-stamping automatically
                      generated profiles will not take a controller outside
                      Article 22.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      An explanation has a defined standard.
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      In <em>Dun &amp; Bradstreet Austria</em> (C-203/22, 27
                      February 2025) the CJEU set out what &ldquo;meaningful
                      information about the logic involved&rdquo; requires under
                      Article 15(1)(h): the procedure and principles actually
                      applied to reach the decision, communicated concisely and
                      intelligibly. The Court did not require a causal account
                      of how one individual&apos;s data drove their result. It
                      indicated instead that explaining how the outcome would
                      differ had the data been different can satisfy the duty.
                      It also held that handing over the algorithm does not
                      discharge it, because a complex mathematical formula is
                      neither concise nor intelligible. It held too that a trade
                      secret does not permit a blanket refusal: the controller
                      must put the disputed information to the supervisory
                      authority or a court to balance.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6]">
                  That is a comparative standard, not a narrative one. Answering
                  it requires knowing what the system actually did with which
                  inputs.
                </p>
              </MotionDiv>

              {/* EIOPA */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Where the sector supervisor sits
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  EIOPA&apos;s{" "}
                  <em>Opinion on AI governance and risk management</em>{" "}
                  (EIOPA-BoS-25-360, 6 August 2025) is addressed to national
                  supervisors and deals specifically with insurance AI systems
                  that are neither prohibited nor high-risk under the AI Act. It
                  is built on the Insurance Distribution Directive, Solvency II,
                  the Digital Operational Resilience Act and the Solvency II and
                  IDD delegated regulations, not on the AI Act.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Its own framing is the point worth taking. Those systems, it
                  says, &ldquo;continue to operate subject to existing sectoral
                  legislation without new requirements&rdquo;, the exceptions
                  being certain transparency duties, the promotion of staff AI
                  literacy and voluntary codes of conduct. EIOPA is not adding a
                  regime. It is telling supervisors that the one already in
                  force applies.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Within it, undertakings should ensure the outcomes of AI
                  systems can be meaningfully explained and should keep
                  appropriate records of training and testing data and of
                  modelling methodologies to enable reproducibility and
                  traceability. Expectations scale with impact: limited for
                  systems that barely touch customers, more stringent for those
                  that do.
                </p>

                <p className="text-body leading-[1.6]">
                  Claims handling therefore leaves the AI Act&apos;s heaviest
                  chapter and arrives at a proportionate but real set of
                  expectations by a different route. The obligation does not
                  disappear. It changes address.
                </p>
              </MotionDiv>

              {/* Cost of not explaining */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  What does it cost to be unable to explain a decision?
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  The Hamburg data protection authority fined a financial
                  services provider EUR 492,000, reported on 30 September 2025.
                  The firm rejected credit card applications automatically,
                  including from applicants with demonstrably good
                  creditworthiness, without human oversight. The
                  regulator&apos;s finding was not that the model was wrong. It
                  was that the company did not adequately explain the logic
                  behind its algorithmic decisions, nor provide sufficient
                  access to the underlying rationale when asked.
                </p>

                <p className="text-body leading-[1.6]">
                  The authority expressly treated the firm&apos;s cooperation as
                  a significant mitigating factor. That was the discounted
                  price.
                </p>
              </MotionDiv>

              {/* The gap */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  The gap that will actually catch carriers
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Grant Thornton&apos;s 2026 AI Impact Survey, fielded 23
                  February to 18 March 2026 across 950 executives including 100
                  in insurance, found:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {governanceStats.map((stat) => (
                    <div
                      key={stat.value}
                      className="bg-card shadow-card rounded-pill px-[29px] py-[27px]"
                    >
                      <div className="text-kpi text-accent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-body leading-[1.6]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Grant Thornton&apos;s own reading: &ldquo;Most insurers
                  already have AI governance policies in place, but they
                  haven&apos;t built the operational infrastructure to prove and
                  test them.&rdquo;
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  The distance between 61 and 24 is the whole problem. That same
                  fragmentation is what strands pilots short of production, for
                  the same reason: it is structural rather than a modelling
                  defect and it is found late. We covered that pattern in{" "}
                  <Link
                    href="/blog/why-claims-ai-pilots-stall"
                    className="text-link hover:underline"
                  >
                    why claims AI pilots stall before production readiness
                  </Link>
                  .
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    A policy is a claim about how you behave. Evidence is proof
                    that you did. Supervisors examine the second.
                  </p>
                </div>
              </MotionDiv>

              {/* Why 2027 does not help */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Why the 2027 date does not help
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Field-level provenance, tamper-evident decision logs and
                  versioned, reproducible decision records are architectural
                  properties. They are determined when the pipeline is designed
                  and they cannot be added afterwards, because a log written
                  without provenance cannot be enriched with provenance later.
                  The decision it recorded is gone.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  This is why audit-readiness and audit-preparation are
                  different things. Preparation is an exercise you run before an
                  examination. Readiness is a property the system either has
                  while it runs or does not have at all. Only one of them
                  answers a question about a claim closed last year.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  An explanation is an opinion about a decision. Provenance is
                  evidence of one. <em>Dun &amp; Bradstreet</em> asks what the
                  system would have produced from different inputs. Only the
                  second can answer. The architecture we use to produce it is
                  set out in{" "}
                  <Link
                    href="/blog/auditability-evidence-chains"
                    className="text-link hover:underline"
                  >
                    auditability in claims AI: building evidence chains that
                    auditors actually accept
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6]">
                  There is a design consequence worth stating plainly. The more
                  of a decision that runs on deterministic rules rather than a
                  model, the less of it needs explaining under a comparative
                  standard, because the rule <em>is</em> the explanation. On a
                  European vehicle warranty programme we route{" "}
                  <Link
                    href="/case-studies/vehicle-warranty-claims"
                    className="text-link hover:underline"
                  >
                    80 to 90% of line items through deterministic logic
                  </Link>
                  , with the model confined to document understanding. That is
                  an architectural choice with a compliance dividend, not a
                  compliance measure bolted on afterwards.
                </p>
              </MotionDiv>

              {/* The test */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  The test worth running this week
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Take one closed claim from last year. Ask your team to
                  reconstruct the decision: every field and where it came from,
                  which model version ran, what a human changed and on what
                  basis. The twelve questions to put to that record are set
                  out in{" "}
                  <Link
                    href="/blog/ai-claims-auditability-scorecard"
                    className="text-link hover:underline"
                  >
                    the AI claims auditability scorecard
                  </Link>
                  .
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  If that takes one click, you can answer a supervisor under any
                  of the regimes above. The 2027 date is a formality.
                </p>

                <p className="text-body leading-[1.6] mb-6">
                  If it takes a quarter, you have found the real deadline. It
                  was not 2 December 2027. It was 25 May 2018. The deferral did
                  not move it.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Reconstructing a decision on demand is what{" "}
                    <Link
                      href="/platform/claims-decisioning"
                      className="underline hover:no-underline"
                    >
                      MIRA
                    </Link>{" "}
                    is built to do: agentic document understanding on the input
                    side, deterministic logic on the decision side and a record
                    of both.
                  </p>
                </div>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Key takeaways
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Claims handling is not listed in Annex III.
                        </strong>{" "}
                        Only life and health risk assessment and pricing appear,
                        under point 5(c). The Commission&apos;s draft
                        classification guidelines of 19 May 2026 give claims
                        management as an example of a system falling outside
                        that point, even in health insurance.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          The Digital Omnibus deferral does not help a claims
                          operation
                        </strong>
                        , because the chapter that moved was never the one that
                        governed it.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          GDPR Article 22 is the binding constraint in the EU
                        </strong>
                        . It has applied since 25 May 2018. A declined or
                        reduced claim is squarely within it. Swiss and UK
                        operations answer to their own equivalents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          The Article 6(3) profiling override is a trap for life
                          and health systems only.
                        </strong>{" "}
                        It cannot rescue or condemn a system that was never in
                        Annex III.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body leading-[1.6]">
                        <strong className="text-strong">
                          Policy is not evidence.
                        </strong>{" "}
                        61% of insurers have board-level AI governance policies;
                        24% believe they could pass a governance review in 90
                        days.
                      </span>
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Frequently asked questions
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <h3 className="font-display font-semibold text-strong mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-sm text-body leading-[1.6]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionDiv>

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Related reading
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/why-claims-ai-pilots-stall"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Why claims AI pilots stall before production readiness
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      The structural reasons pilots do not reach production.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/auditability-evidence-chains"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Auditability in claims AI: building evidence chains that
                      auditors actually accept
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      The architecture behind the reconstruction test above.
                    </p>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/case-studies/vehicle-warranty-claims"
                      className="font-display font-medium text-link hover:underline"
                    >
                      Vehicle warranty provider achieves 98% decision accuracy
                      in 7 days
                    </Link>
                    <p className="text-sm text-subtle mt-1">
                      The programme the deterministic-routing figure comes from.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-caption-sm text-subtle mb-6 pt-6 border-t border-hairline">
                  Sources
                </h2>

                <ul className="space-y-3 text-sm text-subtle leading-[1.6] list-disc pl-5">
                  <li>
                    Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official
                    Journal, 24 July 2026; in force 27 July 2026.{" "}
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eur-lex.europa.eu
                    </a>
                  </li>
                  <li>
                    Regulation (EU) 2024/1689 (AI Act), Annex III point 5;
                    Article 6(3) and 6(4); Article 49(2).{" "}
                    <a
                      href="https://artificialintelligenceact.eu/annex/3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      artificialintelligenceact.eu
                    </a>
                  </li>
                  <li>
                    European Commission,{" "}
                    <em>
                      Draft Guidelines on the classification of high-risk AI
                      systems
                    </em>{" "}
                    (Annex III volume), 19 May 2026; consultation closed 23 June
                    2026; non-binding.{" "}
                    <a
                      href="https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      digital-strategy.ec.europa.eu
                    </a>
                  </li>
                  <li>
                    CJEU, <em>OQ v Land Hessen</em> (SCHUFA), C-634/21, 7
                    December 2023.
                  </li>
                  <li>
                    CJEU,{" "}
                    <em>
                      CK v Magistrat der Stadt Wien / Dun &amp; Bradstreet
                      Austria GmbH
                    </em>
                    , C-203/22, 27 February 2025.
                  </li>
                  <li>
                    Article 29 Working Party,{" "}
                    <em>
                      Guidelines on Automated individual decision-making and
                      Profiling
                    </em>
                    , WP251rev.01, endorsed by the EDPB.
                  </li>
                  <li>
                    EIOPA,{" "}
                    <em>
                      Opinion on Artificial Intelligence governance and risk
                      management
                    </em>
                    , EIOPA-BoS-25-360, 6 August 2025.{" "}
                    <a
                      href="https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      eiopa.europa.eu
                    </a>
                  </li>
                  <li>
                    Hamburg Commissioner for Data Protection and Freedom of
                    Information, EUR 492,000 fine, reported 30 September 2025.
                  </li>
                  <li>
                    Grant Thornton, <em>2026 AI Impact Survey Report</em>,
                    insurance findings; fielded 23 February to 18 March 2026,
                    950 executives, 100 in insurance.{" "}
                    <a
                      href="https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline"
                    >
                      grantthornton.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 pt-6 border-t border-hairline text-sm text-subtle italic">
                  Regulatory position stated as at 31 July 2026. This is not
                  legal advice. Confirm classification and sequencing for your
                  own systems with qualified counsel.
                </p>
              </MotionDiv>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h3 className="font-display font-semibold text-strong mb-4">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {sidebarTakeaways.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-body">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h4 className="text-caption-sm text-subtle mb-3">
                    Related Topics
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "EU AI Act",
                      "Annex III",
                      "GDPR Article 22",
                      "EIOPA",
                      "Claims AI",
                      "Governance",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-pill bg-accent-soft text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    Talk to Us
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Can You Reconstruct Last Year&apos;s Decision?
            </h2>
            <p className="text-lg text-body mb-10">
              We build claims systems where every decision can be rebuilt from
              the record it produced at the time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/platform/claims-decisioning" variant="on-dark" size="lg">
                Explore MIRA
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
