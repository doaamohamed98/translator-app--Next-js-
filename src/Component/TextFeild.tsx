"use client"
import { ThemeProvider } from '@emotion/react'
import { NextPage } from 'next'
import { TextField ,TextFieldProps,InputAdornment ,IconButton } from '@mui/material';
import { themeTextFeild } from '@/app/Themes/TextFeildTheme';
import { useState } from 'react';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { RegistersData } from '@/app/Data/fieldsData';
const TextFieldComponent: NextPage<TextFieldProps> = (Props) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getStartIcon = () => {
   const DataInput = RegistersData.find(input=>input.name===Props.name)
   return DataInput ? DataInput.icon : null
  };

  
  return (
    <>
   <ThemeProvider theme={themeTextFeild}>
   <TextField variant='outlined' {...Props}

    type={Props.type==="password"? (showPassword ? "text" :"password"):Props.type}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {getStartIcon()}
        </InputAdornment>
      ),endAdornment: Props.type === "password" && (
      <InputAdornment position="end">
        <IconButton onClick={handleClickShowPassword}>
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </IconButton>
      </InputAdornment>
    )
  }}
   />
   </ThemeProvider>

    </>
  )
}

export default TextFieldComponent