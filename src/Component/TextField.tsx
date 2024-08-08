"use client";

import { ThemeProvider } from '@emotion/react';
import { TextField, TextFieldProps, InputAdornment, IconButton } from '@mui/material';
import { themeTextField } from '@/app/Themes/TextFeildTheme';
import { useState, forwardRef, Ref } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { RegistersData } from '@/app/Data/fieldsData';

const TextFieldComponent = forwardRef<HTMLInputElement, TextFieldProps>((Props, ref: Ref<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getStartIcon = () => {
    const DataInput = RegistersData.find(input => input.name === Props.name);
    return DataInput ? DataInput.icon : null;
  };

  return (
    <>
   <ThemeProvider theme={themeTextField}>
   <TextField variant='outlined' {...Props}
    inputRef={ref}
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
  );
  
});

export default TextFieldComponent;