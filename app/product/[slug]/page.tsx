import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetails from '@/components/ProductDetails';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.slug}`);

  if (!response.ok) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = await response.json();

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.slug}`);

  if (!response.ok) {
    notFound();
  }

  const product = await response.json();

  return <ProductDetails product={product} />;
}
