"use client"
import { createTheme } from '@mui/material/styles';

 export const themeButton = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize', 
          fontSize: '16px', 
          padding:"5px 20px",
          margin:"10px auto",
          width:"100%",
          
        },
        contained: {
          boxShadow: 'none', 
          borderRadius: 10,
          padding:"10px",
          background:"#2563EB",
          color:"white",
          '&:hover': {
            boxShadow: 'none', 
          },
          
          
          '&.Mui-disabled': {
            backgroundColor:  "" , 
            color: '#ffffff',
          },
        },

        outlined: {
          boxShadow: 'none', 
          border:"2px solid #E2E8F0 ",
          background:"transparent",
          color:"black",
          borderRadius:"10px",
          '&:hover': {
            boxShadow: 'none', 
            border:"2px solid #E2E8F0 ",
          },

          '&.Mui-disabled': {
            backgroundColor:  "" , 
            color: '#ffffff',
          },
        },
      },
    },
  },
});
  