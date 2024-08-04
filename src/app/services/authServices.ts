import axios from 'axios';
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });

interface UserData {
    fullName: string;
    email: string;
    password: string;
  }


export const createUser = async (userData: UserData)=>{
        const response = await api.post('/auth/signup',userData)
        console.log(`User registration:`,response.data);
         return response
  
}
