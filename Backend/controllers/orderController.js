import Order from "../models/Order.js";

// Place a new order (Public)
export const placeOrder = async (req, res) => {
  try {
    const { customerName, tableNumber, items, totalPrice } = req.body;

    if (!customerName || !tableNumber || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Customer name, table number, items, and total price are required." });
    }

    // Generate unique orderNumber
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const order = new Order({
      orderNumber,
      customerName: customerName.trim(),
      tableNumber,
      items,
      totalPrice,
    });

    const savedOrder = await order.save();

    return res.status(201).json(savedOrder);
  } catch (err) {
    console.error("placeOrder error", err);
    if (err.code === 11000) { 
      return res.status(409).json({ message: "Order number conflict. Please try again." });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all orders (Admin/Kitchen)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    console.error("getAllOrders error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get order by ID (Admin/Kitchen)
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items.menuItem');
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.status(200).json(order);
  } catch (err) {
    console.error("getOrderById error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update order status (Admin/Kitchen)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Preparing", "Ready"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be Pending, Preparing, or Ready." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('items.menuItem');

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("updateOrderStatus error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get dashboard metrics (Admin only)
export const getDashboardMetrics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
          avg: { $avg: "$totalPrice" }
        }
      }
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const averageOrderValue = totalRevenueResult[0]?.avg || 0;

    // Count distinct active customers by name
    const activeCustomers = await Order.distinct('customerName');
    const totalCustomers = activeCustomers.length;

    return res.status(200).json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
    });
  } catch (err) {
    console.error("getDashboardMetrics error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get daily order counts for the last 7 days (Admin only)
export const getDailyOrders = async (req, res) => {
  try {
    const days = parseInt(req.query.days, 10) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    const dailyData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Fill missing days
    const result = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const key = date.toISOString().split('T')[0];
      const dayData = dailyData.find((d) => d._id === key);
      result.push({
        date: key,
        count: dayData ? dayData.count : 0,
        revenue: dayData ? dayData.revenue : 0,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("getDailyOrders error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};