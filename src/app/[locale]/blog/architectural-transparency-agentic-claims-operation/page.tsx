import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  ScrollText,
  User,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { ButtonLink } from "@/components/brand/Button";
import { ComparisonTable, FaqBlock, TextureBackdrop } from "@/components/content";
import {
  ClaimChainDiagram,
  PriceEngineDiagram,
  SharedRecordDiagram,
} from "./diagrams";
import { faqs } from "./faqs";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "On this page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "sovereign-fragment-problem", heading: "The sovereign fragment problem" },
  { id: "glass-box", heading: "The glass box" },
  { id: "price-integrity", heading: "Empirical price integrity" },
  { id: "four-pillars", heading: "The four pillars" },
  { id: "judgement-dividend", heading: "The judgement dividend" },
  { id: "implementation-controls", heading: "Structural realities" },
  { id: "implementation-roadmap", heading: "The implementation roadmap" },
  { id: "core-takeaways", heading: "Core takeaways" },
];

const topics = [
  "Claims AI",
  "Agentic AI",
  "Shared Claim Record",
  "Auditability",
  "Price Integrity",
  "Operating Model",
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const partyViews: BulletItem[] = [
  {
    text: "The Insurer operates from an enterprise governance workbench with instant statutory compliance tracking.",
  },
  {
    text: "The Policyholder tracks real-time evidentiary ingestion, observing precisely which documents are verified and which requirements remain outstanding directly on screen.",
  },
  {
    text: "The Intermediary monitors capacity consumption, binder limits and real-time SLA metrics without issuing a status query.",
  },
  {
    text: "The Specialist Contractor submits line-item estimates and receives immediate, deterministic validation against coverage terms.",
  },
];

const decisionRecord: string[] = [
  "The exact factual predicate and supporting exhibits relied upon;",
  "The specific rule, statistical model or contract wording version in force;",
  "The deterministic plain-language rationale;",
  "The exact identity of the human or agentic actor executing the change.",
];

const priceSteps: NumberedItem[] = [
  {
    title: "Deterministic Line-Item Verification",
    body: "Each quoted item is tested against dynamic, empirical price distributions derived from verified, settled invoices across specific trades and postal zones.",
  },
  {
    title: "Instant Clearance",
    body: "Estimates conforming to verified regional distributions are approved in sub-second runtimes.",
  },
  {
    title: "Variance Pinpointing",
    body: "Invoices presenting statistical anomalies are returned instantly, identifying the precise line items in deviation and the exact delta relative to the benchmark.",
  },
  {
    title: "Boundary Isolation",
    body: "Unstructured or bundled items that cannot be systematically verified are segregated for senior human assessment.",
  },
];

const pillars = [
  {
    label: "Ingestion & Orchestration",
    cells: [
      "Multi-channel loss intake, continuous context parsing and agentic task distribution.",
      "Eliminates the administrative navigation tax across internal and external boundaries.",
    ],
  },
  {
    label: "Coverage Adjudication",
    cells: [
      "Deterministic, line-by-line contract computation mapping facts to policy language.",
      "Verifiable, plain-language legal determinations executed in milliseconds.",
    ],
  },
  {
    label: "Market Benchmarking",
    cells: [
      "Continuous empirical price testing against trade, line and regional variance curves.",
      "Eradicates operational indemnity leakage with absolute fairness to supply networks.",
    ],
  },
  {
    label: "Audit & Governance",
    cells: [
      "Continuous logging of decisions, source materials and statutory criteria.",
      "Generates an instantaneous, immutable audit pack. Defensible by design.",
    ],
  },
];

const judgementWork: BulletItem[] = [
  {
    lead: "The Edge-Case Adjudication:",
    text: "Intervening in catastrophic, ambiguous or legally sensitive casualties where human empathy and contextual discretion govern the outcome.",
  },
  {
    lead: "The Policyholder Relationship:",
    text: "Conducting nuanced, high-trust consultations with claimants when coverage must be altered or denied, armed with the complete, plain-language record behind the decision.",
  },
  {
    lead: "Systemic Rule Optimisation:",
    text: "Acting as an internal operations engineer, analysing structural override patterns to identify where underwriting guidelines or automated rules are ambiguous, obsolete or overly restrictive.",
  },
];

const controls: BulletItem[] = [
  {
    lead: "Ecosystem Participation Requires Native Value:",
    text: "External repairers and third-party administrators will not adopt an insurer's workbench if it functions as a digital surveillance portal. The shared record succeeds only when external partners receive tangible utility: automated line-item clearances, sub-day payment authorisations and unambiguous requirements.",
  },
  {
    lead: "Architectural Entitlement Design:",
    text: "Permission parameters cannot be adjusted casually. The carrier defines structural visibility once; the operating system enforces it mathematically across all interfaces.",
  },
  {
    lead: "Distribution Rigour:",
    text: "Algorithmic price benchmarking is only as dependable as the underlying dataset. Benchmarks must be calculated from empirical invoice records segmented strictly by trade, category and regional micro-market.",
  },
  {
    lead: "Sovereignty of Delegated Authority:",
    text: "A broker operating under an authorised binder possesses distinct adjudicative rights compared to an unaligned intermediary. The state machine must continuously reflect who possesses decision-making authority over every line item, maintaining absolute alignment with the underlying underwriting contract.",
  },
];

const roadmap: NumberedItem[] = [
  {
    title: "Isolate the Fault Lines",
    body: "Map every sovereign legal entity that touches a single commercial or personal line of business. Document precisely where the evidentiary record fractures and transitions into manual correspondence.",
  },
  {
    title: "Codify the Entitlement Matrix",
    body: "Formulate the data access policies for each stakeholder group (policyholder, broker, handler and third-party vendor) before deploying a single interface.",
  },
  {
    title: "Deploy a Bounded Pilot",
    body: "Onboard a single partner network and a single line of business onto a shared record. Measure outbound enquiry volume, invoice turnaround times and disputed settlement rates over a ninety-day run.",
  },
  {
    title: "Enforce Plain-Language Rationale",
    body: "Prohibit the recording of decisions that lack clear plain-language justifications. A system log without explicit rationale is merely digital exhaust, not a legal defence.",
  },
  {
    title: "Reinvest the Judgement Dividend",
    body: "Reallocate handler hours deliberately. Transition claims personnel from low-yield data entry into high-value risk engineering, settlement negotiation and rule architecture.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "The Multi-Party Reality:",
    text: "A complex claim is inherently a distributed evidentiary record. Intra-company automation simply drives work into the friction-heavy boundaries between independent organisations.",
  },
  {
    lead: "A Shared Operating System:",
    text: "An agentic operating system, run as a unified state machine under rigorous, role-gated entitlements, turns inter-organisational transparency into an inherent architectural property.",
  },
  {
    lead: "Glass-Box Auditability:",
    text: "True enterprise trust requires continuous, line-level provenance: recording the exact facts, wording versions, plain-language reasoning and human or system actors behind every adjudication.",
  },
  {
    lead: "The Elevated Handler:",
    text: "Autonomous systems lift the administrative navigation tax, returning claims handlers to the work that justifies enterprise investment: complex human judgement, partner relationships and systemic operational design.",
  },
];

/** A numbered list of house cards, one step or item per card. */
function NumberedCards({ items }: { items: NumberedItem[] }) {
  return (
    <ol role="list" className="space-y-4 list-none p-0">
      {items.map((item, index) => (
        <li key={item.title} className="bg-card shadow-card rounded-pill p-8">
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {index + 1}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="text-sm text-body leading-[1.6]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** A numbered list without titles, for items that are one line each. */
function NumberedList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ol role="list" className={`space-y-3 list-none p-0 text-body leading-[1.6] ${className}`}>
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
          >
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: BulletItem[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 text-body leading-[1.6] ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
          <span>
            {item.lead && (
              <>
                <strong className="text-strong">{item.lead}</strong>{" "}
              </>
            )}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ta-blue pl-6 my-8">
      <p className="text-body-lg text-strong">{children}</p>
    </div>
  );
}

export default async function ArchitecturalTransparencyBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
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
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Time Back Is the Easy Part
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Architectural Transparency and the Rise of the Agentic Claims
              Operation
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO and
                  Co-Founder of True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                8 min read
              </div>
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
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Executive Summary
                  </h2>
                  <p className="text-body leading-[1.6]">
                    A claim has never existed within the four walls of a single
                    enterprise. The policyholder, underwriter, delegated
                    authority, specialist repairer and forensic loss adjuster
                    each hold sovereign fragments of an unshared truth. Legacy
                    automation stopped at internal borders, accelerating
                    discrete desks while stranding the wider ecosystem in an
                    administrative standstill. The path forward is not another
                    point-solution chatbot or an automated inbox. It is an
                    agentic operating system anchored to a unified record,
                    orchestrating multi-party execution under mathematical
                    entitlements, with every act of discretion logged with
                    line-level provenance. Transparency ceases to be a
                    courtesy. It becomes an architectural guarantee.
                  </p>
                </div>

                <PullQuote>Legacy claims automation is dead.</PullQuote>

                <p className="text-body leading-[1.6] mb-5">
                  For the past decade, the enterprise insurance suite was sold
                  on a single metric: velocity. Faster intake, faster optical
                  recognition, faster triage. Billions later, carriers have
                  engineered ultra-fast desks trapped inside profoundly slow
                  networks.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  A carrier can deploy generative models to ingest a loss
                  notice in four seconds and calculate coverage line by line.
                  Yet that same carrier spends forty-eight hours chasing an
                  email attachment from a regional repairer, and three weeks
                  assembling a forensic audit trail for a regulator.
                </p>

                <p className="text-body leading-[1.6]">
                  The hours returned to an internal handler were always the
                  lesser prize. The true frontier is what a claims operation
                  becomes when the systemic navigation tax — the manual drag of
                  reconciling facts across corporate boundaries — is engineered
                  out of existence.
                </p>
              </MotionDiv>

              {/* The sovereign fragment problem */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="sovereign-fragment-problem"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Sovereign Fragment Problem
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Consider a standard property or complex motor loss.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  The policyholder reports a casualty. An intermediary
                  validates coverage under a delegated authority binder. The
                  carrier adjudicates liability. A contractor prices
                  restoration. A loss adjuster verifies physical damage.
                </p>

                <p className="text-body leading-[1.6]">
                  Five distinct legal entities. Five isolated databases. Five
                  divergent record-keeping conventions.
                </p>

                <ClaimChainDiagram />

                <p className="text-body leading-[1.6] mb-5">
                  Because no participant possesses the complete factual matrix,
                  each organisation maintains its own defensive shadow file.
                  The claim is dismantled, translated and reassembled at every
                  border it crosses. Status is negotiated over telephone lines.
                  Quotations cross corporate firewalls as static PDFs.
                  Approvals return as unindexed correspondence.
                </p>

                <p className="text-body leading-[1.6]">
                  Every boundary transition incurs an invisible tariff: a
                  missing endorsement, an unaccounted-for latency, an
                  adjudication rationale that exists solely in a senior
                  handler’s memory. What the industry defines as an
                  &quot;end-to-end operation&quot; is in truth an ad hoc chain
                  of disconnected enterprises attempting to synchronise through
                  human friction.
                </p>
              </MotionDiv>

              {/* The glass box */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="glass-box"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Glass Box: Transparency as an Architectural Primitive
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Automating within an enterprise perimeter cannot resolve an
                  inter-organisational breakdown. When automation stops at the
                  enterprise boundary, friction simply compounds at the edge.
                </p>

                <p className="text-body leading-[1.6]">
                  The architectural alternative is an agentic operating system
                  built upon a singular, synchronised claim record. One
                  underlying state machine; multiple sovereign, role-gated
                  interfaces.
                </p>

                <SharedRecordDiagram />

                <BulletList items={partyViews} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  Each party accesses precisely what it is legally and
                  commercially entitled to see, enforced by native ethical
                  walls. Every participant operates from an identical,
                  immutable baseline.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Beneath this architecture lies a strict governing discipline:
                  every discrete action that modifies a claim is computed as a
                  formal decision and recorded with line-level provenance.
                  Whether verifying policy inception, confirming coverage
                  applicability, benchmarking an hourly trade rate or routing
                  an anomalous claim to specialised fraud defence, the engine
                  records:
                </p>

                <NumberedList items={decisionRecord} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  If a human handler overrides an automated determination, the
                  architecture mandates an explicit, reasoned justification.
                </p>

                <p className="text-body leading-[1.6]">
                  This is where auditability moves from a reactive
                  reconstruction to an ambient reality. Transparency across
                  organisational divides has historically been an intermittent
                  courtesy. Within an agentic architecture, it is an immutable
                  system property.
                </p>

                <PullQuote>
                  Not a black box. A glass box: auditable by design,
                  cryptographically verifiable and open to every legitimate
                  stakeholder in the value chain.
                </PullQuote>
              </MotionDiv>

              {/* Empirical price integrity */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="price-integrity"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Precision Engineering in the Wild: Empirical Price Integrity
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nowhere is the cost of structural opacity more evident than
                  in supply chain estimates, where unmonitored leakage
                  concentrates across the long tail.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Historically, carriers managed estimate friction through
                  arbitrary blunt-force controls: invoices above an arbitrary
                  monetary ceiling were routed to independent loss adjusters at
                  material expense; invoices beneath that ceiling were waved
                  through or evaluated on handler intuition. In complex
                  regional markets, such as Swiss property restoration,
                  carriers operated against static, theoretical association
                  tariffs (suissetec, EIT.swiss) that failed to capture actual,
                  localised settlement dynamics.
                </p>

                <p className="text-body leading-[1.6]">
                  Within an open, agentic architecture, estimate validation
                  shifts from subjective debate to empirical computation:
                </p>

                <PriceEngineDiagram />

                <NumberedCards items={priceSteps} />

                <p className="text-body leading-[1.6] mt-8 mb-5">
                  When a contractor can validate an estimate against the market
                  benchmark prior to transmission, the nature of the
                  relationship changes. A request for reissuance is no longer
                  an adversarial dispute; it is an objective, automated
                  reconciliation. The underlying distribution models refine
                  dynamically with every adjudicated settlement.
                </p>

                <p className="text-body leading-[1.6]">
                  Pricing integrity stops being a point of inter-firm
                  contention. It becomes shared, indisputable evidence.
                </p>
              </MotionDiv>

              {/* The four pillars */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="four-pillars"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Four Pillars of the Claims Operating System
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  An enterprise claims architecture requires modular components
                  that orchestrate end-to-end agency. These capabilities are
                  non-linear; they interconnect natively:
                </p>

                <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
                  <ComparisonTable
                    caption="The Four Pillars of the Claims Operating System"
                    columns={["Module", "Core Functionality", "Enterprise Deliverable"]}
                    rows={pillars}
                  />
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Carriers need not undergo high-risk, multi-year core platform
                  transformations to capture this value. They can implement a
                  single capability, such as price benchmarking or coverage
                  verification, and expand modularly as the shared record
                  demonstrates enterprise ROI.
                </p>

                <p className="text-body leading-[1.6]">
                  This is the operational model of the tier-one carrier:
                  intermediaries demonstrate binding compliance through live
                  data rather than annual audits. Repair networks trade
                  friction for payment velocity. When the insurance regulator
                  issues a formal inquiry, the carrier presents a comprehensive
                  decision record generated in seconds, not a panicked forensic
                  reconstruction assembled over months.
                </p>

                <PullQuote>Decided in minutes. Defended for years.</PullQuote>
              </MotionDiv>

              {/* The judgement dividend */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="judgement-dividend"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Judgement Dividend: Human Elevation Over Replacement
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  The prevailing discourse surrounding enterprise AI centres on
                  labour reduction. That thesis misinterprets the nature of
                  professional risk.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  True Aim does not replace the claims professional; it
                  dissolves the administrative scaffolding that prevented them
                  from practising their craft. By delegating document reading,
                  structured data translation, baseline pricing verification
                  and status communication to an underlying agentic operating
                  system, handlers reclaim their working week for tasks that
                  demand high-stakes strategic reasoning:
                </p>

                <BulletList items={judgementWork} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Executive performance scorecards will adapt accordingly.
                  Cycle time and processing expense per file were the crude
                  proxies of the manual era. The enterprise operating on a
                  shared agentic record monitors adjudication consistency,
                  line-level explainability, the systematic elimination of
                  partner touchpoints and the reduction of dispute rates.
                </p>
              </MotionDiv>

              {/* Structural realities */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-controls"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Structural Realities and Implementation Controls
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Transforming an operational network requires acknowledging
                  architectural constraints from day zero:
                </p>

                <BulletList items={controls} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  Compliance is not an afterthought layered over legacy
                  workflows. It is engineered into the transaction from the
                  first ingested record.
                </p>
              </MotionDiv>

              {/* The implementation roadmap */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="implementation-roadmap"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Implementation Roadmap
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Enterprise transformation does not require a speculative
                  big-bang migration. It demands precise, phased execution:
                </p>

                <NumberedCards items={roadmap} />

                <p className="text-body leading-[1.6] mt-8">
                  The carriers that execute this transition will establish the
                  technological and operating standard for their trading
                  partners. Those that continue to deploy localised point
                  solutions will merely finance a faster desk inside an
                  obsolete chain.
                </p>
              </MotionDiv>

              {/* Core takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Core Takeaways
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {takeaways.map((takeaway) => (
                      <li key={takeaway.text} className="flex items-start gap-3">
                        <CheckCircle
                          aria-hidden="true"
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-body leading-[1.6]">
                          <strong className="text-strong">{takeaway.lead}</strong>{" "}
                          {takeaway.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-body-lg text-strong mt-8">
                  What architectural boundaries in your existing claims
                  infrastructure generate the highest administrative drag
                  today? Let’s connect in the comments.
                </p>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="faq"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Frequently Asked Questions
                </h2>

                <FaqBlock faqs={faqs} />
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Article navigation">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  On this page
                </h2>
                <nav aria-label="On this page">
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
                  <h3 className="text-caption-sm text-muted mb-3">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((tag) => (
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
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Explore our Trust Centre
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
              Decided in Minutes. Defended for Years.
            </h2>
            <p className="text-lg text-body mb-10">
              Discuss what a shared claim record would change in your claims
              operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRight aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                <Calculator aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
                Get Impact Estimate
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
