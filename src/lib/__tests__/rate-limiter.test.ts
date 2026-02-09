import { describe, it, expect, beforeEach } from "vitest";
import { createRateLimiter } from "../rate-limiter";

describe("createRateLimiter", () => {
  const WINDOW = 60_000;
  const MAX = 5;
  let limiter: ReturnType<typeof createRateLimiter>;

  beforeEach(() => {
    limiter = createRateLimiter({ windowMs: WINDOW, max: MAX });
  });

  it("allows requests under the limit", () => {
    for (let i = 0; i < MAX; i++) {
      expect(limiter.isRateLimited("ip1")).toBe(false);
    }
  });

  it("blocks the request that exceeds the limit", () => {
    for (let i = 0; i < MAX; i++) {
      limiter.isRateLimited("ip1");
    }
    expect(limiter.isRateLimited("ip1")).toBe(true);
  });

  it("tracks different IPs independently", () => {
    for (let i = 0; i < MAX; i++) {
      limiter.isRateLimited("ip1");
    }
    expect(limiter.isRateLimited("ip1")).toBe(true);
    expect(limiter.isRateLimited("ip2")).toBe(false);
  });

  it("allows requests again after the window expires", () => {
    const baseTime = 1000000;

    // Fill up the limit
    for (let i = 0; i < MAX; i++) {
      limiter.isRateLimited("ip1", baseTime + i);
    }
    expect(limiter.isRateLimited("ip1", baseTime + MAX)).toBe(true);

    // Advance past the window
    const afterWindow = baseTime + WINDOW + 1;
    expect(limiter.isRateLimited("ip1", afterWindow)).toBe(false);
  });

  it("sliding window only counts recent requests", () => {
    const baseTime = 1000000;

    // Make 3 requests at baseTime
    for (let i = 0; i < 3; i++) {
      limiter.isRateLimited("ip1", baseTime);
    }

    // Advance halfway through window, make 2 more
    const halfWindow = baseTime + WINDOW / 2;
    limiter.isRateLimited("ip1", halfWindow);
    limiter.isRateLimited("ip1", halfWindow);

    // At this point we have 5 requests, should be blocked
    expect(limiter.isRateLimited("ip1", halfWindow)).toBe(true);

    // After the first 3 expire, should be allowed again
    const afterFirstBatch = baseTime + WINDOW + 1;
    expect(limiter.isRateLimited("ip1", afterFirstBatch)).toBe(false);
  });

  it("reset clears all tracking data", () => {
    for (let i = 0; i < MAX; i++) {
      limiter.isRateLimited("ip1");
    }
    expect(limiter.isRateLimited("ip1")).toBe(true);

    limiter.reset();
    expect(limiter.isRateLimited("ip1")).toBe(false);
  });

  it("works with custom window and max values", () => {
    const strict = createRateLimiter({ windowMs: 1000, max: 2 });
    expect(strict.isRateLimited("ip1")).toBe(false);
    expect(strict.isRateLimited("ip1")).toBe(false);
    expect(strict.isRateLimited("ip1")).toBe(true);
  });
});
