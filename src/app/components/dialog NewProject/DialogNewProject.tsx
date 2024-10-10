import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  field1: string;
  field2: string;
}

const DialogNewProject = () => {
  const [open, setOpen] = React.useState(false);
  
  // react-hook-form 
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Form Data:', data);
    handleClose(); // Close dialog after submit
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Create New Project </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              label="Languages"
              type="text"
              fullWidth
              {...register('field1', { required: true })}
            />
            <TextField
              margin="dense"
              label="Title Project"
              type="text"
              fullWidth
              {...register('field2', { required: true })}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant='contained' >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};



export default DialogNewProject