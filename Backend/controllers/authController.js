import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Register a new kitchen staff user
export const registerKitchenStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    // check if user exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      role: "kitchen",
    });

    await user.save();

    return res.status(201).json({ message: "Kitchen staff registered successfully." });
  } catch (err) {
    console.error("registerKitchenStaff error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login for admin or kitchen staff
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (user.role !== "admin" && user.role !== "kitchen") {
      return res.status(403).json({ message: "User not allowed to login." });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    return res.json({ token, user: payload });
  } catch (err) {
    console.error("loginUser error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
