"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from "./Themes/theme";
import ResponsiveDrawer from "./components/drawer/Drawer";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
// type Metadata = any;
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  UserIsLogin: boolean;
}>) {
  const queryClient = new QueryClient();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <ToastContainer
                theme="colored"
                position="top-center"
                autoClose={1000}
              />

              {isLogin && <ResponsiveDrawer />}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                 
                }}
              >
                <main>{children}</main>
              </Box>
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
