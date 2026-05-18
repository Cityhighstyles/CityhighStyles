import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCartButton from '@/components/FloatingCartButton';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GLOWÈ COLLECTION - Luxury Fashion',
  description: 'Luxury fashion for bold and confident women.',
  keywords: ['glowè collection', 'glowe collection', 'luxury fashion', 'women\'s fashion', 'luxury', 'confidence', 'style'],
  authors: [{ name: 'GLOWÈ COLLECTION' }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://cityhighstyles.vercel.app',
    siteName: 'GLOWÈ COLLECTION',
    title: 'GLOWÈ COLLECTION - Luxury Fashion',
    description: 'Luxury fashion for bold and confident women.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GLOWÈ COLLECTION - Luxury Fashion',
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
      <body className={`${montserrat.variable} ${playfairDisplay.variable}`}>
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
