import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api, { getStoredToken, setToken as persistToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/user/me');
      setUser(res.data.user);
    } catch (err) {
      console.warn('Profile fetch failed', err?.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      const savedToken = await getStoredToken();
      if (savedToken) {
        setToken(savedToken);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      await persistToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setAuthLoading(false);
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post('/auth/signup', payload);
      setToken(data.token);
      await persistToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setAuthLoading(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    await persistToken(null);
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const { data } = await api.put('/user/me', updates);
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, authLoading, login, signup, logout, fetchProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

