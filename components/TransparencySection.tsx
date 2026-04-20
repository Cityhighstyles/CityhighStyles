"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const TransparencySection = () => {
  return (
    <section className="relative -mt-16 pt-24 pb-24 overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-white rounded-t-[48px]">
      {/* subtle top highlight to blend with hero fade */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-pink-50/0 to-pink-50" />

      {/* soft background bubbles */}
      <div className="absolute -left-10 top-24 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
      <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: product bottle */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              <Image
                src="/transparent-section-image.png"
                alt="Our Product"
                width={380}
                height={560}
                className="object-contain drop-shadow-2xl w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px]"
              />
              <div className="absolute -left-4 top-24 hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white/70 backdrop-blur border border-white/60 shadow" />
            </div>
          </motion.div>

          {/* Right: headline + content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex items-start justify-between gap-6"
            >
              <div>
                <div className="text-xs font-semibold tracking-widest text-gray-700/70">
                  OUR PROMISE
                </div>
                <h2 className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-gray-900">
                  RADICAL
                  <span className="block">TRANSPARENCY.</span>
                </h2>
                <div className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                  <span className="font-serif italic text-gray-700">Hide</span>
                  <span className="ml-3 font-extrabold text-gray-900">NOTHING.</span>
                </div>
              </div>

              {/* small portrait card (optional asset) */}
              <div className="hidden sm:block shrink-0">
                <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-2 shadow">
                  <Image
                    src="/transparency-avatar.png"
                    alt="Customer"
                    width={96}
                    height={96}
                    className="rounded-xl object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              className="mt-8 text-lg text-gray-700 max-w-xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              Clear ingredients. Clear sourcing. Clear results. We keep labels simple so you always know what you’re putting on your skin.
            </motion.p>

            <motion.div
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            >
              <div className="bg-white/60 backdrop-blur border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-semibold text-gray-900">No hidden blends</div>
                <div className="text-sm text-gray-700 mt-1">Fully disclosed formulas</div>
              </div>
              <div className="bg-white/60 backdrop-blur border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-semibold text-gray-900">Honest sourcing</div>
                <div className="text-sm text-gray-700 mt-1">Quality-first ingredients</div>
              </div>
              <div className="bg-white/60 backdrop-blur border border-white/60 rounded-2xl p-4 sm:col-span-1 col-span-2">
                <div className="text-sm font-semibold text-gray-900">Real results</div>
                <div className="text-sm text-gray-700 mt-1">Built for daily use</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
