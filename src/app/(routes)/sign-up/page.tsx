"use client";
import { NextPage } from 'next'
import { Box ,Container ,Typography,FormControl ,TextField, FormGroup, InputAdornment, Divider ,Button ,IconButton} from '@mui/material';
import { useState } from 'react';
import { Person as PersonIcon, Email as EmailIcon,Lock as LockIcon,Visibility,VisibilityOff,Facebook as FacebookIcon, Google as GoogleIcon} from '@mui/icons-material';
import Buttoon from '@/components/Button';



interface DataForm {
    username: string;
    email: string;
    password: string;
}

const Page: NextPage<DataForm> = ({}) => {
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


  return <>
  <Container maxWidth="lg"sx={{width:"100%",height:"100vh" ,display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Box sx={{width:"30%"}}>
        <Typography variant="h5" component="h1"> Sign up For An Account</Typography>
         <FormGroup>

        <FormControl margin='normal' >
        <TextField id="username"  variant="outlined" placeholder='username'
                InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),}}
          
           />
          
        </FormControl>

        <FormControl margin='normal'>
        <TextField id="Email"  variant="outlined" placeholder=' Email'
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

        </FormGroup>

    </Box>
  </Container>


  
   </>
}

export default Page