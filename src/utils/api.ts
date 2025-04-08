import axios from 'axios';

// 根據環境變量獲取API基礎URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://4.240.61.223';

// 創建axios實例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    // 從sessionStorage獲取token
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 響應攔截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 處理錯誤響應
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default api;
