import { RegistersData } from '@/app/Data/fieldsData'
import Buttoon from '@/Component/Button-signin-signup/Button'
import TextFieldComponent from '@/Component/TextFeild'
import { Box, Container, FormControl, Typography,InputAdornment } from '@mui/material'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return(<>
  <Container maxWidth="md"sx={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",height:"100vh"}}>
    <Box>
        <Typography variant='inherit' component="h3">Sign Up for an Account</Typography>
        <form>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {RegistersData.map((input)=>
            <FormControl>
                <TextFieldComponent 
                placeholder={input.placeholder}
                name={input.name}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {input.icon}
                      </InputAdornment>
                    ),}}/>
            </FormControl>
            
            )}
        </Box>
        <Buttoon text='sign up' variat=""/>
        </form>

    </Box>


  </Container>


  
  
  
  </>)
}

export default Page