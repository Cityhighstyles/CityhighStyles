'use client';

import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from './ProductGrid';
import { motion } from 'framer-motion';

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const highlights = [
    {
      title: '100% Transparent Formula',
      text: 'Every ingredient is listed clearly with concentration clarity and purpose.',
    },
    {
      title: 'Highest Standards',
      text: 'Formulated with strict testing, clean sourcing, and third-party checks.',
    },
    {
      title: 'Only One Ingredient',
      text: 'A focused botanical active, delivered without filler complexity.',
      hasDroplet: true,
    },
    {
      title: 'Best Results',
      text: 'Made for visible, repeatable outcomes in your everyday routine.',
    },
  ];

  return (
    <section id="featured" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,1) 100%)' }}>
      <div className="container mx-auto px-4 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                className="relative pt-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <h3 className="font-display text-2xl leading-tight" style={{ color: 'var(--theme-text)' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: 'var(--theme-text-soft)' }}>
                  {item.text}
                </p>

                {item.hasDroplet && (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 120"
                    className="h-16 w-16 mt-5"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path
                      d="M58 10 C 40 35, 22 53, 22 73 C 22 94, 39 110, 60 110 C 81 110, 98 94, 98 73 C 98 53, 79 35, 62 10 Z"
                      fill="#DCAE96"
                      fillOpacity="0.55"
                    />
                    <circle cx="63" cy="47" r="9" fill="#FFFFFF" fillOpacity="0.7" />
                  </motion.svg>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]" style={{ color: 'var(--theme-text)' }}>
            Shop The Collection
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductGrid products={products} />
        </motion.div>
      </div>
    </section>
  );
}
