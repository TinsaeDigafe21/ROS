import React from 'react';

const AdminReports = () => {
    return (
        <div className="p-10 max-w-[1400px] mx-auto pb-24">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-500 mb-10">View detailed reports on your restaurant performance here.</p>

            {/* SALES OVERVIEW CHART WIDGET */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 mb-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-1">Sales Overview</h3>
                        <p className="text-sm font-medium text-gray-500">Total orders of each day in the week</p>
                    </div>
                </div>

                {/* Mock Bar Chart - Total Orders */}
                <div className="h-64 flex items-end justify-between px-2 gap-4">
                    {[
                        { label: 'Mon', h: '30%', count: '32', color: 'bg-blue-100' },
                        { label: 'Tue', h: '45%', count: '45', color: 'bg-blue-300' },
                        { label: 'Wed', h: '25%', count: '28', color: 'bg-blue-100' },
                        { label: 'Thu', h: '55%', count: '55', color: 'bg-blue-400' },
                        { label: 'Fri', h: '90%', count: '92', color: 'bg-blue-600' },
                        { label: 'Sat', h: '100%', count: '104', color: 'bg-blue-700' },
                        { label: 'Sun', h: '60%', count: '65', color: 'bg-blue-500' },
                    ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                            {/* Tooltip on Hover */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-3 rounded-lg pointer-events-none">
                                {bar.count} Orders
                            </div>
                            <div
                                className={`w-full max-w-[60px] rounded-t-lg ${bar.color} hover:opacity-80 transition-opacity cursor-pointer`}
                                style={{ height: bar.h }}
                            ></div>
                            <span className="text-sm font-bold text-gray-500">{bar.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
