import axios from 'axios';
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });

  interface TranslatData {
    key: string;
    text: string;
  }

  interface UpdateData{
    key:string;
    text: string;
    UpdateLanguages: string[];
  }

  export const createTranslatProject = async (TranslatData:TranslatData,projectId:any)=> {
    const token = Cookies.get("authToken");

    console.log(TranslatData , projectId,token)
    const response = await api.post(`/projects/${projectId}/dictionaries`,TranslatData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data)
      return response.data;
  
  }

  export const getOneLanguage = async (projectId:any,language:string)=> {
    const token = Cookies.get("authToken");
    const response = await api.get(`/projects/${projectId}/dictionaries/${language}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log( "getOneLanguage",response.data)
    // console.log(language)
      return response.data;
  
  }


  export const getAllTranslation = async (projectId:string)=> {
    const token = Cookies.get("authToken");
    const response = await api.get(`/projects/${projectId}/dictionaries`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
  
      return response.data;
  
  }

  export const DeleteTranslation = async (projectId:string , id:string)=> {
    const token = Cookies.get("authToken");
    const response = await api.delete(`/projects/${projectId}/dictionaries/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //  console.log(projectId, id )
  
      return response.data;
  
  }

  export const UpdateTranslation = async (projectId:string , id:string , data :UpdateData)=> {
    const token = Cookies.get("authToken");
    const response = await api.patch(`/projects/${projectId}/dictionaries/${id}`,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     console.log(projectId, id , data )
  
      return response.data;
  
  }