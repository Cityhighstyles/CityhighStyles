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
                Add Aura Essence to bag for ${selectedPrice.toFixed(2)}
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

          <article className="relative overflow-hidden rounded-[2rem] border border-[#2a3150] bg-gradient-to-br from-[#091438] via-[#071232] to-[#090f29] p-7 shadow-[0_28px_60px_rgba(5,10,30,0.6)] md:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_20%,rgba(210,105,255,0.18),transparent_45%)]" />
            <p className="relative inline-flex rounded-full bg-cyan-500/20 px-4 py-1 text-xs font-semibold tracking-wide text-cyan-300">
              Signature Collection
            </p>
            <h2 className="relative mt-5 font-display text-5xl leading-none text-[#f8dbe7] md:text-6xl">
              Aura Essence
            </h2>
            <p className="relative mt-5 max-w-md text-xl leading-relaxed text-[#c9bfd8]">
              A multidimensional fragrance captured in liquid light. Notes of crushed pearls and midnight jasmine.
            </p>

            <div className="relative mt-7 border-t border-white/12 pt-6">
              <p className="text-sm font-semibold tracking-wide text-[#8f96b4]">PRICE</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
                <p className="font-display text-6xl leading-none text-[#dce3ff]">${selectedPrice}</p>
                <div className="flex gap-2">
                  {(['50ml', '100ml'] as const).map((option) => {
                    const selected = size === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSize(option)}
                        aria-label={`Select ${option} size`}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selected
                            ? 'border-[#f5b6da] bg-[#f5b6da]/15 text-[#f3bfdc]'
                            : 'border-white/18 bg-transparent text-[#8c93b0] hover:border-white/35 hover:text-[#c9bfd8]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f3a7ce] to-[#f14ea3] px-6 py-4 text-sm font-bold tracking-wide text-white shadow-[0_12px_35px_rgba(241,78,163,0.45)] transition hover:brightness-105"
              aria-label={`Add Aura Essence ${size} to bag`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M7 8V7a5 5 0 0 1 10 0v1h2a1 1 0 0 1 1 1v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1h2Zm2 0h6V7a3 3 0 1 0-6 0v1Zm3 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
              ADD TO BAG
            </button>
          </article>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: 'Premium Tees', link: '/products', text: 'Crisp cuts and standout graphics.' },
            { title: 'Street Denim', link: '/products', text: 'Tailored comfort with city attitude.' },
            { title: 'Layered Essentials', link: '/products', text: 'Clean silhouettes for every season.' },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link}
              aria-label={`Browse ${item.title} collection`}
              className="theme-card rounded-3xl border border-white/35 p-6 transition hover:-translate-y-1"
            >
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
              {
                image: '/products/premium-hoodie/image-1768902282025-2.jpg',
                alt: 'Premium hoodie from CityHighStyles signature picks',
                href: '/product/premium-hoodie',
              },
              {
                image: '/products/classic-polo-shirt/image-1.jpg',
                alt: 'Classic polo shirt from CityHighStyles signature picks',
                href: '/product/classic-polo-shirt',
              },
              {
                image: '/products/essential-graphic-tee/image-1768847038726-1.jpg',
                alt: 'Essential graphic tee from CityHighStyles signature picks',
                href: '/product/essential-graphic-tee',
              },
            ].map((item) => (
              <Link key={item.image} href={item.href} className="overflow-hidden rounded-2xl border border-white/35">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={600}
                  height={700}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
