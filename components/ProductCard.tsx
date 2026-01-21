'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </motion.div>
          {!product.inStock && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
              >
                Out of Stock
              </motion.span>
            </motion.div>
          )}
        </div>
        <div className="p-4">
          <motion.h3 
            className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-gray-700"
          >
            {product.name}
          </motion.h3>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-gray-900 font-bold inline-block"
          >
            {formatPrice(product.price)}
          </motion.p>
          {product.category && (
            <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
