import express from "express";
import { getAnalyticsMetrics, getSalesData } from "../controllers/analyticsController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get dashboard metrics (Admin only)
router.get("/metrics", authenticateToken, authorizeRoles("admin"), getAnalyticsMetrics);

// Get sales data (Admin only)
router.get("/sales", authenticateToken, authorizeRoles("admin"), getSalesData);

export default router;