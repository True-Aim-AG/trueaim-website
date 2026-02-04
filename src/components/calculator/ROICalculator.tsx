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

interface ROIInputs {
  claimsVolume: string;
  handlingTime: number;
  hourlyRate: number;
  automationLevel: string;
  currency: string;
}

const volumeOptions = [
  { value: "5000", label: "< 10,000", claims: 5000 },
  { value: "25000", label: "10,000 - 50,000", claims: 25000 },
  { value: "75000", label: "50,000 - 100,000", claims: 75000 },
  { value: "250000", label: "100,000 - 500,000", claims: 250000 },
  { value: "750000", label: "500,000+", claims: 750000 },
];

const automationOptions = [
  { value: "none", label: "No current automation", factor: 0.85 },
  { value: "some", label: "Basic rules/triage in place", factor: 0.70 },
  { value: "significant", label: "Existing BPM/workflow automation", factor: 0.50 },
];

const currencyOptions = [
  { value: "CHF", symbol: "CHF", locale: "de-CH" },
  { value: "EUR", symbol: "EUR", locale: "de-DE" },
  { value: "USD", symbol: "USD", locale: "en-US" },
  { value: "ZAR", symbol: "ZAR", locale: "en-ZA" },
];

// Constants for assumptions (displayed to users)
const ASSUMPTIONS = {
  automatedClaimReviewTime: 0.01, // hours (36 seconds)
  manualClaimSpeedup: 0.5, // 50% faster processing for remaining manual claims
  platformCostPerClaim: 0.50, // per claim
  implementationCostFactor: 0.25, // 3 months of platform fees
  workHoursPerYear: 2080, // Standard work hours per FTE
  confidenceHaircut: 0.75, // 75% conservative factor
  reworkReductionRate: 0.03, // 3% of claims avoid rework
  reworkCostMultiplier: 2.5, // rework costs 2.5x original handling
  leakageReductionRate: 0.02, // 2% leakage reduction
  averageClaimValue: 5000, // average claim value for leakage calc
  leakagePercentOfClaim: 0.05, // 5% of claim value as leakage
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: "25000",
    handlingTime: 45,
    hourlyRate: 65,
    automationLevel: "none",
    currency: "CHF",
  });

  const [showAssumptions, setShowAssumptions] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const currencyConfig = currencyOptions.find(c => c.value === inputs.currency) || currencyOptions[0];

  const results = useMemo(() => {
    const volume = volumeOptions.find(v => v.value === inputs.claimsVolume)?.claims || 25000;
    const automationFactor = automationOptions.find(a => a.value === inputs.automationLevel)?.factor || 0.85;

    // Current state calculations
    const hoursPerClaim = inputs.handlingTime / 60;
    const totalHoursPerYear = volume * hoursPerClaim;
    const currentAnnualCost = totalHoursPerYear * inputs.hourlyRate;

    // === BUCKET 1: Capacity Unlocked (MIRA) ===
    const trueAimEfficiency = automationFactor;
    const automatedClaims = volume * trueAimEfficiency;
    const manualClaims = volume - automatedClaims;

    const automatedHours = automatedClaims * ASSUMPTIONS.automatedClaimReviewTime;
    const manualHours = manualClaims * hoursPerClaim * ASSUMPTIONS.manualClaimSpeedup;
    const trueAimTotalHours = automatedHours + manualHours;
    const trueAimAnnualCost = trueAimTotalHours * inputs.hourlyRate;
    const capacitySavingsGross = currentAnnualCost - trueAimAnnualCost;

    // === BUCKET 2: Rework Avoided (ClaimEval) ===
    const reworkClaimsAvoided = volume * ASSUMPTIONS.reworkReductionRate;
    const reworkSavingsGross = reworkClaimsAvoided * hoursPerClaim * ASSUMPTIONS.reworkCostMultiplier * inputs.hourlyRate;

    // === BUCKET 3: Leakage Reduction (ClaimEval) ===
    const leakageSavingsGross = volume * ASSUMPTIONS.leakageReductionRate * ASSUMPTIONS.averageClaimValue * ASSUMPTIONS.leakagePercentOfClaim;

    // Total gross savings
    const grossSavings = capacitySavingsGross + reworkSavingsGross + leakageSavingsGross;

    // Apply confidence haircut (75%)
    const conservativeSavings = grossSavings * ASSUMPTIONS.confidenceHaircut;

    // Platform cost estimate
    const platformCost = volume * ASSUMPTIONS.platformCostPerClaim;

    const netAnnualImpact = conservativeSavings - platformCost;
    const savingsPercentage = currentAnnualCost > 0 ? (netAnnualImpact / currentAnnualCost) * 100 : 0;

    // Time savings
    const hoursSaved = totalHoursPerYear - trueAimTotalHours;
    const fteEquivalent = hoursSaved / ASSUMPTIONS.workHoursPerYear;

    // Payback period
    const implementationCost = platformCost * ASSUMPTIONS.implementationCostFactor;
    const monthlyNetSavings = netAnnualImpact / 12;
    const paybackMonths = monthlyNetSavings > 0 ? Math.ceil(implementationCost / monthlyNetSavings) : 0;

    return {
      currentAnnualCost,
      netAnnualImpact,
      savingsPercentage,
      hoursSaved,
      fteEquivalent,
      paybackMonths,
      volume,
      buckets: {
        capacityGross: capacitySavingsGross,
        reworkGross: reworkSavingsGross,
        leakageGross: leakageSavingsGross,
        grossTotal: grossSavings,
        conservativeTotal: conservativeSavings,
      },
      details: {
        hoursPerClaim,
        totalHoursPerYear,
        automationRate: trueAimEfficiency * 100,
        automatedClaims,
        manualClaims,
        automatedHours,
        manualHours,
        trueAimTotalHours,
        trueAimAnnualCost,
        platformCost,
        implementationCost,
        reworkClaimsAvoided,
      },
    };
  }, [inputs]);

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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail && leadCompany) {
      console.log("Lead capture:", { email: leadEmail, company: leadCompany });
      setLeadSubmitted(true);
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
          {/* Claims Volume */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Annual Claims Volume
            </label>
            <select
              value={inputs.claimsVolume}
              onChange={(e) => setInputs({ ...inputs, claimsVolume: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              {volumeOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#12141D] text-white">
                  {option.label} claims/year
                </option>
              ))}
            </select>
          </div>

          {/* Handling Time */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Average Handling Time: <span className="text-[var(--primary)]">{inputs.handlingTime} minutes</span>
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={inputs.handlingTime}
              onChange={(e) => setInputs({ ...inputs, handlingTime: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
              <span>15 min</span>
              <span>120 min</span>
            </div>
          </div>

          {/* Hourly Rate with Currency Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white">
                Average handling cost (fully loaded)
              </label>
              <div className="flex gap-1">
                {currencyOptions.map((curr) => (
                  <button
                    key={curr.value}
                    onClick={() => setInputs({ ...inputs, currency: curr.value })}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
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
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{currencyConfig.symbol}</span>
              <input
                type="number"
                min="30"
                max="200"
                value={inputs.hourlyRate}
                onChange={(e) => setInputs({ ...inputs, hourlyRate: parseInt(e.target.value) || 65 })}
                className="w-full pl-14 pr-4 py-3 rounded-lg border border-[var(--border)] bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
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
                    onChange={(e) => setInputs({ ...inputs, automationLevel: e.target.value })}
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
            <span className="text-sm font-medium text-white/80">Estimated Annual Impact (Conservative)</span>
          </div>
          <p className="text-xs text-white/60 mb-4">Based on pilot-scale assumptions</p>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {formatCurrency(results.netAnnualImpact)}
          </div>
          <div className="text-white/80 mb-4">
            {results.savingsPercentage.toFixed(0)}% reduction in claims handling costs
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg inline-flex">
            <CheckCircle className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80">
              Indicative payback: {results.paybackMonths < 12 ? `${results.paybackMonths} months` : '< 1 year'}
            </span>
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
                <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">MIRA</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400 font-mono-data">
                {formatCurrency(results.buckets.capacityGross * ASSUMPTIONS.confidenceHaircut)}
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
                {formatCurrency(results.buckets.reworkGross * ASSUMPTIONS.confidenceHaircut)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Fewer reopens, appeals, and corrections</p>
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
                {formatCurrency(results.buckets.leakageGross * ASSUMPTIONS.confidenceHaircut)}
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

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-4 bg-white/5 rounded-lg border border-[var(--border)]">
          <Info className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-muted)]">
            Estimates based on pilot-scale assumptions with a 75% conservative confidence factor applied. Actual results vary based on claim complexity, policy types, and implementation scope.
          </p>
        </div>

        {/* Expandable Assumptions Section */}
        <div className="glass-panel overflow-hidden">
          <button
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              <span className="font-medium text-white">Methodology & Assumptions</span>
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
                          <span className="text-white font-medium">Current Annual Cost</span> = Claims Volume x Handling Time x Hourly Rate
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {formatNumber(results.volume)} x {results.details.hoursPerClaim.toFixed(2)} hrs x {currencyConfig.symbol} {inputs.hourlyRate} = {formatCurrency(results.currentAnnualCost)}
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
                          <span className="text-white font-medium">Conservative Estimate</span> = Gross Savings x 75% - Platform Cost
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {formatCurrency(results.buckets.grossTotal)} x 0.75 - {formatCurrency(results.details.platformCost)} = {formatCurrency(results.netAnnualImpact)}
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
                        Conservative confidence factor (75%) applied
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
                            <td className="py-2 text-[var(--text-muted)]">Claims automated by MIRA</td>
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
                            <td className="py-2 text-[var(--text-muted)]">Confidence haircut (75%)</td>
                            <td className="py-2 text-amber-400 text-right font-mono">-{formatCurrency(results.buckets.grossTotal * 0.25)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Platform cost (annual)</td>
                            <td className="py-2 text-amber-400 text-right font-mono">-{formatCurrency(results.details.platformCost)}</td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="py-2 text-white">Net annual impact (conservative)</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.netAnnualImpact)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">Important Notes</h4>
                    <ul className="text-xs text-[var(--text-muted)] space-y-1 list-disc list-inside">
                      <li>These estimates are based on pilot data from travel insurance claims</li>
                      <li>Actual automation rates depend on policy complexity and claim types</li>
                      <li>Implementation timeline and costs vary based on integration requirements</li>
                      <li>Platform pricing is indicative; final pricing based on contract terms</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA with lead capture */}
        <div className="glass-panel p-6">
          {leadSubmitted ? (
            <div className="text-center py-4">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">We&apos;ll send the detailed breakdown to your inbox.</p>
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-white mb-1">
                Want a detailed analysis for your operation?
              </h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Get a customized ROI projection based on your specific claims data.
              </p>
              <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="Work email"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-white/5 text-white placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <input
                  type="text"
                  required
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="Company"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-white/5 text-white placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-sm shadow-lg shadow-[var(--primary)]/30 whitespace-nowrap"
                >
                  Send Report
                </button>
              </form>
              <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)]">Or</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                >
                  Book a Demo
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
