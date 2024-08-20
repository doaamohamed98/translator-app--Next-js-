"use client";
import { Button, Typography } from '@mui/material'
import { NextPage } from 'next'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('authToken')
    router.push('/sign-in')

  }


  return <div>
<Typography variant='h3' > Welcome To Home Page</Typography>

<Button variant='contained' onClick={handleLogout} >
  LogOut
</Button>
  </div>
}

export default Page