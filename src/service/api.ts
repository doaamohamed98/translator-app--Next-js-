import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
     // baseURL: 'https://translation-production-95a3.up.railway.app'
  baseURL: 'http://localhost:8000/' 
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;