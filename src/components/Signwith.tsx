import { NextPage } from 'next'
import { Box ,Container ,Typography,FormControl ,TextField, FormGroup, InputAdornment, Divider ,Button ,IconButton} from '@mui/material';
import {Facebook as FacebookIcon, Google as GoogleIcon} from '@mui/icons-material';
interface Props {}

const Signwith: NextPage<Props> = ({}) => {
    const buttonStyle = { color: 'black', border:"gray"};
  return <>
  <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography sx={{ marginX: 2 }} variant='body2' > or Sign up with</Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>

          <Box sx={{ display: 'flex', justifyContent:'space-evenly' , gap:2}}>
                    <Button 
                        variant="outlined" 
                        startIcon={<FacebookIcon />} 
                    >
                       <Typography sx={{ marginLeft: 1 }}>Facebook</Typography>
                    </Button>
                    <Button
                        variant="outlined" 
                        startIcon={<GoogleIcon />}   
                    >
                        <Typography  sx={{ marginLeft: 1 , color:"black",  }}>Google</Typography>
                    </Button>
            </Box>
  
  </>
}

export default Signwith