import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}).single('image');

// Create a new menu item (Admin only)
export const createMenuItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, description, price, category, isAvailable } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({ message: "Name, price, and category are required." });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required." });
      }

      const menuItem = new MenuItem({
        name: name.trim(),
        description: description ? description.trim() : undefined,
        price: parseFloat(price),
        category: category.trim(),
        image: req.file.path, // Store the file path
        isAvailable: isAvailable === 'true' || isAvailable === true,
      });

      const savedItem = await menuItem.save();

      return res.status(201).json(savedItem);
    } catch (err) {
      console.error("createMenuItem error", err);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
};

// Get all menu items (Public)
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({}).sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.error("getMenuItems error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get popular menu items based on order frequency (Public)
export const getPopularMenuItems = async (req, res) => {
  try {
    // Aggregate orders to find most common items
    const popularItemsAggregation = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.menuItem", totalOrdered: { $sum: "$items.quantity" } } },
      { $sort: { totalOrdered: -1 } },
      { $limit: 6 }
    ]);
    
    // If no orders yet, fallback to random or latest items
    let popularIds = popularItemsAggregation.map(item => item._id);
    let items = [];
    
    if (popularIds.length > 0) {
        items = await MenuItem.find({ _id: { $in: popularIds }, isActive: true });
        // Sort items to match the aggregation order (highest first)
        items.sort((a, b) => {
            return popularIds.findIndex(id => id.equals(a._id)) - popularIds.findIndex(id => id.equals(b._id));
        });
    } else {
        items = await MenuItem.find({ isActive: true }).limit(6).sort({ createdAt: -1 });
    }
    
    return res.status(200).json(items);
  } catch (err) {
    console.error("getPopularMenuItems error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a menu item (Admin only)
export const updateMenuItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id } = req.params;
      const updates = req.body;

      // Remove undefined fields
      Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

      if (updates.name) updates.name = updates.name.trim();
      if (updates.description) updates.description = updates.description.trim();
      if (updates.category) updates.category = updates.category.trim();
      if (updates.price) updates.price = parseFloat(updates.price);
      if (updates.isAvailable !== undefined) updates.isAvailable = updates.isAvailable === 'true' || updates.isAvailable === true;

      if (req.file) {
        updates.image = req.file.path;
      }

      const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

      if (!updatedItem) {
        return res.status(404).json({ message: "Menu item not found." });
      }

      return res.status(200).json(updatedItem);
    } catch (err) {
      console.error("updateMenuItem error", err);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
};

// Delete a menu item (Admin only)
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    return res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (err) {
    console.error("deleteMenuItem error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};