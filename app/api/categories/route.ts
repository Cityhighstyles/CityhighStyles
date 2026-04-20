import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/categories';

export async function GET() {
  try {
    const categories = await getAllCategories();
    
    // Create response with cache headers
    // max-age: 3600 (1 hour) for browser cache
    // s-maxage: 86400 (24 hours) for CDN cache
    const response = NextResponse.json(categories);
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
