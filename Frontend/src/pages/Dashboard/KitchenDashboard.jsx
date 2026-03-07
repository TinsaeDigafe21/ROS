import React, { useState } from 'react';
import { Bell, Play, Undo2, CheckCircle2, CheckSquare, UtensilsCrossed, ClipboardList, Package, BarChart2, Settings } from 'lucide-react';

// Reusable Components Specific to Kitchen Dashboard

const PendingOrderCard = ({ orderId, timeAgo, items }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-50 mb-4">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-base">Order #{orderId}</span>
                <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Pending
                </span>
            </div>
            <span className="text-sm text-gray-500 font-medium">Received: {timeAgo}</span>
        </div>

        <div className="space-y-4 mb-5">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                    <span className="font-bold text-[#E53935] text-base min-w-[20px]">{item.qty}x</span>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <span className="font-bold text-gray-900 leading-tight">{item.name}</span>
                            <span className="text-xs text-blue-300 font-medium">{item.code}</span>
                        </div>
                        {item.notes && (
                            <div className="flex items-start gap-2 mt-1 border-l-2 border-orange-200 pl-2">
                                <span className="text-sm text-gray-500 italic">{item.notes}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <button className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-sm">
            <Play fill="currentColor" className="w-4 h-4" />
            <span>Start Preparing</span>
        </button>
    </div>
);

const PreparingOrderCard = ({ orderId, timeInPrep, items }) => (
    <div className="bg-blue-50/30 rounded-2xl p-4 shadow-sm border border-blue-100 mb-4">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-blue-50">
            <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-base">Order #{orderId}</span>
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Preparing
                </span>
            </div>
            <span className="text-sm text-gray-500 font-medium">In Prep: {timeInPrep}</span>
        </div>

        <div className="space-y-3 mb-5">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                    <span className="font-bold text-[#E53935] text-base min-w-[20px]">{item.qty}x</span>
                    <span className="font-bold text-gray-900 leading-tight">{item.name}</span>
                </div>
            ))}
        </div>

        <div className="flex gap-3">
            <button className="flex-1 bg-white border border-red-200 text-[#E53935] font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 hover:bg-red-50 transition-all active:scale-[0.98]">
                <Undo2 className="w-4 h-4" />
                <span>Recall</span>
            </button>
            <button className="flex-[2] bg-[#E53935] hover:bg-red-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Mark Ready</span>
            </button>
        </div>
    </div>
);

const ReadyOrderCard = ({ orderId, timeReady, items }) => (
    <div className="bg-green-50/50 rounded-2xl p-4 shadow-sm border border-green-100/50 mb-4 opacity-75">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-green-100/50">
            <div className="flex items-center gap-3">
                <span className="font-bold text-gray-600 text-base">Order #{orderId}</span>
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Ready
                </span>
            </div>
            <span className="text-sm text-gray-400 font-medium">Ready: {timeReady}</span>
        </div>

        <div className="space-y-2">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                        <span className="font-bold text-red-300 text-base min-w-[20px]">{item.qty}x</span>
                        <span className="font-bold text-gray-400 line-through decoration-gray-300 leading-tight">{item.name}</span>
                    </div>
                    <CheckSquare className="w-5 h-5 text-green-400" />
                </div>
            ))}
        </div>
    </div>
);


const KitchenDashboard = () => {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans relative">

            {/* Mobile-style Container constrained for visual accuracy (can extend to full width on PC but looks better constrained) */}
            <div className="max-w-md w-full mx-auto bg-[#F9FAFB] flex-1 flex flex-col shadow-2xl relative min-h-screen border-x border-gray-100">

                {/* TOP HEADER */}
                <header className="bg-white px-5 py-4 pb-0 z-10 sticky top-0">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#E53935] rounded-xl flex items-center justify-center text-white shadow-sm">
                                <UtensilsCrossed className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-extrabold text-[#0F172A] text-xl tracking-tight leading-tight">Kitchen Dashboard</h1>
                                <span className="text-[#E53935] text-xs font-bold tracking-widest uppercase">STATION 01: GRILL</span>
                            </div>
                        </div>
                        <div className="relative">
                            <Bell className="w-6 h-6 text-[#475569]" />
                            <span className="absolute 1 top-0 right-0 w-2.5 h-2.5 bg-[#E53935] border-2 border-white rounded-full"></span>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="flex gap-6 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`pb-3 text-[15px] font-bold whitespace-nowrap transition-all border-b-2 
                ${activeTab === 'active'
                                    ? 'border-[#E53935] text-[#E53935]'
                                    : 'border-transparent text-[#64748B] hover:text-gray-900'
                                }`}
                        >
                            Active Orders (8)
                        </button>
                        <button
                            onClick={() => setActiveTab('ready')}
                            className={`pb-3 text-[15px] font-bold whitespace-nowrap transition-all border-b-2 
                ${activeTab === 'ready'
                                    ? 'border-[#E53935] text-[#E53935]'
                                    : 'border-transparent text-[#64748B] hover:text-gray-900'
                                }`}
                        >
                            Ready to Serve (3)
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`pb-3 text-[15px] font-bold whitespace-nowrap transition-all border-b-2 
                ${activeTab === 'history'
                                    ? 'border-[#E53935] text-[#E53935]'
                                    : 'border-transparent text-[#64748B] hover:text-gray-900'
                                }`}
                        >
                            History
                        </button>
                    </div>
                </header>

                {/* MAIN SCROLLABLE CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 pb-32">

                    {/* Order Cards */}
                    <PendingOrderCard
                        orderId="842"
                        timeAgo="4m ago"
                        items={[
                            { qty: 2, name: 'Signature Wagyu Burger', code: '#GR-22', notes: 'No onions, Medium rare' },
                            { qty: 1, name: 'Truffle Parmesan Fries', code: '#SD-04' }
                        ]}
                    />

                    <PreparingOrderCard
                        orderId="840"
                        timeInPrep="12m"
                        items={[
                            { qty: 1, name: 'Crispy Chicken Caesar' },
                            { qty: 3, name: 'Coca-Cola Zero' }
                        ]}
                    />

                    <ReadyOrderCard
                        orderId="838"
                        timeReady="2m ago"
                        items={[
                            { qty: 1, name: 'Margherita Pizza' }
                        ]}
                    />

                    {/* Empty State / End of List Indicator */}
                    <div className="flex flex-col items-center justify-center py-10 opacity-60">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#E53935] mb-4">
                            <UtensilsCrossed className="w-7 h-7" />
                        </div>
                        <p className="text-[#94A3B8] font-medium italic text-sm">Looking for more orders...</p>
                    </div>

                </main>

                {/* BOTTOM NAVIGATION */}
                <nav className="fixed bottom-0 w-full max-w-md bg-[#F8FAFC] border-t border-gray-200 px-6 py-3 flex justify-between items-center pb-safe-offset z-20">

                    <button className="flex flex-col items-center gap-1 min-w-[64px]">
                        <ClipboardList className="w-6 h-6 text-[#E53935]" />
                        <span className="text-[10px] font-bold text-[#E53935] tracking-wider uppercase">Orders</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 min-w-[64px]">
                        <Package className="w-6 h-6 text-[#94A3B8]" />
                        <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase">Stock</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 min-w-[64px]">
                        <BarChart2 className="w-6 h-6 text-[#94A3B8]" />
                        <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase">Stats</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 min-w-[64px]">
                        <Settings className="w-6 h-6 text-[#94A3B8]" />
                        <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase">Settings</span>
                    </button>

                </nav>
            </div>
        </div>
    );
};

export default KitchenDashboard;
