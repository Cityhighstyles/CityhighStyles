'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

interface HomePageClientProps {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  heroProduct: Product | null;
}

const BLOB_GRADIENTS = [
  'linear-gradient(135deg,#f751a1,#ffb0cd)',
  'linear-gradient(135deg,#571bc1,#d0bcff)',
  'linear-gradient(135deg,#009eb9,#4cd7f6)',
  'linear-gradient(135deg,#f751a1,#571bc1 50%,#4cd7f6)',
];

const CARD_BACKGROUNDS = [
  'linear-gradient(135deg,rgba(247,81,161,0.12),rgba(255,176,205,0.08))',
  'linear-gradient(135deg,rgba(87,27,193,0.12),rgba(208,188,255,0.08))',
  'linear-gradient(135deg,rgba(0,158,185,0.12),rgba(76,215,246,0.08))',
  'linear-gradient(135deg,rgba(247,81,161,0.1),rgba(87,27,193,0.1),rgba(76,215,246,0.08))',
];

const GLOW_CLASSES = ['glow-rose', 'glow-violet', 'glow-cyan', 'glow-mix'];

const CAT_ACCENTS = ['accent-rose', 'accent-violet', 'accent-cyan', 'accent-rose', 'accent-violet', 'accent-cyan'];
const CAT_ICONS = ['🌸', '✨', '💧', '🌿', '💎', '🧴'];
const CAT_TAGS = ['Most Loved', 'Trending', 'New Arrivals', 'Popular', 'Exclusive', 'Essential'];
const CAT_ICON_CLASSES = ['cat-icon-1', 'cat-icon-2', 'cat-icon-3', 'cat-icon-1', 'cat-icon-2', 'cat-icon-3'];
const MAX_SPOTLIGHT_DESCRIPTION_LENGTH = 140;

export default function HomePageClient({ products, categories, featuredProducts, heroProduct }: HomePageClientProps) {
  const { addToCart } = useCart();
  const [heroSize, setHeroSize] = useState(heroProduct?.sizes?.[0] ?? '');
  const [addedHero, setAddedHero] = useState(false);
  const [addedCards, setAddedCards] = useState<Record<string, boolean>>({});
  const spotlightProduct = featuredProducts[0] ?? heroProduct;

  const handleHeroAdd = () => {
    if (!heroProduct) return;
    addToCart({
      productId: heroProduct.id,
      slug: heroProduct.slug,
      name: heroProduct.name,
      price: heroProduct.price,
      image: heroProduct.images[0] ?? '',
      size: heroSize,
      color: heroProduct.colors[0] ?? '',
    });
    setAddedHero(true);
    setTimeout(() => setAddedHero(false), 2000);
  };

  const handleCardAdd = (product: Product) => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? '',
      size: product.sizes[0] ?? '',
      color: product.colors[0] ?? '',
    });
    setAddedCards((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedCards((prev) => ({ ...prev, [product.id]: false })), 1800);
  };

  return (
    <>
      <style>{`
        :root{
          --surface:#0b1326;
          --surface-dim:#060e20;
          --surface-bright:#31394d;
          --surface-container:#171f33;
          --surface-container-high:#222a3d;
          --on-surface:#dae2fd;
          --on-surface-variant:#debec8;
          --outline:#a68992;
          --outline-variant:#574048;
          --primary:#ffb0cd;
          --primary-container:#f751a1;
          --on-primary:#640039;
          --secondary:#d0bcff;
          --secondary-container:#571bc1;
          --tertiary:#4cd7f6;
          --tertiary-container:#009eb9;
          --glass-bg:rgba(23,31,51,0.55);
          --glass-bg-high:rgba(34,42,61,0.7);
          --glass-border:rgba(255,176,205,0.15);
          --glass-border-top:rgba(255,255,255,0.18);
        }
        .ethereal-bg{background:var(--surface-dim)!important}
        .ethereal-text{color:var(--on-surface)}
        .egl{
          background:var(--glass-bg);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border:1px solid var(--glass-border-top);
          border-bottom-color:rgba(247,81,161,0.12);
          border-right-color:rgba(87,27,193,0.1);
        }
        .egl-high{
          background:var(--glass-bg-high);
          backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
          border:1px solid rgba(255,255,255,0.14);
          border-bottom-color:rgba(247,81,161,0.18);
        }
        .aura-orb{
          position:absolute;border-radius:50%;filter:blur(90px);opacity:0.28;
          animation:edrift 18s ease-in-out infinite alternate;
          pointer-events:none;
        }
        @keyframes edrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(40px,60px) scale(1.1)}}
        .gradient-text{
          background:linear-gradient(135deg,#ffb0cd 0%,#d0bcff 50%,#4cd7f6 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .badge-dot{width:6px;height:6px;border-radius:50%;background:#ffb0cd;animation:epulse 2s infinite;display:inline-block}
        @keyframes epulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        .product-blob{
          width:120px;height:140px;
          border-radius:60% 40% 55% 45% / 55% 45% 55% 45%;
          animation:eblob 6s ease-in-out infinite;
        }
        @keyframes eblob{
          0%,100%{border-radius:60% 40% 55% 45% / 55% 45% 55% 45%}
          33%{border-radius:40% 60% 45% 55% / 45% 55% 45% 55%}
          66%{border-radius:55% 45% 60% 40% / 60% 40% 55% 45%}
        }
        .feat-blob{
          width:80px;height:90px;border-radius:50%;
          animation:eblob 8s ease-in-out infinite;
        }
        .float-chip{
          position:absolute;
          padding:10px 18px;border-radius:9999px;
          font-size:12px;font-weight:600;letter-spacing:0.05em;
          animation:efloat 4s ease-in-out infinite alternate;
          pointer-events:none;
        }
        @keyframes efloat{0%{transform:translateY(0)}100%{transform:translateY(-12px)}}
        .chip-1{top:-20px;right:-30px;background:rgba(76,215,246,0.15);border:1px solid rgba(76,215,246,0.3);color:#4cd7f6;animation-delay:0s}
        .chip-2{bottom:80px;left:-50px;background:rgba(208,188,255,0.15);border:1px solid rgba(208,188,255,0.3);color:#d0bcff;animation-delay:-2s}
        .chip-3{top:80px;left:-40px;background:rgba(255,176,205,0.15);border:1px solid rgba(255,176,205,0.3);color:#ffb0cd;animation-delay:-1s}
        .glow-pulse{animation:eglow 3s ease-in-out infinite alternate}
        @keyframes eglow{0%{opacity:0.6;transform:scale(1)}100%{opacity:1;transform:scale(1.15)}}
        .featured-3d-card{
          transform-style:preserve-3d;
          animation:f3dFloat 6s ease-in-out infinite;
        }
        @keyframes f3dFloat{
          0%,100%{transform:translateY(0) rotate(-1deg)}
          50%{transform:translateY(-12px) rotate(1deg)}
        }
        .featured-3d-bubble{
          position:absolute;border-radius:9999px;
          border:1px solid rgba(255,255,255,0.25);
          background:rgba(255,255,255,0.1);
          backdrop-filter:blur(8px);
          animation:f3dBubble 5s ease-in-out infinite;
        }
        @keyframes f3dBubble{
          0%,100%{transform:translateY(0);opacity:0.4}
          50%{transform:translateY(-10px);opacity:0.85}
        }
        .brands-track{
          display:flex;gap:60px;align-items:center;
          animation:emarquee 20s linear infinite;white-space:nowrap;
        }
        @keyframes emarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .cat-card{
          border-radius:20px;padding:40px 32px;
          position:relative;overflow:hidden;cursor:pointer;
          transition:transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          min-height:260px;
          display:flex;flex-direction:column;justify-content:flex-end;
        }
        .cat-card:hover{transform:translateY(-8px)}
        .cat-card::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(180deg,transparent 30%,rgba(6,14,32,0.85) 100%);
          border-radius:20px;
        }
        .cat-icon{
          width:64px;height:64px;border-radius:16px;
          display:flex;align-items:center;justify-content:center;font-size:28px;
          margin-bottom:60px;position:relative;z-index:1;
        }
        .cat-icon-1{background:rgba(247,81,161,0.2);border:1px solid rgba(247,81,161,0.3)}
        .cat-icon-2{background:rgba(208,188,255,0.2);border:1px solid rgba(208,188,255,0.3)}
        .cat-icon-3{background:rgba(76,215,246,0.2);border:1px solid rgba(76,215,246,0.3)}
        .cat-content{position:relative;z-index:1}
        .cat-tag{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px}
        .cat-card-accent{
          position:absolute;top:-30px;right:-30px;
          width:150px;height:150px;border-radius:50%;filter:blur(50px);opacity:0.3;
        }
        .accent-rose{background:#f751a1}
        .accent-violet{background:#571bc1}
        .accent-cyan{background:#009eb9}
        .feat-card{
          border-radius:20px;padding:28px;
          position:relative;overflow:hidden;cursor:pointer;
          transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .feat-card:hover{transform:translateY(-6px)}
        .feat-card:hover .feat-glow{opacity:1}
        .feat-img{
          width:100%;aspect-ratio:1;border-radius:14px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:20px;position:relative;overflow:hidden;
        }
        .feat-glow{
          position:absolute;inset:-20px;opacity:0;transition:opacity 0.4s;
          border-radius:14px;pointer-events:none;
        }
        .glow-rose{background:radial-gradient(circle at center,rgba(247,81,161,0.15),transparent 70%)}
        .glow-violet{background:radial-gradient(circle at center,rgba(87,27,193,0.15),transparent 70%)}
        .glow-cyan{background:radial-gradient(circle at center,rgba(0,158,185,0.15),transparent 70%)}
        .glow-mix{background:radial-gradient(circle at center,rgba(247,81,161,0.12),transparent 70%)}
        .feat-badge{
          position:absolute;top:12px;right:12px;
          padding:4px 10px;border-radius:9999px;
          font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;
        }
        .badge-new{background:rgba(76,215,246,0.2);border:1px solid rgba(76,215,246,0.4);color:#4cd7f6}
        .badge-best{background:rgba(247,81,161,0.2);border:1px solid rgba(247,81,161,0.4);color:#ffb0cd}
        .badge-sale{background:rgba(208,188,255,0.2);border:1px solid rgba(208,188,255,0.4);color:#d0bcff}
        .ritual-step{
          display:flex;gap:20px;align-items:flex-start;
          padding:20px;border-radius:16px;
          background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
          transition:all 0.3s;cursor:pointer;
        }
        .ritual-step:hover{background:rgba(247,81,161,0.06);border-color:rgba(247,81,161,0.2)}
        .step-num{
          width:36px;height:36px;border-radius:50%;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;
        }
        .step-num-1{background:rgba(247,81,161,0.2);border:1px solid rgba(247,81,161,0.4);color:#ffb0cd}
        .step-num-2{background:rgba(208,188,255,0.2);border:1px solid rgba(208,188,255,0.4);color:#d0bcff}
        .step-num-3{background:rgba(76,215,246,0.2);border:1px solid rgba(76,215,246,0.4);color:#4cd7f6}
        .test-card::before{
          content:'"';position:absolute;top:16px;right:24px;
          font-family:'Playfair Display',serif;font-size:80px;line-height:1;
          color:rgba(247,81,161,0.12);font-weight:700;
        }
        .nl-input{
          flex:1;padding:14px 22px;border-radius:12px;
          background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.18);
          color:#dae2fd;font-size:15px;
          backdrop-filter:blur(10px);
          transition:all 0.3s;
        }
        .nl-input::placeholder{color:#a68992}
        .nl-input:focus{outline:none;border-color:rgba(247,81,161,0.5);background:rgba(255,255,255,0.1);box-shadow:0 0 0 3px rgba(247,81,161,0.1)}
        @media(max-width:600px){.float-chip{display:none}}
      `}</style>

      <div className="ethereal-bg" style={{ background: 'var(--surface-dim)', minHeight: '100vh' }}>

        {/* AMBIENT ORBS */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="aura-orb" style={{ width: 700, height: 700, background: 'radial-gradient(circle,#f751a1,transparent 70%)', top: -200, left: -200, animationDelay: '0s' }} />
          <div className="aura-orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle,#571bc1,transparent 70%)', top: '30%', right: -150, animationDelay: '-6s' }} />
          <div className="aura-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle,#009eb9,transparent 70%)', bottom: -100, left: '20%', animationDelay: '-12s' }} />
          <div className="aura-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle,#d0bcff,transparent 70%)', bottom: '20%', right: '10%', animationDelay: '-4s', opacity: 0.18 }} />
        </div>

        {/* HERO */}
        <section style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '120px 80px 80px', gap: 60, minHeight: '100vh' }} className="max-lg:grid-cols-1 max-lg:px-10 max-md:px-5">
          {/* Hero Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(247,81,161,0.15)', border: '1px solid rgba(247,81,161,0.3)', borderRadius: 9999, padding: '6px 16px', marginBottom: 28, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#ffb0cd' }}>
              <span className="badge-dot" />
              New Collection — {categories[0]?.title ?? 'Premium Fashion'}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px,5.5vw,72px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 24, color: '#dae2fd' }}
            >
              Style Beyond<br />
              <span className="gradient-text">Dimension</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontSize: 17, lineHeight: 1.7, color: '#debec8', maxWidth: 480, marginBottom: 44 }}
            >
              Premium clothing crafted for men who demand quality and style. From everyday essentials to statement pieces — every item tells a story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Link
                href="/products"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#f751a1,#571bc1)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 0 40px rgba(247,81,161,0.4)', transition: 'all 0.3s' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Shop Now
              </Link>
              <Link
                href="/cart"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#debec8', fontSize: 15, fontWeight: 500, textDecoration: 'none', padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)', transition: 'all 0.3s' }}
              >
                View Cart
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: 'flex', gap: 40, marginTop: 52, flexWrap: 'wrap' }}
            >
              {[
                { num: products.length.toString(), label: 'Products Available' },
                { num: categories.length.toString(), label: 'Style Categories' },
                { num: '100%', label: 'Premium Quality' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, background: 'linear-gradient(135deg,#ffb0cd,#d0bcff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{num}</div>
                  <div style={{ fontSize: 12, color: '#a68992', fontWeight: 500, letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual — Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="float-chip chip-1">Clean Fashion</div>
            <div className="float-chip chip-2">Premium Quality</div>
            <div className="float-chip chip-3">City Style</div>

            {heroProduct ? (
              <div className="egl" style={{ width: 320, padding: '36px 32px', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
                <div className="glow-pulse" style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(247,81,161,0.4),transparent 70%)', filter: 'blur(40px)' }} />

                {/* Product Image */}
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: 16, background: 'linear-gradient(135deg,rgba(247,81,161,0.12),rgba(87,27,193,0.15),rgba(0,158,185,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                  {heroProduct.images[0] ? (
                    <Image
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  ) : (
                    <div style={{ width: 160, height: 160, background: 'linear-gradient(160deg,rgba(255,176,205,0.2),rgba(208,188,255,0.15))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="product-blob" style={{ background: 'linear-gradient(135deg,#f751a1,#d0bcff 60%,#4cd7f6)' }} />
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#4cd7f6', textTransform: 'uppercase', marginBottom: 8 }}>
                    {categories.find(c => c.slug === heroProduct.category)?.title ?? heroProduct.category}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 8, color: '#dae2fd' }}>{heroProduct.name}</div>
                  <div style={{ fontSize: 13, color: '#debec8', lineHeight: 1.6, marginBottom: 20 }}>
                    {heroProduct.description.length > 90 ? heroProduct.description.slice(0, 90) + '…' : heroProduct.description}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: '#a68992', marginBottom: 4 }}>PRICE</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#dae2fd' }}>{formatPrice(heroProduct.price)}</div>
                    </div>
                    {heroProduct.sizes.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {heroProduct.sizes.slice(0, 3).map((s) => (
                          <button
                            key={s}
                            onClick={() => setHeroSize(s)}
                            style={{
                              padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.25s',
                              background: heroSize === s ? 'rgba(247,81,161,0.2)' : 'transparent',
                              borderColor: heroSize === s ? '#ffb0cd' : '#574048',
                              color: heroSize === s ? '#ffb0cd' : '#debec8',
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleHeroAdd}
                    disabled={!heroProduct.inStock}
                    style={{
                      width: '100%', padding: 14, borderRadius: 12,
                      background: addedHero ? 'linear-gradient(135deg,#009eb9,#4cd7f6)' : 'linear-gradient(135deg,#f751a1,#571bc1)',
                      color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: heroProduct.inStock ? 'pointer' : 'not-allowed',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      boxShadow: '0 0 30px rgba(247,81,161,0.35)', transition: 'all 0.3s',
                      opacity: heroProduct.inStock ? 1 : 0.6,
                    }}
                  >
                    {addedHero ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                        Added!
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        {heroProduct.inStock ? 'Add to Bag' : 'Out of Stock'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="egl" style={{ width: 320, padding: '60px 32px', borderRadius: 24, textAlign: 'center', color: '#a68992' }}>
                No products available yet
              </div>
            )}
          </motion.div>
        </section>

        {/* BRANDS MARQUEE */}
        <div style={{ padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: 'rgba(6,14,32,0.5)', position: 'relative', zIndex: 2 }}>
          <div className="brands-track">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: '#a68992', letterSpacing: '0.05em', flexShrink: 0, cursor: 'pointer', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>
                {i > 0 && i % 1 === 0 ? <span style={{ margin: '0 30px', opacity: 0.5 }}>·</span> : null}
                {cat.title}
              </span>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <section style={{ padding: '100px 80px', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 16 }}>
            Explore Our Collection
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: 60, color: '#dae2fd' }}>
            Every Style <em style={{ fontStyle: 'italic', color: '#ffb0cd' }}>Dimension</em> Covered
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
            {categories.map((cat, i) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  className="cat-card egl"
                  whileHover={{ y: -8 }}
                  style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}
                >
                  <div className={`cat-card-accent ${CAT_ACCENTS[i % CAT_ACCENTS.length]}`} />

                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover"
                      style={{ zIndex: 0, borderRadius: 20 }}
                      sizes="320px"
                    />
                  ) : null}

                  <div className={`cat-icon ${CAT_ICON_CLASSES[i % CAT_ICON_CLASSES.length]}`} style={{ position: 'relative', zIndex: 1 }}>
                    {CAT_ICONS[i % CAT_ICONS.length]}
                  </div>

                  <div className="cat-content">
                    <div className="cat-tag" style={{ color: i % 3 === 0 ? '#ffb0cd' : i % 3 === 1 ? '#d0bcff' : '#4cd7f6' }}>
                      {CAT_TAGS[i % CAT_TAGS.length]}
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, marginBottom: 6, color: '#dae2fd' }}>{cat.title}</div>
                    <div style={{ fontSize: 13, color: '#debec8' }}>{cat.description}</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        {spotlightProduct && (
          <section style={{ padding: '0 80px 100px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 16 }}>
              Featured Product
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: 60, color: '#dae2fd' }}>
              Signature <em style={{ fontStyle: 'italic', color: '#ffb0cd' }}>Spotlight</em>
            </h2>
            <div
              className="egl max-lg:grid-cols-1"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 30,
                padding: '44px 36px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 36,
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'absolute', top: -90, right: -70, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(247,81,161,0.25),transparent 70%)', filter: 'blur(70px)' }} />
              <div style={{ position: 'absolute', bottom: -80, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(87,27,193,0.22),transparent 70%)', filter: 'blur(70px)' }} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 9999, background: 'rgba(247,81,161,0.15)', border: '1px solid rgba(247,81,161,0.28)', fontSize: 11, fontWeight: 600, color: '#ffb0cd', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                  <span className="badge-dot" />
                  Spotlight Item
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1.12, marginBottom: 14, color: '#dae2fd' }}>
                  {spotlightProduct.name}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#debec8', marginBottom: 22, maxWidth: 460 }}>
                  {spotlightProduct.description.length > MAX_SPOTLIGHT_DESCRIPTION_LENGTH
                    ? `${spotlightProduct.description.slice(0, MAX_SPOTLIGHT_DESCRIPTION_LENGTH)}…`
                    : spotlightProduct.description}
                </p>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 10 }}>
                  {categories.find(c => c.slug === spotlightProduct.category)?.title ?? spotlightProduct.category}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: '#ffb0cd', marginBottom: 20 }}>
                  {formatPrice(spotlightProduct.price)}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleCardAdd(spotlightProduct)}
                    disabled={!spotlightProduct.inStock}
                    style={{
                      padding: '12px 24px',
                      borderRadius: 12,
                      border: 'none',
                      cursor: spotlightProduct.inStock ? 'pointer' : 'not-allowed',
                      background: addedCards[spotlightProduct.id] ? 'linear-gradient(135deg,#009eb9,#4cd7f6)' : 'linear-gradient(135deg,#f751a1,#571bc1)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 14,
                      opacity: spotlightProduct.inStock ? 1 : 0.6,
                    }}
                  >
                    {addedCards[spotlightProduct.id] ? 'Added!' : spotlightProduct.inStock ? 'Add to Bag' : 'Out of Stock'}
                  </button>
                  <Link
                    href={`/product/${spotlightProduct.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 24px',
                      borderRadius: 12,
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.22)',
                      color: '#debec8',
                      fontWeight: 600,
                      fontSize: 14,
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}
              >
                <div className="featured-3d-card" style={{ position: 'relative', width: 'min(380px,100%)' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 24, background: 'radial-gradient(circle at 50% 20%,rgba(247,81,161,0.18),transparent 60%)', filter: 'blur(20px)' }} />
                  <div className="featured-3d-bubble" style={{ width: 26, height: 26, top: 8, left: 10, animationDelay: '0s' }} />
                  <div className="featured-3d-bubble" style={{ width: 18, height: 18, top: '26%', right: -6, animationDelay: '-1.2s' }} />
                  <div className="featured-3d-bubble" style={{ width: 32, height: 32, bottom: 12, left: -10, animationDelay: '-0.6s' }} />
                  <div className="featured-3d-bubble" style={{ width: 14, height: 14, bottom: '35%', right: 12, animationDelay: '-1.8s' }} />
                  <div style={{ position: 'relative', borderRadius: 24, padding: 22, background: 'linear-gradient(140deg,rgba(247,81,161,0.13),rgba(87,27,193,0.17),rgba(6,14,32,0.62))', border: '1px solid rgba(255,255,255,0.18)' }}>
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: 16, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(247,81,161,0.15),rgba(87,27,193,0.2),rgba(0,158,185,0.16))' }}>
                      {spotlightProduct.images[0] ? (
                        <Image
                          src={spotlightProduct.images[0]}
                          alt={spotlightProduct.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 380px"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="product-blob" style={{ background: 'linear-gradient(135deg,#f751a1,#d0bcff 60%,#4cd7f6)' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <Link
                href="/products"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)', color: '#debec8', fontWeight: 600, fontSize: 15, padding: '14px 36px', borderRadius: 12, textDecoration: 'none', transition: 'all 0.3s' }}
              >
                View All Products
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>
          </section>
        )}

        {/* RITUAL / ABOUT SECTION */}
        <section style={{ padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <div className="egl-high" style={{ borderRadius: 28, padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { n: '1', cls: 'step-num-1', title: 'Discover Your Style', body: 'Browse our curated categories — from tees to hoodies, jeans, shorts, and exclusive two-piece sets.' },
                  { n: '2', cls: 'step-num-2', title: 'Select Your Fit', body: 'Choose your size and colour. Every item is available in multiple fits tailored for the modern man.' },
                  { n: '3', cls: 'step-num-3', title: 'Order via WhatsApp', body: 'Add to cart and complete your order directly through WhatsApp with our team — fast and personal.' },
                ].map(({ n, cls, title, body }) => (
                  <div key={n} className="ritual-step">
                    <div className={`step-num ${cls}`}>{n}</div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: '#dae2fd' }}>{title}</h4>
                      <p style={{ fontSize: 13, color: '#debec8', lineHeight: 1.5 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}>
                {[
                  { cls: 'rb-clean', style: { background: 'rgba(76,215,246,0.1)', borderColor: 'rgba(76,215,246,0.25)', color: '#4cd7f6' }, label: 'Premium Quality' },
                  { cls: 'rb-cruelty', style: { background: 'rgba(208,188,255,0.1)', borderColor: 'rgba(208,188,255,0.25)', color: '#d0bcff' }, label: 'Fast Dispatch' },
                  { cls: 'rb-vegan', style: { background: 'rgba(247,81,161,0.1)', borderColor: 'rgba(247,81,161,0.25)', color: '#ffb0cd' }, label: 'WhatsApp Orders' },
                ].map(({ style, label }) => (
                  <span key={label} style={{ padding: '8px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 600, border: '1px solid', ...style }}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 16 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: 24, color: '#dae2fd' }}>
              Your Shopping <em style={{ fontStyle: 'italic', color: '#ffb0cd' }}>Ritual</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#debec8', marginBottom: 36 }}>
              City High Styles is your destination for premium men&apos;s fashion. We bring you carefully curated pieces with quality fabrics and modern fits — delivered to your doorstep with a personal touch.
            </p>
            <Link
              href="/products"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#f751a1,#571bc1)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 0 40px rgba(247,81,161,0.4)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              Browse the Collection
            </Link>
          </div>
        </section>

        {/* ALL PRODUCTS PREVIEW (non-featured) */}
        {products.filter(p => !p.featured && p.inStock).length > 0 && (
          <section style={{ padding: '0 80px 100px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 16 }}>
              More Styles
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: 60, color: '#dae2fd' }}>
              Also In The <em style={{ fontStyle: 'italic', color: '#ffb0cd' }}>Store</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
              {products.filter(p => !p.featured && p.inStock).slice(0, 8).map((product, i) => (
                <motion.div
                  key={product.id}
                  className="feat-card egl"
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="feat-img" style={{ background: CARD_BACKGROUNDS[i % CARD_BACKGROUNDS.length] }}>
                      <div className={`feat-glow ${GLOW_CLASSES[i % GLOW_CLASSES.length]}`} />
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          style={{ borderRadius: 14 }}
                          sizes="280px"
                        />
                      ) : (
                        <div className="feat-blob" style={{ background: BLOB_GRADIENTS[i % BLOB_GRADIENTS.length] }} />
                      )}
                      {!product.inStock && (
                        <div className="feat-badge" style={{ background: 'rgba(100,100,100,0.5)', border: '1px solid rgba(150,150,150,0.4)', color: '#ccc' }}>
                          Sold Out
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 4, color: '#dae2fd' }}>{product.name}</div>
                    <div style={{ fontSize: 12, color: '#debec8', marginBottom: 14 }}>
                      {categories.find(c => c.slug === product.category)?.title ?? product.category}
                    </div>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#dae2fd' }}>{formatPrice(product.price)}</div>
                    <button
                      onClick={() => handleCardAdd(product)}
                      disabled={!product.inStock}
                      aria-label="Add to cart"
                      style={{
                        width: 36, height: 36, borderRadius: 9999,
                        background: addedCards[product.id] ? 'rgba(247,81,161,0.4)' : 'rgba(247,81,161,0.15)',
                        border: '1px solid rgba(247,81,161,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: product.inStock ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s',
                      }}
                    >
                      {addedCards[product.id] ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" stroke="#ffb0cd" fill="none" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" stroke="#f751a1" fill="none" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* NEWSLETTER */}
        <section style={{ margin: '0 80px 100px', position: 'relative', zIndex: 2 }}>
          <div className="egl" style={{ borderRadius: 32, padding: 80, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(247,81,161,0.25),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(87,27,193,0.25),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4cd7f6', marginBottom: 16 }}>
                Stay Updated
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: 16, color: '#dae2fd' }}>
                Chat With Us on <em style={{ fontStyle: 'italic', color: '#ffb0cd' }}>WhatsApp</em>
              </h2>
              <p style={{ fontSize: 16, color: '#debec8', marginBottom: 44, lineHeight: 1.6 }}>
                Questions about sizing, availability, or want to place an order?<br />
                Our team is ready to assist you directly.
              </p>
              <a
                href="https://wa.me/2347046625465"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#25d366,#128c7e)', color: '#fff', fontWeight: 600, fontSize: 16, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 0 40px rgba(37,211,102,0.35)', transition: 'all 0.3s' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Message Us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
