import axios from 'axios';
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });



export const createUser = async (userData)=>{
        const response = await api.post('/auth/signup',userData)
        console.log(`User registration:`,response.data);
         return response.request
  
}
