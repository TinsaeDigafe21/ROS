import express from "express";
import { registerKitchenStaff, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Kitchen staff register
router.post("/register", registerKitchenStaff);

// Admin or Kitchen login
router.post("/login", loginUser);

export default router;