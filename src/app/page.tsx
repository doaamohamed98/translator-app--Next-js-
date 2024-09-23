import { Box, Button, Container, Typography } from "@mui/material";
import logo from "@/Assets/cha-translate-2-svgrepo-com.svg";
import Image from "next/image";
import imglanding from "@/Assets/Landing-Page.jpg"

export default function Home() {
  return (<>
 
  <Container>
   <Box className="ContainerNavBar">
    <Box className="ContainerLogoContent">
      <Image src={logo} alt="Logo" width={60}/>
        <Typography variant="h6">
          Translator
        </Typography>
    </Box>
    <Box>
      <Button variant="contained" href="/sign-in" >Login</Button>
    </Box>
   </Box>

   
    <Box className="Containerlandingpage"> 
      <Box className='ContainerlandingpageContent'>
       <Box className='leftContent' >
       <Typography variant="h3">
        Get A Quick,Free Translation
       with Ease Translate
      </Typography>
      <Typography className="caption">
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi recusandae dicta eveniet sit quibusdam reprehenderit, officia porro corporis incidunt hic necessitatibus pariatur, voluptas aliquid odio id officiis quasi, ut adipisci.
      </Typography>
        
        <Button variant="contained" href="/sign-up">Register</Button>
    
      </Box>

      <Box>
      <Image src={imglanding} alt="imglanding" width={500} />
      </Box>

      </Box>
    </Box>
    <Box>


    </Box>

 

  </Container>

   </>
  );
}
