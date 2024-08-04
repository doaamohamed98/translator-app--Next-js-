"use client";
import { NextPage } from 'next'
import { Box ,Container ,Typography,FormControl ,TextField, FormGroup, InputAdornment, Divider ,Button ,IconButton} from '@mui/material';
import { useState } from 'react';
import { Email as EmailIcon,Lock as LockIcon,Visibility,VisibilityOff,Facebook as FacebookIcon, Google as GoogleIcon} from '@mui/icons-material';
import Buttoon from '@/components/Button';
import Signwith from '@/components/Signwith';
import Link from 'next/link';

interface LoginData {
    email:string,
    password:string,
  };
  

const Page: NextPage<LoginData> = ({}) => {
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  return <>
  <Container  maxWidth="lg"sx={{width:"100%",height:"100vh" ,display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Box>
    <Typography variant="h5" component="h1"> Sign In to your Account</Typography>
    <Typography variant="caption" component="h1"> Welcome back! please enter your detail</Typography>

    <form>
    <FormControl margin='normal'>
        <TextField variant="outlined" placeholder=' Email'
          InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),}}
        
          />
        </FormControl>

        <FormControl margin='normal'>
            <TextField
           
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