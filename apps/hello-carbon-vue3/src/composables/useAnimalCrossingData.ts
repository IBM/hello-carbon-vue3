import { createFetch } from "@vueuse/core";

// Centralized base URL for Animal Crossing data
export const BASE_URL =
  "https://s3.us-east.cloud-object-storage.appdomain.cloud/archaeopteryx-eusthenopteron/v2";

function _buildUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${BASE_URL}${path}`;
}

// Simple in-memory cache with TTL
const _cache = new Map<string, { data?: any; promise?: Promise<any>; expiresAt: number }>();

function _cacheKey(url: string, options: { method?: string; params?: any } = {}) {
  const { method = "GET", params } = options;
  const p = params ? JSON.stringify(params) : "";
  return `${method}:${url}:${p}`;
}

/**
 * Create a VueUse fetch instance with defaults
 */
export const useAnimalCrossingData = createFetch({
  options: {
    timeout: 15000,
    async beforeFetch({ url, options }) {
      return { url, options };
    },
    async onFetchError(ctx) {
      return ctx;
    },
  },
});

/**
 * Basic retry with backoff
 */
async function _withRetry<T>(fn: () => Promise<T>, { retries = 2, baseDelay = 300 } = {}): Promise<T> {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (e) {
      if (attempt >= retries) throw e;
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, delay));
      attempt++;
    }
  }
}

/**
 * Fetch JSON with simple in-memory TTL caching.
 */
export async function fetchJsonCached(
  path: string,
  opts: { ttlMs?: number; params?: any; cacheKey?: string; retries?: number } = {},
) {
  const { ttlMs = 5 * 60 * 1000, params, cacheKey, retries = 2 } = opts;
  const url = _buildUrl(path);
  const key = cacheKey || _cacheKey(url, { method: "GET", params });
  const now = Date.now();

  const entry = _cache.get(key);
  if (entry && entry.expiresAt > now && "data" in entry) {
    return entry.data;
  }
  if (entry && entry.promise) {
    return entry.promise;
  }

  const run = async () => {
    const { data, error } = await useAnimalCrossingData(url).get().json();
    if (error.value) throw error.value;
    return data.value;
  };

  const promise = _withRetry(run, { retries });
  _cache.set(key, { promise, expiresAt: now + ttlMs });

  try {
    const data = await promise;
    _cache.set(key, { data, expiresAt: now + ttlMs });
    return data;
  } catch (e) {
    _cache.delete(key);
    throw e;
  }
}

/**
 * Optional helper to invalidate cache entries.
 */
export function invalidateCache(prefix = "") {
  const keys = Array.from(_cache.keys());
  for (const k of keys) if (!prefix || k.startsWith(prefix)) _cache.delete(k);
}