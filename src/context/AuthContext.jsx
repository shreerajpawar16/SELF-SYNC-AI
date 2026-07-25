import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('selfsync_token');
    const savedUser = localStorage.getItem('selfsync_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('selfsync_token');
        localStorage.removeItem('selfsync_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('selfsync_token', token);
      localStorage.setItem('selfsync_user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Welcome back!');
      return userData;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await authAPI.register(name, email, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('selfsync_token', token);
      localStorage.setItem('selfsync_user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Account created successfully!');
      return userData;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('selfsync_token');
    localStorage.removeItem('selfsync_user');
    localStorage.removeItem('selfsync_history');
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

