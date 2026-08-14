import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getStoredToken = () => SecureStore.getItemAsync('kinetix_token');

api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const setToken = async (token) => {
  if (token) {
    await SecureStore.setItemAsync('kinetix_token', token);
  } else {
    await SecureStore.deleteItemAsync('kinetix_token');
  }
};

export default api;

