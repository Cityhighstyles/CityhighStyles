'use client';

import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface ProductViewProps {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

export default function ProductView({ product, onClose, onEdit }: ProductViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Edit Product
          </button>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold px-3"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Images Gallery */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Product Images ({product.images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images.map((image, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Main
                  </div>
                )}
                </div>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Product Name</label>
              <p className="text-lg font-semibold mt-1">{product.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Slug</label>
              <p className="text-lg font-mono bg-gray-100 px-3 py-2 rounded mt-1">{product.slug}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-base mt-1 text-gray-700">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Price</label>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatPrice(product.price)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-lg capitalize mt-1">{product.category}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="flex gap-3 mt-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Available Sizes</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Available Colors</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-medium capitalize"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Tags</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Fit</label>
              <p className="text-lg mt-1">{product.fit}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Fabric</label>
              <p className="text-lg mt-1">{product.details.fabric}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Care Instructions</label>
              <p className="text-base mt-1 text-gray-700">{product.details.care}</p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-500">Product ID</label>
              <p className="text-gray-700 font-mono mt-1">{product.id}</p>
            </div>
            <div>
              <label className="font-medium text-gray-500">Created</label>
              <p className="text-gray-700 mt-1">
                {new Date(product.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <label className="font-medium text-gray-500">Last Updated</label>
              <p className="text-gray-700 mt-1">
                {new Date(product.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
