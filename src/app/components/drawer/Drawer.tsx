import * as React from 'react';
import {
  AppBar,Box,CssBaseline,Divider,Drawer,IconButton,List,ListItem,ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { HiOutlineLogout } from "react-icons/hi";
import logo from "@/Assets/cha-translate-2-svgrepo-com.svg"
import Image from 'next/image';
import { AiOutlineMenu } from "react-icons/ai";
import  styles from "./style.module.scss";
import DialogNewProject from '../dialog NewProject/DialogNewProject';
import Listsprojects from '../list Projects/Listsprojects';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const drawerWidth = 240;
export default function ResponsiveDrawer({ projects }: { projects?: any }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/sign-in");
  };

  const drawerContent = (
    <Box className={styles.SideBar}>
      <Box className={styles.LogoContainer} >
        <Image src={logo} width={40} alt='logo'/>
        <Typography variant="h6">
          Translator
        </Typography>
      </Box>
      <Divider /> 

       <DialogNewProject/>
     
        <Divider />
   
        <Listsprojects projects={projects}  />
   
     
      <List  className={styles.FooterList}>
      <Divider />
        <ListItem className={styles.LogOut}  onClick={handleLogout} >
          <ListItemIcon>
          <HiOutlineLogout />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className={styles.Header}>
        <Toolbar >
          <IconButton
          className={styles.MenuIcon}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <AiOutlineMenu />
          </IconButton>
          <Box>
         <Typography variant="h6">
          Translator
          </Typography>
          <Typography variant="caption">
          Free online translator enhanced by dictionary
        </Typography></Box>
          
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
      
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
         keepMounted: true, //Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
         {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >


        {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       
      </Box>
    </Box>
  );
}