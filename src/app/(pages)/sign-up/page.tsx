"use client"
import { RegistersData } from '@/app/Data/fieldsData'
import Buttoon from '@/Component/Button-signin-signup/Button'
import TextFieldComponent from '@/Component/TextFeild'
import { Box, Container, FormControl, Typography,InputAdornment } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@/app/Utils/AuthValidation'
import { createUser } from '@/app/Service/AuthService';
import {  toast } from 'react-toastify';


interface FormData {
  fullname: string;
  email: string;
  password: string;
}

const Page: NextPage<FormData> = ({}) => {
  
  const { register, handleSubmit, formState: { errors} ,setError , reset } = useForm<FormData>({
    resolver:yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<FormData> = async(data:FormData) =>{
    console.log(data);
    try{
      const newUser = await createUser(data)
      toast.success("Successful to Create Account")
      reset()
      return newUser
    }catch (error :any){
     console.log(error.response)
    }
  }


  return(<>
  <Container maxWidth="md"sx={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",height:"90vh"}}>
    <Box sx={{width:{xs:"100%" , md:"50%"}}}> 
      <Typography variant='h5' sx={{marginBottom:"10px"}}>Sign up for an Account</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {RegistersData.map((input)=>

            <FormControl key={input.name}>
                <TextFieldComponent 
                type={input.type}
                placeholder={input.placeholder}
                {...register(input.name)}
                error={!!errors[input.name]}
                  helperText={errors[input.name]?.message}
                    />
                    
            </FormControl>
            )}
        </Box>
        <Buttoon text='sign up' variat="contained"/>
        <Box sx={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
          <Typography variant='caption' component="h1"> Already have an account? 
            <Link href={"/sign-in"} > Log In</Link>
            </Typography>
        </Box>
        </form>

    </Box>


  </Container>

  </>)
}

export default Page