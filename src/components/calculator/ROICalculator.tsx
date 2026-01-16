"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Info,
  ChevronDown,
  FileText,
} from "lucide-react";

interface ROIInputs {
  claimsVolume: string;
  handlingTime: number;
  hourlyRate: number;
  automationLevel: string;
}

const volumeOptions = [
  { value: "5000", label: "< 10,000", claims: 5000 },
  { value: "25000", label: "10,000 - 50,000", claims: 25000 },
  { value: "75000", label: "50,000 - 100,000", claims: 75000 },
  { value: "250000", label: "100,000 - 500,000", claims: 250000 },
  { value: "750000", label: "500,000+", claims: 750000 },
];

const automationOptions = [
  { value: "none", label: "None", factor: 0.85 },
  { value: "some", label: "Some automation", factor: 0.70 },
  { value: "significant", label: "Significant automation", factor: 0.50 },
];

// Constants for assumptions (displayed to users)
const ASSUMPTIONS = {
  automatedClaimReviewTime: 0.01, // hours (36 seconds) - time to review automated decision
  manualClaimSpeedup: 0.5, // 50% faster processing for remaining manual claims
  platformCostPerClaim: 0.50, // CHF per claim
  implementationCostFactor: 0.25, // 3 months of platform fees
  workHoursPerYear: 2080, // Standard work hours per FTE
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: "25000",
    handlingTime: 45,
    hourlyRate: 65,
    automationLevel: "none",
  });

  const [showAssumptions, setShowAssumptions] = useState(false);

  const results = useMemo(() => {
    const volume = volumeOptions.find(v => v.value === inputs.claimsVolume)?.claims || 25000;
    const automationFactor = automationOptions.find(a => a.value === inputs.automationLevel)?.factor || 0.85;

    // Current state calculations
    const hoursPerClaim = inputs.handlingTime / 60;
    const totalHoursPerYear = volume * hoursPerClaim;
    const currentAnnualCost = totalHoursPerYear * inputs.hourlyRate;

    // With TrueAim: automation potential depends on current automation level
    const trueAimEfficiency = automationFactor; // Percentage of claims that can be automated
    const automatedClaims = volume * trueAimEfficiency;
    const manualClaims = volume - automatedClaims;

    // Automated claims: require brief human review of AI decision (36 seconds average)
    // Manual claims: still need human review but 50% faster with pre-processed data from ContextBuilder
    const automatedHours = automatedClaims * ASSUMPTIONS.automatedClaimReviewTime;
    const manualHours = manualClaims * hoursPerClaim * ASSUMPTIONS.manualClaimSpeedup;

    const trueAimTotalHours = automatedHours + manualHours;
    const trueAimAnnualCost = trueAimTotalHours * inputs.hourlyRate;

    // Platform cost estimate
    const platformCost = volume * ASSUMPTIONS.platformCostPerClaim;

    const projectedAnnualCost = trueAimAnnualCost + platformCost;
    const annualSavings = currentAnnualCost - projectedAnnualCost;
    const savingsPercentage = (annualSavings / currentAnnualCost) * 100;

    // Time savings
    const hoursSaved = totalHoursPerYear - trueAimTotalHours;
    const fteEquivalent = hoursSaved / ASSUMPTIONS.workHoursPerYear;

    // Payback period (implementation cost estimated at 3 months of platform fees)
    const implementationCost = platformCost * ASSUMPTIONS.implementationCostFactor;
    const monthlyNetSavings = annualSavings / 12;
    const paybackMonths = monthlyNetSavings > 0 ? Math.ceil(implementationCost / monthlyNetSavings) : 0;

    return {
      currentAnnualCost,
      projectedAnnualCost,
      annualSavings,
      savingsPercentage,
      hoursSaved,
      fteEquivalent,
      paybackMonths,
      volume,
      // Detailed breakdown for assumptions display
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
      },
    };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CHF',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);
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

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Average Handler Cost (CHF/hour)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">CHF</span>
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
              Current Automation Level
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
        {/* Main Savings Card */}
        <div className="bg-gradient-to-br from-[var(--primary)] to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium text-white/80">Projected Annual Savings</span>
          </div>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {formatCurrency(results.annualSavings)}
          </div>
          <div className="text-white/80">
            {results.savingsPercentage.toFixed(0)}% reduction in claims handling costs
          </div>
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
            <div className="text-sm text-[var(--text-muted)]">FTE equivalent</div>
          </div>
          <div className="glass-panel p-6">
            <DollarSign className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-white font-mono-data">
              {formatCurrency(results.currentAnnualCost)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">Current annual cost</div>
          </div>
          <div className="glass-panel p-6">
            <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-white font-mono-data">
              {results.paybackMonths < 12 ? `${results.paybackMonths} mo` : '< 1 yr'}
            </div>
            <div className="text-sm text-[var(--text-muted)]">Payback period</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-4 bg-white/5 rounded-lg border border-[var(--border)]">
          <Info className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-muted)]">
            Estimates based on typical automation rates. Actual results vary based on claim complexity, policy types, and implementation scope. Contact us for a detailed assessment.
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
                    <h4 className="text-sm font-semibold text-white mb-3">How We Calculate Your Savings</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[var(--text-muted)] mb-2">
                          <span className="text-white font-medium">Current Annual Cost</span> = Claims Volume × Handling Time × Hourly Rate
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {formatNumber(results.volume)} claims × {results.details.hoursPerClaim.toFixed(2)} hrs × CHF {inputs.hourlyRate} = {formatCurrency(results.currentAnnualCost)}
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[var(--text-muted)] mb-2">
                          <span className="text-white font-medium">With TrueAim</span> = (Automated Claims × Review Time + Manual Claims × Reduced Time) × Hourly Rate + Platform Cost
                        </p>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          ({formatNumber(results.details.automatedClaims)} × 0.01 hrs + {formatNumber(results.details.manualClaims)} × {(results.details.hoursPerClaim * 0.5).toFixed(2)} hrs) × CHF {inputs.hourlyRate} + {formatCurrency(results.details.platformCost)} = {formatCurrency(results.projectedAnnualCost)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Assumptions */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Key Assumptions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-[var(--text-muted)]">Automation Rate</span>
                          <span className="text-sm font-semibold text-white">{results.details.automationRate.toFixed(0)}%</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          Based on your current automation level. Organizations with no automation see higher potential (85%). Those with existing automation see 50-70%.
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-[var(--text-muted)]">Automated Claim Review</span>
                          <span className="text-sm font-semibold text-white">36 seconds</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          Time for a handler to review and approve an automated decision. MIRA processes in &lt;3 seconds; human review adds ~30 seconds.
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-[var(--text-muted)]">Manual Claim Speedup</span>
                          <span className="text-sm font-semibold text-white">50% faster</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          Claims that cannot be fully automated are still processed faster because ContextBuilder pre-extracts and structures all relevant data.
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-[var(--text-muted)]">Platform Cost</span>
                          <span className="text-sm font-semibold text-white">CHF 0.50/claim</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          Estimated per-claim processing fee. Actual pricing depends on volume tiers and specific requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Your Numbers Breakdown */}
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
                            <td className="py-2 text-[var(--text-muted)]">Current processing hours/year</td>
                            <td className="py-2 text-white text-right font-mono">{formatNumber(results.details.totalHoursPerYear)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Processing hours with TrueAim</td>
                            <td className="py-2 text-white text-right font-mono">{formatNumber(results.details.trueAimTotalHours)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Labor cost savings</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.currentAnnualCost - results.details.trueAimAnnualCost)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[var(--text-muted)]">Platform cost (annual)</td>
                            <td className="py-2 text-white text-right font-mono">{formatCurrency(results.details.platformCost)}</td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="py-2 text-white">Net annual savings</td>
                            <td className="py-2 text-emerald-400 text-right font-mono">{formatCurrency(results.annualSavings)}</td>
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

        {/* CTA */}
        <div className="glass-panel p-6">
          <h4 className="font-semibold text-white mb-2">
            Want a detailed analysis for your operation?
          </h4>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Our team can review your specific claims data and provide a customized ROI projection.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-[var(--primary)]/30"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
