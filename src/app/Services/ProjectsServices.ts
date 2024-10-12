import axios from 'axios';
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: 'https://translation-production-95a3.up.railway.app'
  });

  interface ProjectData {
    title: string;
    targetLanguages: string[];
  }

  export const createProject = async (projectData:ProjectData)=> {
    const token = Cookies.get("authToken");
    console.log(projectData)
    const response = await api.post('/projects',projectData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data)
      return response.data;
  
  }

export const getAllProjects = async () =>{
    const token = Cookies.get("authToken");
    const response = await api.get("/projects",{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    // console.log(response.data)
    return response.data
}

export const getProjectsById = async (id:string) =>{
  const token = Cookies.get("authToken");
  const response = await api.get(`/projects/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  })
  // console.log(response.data)
  return response.data
}

export const deleteProject = async (id:string) =>{
  const token = Cookies.get("authToken");
  const response = await api.delete(`/projects/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  })
  // console.log(response.data)
  return response.data
}


