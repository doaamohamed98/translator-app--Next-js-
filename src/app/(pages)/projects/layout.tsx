
import ResponsiveDrawer from "@/app/components/drawer/Drawer";
import { Box } from "@mui/material";
import styles from "./style.module.scss";

export default function page({ children }: { children: React.ReactNode }) {
 
  return (
    <Box className={styles.ContainerLayout}>
      <main className={styles.main} >{children}</main>
      { <ResponsiveDrawer />}
    </Box>
  );
}
