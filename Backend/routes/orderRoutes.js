import express from "express";import { placeOrder, getAllOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: place a new order
router.post("/", placeOrder);

// Protected (admin/kitchen): get all orders
router.get("/", authenticateToken, authorizeRoles("admin", "kitchen"), getAllOrders);

// Protected: get order by ID
router.get("/:id", getOrderById);

// Protected: update order status
router.put("/:id/status", authenticateToken, authorizeRoles("admin", "kitchen"), updateOrderStatus);

export default router;