"use client"
import { ThemeProvider } from '@emotion/react'
import { NextPage } from 'next'

import { TextField ,TextFieldProps } from '@mui/material';

const TextFieldComponent: NextPage<TextFieldProps> = (Props) => {
  return (
    <>
   <ThemeProvider theme={}>
   <TextField variant='outlined' {...Props} />
   </ThemeProvider>

    </>
  )
}

export default TextFieldComponent