"use client"
import { createTheme } from '@mui/material/styles';

 export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'capitalize', 
          fontSize: '16px', 
          background:"#2563EB",
          color:"white",

          
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
  
