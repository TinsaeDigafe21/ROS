import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getDailyOrders } from '../../api/orderApi';

const formatDateLabel = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

const AdminReports = () => {
  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyOrders();
  }, []);

  const fetchDailyOrders = async () => {
    try {
      setLoading(true);
      const data = await getDailyOrders(7);
      setDailyOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load daily orders');
    } finally {
      setLoading(false);
    }
  };

  const maxCount = Math.max(...dailyOrders.map(d => d.count), 1);

  return (
    <div className="p-10 max-w-[1400px] mx-auto pb-24">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Reports & Analytics</h1>
      <p className="text-gray-500 mb-10">View detailed reports on your restaurant performance here.</p>

      <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 mb-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Sales Overview</h3>
            <p className="text-sm font-medium text-gray-500">Orders in the last 7 days</p>
          </div>
          {loading && <Loader2 className="w-6 h-6 animate-spin text-[#E53935]" />}
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="h-64 flex items-end justify-between px-2 gap-4">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">Loading chart...</div>
          ) : (
            dailyOrders.map((bar, i) => {
              const heightPercent = maxCount > 0 ? Math.round((bar.count / maxCount) * 100) : 0;
              const barHeight = `${Math.max(heightPercent, 5)}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-3 rounded-lg pointer-events-none">
                    {bar.count} orders
                  </div>
                  <div
                    className="w-full max-w-[60px] rounded-t-lg bg-blue-500 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: barHeight }}
                  ></div>
                  <span className="text-sm font-bold text-gray-500">{formatDateLabel(bar.date)}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;