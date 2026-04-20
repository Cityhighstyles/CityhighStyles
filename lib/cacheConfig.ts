/**
 * Cache Configuration
 * 
 * Adjust these settings to control cache behavior across the application
 */

export const CACHE_CONFIG = {
  // Server-side in-memory cache TTL (milliseconds)
  PRODUCTS_TTL: 60 * 60 * 1000,        // 1 hour
  CATEGORIES_TTL: 60 * 60 * 1000,      // 1 hour
  
  // HTTP Response Cache-Control headers
  API: {
    // Browser cache max-age (seconds)
    MAX_AGE: 3600,                     // 1 hour
    // CDN cache max-age (seconds)
    S_MAX_AGE: 86400,                  // 24 hours
  },
  
  // ISR (Incremental Static Regeneration) revalidation interval (seconds)
  ISR: {
    PRODUCT_PAGE: 3600,                // 1 hour
    CATEGORY_PAGE: 3600,               // 1 hour
  },
};

/**
 * How caching works in this app:
 * 
 * 1. SERVER-SIDE CACHING
 *    - First request: Fetches from GitHub, caches in memory
 *    - Subsequent requests (within TTL): Serve from memory
 *    - After TTL expires: Re-fetch from GitHub, update cache
 * 
 * 2. HTTP RESPONSE CACHING
 *    - API responses include Cache-Control headers
 *    - Browsers cache for MAX_AGE seconds
 *    - CDNs cache for S_MAX_AGE seconds
 * 
 * 3. ISR REVALIDATION
 *    - Dynamic pages are pre-generated at build time
 *    - Revalidated every ISR interval when requested
 *    - New visitors get latest version after revalidation
 * 
 * 4. CACHE INVALIDATION
 *    - On product/category create/update/delete
 *    - Cache is cleared automatically
 *    - revalidatePath() updates ISR cache
 * 
 * TOTAL CACHING LAYERS:
 * GitHub → Server Memory → HTTP Response → Browser Cache → CDN Cache
 */
