import React from 'react';
import { MoreVertical, Star, ShoppingCart, UtensilsCrossed, Plus } from 'lucide-react';

const CategoryRow = ({ icon: Icon, title, itemsCount, colorClass }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h5 className="font-bold text-sm text-gray-900">{title}</h5>
                <p className="text-xs text-gray-500 font-medium">{itemsCount} Items</p>
            </div>
        </div>
        <button className="text-gray-300 hover:text-gray-600 p-1"><MoreVertical className="w-4 h-4" /></button>
    </div>
);

const AdminCategories = () => {
    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Categories</h1>
                <p className="text-gray-500 text-sm font-medium">Manage your menu categories here.</p>
            </header>

            {/* Categories Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-extrabold text-gray-900">Categories List</h3>
                    <button className="text-xs font-bold text-[#E53935] hover:text-red-600">Manage All</button>
                </div>

                <div className="space-y-2 mb-6">
                    <CategoryRow title="Main Course" itemsCount={24} icon={UtensilsCrossed} colorClass="bg-orange-50 text-orange-500" />
                    <CategoryRow title="Appetizers" itemsCount={18} icon={Star} colorClass="bg-blue-50 text-blue-500" />
                    <CategoryRow title="Desserts" itemsCount={12} icon={ShoppingCart} colorClass="bg-pink-50 text-pink-500" />
                </div>

                <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold text-sm hover:border-[#E53935] hover:text-[#E53935] transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Category</span>
                </button>
            </div>
        </div>
    );
};

export default AdminCategories;
