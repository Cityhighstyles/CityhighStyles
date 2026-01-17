import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'City High Styles - Premium Men\'s Fashion',
  description: 'Discover premium clothing for men. From graphic tees to hoodies, jeans, and more. Quality fashion at affordable prices.',
  keywords: ['clothing', 'fashion', 'men\'s wear', 'hoodies', 'jeans', 'tees', 'Nigeria'],
  authors: [{ name: 'City High Styles' }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://cityhighstyles.github.io',
    siteName: 'City High Styles',
    title: 'City High Styles - Premium Men\'s Fashion',
    description: 'Discover premium clothing for men. Quality fashion at affordable prices.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
