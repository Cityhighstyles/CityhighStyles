import { Category } from '@/types';
import { getFileContent, listFiles, createOrUpdateFile } from './github';
import { cacheManager } from './cache';

const CATEGORIES_DIR = 'data/categories';

export async function getAllCategories(): Promise<Category[]> {
  // Check cache first
  const cached = cacheManager.getCategories('all');
  if (cached) {
    return cached;
  }

  try {
    const files = await listFiles(CATEGORIES_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));

    const categories = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await getFileContent(`${CATEGORIES_DIR}/${file}`);
        if (content) {
          return JSON.parse(content) as Category;
        }
        return null;
      })
    );

    const validCategories = categories.filter((c): c is Category => c !== null);
    
    // Cache the results
    cacheManager.setCategories(validCategories, 'all');
    
    return validCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
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
    const content = await getFileContent(`${CATEGORIES_DIR}/${slug}.json`);
    if (content) {
      const category = JSON.parse(content) as Category;
      // Cache the individual category
      cacheManager.setCategory(slug, category);
      return category;
    }
    return null;
  } catch (error) {
    console.error(`Error loading category ${slug}:`, error);
    return null;
  }
}

export async function saveCategory(category: Category): Promise<void> {
  const path = `${CATEGORIES_DIR}/${category.slug}.json`;
  const content = JSON.stringify(category, null, 2);
  const message = `Update category: ${category.title}`;

  await createOrUpdateFile(path, content, message);
  
  // Invalidate cache for this category
  cacheManager.invalidateCategory(category.slug);
}

export async function deleteCategory(slug: string): Promise<void> {
  const { deleteFile } = await import('./github');
  const path = `${CATEGORIES_DIR}/${slug}.json`;
  const message = `Delete category: ${slug}`;

  await deleteFile(path, message);
  
  // Invalidate cache for this category
  cacheManager.invalidateCategory(slug);
}
