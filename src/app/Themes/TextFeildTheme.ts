"use client"
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
                margin: '10px',
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
      },
})