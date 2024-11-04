import Cookies from "js-cookie";
import api from "./api";

export const getLanguages = async () => {
  try {
    // const token = Cookies.get("authToken");
    const response = await api.get("/languages", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error getting languages:", error);
    throw new Error(error.response?.data?.message);
  }
};
