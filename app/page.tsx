import { getAllProducts } from '@/lib/products';
import { getAllCategories } from '@/lib/categories';
import HomePageClient from '@/components/HomePageClient';

export const revalidate = 3600;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const featuredProducts = products.filter((p) => p.featured && p.inStock).slice(0, 4);
  const heroProduct = featuredProducts[0] ?? products.find((p) => p.inStock) ?? null;

  return (
    <HomePageClient
      products={products}
      categories={categories}
      featuredProducts={featuredProducts}
      heroProduct={heroProduct}
    />
  );
}
