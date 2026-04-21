import { getFeaturedProducts } from '@/lib/products';
import NewHeroSection from '../components/NewHeroSection';
import TransparencySection from '../components/TransparencySection';
import FeaturedSection from '../components/FeaturedSection';

type HomePageProps = {
  searchParams?: { theme?: string } | Promise<{ theme?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const featuredProducts = await getFeaturedProducts(4);
  const params = searchParams ? await searchParams : undefined;
  const activeTheme = params?.theme?.toLowerCase() === 'midnight' ? 'midnight' : 'dreamy';

  return (
    <div className="min-h-screen" data-theme={activeTheme}>
      <NewHeroSection />
      <TransparencySection />
      <FeaturedSection products={featuredProducts} />
    </div>
  );
}

