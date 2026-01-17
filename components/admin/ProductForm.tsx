'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { createProduct, updateProduct } from '@/app/admin/actions';
import { categories } from '@/lib/categories';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      let result;
      if (product) {
        // Update existing product
        formData.append('id', product.id);
        formData.append('createdAt', product.createdAt);
        formData.append('existingImages', JSON.stringify(product.images));
        result = await updateProduct(product.slug, formData);
      } else {
        // Create new product
        result = await createProduct(formData);
      }

      if (result.success) {
        alert(product ? 'Product updated successfully!' : 'Product created successfully!');
        onClose();
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {product ? 'Edit Product' : 'Create New Product'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          ✕ Close
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              defaultValue={product?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price (₦) *</label>
            <input
              type="number"
              name="price"
              defaultValue={product?.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            defaultValue={product?.description}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              defaultValue={product?.category}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Fit */}
          <div>
            <label className="block text-sm font-medium mb-2">Fit *</label>
            <input
              type="text"
              name="fit"
              defaultValue={product?.fit}
              placeholder="e.g., Slim Fit, Regular Fit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-2">Sizes (comma-separated) *</label>
            <input
              type="text"
              name="sizes"
              defaultValue={product?.sizes.join(', ')}
              placeholder="S, M, L, XL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium mb-2">Colors (comma-separated) *</label>
            <input
              type="text"
              name="colors"
              defaultValue={product?.colors.join(', ')}
              placeholder="Black, White, Grey"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              defaultValue={product?.tags.join(', ')}
              placeholder="casual, premium"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fabric */}
          <div>
            <label className="block text-sm font-medium mb-2">Fabric *</label>
            <input
              type="text"
              name="fabric"
              defaultValue={product?.details.fabric}
              placeholder="100% Cotton"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Care Instructions */}
          <div>
            <label className="block text-sm font-medium mb-2">Care Instructions *</label>
            <input
              type="text"
              name="care"
              defaultValue={product?.details.care}
              placeholder="Machine wash cold"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        {/* Images */}
        {!product && (
          <div>
            <label className="block text-sm font-medium mb-2">Product Images *</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Select multiple images. First image will be the main image.
            </p>
          </div>
        )}

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={product?.featured}
              className="mr-2"
            />
            <span className="text-sm font-medium">Featured Product</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              value="true"
              defaultChecked={product?.inStock ?? true}
              className="mr-2"
            />
            <span className="text-sm font-medium">In Stock</span>
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
