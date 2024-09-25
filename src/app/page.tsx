import { Box, Button, Container, Typography } from "@mui/material";
import logo from "@/Assets/cha-translate-2-svgrepo-com.svg";
import Image from "next/image";
import imglanding from "@/Assets/Landing-Page.jpg"

export default function Home() {
  return (<>
 
  <Container className="mainContainer">
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
       <Typography variant="h3" className="title-landingpage">
       Get A Quick &rsquo;Free Translation
       with Ease Translate
      </Typography>
      
      <Typography className="caption">
      &quot; Translate your texts quickly and accurately for free with Ease Translate. Try it now and enjoy instant translations for all your needs &quot;
      </Typography>
        
        <Button variant="contained" href="/sign-up"> Register </Button>
    
      </Box>

      <Box className="Image-landingPage">
      <Image src={imglanding} alt="imglanding" width={400}  />
      </Box>

      </Box>
    </Box>
    <Box>


    </Box>

 

  </Container>

   </>
  );
}
