'use server';

import { Category } from '@/types';
import { uploadImage } from '@/lib/github';
import { revalidatePath } from 'next/cache';
import { generateSlug } from '@/lib/utils';
import { saveCategory, getCategoryBySlug } from '@/lib/categories';

export async function updateCategory(formData: FormData) {
  try {
    const slug = formData.get('slug') as string | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Get existing category first
    const existingCategory = slug ? await getCategoryBySlug(slug) : null;
    
    // Only generate a new slug if this is a new category (no slug provided or doesn't exist)
    const finalSlug = existingCategory ? slug : (slug && slug.trim() !== '' ? slug : generateSlug(title));
    let image = existingCategory?.image || '';

    // Handle image upload if a file is provided
    const imageFile = formData.get('imageFile') as File | null;
    if (imageFile && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const fileName = `category-${slug}-${Date.now()}.jpg`;
      // Save to public/categories/ in GitHub
      const imagePath = await uploadImage('category', fileName, base64);
      // The returned path is like /categories/filename.jpg
      image = `https://cityhighstyles.github.io/public${imagePath}`;
    } else if (!existingCategory) {
      return { success: false, error: 'Image file is required for new categories.' };
    }

    const category: Category = {
      slug: finalSlug!,
      title,
      description,
      image,
    };

    // Save category as JSON file in GitHub
    await saveCategory(category);

    revalidatePath('/');
    revalidatePath(`/category/${finalSlug}`);

    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: 'Failed to update category' };
  }
}

export async function deleteCategory(slug: string) {
  try {
    const { deleteCategory: deleteCategoryFromGitHub } = await import('@/lib/categories');
    await deleteCategoryFromGitHub(slug);
    
    revalidatePath('/');
    revalidatePath(`/category/${slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'Failed to delete category' };
  }
}
