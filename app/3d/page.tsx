'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function ProductHero() {
  // 1. Mouse Tracking for Parallax Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Smooth out the mouse movement (Spring physics)
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // 3. Map mouse movement to subtle rotation and tilt
  // This simulates a "3D" feel as the user moves their cursor
  const rotateX = useTransform(mouseY, [-400, 400], [10, -10]);
  const rotateY = useTransform(mouseX, [-400, 400], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center p-8"
    >
      {/* Background Glows (Matching your image's pink/purple palette) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
      
      {/* The Product Container */}
      <motion.div 
        style={{ perspective: 1000 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Floating Animation */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <img 
              src="/bottle.png" 
              alt="Premium Perfume" 
              className="w-[300px] md:w-[450px] drop-shadow-[0_35px_35px_rgba(255,0,128,0.3)]"
            />
          </motion.div>

          {/* Decorative Floating Bubbles (Matching the image) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 border border-white/20 rounded-full backdrop-blur-sm"
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>

        {/* Text Details */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h2 className="text-pink-100 text-5xl font-extralight tracking-[0.2em] uppercase">
            Pink Aura
          </h2>
          <div className="h-[1px] w-24 bg-pink-500 mx-auto mt-4 mb-4" />
          <button className="px-8 py-3 border border-pink-500/50 text-pink-200 hover:bg-pink-500/20 transition-all duration-300 uppercase tracking-widest text-xs">
            Discover Scents
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
