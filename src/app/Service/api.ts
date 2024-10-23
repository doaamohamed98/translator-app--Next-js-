import axios from 'axios';

const api = axios.create({
     // baseURL: 'https://translation-production-95a3.up.railway.app'
  baseURL: 'http://localhost:8000/' 
});

export default api;