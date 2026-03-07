import React, { useState } from 'react';
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

const OrderCard = ({ orderId, time, status, items, image }) => {
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
                        {status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg text-gray-900">Order #{orderId}</h3>
                    <div className={`flex items-center gap-1.5 font-bold text-sm ${status === 'DELAYED' || status === 'CRITICAL' ? 'text-[#E53935]' : 'text-orange-500'}`}>
                        {status === 'DELAYED' || status === 'CRITICAL' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
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
                    <button className="flex-1 bg-[#E53935] hover:bg-red-600 text-white font-bold py-2.5 rounded-lg transition-colors shadow-sm text-sm">
                        Mark Ready
                    </button>
                </div>
            </div>
        </div>
    );
};

const KitchenDashboard = () => {
    const [activeTab, setActiveTab] = useState('Preparing');

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">

            {/* TOP HEADER */}
            <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">

                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-[#E53935] flex items-center justify-center text-white shadow-sm">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-gray-900">Culinary<span className="text-gray-600">Excellence</span></span>
                    </div>

                    <nav className="hidden lg:flex gap-8 text-sm font-bold text-gray-500">
                        <a href="#" className="text-gray-900 border-b-2 border-gray-900 pb-1">Orders</a>
                        <a href="#" className="hover:text-gray-900 transition-colors pb-1 border-b-2 border-transparent">Inventory</a>
                        <a href="#" className="hover:text-gray-900 transition-colors pb-1 border-b-2 border-transparent">Staff</a>
                        <a href="#" className="hover:text-gray-900 transition-colors pb-1 border-b-2 border-transparent">Settings</a>
                    </nav>
                </div>

                {/* Right: Search, Status, Profile */}
                <div className="flex items-center gap-6">
                    <div className="relative group hidden md:block w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#E53935]" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 text-sm border-none focus:ring-2 focus:ring-[#E53935]/20 focus:bg-white transition-all text-gray-700 outline-none placeholder-gray-400 font-medium"
                        />
                    </div>

                    <div className="bg-red-50 text-[#E53935] px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-extrabold tracking-widest border border-red-100 shadow-sm cursor-pointer hover:bg-red-100 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse"></span>
                        LIVE DASHBOARD
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
                            Pending <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">8</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Preparing')}
                            className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-all border-b-[3px] flex items-center gap-2
                ${activeTab === 'Preparing' ? 'border-[#E53935] text-[#E53935]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Preparing <span className={`${activeTab === 'Preparing' ? 'bg-red-100 text-[#E53935]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded text-xs`}>12</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Ready')}
                            className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-all border-b-[3px] flex items-center gap-2
                ${activeTab === 'Ready' ? 'border-[#E53935] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Ready <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">4</span>
                        </button>
                    </div>
                </div>

                {/* ORDER GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <OrderCard
                        orderId="4021"
                        status="PREPARING"
                        time="05:20"
                        image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
                        items={[
                            { qty: 2, name: 'Wagyu Burger', notes: 'Medium-Rare' },
                            { qty: 1, name: 'Truffle Fries' },
                            { qty: 1, name: 'House Slaw' }
                        ]}
                    />
                    <OrderCard
                        orderId="4022"
                        status="DELAYED"
                        time="12:45"
                        image="https://images.unsplash.com/photo-1548943487-a2e4142f0e0f?q=80&w=800&auto=format&fit=crop"
                        items={[
                            { qty: 1, name: 'Lobster Bisque' },
                            { qty: 2, name: 'Caesar Salad', notes: 'Allergic to nuts' }
                        ]}
                    />
                    <OrderCard
                        orderId="4023"
                        status="PREPARING"
                        time="02:10"
                        image="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop"
                        items={[
                            { qty: 3, name: 'Margherita Pizza' },
                            { qty: 1, name: 'Garlic Bread' }
                        ]}
                    />
                    <OrderCard
                        orderId="4024"
                        status="CRITICAL"
                        time="18:30"
                        image="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop"
                        items={[
                            { qty: 1, name: 'Ribeye Steak' },
                            { qty: 1, name: 'Roasted Carrots' },
                            { qty: 1, name: 'Red Wine Jus' }
                        ]}
                    />
                </div>
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
