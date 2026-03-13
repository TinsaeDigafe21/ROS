import express from "express";
import {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithItemCount
} from "../controllers/categoryController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getCategories);
router.get("/with-count", getCategoriesWithItemCount);

// Admin only routes
router.get("/all", authenticateToken, authorizeRoles("admin"), getAllCategories);
router.post("/", authenticateToken, authorizeRoles("admin"), createCategory);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteCategory);

export default router;