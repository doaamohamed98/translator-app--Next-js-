"use client";
import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "@/Assets/cha-translate-2-svgrepo-com.svg";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import styles from "./style.module.scss";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Listsprojects from "./list Projects/Listsprojects";
import DialogNewProject from "./dialog NewProject/DialogNewProject";


const drawerWidth = 240;
export default function ResponsiveDrawer() {
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
  };

 

  const drawerContent = (
    <Box className={styles.SideBar}>
      <Box className={styles.LogoContainer}>
        <Image src={logo} width={40} alt="logo" />
        <Typography variant="h5">Translator</Typography>
      </Box>
      <Divider />

      <DialogNewProject />

      <Divider />

      
        <Listsprojects/>
      

      <List className={styles.FooterList}>
        <Divider />
        <Button className={styles.LogOut} onClick={handleLogout}>
          <IconButton>
            <HiOutlineLogout />
          </IconButton>
          <ListItemText primary="Log Out" />
        </Button>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className={styles.Header}>
        <Toolbar>
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
            <Typography variant="h6">Translator</Typography>
            <Typography variant="caption">
              Free online translator enhanced by dictionary
            </Typography>
          </Box>
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
