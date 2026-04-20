import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    
    // Create response with cache headers
    // max-age: 3600 (1 hour) for browser cache
    // s-maxage: 86400 (24 hours) for CDN cache
    const response = NextResponse.json(products);
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
