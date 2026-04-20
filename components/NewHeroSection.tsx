"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const NewHeroSection = () => {
  return (
    <section 
      className="relative w-full h-[calc(100svh-5rem)] min-h-[calc(100svh-5rem)] max-h-[calc(100svh-5rem)] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center px-4">
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
              width={300}
              height={480}
              className="object-contain drop-shadow-2xl w-[190px] sm:w-[230px] md:w-[260px] lg:w-[300px]"
              priority
            />
          </motion.div>

          {/* Text Overlay - Left and Right */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            {/* Mobile / Tablet: stacked center */}
            <div className="md:hidden w-full text-center">
              <motion.h1
                className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              >
                POWERFUL.
              </motion.h1>
              <motion.h1
                className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mt-2"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
              >
                PURE.
              </motion.h1>
              <motion.h2
                className="text-4xl sm:text-5xl font-serif text-white italic drop-shadow-lg mt-2"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
              >
                Gentle
              </motion.h2>
            </div>

            {/* Desktop: left / center / right overlay like reference */}
            <div className="hidden md:flex w-full items-center justify-center">
              <div className="w-1/3 text-right pr-4 lg:pr-10">
                <motion.h1
                  className="text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                  POWERFUL.
                </motion.h1>
              </div>

              <div className="w-1/3 flex justify-center" />

              <div className="w-1/3 text-left pl-4 lg:pl-10">
                <motion.h1
                  className="text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                  PURE.
                </motion.h1>
                <motion.h2
                  className="text-5xl lg:text-6xl xl:text-7xl font-serif text-white italic drop-shadow-lg mt-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                >
                  Gentle
                </motion.h2>
              </div>
            </div>
          </div>

          {/* CTA Button - Bottom */}
          <motion.div
            className="absolute bottom-8 sm:bottom-10 z-30"
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

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-pink-100/40 to-pink-50" />
    </section>
  );
};

export default NewHeroSection;
