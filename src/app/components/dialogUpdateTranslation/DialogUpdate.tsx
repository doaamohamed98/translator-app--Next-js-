import { UpdateTranslation } from "@/app/service/DictionariesServices";
import { schemaUpdateTranslation } from "@/app/utils/UpdateValidation";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface UpdateDataForm {
  key: string;
  text: string;
  UpdateLanguages: string[];
}

const DialogUpdate = ({
  open,
  handleClose,
  IdProject,
  translationData,
  languages,
}: {
  open: boolean;
  handleClose: () => void;
  IdProject: any;
  translationData: any;
  languages: any;
}) => {
  const queryClient = useQueryClient();

  const languageKeys = Object.keys(languages);
  // const languageArray = Object.values(languages);

  const { register:update, handleSubmit:handleSubmitUpdate ,reset} =
    useForm<UpdateDataForm>({
      resolver: yupResolver(schemaUpdateTranslation),
      defaultValues: {
        key: "",
        text: "",
        UpdateLanguages: [],
      },
    });

  // const submitUpdate = async (
  //   IdProject: string,
  //   IdTranslation: string,
  //   dataUpdate: UpdateDataForm
  // ) => {
  //   try {
  //     const data = await UpdateTranslation(
  //       IdProject,
  //       IdTranslation,
  //       dataUpdate
  //     );
  //     // queryClient.invalidateQueries("allTranslation");
  //     console.log(data);
  //     return data;
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   }
  // };
  

  const handleTranslation = (data: UpdateDataForm,) => UpdateTranslation(IdProject._id,translationData.id,data);

   const { mutate: createUpdateTranslation } = useMutation(handleTranslation, {
  onSuccess: () => {
    toast.success('Translation created successfully!')
    queryClient.invalidateQueries('AllTranslation')
  },
  onError: (error: any) => {
    console.error("Error creating Translation:", error);
    toast.error(error.response?.data?.message || 'An error occurred')
  }
});

const UpdateSubmit = (data:UpdateDataForm) => {
  createUpdateTranslation(data);
  console.log(data)
  reset();
};

  
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update Translation</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmitUpdate(UpdateSubmit)}>
            <TextField
              {...update("key")}
              label="Key"
              fullWidth
              margin="normal"
            />
            <TextField
              {...update("text")}
              label="Text"
              fullWidth
              margin="normal"
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
              >
              </Select>
            </FormControl>

            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogUpdate;
