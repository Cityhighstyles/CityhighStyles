'use client';

import Link from 'next/link';
import { Category } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Shop by Category
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
            >
              <Link
                href={`/category/${category.slug}`}
                className="block group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  
                  {category.image && (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-20 h-20 mb-4"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover rounded-full border-2 border-gray-200 group-hover:border-gray-900 transition-colors"
                        sizes="80px"
                      />
                    </motion.div>
                  )}
                  <h3 className="font-semibold text-lg mb-2 text-center relative z-10">{category.title}</h3>
                  <p className="text-sm text-gray-600 text-center relative z-10">{category.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
