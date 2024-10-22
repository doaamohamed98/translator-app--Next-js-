import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
  Select, MenuItem, FormControl, InputLabel, 
  Typography
 } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient} from 'react-query';
import { createProject, getAllProjects } from '@/app/Service/ProjectServices';
import { toast } from 'react-toastify';
import { schemaCreateProject } from '@/app/Utils/ProjectValidation';
import { yupResolver } from "@hookform/resolvers/yup";
import { getLanguages } from '@/app/Service/LanguagesServices';

interface IFormInput {
  title:string;
  targetLanguages:string[];
}

const DialogNewProject = () => {
  const QueryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { data: Allprojects} = useQuery('Allprojects', getAllProjects);
  const { data: Languages } = useQuery('Languages', getLanguages);
 

  // react-hook-form 
  const { register, handleSubmit, reset ,control , formState: { errors }} = useForm<IFormInput>({
    resolver: yupResolver(schemaCreateProject),
    defaultValues: {
      title: '',
      targetLanguages:[],
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    reset();
  };

  const { mutate: CreateNewProject} = useMutation(
    (data: IFormInput) => createProject(data),
    {
      onSuccess: () => {
        QueryClient.invalidateQueries('Allprojects');
        setOpen(false);
        reset();
        toast.success('Project created successfully!');
      },
      onError: (error: any) => {
        console.error("Error creating project:", error);
        toast.error(error.response?.data?.message || 'An error occurred')
      }
    }
  );

  const onCreateProject: SubmitHandler<IFormInput> = async (data) => {
    await CreateNewProject(data);
    console.log(data);
    handleClickClose();
  };


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Project
      </Button>
      <Dialog open={open} onClose={handleClickClose} fullWidth>
        <DialogTitle> Create New Project </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onCreateProject)}>

          <FormControl fullWidth margin="dense">
            <TextField
              label=" Project title"
              type="text"
              {...register('title', { required: true })}
              error={!!errors.title}
             helperText={errors.title?.message}
            />

          </FormControl>


            <FormControl fullWidth margin="dense" >
            <InputLabel >Languages</InputLabel>
            <Controller
            name="targetLanguages"
            control={control}
            render={({ field }) => (  
              <Select                
                labelId="target-languages-label"
                {...field}          
                multiple   
                error={!!errors.targetLanguages}         
              >
                
                {Languages.map((language: any) => ( 
                  <MenuItem key={language._id} value={language.code}>
                    {language.name}    
                  </MenuItem>
                ))}
              </Select>
            )}>
            </Controller>
            {errors.targetLanguages && (
                <Typography variant="body2" color="error">
                  {errors.targetLanguages.message}
                </Typography>
              )}
            </FormControl>
            
            <DialogActions>
              <Button onClick={handleClickClose} color="primary">
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