"use client"
import { ThemeProvider } from '@emotion/react'
import { NextPage } from 'next'

import { TextField ,TextFieldProps } from '@mui/material';
import { themeTextFeild } from '@/app/Themes/TextFeildTheme';

const TextFieldComponent: NextPage<TextFieldProps> = (Props) => {
  return (
    <>
   <ThemeProvider theme={themeTextFeild}>
   <TextField variant='outlined' {...Props} />
   </ThemeProvider>

    </>
  )
}

export default TextFieldComponent