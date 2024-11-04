"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation,  useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styles from "./style.module.scss";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import { schemaCreateTranslation } from "@/utils/TranslationValidation";
import { createTranslatProject } from "@/service/DictionariesServices";

interface TranslatData {
  key: string;
  text: string;
}

const TableTranslation = ({ projectId }: { projectId: any }) => {
  const queryClient = useQueryClient();

  //Handel Fun React-hook-form
  const { register, handleSubmit, reset } = useForm<TranslatData>({
    resolver: yupResolver(schemaCreateTranslation),
    defaultValues: {
      key: "",
      text: "",
    },
  });

  //Handel Fn Create New Translation
  const { mutate: createTranslation, isLoading: isSubmitting } = useMutation(
    ({ key, text }: TranslatData) =>
      createTranslatProject({ key, text }, projectId),
    {
      onSuccess: () => {
        toast.success("Translation created successfully!");
        queryClient.invalidateQueries("allTranslation");
        reset();
      },
      onError: (error: any) => {
        console.error("Error creating Translation:", error);
        toast.error(error.response?.data?.message || "An error occurred");
      },
    }
  );

  const TranslationSubmit = (data: TranslatData) => {
    createTranslation(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(TranslationSubmit)}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Translation</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    {...register("key")}
                    variant="outlined"
                    size="small"
                    placeholder="Key"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    {...register("text")}
                    variant="outlined"
                    size="small"
                    placeholder="Text"
                  />
                </TableCell>
                <TableCell>
                  <Box className={styles.ButtonContainer} gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          {" "}
                          <RotateLeftOutlinedIcon /> Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <Button
                      type="reset"
                      onClick={() => reset()}
                      variant="contained"
                    >
                      Reset
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
};

export default TableTranslation;
