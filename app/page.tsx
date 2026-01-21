import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import { getAllCategories } from '@/lib/categories';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedSection from '../components/FeaturedSection';
import AboutSection from '../components/AboutSection';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedSection products={featuredProducts} />
      <AboutSection />
    </div>
  );
}

