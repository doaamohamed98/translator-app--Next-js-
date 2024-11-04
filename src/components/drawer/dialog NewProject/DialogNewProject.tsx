import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormHelperText,
} from "@mui/material";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import { getLanguages } from "@/service/LanguagesServices";
import { schemaCreateProject } from "@/utils/ProjectValidation";
import { createProject } from "@/service/ProjectServices";

interface IFormInput {
  title: string;
  targetLanguages: string[];
}

const DialogNewProject = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaCreateProject),
    defaultValues: {
      title: "",
      targetLanguages: [],
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    reset();
  };

  const { mutate: CreateNewProject } = useMutation(
    (data: IFormInput) => createProject(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allProjects");
        handleClickClose();
        toast.success("Project created successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "An error occurred");
      },
    }
  );

  const onCreateProject: SubmitHandler<IFormInput> = (data) => {
    CreateNewProject(data);
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
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>Languages</InputLabel>
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
                    {languages.map((language: any) => (
                      <MenuItem key={language._id} value={language.code}>
                        {language.name}
                      </MenuItem>
                    ))}
                    <FormHelperText>
                      {errors.targetLanguages?.message}
                    </FormHelperText>
                  </Select>
                )}
              ></Controller>
             
            </FormControl>

            <DialogActions>
              <Button onClick={handleClickClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogNewProject;
