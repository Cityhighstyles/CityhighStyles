'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  // Search state
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Show suggestions while typing (debounced)
  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
    if (value.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/products`);
      const products = await res.json();
      const filtered = products.filter((p: any) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.description?.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } catch {
      setSearchResults([]);
    }
    setSearchLoading(false);
  }
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-200/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 w-full">
          {/* Logo left */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="group">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                City High Styles
              </motion.span>
            </Link>
          </div>
          {/* Menu center */}
          <div className="flex-1 flex justify-center items-center">
            <div className="hidden md:flex items-center space-x-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <Link href="/" className="relative group">
                  <motion.span whileHover={{ y: -2 }} className="text-gray-700 hover:text-gray-900 font-medium">Home</motion.span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link href="/category/tees-shirts" className="relative group">
                  <motion.span whileHover={{ y: -2 }} className="text-gray-700 hover:text-gray-900 font-medium">Tees & Shirts</motion.span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/category/hoodies-sweatshirts" className="relative group">
                  <motion.span whileHover={{ y: -2 }} className="text-gray-700 hover:text-gray-900 font-medium">Hoodies & Sweatshirts</motion.span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link href="/category/jeans-trousers" className="relative group">
                  <motion.span whileHover={{ y: -2 }} className="text-gray-700 hover:text-gray-900 font-medium">Jeans & Trousers</motion.span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/category/cargo" className="relative group">
                  <motion.span whileHover={{ y: -2 }} className="text-gray-700 hover:text-gray-900 font-medium">Cargo</motion.span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
          {/* Search and Cart right */}
          <div className="flex-1 flex justify-end items-center gap-4 relative">
            {/* Search Icon and Modal */}
            <div className="relative">
              <button
                aria-label="Open search"
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setShowSearchBar((v) => !v)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence>
                {showSearchBar && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-10 right-0 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-200 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg shadow"
                        autoFocus
                        autoComplete="off"
                      />
                      <button
                        aria-label="Close search"
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() => { setShowSearchBar(false); setShowResults(false); setSearch(""); }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full bg-white rounded-xl z-50 border border-gray-200 mt-2"
                        >
                          {searchLoading ? (
                            <div className="p-4 text-center text-gray-500">Searching...</div>
                          ) : searchResults.length > 0 ? (
                            <ul>
                              {searchResults.map((product: any) => (
                                <li key={product.id}>
                                  <Link href={`/product/${product.slug}`} className="block px-4 py-3 hover:bg-gray-100 transition-all" onClick={() => { setShowResults(false); setShowSearchBar(false); setSearch(""); }}>
                                    <div className="flex items-center gap-3">
                                      <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-10 h-10 object-cover rounded" />
                                      <div>
                                        <span className="font-semibold text-gray-800">{product.name}</span>
                                        <span className="block text-sm text-gray-500">{product.description?.slice(0, 60) || 'No description'}</span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="p-4 text-center text-gray-500">No products found.</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Cart */}
            <div>
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-gray-900/50 transition-shadow"
                >
                  Cart
                  <AnimatePresence>
                    {cart.itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.2 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                      >
                        {cart.itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}