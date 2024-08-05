import { NextPage } from 'next'
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themeButton } from '@/app/Themes/ButtonTheme';


interface Props {
    text:string,
    variat:any,
}

const Buttoon: NextPage<Props> = ({text ,variat}) => {
  return (
    <ThemeProvider theme={themeButton}>
    <Button variant={variat}  >
          {text}
    </Button>

    </ThemeProvider>
  )
  
   
  
}

export default Buttoon