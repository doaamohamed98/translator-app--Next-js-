"use client";
import { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { InputAdornment, IconButton } from '@mui/material';

const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputProps = () => ({
    type: showPassword ? 'text' : 'password',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={togglePasswordVisibility}>
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </IconButton>
        </InputAdornment>
      ),
    },
  });

  return { getPasswordInputProps };
};

export default usePasswordVisibility;
