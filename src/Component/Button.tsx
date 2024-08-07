"use client";
import { NextPage } from 'next'
import { Button, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themeButton } from '@/app/Themes/ButtonTheme';


interface Props {
    text:string,
    variant:"text" | "outlined" | "contained",
    type:"button" | "submit" | "reset",
    icon?:React.ReactNode;
}

const ButtonComponent: NextPage<Props> = ({text,variant ,icon,type}) => {
  return (
    <ThemeProvider theme={themeButton}>
    <Button variant={variant} type={type} startIcon={icon}>
          {text}
    </Button>

    </ThemeProvider>
  )
  
   
  
}

export default ButtonComponent