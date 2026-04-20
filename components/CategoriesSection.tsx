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
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent"
        >
          Skincare Categories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-600 mb-16 text-lg"
        >
          Discover our curated collection of premium skincare solutions
        </motion.p>
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
                  whileHover={{ y: -12, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-white/60 flex flex-col items-center justify-end min-h-[240px] overflow-hidden p-0"
                  style={{ minHeight: '240px' }}
                >
                  {/* Background image */}
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover w-full h-full absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                      sizes="320px"
                    />
                  )}
                  {/* Overlay for darkening */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80 opacity-60" />
                  {/* Animated text on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-20 flex flex-col items-center justify-center w-full px-6 py-8"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="font-semibold text-lg mb-2 text-center text-white drop-shadow-lg"
                    >
                      {category.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-sm text-gray-200 text-center"
                    >
                      {category.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
