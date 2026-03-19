import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Bell, Clock, Activity, TrendingUp, TrendingDown, UtilityPole as UtensilsCrossed, Printer, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const MetricCard = ({ title, value, subtitle, subtitleTrend, icon: Icon, isProgress = false, progressValue = 80 }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase">{title}</h3>
            <Icon className={`w-5 h-5 ${title === 'KITCHEN LOAD' ? 'text-red-500' : 'text-[#E53935]'}`} />
        </div>
        <div className="mt-4">
            <div className="text-4xl font-extrabold text-gray-900 mb-2">{value}</div>
            {isProgress ? (
                <div className="w-full bg-gray-100 h-2 mt-4 rounded-full overflow-hidden">
                    <div className="bg-[#E53935] h-full rounded-full" style={{ width: `${progressValue}%` }}></div>
                </div>
            ) : (
                <div className={`flex items-center gap-1 text-xs font-bold ${subtitleTrend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {subtitleTrend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{subtitle}</span>
                </div>
            )}
        </div>
    </div>
);

const OrderCard = ({ order, onMarkReady }) => {
    // Format the time (you might need a better formatter based on your data)
    const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const status = order.status;
    const orderId = order.orderNumber;
    const items = order.items.map(i => ({ 
        qty: i.quantity, 
        name: i.menuItem?.name || 'Unknown Item', 
        notes: i.notes // Assuming there might be notes in the future
    }));
    const image = items[0]?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"; // Placeholder logic
    const getStatusConfig = () => {
        switch (status) {
            case 'DELAYED': return { bg: 'bg-[#E53935]', text: 'text-white' };
            case 'CRITICAL': return { bg: 'bg-red-700', text: 'text-white' };
            case 'PREPARING': return { bg: 'bg-orange-500', text: 'text-white' };
            default: return { bg: 'bg-gray-500', text: 'text-white' };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            {/* Image Header with Badge */}
            <div className="h-44 relative bg-gray-100 w-full">
                <img src={image} alt={`Order ${orderId}`} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                    <span className={`${statusConfig.bg} ${statusConfig.text} text-xs font-extrabold px-3 py-1 rounded-full tracking-wider uppercase shadow-sm`}>
                        {status.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg text-gray-900">Order #{orderId}</h3>
                    <div className={`flex items-center gap-1.5 font-bold text-sm ${status === 'Delayed' || status === 'Critical' ? 'text-[#E53935]' : 'text-orange-500'}`}>
                        {status === 'Delayed' || status === 'Critical' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        <span>{time}</span>
                    </div>
                </div>

                {/* Items */}
                <div className="flex-1 space-y-2 mb-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <div className="text-sm font-medium text-gray-800">{item.qty}x {item.name}</div>
                            {item.notes && <div className="text-xs font-medium text-gray-400 italic ml-5 mt-0.5">{item.notes}</div>}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 rounded-lg transition-colors border border-gray-200 text-sm">
                        View Details
                    </button>
                    {status !== 'Ready' && (
                        <button 
                            onClick={() => onMarkReady(order._id)}
                            className="flex-1 bg-[#E53935] hover:bg-red-600 text-white font-bold py-2.5 rounded-lg transition-colors shadow-sm text-sm"
                        >
                            Mark Ready
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const KitchenDashboard = () => {
    const [activeTab, setActiveTab] = useState('Preparing');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // Note: In an actual app, you need to send auth headers here if the route is protected
            const response = await axios.get('http://localhost:5000/api/orders', {
                withCredentials: true
            });
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Optional: Set up polling to get new orders automatically
        const interval = setInterval(fetchOrders, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, []);

    const handleMarkReady = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: 'Ready'
            }, {
                withCredentials: true
            });
            // Update the local state to immediately show the change, or just refetch
            fetchOrders(); 
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update status.");
        }
    };

    // Filter orders based on active tab
    const filteredOrders = orders.filter(o => o.status === activeTab);

    // Stats calculations
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const preparingCount = orders.filter(o => o.status === 'Preparing').length;
    const readyCount = orders.filter(o => o.status === 'Ready').length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">

            {/* TOP HEADER */}
            <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-30">

                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-[#E53935] flex items-center justify-center text-white shadow-sm">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-white">Culinary<span className="text-gray-400">Excellence</span></span>
                    </div>

                    <nav className="hidden lg:flex gap-8 text-sm font-bold text-gray-400">
                        <a href="#" className="text-white border-b-2 border-white pb-1">Orders</a>
                        <a href="#" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent">Settings</a>
                    </nav>
                </div>

                {/* Right: Search, Profile */}
                <div className="flex items-center gap-6">
                    <div className="relative group hidden md:block w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#E53935]" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 text-sm border-none focus:ring-2 focus:ring-[#E53935]/50 focus:bg-gray-700 transition-all text-white outline-none placeholder-gray-500 font-medium"
                        />
                    </div>

                    <div className="w-10 h-10 rounded-full border-2 border-gray-100 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f8fafc" alt="User Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col mb-24">

                {/* METRICS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="ACTIVE ORDERS"
                        value="24"
                        subtitle="+5% from last hour"
                        subtitleTrend="up"
                        icon={ClipboardList => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E53935]"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><circle cx="12" cy="14" r="3"></circle><path d="M12 11v3l2 1"></path></svg>}
                    />
                    <MetricCard
                        title="COMPLETED TODAY"
                        value="148"
                        subtitle="-2% vs yesterday"
                        subtitleTrend="down"
                        icon={CheckCircle2}
                    />
                    <MetricCard
                        title="AVG. PREP TIME"
                        value="12m"
                        subtitle="-1m improvement"
                        subtitleTrend="up"
                        icon={Clock}
                    />
                    <MetricCard
                        title="KITCHEN LOAD"
                        value="High"
                        isProgress={true}
                        progressValue={85}
                        icon={Activity}
                    />
                </div>

                {/* CONTROLS (TABS & FILTERS) */}
                <div className="flex items-center justify-between border-b border-gray-200 mb-8 mt-2">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('Pending')}
                            className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-all border-b-[3px] flex items-center gap-2
                ${activeTab === 'Pending' ? 'border-[#E53935] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Pending <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{pendingCount}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Preparing')}
                            className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-all border-b-[3px] flex items-center gap-2
                ${activeTab === 'Preparing' ? 'border-[#E53935] text-[#E53935]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Preparing <span className={`${activeTab === 'Preparing' ? 'bg-red-100 text-[#E53935]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded text-xs`}>{preparingCount}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Ready')}
                            className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-all border-b-[3px] flex items-center gap-2
                ${activeTab === 'Ready' ? 'border-[#E53935] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Ready <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{readyCount}</span>
                        </button>
                    </div>
                </div>

                {/* ORDER GRID */}
                {loading ? (
                    <div className="flex items-center justify-center h-64 w-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E53935]"></div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-xl border border-gray-100">
                        No orders currently {activeTab.toLowerCase()}.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {filteredOrders.map(order => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onMarkReady={handleMarkReady}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* BOTTOM ACTION BAR (Sticky to bottom) */}
            <div className="fixed bottom-0 left-0 w-full bg-transparent px-8 py-6 pointer-events-none z-40">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-[1600px] mx-auto flex justify-between items-center pointer-events-auto">

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E53935]">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-sm text-gray-900 tracking-wider">SYSTEM STATUS</h4>
                            <p className="text-xs font-medium text-gray-500">All stations online. Connection stable.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors border border-gray-200 flex items-center gap-2 text-sm shadow-sm">
                            <Printer className="w-4 h-4" />
                            <span>Print All</span>
                        </button>
                        <button className="bg-[#E53935] hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-sm shadow-red-500/30">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Mark Page Ready</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default KitchenDashboard;
