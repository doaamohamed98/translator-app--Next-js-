"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({

  //  palette: {
  //   primary: {
  //     main: "#2563EB",
  //     contrastText: "#ffffff",
  //   },
  //   secondary: {
  //     main: "#64748B",
  //     contrastText: "#000000",
  //   },
  //   error: {
  //     main: "#f44336",
  //   },
  //   background: {
  //     default: "#F7FAFC",
  //   },
  //   text: {
  //     primary: "#0F172A",
  //     secondary: "#64748B",
  //   },
  // },


  components: {
    //ThemeButton
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontSize: "16px",
          padding: "5px 20px",
          margin: "10px auto",
          width: "100%",
        },
        contained: {
          boxShadow: "none",
          borderRadius: 10,
          padding: "10px",
          background: "#2563EB",
          color: "white",
          "&:hover": {
            boxShadow: "none",
          },

          "&.Mui-disabled": {
            backgroundColor: "",
            color: "#ffffff",
          },
        },

        outlined: {
          boxShadow: "none",
          border: "2px solid #E2E8F0 ",
          background: "transparent",
          color: "black",
          borderRadius: "10px",
          "&:hover": {
            boxShadow: "none",
            border: "2px solid #E2E8F0 ",
          },

          "&.Mui-disabled": {
            backgroundColor: "",
            color: "#ffffff",
          },
        },
      },
    },

    //ThemeTextFeild
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "5px 0",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: 15,
              borderColor: "#E2E8F0",
            },
            "&:hover fieldset": {
              borderColor: "#64748B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#64748B",
            },
          },
        },
      },
    },

    //ThemeDrawe
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-paper": {
            padding: "20px",
            width: "240px",
          },
        },
      },
    },

    //App Bar
  },
});
