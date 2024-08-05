import Buttoon from "@/components/Button-signin-signup/Button";
import styles from "./page.module.css";
import TextField from "@/components/TextField/TextField";
import { InputAdornment} from '@mui/material';
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa6";


export default function Home() {
  return (<>
 
   <h1>Welcome Home pag</h1>
   <Buttoon text="Sign up" variat="contained"/>

   <Buttoon text="Sign in" variat="contained"/>
   <div>
  
   <TextField 
    placeholder="full name" 
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CiUser />
        </InputAdornment>
      ),

    }}/>

<TextField 
    placeholder="Email" 
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <MdOutlineMail/>
        </InputAdornment>
      ),}}/>

<TextField 
    placeholder="Password" 
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CiLock />
        </InputAdornment>
      ),endAdornment: (
        <InputAdornment position="end">
          <FaRegEyeSlash /> 
        </InputAdornment>
      ),
    
    }}/>

  
   </div>

       

   </>
  );
}
