import { NextRequest, NextResponse } from 'next/server';

import { createOrUpdateFile, getFileContent } from '@/lib/github';
import { Category } from '@/types';


// GET: Return all categories
export async function GET() {
  try {
    const content = await getFileContent('lib/categories.ts');
    if (!content) {
      return NextResponse.json({ error: 'Categories file not found' }, { status: 404 });
    }
    // Extract categories array
    const match = content.match(/export const categories: Category\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid categories format' }, { status: 500 });
    }
    // eslint-disable-next-line no-eval
    const categories: Category[] = eval(match[1]);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error loading categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}

// POST: Create or update a category
export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    const content = await getFileContent('lib/categories.ts');
    if (!content) {
      return NextResponse.json({ error: 'Categories file not found' }, { status: 404 });
    }
    const match = content.match(/export const categories: Category\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid categories format' }, { status: 500 });
    }
    // eslint-disable-next-line no-eval
    let categories: Category[] = eval(match[1]);
    // Check if category exists
    const idx = categories.findIndex((cat) => cat.slug === category.slug);
    if (idx !== -1) {
      categories[idx] = category;
    } else {
      categories.push(category);
    }
    // Rebuild categories.ts content
    const categoriesString = JSON.stringify(categories, null, 2).replace(/"([^("]+)":/g,"$1:");
    const newContent = content.replace(/export const categories: Category\[\] = \[[\s\S]*?\];/, `export const categories: Category[] = ${categoriesString};`);
    await createOrUpdateFile('lib/categories.ts', newContent, `${idx !== -1 ? 'Update' : 'Create'} category: ${category.title}`);
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Error saving category:', error);
    return NextResponse.json({ error: 'Failed to save category' }, { status: 500 });
  }
}
