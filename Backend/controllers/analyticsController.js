import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

// Get dashboard metrics
export const getAnalyticsMetrics = async (req, res) => {
  try {
    // Total revenue
    const totalRevenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'CANCELLED' } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    // Total orders
    const totalOrders = await Order.countDocuments({ status: { $ne: 'CANCELLED' } });

    // Active customers (unique customers with orders)
    const activeCustomersResult = await Order.distinct("customerName");
    const activeCustomers = activeCustomersResult.length;

   
    const metrics = {
      totalRevenue,
      totalOrders,
      activeCustomers,
    };

    return res.status(200).json(metrics);
  } catch (err) {
    console.error("getAnalyticsMetrics error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get sales data for charts
export const getSalesData = async (req, res) => {
  try {
    // Get sales data for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: 'CANCELLED' }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    return res.status(200).json(salesData);
  } catch (err) {
    console.error("getSalesData error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};