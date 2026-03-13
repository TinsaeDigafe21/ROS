import axios from '../api/axios';

// Get all active categories
export const getCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all categories with item count
export const getCategoriesWithItemCount = async () => {
  try {
    const response = await axios.get('/categories/with-count');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all categories (admin only)
export const getAllCategories = async () => {
  try {
    const response = await axios.get('/categories/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a category (admin only)
export const updateCategory = async (id, updates) => {
  try {
    const response = await axios.put(`/categories/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a category (admin only)
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};