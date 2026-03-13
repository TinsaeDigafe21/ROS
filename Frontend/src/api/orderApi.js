import axios from '../api/axios';

// Get all orders (admin/kitchen)
export const getAllOrders = async () => {
  try {
    const response = await axios.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Dashboard metrics (admin)
export const getDashboardMetrics = async () => {
  try {
    const response = await axios.get('/orders/dashboard/metrics');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Daily order data for chart (admin)
export const getDailyOrders = async (days = 7) => {
  try {
    const response = await axios.get(`/orders/dashboard/daily?days=${days}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
