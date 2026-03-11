import React, { useState } from 'react';
import { Search, Plus, Star, Edit2, Trash2 } from 'lucide-react';

const MenuItemCard = ({ image, category, title, description, price, rating }) => (
    <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col group">
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                {category}
            </span>
        </div>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-extrabold text-lg text-gray-900 max-w-[70%] leading-tight">{title}</h4>
            <span className="font-bold text-[#E53935]">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 flex-1">
            {description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{rating}</span>
            </div>
            <div className="flex gap-2 text-gray-400">
                <button className="p-1.5 hover:bg-gray-50 hover:text-blue-500 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-gray-50 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
        </div>
    </div>
);

const MenuManagement = () => {
    const [activeTab, setActiveTab] = useState('All Items');
    const tabs = ['All Items', 'Appetizers', 'Main Courses', 'Desserts'];

    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            {/* HEADER */}
            <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Menu Management</h1>
                    <p className="text-gray-500 text-sm font-medium">Configure your restaurant's digital menu and offerings.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#E53935]" />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all text-gray-700 outline-none font-medium shadow-sm"
                        />
                    </div>
                    <button className="bg-[#E53935] hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        <span>Add New Item</span>
                    </button>
                </div>
            </header>

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

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MenuItemCard
                        image="https://images.unsplash.com/photo-1528207776546-384bb117b5fe?q=80&w=800&auto=format&fit=crop"
                        category="Main Course"
                        title="Honey Glazed Pancakes"
                        price={12.99}
                        description="Fluffy buttermilk pancakes topped with organic forest honey, fresh berries, and whipped cream."
                        rating={4.9}
                    />
                    <MenuItemCard
                        image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
                        category="Appetizer"
                        title="Truffle Slider Duo"
                        price={18.50}
                        description="Two wagyu beef sliders with black truffle aioli, arugula, and caramelized onions."
                        rating={4.7}
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;
