'use server';


import { Category } from '@/types';
import { createOrUpdateFile, getFileContent } from '@/lib/github';
import { uploadImage } from '@/lib/github';
import { revalidatePath } from 'next/cache';
import { generateSlug } from '@/lib/utils';

export async function updateCategory(formData: FormData) {
  try {
    let slug = formData.get('slug') as string | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // If slug is missing or empty, generate from title
    if (!slug || slug.trim() === '') {
      slug = generateSlug(title);
    }

    // Always require an image file
    const imageFile = formData.get('imageFile') as File | null;
    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: 'Image file is required.' };
    }
    const buffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const fileName = `category-${slug}-${Date.now()}.jpg`;
    // Save to public/categories/ in GitHub
    const imagePath = await uploadImage('category', fileName, base64);
    // The returned path is like /categories/filename.jpg
    const image = `https://cityhighstyles.github.io/public${imagePath}`;

    const category: Category = {
      slug,
      title,
      description,
      image,
    };

    // Load current categories
    const content = await getFileContent('lib/categories.ts');
    if (!content) {
      return { success: false, error: 'Categories file not found' };
    }

    // Parse and update categories
    const categoryMatch = content.match(/export const categories: Category\[\] = \[([\s\S]*?)\];/);
    if (!categoryMatch) {
      return { success: false, error: 'Invalid categories format' };
    }

    // Replace the specific category in the string
    const categoriesText = categoryMatch[1];
    const categoryPattern = new RegExp(
      `{[^}]*slug:\\s*['"]${slug}['"][^}]*}`,
      's'
    );

    const newCategoryText = `{
    slug: '${slug}',
    title: '${title}',
    description: '${description}',
    image: '${image}'
  }`;

    const updatedCategoriesText = categoriesText.replace(categoryPattern, newCategoryText);
    const updatedContent = content.replace(categoriesText, updatedCategoriesText);

    // Save back to GitHub
    await createOrUpdateFile(
      'lib/categories.ts',
      updatedContent,
      `Update category: ${title}`
    );

    revalidatePath('/');
    revalidatePath(`/category/${slug}`);

    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: 'Failed to update category' };
  }
}
