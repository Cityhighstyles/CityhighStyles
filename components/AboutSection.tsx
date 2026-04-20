'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    {
      icon: '🧪',
      title: 'Advanced Science',
      description: 'Clinically tested formulations with premium ingredients'
    },
    {
      icon: '✨',
      title: 'Visible Results',
      description: 'Transformative skincare that works within 30 days'
    },
    {
      icon: '🌿',
      title: '100% Natural',
      description: 'Cruelty-free and dermatologist-approved formulas'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 via-white to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent"
          >
            Why Choose Aetheria?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 mt-3 text-lg"
          >
            Luxury skincare designed for your most radiant skin
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.04 }}
              className="group"
            >
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-white/60 h-full"
              >
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
