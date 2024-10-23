import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectId?: string | null;
}

const ConfirmDelete: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  projectId,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to Delete this Project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
