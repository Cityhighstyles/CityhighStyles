import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import ProductDetails from '@/components/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ISR: Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - City High Styles`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: `${process.env.NEXT_PUBLIC_SITE_URL}${product.images[0]}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
