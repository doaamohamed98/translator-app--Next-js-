import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import DialogUpdate from "../dialogUpdate/DialogUpdate";
import {
  DeleteTranslation,
  getAllTranslation,
} from "@/service/DictionariesServices";
import CustomDialog from "../dialog/CustomDialog";

interface Project {
  projectId: string;
  title: string;
}

const TableDisplayTranslation = ({ projectId, title }: Project) => {
  const queryClient = useQueryClient();

  const {
    data: translations,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["allTranslation", projectId],
    queryFn: () => getAllTranslation(projectId),
    enabled: !!projectId,
  });

  const handelDeleteMutation = useMutation({
    mutationFn: ({ projectId, id }: { projectId: string; id: string }) =>
      DeleteTranslation(projectId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTranslation", projectId],
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "An error occurred during delete"
      );
    },
  });

  const handelDeleteTranslation = (projectId: string, id: string) => {
    handelDeleteMutation.mutate({ projectId, id });
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading translations</Typography>;

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5"> Project name : {title}</Typography>
        {translations.data.length > 0 &&
        translations.dictionary !== undefined &&
        translations.dictionary !== null ? (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Languages</TableCell>
                  <TableCell>Translations</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {translations.data?.map((data: any) => (
                  <TableRow key={data.id}>
                    {/* Key */}
                    <TableCell>{data.key}</TableCell>

                    {/* Text */}
                    <TableCell>
                      <Typography>
                        {translations.dictionary.en[data.key]}
                      </Typography>
                    </TableCell>

                    {/* Languages */}
                    <TableCell>
                      {Object.keys(translations.dictionary).map((lang) => (
                        <Typography key={lang}>{lang}</Typography>
                      ))}
                    </TableCell>

                    {/* Translations */}
                    <TableCell>
                      {Object.keys(translations.dictionary).map((langKey) => (
                        <Typography key={langKey}>
                          {translations.dictionary[langKey][data.key]}
                        </Typography>
                      ))}
                    </TableCell>

                    {/* Update */}
                    <TableCell>
                      <CustomDialog
                        translationData={data}
                        IdProject={projectId}
                        languages={translations.dictionary}
                        text={translations.dictionary.en[data.key]}
                        trigger={
                          <IconButton color="primary">
                            <CiEdit />
                          </IconButton>
                        }
                      />
                    </TableCell>

                    {/* Delete */}
                    <TableCell>
                      <CustomDialog
                        onConfirmDelete={() =>
                          handelDeleteTranslation(projectId, data.id)
                        }
                        isDeleteMode={true}
                        trigger={
                          <IconButton color="error">
                            <RiDeleteBin5Line />
                          </IconButton>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No translations available your Project</Typography>
        )}
      </Box>
    </>
  );
};

export default TableDisplayTranslation;
