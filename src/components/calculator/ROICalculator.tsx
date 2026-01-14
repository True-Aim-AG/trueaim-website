"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: "25000",
    handlingTime: 45,
    hourlyRate: 65,
    automationLevel: "none",
  });

  const results = useMemo(() => {
    const volume = volumeOptions.find(v => v.value === inputs.claimsVolume)?.claims || 25000;
    const automationFactor = automationOptions.find(a => a.value === inputs.automationLevel)?.factor || 0.85;

    // Current state calculations
    const hoursPerClaim = inputs.handlingTime / 60;
    const totalHoursPerYear = volume * hoursPerClaim;
    const currentAnnualCost = totalHoursPerYear * inputs.hourlyRate;

    // With TrueAim (assuming 89% faster processing, 68% cost reduction potential)
    const trueAimEfficiency = automationFactor; // How much we can automate
    const automatedClaims = volume * trueAimEfficiency;
    const manualClaims = volume - automatedClaims;

    // Automated claims: 2 seconds average (essentially ~0 handling time for calculation)
    // Manual claims: still need human review but faster with pre-processed data
    const automatedHours = automatedClaims * 0.01; // 36 seconds per automated claim for review
    const manualHours = manualClaims * hoursPerClaim * 0.5; // 50% faster even for manual

    const trueAimTotalHours = automatedHours + manualHours;
    const trueAimAnnualCost = trueAimTotalHours * inputs.hourlyRate;

    // Platform cost estimate (simplified)
    const platformCost = volume * 0.50; // ~$0.50 per claim processing fee estimate

    const projectedAnnualCost = trueAimAnnualCost + platformCost;
    const annualSavings = currentAnnualCost - projectedAnnualCost;
    const savingsPercentage = (annualSavings / currentAnnualCost) * 100;

    // Time savings
    const hoursSaved = totalHoursPerYear - trueAimTotalHours;
    const fteEquivalent = hoursSaved / 2080; // 2080 work hours per year

    // Payback period (assuming implementation cost of ~3 months platform fees)
    const implementationCost = platformCost * 0.25;
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
