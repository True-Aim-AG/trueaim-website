import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Workflow,
  Plug,
  Radio,
  MousePointer2,
  ShieldCheck,
  FileSignature,
  Server,
  ChevronRight,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const,
};

const principles = [
  {
    title: "Outcome-first, integration-backwards.",
    body: "We start from the business outcome and work backwards into the integration surface. Minimum integration surface for maximum business value, not coverage for its own sake.",
  },
  {
    title: "Meet the systems where they are.",
    body: "We adapt to the customer's interface availability: APIs, file drops, queues, event streams, or in narrow cases the legacy UI itself. We do not force-fit.",
  },
  {
    title: "Data shared with us does not leave our infrastructure.",
    body: "No customer data is sent to third-party model providers. Inference runs on models hosted within our environment.",
  },
  {
    title: "Async and batch by default; sync only where latency demands it.",
    body: "Most claims work tolerates a few minutes of latency. Building for sync everywhere is a tax we refuse to pay on the customer's behalf.",
  },
  {
    title: "Read-light, write-deliberate.",
    body: "We pull what we need to do the job. We do not push back to systems of record until a human approves.",
  },
  {
    title: "Every action logged, hashed, replayable.",
    body: "DORA-aligned and ready for the EU AI Act. Every prompt, model version, token count, and human override is captured at the per-claim level.",
  },
];

const patterns = [
  {
    icon: Archive,
    name: "Secure batch via shared storage",
    when:
      "The customer can drop documents and structured payloads on a storage location we both have access to, and the use case tolerates batch latency.",
    how: "We pick up inputs on a schedule or on arrival, process inside our environment, and write outputs back to a return location. Typically one structured file per case plus a processing log. Carried by Pattern A below.",
  },
  {
    icon: Workflow,
    name: "Workflow orchestration over heterogeneous backends",
    when:
      "The customer's data lives across several systems (CRM, document stores, relational databases, dumps, messaging) and the workflow needs a unified surface for users.",
    how: "An orchestration backend reads from the relevant sources, the True Aim UI hosts the user workflow, and on completion we write a standard return artifact for ingestion back into the legacy systems. Carried by Pattern B below.",
  },
  {
    icon: Plug,
    name: "Direct API integration",
    when:
      "An interactive lookup or write-back where latency or correctness demands a synchronous round trip. Validating a policy number at first notice of loss, or pulling a single coverage record on demand.",
    how: "REST or webhook integration with the customer's API. We keep these surfaces small and well-defined. Authentication via OAuth2, mTLS, or signed JWTs depending on the customer's standard.",
  },
  {
    icon: Radio,
    name: "Event and message queue",
    when:
      "High-volume streams (FNOL ingestion, status fan-out to multiple stakeholders) where back-pressure and durability matter.",
    how: "We consume from the customer's queue (Kafka, Service Bus, SQS, or equivalent) and publish back on a dedicated topic for downstream consumers.",
  },
  {
    icon: MousePointer2,
    name: "Browser-driven data entry into legacy UIs",
    when:
      "A high-value, narrow workflow where no API exists and the cost of building one is not justified.",
    how: "A sandboxed automation completes data entry directly in the legacy UI on behalf of an operator. We reserve this pattern for cases where the value clearly justifies the operational footprint. It is not a default.",
  },
];

const phases = [
  {
    label: "Phase 01",
    title: "Week zero: discovery",
    goal: "Understand the target operating model for the first use case, the systems involved, the data shapes, and the risk envelope.",
    time: "Business owner for the use case, one engineering lead, one operations lead. Roughly two to three working sessions.",
    outputs: [
      "Use-case definition with measurable business outcome",
      "System inventory and interface availability (API, file, queue, UI-only)",
      "Data shape samples (claim, policy, document types)",
      "Authentication and network model",
      "Human-in-the-loop checkpoints and risk thresholds",
      "Audit and compliance requirements (DORA, EU AI Act, internal controls)",
    ],
  },
  {
    label: "Phase 02",
    title: "Weeks one to four: build sprint",
    goal: "Stand up the integration end to end for the agreed use case, against real customer data in a non-production environment.",
    time: "Scheduled checkpoints at end of week one (interface contracts), week two (first end-to-end pass), week four (user acceptance).",
    outputs: [
      "Working integration in a customer-accessible environment",
      "Interface contracts (request/response shapes, error semantics, retry policy)",
      "Operational runbook (deployment, rollback, on-call escalation)",
      "Audit log specification (what is captured, where it is stored, how it is accessed)",
      "Test data set and replay harness",
    ],
  },
  {
    label: "Phase 03",
    title: "Progressive rollout",
    goal: "Move the use case into production behind a controlled ramp, then expand to adjacent use cases.",
    time: "Ramp by claim type, then by volume percentage, with human-in-the-loop coverage starting wide and narrowing as confidence accumulates.",
    outputs: [
      "Each subsequent use case reuses the integration surface built in week zero, so the marginal cost of the second and third use cases is materially lower than the first.",
    ],
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "Human-in-the-loop",
    body: "Every consequential decision routes through a configurable checkpoint. The customer chooses what is automatic, what is reviewed, and what is approved. We do not deploy agents that operate outside that envelope.",
  },
  {
    icon: FileSignature,
    title: "Audit trail",
    body: "Every action (model invocation, prompt, model version, token count, human override, system call) is captured at the per-claim level, cryptographically hashed, time-stamped, and exportable. This satisfies DORA operational resilience requirements and the transparency obligations under the EU AI Act.",
  },
  {
    icon: Server,
    title: "Data residency",
    body: "Customer data shared with us stays inside our infrastructure. We do not route customer data through third-party model providers. Where the customer requires it, we deploy the entire processing pipeline inside their cloud tenant.",
  },
];

const tableOfContents = [
  { num: "01", label: "Executive summary", anchor: "executive-summary" },
  { num: "02", label: "Integration principles", anchor: "principles" },
  { num: "03", label: "Patterns we use", anchor: "patterns" },
  { num: "04", label: "Patterns in practice", anchor: "practice" },
  { num: "05", label: "How we deliver", anchor: "deliver" },
  { num: "06", label: "Commitments", anchor: "commitments" },
];

export default function IntegrationPlaybookPage() {
  return (
    <div className="min-h-screen relative">
      {/* Confidential ribbon */}
      <div className="border-y border-[var(--border)] bg-[var(--background-secondary)]/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            Internal · Unlisted
          </span>
          <span className="hidden sm:inline">Doc · TA-IPB / v1.0 / 2026</span>
        </div>
      </div>

      {/* === HERO === */}
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        {/* Blueprint grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 35%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 35%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            True Aim
          </Link>

          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--primary)] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--primary)]" />
              Playbook
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-muted)]">Integration</span>
            </div>

            <h1
              className="font-display font-bold tracking-tight text-[var(--text-primary)] leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
            >
              The True Aim
              <br />
              <span className="italic font-normal text-[var(--primary)]">
                integration
              </span>{" "}
              playbook.
            </h1>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-16">
              How we plug into existing landscapes, what patterns we use, and
              how a first integration unfolds.
            </p>
          </MotionDiv>

          {/* Spec strip */}
          <MotionDiv {...fadeIn}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
              {[
                { label: "Patterns", value: "5" },
                { label: "Phases", value: "3" },
                { label: "First integration", value: "4–6 wk" },
                { label: "Data residency", value: "In-tenant" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[var(--background)]/80 backdrop-blur-sm px-5 py-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                    {stat.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* === LAYOUT BODY === */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-12 gap-y-16">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border)]">
                Contents
              </div>
              <ol className="space-y-2.5">
                {tableOfContents.map((item) => (
                  <li key={item.num}>
                    <a
                      href={`#${item.anchor}`}
                      className="group flex items-baseline gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                        {item.num}
                      </span>
                      <span className="leading-snug">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pt-6 border-t border-[var(--border)] space-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <div className="flex justify-between">
                  <span>Read</span>
                  <span className="text-[var(--text-secondary)]">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Audience</span>
                  <span className="text-[var(--text-secondary)]">Eng / Ops</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-[var(--primary)]">Live</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            {/* === 01 EXECUTIVE SUMMARY === */}
            <article id="executive-summary" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="01" eyebrow="Executive summary" />

                <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-[1.75] max-w-3xl">
                  <p className="text-2xl md:text-[1.65rem] text-[var(--text-primary)] leading-[1.45] font-light">
                    True Aim integrates with insurance core systems, document
                    platforms, AI vendors, and communication channels using a
                    small set of well-understood patterns. We start from the
                    business outcome and work backwards into the integration
                    surface. The goal is{" "}
                    <span className="font-medium text-[var(--primary)]">
                      the smallest integration footprint that delivers the
                      value
                    </span>
                    , not coverage for its own sake.
                  </p>

                  <p>
                    Customer data shared with us stays inside our
                    infrastructure. We do not send customer data to third-party
                    model providers. Every system action is logged, hashed, and
                    replayable. Every consequential decision passes through a
                    human-in-the-loop checkpoint that the customer configures.
                  </p>

                  <p>
                    This document sets out the principles, the patterns, two
                    reference implementations, and how a first integration
                    unfolds in four to six weeks.
                  </p>
                </div>
              </MotionDiv>
            </article>

            {/* === 02 PRINCIPLES === */}
            <article id="principles" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="02" eyebrow="Integration principles" />

                <ol className="space-y-px border-y border-[var(--border)]">
                  {principles.map((p, idx) => (
                    <li
                      key={p.title}
                      className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-6 py-7 border-b border-[var(--border)] last:border-b-0 group hover:bg-[var(--subtle-bg)] transition-colors -mx-4 md:-mx-6 px-4 md:px-6 rounded-sm"
                    >
                      <div className="font-mono text-3xl md:text-5xl font-light text-[var(--primary)] leading-none tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-[var(--text-primary)] mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </MotionDiv>
            </article>

            {/* === 03 PATTERNS === */}
            <article id="patterns" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="03" eyebrow="Integration patterns we use" />

                <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
                  A short catalogue. Most projects use two or three of these in
                  combination.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
                  {patterns.map((pattern, idx) => {
                    const Icon = pattern.icon;
                    const isLastOdd =
                      idx === patterns.length - 1 && patterns.length % 2 === 1;
                    return (
                      <div
                        key={pattern.name}
                        className={`bg-[var(--background)]/80 backdrop-blur-sm p-7 flex flex-col gap-5 hover:bg-[var(--background-secondary)] transition-colors group ${
                          isLastOdd ? "md:col-span-2" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            P/{String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 h-px bg-[var(--border)]" />
                          <div className="w-10 h-10 rounded-md bg-[var(--primary-light)] border border-[var(--primary)]/20 flex items-center justify-center group-hover:bg-[var(--primary)]/20 transition-colors">
                            <Icon className="w-4 h-4 text-[var(--primary)]" />
                          </div>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] leading-tight">
                          {pattern.name}
                        </h3>

                        <div className="space-y-4 text-sm">
                          <Field label="When to use" value={pattern.when} />
                          <Field label="How it works" value={pattern.how} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === 04 REFERENCE PATTERNS === */}
            <article id="practice" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="04" eyebrow="Reference patterns in practice" />
              </MotionDiv>

              {/* Pattern A */}
              <MotionDiv {...fadeIn} className="mb-20">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--primary)] mb-3">
                  Pattern A · Swiss insurer
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                  Document-driven complex
                  <br className="hidden md:block" /> claims decisioning.
                </h3>

                <p className="text-[var(--text-secondary)] leading-[1.8] max-w-3xl mb-6 text-lg">
                  Documents arrive on a customer-owned storage location. A True
                  Aim batch reader, running inside our Azure environment, pulls
                  them on a schedule. Complex claims decisioning and key data
                  extraction run on our side. A small number of external
                  enrichment calls (parts lookup, geolocation) are made for
                  specific use cases. A single policy lookup against the
                  customer's ERP provides coverage context. Users complete
                  review inside the True Aim platform. On approval, we push one
                  structured JSON file per claim with the decision, plus a
                  processing log capturing metadata, model versions, and any
                  errors, back to a return location in the customer's
                  infrastructure.
                </p>

                <p className="text-[var(--text-secondary)] leading-[1.8] max-w-3xl mb-10 text-lg italic">
                  Customer data shared with us stays inside True Aim's Azure
                  tenant. No customer data is sent to third-party model
                  providers.
                </p>

                <DiagramFigure
                  src="/images/blog/integration-pattern-a.png"
                  alt="Pattern A — document-driven complex claims decisioning. Diagram shows inbound documents pulled from customer storage by a batch reader inside True Aim's Azure tenant, processed for decisioning and extraction, with policy lookup against the customer ERP, optional enrichment calls, human-in-the-loop review, and structured JSON output written back to the customer's return storage."
                  figureLabel="Fig. A"
                  caption="Pattern A — document-driven complex claims decisioning."
                />

                <ProvesCallout>
                  We can run an end-to-end decisioning pipeline with a minimal
                  integration surface (two storage locations and one ERP API),
                  keep customer data inside our environment, and return a
                  clean, structured artifact that the customer can ingest
                  however they want.
                </ProvesCallout>
              </MotionDiv>

              {/* Pattern B */}
              <MotionDiv {...fadeIn}>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--primary)] mb-3">
                  Pattern B · US insurance ops
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                  Multi-source orchestration
                  <br className="hidden md:block" /> with SLA workflow.
                </h3>

                <p className="text-[var(--text-secondary)] leading-[1.8] max-w-3xl mb-6 text-lg">
                  The customer's working data lives across several systems: a
                  CRM, Google Workspace, a Postgres database, periodic SQL
                  dumps from upstream insurers, and a WhatsApp channel for
                  inbound customer comms. A True Aim orchestration backend
                  (n8n) reads from each source and assembles working claim
                  files. Users complete the claims processing workflow inside
                  the True Aim UI, which tracks communications and SLAs across
                  the lifecycle. On completion, True Aim generates a standard
                  flat file for ingestion back into the various insurer legacy
                  systems.
                </p>

                <p className="text-[var(--text-secondary)] leading-[1.8] max-w-3xl mb-10 text-lg">
                  For a small number of high-value workflows where no API
                  exists on the receiving side, a browser-based integration
                  completes data entry directly in the insurer's UI. We
                  reserve this pattern for cases where the value clearly
                  justifies the operational footprint.
                </p>

                <DiagramFigure
                  src="/images/blog/integration-pattern-b.png"
                  alt="Pattern B — multi-source orchestration with SLA workflow. Diagram shows five customer source systems (CRM, Google Workspace, Postgres, SQL dumps from upstream insurers, WhatsApp) feeding an n8n orchestration backend inside True Aim, a workflow UI handling comms, SLA tracking and human-in-the-loop, and a flat-file generator producing artifacts for downstream insurer legacy systems including a fallback browser-based legacy UI integration."
                  figureLabel="Fig. B"
                  caption="Pattern B — multi-source orchestration with SLA workflow."
                />

                <ProvesCallout>
                  We can stand up a working surface across a fragmented backend
                  landscape without forcing the customer into a heavy
                  synchronous API build, and we can return outcomes through
                  whatever channel the receiving system actually supports.
                </ProvesCallout>
              </MotionDiv>
            </article>

            {/* === 05 HOW WE DELIVER === */}
            <article id="deliver" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader num="05" eyebrow="How we deliver" />

                <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-12">
                  A first integration runs in three phases. The pattern repeats
                  for each subsequent use case, with shorter timelines as
                  customer-side knowledge accumulates.
                </p>

                <div className="space-y-px">
                  {phases.map((phase, idx) => (
                    <div
                      key={phase.label}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-4 md:gap-x-10 py-10 border-t border-[var(--border)] last:border-b last:border-b-[var(--border)] relative"
                    >
                      <div className="md:sticky md:top-24 md:self-start">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                          {phase.label}
                        </div>
                        <div className="font-display text-5xl md:text-6xl font-light text-[var(--primary)] leading-none tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="space-y-6 max-w-2xl">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                          {phase.title}
                        </h3>

                        <PhaseField label="Goal" value={phase.goal} />
                        <PhaseField
                          label={
                            idx === 2
                              ? "How"
                              : idx === 0
                              ? "Customer time"
                              : "Customer time"
                          }
                          value={phase.time}
                        />

                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                            {idx === 2 ? "Outcome" : "Outputs"}
                          </div>
                          <ul className="space-y-2.5">
                            {phase.outputs.map((o) => (
                              <li
                                key={o}
                                className="flex items-start gap-3 text-[var(--text-secondary)] leading-relaxed"
                              >
                                <ChevronRight className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-1" />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            </article>

            {/* === 06 COMMITMENTS === */}
            <article id="commitments" className="scroll-mt-24">
              <MotionDiv {...fadeIn}>
                <SectionHeader
                  num="06"
                  eyebrow="Commitments that hold across every phase"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {commitments.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.title}
                        className="relative glass-panel p-7 flex flex-col gap-5 group hover:border-[var(--primary)]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-lg bg-[var(--primary-light)] border border-[var(--primary)]/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[var(--primary)]" />
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            C/{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] leading-tight">
                          {c.title}
                        </h3>

                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </article>

            {/* === END / CTA === */}
            <article>
              <MotionDiv {...fadeIn}>
                <div className="border-t border-[var(--border)] pt-14">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-6">
                    End of document
                  </div>
                  <h2
                    className="font-display font-bold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
                  >
                    Want to walk through this <br className="hidden md:block" />
                    against your own landscape?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                    >
                      Start a discovery session
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/technology"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--subtle-bg)] transition-colors"
                    >
                      How the technology works
                    </Link>
                  </div>
                </div>
              </MotionDiv>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ num, eyebrow }: { num: string; eyebrow: string }) {
  return (
    <header className="mb-10">
      <div className="flex items-baseline gap-5 mb-3">
        <span className="font-mono text-sm text-[var(--primary)] tabular-nums">
          {num}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--primary)]/40 to-transparent" />
      </div>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]">
        {eyebrow}
      </h2>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1.5">
        {label}
      </div>
      <p className="text-[var(--text-secondary)] leading-relaxed">{value}</p>
    </div>
  );
}

function PhaseField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2 sm:gap-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:pt-1">
        {label}
      </div>
      <p className="text-[var(--text-secondary)] leading-relaxed">{value}</p>
    </div>
  );
}

function DiagramFigure({
  src,
  alt,
  figureLabel,
  caption,
}: {
  src: string;
  alt: string;
  figureLabel: string;
  caption: string;
}) {
  return (
    <figure className="relative my-4">
      {/* Frame label */}
      <div className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        <span className="text-[var(--primary)]">{figureLabel}</span>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="relative rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] overflow-hidden">
        {/* Corner ticks */}
        <span aria-hidden className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[var(--primary)]/60" />
        <span aria-hidden className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[var(--primary)]/60" />
        <span aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-[var(--primary)]/60" />
        <span aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[var(--primary)]/60" />

        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="w-full h-auto block"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      <figcaption className="mt-3 text-sm text-[var(--text-muted)] italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function ProvesCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/40 to-transparent" />
      <div className="pl-6 md:pl-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--primary)] mb-2">
          What this proves
        </div>
        <p className="text-lg md:text-xl text-[var(--text-primary)] leading-[1.6] font-light max-w-3xl">
          {children}
        </p>
      </div>
    </div>
  );
}
