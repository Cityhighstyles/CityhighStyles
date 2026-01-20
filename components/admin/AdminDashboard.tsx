'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductView from './ProductView';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { logout } from '@/lib/auth';
import { categories as initialCategories } from '@/lib/categories';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [showForm, setShowForm] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadProducts();
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
  };

  const handleSaveCategory = async (category: Category) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        const updatedCategories = categories.map((cat) =>
          cat.slug === category.slug ? category : cat
        );
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error saving category:', error);
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
              <CategoryList
                categories={categories}
                onEdit={handleEditCategory}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
