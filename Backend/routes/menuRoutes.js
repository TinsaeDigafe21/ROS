import express from "express";
import { createMenuItem, getMenuItems, getPopularMenuItems, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to get all menu items
router.get("/", getMenuItems);

// Public route to get top popular menu items
router.get("/popular", getPopularMenuItems);

// Admin only: create menu item
router.post("/", authenticateToken, authorizeRoles("admin"), createMenuItem);

// Admin only: update menu item
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateMenuItem);

// Admin only: delete menu item
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteMenuItem);

export default router;