import axios from '../api/axios';

// Get all menu items
export const getMenuItems = async (search = "") => {
  try {
    const response = await axios.get(`/menu?search=${search}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new menu item (admin only)
export const createMenuItem = async (menuItemData) => {
  try {
    const response = await axios.post('/menu', menuItemData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a menu item (admin only)
export const updateMenuItem = async (id, updates) => {
  try {
    const response = await axios.put(`/menu/${id}`, updates, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a menu item (admin only)
export const deleteMenuItem = async (id) => {
  try {
    const response = await axios.delete(`/menu/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
