
import Cookies from "js-cookie";
import api from './api';

  interface TranslatData {
    key: string;
    text: string;
  }

  interface UpdateData{
    key:string;
    text: string;
    UpdateLanguages: string[];
  }

  export const createTranslatProject = async ({key,text}:TranslatData,projectId:any)=> {
    try{
        const token = Cookies.get("authToken");
    const response = await api.post(`/projects/${projectId}/dictionaries`,{key,text},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch(error:any){
      console.error("Error creating translation project",error)
      throw new Error(error.response?.data?.message);
    }
  
  }

  export const getOneLanguage = async (projectId:any,language:string)=> {
    try{
       const token = Cookies.get("authToken");
    const response = await api.get(`/projects/${projectId}/dictionaries/${language}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
    }catch(error:any){
      console.error("Error getting one language",error)
      throw new Error(error.response?.data?.message);

    }
   

  }


  export const getAllTranslation = async (projectId:string)=> {
    try{
      const token = Cookies.get("authToken");
    const response = await api.get(`/projects/${projectId}/dictionaries`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });

      return response.data;
    }catch(error:any){
      console.error("Error getting all translations:",error);
      throw new Error(error.response?.data?.message );
    }
    

  }

  export const DeleteTranslation = async (projectId:string , id:string)=> {
    try{
      const token = Cookies.get("authToken");
    const response = await api.delete(`/projects/${projectId}/dictionaries/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
    }catch(error:any){
      console.error("Error deleting translation:", error);
      throw new Error(error.response?.data?.message);
    }
    

  }

  export const UpdateTranslation = async (projectId:string , id:string , {key,text,UpdateLanguages} :UpdateData)=> {
    try{
      const token = Cookies.get("authToken");
    const response = await api.patch(`/projects/${projectId}/dictionaries/${id}`,{key,text,UpdateLanguages},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
    }catch(error:any){
      console.error("Error Updateing translation:", error);
      throw new Error(error.response?.data?.message);

    }
    

  }
