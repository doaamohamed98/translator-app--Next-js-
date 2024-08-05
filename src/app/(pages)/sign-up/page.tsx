import { RegistersData } from '@/app/Data/fieldsData'
import Buttoon from '@/Component/Button-signin-signup/Button'
import TextFieldComponent from '@/Component/TextFeild'
import { Box, Container, FormControl, Typography,InputAdornment } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return(<>
  <Container maxWidth="md"sx={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",height:"90vh"}}>
    <Box sx={{width:{xs:"100%" , md:"50%"}}}> 
      <Typography variant='h5' sx={{marginBottom:"10px"}}>Sign up for an Account</Typography>
        <form>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {RegistersData.map((input)=>
            <FormControl key={input.name}>
                <TextFieldComponent 
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {input.icon}
                      </InputAdornment>
                    ),}}/>
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