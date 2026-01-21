"use client";

import { getAllProducts } from '@/lib/products';
import { getAllCategories } from '@/lib/categories';
import { Product, Category } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default async function ProductsPage() {
  // Fetch all products and categories
  const products: Product[] = await getAllProducts();
  const categories: Category[] = await getAllCategories();

  // Group products by category slug
  const productsByCategory: { [key: string]: Product[] } = {};
  categories.forEach(category => {
    productsByCategory[category.slug] = products.filter(p => p.category === category.slug);
  });

  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
      >
        All Products
      </motion.h1>
      {categories.map(category => {
        const catProducts = productsByCategory[category.slug] || [];
        return (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{category.title}</h2>
            {catProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {catProducts.map(product => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
                  >
                    <Link href={`/product/${product.slug}`}>
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <span className="text-gray-900 font-semibold">${product.price}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic">No products in this category.</div>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}
