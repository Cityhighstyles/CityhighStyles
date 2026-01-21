'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      }
    })
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              City High Styles
            </h3>
            <p className="text-gray-400 text-sm">
              Premium men's fashion. Quality clothing at affordable prices.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/category/tees' },
                { name: 'Cart', href: '/cart' }
              ].map((link, i) => (
                <motion.li 
                  key={link.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={linkVariants}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Tees', href: '/category/tees' },
                { name: 'Hoodies', href: '/category/hoodies' },
                { name: 'Jeans', href: '/category/jeans' },
                { name: 'Cargo', href: '/category/cargo' }
              ].map((link, i) => (
                <motion.li 
                  key={link.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={linkVariants}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm mb-2">
              WhatsApp: +234 704 662 5465
            </p>
            <a
              href="https://wa.me/2347046625465"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg hover:shadow-green-500/50 transition-shadow"
              >
                Chat on WhatsApp
              </motion.div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
        >
          <p>&copy; {currentYear} City High Styles. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
      