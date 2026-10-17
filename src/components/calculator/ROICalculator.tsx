"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";
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

const LABEL = "block text-sm font-medium text-strong";
const FIGURE = "font-display font-semibold text-strong tabular-nums";
const RANGE = "mt-3 h-2 w-full cursor-pointer appearance-none rounded-pill bg-surface-muted";
const SCALE = "mt-1.5 flex justify-between text-xs text-muted";
const FORMULA = "rounded-[8px] bg-surface-muted p-4";
const FORMULA_LIVE = "mt-2 font-display text-sm font-semibold text-accent tabular-nums";

/**
 * The Impact Estimator as the prototype draws it: the inputs card on the
 * left, the result on the right, the breakdown table under both and the
 * methodology in a drop-down. The arithmetic lives in lib/roi-calculations.
 */
export function ROICalculator() {
  const t = useTranslations("impact");

  const [inputs, setInputs] = useState<ROIInputs>({
    claimsVolume: 50000,
    handlingTime: 45,
    automationLevel: "none",
    currency: "CHF",
  });

  const currencyConfig = currencyOptions.find((c) => c.value === inputs.currency) || currencyOptions[0];

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const formatCurrency = (value: number) => {
    // Normalise apostrophe-style group separators (Node ICU emits U+2019, some browsers U+0027)
    // so the server-rendered and client-rendered strings match and hydration stays clean.
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: "currency",
      currency: currencyConfig.value,
      maximumFractionDigits: 0,
    }).format(value).replace(/['’ʼ]/g, "’");
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
  };

  const breakdownRows: [string, string][] = [
    [t("calculator.results.assumptions.breakdownRows.annualVolume"), formatNumber(results.volume)],
    [t("calculator.results.assumptions.breakdownRows.automatedClaims"), `${formatNumber(results.details.automatedClaims)} (${results.details.automationRate.toFixed(0)}%)`],
    [t("calculator.results.assumptions.breakdownRows.manualClaims"), `${formatNumber(results.details.manualClaims)} (${(100 - results.details.automationRate).toFixed(0)}%)`],
    [t("calculator.results.assumptions.breakdownRows.capacityGross"), formatCurrency(results.buckets.capacityGross)],
    [t("calculator.results.assumptions.breakdownRows.reworkGross"), formatCurrency(results.buckets.reworkGross)],
    [t("calculator.results.assumptions.breakdownRows.sensitivityAdjustment"), `-${formatCurrency(results.buckets.grossTotal * 0.25)}`],
    [t("calculator.results.assumptions.breakdownRows.grossAnnualImpact"), formatCurrency(results.grossAnnualImpact)],
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className={cn(CARD, "p-8 md:p-10")}>
          <h2 className="font-display text-[22px] font-semibold leading-[1.3] text-strong">{t("calculator.inputPanel.title")}</h2>
          <p className="mt-1.5 text-sm text-muted">{t("calculator.inputPanel.subtitle")}</p>

          <div className="mt-7 space-y-7">
            <div>
              <span className={LABEL}>{t("calculator.inputPanel.currency")}</span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {currencyOptions.map((currency) => (
                  <button
                    key={currency.value}
                    type="button"
                    onClick={() => setInputs((prev) => ({ ...prev, currency: currency.value }))}
                    className={cn(
                      "rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-150 ease-brand",
                      inputs.currency === currency.value ? "bg-accent text-on-brand" : "bg-surface-muted text-muted hover:text-strong",
                    )}
                  >
                    {currency.value}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="estimator-volume" className={LABEL}>
                {t("calculator.inputPanel.claimsVolume")}{" "}
                <b className="font-semibold text-accent">
                  {formatNumber(inputs.claimsVolume)} {t("calculator.inputPanel.claimsVolumeUnit")}
                </b>
              </label>
              <input
                id="estimator-volume"
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={inputs.claimsVolume}
                onChange={(e) => setInputs((prev) => ({ ...prev, claimsVolume: parseInt(e.target.value) }))}
                className={RANGE}
              />
              <div className={SCALE}>
                <span>{t("calculator.inputPanel.rangeMin.claims")}</span>
                <span>{t("calculator.inputPanel.rangeMin.claimsMax")}</span>
              </div>
            </div>

            <div>
              <label htmlFor="estimator-time" className={LABEL}>
                {t("calculator.inputPanel.handlingTime")}{" "}
                <b className="font-semibold text-accent">
                  {inputs.handlingTime} {t("calculator.inputPanel.handlingTimeUnit")}
                </b>
              </label>
              <input
                id="estimator-time"
                type="range"
                min="5"
                max="180"
                step="5"
                value={inputs.handlingTime}
                onChange={(e) => setInputs((prev) => ({ ...prev, handlingTime: parseInt(e.target.value) }))}
                className={RANGE}
              />
              <div className={SCALE}>
                <span>{t("calculator.inputPanel.rangeMin.timeMin")}</span>
                <span>{t("calculator.inputPanel.rangeMin.timeMax")}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{t("calculator.inputPanel.handlingTimeHint")}</p>
            </div>

            <div>
              <span className={LABEL}>{t("calculator.inputPanel.automationLevel")}</span>
              <div className="mt-2.5 space-y-2">
                {automationOptions.map((option) => {
                  const selected = inputs.automationLevel === option.value;
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[8px] px-4 py-3 transition-colors duration-150 ease-brand",
                        selected ? "bg-accent-soft" : "bg-surface-muted hover:bg-line",
                      )}
                    >
                      <input
                        type="radio"
                        name="automationLevel"
                        value={option.value}
                        checked={selected}
                        onChange={(e) => setInputs((prev) => ({ ...prev, automationLevel: e.target.value }))}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn("grid h-4 w-4 place-items-center rounded-full border-2", selected ? "border-accent" : "border-line-strong")}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-accent" />}
                      </span>
                      <span className="text-sm text-strong">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-5">
          <div className={cn(CARD, "p-8")}>
            <p className={LABEL}>{t("calculator.results.mainImpact.label")}</p>
            <p className={cn(FIGURE, "mt-3 text-[44px] leading-none text-accent md:text-[56px]")}>{formatCurrency(results.grossAnnualImpact)}</p>
            <p className="mt-3 text-body">
              <span className="font-semibold text-strong">{results.savingsPercentage.toFixed(0)}</span>
              {t("calculator.results.mainImpact.reductionSuffix")}
            </p>
            <p className="mt-2.5 text-sm text-muted">{t("calculator.results.mainImpact.sublabel")}</p>
          </div>

          <div className={cn(CARD, "divide-y divide-hairline px-8")}>
            {(
              [
                ["capacity", results.buckets.capacityGross],
                ["rework", results.buckets.reworkGross],
              ] as const
            ).map(([key, gross]) => (
              <div key={key} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-strong">{t(`calculator.results.breakdown.${key}.title`)}</span>
                  <b className={cn(FIGURE, "text-[20px]")}>{formatCurrency(gross * ASSUMPTIONS.sensitivityAdjustment)}</b>
                </div>
                <p className="mt-1 text-sm text-muted">{t(`calculator.results.breakdown.${key}.description`)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className={cn(CARD, "p-6")}>
              <p className={cn(FIGURE, "text-[34px] leading-[1.05]")}>{formatNumber(results.workingDaysSaved)}</p>
              <p className="mt-1.5 text-sm text-muted">{t("calculator.results.metrics.workingDaysSaved")}</p>
            </div>
            <div className={cn(CARD, "p-6")}>
              <p className={cn(FIGURE, "text-[34px] leading-[1.05]")}>{results.fteEquivalent.toFixed(1)}</p>
              <p className="mt-1.5 text-sm text-muted">{t("calculator.results.metrics.fteEquivalent")}</p>
            </div>
          </div>
          <p className="text-sm text-muted">{t("calculator.results.metrics.fteNote")}</p>
        </div>
      </div>

      {/* The breakdown */}
      <div className={cn(CARD, "px-8 py-6")}>
        <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-subtle">{t("calculator.results.assumptions.breakdownTitle")}</p>
        <table className="w-full text-sm">
          <tbody>
            {breakdownRows.map(([label, value], index) => {
              const last = index === breakdownRows.length - 1;
              return (
                <tr key={label} className={cn(!last && "border-b border-hairline")}>
                  <td className={cn("py-2.5 pr-4", last ? "font-semibold text-strong" : "text-body")}>{label}</td>
                  <td className={cn(FIGURE, "whitespace-nowrap py-2.5 text-right")}>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Methodology and assumptions */}
      <details className={cn(CARD, "group")}>
        <summary className="flex cursor-pointer list-none items-center gap-4 px-8 py-[18px] text-base font-medium text-strong [&::-webkit-details-marker]:hidden">
          {t("calculator.results.assumptions.toggle")}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-ta-neutral-400 transition-transform duration-150 ease-brand group-open:rotate-180" strokeWidth={1.5} />
        </summary>
        <div className="space-y-6 border-t border-hairline px-8 pb-7 pt-6 text-[15px] leading-[1.6] text-body">
          <div>
            <h3 className="font-display text-[15px] font-semibold text-strong">{t("calculator.results.assumptions.howWeCalculate")}</h3>
            <div className="mt-3 space-y-3 text-sm">
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.currentHandlingCost")}</span>{" "}
                  {t("calculator.results.assumptions.currentHandlingCostFormula")}
                </p>
                <p className={FORMULA_LIVE}>
                  {inputs.handlingTime} min x {currencyConfig.symbol} {results.details.costPerMinute.toFixed(2)}/min x {formatNumber(results.volume)} = {formatCurrency(results.currentAnnualCost)}
                </p>
              </div>
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.capacityUnlocked")}</span>{" "}
                  {t("calculator.results.assumptions.capacityUnlockedFormula")}
                </p>
                <p className={FORMULA_LIVE}>
                  {formatCurrency(results.currentAnnualCost)} - {formatCurrency(results.details.trueAimAnnualCost)} = {formatCurrency(results.buckets.capacityGross)}
                </p>
              </div>
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.reworkAvoided")}</span>{" "}
                  {t("calculator.results.assumptions.reworkAvoidedFormula")}
                </p>
                <p className={FORMULA_LIVE}>
                  {formatNumber(results.details.reworkClaimsAvoided)} x {(results.details.hoursPerClaim * 60).toFixed(0)} min x {ASSUMPTIONS.reworkCostMultiplier}x x {currencyConfig.symbol} {results.details.costPerMinute.toFixed(2)}/min = {formatCurrency(results.buckets.reworkGross)}
                </p>
              </div>
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.grossSavings")}</span>{" "}
                  {t("calculator.results.assumptions.grossSavingsFormula")}
                </p>
                <p className={FORMULA_LIVE}>
                  {formatCurrency(results.buckets.capacityGross)} + {formatCurrency(results.buckets.reworkGross)} = {formatCurrency(results.buckets.grossTotal)}
                </p>
              </div>
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.workingDaysFormula")}</span>
                </p>
                <p className={FORMULA_LIVE}>
                  {formatNumber(results.hoursSaved)} hrs / 10 = {formatNumber(results.workingDaysSaved)} {t("calculator.results.assumptions.workingDaysUnit")}
                </p>
              </div>
              <div className={FORMULA}>
                <p className="text-muted">
                  <span className="font-medium text-strong">{t("calculator.results.assumptions.conservativeEstimate")}</span>{" "}
                  {t("calculator.results.assumptions.conservativeEstimateFormula")}
                </p>
                <p className={FORMULA_LIVE}>
                  {formatCurrency(results.buckets.grossTotal)} x 0.75 = {formatCurrency(results.grossAnnualImpact)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-[15px] font-semibold text-strong">{t("calculator.results.assumptions.keyAssumptions")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {(["assumption1", "assumption2", "assumption3", "assumption4", "assumption5"] as const).map((key) => (
                <li key={key}>{t(`calculator.results.assumptions.${key}`)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[15px] font-semibold text-strong">{t("calculator.results.assumptions.importantNotes")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {(["note1", "note2", "note3"] as const).map((key) => (
                <li key={key}>{t(`calculator.results.assumptions.${key}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
