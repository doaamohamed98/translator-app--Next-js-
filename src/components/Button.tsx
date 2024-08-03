import { NextPage } from 'next'
import { Button } from '@mui/material';
interface Props {
    text:string
}

const Buttoon: NextPage<Props> = ({text}) => {
  return <div>
    <Button variant="contained" fullWidth >
          {text}
    </Button>
  </div>
}

export default Buttoon