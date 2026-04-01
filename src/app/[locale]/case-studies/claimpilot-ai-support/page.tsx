"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
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
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 } as const,
};

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
      {open && <div className="px-5 pb-5 pt-0">{children}</div>}
    </div>
  );
}

export default function AISupportCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 py-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>

            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <div>
                <div className="text-lg font-medium text-[var(--text-primary)]">
                  Swiss Insurance Services Platform
                </div>
                <div className="text-[var(--text-muted)]">
                  Insurance Services / B2B Platform · 95 tickets/day · 3
                  languages (DE/IT/FR)
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Multilingual B2B support scaled 35% with zero headcount increase
              using AI-assisted resolution
            </h1>
            <p className="text-xl md:text-2xl text-[var(--primary)] font-semibold mb-6">
              38% fully automated, 91% faster first response, 87% AI draft
              acceptance
            </p>

            {/* Product & Timeline */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                ClaimPilot
              </span>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Clock className="w-4 h-4" />
                4-week POC, 5-month rollout
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {[
              {
                value: "38%",
                label: "Fully automated",
                improvement: "no human touch",
              },
              {
                value: "91%",
                label: "Faster first response",
                improvement: "45 min to < 4 min",
              },
              {
                value: "87%",
                label: "AI draft acceptance",
                improvement: "minor or no edits",
              },
              {
                value: "89%",
                label: "Customer satisfaction",
                improvement: "+9 points from 80%",
              },
            ].map((metric) => (
              <div key={metric.label} className="glass-panel p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold font-mono-data text-[var(--primary)] mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  {metric.label}
                </div>
                {metric.improvement && (
                  <div className="text-xs text-[var(--secondary)] mt-1">
                    {metric.improvement}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === MAIN CONTENT + SIDEBAR === */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
            {/* Main Content */}
            <article className="space-y-16">
              {/* 1. Problem */}
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
                    managed by three first-level agents.
                  </p>
                  <p>
                    By early 2026, daily ticket volume had reached 70 requests
                    per day and was climbing 20-25% year over year. The team
                    maintained an 80% customer satisfaction score and a two-hour
                    first-response SLA, but the gap between ticket growth and
                    team capacity was widening each quarter.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "70", label: "Tickets per day (baseline)" },
                    { value: "3", label: "L1 agents" },
                    { value: "3", label: "Languages (DE/IT/FR)" },
                    { value: "20-25%", label: "YoY volume growth" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-panel-light p-4 text-center"
                    >
                      <div className="text-lg font-bold font-mono-data text-[var(--primary)]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Requirements */}
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
                      <div
                        key={req}
                        className="glass-panel-light p-3 text-sm text-[var(--text-secondary)] flex items-start gap-3"
                      >
                        <Quote className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5 opacity-50" />
                        <span>&ldquo;{req}&rdquo;</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Constraints */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Key constraints
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Globe,
                        title: "Language constraint",
                        desc: "Tickets arrive in German (50%), Italian (35%) and French (15%), each requiring market-specific terminology. Hiring trilingual support staff in Switzerland is expensive and slow.",
                      },
                      {
                        icon: BookOpen,
                        title: "Knowledge constraint",
                        desc: "The answers to most tickets already existed, scattered across Confluence documentation, Freshdesk canned responses and the heads of three experienced agents. No single source of truth. New agents took weeks to ramp. Consistency drifted across languages and shifts.",
                      },
                      {
                        icon: MessageSquare,
                        title: "Workflow constraint",
                        desc: "Three agents with an established Freshdesk-based process. The system could not require a new tool or change how agents worked day to day.",
                      },
                      {
                        icon: Users,
                        title: "Volume constraint",
                        desc: "70 tickets per day climbing 20-25% year over year. Roughly 70% were answerable from existing knowledge without any system investigation. Agents spent the same time on a password-reset walkthrough as on a complex integration issue. The repetitive work was crowding out cases that needed human judgment.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
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
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 2. First-Principles Design */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  First-principles design
                </h2>

                <div className="space-y-8">
                  {/* Design Block 1: Knowledge consolidation */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          70% of tickets were answerable from existing knowledge,
                          but that knowledge lived in three places: Confluence
                          documentation, Freshdesk canned responses and
                          experienced agents&apos; heads. No structured retrieval
                          existed. New agents took weeks to become productive
                          because the knowledge transfer was informal and
                          incomplete.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          A retrieval-augmented generation pipeline ingesting all
                          three knowledge sources plus 18 months of historical
                          ticket-response pairs. A single retrieval layer serves
                          all agents and all languages. The system surfaces the
                          most relevant knowledge for each incoming ticket,
                          regardless of which source it originally lived in.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          One knowledge base, three languages, consistent answers
                          regardless of agent experience level. The ramp time for
                          new agents collapsed because the institutional knowledge
                          that previously lived in people&apos;s heads became
                          searchable and retrievable.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 2: Multilingual quality */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Tickets arrive in German (50%), Italian (35%) and French
                          (15%). Each language requires native-quality responses
                          with market-specific terminology. The strongest Italian
                          speaker on the team was part-time, creating chronic
                          quality inconsistency in that language. Hiring
                          trilingual L1 agents in Switzerland is slow and
                          expensive.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Language-aware generation calibrated per market. The
                          system detects the ticket language, retrieves
                          language-matched knowledge and generates responses using
                          terminology validated against historical agent responses
                          in that language. The training signal is the team&apos;s
                          own best responses, not generic translation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Native-quality responses in all three languages. Italian
                          CSAT (historically the weakest at 76% due to part-time
                          coverage) jumped to 88%. Response quality no longer
                          depends on which agent is on shift or which language
                          they are strongest in.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 3: Workflow integration */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Three agents with an established Freshdesk workflow. Any
                          system requiring a new interface or changing their daily
                          process would face adoption resistance and slow rollout.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          AI drafts surface as internal notes inside Freshdesk.
                          Agents review, edit if needed, send. No new interface.
                          No workflow change. The system adapts to the tool they
                          already use, not the other way around.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Adoption was immediate. Draft acceptance hit 78% in the
                          first week against a 60% target. Six months in, agents
                          edit roughly one in eight drafts, mostly to add a
                          personal touch rather than correct factual errors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 4: Confidence-based routing */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Not all tickets carry the same risk. A password-reset
                          walkthrough has a different error cost than a billing
                          dispute or an integration question. Treating every
                          ticket as equally risky wastes agent time on safe
                          categories while under-protecting sensitive ones.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Confidence-based routing with three tiers.
                          High-confidence, low-risk categories auto-send without
                          human involvement. Medium-confidence tickets surface as
                          pre-drafted responses for agent review. Low-confidence
                          or sensitive tickets route to agents with retrieved
                          context but no draft. Classification confidence
                          thresholds are per-category, validated against
                          historical accuracy before any category qualifies for
                          auto-send.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          38% of tickets resolve fully automatically. 94% receive
                          AI assistance in some form. The remaining 6% are
                          escalations that bypass the system entirely. Agent time
                          concentrates on the cases that genuinely require human
                          judgment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Architecture */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Architecture
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The system runs as four layers between the customer&apos;s
                  Freshdesk inbox and their agents.
                </p>

                {/* Pipeline Visualization */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-8">
                  {[
                    {
                      icon: BookOpen,
                      label: "Knowledge Ingestion",
                      stage: "1",
                    },
                    {
                      icon: Layers,
                      label: "Classification & Routing",
                      stage: "2",
                    },
                    {
                      icon: MessageSquare,
                      label: "Response Generation",
                      stage: "3",
                    },
                    {
                      icon: RefreshCw,
                      label: "Feedback & Learning",
                      stage: "4",
                    },
                  ].map((s) => (
                    <div
                      key={s.stage}
                      className="glass-panel-light p-3 text-center"
                    >
                      <s.icon className="w-5 h-5 text-[var(--primary)] mx-auto mb-1" />
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        Layer {s.stage}
                      </div>
                      <div className="text-xs font-medium text-[var(--text-primary)]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture Detail Sections */}
                <div className="space-y-3">
                  <ExpandableSection
                    title="1. Knowledge ingestion and indexing"
                    defaultOpen
                  >
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Three source types: Confluence documentation,
                            Freshdesk canned responses, 18 months of historical
                            ticket-response pairs.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Language-specific indexing. Content tagged and
                            retrievable by language with terminology mapping
                            across German, Italian and French.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Incremental updates. New agent responses and
                            corrections feed back into the knowledge base
                            automatically. The system learns from every
                            interaction without manual retraining.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="2. Classification and routing">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Language detection on every incoming ticket.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Category classification with per-ticket confidence
                            scoring.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Routing decision based on confidence: auto-send (high
                            confidence in a validated category), draft for review
                            (medium confidence) or context-only with no draft
                            (low confidence or sensitive category).
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Confidence thresholds calibrated per category against
                            historical accuracy. A category only qualifies for
                            auto-send after sustained accuracy above validated
                            thresholds.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="3. Response generation">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Retrieval: language-matched knowledge chunks ranked
                            by relevance to the specific ticket.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Generation: response drafted using retrieved context,
                            matching the ticket&apos;s language and
                            market-specific terminology.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Quality signal: every draft carries a confidence
                            score visible to the agent. The system communicates
                            what it is confident about and where it is uncertain.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="4. Feedback and learning">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Every agent edit logged as a diff against the
                            original AI draft.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Corrections feed into prompt refinement and retrieval
                            ranking adjustments.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Category-level accuracy tracked over time. Auto-send
                            eligibility reviewed continuously against accuracy
                            drift.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>
                </div>

                <div className="glass-panel-light p-4 mt-6">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-medium text-[var(--text-primary)]">
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

              {/* 4. Integration */}
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
                          <span className="text-[var(--text-muted)]">
                            &bull;
                          </span>
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

                {/* Data Flow */}
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

              {/* 5. Results */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Results
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Six months after initial deployment, measured against the
                  pre-deployment baseline:
                </p>

                <div className="glass-panel overflow-hidden overflow-x-auto mb-6">
                  <table className="w-full text-sm min-w-[400px]">
                    <tbody>
                      {[
                        [
                          "Fully automated resolution rate",
                          "38% (auto-send, no human touch)",
                          true,
                        ],
                        [
                          "AI draft acceptance rate",
                          "87% (minor or no edits)",
                          false,
                        ],
                        [
                          "First response time reduction",
                          "91% (45 min to under 4 min)",
                          true,
                        ],
                        [
                          "Customer satisfaction",
                          "89% (+9 points from 80%)",
                          false,
                        ],
                        [
                          "Ticket coverage (AI-assisted)",
                          "94%",
                          false,
                        ],
                        [
                          "Escalation false positive rate",
                          "2.1% (target was <5%)",
                          false,
                        ],
                        [
                          "POC to production",
                          "4-week POC, 5-month rollout",
                          false,
                        ],
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

                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    The 62% of tickets that still require human review arrive
                    pre-drafted: the relevant knowledge is already retrieved, the
                    response is generated in the correct language and the
                    agent&apos;s task is to confirm and refine rather than
                    research and compose from scratch.
                  </p>
                  <p>
                    The team of three now handles 95 tickets per day, up from 70
                    six months earlier. No additional staff were hired. With
                    routine tickets handled or pre-drafted, agents shifted to
                    complex integration support, proactive outreach to at-risk
                    accounts and higher-quality bug escalations. The work changed
                    from clearing a queue to solving problems that require
                    judgment.
                  </p>
                  <p>
                    The 38% full automation rate reflects deliberately
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
              </motion.div>

              {/* 6. Strategic Impact */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Strategic impact
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Beyond operational efficiency:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      title: "Capacity without headcount.",
                      desc: "35% volume growth absorbed by the same team of three. The constraint was never response speed. It was that every ticket cost the same amount of agent time regardless of complexity. Confidence-based routing solved this by matching effort to difficulty.",
                    },
                    {
                      num: "2",
                      title: "Language consistency as quality lever.",
                      desc: "Response quality no longer depends on which agent is on shift or which language they are strongest in. The biggest impact landed in the weakest language (Italian), where part-time coverage had caused chronic inconsistency. Consistent multilingual quality is now a system property, not a staffing outcome.",
                    },
                    {
                      num: "3",
                      title: "Built-in feedback loop.",
                      desc: "Every agent correction improves retrieval ranking and response quality for the next similar ticket. The system does not degrade with scale. It improves with use. No manual retraining cycles or prompt maintenance required.",
                    },
                  ].map((lesson) => (
                    <div key={lesson.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          {lesson.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {lesson.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quote */}
              <motion.div
                {...fadeIn}
                className="glass-panel p-8 border-l-4 border-l-[var(--primary)]"
              >
                <Quote className="w-10 h-10 text-[var(--primary)] mb-4 opacity-50" />
                <blockquote className="text-lg text-[var(--text-primary)] italic mb-4">
                  ClaimPilot is developed by True Aim AG, a Swiss insurtech
                  company headquartered in Zug, Switzerland. For technical
                  discussions or pilot scoping, contact us at hello@trueaim.ai.
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-[var(--text-primary)]">
                    True Aim AG
                  </div>
                  <div className="text-[var(--text-muted)]">
                    Zug, Switzerland
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside aria-label="Key highlights">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    "38% fully automated resolution",
                    "91% faster first response (45 min to < 4 min)",
                    "87% AI draft acceptance rate",
                    "89% CSAT (+9 points)",
                    "Italian CSAT: 76% to 88%",
                    "94% AI-assisted ticket coverage",
                    "35% volume growth, zero headcount increase",
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
                  <div className="space-y-2">
                    <span className="block text-sm px-3 py-2 rounded-lg font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                      ClaimPilot
                    </span>
                  </div>
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

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Ready to achieve similar results?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Start with a pilot on your closed claims and see the impact for
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
