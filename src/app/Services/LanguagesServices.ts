import axios from 'axios';
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });

  export const getLanguages = async ()=> {
    const token = Cookies.get("authToken");
    const response = await api.get('/languages',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data)
      return response.data;
  
  }