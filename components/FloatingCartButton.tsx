"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCartButton() {
  const { cart } = useCart();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/cart" className="relative group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.95, rotate: 8 }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-2xl rounded-full p-4 flex items-center justify-center transition-colors duration-200 border-4 border-white drop-shadow-lg"
            style={{ boxShadow: "0 8px 32px 0 rgba(0, 200, 255, 0.25)" }}
          >
            <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>🛒</span>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
              {cart.itemCount}
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
