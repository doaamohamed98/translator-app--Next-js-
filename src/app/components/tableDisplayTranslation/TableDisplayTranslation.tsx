import { DeleteTranslation, getAllTranslation } from '@/app/service/DictionariesServices';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import DialogUpdate from '../dialogUpdateTranslation/DialogUpdate';
import ConfirmDelete from '../comfirmDelete/ComfirmDelete';

interface Project {
  _id: string;
  title: string;
}

const TableDisplayTranslation = ({ projectsId} : { projectsId: Project}) => {
  const queryClient = useQueryClient();
  const [selectedTranslation, setSelectedTranslation] = useState<any>(null);

  const [openUpdateDialog, setopenUpdateDialog] = useState(false); 

  const handleOpenDialog = (translation: any) => {
    setSelectedTranslation(translation);
    setopenUpdateDialog(true);
  };

  const handleCloseDialog = () => {
    setopenUpdateDialog(false);
  };

    const AllTranslation = async (projectId: string) => {
        return await getAllTranslation(projectId);
      };

      const { data: translations, error,} = useQuery(
        ["allTranslation", projectsId._id],
        () => AllTranslation(projectsId._id),
        {
          enabled: !!projectsId,
        }
      );

      if (error) {
        toast.error((error as any).response?.data?.message || 'An error occurred');
      }
      

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
    {translations?.data && translations?.dictionary ?(
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
              <IconButton  color='primary' 
               onClick={() => handleOpenDialog(data)}>
                <CiEdit  />
              </IconButton>
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

    {selectedTranslation && (
        <DialogUpdate
          open={openUpdateDialog}
          handleClose={handleCloseDialog}
          translationData={selectedTranslation}
          IdProject={projectsId}
          languages={translations.dictionary}
        />
      )}
     
  </Box>
    </>
    
  );
}

export default TableDisplayTranslation