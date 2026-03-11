import React from 'react';
import { Banknote, ShoppingCart, Star, Users } from 'lucide-react';

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

const AdminOverview = () => {
    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            {/* HEADER */}
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm font-medium">Welcome to the Administration Panel.</p>
            </header>

            {/* METRICS ROW */}
            <div className="flex flex-wrap gap-6 mb-10">
                <MetricCard title="Total Revenue" value="$42,850.00" trend="12%" isPositive={true} icon={Banknote} />
                <MetricCard title="Total Orders" value="1,284" trend="5.4%" isPositive={true} icon={ShoppingCart} />
                <MetricCard title="Average Rating" value="452 Reviews" trend="4.8" isPositive={false} icon={Star} />
                <MetricCard title="Active Customers" value="892" trend="18" isPositive={true} icon={Users} />
            </div>

            {/* SALES OVERVIEW CHART WIDGET */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
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
                <div className="h-64 flex items-end justify-between px-2 gap-4">
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

export default AdminOverview;
