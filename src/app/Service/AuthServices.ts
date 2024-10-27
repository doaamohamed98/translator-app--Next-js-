import Cookies from 'js-cookie';
import api from './api';

interface UserData {
  email: string;
  password: string;
  name?: string; 
}


export const createUser = async ({ email, password, name }: UserData)=>{
  try{
    const response = await api.post('/auth/signup',{ email, password, name })
     return response.data
  }catch(error:any){
    console.error("Error creating user:", error);
    throw new Error( error.response?.data?.message ||"Failed to create user");
  }
    
}


export const LoginUser = async ({ email, password }: UserData)=>{
  try{
    const response = await api.post('/auth/login',{ email, password },);
  const authToken = response.data;
    Cookies.set('authToken', authToken, {path: '/' , expires: 7});
   return authToken

  }catch (error:any){
    console.error("Error logging in:", error);
    throw new Error(error.response?.data?.message||"Failed to log in");
  }
  
}

