import { Category } from '@/types';
import { supabase } from './supabase';
import { cacheManager } from './cache';

export async function getAllCategories(): Promise<Category[]> {
  // Check cache first
  const cached = cacheManager.getCategories('all');
  if (cached) {
    return cached;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;

    const categories = data as Category[];
    
    // Cache the results
    cacheManager.setCategories(categories, 'all');
    
    return categories;
  } catch (error) {
    console.error('Error loading categories from Supabase:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  // Check cache first
  const cached = cacheManager.getCategory(slug);
  if (cached) {
    return cached;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    const category = data as Category;
    // Cache the individual category
    cacheManager.setCategory(slug, category);
    return category;
  } catch (error) {
    console.error(`Error loading category ${slug} from Supabase:`, error);
    return null;
  }
}

export async function saveCategory(category: Category): Promise<void> {
  try {
    const { error } = await supabase
      .from('categories')
      .upsert(category, {
        onConflict: 'slug'
      });

    if (error) throw error;

    // Invalidate cache for this category
    cacheManager.invalidateCategory(category.slug);
  } catch (error) {
    console.error('Error saving category to Supabase:', error);
    throw error;
  }
}

export async function deleteCategory(slug: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    // Invalidate cache for this category
    cacheManager.invalidateCategory(slug);
  } catch (error) {
    console.error(`Error deleting category ${slug} from Supabase:`, error);
    throw error;
  }
}
