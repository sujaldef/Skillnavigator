/**
 * Simple API caching utility to reduce redundant API calls
 * Cache is cleared on page reload (memory-based)
 */

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedFetch = async (url, options = {}) => {
  const cacheKey = url + JSON.stringify(options);

  // Check if data is in cache and still valid
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log(`[Cache Hit] ${url}`);
      return data;
    } else {
      cache.delete(cacheKey);
    }
  }

  // Fetch new data
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Store in cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    console.log(`[Cache Miss] ${url}`);
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
};

export const clearCache = (url) => {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
};
