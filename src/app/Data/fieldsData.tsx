
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { ReactNode } from 'react';

 export interface TextField {
    placeholder: string;
    name: string;
    icon: ReactNode;
    type?:string
}

export const RegistersData: TextField[] = [
    {
     placeholder: "username",
        name: "fullName",
        type:"text",
         icon:<CiUser/>, 
          },

    { 
        placeholder: " Email",
        name: "email",
         type:"email",
         icon: <AiOutlineMail/>,
           },

    {
         placeholder: " Password", 
         name: "password",
         type:"password",
         icon: <CiLock />,
        },
]

export const LoginData : TextField[]=[
    { 
        placeholder: " Email",
        name: "email",
         type:"email",
         icon: <AiOutlineMail/>,
           },

    {
         placeholder: " Password", 
         name: "password",
         type:"password",
         icon: <CiLock />,
        },

]