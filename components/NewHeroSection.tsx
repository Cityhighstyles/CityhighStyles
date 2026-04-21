"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const NewHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const productParallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100svh-5rem)] overflow-hidden flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(49% 50% 49% 50% round 4px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="absolute inset-0" style={{ background: 'var(--theme-hero)', y: backgroundY }} />

        <motion.div
          className="theme-sparkle h-36 w-36 left-[7%] top-[18%]"
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2], x: [0, 8, 0] }}
          transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="theme-sparkle h-20 w-20 right-[14%] top-[22%]"
          animate={{ y: [10, -10, 10], rotate: [2, -2, 2], x: [0, -6, 0] }}
          transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 bottom-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(220, 174, 150, 0.42)' }}
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="relative flex min-h-[70vh] items-center justify-center">
            <motion.div className="absolute inset-0 hidden md:flex items-center justify-between pointer-events-none select-none" style={{ y: textY }}>
              <motion.h1
                className="font-display text-[clamp(2.6rem,8vw,8rem)] font-black tracking-[0.05em]"
                style={{ color: 'var(--theme-text)', opacity: 0.2 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75 }}
              >
                POWERFUL.
              </motion.h1>
              <motion.h1
                className="font-display text-[clamp(2.6rem,8vw,8rem)] font-black tracking-[0.05em]"
                style={{ color: 'var(--theme-text)', opacity: 0.2 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
              >
                PURE.
              </motion.h1>
            </motion.div>

            <motion.div className="absolute inset-0 hidden md:flex items-end justify-center pb-10 pointer-events-none select-none" style={{ y: textY }}>
              <motion.h2
                className="font-display italic text-[clamp(2.4rem,6vw,6rem)]"
                style={{ color: 'var(--theme-text)', opacity: 0.26 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
              >
                GENTLE.
              </motion.h2>
            </motion.div>

            <motion.div
              className="relative z-20"
              style={{ y: productParallaxY }}
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/hero-section-product.png"
                  alt="Aurya bottle"
                  width={340}
                  height={520}
                  className="object-contain drop-shadow-[0_25px_35px_rgba(45,10,49,0.34)] w-[200px] sm:w-[250px] md:w-[285px] lg:w-[330px]"
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div className="absolute inset-x-0 bottom-20 md:hidden text-center" style={{ y: textY }}>
              <p className="font-display text-[clamp(1.9rem,10vw,3.1rem)] leading-tight" style={{ color: 'var(--theme-text)' }}>
                POWERFUL. PURE. GENTLE.
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-5 sm:bottom-8 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <Link
                href="/products"
                className="px-8 py-3 rounded-full text-sm sm:text-base font-semibold tracking-[0.08em] transition hover:opacity-90"
                style={{
                  color: 'var(--cloud-white)',
                  background: 'var(--theme-text)',
                  boxShadow: '0 16px 30px rgba(45, 10, 49, 0.2)',
                }}
              >
                Shop The Ritual
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.58), rgba(255,255,255,0.92))' }} />
      </motion.div>
    </section>
  );
};

export default NewHeroSection;
