import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Edit2, Trash2, Loader2 } from 'lucide-react';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../api/menuApi';
import { getCategories } from '../../api/categoryApi';

const MenuItemCard = ({ item, onEdit, onDelete }) => (
    <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col group">
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <img
                src={item.image ? `http://localhost:5000/${item.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                {item.category}
            </span>
            {!item.isAvailable && (
                <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    Unavailable
                </span>
            )}
        </div>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-extrabold text-lg text-gray-900 max-w-[70%] leading-tight">{item.name}</h4>
            <span className="font-bold text-[#E53935]">Br {item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 flex-1">
            {item.description || 'No description available.'}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            
            <div className="flex gap-2 text-gray-400">
                <button
                    onClick={onEdit}
                    className="p-1.5 hover:bg-gray-50 hover:text-blue-500 rounded-lg transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-1.5 hover:bg-gray-50 hover:text-red-500 rounded-lg transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

const MenuManagement = () => {
    const [activeTab, setActiveTab] = useState('All Items');
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageFile: null,
        isAvailable: true
    });

    const tabs = ['All Items', ...categories.map(cat => cat.name)];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [items, cats] = await Promise.all([
                getMenuItems(),
                getCategories()
            ]);
            setMenuItems(items);
            setCategories(cats);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!formData.imageFile) {
            setError('Image is required');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', parseFloat(formData.price));
            formDataToSend.append('category', formData.category);
            formDataToSend.append('image', formData.imageFile);
            formDataToSend.append('isAvailable', formData.isAvailable);

            const newItem = await createMenuItem(formDataToSend);
            setMenuItems(prev => [newItem, ...prev]);
            setShowAddForm(false);
            resetForm();
        } catch (err) {
            setError(err.message || 'Failed to add menu item');
        }
    };

    const handleEditItem = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', parseFloat(formData.price));
            formDataToSend.append('category', formData.category);
            if (formData.imageFile) {
                formDataToSend.append('image', formData.imageFile);
            }
            formDataToSend.append('isAvailable', formData.isAvailable);

            const updatedItem = await updateMenuItem(editingItem._id, formDataToSend);
            setMenuItems(prev => prev.map(item =>
                item._id === editingItem._id ? updatedItem : item
            ));
            setEditingItem(null);
            resetForm();
        } catch (err) {
            setError(err.message || 'Failed to update menu item');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this menu item?')) return;
        try {
            await deleteMenuItem(id);
            setMenuItems(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete menu item');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            imageFile: null,
            isAvailable: true
        });
    };

    const startEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description || '',
            price: item.price.toString(),
            category: item.category,
            imageFile: null, // For editing, we don't pre-fill the file
            isAvailable: item.isAvailable
        });
    };

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeTab === 'All Items' || item.category === activeTab;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            {/* HEADER */}
            <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Menu Management</h1>
                    <p className="text-gray-500 text-sm font-medium">Configure your restaurant's digital menu and offerings.</p>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#E53935]" />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all text-gray-700 outline-none font-medium shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-[#E53935] hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Item</span>
                    </button>
                </div>
            </header>

            {/* ADD/EDIT FORM MODAL */}
            {(showAddForm || editingItem) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                        </h3>
                        <form onSubmit={editingItem ? handleEditItem : handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required={!editingItem}
                                    onChange={(e) => setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                                />
                                {editingItem && <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isAvailable"
                                    checked={formData.isAvailable}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                                    className="mr-2"
                                />
                                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">Available</label>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#E53935] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    {editingItem ? 'Update' : 'Add'} Item
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setEditingItem(null);
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

            {/* MAIN CONTENT GRID */}
            <div className="w-full">
                {/* TABS */}
                <div className="flex gap-8 border-b border-gray-200 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 
              ${activeTab === tab
                                    ? 'border-[#E53935] text-[#E53935]'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-[#E53935]" />
                        <span className="ml-2 text-gray-600">Loading menu items...</span>
                    </div>
                )}

                {/* GRID */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item) => (
                            <MenuItemCard
                                key={item._id}
                                item={item}
                                onEdit={() => startEdit(item)}
                                onDelete={() => handleDeleteItem(item._id)}
                            />
                        ))}
                        {filteredItems.length === 0 && !loading && (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No menu items found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuManagement;
