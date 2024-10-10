import React, { useState } from 'react';
import {
Divider,List,ListItem,ListItemText,} from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import  styles from "./style.module.scss";
import ConfirmDelete from '../confirmDelete/ConfirmDelete';


function Listsprojects() {
    const [openDeleteDialog, setopenDeleteDialog] = useState(false);
    const handleDeleteClick = () => {
        setopenDeleteDialog(true);
      };
    
      const handleCloseDialog = () => {
        setopenDeleteDialog(false);
      };
    
      const handleConfirmDelete = () => {
        handleCloseDialog(); 
      };
  return (
    <>
     <List >
        <ListItem className={styles.ListItem}  dense>
          <ListItemText primary="First Project" />
          <AiOutlineDelete  className={styles.DeleteIcon} onClick={() => handleDeleteClick()}/>
        </ListItem>
      </List>
      <ConfirmDelete
        open={openDeleteDialog} 
        onClose={handleCloseDialog} 
        onConfirm={handleConfirmDelete} 
      />

      
    </>
  )
}

export default Listsprojects