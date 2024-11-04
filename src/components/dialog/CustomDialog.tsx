"use client";
import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { UpdateTranslation } from "@/service/DictionariesServices";
import { schemaUpdateTranslation } from "@/utils/UpdateValidation";

interface UpdateDataForm {
  key: string;
  text: string;
  updateLanguages: string[];
}

interface CustomDialogProps {
  IdProject?: any;
  translationData?: any;
  languages?: any;
  trigger: React.ReactNode;
  onConfirmDelete?: () => void;
  isDeleteMode?: boolean;
  text ?:string
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  IdProject,
  translationData,
  languages,
  trigger,
  onConfirmDelete,
  isDeleteMode,
  text,
}) => {
  const queryClient = useQueryClient();
  const languageKeys = Object.keys(languages);
  const [open, setOpen] = useState(false);
 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    register: update,
    handleSubmit: handleSubmitUpdate,
    reset,
    formState: { errors },
  } = useForm<UpdateDataForm>({
    resolver: yupResolver(schemaUpdateTranslation),
    defaultValues: {
      key: translationData.key,
      text: text,
      updateLanguages: languageKeys,
    },
  });

  interface ApiError {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (data: UpdateDataForm) =>
      UpdateTranslation(IdProject, translationData.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTranslation", IdProject],
      });
      handleClose();
    },
  });

  if (error) {
    return toast.error(
      (error as ApiError)?.response?.data?.message ||
        "An error occurred during translation update."
    );
  }

  const UpdateSubmit = (data: UpdateDataForm) => {
   mutate(data);
  };

  const handleConfirmDelete = () => {
    if (onConfirmDelete) {
      onConfirmDelete();
    }
    handleClose();
  };

  return (
    <>
      <div onClick={handleOpen}>{trigger}</div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {isDeleteMode ? "Delete Confirmation" : "Update translation? "}
        </DialogTitle>

        <DialogContent>
          {isDeleteMode ? (
            <Typography>
              Are you sure you want to delete this translation?
            </Typography>
          ) : (
            <>
              <Typography>
                Are you sure you want to Update this translation?
              </Typography>
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
                    {...update("updateLanguages")}
                    renderValue={(selected) => (
                      <Box>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    defaultValue={languageKeys}
                    error={!!errors.updateLanguages}
                  ></Select>
                  {errors.updateLanguages && (
                    <Typography variant="caption" color="error.main">
                      {errors.updateLanguages.message}
                    </Typography>
                  )}
                </FormControl>
              </form>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>

          {isDeleteMode ? (
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <HourglassBottomOutlinedIcon /> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
