"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const NewHeroSection = () => {
  const bubbles = [
    { size: '100px', x: '10%', y: '20%', duration: 8 },
    { size: '50px', x: '80%', y: '30%', duration: 12 },
    { size: '80px', x: '90%', y: '70%', duration: 10 },
    { size: '40px', x: '20%', y: '80%', duration: 15 },
    { size: '120px', x: '5%', y: '60%', duration: 9 },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-white">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.y,
            left: bubble.x,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div 
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Image
            src="/hero-section-product.png"
            alt="Product Image"
            width={300}
            height={500}
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        <div className="relative w-full flex items-center justify-center">
          <motion.h1
            className="text-6xl md:text-9xl font-extrabold text-gray-800 mix-blend-overlay"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <span className="block">POWERFUL.</span>
            <span className="block mt-[-2rem] md:mt-[-4rem]">PURE.</span>
          </motion.h1>
        </div>
        
        <motion.h2
            className="text-5xl md:text-8xl font-serif text-gray-700 italic mt-[-1rem] md:mt-[-2rem]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
            Gentle
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/products">
            <button className="mt-8 px-8 py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-full text-lg font-semibold text-gray-800 hover:bg-white/80 transition-colors duration-300">
              Shop Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewHeroSection;
