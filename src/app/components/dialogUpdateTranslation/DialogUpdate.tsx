import { UpdateTranslation } from "@/app/Service/DictionariesServices";
import { schemaUpdateTranslation } from "@/app/Utils/UpdateValidation";
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
import { useQueryClient } from "react-query";
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
  // console.log(languageKeys);
  

  const { register: update, handleSubmit: handleSubmitUpdate } =
    useForm<UpdateDataForm>({
      resolver: yupResolver(schemaUpdateTranslation),
      defaultValues: {
        key: "",
        text: "",
        UpdateLanguages: [],
      },
    });

  const SubmitUpdate = async (
    IdProject: string,
    IdTranslation: string,
    dataUpdate: UpdateDataForm
  ) => {
    try {
      const data = await UpdateTranslation(
        IdProject,
        IdTranslation,
        dataUpdate
      );
      // queryClient.invalidateQueries("allTranslation");
      console.log(data);
      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update Translation</DialogTitle>

        <DialogContent>
          <form
            onSubmit={handleSubmitUpdate((data) => {
              SubmitUpdate(IdProject, translationData.id, data);
            })}
          >
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
                defaultValue={languageKeys}
              >
                {languageKeys.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
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
