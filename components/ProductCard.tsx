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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white text-gray-800 px-3 py-1 rounded-full font-medium text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
          <p className="text-gray-600 font-bold">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
