"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const NewHeroSection = () => {
  const [size, setSize] = useState<'50ml' | '100ml'>('50ml');
  const { addToCart } = useCart();

  const selectedPrice = size === '50ml' ? 145 : 210;

  const handleAddToBag = () => {
    addToCart({
      productId: 'aura-essence-signature-collection',
      name: 'Aura Essence',
      slug: 'aura-essence-signature-collection',
      price: selectedPrice,
      image: '/bottle.jpg',
      size,
      color: 'Signature',
    });
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-10">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--theme-hero)' }} />
      <div className="theme-sparkle h-32 w-32 left-[7%] top-[15%]" />
      <div className="theme-sparkle h-24 w-24 right-[11%] top-[20%]" />
      <div className="theme-sparkle h-28 w-28 right-[16%] bottom-[16%]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="theme-card rounded-[2rem] border border-white/35 p-7 md:p-10">
            <p className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-semibold tracking-[0.22em] text-[var(--theme-text-soft)]">
              CITYHIGHSTYLES NEW ERA
            </p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-[var(--theme-text)] md:text-7xl">
              Glass luxury with bold modern edge.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--theme-text-soft)]">
              Reimagined homepage built around our new color layout, soft depth, and premium motion-inspired glass cards.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToBag}
                className="rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold tracking-wide text-[var(--theme-bg)] transition hover:opacity-90"
                style={{ background: 'var(--theme-text)' }}
              >
                Add Aura Essence ${selectedPrice}
              </button>
              <Link
                href="/products"
                className="rounded-2xl border border-white/35 bg-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-[var(--theme-text)] transition hover:bg-white/30"
              >
                Browse Collection
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ['24H', 'Fast dispatch'],
                ['4.9', 'Customer rating'],
                ['100%', 'Premium quality'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/30 bg-white/25 px-4 py-4 backdrop-blur-xl">
                  <p className="font-display text-3xl text-[var(--theme-text)]">{value}</p>
                  <p className="text-sm text-[var(--theme-text-soft)]">{label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="theme-card rounded-[2rem] border border-white/35 p-6 md:p-8">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/35">
              <Image
                src="/hero-section-product.png"
                alt="CityHighStyles featured product"
                width={900}
                height={1100}
                priority
                className="h-[420px] w-full object-cover md:h-[500px]"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {(['50ml', '100ml'] as const).map((option) => {
                const selected = size === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-label={`Select ${option} size`}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selected ? 'border-white/70 bg-white/45 text-[var(--theme-text)]' : 'border-white/35 bg-white/20 text-[var(--theme-text-soft)]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </article>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: 'Premium Tees', link: '/products', text: 'Crisp cuts and standout graphics.' },
            { title: 'Street Denim', link: '/products', text: 'Tailored comfort with city attitude.' },
            { title: 'Layered Essentials', link: '/products', text: 'Clean silhouettes for every season.' },
          ].map((item) => (
            <Link key={item.title} href={item.link} className="theme-card rounded-3xl border border-white/35 p-6 transition hover:-translate-y-1">
              <p className="font-display text-3xl text-[var(--theme-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--theme-text-soft)]">{item.text}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/35 bg-white/25 p-6 backdrop-blur-xl md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-4xl text-[var(--theme-text)]">Signature Picks</h2>
            <Link href="/products" className="text-sm font-semibold tracking-wide text-[var(--theme-text-soft)]">
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              '/products/premium-hoodie/image-1768902282025-2.jpg',
              '/products/classic-polo-shirt/image-1.jpg',
              '/products/essential-graphic-tee/image-1768847038726-1.jpg',
            ].map((image, index) => (
              <div key={image} className="overflow-hidden rounded-2xl border border-white/35">
                <Image
                  src={image}
                  alt={`Signature product ${index + 1}`}
                  width={600}
                  height={700}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
