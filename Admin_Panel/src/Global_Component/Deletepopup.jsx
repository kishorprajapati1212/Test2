import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const Deletepopup = ({ open, onClose, title, children, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="secondary">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Deletepopup;
