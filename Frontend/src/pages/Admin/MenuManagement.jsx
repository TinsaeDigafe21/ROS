import React, { useState } from 'react';
import { Search, Plus, Banknote, ShoppingCart, Star, Users, MoreVertical, Edit2, Trash2, Clock, CheckCircle, Truck } from 'lucide-react';

const MetricCard = ({ title, value, trend, isPositive, icon: Icon }) => (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex-1 min-w-[200px]">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${title === 'Total Revenue' ? 'bg-green-50 text-green-500' :
                title === 'Total Orders' ? 'bg-blue-50 text-blue-500' :
                    title === 'Average Rating' ? 'bg-red-50 text-red-500' :
                        'bg-orange-50 text-orange-500'
                }`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-gray-500'}`}>
                {isPositive ? '+' : ''}{trend}
            </span>
        </div>
        <p className="text-gray-400 text-xs font-bold tracking-wide mb-1">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
    </div>
);

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

const OrderRow = ({ initials, name, orderId, price, status }) => {
    const getStatusStyle = () => {
        switch (status) {
            case 'PREPARING': return 'bg-yellow-100 text-yellow-700';
            case 'READY': return 'bg-green-100 text-green-700';
            case 'DELIVERING': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    {initials}
                </div>
                <div>
                    <h5 className="font-bold text-sm text-gray-900">{name}</h5>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{orderId}</p>
                </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
                <span className="font-bold text-sm text-gray-900">${price.toFixed(2)}</span>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest ${getStatusStyle()}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

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

            {/* METRICS ROW */}
            <div className="flex flex-wrap gap-6 mb-10">
                <MetricCard title="Total Revenue" value="$42,850.00" trend="12%" isPositive={true} icon={Banknote} />
                <MetricCard title="Total Orders" value="1,284" trend="5.4%" isPositive={true} icon={ShoppingCart} />
                <MetricCard title="Average Rating" value="452 Reviews" trend="4.8" isPositive={false} icon={Star} />
                <MetricCard title="Active Customers" value="892" trend="18" isPositive={true} icon={Users} />
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* LEFT: Menu Items List */}
                <div className="xl:col-span-2">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* RIGHT: Sidebar Widgets */}
                <div className="xl:col-span-1 flex flex-col gap-6">

                    {/* Categories Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-extrabold text-gray-900">Categories</h3>
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

                    {/* Recent Orders Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-extrabold text-gray-900">Recent Orders</h3>
                            <button className="text-gray-400 hover:text-gray-600"><Clock className="w-4 h-4" /></button>
                        </div>

                        <div className="flex flex-col">
                            <OrderRow initials="JD" name="Jane Doe" orderId="ORD-4829" price={42.00} status="PREPARING" />
                            <OrderRow initials="MS" name="Mike Smith" orderId="ORD-4830" price={18.50} status="READY" />
                            <OrderRow initials="BW" name="Bill West" orderId="ORD-4831" price={74.20} status="DELIVERING" />
                        </div>

                        <button className="w-full bg-red-50 text-[#E53935] hover:bg-red-100 font-bold py-3 rounded-xl mt-6 transition-colors text-sm">
                            View All Orders
                        </button>
                    </div>

                </div>
            </div>

            {/* SALES OVERVIEW CHART WIDGET */}
            <div className="bg-white rounded-2xl p-8 mt-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-1">Sales Overview</h3>
                        <p className="text-sm font-medium text-gray-500">Revenue trends for the last 7 days</p>
                    </div>
                    <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 border border-gray-200">
                        <span>Last 7 Days</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                </div>

                {/* Mock Bar Chart */}
                <div className="h-64 mt-4 flex items-end justify-between px-2 gap-4">
                    {[
                        { label: 'Mon', h: '30%', color: 'bg-red-100' },
                        { label: 'Tue', h: '45%', color: 'bg-red-300' },
                        { label: 'Wed', h: '25%', color: 'bg-red-100' },
                        { label: 'Thu', h: '55%', color: 'bg-[#E53935]/70' },
                        { label: 'Fri', h: '80%', color: 'bg-[#E53935]' },
                        { label: 'Sat', h: '65%', color: 'bg-[#E53935]/80' },
                        { label: 'Sun', h: '35%', color: 'bg-red-200' },
                    ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3">
                            <div
                                className={`w-full max-w-[50px] rounded-t-lg ${bar.color} hover:opacity-80 transition-opacity cursor-pointer`}
                                style={{ height: bar.h }}
                            ></div>
                            <span className="text-xs font-bold text-gray-400">{bar.label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MenuManagement;
