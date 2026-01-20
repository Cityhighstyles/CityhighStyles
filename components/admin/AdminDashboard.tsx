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
    // Reload categories after save
    await loadCategories();
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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            {activeTab === 'products' && (
              <button
                onClick={handleCreateNew}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                + New Product
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('products');
                setShowForm(false);
                setShowCategoryForm(false);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === 'products'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => {
                setActiveTab('categories');
                setShowForm(false);
                setShowCategoryForm(false);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === 'categories'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Categories
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'products' ? (
          <>
            {viewingProduct ? (
              <ProductView product={viewingProduct} onClose={handleViewClose} onEdit={handleEdit} />
            ) : showForm ? (
              <ProductForm
                product={editingProduct}
                onClose={handleFormClose}
              />
            ) : (
              <>
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                ) : (
                  <ProductList
                    products={products}
                    onEdit={handleEdit}
                    onView={handleView}
                    onRefresh={loadProducts}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {showCategoryForm ? (
              <CategoryForm
                category={editingCategory}
                onClose={handleCategoryFormClose}
                onSave={handleSaveCategory}
              />
            ) : (
              <>
                {categoriesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading categories...</p>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No categories found in GitHub repo.</p>
                    <button
                      onClick={handleInitializeCategories}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Initialize Categories
                    </button>
                  </div>
                ) : (
                  <CategoryList
                    categories={categories}
                    onEdit={handleEditCategory}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
