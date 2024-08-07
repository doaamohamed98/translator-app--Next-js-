"use client"
import { RegistersData } from '@/app/Data/fieldsData';
import ButtonComponent from '@/Component/Button';
import TextFieldComponent from '@/Component/TextField';
import { Box, Container, FormControl, Typography,InputAdornment, Divider, FormControlLabel, Checkbox,Link } from '@mui/material';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@/app/Utils/AuthValidation'
import { createUser } from '@/app/Service/AuthService';
import {  toast } from 'react-toastify';
import FacebookIcon  from "../../../../public/Assets/icons8-facebook.svg";
import GoogleIcon from "../../../../public/Assets/icons8-google.svg";
import Image from "next/image";




interface FormData {
  fullName: string;
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
      if(error.response.data.error==="Conflict"){
        setError('email', {
            type: 'manual',
            message: "User Already Exists"});
       }else{
       toast.error(`Registration failed. Please try again`)
      }
    }
  }


  return(<>
  <Container maxWidth="lg"sx={{display:"flex",justifyContent:"space-around", alignItems:"center",width:"100%",height:"90vh"}}>
    <Box >
      
        <form onSubmit={handleSubmit(onSubmit)}>
         <Typography variant='h5' mb={2} fontWeight="bold">Sign up for an Account</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {RegistersData.map((input)=>

            <FormControl key={input.name}>
                <TextFieldComponent 
                type={input.type}
                placeholder={input.placeholder}
                {...register(input.name as keyof FormData)}
                error={!!errors[input.name as keyof FormData]}
                  helperText={errors[input.name as keyof FormData]?.message}
                    />
                    
            </FormControl>
            )}
            </Box>

   <Box display="flex" alignItems="center" my={2} >
      <FormControlLabel control={<Checkbox/>}
           label={
          <Typography variant="caption" component="h5"  width={300} color="#64748B">
            By creating an account you agree to the 
            <Link href="/terms" sx={{ color: '#0F172A', textDecoration:"none",fontWeight: "bold" }} >
              Terms & Conditions
            </Link> 
            and our 
            <Link href="/privacy" sx={{ color: '#0F172A'  ,textDecoration:"none" ,fontWeight: "bold"}} >
              Privacy Policy
            </Link>.
          </Typography>
        }
      />
    </Box>


          <ButtonComponent text='sign up' variant="contained" type='submit'/>
          

          <Box sx={{display:"flex", justifyContent:"space-between" ,alignItems:"center",width:"100%"}} my={2}>
      <Box flex={1}>
        <Divider sx={{color:"#64748B"}} />
      </Box>
      <Typography variant="caption" mx={2} color="#64748B"> Or sign up with</Typography>
      <Box flex={1}>
        <Divider sx={{color:"#64748B"}} />
      </Box>
          </Box>

        <Box sx={{display:"flex", justifyContent:"space-between" ,alignItems:"center",gap:2}}>
          <ButtonComponent text='Google' variant="outlined" type='button'
           icon={<Image src={GoogleIcon} alt="GoogleIcon" width={20}/>} />
          <ButtonComponent text='Google' variant="outlined"  type='button'
          icon={<Image src={FacebookIcon} alt="FacebookIcon" width={20}/>} />
        </Box>

        <Box sx={{display:"flex" , justifyContent:"center", alignItems:"center" }} my={2}>
          <Typography variant='caption' component="h1"> Already have an account? 
            <Link href={"/sign-in"} sx={{color:"#2563EB" ,textDecoration:"none",fontWeight: "bold"}}> Log In</Link>
            </Typography>
        </Box>


        </form>

    </Box>


  </Container>

  </>)
}

export default Page