import axios from 'axios';
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });



export const createUser = async (userData)=>{
    const response = await api.post('/auth/signup',userData)
     return response.data
}
