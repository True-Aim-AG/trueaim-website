/**
 * Pure ROI calculation logic extracted from ROICalculator component.
 * All formulas are deterministic and side-effect free.
 */

export interface ROIInputs {
  claimsVolume: number;
  handlingTime: number;
  claimsHandlers: number;
  automationLevel: string;
  currency: string;
}

export const AUTOMATION_OPTIONS = [
  { value: "none", label: "No current automation", factor: 0.85 },
  { value: "some", label: "Basic rules or triage in place", factor: 0.7 },
  {
    value: "significant",
    label: "Established workflow automation",
    factor: 0.5,
  },
] as const;

export const SALARY_BENCHMARKS: Record<string, number> = {
  CHF: 95000,
  EUR: 55000,
  USD: 70000,
  ZAR: 420000,
};

export const WORKING_MINUTES_PER_YEAR = 220 * 8 * 60; // 105,600

export const ASSUMPTIONS = {
  automatedClaimReviewTime: 0.01, // hours (36 seconds)
  manualClaimSpeedup: 0.5, // 50% faster for remaining manual claims
  workHoursPerYear: 2080,
  sensitivityAdjustment: 0.75, // 75% conservative factor
  reworkReductionRate: 0.03, // 3% of claims avoid rework
  reworkCostMultiplier: 2.5,
  leakageReductionRate: 0.02,
  averageClaimValue: 5000,
  leakagePercentOfClaim: 0.05,
} as const;

export interface ROIResults {
  currentAnnualCost: number;
  grossAnnualImpact: number;
  savingsPercentage: number;
  hoursSaved: number;
  fteEquivalent: number;
  volume: number;
  buckets: {
    capacityGross: number;
    reworkGross: number;
    leakageGross: number;
    grossTotal: number;
    conservativeTotal: number;
  };
  details: {
    hoursPerClaim: number;
    totalHoursPerYear: number;
    automationRate: number;
    automatedClaims: number;
    manualClaims: number;
    automatedHours: number;
    manualHours: number;
    trueAimTotalHours: number;
    trueAimAnnualCost: number;
    reworkClaimsAvoided: number;
    costPerMinute: number;
    handlingCostPerClaim: number;
  };
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const volume = inputs.claimsVolume;
  const automationFactor =
    AUTOMATION_OPTIONS.find((a) => a.value === inputs.automationLevel)
      ?.factor || 0.85;

  const salaryBenchmark =
    SALARY_BENCHMARKS[inputs.currency] || SALARY_BENCHMARKS.CHF;
  const costPerMinute = salaryBenchmark / WORKING_MINUTES_PER_YEAR;

  const hoursPerClaim = inputs.handlingTime / 60;
  const handlingCostPerClaim = costPerMinute * inputs.handlingTime;
  const totalHoursPerYear = volume * hoursPerClaim;
  const currentAnnualCost = handlingCostPerClaim * volume;

  const eligibleClaims = volume * automationFactor;

  // Bucket 1: Capacity Unlocked
  const automatedClaims = eligibleClaims;
  const manualClaims = volume - automatedClaims;
  const automatedHours =
    automatedClaims * ASSUMPTIONS.automatedClaimReviewTime;
  const manualHours = manualClaims * hoursPerClaim * ASSUMPTIONS.manualClaimSpeedup;
  const trueAimTotalHours = automatedHours + manualHours;
  const trueAimAnnualCost = trueAimTotalHours * (costPerMinute * 60);
  const capacitySavingsGross = currentAnnualCost - trueAimAnnualCost;

  // Bucket 2: Rework Avoided
  const reworkClaimsAvoided = volume * ASSUMPTIONS.reworkReductionRate;
  const reworkSavingsGross =
    reworkClaimsAvoided *
    hoursPerClaim *
    ASSUMPTIONS.reworkCostMultiplier *
    (costPerMinute * 60);

  // Bucket 3: Leakage Reduction
  const leakageSavingsGross =
    volume *
    ASSUMPTIONS.leakageReductionRate *
    ASSUMPTIONS.averageClaimValue *
    ASSUMPTIONS.leakagePercentOfClaim;

  const grossSavings =
    capacitySavingsGross + reworkSavingsGross + leakageSavingsGross;
  const conservativeSavings = grossSavings * ASSUMPTIONS.sensitivityAdjustment;
  const grossAnnualImpact = conservativeSavings;
  const savingsPercentage =
    currentAnnualCost > 0
      ? Math.min((grossAnnualImpact / currentAnnualCost) * 100, 99)
      : 0;

  const hoursSaved = totalHoursPerYear - trueAimTotalHours;
  const fteEquivalent = hoursSaved / ASSUMPTIONS.workHoursPerYear;

  return {
    currentAnnualCost,
    grossAnnualImpact,
    savingsPercentage,
    hoursSaved,
    fteEquivalent,
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
      automationRate: automationFactor * 100,
      automatedClaims,
      manualClaims,
      automatedHours,
      manualHours,
      trueAimTotalHours,
      trueAimAnnualCost,
      reworkClaimsAvoided,
      costPerMinute,
      handlingCostPerClaim,
    },
  };
}
