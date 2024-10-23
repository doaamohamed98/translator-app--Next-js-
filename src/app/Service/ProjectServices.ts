import axios from 'axios';
import Cookies from 'js-cookie';
import api from './api';


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
    console.log("createProject",response.data)
      return response.data;

  }

  export const getAllProjects = async () =>{
    const token = Cookies.get("authToken");
    const response = await api.get("/projects",{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    console.log("getAllProjects",response.data)
    return response.data
}


export const getProjectsById = async (id:string) =>{
  const token = Cookies.get("authToken");
  const response = await api.get(`/projects/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteProject = async (id:string) =>{
  const token = Cookies.get("authToken");
  const response = await api.delete(`/projects/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}