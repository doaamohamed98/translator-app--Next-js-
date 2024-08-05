"use client"
import { createTheme } from '@mui/material/styles';

 export const themeButton = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          textTransform: 'capitalize', 
          fontSize: '16px', 
          background:"#2563EB",
          color:"white",
          width:"100%",
          margin:"10px auto"
        },
        contained: {
          boxShadow: 'none', 
          '&:hover': {
            boxShadow: 'none', 
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
  