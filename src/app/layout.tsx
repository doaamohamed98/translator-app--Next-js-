import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from './Themes/theme';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <AppRouterCacheProvider>
    <body className={inter.className}>
    

    <ThemeProvider theme={theme}>
    <ToastContainer theme='colored' position='top-center' autoClose={1000} />
       <main>
           {children}
      </main>
     
    </ThemeProvider>
     
      </body>
    </AppRouterCacheProvider>
      
    </html>
  );
}
