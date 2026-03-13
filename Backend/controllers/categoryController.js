import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";

// Get all categories (Public)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json(categories);
  } catch (err) {
    console.error("getCategories error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all categories including inactive (Admin only)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return res.status(200).json(categories);
  } catch (err) {
    console.error("getAllCategories error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Create a new category (Admin only)
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, colorClass } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // Check if category already exists
    const existing = await Category.findOne({ name: name.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const category = new Category({
      name: name.trim(),
      description: description ? description.trim() : undefined,
      icon: icon || "UtensilsCrossed",
      colorClass: colorClass || "bg-gray-50 text-gray-500",
    });

    const savedCategory = await category.save();

    return res.status(201).json(savedCategory);
  } catch (err) {
    console.error("createCategory error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a category (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    if (updates.name) updates.name = updates.name.trim();
    if (updates.description) updates.description = updates.description.trim();

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json(updatedCategory);
  } catch (err) {
    console.error("updateCategory error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    console.error("deleteCategory error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get category with item count
export const getCategoriesWithItemCount = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });

    // Get item count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const itemCount = await MenuItem.countDocuments({ category: category.name });
        return {
          ...category.toObject(),
          itemsCount: itemCount,
        };
      })
    );

    return res.status(200).json(categoriesWithCount);
  } catch (err) {
    console.error("getCategoriesWithItemCount error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};