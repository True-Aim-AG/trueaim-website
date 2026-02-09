"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  Info,
  ChevronDown,
  FileText,
  Brain,
  FileSearch,
  ClipboardCheck,
} from "lucide-react";
import {
  type ROIInputs,
  calculateROI,
  AUTOMATION_OPTIONS as automationOptions,
  ASSUMPTIONS,
} from "@/lib/roi-calculations";

const currencyOptions = [
  { value: "CHF", symbol: "CHF", locale: "de-CH" },
  { value: "EUR", symbol: "EUR", locale: "de-DE" },
  { value: "USD", symbol: "USD", locale: "en-US" },
  { value: "ZAR", symbol: "ZAR", locale: "en-ZA" },
];

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: 50000,
    handlingTime: 45,
    claimsHandlers: 50,
    automationLevel: "none",
    currency: "CHF",
  });

  const [showAssumptions, setShowAssumptions] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportEmail, setReportEmail] = useState("");

  const currencyConfig = currencyOptions.find(c => c.value === inputs.currency) || currencyOptions[0];

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.value,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim() || !reportEmail.trim()) return;
    setReportSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: reportName.split(" ")[0],
          lastName: reportName.split(" ").slice(1).join(" ") || "-",
          email: reportEmail,
          company: "-",
          jobTitle: "-",
          country: "-",
          interest: "general",
          consent: true,
          message: `Impact Report Request\n\nVolume: ${formatNumber(results.volume)} claims/year\nHandlers: ${inputs.claimsHandlers}\nHandling time: ${inputs.handlingTime} min\nGross annual impact: ${formatCurrency(results.grossAnnualImpact)}`,
        }),
      });
      setReportSubmitted(true);
    } catch {
      setReportSubmitted(true);
    } finally {
      setReportSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Your Claims Operation</h3>
            <p className="text-sm text-[var(--text-muted)]">Adjust the values to match your situation</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Currency Selector */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Currency</label>
            <div className="flex gap-2">
              {currencyOptions.map((curr) => (
                <button
                  key={curr.value}
                  onClick={() => setInputs(prev => ({ ...prev, currency: curr.value }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    inputs.currency === curr.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-white/10 text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  {curr.value}
                </button>
              ))}
            </div>
          </div>

          {/* Claims Volume */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Annual Claims Volume: <span className="text-[var(--primary)]">{formatNumber(inputs.claimsVolume)} claims/year</span>
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={inputs.claimsVolume}
              onChange={(e) => setInputs(prev => ({ ...prev, claimsVolume: parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
              <span>10,000</span>
              <span>1,000,000</span>
            </div>
          </div>

          {/* Handling Time */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Average handling time per claim: <span className="text-[var(--primary)]">{inputs.handlingTime} minutes</span>
            </label>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={inputs.handlingTime}
              onChange={(e) => setInputs(prev => ({ ...prev, handlingTime: parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
              <span>5 min</span>
              <span>180 min</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">Use an estimate for a typical claim without unusual complexity</p>
          </div>

          {/* Claims Handlers */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Number of claims handlers or assessors: <span className="text-[var(--primary)]">{inputs.claimsHandlers}</span>
            </label>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={inputs.claimsHandlers}
              onChange={(e) => setInputs(prev => ({ ...prev, claimsHandlers: parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
              <span>1</span>
              <span>500</span>
            </div>
          </div>

          {/* Automation Level */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Eligible for straight-through or assisted processing
            </label>
            <div className="space-y-2">
              {automationOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    inputs.automationLevel === option.value
                      ? 'border-[var(--primary)] bg-[var(--primary)]/20'
                      : 'border-[var(--border)] hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="automationLevel"
                    value={option.value}
                    checked={inputs.automationLevel === option.value}
                    onChange={(e) => setInputs(prev => ({ ...prev, automationLevel: e.target.value }))}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    inputs.automationLevel === option.value
                      ? 'border-[var(--primary)]'
                      : 'border-white/30'
                  }`}>
                    {inputs.automationLevel === option.value && (
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                    )}
                  </div>
                  <span className="text-sm text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Main Impact Card */}
        <div className="bg-gradient-to-br from-[var(--primary)] to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium text-white/80">Estimated Gross Operational Impact (Conservative)</span>
          </div>
          <p className="text-xs text-white/60 mb-4">Based on pilot-scale assumptions</p>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {formatCurrency(results.grossAnnualImpact)}
          </div>
          <div className="text-white/80">
            {results.savingsPercentage.toFixed(0)}% reduction in claims handling costs
          </div>
        </div>

        {/* 3-Bucket Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Savings Breakdown</h4>

          {/* Capacity unlocked */}
          <Link href="/products/mira" className="block glass-panel p-4 hover:bg-white/5 transition-colors group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">Capacity unlocked</span>
                <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">True Aim</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400 font-mono-data">
                {formatCurrency(results.buckets.capacityGross * ASSUMPTIONS.sensitivityAdjustment)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Fewer touches per claim, shorter handling time</p>
          </Link>

          {/* Rework avoided */}
          <Link href="/products/claimeval" className="block glass-panel p-4 hover:bg-white/5 transition-colors group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Rework avoided</span>
                <span className="text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">ClaimEval</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400 font-mono-data">
                {formatCurrency(results.buckets.reworkGross * ASSUMPTIONS.sensitivityAdjustment)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Fewer reopens, appeals and corrections</p>
          </Link>

          {/* Leakage reduction */}
          <Link href="/products/claimeval" className="block glass-panel p-4 hover:bg-white/5 transition-colors group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-[var(--aurora-cyan)]" />
                <span className="text-sm font-medium text-white">Leakage reduction</span>
                <span className="text-xs text-[var(--aurora-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">ClaimEval</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400 font-mono-data">
                {formatCurrency(results.buckets.leakageGross * ASSUMPTIONS.sensitivityAdjustment)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Reduced inconsistent decisions</p>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-6">
            <Clock className="w-5 h-5 text-[var(--primary)] mb-2" />
            <div className="text-2xl font-bold text-white font-mono-data">
              {formatNumber(results.hoursSaved)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">Hours saved/year</div>
          </div>
          <div className="glass-panel p-6">
            <Users className="w-5 h-5 text-[var(--aurora-cyan)] mb-2" />
            <div className="text-2xl font-bold text-white font-mono-data">
              {results.fteEquivalent.toFixed(1)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">Capacity unlocked (FTE equivalent)</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">Reflects reduced handling effort, not headcount reduction</p>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-[var(--border)]">
            <Info className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--text-muted)]">
              All figures shown represent gross operational impact and do not take into account the cost of True Aim's services.
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-[var(--border)]">
            <Info className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--text-muted)]">
              Platform pricing is not provided. Final pricing is based on contract terms and commercial negotiations.
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-[var(--border)]">
            <Info className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--text-muted)]">
              Based on pilot data from insurance claims.
            </p>
          </div>
        </div>

        {/* Expandable Assumptions Section */}
        <div className="glass-panel overflow-hidden">
          <button
            onClick={() => setShowAssumptions(prev => !prev)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              <span className="font-medium text-white">Methodology and Assumptions</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${
                showAssumptions ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {showAssumptions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-6 border-t border-[var(--border)]">
                  {/* How We Calculate */}
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-white mb-3">How We Calculate</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[var(--text-muted)] mb-2">
                          <span className="text-white font-medium">Current Handling Cost</span> = Handling Time x Cost per Minute x Claims Volume
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {inputs.handlingTime} min x {currencyConfig.symbol} {results.details.costPerMinute.toFixed(2)}/min x {formatNumber(results.volume)} = {formatCurrency(results.currentAnnualCost)}
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[var(--text-muted)] mb-2">
                          <span className="text-white font-medium">Gross Savings</span> = Capacity + Rework + Leakage
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {formatCurrency(results.buckets.capacityGross)} + {formatCurrency(results.buckets.reworkGross)} + {formatCurrency(results.buckets.leakageGross)} = {formatCurrency(results.buckets.grossTotal)}
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[var(--text-muted)] mb-2">
                          <span className="text-white font-medium">Conservative Estimate</span> = Gross Savings x 75% Sensitivity Adjustment
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {formatCurrency(results.buckets.grossTotal)} x 0.75 = {formatCurrency(results.grossAnnualImpact)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Assumptions */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Key Assumptions</h4>
                    <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        Savings apply only to eligible claim categories
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        No immediate headcount reduction assumed
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        Savings reflect reduced handling effort and rework
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        75% sensitivity adjustment applied to all projections
                      </li>
                    </ul>
                  </div>

                  {/* Detailed breakdown table */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Your Numbers Breakdown</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-[var(--border)]">
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Annual claims volume</td>
                            <td className="py-2 text-white text-right font-mono">{formatNumber(results.volume)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Claims automated by True Aim</td>
                            <td className="py-2 text-white text-right font-mono">{formatNumber(results.details.automatedClaims)} ({results.details.automationRate.toFixed(0)}%)</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Claims requiring manual review</td>
                            <td className="py-2 text-white text-right font-mono">{formatNumber(results.details.manualClaims)} ({(100 - results.details.automationRate).toFixed(0)}%)</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Capacity savings (gross)</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.buckets.capacityGross)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Rework avoided (gross)</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.buckets.reworkGross)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Leakage reduction (gross)</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.buckets.leakageGross)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Sensitivity adjustment (75%)</td>
                            <td className="py-2 text-amber-400 text-right font-mono">-{formatCurrency(results.buckets.grossTotal * 0.25)}</td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="py-2 text-white">Gross annual impact (conservative)</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.grossAnnualImpact)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">Important Notes</h4>
                    <ul className="text-xs text-[var(--text-muted)] space-y-1 list-disc list-inside">
                      <li>Estimates are informed by pilot data from travel insurance claims</li>
                      <li>Actual automation rates depend on policy complexity and claim types</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gated Report CTA */}
        <div className="glass-panel p-6 text-center">
          {reportSubmitted ? (
            <div>
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-1">Request Received</h4>
              <p className="text-sm text-[var(--text-muted)]">
                We&apos;ll send your personalised impact breakdown within 1 business day.
              </p>
            </div>
          ) : showReportForm ? (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <h4 className="font-semibold text-white mb-1">Request Detailed Impact Report</h4>
              <input
                type="text"
                placeholder="Your name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors"
              />
              <input
                type="email"
                placeholder="Work email"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="submit"
                disabled={reportSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-[var(--primary)]/30 disabled:opacity-50"
              >
                {reportSubmitting ? "Sending..." : "Send My Impact Report"}
              </button>
            </form>
          ) : (
            <div>
              <h4 className="font-semibold text-white mb-1">
                Want the full breakdown?
              </h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Get a personalised impact report with detailed methodology and assumptions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowReportForm(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-[var(--primary)]/30"
                >
                  Request Detailed Impact Report
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
