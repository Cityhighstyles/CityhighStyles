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

  // Disable body scroll when menu is open
  useState(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-200/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 w-full">
          {/* Hamburger (mobile only) */}
          <div className="flex-1 flex items-center md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 mr-2"
              onClick={() => setIsOpen((v) => !v)}
            >
              {/* Hamburger icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
          {/* Logo center (always centered) */}
          <div className="flex-1 flex justify-center items-center absolute left-0 right-0 mx-auto pointer-events-none select-none">
            <Link href="/" className="group pointer-events-auto select-auto">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl md:text-2xl font-bold text-black"
              >
                City High Styles
              </motion.span>
            </Link>
          </div>
          {/* Cart right (mobile and desktop) */}
          <div className="flex-1 flex justify-end items-center gap-4 relative">
            {/* Hide search icon on mobile */}
            <div className="relative hidden md:block">
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
            {/* Cart icon (bag) */}
            <div className="relative">
              <Link href="/cart">
                <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="9" cy="21" r="1.5" />
                    <circle cx="19" cy="21" r="1.5" />
                    <path d="M2 3h2l2.4 12.29A2 2 0 0 0 8.4 17h7.2a2 2 0 0 0 1.98-1.71L21 6H6" />
                    </svg>
                  <span className="absolute -top-2 -right-2 bg-cyan-400 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
                    {cart.itemCount}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 md:hidden"
              >
                <button
                  aria-label="Close menu"
                  className="mb-6 p-2 rounded hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                {/* Search Input */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 text-base"
                    autoComplete="off"
                  />
                  {showResults && searchResults.length > 0 && (
                    <div className="mt-2 bg-white rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                      {searchResults.map((product: any) => (
                        <Link key={product.id} href={`/product/${product.slug}`} className="block px-3 py-2 hover:bg-gray-100 transition-all" onClick={() => { setShowResults(false); setIsOpen(false); setSearch(""); }}>
                          <div className="flex items-center gap-2">
                            <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-8 h-8 object-cover rounded" />
                            <div className="text-sm">
                              <span className="font-semibold text-gray-800">{product.name}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <nav className="flex flex-col gap-6">
                <Link href="/" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/category/tees-shirts" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Tees & Shirts</Link>
                <Link href="/category/hoodies-sweatshirts" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Hoodies & Sweatshirts</Link>
                <Link href="/category/jeans-trousers" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Jeans & Trousers</Link>
                <Link href="/category/cargo" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Cargo</Link>
              </nav>
            </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* Desktop Menu (center) */}
        <div className="hidden md:flex justify-center items-center mt-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
            <Link href="/category/tees-shirts" className="text-gray-700 hover:text-gray-900 font-medium">Tees & Shirts</Link>
            <Link href="/category/hoodies-sweatshirts" className="text-gray-700 hover:text-gray-900 font-medium">Hoodies & Sweatshirts</Link>
            <Link href="/category/jeans-trousers" className="text-gray-700 hover:text-gray-900 font-medium">Jeans & Trousers</Link>
            <Link href="/category/cargo" className="text-gray-700 hover:text-gray-900 font-medium">Cargo</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}