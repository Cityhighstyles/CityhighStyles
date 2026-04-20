"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const TransparencySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src="/transparent-section-image.png"
            alt="Our Product"
            width={400}
            height={600}
            className="rounded-lg shadow-2xl mx-auto"
          />
        </motion.div>
        <div className="text-left">
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            RADICAL TRANSPARENCY.
          </motion.h2>
          <motion.h3
            className="text-5xl md:text-7xl font-bold text-gray-600 mt-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            Hide NOTHING.
          </motion.h3>
          <motion.p
            className="mt-8 text-lg text-gray-600 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            Our commitment is to provide you with products made from the highest quality ingredients, with no hidden formulas or confusing labels. What you see is what you get.
          </motion.p>
          <div className="flex mt-6 space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Image src="https://placehold.co/80x80/E2E8F0/4A5568?text=A" alt="Testimonial 1" width={80} height={80} className="rounded-full border-4 border-white shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <Image src="https://placehold.co/80x80/E2E8F0/4A5568?text=B" alt="Testimonial 2" width={80} height={80} className="rounded-full border-4 border-white shadow-lg" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
