import axios from 'axios';
import Cookies from 'js-cookie';
const api = axios.create({
    // baseURL: 'https://translation-production-95a3.up.railway.app'
    baseURL:'http://localhost:8000/'
  });


export const createUser = async (userData:any)=>{
    const response = await api.post('/auth/signup',userData)
     return response.data
}


export const LoginUser = async (userData:any)=>{
  const response = await api.post('/auth/login',userData,);
  const authToken = response.data;
    Cookies.set('authToken', authToken, {path: '/' , expires: 7});
   return authToken
}

