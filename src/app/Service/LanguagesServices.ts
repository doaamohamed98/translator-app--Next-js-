import axios from 'axios';
import Cookies from "js-cookie";
import api from './api';


  export const getLanguages = async ()=> {
    const token = Cookies.get("authToken");
    const response = await api.get('/languages',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;

  }


  