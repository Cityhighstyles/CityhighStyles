'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 overflow-hidden">
      {/* Static background blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="w-full px-6 md:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* About */}
          <div className="flex-1 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              City High Styles
            </h3>
            <p className="text-gray-400 text-base md:text-lg">
              Premium men's fashion. Quality clothing at affordable prices.
            </p>
          </div>

          {/* Store Address */}
          <div className="flex-1 text-center md:text-left animate-fade-in-up delay-100">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">VISIT OUR STORE</h3>
            <p className="text-gray-400 text-base md:text-lg">
              📍 Chris Akinro Cl, Lekki Penninsula II, Lekki<br />106104, Lagos
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 animate-fade-in-up delay-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-base md:text-lg">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home →
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Shop →
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 animate-fade-in-up delay-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-base md:text-lg mb-3">WhatsApp: +234 704 662 5465</p>

            <a
              href="https://wa.me/2347046625465"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl text-base md:text-lg transition-transform hover:scale-[1.03] active:scale-[0.97] mb-3"
            >
              Chat on WhatsApp
            </a>

            <br />

            <a
              href="https://www.instagram.com/cityhighstyless"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-xl text-base md:text-lg transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-base md:text-lg text-gray-400 animate-fade-in-up delay-500">
          <p>&copy; {currentYear} City High Styles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
