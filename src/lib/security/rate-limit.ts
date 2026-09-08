/**
 * In-memory sliding window rate limiter for Next.js API route handlers.
 * Protects form submission endpoints from spam abuse.
 */

interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.firstRequestTime > 15 * 60 * 1000) {
        rateLimitStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitOptions {
  /** Time window in milliseconds (default: 60,000ms = 1 minute) */
  windowMs?: number;
  /** Max allowed requests per window (default: 5) */
  maxRequests?: number;
}

/**
 * Checks if an IP or identifier has exceeded the rate limit.
 * Returns { allowed: boolean, remaining: number, resetInSeconds: number }
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 5;
  const now = Date.now();

  const record = rateLimitStore.get(identifier);

  if (!record) {
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequestTime: now,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  const elapsed = now - record.firstRequestTime;

  if (elapsed > windowMs) {
    // Window expired, reset counter
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequestTime: now,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  // Inside current window
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((windowMs - elapsed) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((windowMs - elapsed) / 1000),
  };
}

/**
 * Strips HTML tags and excessive control characters from user text input
 */
export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // remove HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // remove non-printable ASCII control chars
    .trim();
}
