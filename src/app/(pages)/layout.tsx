"use client"
import { Box } from "@mui/material";
import styles from "./style.module.scss";
import ResponsiveDrawer from "@/components/drawer/Drawer";

export default function page({ children }: { children: React.ReactNode }) {
 
  return (
    <Box className={styles.ContainerLayout}>
      <ResponsiveDrawer/>
      <main className={styles.main} >{children}</main>
    </Box>
  );
}
