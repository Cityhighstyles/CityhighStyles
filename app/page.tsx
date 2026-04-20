import { getFeaturedProducts } from '@/lib/products';
import NewHeroSection from '../components/NewHeroSection';
import TransparencySection from '../components/TransparencySection';
import FeaturedSection from '../components/FeaturedSection';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);

  return (
    <div className="min-h-screen bg-white">
      <NewHeroSection />
      <TransparencySection />
      <FeaturedSection products={featuredProducts} />
    </div>
  );
}

