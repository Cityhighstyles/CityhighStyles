import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/products';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const product = await getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const response = NextResponse.json(product);
    
    // Add cache headers for individual product
    // max-age: 3600 (1 hour) for browser cache
    // s-maxage: 86400 (24 hours) for CDN cache
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
