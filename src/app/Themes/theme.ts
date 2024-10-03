"use client";
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: '16px',
          padding: "5px 20px",
          margin: "10px auto",
          width: "100%",
        },
        contained: {
          boxShadow: 'none',
          borderRadius: 10,
          padding: "10px",
          background: "#2563EB",
          color: "white",
          '&:hover': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: "",
            color: '#ffffff',
          },
        },
        outlined: {
          boxShadow: 'none',
          border: "2px solid #E2E8F0 ",
          background: "transparent",
          color: "black",
          borderRadius: "10px",
          '&:hover': {
            boxShadow: 'none',
            border: "2px solid #E2E8F0 ",
          },
          '&.Mui-disabled': {
            backgroundColor: "",
            color: '#ffffff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '5px 0',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 15,
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#64748B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64748B',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width:"240px",
          backgroundColor: '#FFFFFF',
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          margin: '5px 0',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#e0e0e0',
            color: "#2563EB",
          },
          '&.Mui-selected': {
            backgroundColor: '#d1e7ff',
            '&:hover': {
              backgroundColor: '#b6d4ff',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          color:"#64748B",
          '& svg': {
            fontSize: '1.5rem',
          },
         
          '&:hover': {
            color: 'red', 
          },
        },
      },
    },
   
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'beige',
          '& .MuiTableCell-root': {
            fontSize: '16px',
            fontWeight: '600',
          },
        },
      },
    },
    MuiTableCell:{
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: '600',
          padding: '12px', 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          '@media (max-width: 700px)':{
            overflow: 'scroll',
            
          }
         
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F1F5F9',
          },
          '&:nth-of-type(odd)': {
            backgroundColor: '#F9FAFB',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
  },



  
  

 
});
