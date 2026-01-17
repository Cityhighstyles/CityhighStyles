import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import { categories } from '@/lib/categories';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            City High Styles
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Premium Men's Fashion. Quality That Speaks.
          </p>
          <Link
            href="#featured"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Link
              href="/category/tees"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected materials for comfort and durability
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Affordable luxury without compromising on quality
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery across Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
