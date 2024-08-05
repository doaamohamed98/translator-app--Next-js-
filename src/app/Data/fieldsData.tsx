
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { ReactNode } from 'react';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";



 export interface RegisterField {
    placeholder: string;
    name: string;
    icon: ReactNode;
    eyeIcon?: ReactNode;
}

export const RegistersData: RegisterField[] = [
    {
     placeholder: "Enter Full name",
        name: "fullname",
         icon:<CiUser/>, 
          },

    { 
        placeholder: "Enter Email",
        name: "email",
         icon: <AiOutlineMail/>,
           },

    {
         placeholder: "Enter Password", 
         name: "password",
         icon: <CiLock />,
         eyeIcon: <GoEyeClosed />
        },
]