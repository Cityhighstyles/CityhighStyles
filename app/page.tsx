import NewHeroSection from '../components/NewHeroSection';

type HomePageProps = {
  searchParams?: { theme?: string } | Promise<{ theme?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const activeTheme = params?.theme?.toLowerCase() === 'midnight' ? 'midnight' : 'dreamy';

  return (
    <div className="min-h-screen" data-theme={activeTheme}>
      <NewHeroSection />
    </div>
  );
}
