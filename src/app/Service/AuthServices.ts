import Cookies from 'js-cookie';
import api from './api';



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

