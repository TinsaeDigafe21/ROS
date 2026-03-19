import React, { useState, useEffect } from 'react';
import { MoreVertical, Star, ShoppingCart, UtensilsCrossed, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { getCategoriesWithItemCount, createCategory, updateCategory, deleteCategory } from '../../api/categoryApi';

// Icon mapping for dynamic rendering
const iconMap = {
  UtensilsCrossed,
  Star,
  ShoppingCart,
};

const CategoryRow = ({ category, onEdit, onDelete }) => {
  const Icon = iconMap[category.icon] || UtensilsCrossed;

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-bold text-sm text-gray-900">{category.name}</h5>
          <p className="text-xs text-gray-500 font-medium">{category.itemsCount || 0} Items</p>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
          className="text-gray-300 hover:text-blue-500 p-1 rounded transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category._id);
          }}
          className="text-gray-300 hover:text-red-500 p-1 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'UtensilsCrossed',
    colorClass: 'bg-gray-50 text-gray-500'
  });

  const iconOptions = [
    { name: 'UtensilsCrossed', label: 'Utensils' },
    { name: 'Star', label: 'Star' },
    { name: 'ShoppingCart', label: 'Cart' },
  ];

  const colorOptions = [
    { value: 'bg-orange-50 text-orange-500', label: 'Orange' },
    { value: 'bg-blue-50 text-blue-500', label: 'Blue' },
    { value: 'bg-pink-50 text-pink-500', label: 'Pink' },
    { value: 'bg-green-50 text-green-500', label: 'Green' },
    { value: 'bg-purple-50 text-purple-500', label: 'Purple' },
    { value: 'bg-gray-50 text-gray-500', label: 'Gray' },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategoriesWithItemCount();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await createCategory(formData);
      setCategories(prev => [newCategory, ...prev]);
      setShowAddForm(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Failed to add category');
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = await updateCategory(editingCategory._id, formData);
      setCategories(prev => prev.map(cat =>
        cat._id === editingCategory._id ? { ...updatedCategory, itemsCount: cat.itemsCount } : cat
      ));
      setEditingCategory(null);
      resetForm();
    } catch (err) {
      setError(err.message || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? This will not delete associated menu items.')) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'UtensilsCrossed',
      colorClass: 'bg-gray-50 text-gray-500'
    });
  };

  const startEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon,
      colorClass: category.colorClass
    });
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto pb-24">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Categories</h1>
        <p className="text-gray-500 text-sm font-medium">Manage your menu categories here.</p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </header>

      {/* Categories Widget */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-gray-900">Categories List</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-xs font-bold text-[#E53935] hover:text-red-600"
          >
            Add New
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#E53935]" />
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {categories.map((category) => (
              <CategoryRow
                key={category._id}
                category={category}
                onEdit={startEdit}
                onDelete={handleDeleteCategory}
              />
            ))}
            {categories.length === 0 && (
              <p className="text-center text-gray-500 py-4">No categories found.</p>
            )}
          </div>
        )}

        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold text-sm hover:border-[#E53935] hover:text-[#E53935] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* ADD/EDIT FORM MODAL */}
      {(showAddForm || editingCategory) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <form onSubmit={editingCategory ? handleEditCategory : handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  rows="2"
                  placeholder="Optional description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                >
                  {iconOptions.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select
                  value={formData.colorClass}
                  onChange={(e) => setFormData(prev => ({ ...prev, colorClass: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#E53935] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
