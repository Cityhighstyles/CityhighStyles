import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductsByCategory, getAllProducts } from '@/lib/products';
import { getCategoryBySlug, categories } from '@/lib/categories';
import ProductGrid from '@/components/ProductGrid';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} - City High Styles`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        <p className="text-gray-600 text-lg">{category.description}</p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
