'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            City High Styles
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/category/tees" className="text-gray-700 hover:text-gray-900">
              Tees
            </Link>
            <Link href="/category/hoodies" className="text-gray-700 hover:text-gray-900">
              Hoodies
            </Link>
            <Link href="/category/jeans" className="text-gray-700 hover:text-gray-900">
              Jeans
            </Link>
            <Link href="/category/cargo" className="text-gray-700 hover:text-gray-900">
              Cargo
            </Link>
            <Link
              href="/cart"
              className="relative bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Cart
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/category/tees"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Tees
            </Link>
            <Link
              href="/category/hoodies"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Hoodies
            </Link>
            <Link
              href="/category/jeans"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Jeans
            </Link>
            <Link
              href="/category/cargo"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Cargo
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-gray-700 hover:text-gray-900 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cart.itemCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
