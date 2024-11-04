// "use client"
// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";

// interface ConfirmDeleteDialogProps {
// onConfirm: () => void;
//   title?: string;
//   message?: string;
//   trigger: React.ReactNode;
// }

// const ConfirmDelete: React.FC<ConfirmDeleteDialogProps> = ({ onConfirm, title ,  message , trigger,}) => {

//     const [open, setOpen] = useState(false);

//     const handleOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     const handleConfirm = () => {
//       onConfirm();
//       handleClose();
//     };


//   return (
//     <>
//     <span onClick={handleOpen}>{trigger}</span>

//     <Dialog open={open} onClose={handleClose} >
//       <DialogTitle>{title}</DialogTitle>

//       <DialogContent>
//         <DialogContentText>
//           {message}
//         </DialogContentText>
//       </DialogContent>

//       <DialogActions>
//         <Button  color="primary" onClick={handleClose}>
//           Cancel
//         </Button>

//         <Button onClick={handleConfirm} color="error">
//          Delete
//         </Button>

//       </DialogActions>
//     </Dialog>
    
//     </>
    
//   );
// };

// export default ConfirmDelete;
