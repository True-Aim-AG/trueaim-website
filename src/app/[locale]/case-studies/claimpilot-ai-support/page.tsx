"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  Quote,
  TrendingUp,
  Globe,
  Users,
  ChevronDown,
  Zap,
  MessageSquare,
  BookOpen,
  Layers,
  RefreshCw,
  ShieldCheck,
  Target,
  ArrowDownRight,
  Database,
  Brain,
  BarChart3,
} from "lucide-react";
import { ZoomableInfographic } from "@/components/ui/ZoomableInfographic";

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Stagger container ─── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 } as const,
};

/* ─── Expandable architecture section ─── */
function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--subtle-bg)]/50 transition-colors"
      >
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-0">{children}</div>
      </motion.div>
    </div>
  );
}

/* ─── Design principle card (Constraint → Design → Outcome) ─── */
function DesignBlock({
  constraintIcon: ConstraintIcon,
  constraint,
  design,
  outcome,
  index,
}: {
  constraintIcon: React.ElementType;
  constraint: string;
  design: string;
  outcome: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass-panel overflow-hidden relative group"
    >
      <div className="p-6 space-y-5">
        {/* Constraint */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <ConstraintIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-widest mb-1">
              Constraint
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {constraint}
            </p>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex items-center gap-2 pl-14">
          <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)]/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
        </div>

        {/* Design */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-widest mb-1">
              Design
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {design}
            </p>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex items-center gap-2 pl-14">
          <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)]/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
        </div>

        {/* Outcome */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-widest mb-1">
              Outcome
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {outcome}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function AISupportCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] via-slate-900/80 to-[var(--background)]">
        {/* Floating gradient orbs */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[var(--primary)] opacity-[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500 opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 py-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>

            {/* Customer badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center ring-1 ring-[var(--border)]">
                <Building2 className="w-7 h-7 text-[var(--text-muted)]" />
              </div>
              <div>
                <div className="text-lg font-medium text-[var(--text-primary)]">
                  Swiss Insurance Services Platform
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  Insurance Services / B2B Platform · 230 tickets/day · 3
                  languages (DE/IT/FR) · 5 L1 agents
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[var(--text-primary)] mb-5 leading-[1.15]">
              Multilingual B2B support scaled 35% with a 40% smaller team using
              AI-assisted resolution
            </h1>

            {/* Sub-headline metrics */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl font-semibold mb-8"
            >
              <span className="text-[var(--primary)]">43% fully automated</span>
              <span className="text-[var(--text-muted)] mx-2">·</span>
              <span className="text-emerald-400">93% faster first response</span>
              <span className="text-[var(--text-muted)] mx-2">·</span>
              <span className="text-[var(--primary)]">90% AI draft acceptance</span>
            </motion.p>

            {/* Product & Timeline tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                ClaimPilot
              </span>
              <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
                True Aim AG
              </span>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <Clock className="w-4 h-4" />
                4-week POC, 5-month rollout
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                March 2026
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── KEY METRICS ── */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
          >
            {[
              { value: 43, suffix: "%", label: "Fully automated", sub: "no human touch", highlight: true },
              { value: 90, suffix: "%", label: "AI draft acceptance", sub: "minor or no edits", highlight: false },
              { value: 93, suffix: "%", label: "Faster first response", sub: "45 min → < 4 min", highlight: true },
              { value: 91, suffix: "%", label: "Customer satisfaction", sub: "+11 points from 80%", highlight: false },
              { value: 94, suffix: "%", label: "AI-assisted coverage", sub: "of all tickets", highlight: false },
              { value: 2.1, suffix: "%", label: "Escalation false +", sub: "target was <5%", highlight: false },
              { value: 311, suffix: "", label: "Tickets/day", sub: "up from 230", highlight: true },
            ].map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className={`glass-panel p-5 text-center relative overflow-hidden ${
                  m.highlight
                    ? "ring-1 ring-[var(--primary)]/30"
                    : ""
                }`}
              >
                {m.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-emerald-400" />
                )}
                <div className="text-2xl md:text-3xl font-bold font-mono-data text-[var(--primary)] mb-1">
                  {m.suffix === "%" && m.value !== 2.1 ? (
                    <AnimatedNumber value={m.value} suffix="%" />
                  ) : m.value === 2.1 ? (
                    "2.1%"
                  ) : (
                    <AnimatedNumber value={m.value} />
                  )}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-tight">
                  {m.label}
                </div>
                <div className="text-[10px] text-[var(--secondary)] mt-1">
                  {m.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
            {/* ── MAIN ── */}
            <article className="space-y-20">
              {/* ─ PROBLEM ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Problem
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    A Swiss insurance services platform connects insurance
                    companies and property managers with service providers across
                    Switzerland, Italy and Germany. Platform users submit support
                    requests through an in-app button or country-specific email
                    addresses. Everything funnels into a shared Freshdesk inbox
                    managed by five first-level agents.
                  </p>
                  <p>
                    By early 2026, daily ticket volume had reached 230 requests
                    per day and was climbing 20-25% year over year. The team
                    maintained an 80% customer satisfaction score and a two-hour
                    first-response SLA, but the gap between ticket growth and
                    team capacity was widening each quarter.
                  </p>
                </div>

                {/* Baseline stats */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {[
                    { value: "230", label: "Tickets per day" },
                    { value: "5", label: "L1 agents" },
                    { value: "3", label: "Languages (DE/IT/FR)" },
                    { value: "20-25%", label: "YoY volume growth" },
                  ].map((s) => (
                    <motion.div
                      key={s.label}
                      variants={fadeUp}
                      className="glass-panel-light p-4 text-center"
                    >
                      <div className="text-lg font-bold font-mono-data text-[var(--primary)]">
                        {s.value}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Defined outcomes */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Defined outcomes
                  </h3>
                  <div className="space-y-2">
                    {[
                      "We need to absorb ticket growth without hiring trilingual staff",
                      "We need consistent response quality across three languages regardless of who is on shift",
                      "We need our agents spending time on complex cases, not answering the same questions repeatedly",
                    ].map((req) => (
                      <motion.div
                        key={req}
                        {...fadeIn}
                        className="glass-panel-light p-3 text-sm text-[var(--text-secondary)] flex items-start gap-3"
                      >
                        <Quote className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5 opacity-50" />
                        <span>&ldquo;{req}&rdquo;</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key constraints */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Key constraints
                  </h3>
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    {[
                      {
                        icon: Globe,
                        title: "Language constraint",
                        desc: "Tickets arrive in German (50%), Italian (35%) and French (15%), each requiring market-specific terminology. Hiring trilingual support staff in Switzerland is expensive and slow.",
                      },
                      {
                        icon: BookOpen,
                        title: "Knowledge constraint",
                        desc: "The answers to most tickets already existed, scattered across Confluence documentation, Freshdesk canned responses and the heads of five experienced agents. No single source of truth. New agents took weeks to ramp. Consistency drifted across languages and shifts.",
                      },
                      {
                        icon: MessageSquare,
                        title: "Workflow constraint",
                        desc: "Five agents with an established Freshdesk-based process. The system could not require a new tool or change how agents worked day to day.",
                      },
                      {
                        icon: Users,
                        title: "Volume constraint",
                        desc: "230 tickets per day climbing 20-25% year over year. Roughly 70% were answerable from existing knowledge without any system investigation. Agents spent the same time on a password-reset walkthrough as on a complex integration issue. The repetitive work was crowding out cases that needed human judgment.",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        variants={fadeUp}
                        className="glass-panel p-5 flex gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* ─ FIRST-PRINCIPLES DESIGN ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  First-principles design
                </h2>

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <DesignBlock
                    constraintIcon={BookOpen}
                    index={0}
                    constraint="70% of tickets were answerable from existing knowledge, but that knowledge lived in three places: Confluence documentation, Freshdesk canned responses and experienced agents' heads. No structured retrieval existed. New agents took weeks to become productive because the knowledge transfer was informal and incomplete."
                    design="A retrieval-augmented generation pipeline ingesting all three knowledge sources plus 18 months of historical ticket-response pairs. A single retrieval layer serves all agents and all languages. The system surfaces the most relevant knowledge for each incoming ticket, regardless of which source it originally lived in."
                    outcome="One knowledge base, three languages, consistent answers regardless of agent experience level. The ramp time for new agents collapsed because the institutional knowledge that previously lived in people's heads became searchable and retrievable."
                  />
                  <DesignBlock
                    constraintIcon={Globe}
                    index={1}
                    constraint="Tickets arrive in German (50%), Italian (35%) and French (15%). Each language requires native-quality responses with market-specific terminology. The strongest Italian speaker on the team was part-time, creating chronic quality inconsistency in that language. Hiring trilingual L1 agents in Switzerland is slow and expensive."
                    design="Language-aware generation calibrated per market. The system detects the ticket language, retrieves language-matched knowledge and generates responses using terminology validated against historical agent responses in that language. The training signal is the team's own best responses, not generic translation."
                    outcome="Native-quality responses in all three languages. Italian CSAT (historically the weakest at 76% due to part-time coverage) jumped to 88%. Response quality no longer depends on which agent is on shift or which language they are strongest in."
                  />
                  <DesignBlock
                    constraintIcon={MessageSquare}
                    index={2}
                    constraint="Five agents with an established Freshdesk workflow. Any system requiring a new interface or changing their daily process would face adoption resistance and slow rollout."
                    design="AI drafts surface as internal notes inside Freshdesk. Agents review, edit if needed, send. No new interface. No workflow change. The system adapts to the tool they already use, not the other way around."
                    outcome="Adoption was immediate. Draft acceptance hit 78% in the first week against a 60% target. Six months in, agents edit roughly one in ten drafts, mostly to add a personal touch rather than correct factual errors."
                  />
                  <DesignBlock
                    constraintIcon={Target}
                    index={3}
                    constraint="Not all tickets carry the same risk. A password-reset walkthrough has a different error cost than a billing dispute or an integration question. Treating every ticket as equally risky wastes agent time on safe categories while under-protecting sensitive ones."
                    design="Confidence-based routing with three tiers. High-confidence, low-risk categories auto-send without human involvement. Medium-confidence tickets surface as pre-drafted responses for agent review. Low-confidence or sensitive tickets route to agents with retrieved context but no draft. Classification confidence thresholds are per-category, validated against historical accuracy before any category qualifies for auto-send."
                    outcome="43% of tickets resolve fully automatically. 94% receive AI assistance in some form. The remaining 6% are escalations that bypass the system entirely. Agent time concentrates on the cases that genuinely require human judgment."
                  />
                </motion.div>
              </motion.div>

              {/* ─ ARCHITECTURE ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Architecture
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  The system runs as four layers between the customer&apos;s
                  Freshdesk inbox and their agents.
                </p>

                {/* Architecture infographic */}
                <ZoomableInfographic
                  src="/images/case-studies/claimpilot-ai-support-architecture.png"
                  alt="ClaimPilot AI support architecture diagram"
                  width={2754}
                  height={1536}
                />

                {/* Pipeline visualization */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-8"
                >
                  {[
                    { icon: Database, label: "Knowledge Ingestion", stage: "1", color: "text-amber-400", bg: "bg-amber-500/15" },
                    { icon: Layers, label: "Classification & Routing", stage: "2", color: "text-blue-400", bg: "bg-blue-500/15" },
                    { icon: MessageSquare, label: "Response Generation", stage: "3", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/15" },
                    { icon: RefreshCw, label: "Feedback & Learning", stage: "4", color: "text-emerald-400", bg: "bg-emerald-500/15" },
                  ].map((s) => (
                    <motion.div
                      key={s.stage}
                      variants={fadeUp}
                      className="glass-panel p-4 text-center relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
                      <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                        Layer {s.stage}
                      </div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Architecture detail sections */}
                <div className="space-y-3">
                  <ExpandableSection
                    title="1. Knowledge ingestion and indexing"
                    defaultOpen
                  >
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {[
                        "Three source types: Confluence documentation, Freshdesk canned responses, 18 months of historical ticket-response pairs.",
                        "Language-specific indexing. Content tagged and retrievable by language with terminology mapping across German, Italian and French.",
                        "Incremental updates. New agent responses and corrections feed back into the knowledge base automatically. The system learns from every interaction without manual retraining.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ExpandableSection>

                  <ExpandableSection title="2. Classification and routing">
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {[
                        "Language detection on every incoming ticket.",
                        "Category classification with per-ticket confidence scoring.",
                        "Routing decision based on confidence: auto-send (high confidence in a validated category), draft for review (medium confidence) or context-only with no draft (low confidence or sensitive category).",
                        "Confidence thresholds calibrated per category against historical accuracy. A category only qualifies for auto-send after sustained accuracy above validated thresholds.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ExpandableSection>

                  <ExpandableSection title="3. Response generation">
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {[
                        "Retrieval: language-matched knowledge chunks ranked by relevance to the specific ticket.",
                        "Generation: response drafted using retrieved context, matching the ticket's language and market-specific terminology.",
                        "Quality signal: every draft carries a confidence score visible to the agent. The system communicates what it is confident about and where it is uncertain.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ExpandableSection>

                  <ExpandableSection title="4. Feedback and learning">
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {[
                        "Every agent edit logged as a diff against the original AI draft.",
                        "Corrections feed into prompt refinement and retrieval ranking adjustments.",
                        "Category-level accuracy tracked over time. Auto-send eligibility reviewed continuously against accuracy drift.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ExpandableSection>
                </div>

                <div className="glass-panel-light p-4 mt-6 border-l-2 border-l-amber-400/60">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text-primary)]">
                      The deterministic boundary is explicit.
                    </span>{" "}
                    Category classification, confidence thresholds, routing
                    decisions and auto-send eligibility are rule-based. The LLM
                    handles response generation and knowledge retrieval ranking.
                    This boundary determines which tickets a human sees and which
                    resolve automatically.
                  </p>
                </div>
              </motion.div>

              {/* ─ INTEGRATION ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Integration into existing ecosystem
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The AI support agent does not replace the customer&apos;s
                  infrastructure. It sits between the inbox and the agent,
                  adding a reasoning layer to an existing workflow.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* What stays */}
                  <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
                      What stays in the customer&apos;s systems
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Ticket intake (in-app button, country-specific email addresses)",
                        "Freshdesk as the agent workspace and customer communication channel",
                        "User management and authentication",
                        "All customer data on their own Azure infrastructure using Azure OpenAI Service. No data leaves their environment",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <span className="text-[var(--text-muted)]">&bull;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What AI agent handles */}
                  <div className="glass-panel p-5 border-l-2 border-l-[var(--primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      What the AI support agent handles
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Knowledge consolidation across Confluence, canned responses and historical tickets",
                        "Language detection and response generation",
                        "Confidence scoring and routing decisions",
                        "Auto-send for validated high-confidence categories",
                        "Feedback loop from agent corrections back into knowledge base and retrieval ranking",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Data flow */}
                <div className="glass-panel-light p-4">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Data flow
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Tickets arrive via Freshdesk. The AI agent classifies the
                    ticket, detects the language, retrieves relevant knowledge
                    and generates a draft. High-confidence tickets in validated
                    categories auto-send directly to the customer. All others
                    surface as internal notes for agent review. Agent edits flow
                    back into the knowledge base, improving retrieval ranking and
                    response quality over time. The entire pipeline runs on the
                    customer&apos;s Azure infrastructure.
                  </p>
                </div>
              </motion.div>

              {/* ─ RESULTS ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Results
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Six months after initial deployment, measured against the
                  pre-deployment baseline:
                </p>

                {/* Results table */}
                <div className="glass-panel overflow-hidden overflow-x-auto mb-8">
                  <table className="w-full text-sm min-w-[400px]">
                    <tbody>
                      {[
                        ["Fully automated resolution rate", "43% (auto-send, no human touch)", true],
                        ["AI draft acceptance rate", "90% (minor or no edits)", false],
                        ["First response time reduction", "93% (45 min to under 4 min)", true],
                        ["Customer satisfaction", "91% (+11 points from 80%)", false],
                        ["Ticket coverage (AI-assisted)", "94%", false],
                        ["Escalation false positive rate", "2.1% (target was <5%)", false],
                        ["POC to production", "4-week POC, 5-month rollout", false],
                      ].map((row) => (
                        <tr
                          key={row[0] as string}
                          className={`border-b border-[var(--border)]/50 ${row[2] ? "bg-[var(--primary)]/5" : ""}`}
                        >
                          <td
                            className={`py-3 px-4 ${row[2] ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                          >
                            {row[0] as string}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-mono-data ${row[2] ? "font-bold text-[var(--primary)]" : "text-[var(--text-primary)]"}`}
                          >
                            {row[1] as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results narrative */}
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    The 57% of tickets that still require human review arrive
                    pre-drafted: the relevant knowledge is already retrieved, the
                    response is generated in the correct language and the
                    agent&apos;s task is to confirm and refine rather than
                    research and compose from scratch.
                  </p>
                  <p>
                    A team of three, reduced from five, now handles 311 tickets
                    per day, up from 230 six months earlier. This represents a
                    35% increase in volume while reducing headcount from five to
                    three. With routine tickets handled or pre-drafted, agents
                    shifted to complex integration support, proactive outreach to
                    at-risk accounts and higher-quality bug escalations. The work
                    changed from clearing a queue to solving problems that
                    require judgment.
                  </p>
                  <p>
                    The 43% full automation rate reflects deliberately
                    conservative confidence thresholds chosen for initial
                    deployment. As the knowledge base accumulates confirmed
                    responses and category-level accuracy matures, the automation
                    rate increases without requiring changes to the underlying
                    system.
                  </p>
                  <p>
                    The largest quality improvement was in Italian-language
                    support. CSAT jumped from 76% to 88%, the biggest
                    single-language gain. The driver was not speed but
                    consistency. With AI-generated drafts trained on the
                    team&apos;s own best Italian responses, quality no longer
                    depended on whether the strongest Italian speaker was on
                    shift. Customers received the same quality answer regardless
                    of time or staffing.
                  </p>
                </div>

                {/* Before/After callout */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 grid grid-cols-2 gap-3"
                >
                  <div className="glass-panel p-5 text-center border-t-2 border-t-[var(--text-muted)]/30">
                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2 font-medium">
                      Before
                    </div>
                    <div className="text-2xl font-bold font-mono-data text-[var(--text-muted)]">
                      230
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      tickets/day · 5 agents
                    </div>
                  </div>
                  <div className="glass-panel p-5 text-center border-t-2 border-t-emerald-400">
                    <div className="text-xs uppercase tracking-wider text-emerald-400 mb-2 font-medium">
                      After
                    </div>
                    <div className="text-2xl font-bold font-mono-data text-emerald-400">
                      311
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      tickets/day · 3 agents
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* ─ STRATEGIC IMPACT ─ */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Strategic impact
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Beyond operational efficiency:
                </p>

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {[
                    {
                      num: "1",
                      title: "Capacity without headcount.",
                      desc: "35% volume growth absorbed while reducing the team from five to three agents. The constraint was never response speed. It was that every ticket cost the same amount of agent time regardless of complexity. Confidence-based routing solved this by matching effort to difficulty.",
                      icon: TrendingUp,
                    },
                    {
                      num: "2",
                      title: "Language consistency as quality lever.",
                      desc: "Response quality no longer depends on which agent is on shift or which language they are strongest in. The biggest impact landed in the weakest language (Italian), where part-time coverage had caused chronic inconsistency. Consistent multilingual quality is now a system property, not a staffing outcome.",
                      icon: Globe,
                    },
                    {
                      num: "3",
                      title: "Built-in feedback loop.",
                      desc: "Every agent correction improves retrieval ranking and response quality for the next similar ticket. The system does not degrade with scale. It improves with use. No manual retraining cycles or prompt maintenance required.",
                      icon: RefreshCw,
                    },
                  ].map((lesson) => (
                    <motion.div
                      key={lesson.num}
                      variants={fadeUp}
                      className="glass-panel p-6 flex gap-5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                        <lesson.icon className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {lesson.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ─ CLOSING ─ */}
              <motion.div
                {...fadeIn}
                className="glass-panel p-8 border-l-4 border-l-[var(--primary)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.04] rounded-full blur-2xl" />
                <p className="text-[var(--text-secondary)] leading-relaxed italic">
                  ClaimPilot is developed by True Aim AG, a Swiss insurtech
                  company headquartered in Zug, Switzerland. For technical
                  discussions or pilot scoping, contact us at{" "}
                  <a
                    href="mailto:hello@trueaim.ai"
                    className="text-[var(--primary)] hover:underline"
                  >
                    hello@trueaim.ai
                  </a>
                  .
                </p>
              </motion.div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside aria-label="Key highlights">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6 sticky top-24"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    "43% fully automated resolution",
                    "93% faster first response (45 min → < 4 min)",
                    "90% AI draft acceptance rate",
                    "91% CSAT (+11 points)",
                    "Italian CSAT: 76% → 88%",
                    "94% AI-assisted ticket coverage",
                    "35% volume growth, team reduced from 5 to 3",
                    "Runs on customer's own Azure infrastructure",
                  ].map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Product
                  </h4>
                  <span className="block text-sm px-3 py-2 rounded-lg font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                    ClaimPilot
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "RAG Pipeline",
                      "Multilingual",
                      "Confidence Routing",
                      "Auto-send",
                      "Freshdesk Integration",
                      "Feedback Loop",
                      "Knowledge Consolidation",
                      "Azure OpenAI",
                    ].map((capability) => (
                      <span
                        key={capability}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Get Similar Results
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BarChart3 className="w-12 h-12 text-[var(--primary)]/60 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Ready to achieve similar results?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Start with a pilot on your support workflow and see the impact for
              yourself.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
