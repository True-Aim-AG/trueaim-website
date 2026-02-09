import { describe, it, expect } from "vitest";
import {
  calculateROI,
  ASSUMPTIONS,
  SALARY_BENCHMARKS,
  WORKING_MINUTES_PER_YEAR,
  type ROIInputs,
} from "../roi-calculations";

const DEFAULT_INPUTS: ROIInputs = {
  claimsVolume: 50000,
  handlingTime: 45,
  claimsHandlers: 50,
  automationLevel: "none",
  currency: "CHF",
};

describe("calculateROI", () => {
  describe("basic structure", () => {
    it("returns all expected fields", () => {
      const result = calculateROI(DEFAULT_INPUTS);

      expect(result).toHaveProperty("currentAnnualCost");
      expect(result).toHaveProperty("grossAnnualImpact");
      expect(result).toHaveProperty("savingsPercentage");
      expect(result).toHaveProperty("hoursSaved");
      expect(result).toHaveProperty("fteEquivalent");
      expect(result).toHaveProperty("volume");
      expect(result).toHaveProperty("buckets");
      expect(result).toHaveProperty("details");
    });

    it("volume matches input", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.volume).toBe(50000);
    });
  });

  describe("current annual cost", () => {
    it("calculates correctly from salary benchmark", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      const costPerMinute = SALARY_BENCHMARKS.CHF / WORKING_MINUTES_PER_YEAR;
      const expected = costPerMinute * 45 * 50000;
      expect(result.currentAnnualCost).toBeCloseTo(expected, 2);
    });

    it("scales linearly with volume", () => {
      const half = calculateROI({ ...DEFAULT_INPUTS, claimsVolume: 25000 });
      const full = calculateROI({ ...DEFAULT_INPUTS, claimsVolume: 50000 });
      expect(full.currentAnnualCost).toBeCloseTo(half.currentAnnualCost * 2, 2);
    });

    it("scales linearly with handling time", () => {
      const short = calculateROI({ ...DEFAULT_INPUTS, handlingTime: 30 });
      const long = calculateROI({ ...DEFAULT_INPUTS, handlingTime: 60 });
      expect(long.currentAnnualCost).toBeCloseTo(short.currentAnnualCost * 2, 2);
    });
  });

  describe("currency handling", () => {
    it("uses correct salary benchmark for each currency", () => {
      for (const [currency, salary] of Object.entries(SALARY_BENCHMARKS)) {
        const result = calculateROI({ ...DEFAULT_INPUTS, currency });
        const costPerMinute = salary / WORKING_MINUTES_PER_YEAR;
        const expected = costPerMinute * 45 * 50000;
        expect(result.currentAnnualCost).toBeCloseTo(expected, 2);
      }
    });

    it("falls back to CHF for unknown currency", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, currency: "GBP" });
      const chfResult = calculateROI({ ...DEFAULT_INPUTS, currency: "CHF" });
      expect(result.currentAnnualCost).toBeCloseTo(chfResult.currentAnnualCost, 2);
    });
  });

  describe("automation levels", () => {
    it("'none' automates 85% of claims", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "none" });
      expect(result.details.automationRate).toBe(85);
      expect(result.details.automatedClaims).toBe(50000 * 0.85);
    });

    it("'some' automates 70% of claims", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "some" });
      expect(result.details.automationRate).toBe(70);
      expect(result.details.automatedClaims).toBe(50000 * 0.7);
    });

    it("'significant' automates 50% of claims", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "significant" });
      expect(result.details.automationRate).toBe(50);
      expect(result.details.automatedClaims).toBe(50000 * 0.5);
    });

    it("higher automation level means lower savings (already efficient)", () => {
      const none = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "none" });
      const some = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "some" });
      const significant = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "significant" });

      expect(none.grossAnnualImpact).toBeGreaterThan(some.grossAnnualImpact);
      expect(some.grossAnnualImpact).toBeGreaterThan(significant.grossAnnualImpact);
    });

    it("falls back to 85% for unknown automation level", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, automationLevel: "unknown" });
      expect(result.details.automationRate).toBe(85);
    });
  });

  describe("savings buckets", () => {
    it("capacity savings is the largest bucket", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.buckets.capacityGross).toBeGreaterThan(result.buckets.reworkGross);
      expect(result.buckets.capacityGross).toBeGreaterThan(result.buckets.leakageGross);
    });

    it("all bucket values are positive", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.buckets.capacityGross).toBeGreaterThan(0);
      expect(result.buckets.reworkGross).toBeGreaterThan(0);
      expect(result.buckets.leakageGross).toBeGreaterThan(0);
    });

    it("gross total = sum of three buckets", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      const sum =
        result.buckets.capacityGross +
        result.buckets.reworkGross +
        result.buckets.leakageGross;
      expect(result.buckets.grossTotal).toBeCloseTo(sum, 2);
    });

    it("conservative total = gross * 75%", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.buckets.conservativeTotal).toBeCloseTo(
        result.buckets.grossTotal * ASSUMPTIONS.sensitivityAdjustment,
        2
      );
    });

    it("leakage savings is independent of currency", () => {
      const chf = calculateROI({ ...DEFAULT_INPUTS, currency: "CHF" });
      const eur = calculateROI({ ...DEFAULT_INPUTS, currency: "EUR" });
      expect(chf.buckets.leakageGross).toBeCloseTo(eur.buckets.leakageGross, 2);
    });
  });

  describe("sensitivity adjustment", () => {
    it("grossAnnualImpact is 75% of gross total", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.grossAnnualImpact).toBeCloseTo(
        result.buckets.grossTotal * 0.75,
        2
      );
    });
  });

  describe("savings percentage", () => {
    it("is capped at 99%", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.savingsPercentage).toBeLessThanOrEqual(99);
    });

    it("is 0 when annual cost is 0", () => {
      const result = calculateROI({ ...DEFAULT_INPUTS, claimsVolume: 0 });
      expect(result.savingsPercentage).toBe(0);
    });

    it("is positive for normal inputs", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.savingsPercentage).toBeGreaterThan(0);
    });
  });

  describe("time and FTE savings", () => {
    it("hours saved is positive", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.hoursSaved).toBeGreaterThan(0);
    });

    it("FTE equivalent = hours saved / 2080", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.fteEquivalent).toBeCloseTo(
        result.hoursSaved / ASSUMPTIONS.workHoursPerYear,
        4
      );
    });

    it("automated claims take 0.01 hours each", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.details.automatedHours).toBeCloseTo(
        result.details.automatedClaims * ASSUMPTIONS.automatedClaimReviewTime,
        4
      );
    });

    it("manual claims take 50% of original time", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      const hoursPerClaim = DEFAULT_INPUTS.handlingTime / 60;
      expect(result.details.manualHours).toBeCloseTo(
        result.details.manualClaims * hoursPerClaim * ASSUMPTIONS.manualClaimSpeedup,
        4
      );
    });
  });

  describe("rework calculations", () => {
    it("3% of claims avoid rework", () => {
      const result = calculateROI(DEFAULT_INPUTS);
      expect(result.details.reworkClaimsAvoided).toBe(
        DEFAULT_INPUTS.claimsVolume * ASSUMPTIONS.reworkReductionRate
      );
    });
  });

  describe("determinism", () => {
    it("same inputs produce same outputs", () => {
      const a = calculateROI(DEFAULT_INPUTS);
      const b = calculateROI(DEFAULT_INPUTS);
      expect(a).toEqual(b);
    });
  });
});
