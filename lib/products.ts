import { Product } from '@/types';
import { supabase } from './supabase';
import { cacheManager } from './cache';

export async function getAllProducts(): Promise<Product[]> {
  // Check cache first
  const cached = cacheManager.getProducts('all');
  if (cached) {
    return cached;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    const products = data as Product[];
    
    // Cache the results
    cacheManager.setProducts(products, 'all');
    
    return products;
  } catch (error) {
    console.error('Error loading products from Supabase:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Check cache first
  const cached = cacheManager.getProduct(slug);
  if (cached) {
    return cached;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    const product = data as Product;
    // Cache the individual product
    cacheManager.setProduct(slug, product);
    return product;
  } catch (error) {
    console.error(`Error loading product ${slug} from Supabase:`, error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error(`Error loading products for category ${category}:`, error);
    return [];
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(limit)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error('Error loading featured products:', error);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .upsert({
        ...product,
        updatedAt: new Date().toISOString()
      }, {
        onConflict: 'slug'
      });

    if (error) throw error;

    // Invalidate cache for this product
    cacheManager.invalidateProduct(product.slug);
  } catch (error) {
    console.error('Error saving product to Supabase:', error);
    throw error;
  }
}

export async function deleteProduct(slug: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    // Invalidate cache for this product
    cacheManager.invalidateProduct(slug);
  } catch (error) {
    console.error(`Error deleting product ${slug} from Supabase:`, error);
    throw error;
  }
}
