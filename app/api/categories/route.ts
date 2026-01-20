import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateFile, getFileContent } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    
    // Load current categories
    const content = await getFileContent('lib/categories.ts');
    if (!content) {
      return NextResponse.json({ error: 'Categories file not found' }, { status: 404 });
    }

    // Parse and update categories
    const categoryMatch = content.match(/export const categories: Category\[\] = \[([\s\S]*?)\];/);
    if (!categoryMatch) {
      return NextResponse.json({ error: 'Invalid categories format' }, { status: 500 });
    }

    // Simple approach: replace the specific category in the string
    const categoriesText = categoryMatch[1];
    const categoryPattern = new RegExp(
      `{[^}]*slug:\\s*['"]${category.slug}['"][^}]*}`,
      's'
    );

    const newCategoryText = `{
    slug: '${category.slug}',
    title: '${category.title}',
    description: '${category.description}',
    image: '${category.image}'
  }`;

    const updatedCategoriesText = categoriesText.replace(categoryPattern, newCategoryText);
    const updatedContent = content.replace(categoriesText, updatedCategoriesText);

    // Save back to GitHub
    await createOrUpdateFile(
      'lib/categories.ts',
      updatedContent,
      `Update category: ${category.title}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}
