import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token: newToken, user: userPayload } = response.data;

      setToken(newToken);
      setUser(userPayload);

      return { success: true, user: userPayload };
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
