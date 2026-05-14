"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const NewHeroSection = () => {
  const [size, setSize] = useState<'50ml' | '100ml'>('50ml');
  const [sparkleMode, setSparkleMode] = useState(false);
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
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#040b1f] text-[#f2d8e6]">
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(89,125,255,0.18),transparent_32%),radial-gradient(circle_at_30%_60%,rgba(255,124,212,0.2),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(38,88,244,0.14),transparent_40%),linear-gradient(180deg,#050d25_0%,#060f2d_58%,#030818_100%)] ${
          sparkleMode ? 'opacity-100' : 'opacity-90'
        }`}
      />

      <div className="relative mx-auto w-full max-w-md px-5 pt-7 pb-36">
        <div className="mx-auto mt-10 w-full max-w-[320px] overflow-hidden rounded-none border border-white/10 bg-black/30 shadow-[0_0_70px_rgba(255,132,204,0.28)] sm:rounded-sm">
          <Image
            src="/bottle.jpg"
            alt="Aura Essence fragrance"
            width={800}
            height={1000}
            priority
            className="h-[320px] w-full object-cover"
          />
        </div>

        <div className="relative -mt-14 rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,rgba(38,48,86,0.85),rgba(17,24,56,0.8))] p-6 backdrop-blur-xl shadow-[0_22px_60px_rgba(12,18,51,0.6)]">
          <span className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/20 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-200">
            Signature Collection
          </span>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-[#f8ddea]">Aura Essence</h1>

          <p className="mt-4 text-xl leading-relaxed text-white/88">
            A multidimensional fragrance captured in liquid light. Notes of crushed pearls and midnight jasmine.
          </p>

          <div className="my-6 h-px w-full bg-white/15" />

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-[0.2em] text-white/60">PRICE</p>
              <p className="font-display text-6xl leading-none text-[#f8ddea]">${selectedPrice}</p>
            </div>

            <div className="flex gap-3 pb-2">
              {(['50ml', '100ml'] as const).map((option) => {
                const selected = size === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-label={`Select ${option} size`}
                    className={`h-16 w-16 rounded-full border text-sm font-semibold transition ${
                      selected
                        ? 'border-pink-300 text-pink-100 shadow-[0_0_22px_rgba(255,120,193,0.5)]'
                        : 'border-white/25 text-white/45'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToBag}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#f8a7d3] to-[#ef4fb0] px-5 py-4 text-xl font-bold tracking-wide text-white shadow-[0_12px_35px_rgba(239,79,176,0.45)] transition hover:opacity-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 7V6a4 4 0 118 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 9h12l-1 10H7L6 9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            ADD TO BAG
          </button>

          <Link
            href="/products"
            aria-label="View products"
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/5 px-5 py-4 text-lg font-semibold tracking-wide text-white/90 transition hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12l9-9 9 9-9 9-9-9z" stroke="currentColor" strokeWidth="2" />
              <path d="M9 12l3-3 3 3-3 3-3-3z" stroke="currentColor" strokeWidth="2" />
            </svg>
            VIEW PRODUCTS
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-3">
        <div className="pointer-events-auto flex w-full max-w-md items-center justify-around rounded-[1.7rem] border border-white/10 bg-[#0a1330]/85 px-5 py-4 backdrop-blur-xl">
          <Link href="/products" title="Shop" className="flex flex-col items-center gap-1 text-white/65 transition hover:text-white" aria-label="View products">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-[11px] font-medium">Shop</span>
          </Link>

          <Link href="/" title="Home" className="flex flex-col items-center gap-1 text-pink-200" aria-label="Home">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-[0_0_22px_rgba(255,159,216,0.52)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12l9-9 9 9-9 9-9-9z" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12l3-3 3 3-3 3-3-3z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <span className="text-[11px] font-medium">Home</span>
          </Link>

          <button
            type="button"
            onClick={() => setSparkleMode((prev) => !prev)}
            title="Toggle sparkle mode"
            className="flex flex-col items-center gap-1 text-white/65 transition hover:text-white"
            aria-label="Toggle glow mode"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-[11px] font-medium">Glow</span>
          </button>

          <Link href="/cart" title="Cart" className="flex flex-col items-center gap-1 text-white/65 transition hover:text-white" aria-label="Cart">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 8V7a4 4 0 118 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 9h12l-1 10H7L6 9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
