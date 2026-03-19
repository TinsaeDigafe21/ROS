import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getDailyOrders } from '../../api/orderApi';

const formatDateLabel = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

const AdminReports = () => {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-500">View detailed reports on your restaurant performance here.</p>
        </div>
    );
};

export default AdminReports;