// "use client";
// import { UpdateTranslation } from "@/service/DictionariesServices";
// import { schemaUpdateTranslation } from "@/utils/UpdateValidation";
// import { yupResolver } from "@hookform/resolvers/yup";
// import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
// import {
//   Button,
//   Chip,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   Select,
//   TextField,
//   Box,
//   DialogActions,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "react-query";
// import { toast } from "react-toastify";

// interface UpdateDataForm {
//   key: string;
//   text: string;
//   updateLanguages: string[];
// }

// interface DialogUpdateProps {
//   IdProject: any;
//   translationData: any;
//   languages: any;
//   trigger: React.ReactNode;
// }

// const DialogUpdate: React.FC<DialogUpdateProps> = ({
//   IdProject,
//   translationData,
//   languages,
//   trigger,
// }) => {
//   const queryClient = useQueryClient();
//   const languageKeys = Object.keys(languages);
//   const [open, setOpen] = useState(false);
//   console.log(translationData)

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
 

//   const {
//     register: update,
//     handleSubmit: handleSubmitUpdate,
//     reset,
//     formState: { errors },
//   } = useForm<UpdateDataForm>({
//     resolver: yupResolver(schemaUpdateTranslation),
//     defaultValues: {
//       key: translationData.key,
//       text: translationData.text,
//       updateLanguages: languageKeys,
//     },
//   });

//   interface ApiError {
//     response?: {
//       data?: {
//         message?: string;
//       };
//     };
//   }

//   const { mutate, error, isLoading } = useMutation({
//     mutationFn: (data: UpdateDataForm) =>
//       UpdateTranslation(IdProject, translationData.id, data),
//     onSuccess:()=>{
//       queryClient.invalidateQueries({ queryKey: ["allTranslation", IdProject] });
//       reset();
//       handleClose()

//     }
//   });

//   if (error) {
//     return toast.error(
//       (error as ApiError)?.response?.data?.message ||
//         "An error occurred during translation update."
//     );
//   }



//   const UpdateSubmit = (data: UpdateDataForm) => {
//    mutate(data);
    
//   };

//   return (
//     <>
//       <div onClick={handleOpen}>{trigger}</div>

//       <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>Update Translation</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmitUpdate(UpdateSubmit)}>
//             <TextField
//               {...update("key")}
//               label="Key"
//               fullWidth
//               margin="normal"
//               error={!!errors.key}
//               helperText={errors.key ? errors.key.message : ""}
//             />
//             <TextField
//               {...update("text")}
//               label="Text"
//               fullWidth
//               margin="normal"
//               error={!!errors.text}
//               helperText={errors.text ? errors.text.message : ""}
//             />
//             <FormControl fullWidth margin="normal">
//               <Select
//                 multiple
//                 {...update("updateLanguages")}
//                 renderValue={(selected) => (
//                   <Box>
//                     {selected.map((value) => (
//                       <Chip key={value} label={value} />
//                     ))}
//                   </Box>
//                 )}
//                 defaultValue={languageKeys}
//                 error={!!errors.updateLanguages}
//               ></Select>
//               {errors.updateLanguages && (
//                 <Typography variant="caption" color="error.main">
//                   {errors.updateLanguages.message}
//                 </Typography>
//               )}
//             </FormControl>
//             <DialogActions>
//               <Button onClick={handleClose} variant="outlined">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <HourglassBottomOutlinedIcon /> Updating...
//                   </>
//                 ) : (
//                   "Update"
//                 )}
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default DialogUpdate;
