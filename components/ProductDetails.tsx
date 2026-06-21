'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    });

    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div>
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-gray-900' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div>
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            {' / '}
            <Link href={`/category/${product.category}`} className="hover:text-gray-900 capitalize">
              {product.category}
            </Link>
            {' / '}
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Size:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Color:</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedColor === color
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-4 rounded-lg font-semibold text-lg mb-4 ${
              product.inStock
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="font-medium w-24">Fabric:</dt>
                <dd className="text-gray-700">{product.details.fabric}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium w-24">Care:</dt>
                <dd className="text-gray-700">{product.details.care}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium w-24">Fit:</dt>
                <dd className="text-gray-700">{product.fit}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
