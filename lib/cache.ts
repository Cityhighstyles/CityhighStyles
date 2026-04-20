import { Product, Category } from '@/types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
}

class CacheManager {
  private productCache: Map<string, CacheEntry<Product[]>> = new Map();
  private categoryCache: Map<string, CacheEntry<Category[]>> = new Map();
  private individualProductCache: Map<string, CacheEntry<Product>> = new Map();
  private individualCategoryCache: Map<string, CacheEntry<Category>> = new Map();

  private DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  private isExpired<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  // Products caching
  getProducts(key: string = 'all'): Product[] | null {
    const entry = this.productCache.get(key);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.productCache.delete(key);
      return null;
    }
    return entry.data;
  }

  setProducts(data: Product[], key: string = 'all', ttl = this.DEFAULT_TTL): void {
    this.productCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  getProduct(slug: string): Product | null {
    const entry = this.individualProductCache.get(slug);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.individualProductCache.delete(slug);
      return null;
    }
    return entry.data;
  }

  setProduct(slug: string, data: Product, ttl = this.DEFAULT_TTL): void {
    this.individualProductCache.set(slug, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  // Categories caching
  getCategories(key: string = 'all'): Category[] | null {
    const entry = this.categoryCache.get(key);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.categoryCache.delete(key);
      return null;
    }
    return entry.data;
  }

  setCategories(data: Category[], key: string = 'all', ttl = this.DEFAULT_TTL): void {
    this.categoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  getCategory(slug: string): Category | null {
    const entry = this.individualCategoryCache.get(slug);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.individualCategoryCache.delete(slug);
      return null;
    }
    return entry.data;
  }

  setCategory(slug: string, data: Category, ttl = this.DEFAULT_TTL): void {
    this.individualCategoryCache.set(slug, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  // Invalidation methods
  invalidateAllProducts(): void {
    this.productCache.clear();
    this.individualProductCache.clear();
  }

  invalidateAllCategories(): void {
    this.categoryCache.clear();
    this.individualCategoryCache.clear();
  }

  invalidateProduct(slug: string): void {
    this.individualProductCache.delete(slug);
    this.productCache.clear(); // Clear all-products cache too
  }

  invalidateCategory(slug: string): void {
    this.individualCategoryCache.delete(slug);
    this.categoryCache.clear(); // Clear all-categories cache too
  }

  invalidateAll(): void {
    this.invalidateAllProducts();
    this.invalidateAllCategories();
  }
}

// Singleton instance
export const cacheManager = new CacheManager();
