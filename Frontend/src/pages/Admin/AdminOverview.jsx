import React, { useEffect, useState } from 'react';
import { Banknote, ShoppingCart, Star, Users } from 'lucide-react';
import { getDashboardMetrics } from '../../api/orderApi';

const MetricCard = ({ title, value, trend, isPositive, icon: Icon }) => (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex-1 min-w-[200px]">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${title === 'Total Revenue' ? 'bg-green-50 text-green-500' :
                title === 'Total Orders' ? 'bg-blue-50 text-blue-500' :
                    title === 'Active Customers' ? 'bg-red-50 text-red-500' :
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
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        averageOrderValue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            setLoading(true);
            const data = await getDashboardMetrics();
            setMetrics(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load metrics');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return `Br ${Number(value).toFixed(2)}`;
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            {/* HEADER */}
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm font-medium">Welcome to the Administration Panel.</p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </header>

            {/* METRICS ROW */}
            <div className="flex flex-wrap gap-6 mb-10">
                <MetricCard
                    title="Total Revenue"
                    value={loading ? 'Loading...' : formatCurrency(metrics.totalRevenue)}
                    trend=""
                    isPositive={true}
                    icon={Banknote}
                />
                <MetricCard
                    title="Total Orders"
                    value={loading ? 'Loading...' : metrics.totalOrders}
                    trend=""
                    isPositive={true}
                    icon={ShoppingCart}
                />
                <MetricCard
                    title="Active Customers"
                    value={loading ? 'Loading...' : metrics.totalCustomers}
                    trend=""
                    isPositive={true}
                    icon={Users}
                />
                <MetricCard
                    title="Avg Order Value"
                    value={loading ? 'Loading...' : formatCurrency(metrics.averageOrderValue)}
                    trend=""
                    isPositive={true}
                    icon={Star}
                />
            </div>

        </div>
    );
};

export default AdminOverview;
