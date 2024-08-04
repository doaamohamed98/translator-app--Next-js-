import axios from 'axios';
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });

interface UserData {
    fullName: string;
    email: string;
    password: string;
  }

//   export const checkUserExists = async (email:string) =>{

//     try{
//         const response = await api.get('/auth/signup');
//         return response.data
//     }catch(error){
//         console.error('Error checking user existence:', error);
//     }
//   }

export const createUser = async (userData: UserData)=>{
    try{
        const response = await api.post('/auth/signup',userData)
        console.log(`User registration:`,response.data);
         return response
    } catch(error){
        console.log(error);
        throw new Error('User registration failed');
    }
        
}
