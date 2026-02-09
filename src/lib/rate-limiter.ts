/**
 * In-memory IP-based rate limiter.
 * Tracks timestamps per key within a sliding window.
 */

export interface RateLimiterOptions {
  windowMs: number;
  max: number;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const log = new Map<string, number[]>();

  function isRateLimited(key: string, now = Date.now()): boolean {
    const timestamps = log.get(key) || [];
    const recent = timestamps.filter((t) => now - t < options.windowMs);
    log.set(key, recent);
    if (recent.length >= options.max) return true;
    recent.push(now);
    log.set(key, recent);
    return false;
  }

  function reset() {
    log.clear();
  }

  return { isRateLimited, reset };
}

// Default instance used by the contact API route
export const contactRateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 5,
});
