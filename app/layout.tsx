import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCartButton from '@/components/FloatingCartButton';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'City High Styles - Premium Men\'s Fashion',
  description: 'Discover premium clothing for men. From graphic tees to hoodies, jeans, and more. Quality fashion at affordable prices.',
  keywords: ['city high styles', 'cityhighstyles', 'cityhighstyless', 'clothing', 'fashion', 'men\'s wear', 'hoodies', 'jeans', 'tees', 'Nigeria'],
  authors: [{ name: 'City High Styles' }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://cityhighstyles.vercel.app',
    siteName: 'City High Styles',
    title: 'City High Styles - Premium Men\'s Fashion',
    description: 'Discover premium clothing for men. Quality fashion at affordable prices.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'City High Styles - Premium Men\'s Fashion',
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <FloatingCartButton />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
