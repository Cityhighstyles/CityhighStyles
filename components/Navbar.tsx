'use client';

import Link from 'next/link';
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
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">

        {/* Top Bar */}
        <div className="flex items-center h-20 relative">

          {/* Mobile Hamburger */}
          <div className="flex-1 md:hidden">
            <button onClick={() => setMenuOpen(true)} className="p-2">
              ☰
            </button>
          </div>

          {/* Logo (always centered) */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <Link href="/" className="pointer-events-auto">
              <motion.span whileHover={{ scale: 1.05 }} className="text-xl md:text-2xl font-bold">
                City High Styles
              </motion.span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <button onClick={() => setSearchOpen(v => !v)} className="p-2">
                🔍
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-10 w-80 bg-white border rounded-xl shadow-lg p-4"
                  >
                    <div className="flex gap-2">
                      <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search products..."
                        className="w-full border px-3 py-2 rounded-lg"
                        autoFocus
                      />
                      <button onClick={resetSearch}>✕</button>
                    </div>

                    {/* Results */}
                    {/* Results */}
{showResults && (
  <div className="mt-3 border rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">

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
        className="flex gap-4 p-4 items-start hover:bg-gray-50 transition border-b last:border-b-0"
      >
        {/* Image */}
        <img
          src={p.images?.[0] || '/placeholder.png'}
          className="w-14 h-14 object-cover rounded-lg border"
          alt={p.name}
        />

        {/* Text */}
        <div className="flex-1">
          <div className="font-semibold text-gray-900 leading-tight">
            {p.name}
          </div>

          {p.description && (
            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
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
              🛒
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cart.itemCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex justify-center gap-8 py-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/category/tees-shirts">Tees & Shirts</NavLink>
          <NavLink href="/category/hoodies-sweatshirts">Hoodies & Sweatshirts</NavLink>
          <NavLink href="/category/jeans-trousers">Jeans & Trousers</NavLink>
          <NavLink href="/category/cargo">Cargo</NavLink>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-6"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
            >
              <button onClick={() => setMenuOpen(false)} className="mb-6">✕</button>

              {/* Mobile Search */}
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full border px-3 py-2 rounded mb-4"
              />

              {/* Mobile Results */}
              {showResults && results.length > 0 && (
                <div className="border rounded mb-4 max-h-60 overflow-auto">
                  {results.map((p) => (
  <Link
    key={p.id}
    href={`/product/${p.slug}`}
    onClick={() => {
      setMenuOpen(false);
      resetSearch();
    }}
    className="flex gap-3 p-3 items-center hover:bg-gray-50 border-b last:border-b-0"
  >
    <img
      src={p.images?.[0] || '/placeholder.png'}
      className="w-12 h-12 object-cover rounded-lg border"
      alt={p.name}
    />
    <div>
      <div className="font-medium">{p.name}</div>
      <div className="text-sm text-gray-500 line-clamp-1">
        {p.description}
      </div>
    </div>
  </Link>
))}

              <nav className="flex flex-col gap-4">
                <NavLink href="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink href="/category/tees-shirts" onClick={() => setMenuOpen(false)}>Tees & Shirts</NavLink>
                <NavLink href="/category/hoodies-sweatshirts" onClick={() => setMenuOpen(false)}>Hoodies & Sweatshirts</NavLink>
                <NavLink href="/category/jeans-trousers" onClick={() => setMenuOpen(false)}>Jeans & Trousers</NavLink>
                <NavLink href="/category/cargo" onClick={() => setMenuOpen(false)}>Cargo</NavLink>
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
      className="text-gray-700 hover:text-black font-medium"
    >
      {children}
    </Link>
  );
}
