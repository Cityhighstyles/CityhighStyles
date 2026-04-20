'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;

      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);

    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Bubble configuration - more refined
  const bubbles = [
    { size: 'w-24 h-24', top: '8%', left: '5%', delay: 0, duration: 6, opacity: 0.6 },
    { size: 'w-40 h-40', top: '12%', right: '8%', delay: 1, duration: 8, opacity: 0.5 },
    { size: 'w-32 h-32', bottom: '15%', left: '8%', delay: 0.5, duration: 7, opacity: 0.55 },
    { size: 'w-36 h-36', bottom: '12%', right: '6%', delay: 1.5, duration: 9, opacity: 0.5 },
    { size: 'w-20 h-20', top: '45%', left: '12%', delay: 0.3, duration: 5.5, opacity: 0.7 },
    { size: 'w-28 h-28', top: '35%', right: '12%', delay: 1.2, duration: 6.5, opacity: 0.6 },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Gradient Background - Sunset/Dreamy */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 opacity-90" />

        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Floating bubbles background layer - refined glow effect */}
        {bubbles.map((bubble, idx) => (
          <m.div
            key={idx}
            aria-hidden
            animate={{
              y: [0, -60, 0],
              x: [0, 40, 0],
              opacity: [bubble.opacity * 0.5, bubble.opacity, bubble.opacity * 0.5]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay
            }}
            className={`absolute ${bubble.size} bg-white/20 rounded-full backdrop-blur-sm ${bubble.top ? 'top-[var(--top)]' : ''} ${bubble.bottom ? 'bottom-[var(--bottom)]' : ''} ${bubble.left ? 'left-[var(--left)]' : ''} ${bubble.right ? 'right-[var(--right)]' : ''}`}
            style={{
              ...(bubble.top && { '--top': bubble.top } as React.CSSProperties),
              ...(bubble.bottom && { '--bottom': bubble.bottom } as React.CSSProperties),
              ...(bubble.left && { '--left': bubble.left } as React.CSSProperties),
              ...(bubble.right && { '--right': bubble.right } as React.CSSProperties),
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}

        {/* Main Content Container - Added pt-20 for navbar spacing */}
        <div className="relative z-10 container mx-auto px-4 text-center">

          {/* Typography Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            animate={{ y: mousePosition.y * 1.5, opacity: 1 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="space-y-2">
              <m.p
                className="text-5xl md:text-6xl font-black text-white drop-shadow-lg tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                POWERFUL...
              </m.p>
              <m.p
                className="text-6xl md:text-7xl font-black text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                PURE, Gentle
              </m.p>
              <m.p
                className="text-lg md:text-xl text-white/80 font-light mt-4 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Advanced Skincare Science
              </m.p>
            </div>
          </m.div>

          {/* Product Image - Centered with floating animation */}
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -30, 0],
              x: -mousePosition.x * 2,
            }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 100, damping: 30 }
            }}
            className="relative flex justify-center my-8 z-20"
          >
            <m.div
              whileHover={{ scale: 1.08 }}
              className="relative drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
              }}
            >
              <Image
                src="/bottle.jpg"
                alt="Premium Skincare Serum"
                width={350}
                height={550}
                priority
                className="w-80 h-auto object-contain filter brightness-110"
              />
            </m.div>
          </m.div>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/products" className="inline-block">
              <m.button
                whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border border-white/30 shadow-xl hover:shadow-2xl transition-all text-lg"
              >
                Discover Collection
              </m.button>
            </Link>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}