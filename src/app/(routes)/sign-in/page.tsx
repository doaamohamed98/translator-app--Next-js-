"use client";
import { NextPage } from 'next'
import { Box ,Container ,Typography,FormControl ,TextField, FormGroup, InputAdornment, Divider ,Button ,IconButton} from '@mui/material';
import { useState } from 'react';
import { Email as EmailIcon,Lock as LockIcon,Visibility,VisibilityOff,Facebook as FacebookIcon, Google as GoogleIcon} from '@mui/icons-material';
import Buttoon from '@/components/Button';
import Signwith from '@/components/Signwith';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/app/Utils/AuthValidation';
import { LoginUser } from '@/app/services/authServices';
import { toast } from 'react-toastify';

interface LoginData {
    email:string,
    password:string,
  };
  

const Page: NextPage<LoginData> = ({}) => {
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register: login, handleSubmit, formState: { errors } ,reset} = useForm<LoginData>({
      resolver:yupResolver(LoginSchema),
    });

    const onSubmit= async (DataUser:LoginData)=>{
      try{
        const data = await LoginUser(DataUser);
        toast.success("Login is successful")
        reset()
         return data
      }catch(error:any){
        toast.error(error.response.data.message)
      }

    }
  return <>
  <Container  maxWidth="lg"sx={{width:"100%",height:"100vh" ,display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Box>
    <Typography variant="h5" component="h1"> Sign In to your Account</Typography>
    <Typography variant="caption" component="h1"> Welcome back! please enter your detail</Typography>

    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl margin='normal'>
        <TextField
         {...login("email")}
         variant="outlined" placeholder=' Email'
         error={!!errors.email}
          helperText ={errors.email ? errors.email.message : ""}
          InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),}}
        
          />
        </FormControl>

        <FormControl margin='normal'>
            <TextField
             {...login("password")}
                variant="outlined"
                error={!!errors.password}
          helperText ={errors.password ? errors.password.message : ""}
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
       
            />
        </FormControl>

        <Buttoon text='sign in'/>
          <Signwith/>

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                        <Typography variant='body2'>
                        Don’t have an account?  
                            <Link  href={"/sign-up"}>
                                Sign up
                            </Link>
                        </Typography>
          </Box>
    </form>

    

       

    </Box>

  </Container>
  </>
}

export default Page