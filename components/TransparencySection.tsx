"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const TransparencySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bottleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const rightCardOneY = useTransform(scrollYProgress, [0, 1], [18, -26]);
  const rightCardTwoY = useTransform(scrollYProgress, [0, 1], [30, -18]);

  return (
    <section ref={sectionRef} className="relative -mt-10 pt-24 pb-24 overflow-hidden rounded-t-[52px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.95) 55%, rgba(255,255,255,1) 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-20" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.72))' }} />
      <div className="absolute -left-16 top-28 h-48 w-48 rounded-full blur-3xl" style={{ background: 'rgba(230, 230, 250, 0.55)' }} />
      <div className="absolute right-0 top-10 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(220, 174, 150, 0.32)' }} />

      <div className="container mx-auto px-4 relative">
        <motion.h2
          className="font-display text-[clamp(2rem,5.5vw,4.4rem)] leading-[0.95] tracking-[0.03em] max-w-4xl"
          style={{ color: 'var(--theme-text)', y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          RADICAL TRANSPARENCY.
          <span className="block">HIDE NOTHING.</span>
        </motion.h2>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <motion.div
            className="relative flex justify-center lg:justify-start"
            style={{ y: bottleY }}
            initial={{ opacity: 0, x: -30, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -10 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, delay: 0.12 }}
          >
            <motion.div
              className="relative theme-card rounded-[2.2rem] p-5 sm:p-7"
              animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/transparent-section-image.png"
                alt="Aurya bottle on transparent card"
                width={380}
                height={560}
                className="object-contain w-[220px] sm:w-[300px] lg:w-[335px] drop-shadow-[0_28px_36px_rgba(45,10,49,0.3)]"
              />
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 items-start">
            <motion.article
              className="theme-card rounded-3xl p-3"
              style={{ y: rightCardOneY }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.22 }}
            >
              <Image
                src="/hero-background.jpg"
                alt="Skincare lifestyle application"
                width={360}
                height={360}
                className="rounded-2xl object-cover aspect-square w-full"
              />
            </motion.article>

            <motion.article
              className="theme-card rounded-3xl p-3 sm:mt-10"
              style={{ y: rightCardTwoY }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.35 }}
            >
              <Image
                src="/hero-section-product.png"
                alt="Product texture and dropper detail"
                width={360}
                height={360}
                className="rounded-2xl object-cover aspect-square w-full"
              />
            </motion.article>

            <motion.p
              className="sm:col-span-2 text-base sm:text-lg max-w-2xl pt-2"
              style={{ color: 'var(--theme-text-soft)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.5 }}
            >
              Every ingredient, concentration, and source is visible by design. No hidden blends, no mystery labels, and no cosmetic smoke screens.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
