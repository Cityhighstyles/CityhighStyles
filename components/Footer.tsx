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
      },
    }),
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"
      />

      <div className="w-full px-6 md:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* About */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              City High Styles
            </h3>
            <p className="text-gray-400 text-base md:text-lg">
              Premium men's fashion. Quality clothing at affordable prices.
            </p>
          </motion.div>

          {/* Store Address */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-2">VISIT OUR STORE</h3>
            <p className="text-gray-400 text-base md:text-lg">
              <span role="img" aria-label="location" className="mr-1">📍</span>
              Chris Akinro Cl, Lekki Penninsula II, Lekki<br />106104, Lagos
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-base md:text-lg">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/category/tees' },
                { name: 'Cart', href: '/cart' },
              ].map((link, i) => (
                <motion.li
                  key={link.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={linkVariants}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors block">
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
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-base md:text-lg mb-2">WhatsApp: +234 704 662 5465</p>
            <a href="https://wa.me/2347046625465" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl text-base md:text-lg hover:shadow-lg hover:shadow-green-500/50 transition-shadow mb-2"
              >
                Chat on WhatsApp
              </motion.div>
            </a>
            <a href="https://www.instagram.com/cityhighstyless?igsh=YWlsZjczb25sajZo" target="_blank" rel="noopener noreferrer" className="block mt-2">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-xl text-base md:text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-shadow"
              >
                Follow us on Instagram
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-6 text-center text-base md:text-lg text-gray-400"
        >
          <p>&copy; {currentYear} City High Styles. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}