"use client";
import { NextPage } from 'next'
import { Box ,Container ,Typography,FormControl ,TextField, FormGroup, InputAdornment, Divider ,Button ,IconButton} from '@mui/material';
import { useState } from 'react';
import { Person as PersonIcon, Email as EmailIcon,Lock as LockIcon,Visibility,VisibilityOff,Facebook as FacebookIcon, Google as GoogleIcon} from '@mui/icons-material';
import Buttoon from '@/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistersSchema } from '@/app/Utils/AuthValidation';
import { createUser } from '@/app/services/authServices';
import { toast } from 'react-toastify';
import axios from 'axios';

interface DataForm {
    fullName: string;
    email: string;
    password: string;
}

const Page: NextPage<DataForm> = ({}) => {
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
   
    const { register, handleSubmit, formState: { errors } ,setError , reset } = useForm<DataForm>({
        resolver:yupResolver(RegistersSchema),
      });

      const onSubmit = async (userData: DataForm) =>{
        try{
            const newUser = await createUser(userData)
            toast.success("successful to Create account");
            reset()
            return newUser
            
        }catch (error){
            console.log(error)
        }
        
 
      }


  return <>
  <Container maxWidth="lg"sx={{width:"100%",height:"100vh" ,display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Box sx={{width:"30%"}}>
        <Typography variant="h5" component="h1"> Sign up For An Account</Typography>
         <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl margin='normal' >
        <TextField {...register("fullName")}  variant="outlined" placeholder='username'
                InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),}}
          error={!!errors.fullName}
          helperText={errors.fullName ? errors.fullName.message : ""}
           />
          
        </FormControl>

        <FormControl margin='normal'>
        <TextField {...register("email")} variant="outlined" placeholder=' Email'
          InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),}}
          error={!!errors.email}
          helperText ={errors.email ? errors.email.message : ""}
          />
        </FormControl>

        <FormControl margin='normal'>
            <TextField
            {...register("password")}
                variant="outlined"
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
                error={!!errors.password}
          helperText ={errors.password ? errors.password.message : ""}
            />
        </FormControl>

        <Buttoon text='Sign up'/>


        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography sx={{ marginX: 2 }} variant='body2' > or Sign up with</Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>

          <Box sx={{ display: 'flex', justifyContent:'space-evenly' , gap:2}}>
                    <Button 
                        variant="outlined" 
                        startIcon={<FacebookIcon />} 
                    >
                        Facebook
                    </Button>
                    <Button 
                        variant="outlined" 
                        startIcon={<GoogleIcon />}   
                    >
                        Google
                    </Button>
            </Box>

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                        <Typography variant='body2'>
                            Already have an account? 
                            <Button variant="text" href={"/Sign-هn"}>
                                Sign In
                            </Button>
                        </Typography>
          </Box>

        </form>

    </Box>
  </Container>


  
   </>
}

export default Page