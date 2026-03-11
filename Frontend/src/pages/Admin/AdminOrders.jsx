import React from 'react';
import { Clock } from 'lucide-react';

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

const AdminOrders = () => {
    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-24">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Order History</h1>
                <p className="text-gray-500 text-sm font-medium">View and manage past and current orders.</p>
            </header>

            {/* Recent Orders Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 max-w-lg">
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
    );
};

export default AdminOrders;
