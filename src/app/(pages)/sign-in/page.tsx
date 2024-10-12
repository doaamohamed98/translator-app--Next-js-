"use client";
import {  Box, Container, FormControl,Typography,Divider,Link, TextField, InputAdornment,Button } from '@mui/material'
import { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {LoginSchema } from '@/app/Utils/AuthValidation'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FacebookIcon  from "@/Assets/icons8-facebook.svg";
import GoogleIcon from "@/Assets/icons8-google.svg";
import Image from "next/image";
import  styles from "./style.module.scss"
import usePasswordVisibility from '@/app/Hooks/usePasswordVisibility';
import { LoginData } from '@/app/Data/fieldsData';
import { LoginUser } from '@/app/Services/AuthService';


interface LoginFormInputs {
  email: string;
  password: string;
}
const Page: NextPage = () => {

  const {getPasswordInputProps} = usePasswordVisibility();

const router = useRouter();
  
const { register:Login, handleSubmit, formState: { errors} ,reset } = useForm<LoginFormInputs>({
    resolver:yupResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginFormInputs> = async(data:LoginFormInputs) =>{
  try{
    const uerLogin = await LoginUser(data);
    toast.success("Login is successful")
      reset()
      router.push('/home');
      return uerLogin
  } catch(error:any){
    toast.error(error.response.data.message)
  }
  }

  return <>
  <Container >
    <Box className={styles.Container}>

    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    
       <Typography variant='h5'fontWeight="bold">Sign In to your Account</Typography>
        <Typography variant='caption'className={styles.caption} >Welcome back! please enter your detail</Typography>
   

    <Box  className={styles.Container_FormControl}>
            {LoginData.map((input)=>
            <FormControl key={input.name}>
                <TextField
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {input.icon}
                    </InputAdornment>
                  ), ...(input.type === "password" ? getPasswordInputProps().InputProps : { type: input.type }),
                }}
                type={input.name === "password" ? getPasswordInputProps().type : input.type}
                placeholder={input.placeholder}
                {...Login(input.name as keyof LoginFormInputs)}
                error={!!errors[input.name as keyof LoginFormInputs]}
                  helperText={errors[input.name as keyof LoginFormInputs]?.message}

                    />
                    
            </FormControl>
            )}
            </Box>
           
            <Button variant="contained" type='submit' > sign in </Button>
          

          <Box className={styles.container_Or_with}>
      <Box className={styles.Divider} >
        <Divider />
      </Box>
      <Typography variant="caption" > Or sign up with</Typography>
      <Box className={styles.Divider} >
        <Divider />
      </Box>
          </Box>

        <Box className={styles.buttonProviderContainer}>
          <Button variant="outlined" type='button'
           startIcon={<Image src={GoogleIcon} alt="GoogleIcon" width={30}/>}>
             Google
          </Button>
          <Button variant="outlined" type='button' 
           startIcon={<Image src={FacebookIcon} alt="FacebookIcon" width={30}/>} >
             Facebook
          </Button>
        </Box>

        <Box className={styles.baseFlex}>
          <Typography variant='caption'> Don’t have an account? 
            <Link href={"/sign-up"} className={styles.baseLink}> Sign Up</Link>
            </Typography>
        </Box>


    </form>
    </Box>
  </Container>
  
  </>
}

export default Page