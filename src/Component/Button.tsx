"use client";
import { NextPage } from 'next'
import { Button} from '@mui/material';


interface Props {
    text:string,
    variant:"text" | "outlined" | "contained",
    type:"button" | "submit" | "reset",
    icon?:React.ReactNode;
}

const ButtonComponent: NextPage<Props> = ({text,variant ,icon,type}) => {
  return (
   
    <Button variant={variant} type={type} startIcon={icon}>
          {text}
    </Button>
  )
  
   
  
}

export default ButtonComponent