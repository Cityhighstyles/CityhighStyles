import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import ProductDetails from '@/components/ProductDetails';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

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
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
