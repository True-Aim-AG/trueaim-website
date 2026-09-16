"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calculator,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  ChevronDown,
  FileText,
  Brain,
  ClipboardCheck,
} from "lucide-react";
import {
  type ROIInputs,
  calculateROI,
  AUTOMATION_OPTIONS as automationOptions,
  ASSUMPTIONS,
} from "@/lib/roi-calculations";

const ease = [0.4, 0, 0.2, 1] as const;

const currencyOptions = [
  { value: "CHF", symbol: "CHF", locale: "de-CH" },
  { value: "EUR", symbol: "EUR", locale: "de-DE" },
  { value: "USD", symbol: "USD", locale: "en-US" },
  { value: "ZAR", symbol: "ZAR", locale: "en-ZA" },
];

export function ROICalculator() {
  const t = useTranslations("impact");

  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: 50000,
    handlingTime: 45,
    automationLevel: "none",
    currency: "CHF",
  });

  const [showAssumptions, setShowAssumptions] = useState(false);

  const currencyConfig = currencyOptions.find(c => c.value === inputs.currency) || currencyOptions[0];

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const formatCurrency = (value: number) => {
    // Normalise apostrophe-style group separators (Node ICU emits U+2019, some browsers U+0027)
    // so the server-rendered and client-rendered strings match and hydration stays clean.
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.value,
      maximumFractionDigits: 0,
    }).format(value).replace(/['\u2019\u02BC]/g, '\u2019');
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Row 1: Two columns - inputs left, results+breakdown right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-pill bg-card shadow-card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-plate w-12 h-12">
              <Calculator strokeWidth={1.5} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-strong">{t("calculator.inputPanel.title")}</h3>
              <p className="text-sm text-muted">{t("calculator.inputPanel.subtitle")}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Currency Selector */}
            <div>
              <label className="block text-sm font-medium text-strong mb-2">{t("calculator.inputPanel.currency")}</label>
              <div className="flex gap-2">
                {currencyOptions.map((curr) => (
                  <button
                    key={curr.value}
                    onClick={() => setInputs(prev => ({ ...prev, currency: curr.value }))}
                    className={`px-3 py-1.5 rounded-pill text-sm font-medium transition-colors duration-150 ease-brand ${
                      inputs.currency === curr.value
                        ? 'bg-accent text-on-brand'
                        : 'bg-surface-muted text-muted hover:text-strong'
                    }`}
                  >
                    {curr.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Claims Volume */}
            <div>
              <label className="block text-sm font-medium text-strong mb-2">
                {t("calculator.inputPanel.claimsVolume")} <span className="text-accent">{formatNumber(inputs.claimsVolume)} {t("calculator.inputPanel.claimsVolumeUnit")}</span>
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={inputs.claimsVolume}
                onChange={(e) => setInputs(prev => ({ ...prev, claimsVolume: parseInt(e.target.value) }))}
                className="w-full h-2 rounded-pill bg-surface-muted appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>10,000</span>
                <span>1,000,000</span>
              </div>
            </div>

            {/* Handling Time */}
            <div>
              <label className="block text-sm font-medium text-strong mb-2">
                {t("calculator.inputPanel.handlingTime")} <span className="text-accent">{inputs.handlingTime} {t("calculator.inputPanel.handlingTimeUnit")}</span>
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={inputs.handlingTime}
                onChange={(e) => setInputs(prev => ({ ...prev, handlingTime: parseInt(e.target.value) }))}
                className="w-full h-2 rounded-pill bg-surface-muted appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>5 min</span>
                <span>180 min</span>
              </div>
              <p className="text-xs text-muted mt-1">{t("calculator.inputPanel.handlingTimeHint")}</p>
            </div>

            {/* Automation Level */}
            <div>
              <label className="block text-sm font-medium text-strong mb-2">
                {t("calculator.inputPanel.automationLevel")}
              </label>
              <div className="space-y-2">
                {automationOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-pill cursor-pointer transition-colors duration-150 ease-brand ${
                      inputs.automationLevel === option.value
                        ? 'bg-accent-soft'
                        : 'bg-surface-muted hover:bg-line'
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
                        ? 'border-accent'
                        : 'border-line-strong'
                    }`}>
                      {inputs.automationLevel === option.value && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <span className="text-sm text-strong">{option.label}</span>
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
          <div className="rounded-pill bg-card shadow-card p-8">
            <div className="flex items-center gap-2 mb-1 text-muted">
              <TrendingUp strokeWidth={1.5} className="w-5 h-5" />
              <span className="text-sm font-medium">{t("calculator.results.mainImpact.label")}</span>
            </div>
            <p className="text-xs text-subtle mb-4">{t("calculator.results.mainImpact.sublabel")}</p>
            <div className="text-kpi-lg text-accent mb-2">
              {formatCurrency(results.grossAnnualImpact)}
            </div>
            <div className="text-body">
              {results.savingsPercentage.toFixed(0)}{t("calculator.results.mainImpact.reductionSuffix")}
            </div>
          </div>

          {/* 2-Bucket Breakdown */}
          <div className="space-y-3">
            <h4 className="text-caption-sm text-subtle">{t("calculator.results.breakdown.heading")}</h4>

            {/* Capacity unlocked */}
            <div className="rounded-pill bg-card shadow-card p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Brain strokeWidth={1.5} className="w-4 h-4 text-muted" />
                  <span className="text-sm font-medium text-strong">{t("calculator.results.breakdown.capacity.title")}</span>
                </div>
                <span className="text-sm font-semibold text-strong">
                  {formatCurrency(results.buckets.capacityGross * ASSUMPTIONS.sensitivityAdjustment)}
                </span>
              </div>
              <p className="text-xs text-muted">{t("calculator.results.breakdown.capacity.description")}</p>
            </div>

            {/* Rework avoided */}
            <div className="rounded-pill bg-card shadow-card p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ClipboardCheck strokeWidth={1.5} className="w-4 h-4 text-muted" />
                  <span className="text-sm font-medium text-strong">{t("calculator.results.breakdown.rework.title")}</span>
                </div>
                <span className="text-sm font-semibold text-strong">
                  {formatCurrency(results.buckets.reworkGross * ASSUMPTIONS.sensitivityAdjustment)}
                </span>
              </div>
              <p className="text-xs text-muted">{t("calculator.results.breakdown.rework.description")}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-pill bg-card shadow-card p-6">
              <Clock strokeWidth={1.5} className="w-5 h-5 text-accent mb-2" />
              <div className="text-kpi text-strong">
                {formatNumber(results.workingDaysSaved)}
              </div>
              <div className="text-sm text-muted">{t("calculator.results.metrics.workingDaysSaved")}</div>
            </div>
            <div className="rounded-pill bg-card shadow-card p-6">
              <Users strokeWidth={1.5} className="w-5 h-5 text-accent mb-2" />
              <div className="text-kpi text-strong">
                {results.fteEquivalent.toFixed(1)}
              </div>
              <div className="text-sm text-muted">{t("calculator.results.metrics.fteEquivalent")}</div>
              <p className="text-xs text-muted mt-1">{t("calculator.results.metrics.fteNote")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Full-width "Your Numbers Breakdown" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-pill bg-card shadow-card p-6"
      >
        <h4 className="text-sm font-semibold text-strong mb-4">{t("calculator.results.assumptions.breakdownTitle")}</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-hairline">
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.annualVolume")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatNumber(results.volume)}</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.automatedClaims")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatNumber(results.details.automatedClaims)} ({results.details.automationRate.toFixed(0)}%)</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.manualClaims")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatNumber(results.details.manualClaims)} ({(100 - results.details.automationRate).toFixed(0)}%)</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.capacityGross")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatCurrency(results.buckets.capacityGross)}</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.reworkGross")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatCurrency(results.buckets.reworkGross)}</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">{t("calculator.results.assumptions.breakdownRows.sensitivityAdjustment")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">-{formatCurrency(results.buckets.grossTotal * 0.25)}</td>
              </tr>
              <tr className="font-semibold">
                <td className="py-2 text-strong">{t("calculator.results.assumptions.breakdownRows.grossAnnualImpact")}</td>
                <td className="py-2 text-strong text-right font-display font-semibold tabular-nums">{formatCurrency(results.grossAnnualImpact)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Row 3: Full-width collapsible "Methodology and Assumptions" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-pill bg-card shadow-card overflow-hidden"
      >
        <button
          onClick={() => setShowAssumptions(prev => !prev)}
          className="w-full flex items-center justify-between p-4 transition-colors duration-150 ease-brand hover:bg-surface-muted"
        >
          <div className="flex items-center gap-3">
            <FileText strokeWidth={1.5} className="w-5 h-5 text-accent" />
            <span className="font-medium text-strong">{t("calculator.results.assumptions.toggle")}</span>
          </div>
          <ChevronDown
            strokeWidth={1.5}
            className={`w-5 h-5 text-muted transition-transform duration-300 ease-brand ${
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
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-6 border-t border-hairline">
                {/* How We Calculate */}
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-strong mb-3">{t("calculator.results.assumptions.howWeCalculate")}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-pill bg-surface-muted">
                      <p className="text-muted mb-2">
                        <span className="text-strong font-medium">{t("calculator.results.assumptions.currentHandlingCost")}</span> {t("calculator.results.assumptions.currentHandlingCostFormula")}
                      </p>
                      <p className="text-xs font-display font-semibold tabular-nums text-accent">
                        {inputs.handlingTime} min x {currencyConfig.symbol} {results.details.costPerMinute.toFixed(2)}/min x {formatNumber(results.volume)} = {formatCurrency(results.currentAnnualCost)}
                      </p>
                    </div>

                    <div className="p-3 rounded-pill bg-surface-muted">
                      <p className="text-muted mb-2">
                        <span className="text-strong font-medium">{t("calculator.results.assumptions.reworkAvoided")}</span> {t("calculator.results.assumptions.reworkAvoidedFormula")}
                      </p>
                      <p className="text-xs font-display font-semibold tabular-nums text-accent">
                        {formatNumber(results.details.reworkClaimsAvoided)} x {(results.details.hoursPerClaim * 60).toFixed(0)} min x {ASSUMPTIONS.reworkCostMultiplier}x x {currencyConfig.symbol} {results.details.costPerMinute.toFixed(2)}/min = {formatCurrency(results.buckets.reworkGross)}
                      </p>
                    </div>

                    <div className="p-3 rounded-pill bg-surface-muted">
                      <p className="text-muted mb-2">
                        <span className="text-strong font-medium">{t("calculator.results.assumptions.grossSavings")}</span> {t("calculator.results.assumptions.grossSavingsFormula")}
                      </p>
                      <p className="text-xs font-display font-semibold tabular-nums text-accent">
                        {formatCurrency(results.buckets.capacityGross)} + {formatCurrency(results.buckets.reworkGross)} = {formatCurrency(results.buckets.grossTotal)}
                      </p>
                    </div>

                    <div className="p-3 rounded-pill bg-surface-muted">
                      <p className="text-muted mb-2">
                        <span className="text-strong font-medium">{t("calculator.results.assumptions.workingDaysFormula")}</span>
                      </p>
                      <p className="text-xs font-display font-semibold tabular-nums text-accent">
                        {formatNumber(results.hoursSaved)} hrs / 10 = {formatNumber(results.workingDaysSaved)} {t("calculator.results.assumptions.workingDaysUnit")}
                      </p>
                    </div>

                    <div className="p-3 rounded-pill bg-surface-muted">
                      <p className="text-muted mb-2">
                        <span className="text-strong font-medium">{t("calculator.results.assumptions.conservativeEstimate")}</span> {t("calculator.results.assumptions.conservativeEstimateFormula")}
                      </p>
                      <p className="text-xs font-display font-semibold tabular-nums text-accent">
                        {formatCurrency(results.buckets.grossTotal)} x 0.75 = {formatCurrency(results.grossAnnualImpact)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Assumptions */}
                <div>
                  <h4 className="text-sm font-semibold text-strong mb-3">{t("calculator.results.assumptions.keyAssumptions")}</h4>
                  <ul className="space-y-2 text-xs text-muted">
                    <li className="flex items-start gap-2">
                      <CheckCircle strokeWidth={1.5} className="w-3 h-3 text-approved-base flex-shrink-0 mt-0.5" />
                      {t("calculator.results.assumptions.assumption1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle strokeWidth={1.5} className="w-3 h-3 text-approved-base flex-shrink-0 mt-0.5" />
                      {t("calculator.results.assumptions.assumption2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle strokeWidth={1.5} className="w-3 h-3 text-approved-base flex-shrink-0 mt-0.5" />
                      {t("calculator.results.assumptions.assumption3")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle strokeWidth={1.5} className="w-3 h-3 text-approved-base flex-shrink-0 mt-0.5" />
                      {t("calculator.results.assumptions.assumption4")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle strokeWidth={1.5} className="w-3 h-3 text-approved-base flex-shrink-0 mt-0.5" />
                      {t("calculator.results.assumptions.assumption5")}
                    </li>
                  </ul>
                </div>

                {/* Important Notes */}
                <div className="p-3 rounded-pill bg-surface-muted">
                  <h4 className="text-sm font-semibold text-strong mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-referred-base" />
                    {t("calculator.results.assumptions.importantNotes")}
                  </h4>
                  <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                    <li>{t("calculator.results.assumptions.note1")}</li>
                    <li>{t("calculator.results.assumptions.note2")}</li>
                    <li>{t("calculator.results.assumptions.note3")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
