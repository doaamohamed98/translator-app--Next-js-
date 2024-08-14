import axios from 'axios';
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });



export const createUser = async (userData:any)=>{
    const response = await api.post('/auth/signup',userData)
     return response.data
}

export const LoginUser = async (userData:any)=>{
  const response = await api.post('/auth/login',userData)
   return response.data
}

