'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  images?: string[];
};

export default function Navbar() {
  const { cart } = useCart();

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Search state
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Search handler
  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/products');
      const products: Product[] = await res.json();

      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.description?.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filtered);
      setShowResults(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function resetSearch() {
    setSearch('');
    setResults([]);
    setShowResults(false);
    setSearchOpen(false);
  }

  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-md bg-white/15 border-b border-white/20">
      <div className="container mx-auto px-4">

        {/* Top Bar */}
        <div className="flex items-center h-20 relative">

          {/* Mobile Hamburger */}
          <div className="flex-1 md:flex-none">
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 hover:bg-white/35 rounded-lg transition">
              <span className="text-2xl" style={{ color: 'var(--theme-text)' }}>☰</span>
            </button>
          </div>

          {/* Logo - Left */}
          <div className="flex-1 md:flex-none flex items-center gap-3 pointer-events-auto">
            <Link href="/" className="pointer-events-auto relative z-50">
              <motion.div 
                whileHover={{ scale: 1.08 }} 
                className="flex items-center gap-2"
              >
                <Image 
                  src="/logo.png" 
                  alt="Skincare Brand" 
                  width={40} 
                  height={40}
                  className="h-10 w-auto relative z-50"
                />
                <span className="hidden sm:block text-lg font-semibold tracking-wide" style={{ color: 'var(--theme-text)' }}>
                  AURYA
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden lg:flex justify-center flex-1 gap-10">
            <NavLink href="/products">Shop</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right Icons */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">

            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <button 
                onClick={() => setSearchOpen(v => !v)} 
                className="p-2 hover:bg-white/25 rounded-lg transition"
              >
                🔍
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-10 w-80 bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-4"
                  >
                    <div className="flex gap-2">
                      <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search skincare products..."
                        className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80"
                        autoFocus
                      />
                      <button 
                        onClick={resetSearch}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Results */}
                    {showResults && (
                      <div className="mt-3 border border-gray-200 rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">

                        {loading && (
                          <div className="p-6 text-center text-gray-500">Searching...</div>
                        )}

                        {!loading && results.length === 0 && (
                          <div className="p-6 text-center text-gray-500">
                            No products found
                          </div>
                        )}

                        {!loading && results.map((p) => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={resetSearch}
                            className="flex gap-4 p-4 items-start hover:bg-cyan-50 transition border-b last:border-b-0"
                          >
                            {/* Image */}
                            <img
                              src={p.images?.[0] || '/placeholder.png'}
                              className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                              alt={p.name}
                            />

                            {/* Text */}
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 leading-tight">
                                {p.name}
                              </div>

                              {p.description && (
                                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {p.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}

                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-white/25 rounded-lg transition"
              >
                <span className="text-2xl">💎</span>
              </motion.div>
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {cart.itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/products"
              className="hidden md:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition hover:opacity-90"
              style={{
                background: 'var(--theme-text)',
                color: 'var(--cloud-white)',
                boxShadow: '0 14px 24px rgba(45, 10, 49, 0.22)',
              }}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 w-64 h-full bg-white/98 backdrop-blur-sm z-40 p-6 border-r border-gray-200"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
            >
              <button 
                onClick={() => setMenuOpen(false)} 
                className="mb-6 p-2 hover:bg-gray-100 rounded-lg transition"
              >
                ✕
              </button>

              {/* Mobile Search */}
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search skincare..."
                className="w-full border border-gray-200 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              {/* Mobile Results */}
              {showResults && results.length > 0 && (
                <div className="border border-gray-200 rounded-lg mb-4 max-h-60 overflow-auto">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => {
                        setMenuOpen(false);
                        resetSearch();
                      }}
                      className="flex gap-3 p-3 items-center hover:bg-cyan-50 border-b last:border-b-0 transition"
                    >
                      <img
                        src={p.images?.[0] || '/placeholder.png'}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        alt={p.name}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        {p.description && (
                          <div className="text-sm text-gray-600 line-clamp-1">
                            {p.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <nav className="flex flex-col gap-4 border-t border-gray-200 pt-4">
                <NavLink href="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink>
                <NavLink href="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                <NavLink href="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-medium tracking-wide transition hover:opacity-70"
      style={{ color: 'var(--theme-text-soft)' }}
    >
      {children}
    </Link>
  );
}
