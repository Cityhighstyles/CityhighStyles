'use client';

import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
        
        {/* Soft floating background shapes (VERY cheap to animate) */}
        <m.div
          aria-hidden
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-2xl"
        />

        <m.div
          aria-hidden
          animate={{ y: [0, 40, 0], x: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-2xl"
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          
          {/* Title */}
          <m.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
          >
            CityHighStyles
          </m.h1>

          {/* Subtitle */}
          <m.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Premium Men's Fashion. Quality That Speaks.
          </m.p>

          {/* Button */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="#featured" className="inline-block">
              <m.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Shop Now
              </m.div>
            </Link>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}