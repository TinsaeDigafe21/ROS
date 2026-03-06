import MenuItem from "../models/MenuItem.js";

// Create a new menu item (Admin only)
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const menuItem = new MenuItem({
      name: name.trim(),
      description: description ? description.trim() : undefined,
      price,
      category: category.trim(),
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    const savedItem = await menuItem.save();

    return res.status(201).json(savedItem);
  } catch (err) {
    console.error("createMenuItem error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
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

// Update a menu item (Admin only)
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    if (updates.name) updates.name = updates.name.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.category) updates.category = updates.category.trim();

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    return res.status(200).json(updatedItem);
  } catch (err) {
    console.error("updateMenuItem error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
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