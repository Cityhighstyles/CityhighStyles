'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { createProduct, updateProduct } from '@/app/admin/actions';
import { categories } from '@/lib/categories';
import Image from 'next/image';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleNewImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalSize = files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024); // Convert to MB

    if (totalSize > 3) {
      alert('Total image size exceeds 3MB. Please select smaller files.');
      return;
    }

    setNewImageFiles((prev) => {
      const existingFileNames = new Set(prev.map((file) => file.name));
      const newUniqueFiles = files.filter((file) => !existingFileNames.has(file.name));
      return [...prev, ...newUniqueFiles];
    });
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

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
        formData.append('existingImages', JSON.stringify(existingImages));
        
        // Add new images
        newImageFiles.forEach((file) => {
          formData.append('newImages', file);
        });
        
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

        {/* Images Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Product Images {!product && '*'}</label>
          
          {/* Existing Images (for edit mode) */}
          {product && existingImages.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">Current Images ({existingImages.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={image}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 shadow-lg"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Preview */}
          {newImageFiles.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">New Images to Upload ({newImageFiles.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {newImageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-green-300">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        New
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 shadow-lg"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Images Input */}
          <div>
            <input
              type="file"
              name={product ? 'newImages' : 'images'}
              accept="image/*"
              multiple
              onChange={handleNewImageSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required={!product && existingImages.length === 0 && newImageFiles.length === 0}
            />
            <p className="text-sm text-gray-600 mt-1">
              {product 
                ? 'Add more images to this product. First image will be the main image.' 
                : 'Select multiple images. First image will be the main image.'}
            </p>
          </div>
        </div>

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
