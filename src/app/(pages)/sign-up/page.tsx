"use client";
import { RegistersData } from '@/app/Data/fieldsData';
import ButtonComponent from '@/Component/Button';
import { Box, Container, FormControl,Typography,Divider,FormControlLabel, Checkbox,Link, TextField, InputAdornment } from '@mui/material';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@/app/Utils/AuthValidation'
import { createUser } from '@/app/Service/AuthService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FacebookIcon  from "@/Assets/icons8-facebook.svg";
import GoogleIcon from "@/Assets/icons8-google.svg";
import Image from "next/image";
import  styles from "./style.module.scss"
import usePasswordVisibility from '@/app/Hooks/usePasswordVisibility';


interface FormData {
  fullName: string;
  email: string;
  password: string;
}
const Page: NextPage<FormData> = ({}) => {
const {getPasswordInputProps} = usePasswordVisibility();

const router = useRouter();
  
const { register, handleSubmit, formState: { errors} ,setError , reset } = useForm<FormData>({
    resolver:yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<FormData> = async(data:FormData) =>{
  
    try{
      const newUser = await createUser(data)
      toast.success("Successful to Create Account")
      reset()
      router.push('/sign-in');
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

  <div className={styles.Container} >
      
        <form onSubmit={handleSubmit(onSubmit)}>
         <Typography variant='h5' mb={2} fontWeight="bold">Sign up for an Account</Typography>

            <div className={styles["Container_FormControl"]}>
            {RegistersData.map((input)=>
            <FormControl key={input.name}>
                <TextField
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {input.icon}
                    </InputAdornment>
                  ), ...(input.type === "password" ? getPasswordInputProps().InputProps : { type: input.type }),
                }}
                placeholder={input.placeholder}
                {...register(input.name as keyof FormData)}
                error={!!errors[input.name as keyof FormData]}
                  helperText={errors[input.name as keyof FormData]?.message}
                    />
                    
            </FormControl>
            )}
            </div>

   <div className={styles['terms-and-conditions']}>
      <FormControlLabel control={<Checkbox/>}
           label={
          <Typography variant="caption" className={styles['terms-and-conditions-text']}>
            By creating an account you agree to the 
            <Link href="/terms" className={styles['terms-and-conditions-text_Links']} >
              Terms & Conditions
            </Link> 
            and our 
            <Link href="/privacy"className={styles['terms-and-conditions-text_Links']} >
              Privacy Policy
            </Link>
          </Typography>
        }
      />
    </div>


        <ButtonComponent text='sign up' variant="contained" type='submit'/>
          

          <div className={styles['container_Or_with']}>
      <Box flex={1}>
        <Divider />
      </Box>
      <Typography variant="caption" mx={2}> Or sign up with</Typography>
      <Box flex={1}>
        <Divider />
      </Box>
          </div>

        <div className={styles['button-container']}>
          <ButtonComponent text='Google' variant="outlined" type='button'
           icon={<Image src={GoogleIcon} alt="GoogleIcon" width={30}/>}/>
          <ButtonComponent text='Google' variant="outlined"  type='button'
          icon={<Image src={FacebookIcon} alt="FacebookIcon" width={30}/>}/>
        </div>

        <div className={styles['base_flex']}>
          <Typography variant='caption'> Already have an account? 
            <Link href={"/sign-in"} className={styles['base_Link']}> Log In</Link>
            </Typography>
        </div>


        </form>

        </div>

  </>)
}

export default Page