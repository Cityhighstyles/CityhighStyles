'use client';

import { useState } from 'react';
import { Category } from '@/types';
import Image from 'next/image';

interface CategoryFormProps {
  category: Category | null;
  onClose: () => void;
  onSave: (category: Category) => void;
}

export default function CategoryForm({ category, onClose, onSave }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [imagePreview, setImagePreview] = useState(category?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const slug = (form.elements.namedItem('slug') as HTMLInputElement).value;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    let image = (form.elements.namedItem('image') as HTMLInputElement).value;

    // If a file is selected, upload it via API
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('slug', slug);
      const res = await fetch('/api/categories/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        image = data.url;
      }
    }

    const updatedCategory: Category = {
      slug,
      title,
      description,
      image,
    };

    try {
      onSave(updatedCategory);
      onClose();
    } catch (err) {
      setError('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile(null);
      setImagePreview(e.target.value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {category ? 'Edit Category' : 'Create New Category'}
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
          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              defaultValue={category?.slug}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              required
              disabled={!!category}
            />
            {category && (
              <p className="text-xs text-gray-500 mt-1">Slug cannot be changed</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              defaultValue={category?.title}
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
            defaultValue={category?.description}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        {/* Image URL or Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Image *</label>
          <input
            type="url"
            name="image"
            defaultValue={category?.image}
            placeholder="https://cityhighstyles.github.io/public/category/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={imagePreview}
                  alt="Category preview"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
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
