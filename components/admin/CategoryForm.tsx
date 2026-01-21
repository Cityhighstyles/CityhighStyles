'use client';

import { useState } from 'react';
import { Category } from '@/types';
import { updateCategory } from '@/app/admin/categoryActions';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

    const formData = new FormData(e.currentTarget);
    
    // Add the image file if one was selected
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const result = await updateCategory(formData);
      
      if (result.success) {
        const slug = formData.get('slug') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const image = formData.get('image') as string;
        
        onSave({ slug, title, description, image });
        alert('Category updated successfully!');
        onClose();
      } else {
        setError(result.error || 'Failed to save category');
      }
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          {category ? 'Edit Category' : 'Create New Category'}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Slug */}
          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">Slug *</label>
            <input
              type="text"
              name="slug"
              defaultValue={category?.slug}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              required
              disabled={!!category}
            />
            <AnimatePresence>
              {category && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-gray-500 mt-1"
                >
                  Slug cannot be changed
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Title */}
          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              defaultValue={category?.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              required
            />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <label className="block text-sm font-semibold mb-2 text-gray-700">Description *</label>
          <textarea
            name="description"
            defaultValue={category?.description}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm resize-none"
            required
          />
        </motion.div>

        {/* Image Upload Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-semibold mb-2 text-gray-700">Image *</label>
          <motion.input
            whileHover={{ scale: 1.01 }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-900 file:text-white file:cursor-pointer hover:file:bg-gray-800"
            required={!category}
          />
          <AnimatePresence>
            {imagePreview && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="mt-4"
              >
                <p className="text-sm text-gray-600 mb-2 font-medium">Preview:</p>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg"
                >
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-gray-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Saving...
              </motion.span>
            ) : category ? 'Update Category' : 'Create Category'}
          </motion.button>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Cancel
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
