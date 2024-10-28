import { UpdateTranslation } from "@/app/service/DictionariesServices";
import { schemaUpdateTranslation } from "@/app/utils/UpdateValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  TextField,
  Box,
  DialogActions,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface UpdateDataForm {
  key: string;
  text: string;
  UpdateLanguages: string[];
}

interface DialogUpdateProps {
    IdProject: any;
    translationData: any;
    languages: any;
    trigger: React.ReactNode;
  }

const DialogUpdate: React.FC<DialogUpdateProps> = ({ IdProject, translationData, languages,trigger }) => {
  const queryClient = useQueryClient();
  const languageKeys = Object.keys(languages);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register: update, handleSubmit: handleSubmitUpdate, reset ,formState:{errors} } = useForm<UpdateDataForm>({
    resolver: yupResolver(schemaUpdateTranslation),
    defaultValues: {
      key: "",
      text: "",
      UpdateLanguages: [],
    },
  });

  interface ApiError {
    response?: {
      data?: {
        message?: string;
      }
    }
  }
  

  const mutation = useMutation({
    mutationFn: (data: UpdateDataForm) =>
      UpdateTranslation(IdProject._id, translationData.id, data),
  });

  if(mutation.error){
  return toast.error((mutation.error as ApiError)?.response?.data?.message || "An error occurred during translation update."); 
   }

   if(mutation.isSuccess){
      // toast.success("Translation updated successfully!");
      queryClient.invalidateQueries({ queryKey: "allTranslation" });
    
   }
  
  const UpdateSubmit = (data: UpdateDataForm) => {
    mutation.mutate(data);
    reset();
  };


  return (
    <>
    <span onClick={handleOpen}>{trigger}</span>

    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Update Translation</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitUpdate(UpdateSubmit)}>
          <TextField
            {...update("key")}
            label="Key"
            fullWidth
            margin="normal"
            error={!!errors.key}
              helperText={errors.key ? errors.key.message : ""}
          />
          <TextField
            {...update("text")}
            label="Text"
            fullWidth
            margin="normal"
            error={!!errors.text}
              helperText={errors.text ? errors.text.message : ""}
          />
          <FormControl fullWidth margin="normal">
            <Select
              multiple
              {...update("UpdateLanguages")}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              defaultValue={languageKeys}
              error={!!errors.UpdateLanguages}
            >
            </Select>
            {errors.UpdateLanguages && (
                <Typography variant="caption" color="error.main" >
                  {errors.UpdateLanguages.message}
                </Typography>
              )}
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} variant="contained" disabled={mutation.isLoading}>
              {mutation.isLoading ? <><HourglassBottomOutlinedIcon /> Updating...</> : "Update"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

    </>
    
  );
};

export default DialogUpdate;
