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
                <MetricCard title="Active Customers" value="892" trend="18" isPositive={true} icon={Users} />
            </div>

        </div>
    );
};

export default AdminOverview;
