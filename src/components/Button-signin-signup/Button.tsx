import { NextPage } from 'next'
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './them';

interface Props {
    text:string,
    variat:any,
}

const Buttoon: NextPage<Props> = ({text ,variat}) => {
  return (
    <ThemeProvider theme={theme}>
    <Button variant={variat}  >
          {text}
    </Button>

    </ThemeProvider>
  )
  
   
  
}

export default Buttoon