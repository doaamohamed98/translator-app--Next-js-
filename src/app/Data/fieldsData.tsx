
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { ReactNode } from 'react';

 export interface RegisterField {
    placeholder: string;
    name: string;
    icon: ReactNode;
    type?:string
}

export const RegistersData: RegisterField[] = [
    {
     placeholder: "Enter Full name",
        name: "fullname",
        type:"text",
         icon:<CiUser/>, 
          },

    { 
        placeholder: "Enter Email",
        name: "email",
         type:"email",
         icon: <AiOutlineMail/>,
           },

    {
         placeholder: "Enter Password", 
         name: "password",
         type:"password",
         icon: <CiLock />,
        },
]