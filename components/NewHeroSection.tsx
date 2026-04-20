"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const NewHeroSection = () => {
  return (
    <section 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center px-4">
          {/* Product Image - Center */}
          <motion.div 
            className="absolute z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Image
              src="/hero-section-product.png"
              alt="Product Image"
              width={280}
              height={450}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Text Overlay - Left and Right */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            {/* Left side text */}
            <div className="w-1/3 text-right pr-4">
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                POWERFUL.
              </motion.h1>
            </div>

            {/* Center - Product */}
            <div className="w-1/3 flex justify-center">
              {/* Empty space for product */}
            </div>

            {/* Right side text */}
            <div className="w-1/3 text-left pl-4">
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              >
                PURE.
              </motion.h1>
              
              <motion.h2
                className="text-4xl md:text-6xl font-serif text-white italic drop-shadow-lg mt-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              >
                Gentle
              </motion.h2>
            </div>
          </div>

          {/* CTA Button - Bottom */}
          <motion.div
            className="absolute bottom-12 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/products">
              <button className="px-8 py-3 bg-white/70 backdrop-blur-md border border-white rounded-full text-lg font-semibold text-gray-900 hover:bg-white/90 transition-colors duration-300 drop-shadow-lg">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
