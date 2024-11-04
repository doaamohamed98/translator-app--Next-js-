import Cookies from "js-cookie";
import api from "./api";

interface ProjectData {
  title: string;
  targetLanguages: string[];
}

export const createProject = async ({
  title,
  targetLanguages,
}: ProjectData) => {
  try {
    // const token = Cookies.get("authToken");
    const response = await api.post(
      "/projects",
      { title, targetLanguages },
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error createing Project", error);
    throw new Error(error.response?.data?.message);
  }
};

export const getAllProjects = async () => {
  try {
    // const token = Cookies.get("authToken");
    const response = await api.get("/projects", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error getting all Project", error);
    throw new Error(error.response?.data?.message);
  }
};

export const getProjectsById = async (id: string) => {
  try {
    // const token = Cookies.get("authToken");
    const response = await api.get(`/projects/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error createing Id Project", error);
    throw new Error(error.response?.data?.message);
  }
};

export const deleteProject = async (id: string) => {
  try {
    // const token = Cookies.get("authToken");
    const response = await api.delete(`/projects/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleteing Project", error);
    throw new Error(error.response?.data?.message);
  }
};
