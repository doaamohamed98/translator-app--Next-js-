import { DeleteTranslation, getAllTranslation } from '@/app/service/DictionariesServices';
import { Box,IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmDelete from '../comfirmDelete/ComfirmDelete';
import DialogUpdate from '../dialogUpdate/DialogUpdate';

interface Project {
  _id: string;
  title: string;
}

const TableDisplayTranslation = ({ projectsId} : { projectsId: Project}) => {

  const queryClient = useQueryClient();
    const AllTranslation = async (projectId: string) => {
        return await getAllTranslation(projectId);
      };

      const { data: translations,} = useQuery(
        ["allTranslation", projectsId._id],
        () => AllTranslation(projectsId._id),
        {
          enabled: !!projectsId,
        }
      );

      const handelDeleteTranslation = async (projectId: string , id: string) => {
        try{
         const data = await DeleteTranslation(projectId ,id );
         queryClient.invalidateQueries("allTranslation");
        return data;
        }catch(error:any){
          toast.error(error.response?.data?.message || 'An error occurred during delete')
        }
       
      }


  return (
    <>
    <Box sx={{ textAlign: "center"}}>
    <Typography variant='h5'> Project name : {projectsId.title}</Typography>
    {translations?.data && translations?.dictionary ? (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow >
            <TableCell>Key</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Translations</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

         <TableBody>
        {translations?.data?.map((data: any) => (
      <TableRow key={data.id}>

        {/* Key */}
      <TableCell>
        {data.key}
        </TableCell>

          {/* Text */}
          <TableCell>
           <Typography>{translations.dictionary.en[data.key]}</Typography>
          </TableCell>

          {/* Languages */}
          <TableCell>
          {Object.keys(translations.dictionary).map((lang) => (
                <Typography key={lang}>
                    {lang}
                </Typography>
        ))}
          </TableCell>

          {/* Translations */}
          <TableCell >
          {Object.keys(translations.dictionary).map((langKey) => (
                <Typography key={langKey}>
                    {translations.dictionary[langKey][data.key]}
                </Typography>
        ))}
          </TableCell>
          
          {/* Update */}
          <TableCell>
            <DialogUpdate
            translationData={data}
            IdProject={projectsId}
            languages={translations.dictionary}
            trigger={
              <IconButton  color='primary'>
                <CiEdit />
              </IconButton>
            }
            />
              
          </TableCell>

          {/* Delete */}
         <TableCell>
            <ConfirmDelete
                    onConfirm={() => handelDeleteTranslation(projectsId._id,data.id)}
                    title="Delete Confirmation"
                     message="Are you sure you want to delete this translation?"
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
    ):(
    <Typography>No translations available your Project</Typography>
    )}
  </Box>
    </>
    
  );
}

export default TableDisplayTranslation