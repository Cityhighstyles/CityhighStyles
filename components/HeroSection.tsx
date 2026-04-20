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
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Bubble configuration
  const bubbles = [
    { size: 'w-20 h-20', top: '10%', left: '8%', delay: 0, duration: 6 },
    { size: 'w-32 h-32', top: '15%', right: '12%', delay: 1, duration: 8 },
    { size: 'w-24 h-24', bottom: '20%', left: '5%', delay: 0.5, duration: 7 },
    { size: 'w-28 h-28', bottom: '15%', right: '8%', delay: 1.5, duration: 9 },
    { size: 'w-16 h-16', top: '50%', left: '10%', delay: 0.3, duration: 5.5 },
    { size: 'w-20 h-20', top: '40%', right: '10%', delay: 1.2, duration: 6.5 },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section 
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 text-gray-900 overflow-hidden"
      >
        
        {/* Floating bubbles background layer */}
        {bubbles.map((bubble, idx) => (
          <m.div
            key={idx}
            aria-hidden
            animate={{ 
              y: [0, -50, 0], 
              x: [0, 30, 0], 
              opacity: [0.4, 0.7, 0.4] 
            }}
            transition={{ 
              duration: bubble.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: bubble.delay 
            }}
            className={`absolute ${bubble.size} bg-white rounded-full opacity-50 blur-2xl ${bubble.top ? `top-[${bubble.top}]` : ''} ${bubble.bottom ? `bottom-[${bubble.bottom}]` : ''} ${bubble.left ? `left-[${bubble.left}]` : ''} ${bubble.right ? `right-[${bubble.right}]` : ''}`}
            style={{
              ...(bubble.top && { top: bubble.top }),
              ...(bubble.bottom && { bottom: bubble.bottom }),
              ...(bubble.left && { left: bubble.left }),
              ...(bubble.right && { right: bubble.right }),
            }}
          />
        ))}

        {/* Glassmorphic Navbar */}
        <m.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
              <Link href="#" className="hover:text-gray-900 transition">Shop</Link>
              <Link href="#" className="hover:text-gray-900 transition">About</Link>
              <Link href="#" className="hover:text-gray-900 transition">Contact</Link>
            </div>
          </div>
        </m.nav>

        <div className="min-h-screen flex items-center justify-center container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left: Background Text Layer (z-10) */}
            <m.div
              animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="flex items-center justify-center md:justify-end"
            >
              <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-cyan-200 select-none pointer-events-none">
                SKINCARE
              </h1>
            </m.div>

            {/* Right: Product Image Layer (z-30) */}
            <m.div
              animate={{ 
                y: [0, -20, 0],
                x: -mousePosition.x * 2,
                z: 30
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                x: { type: "spring", stiffness: 100, damping: 30 }
              }}
              className="flex items-center justify-center relative"
            >
              <m.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full max-w-md"
              >
                <Image
                  src="/assets/bottle.jpg"
                  alt="Premium Skincare Serum"
                  width={400}
                  height={600}
                  priority
                  className="w-full h-auto drop-shadow-2xl"
                />
              </m.div>
            </m.div>

          </div>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <Link href="/products" className="inline-block">
              <m.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-shadow"
              >
                Discover Our Collection
              </m.button>
            </Link>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}