'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductView from './ProductView';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { logout } from '@/lib/auth';
import { initializeCategories } from '@/app/admin/initCategories';
import { motion, AnimatePresence } from 'framer-motion';
import ChangePasswordForm from './ChangePasswordForm';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [showForm, setShowForm] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const allProducts = await response.json();
        setProducts(allProducts);
      } else {
        console.error('Failed to fetch products');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const allCategories = await response.json();
        setCategories(allCategories);
      } else {
        console.error('Failed to fetch categories');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
    setCategoriesLoading(false);
  };

  const handleCreateNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleView = (product: Product) => {
    setViewingProduct(product);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setViewingProduct(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleViewClose = () => {
    setViewingProduct(null);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCategoryFormClose = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
    loadCategories();
  };

  const handleSaveCategory = async (category: Category) => {
    await loadCategories();
  };

  const handleDeleteCategory = async (slug: string) => {
    try {
      const { deleteCategory } = await import('@/app/admin/categoryActions');
      const result = await deleteCategory(slug);
      
      if (result.success) {
        alert('Category deleted successfully!');
        await loadCategories();
      } else {
        alert(result.error || 'Failed to delete category');
      }
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  const handleInitializeCategories = async () => {
    if (confirm('This will create initial category files in GitHub. Continue?')) {
      const result = await initializeCategories();
      if (result.success) {
        alert(result.message);
        await loadCategories();
      } else {
        alert(result.error || 'Failed to initialize categories');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChangePassword(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-shadow font-medium"
            >
              Change Password
            </motion.button>
            <AnimatePresence mode="wait">
              {activeTab === 'products' && (
                <motion.button
                  key="new-product"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-shadow font-medium"
                >
                  + New Product
                </motion.button>
              )}
              {activeTab === 'categories' && (
                <motion.button
                  key="new-category"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingCategory(null);
                    setShowCategoryForm(true);
                  }}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-shadow font-medium"
                >
                  + New Category
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-shadow font-medium"
            >
              Logout
            </motion.button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex border-b border-gray-200/50 relative">
            <motion.button
              onClick={() => {
                setActiveTab('products');
                setShowForm(false);
                setShowCategoryForm(false);
              }}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'products'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileHover={{ y: -2 }}
            >
              Products
              {activeTab === 'products' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => {
                setActiveTab('categories');
                setShowForm(false);
                setShowCategoryForm(false);
              }}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'categories'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileHover={{ y: -2 }}
            >
              Categories
              {activeTab === 'categories' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'products' ? (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {viewingProduct ? (
                  <motion.div
                    key="view-product"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProductView product={viewingProduct} onClose={handleViewClose} onEdit={handleEdit} />
                  </motion.div>
                ) : showForm ? (
                  <motion.div
                    key="product-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProductForm
                      product={editingProduct}
                      onClose={handleFormClose}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="product-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {loading ? (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"
                        />
                        <p className="text-gray-600">Loading products...</p>
                      </motion.div>
                    ) : (
                      <ProductList
                        products={products}
                        onEdit={handleEdit}
                        onView={handleView}
                        onRefresh={loadProducts}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="categories-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {showCategoryForm ? (
                  <motion.div
                    key="category-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <CategoryForm
                      category={editingCategory}
                      onClose={handleCategoryFormClose}
                      onSave={handleSaveCategory}
                    />
                  </motion.div>
                ) : categoriesLoading ? (
                  <motion.div 
                    key="category-loading"
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"
                    />
                    <p className="text-gray-600">Loading categories...</p>
                  </motion.div>
                ) : categories.length === 0 ? (
                  <motion.div 
                    key="no-categories"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.p 
                      className="text-gray-600 mb-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      No categories found in GitHub repo.
                    </motion.p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleInitializeCategories}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
                    >
                      Initialize Categories
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="category-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CategoryList
                      categories={categories}
                      onEdit={handleEditCategory}
                      onDelete={handleDeleteCategory}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePassword && (
          <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
