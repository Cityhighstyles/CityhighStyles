import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">City High Styles</h3>
            <p className="text-gray-400 text-sm">
              Premium men's fashion. Quality clothing at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/tees" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/tees" className="text-gray-400 hover:text-white">
                  Tees
                </Link>
              </li>
              <li>
                <Link href="/category/hoodies" className="text-gray-400 hover:text-white">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/category/jeans" className="text-gray-400 hover:text-white">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="/category/cargo" className="text-gray-400 hover:text-white">
                  Cargo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm mb-2">
              WhatsApp: +234 704 662 5465
            </p>
            <a
              href="https://wa.me/2347046625465"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} City High Styles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
