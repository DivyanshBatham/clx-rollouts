import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// props will have info about heading, details
export default function ActionPopup(props) {
  const { open, setOpen,rolloutName,rolloutId, toStatus,optionIndex, details, agreeText, disagreeText,onRolloutChange } = props;

  const handleYes = () => {
    onRolloutChange(rolloutId,optionIndex);
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {"Do you want to change the status of "+rolloutName+" to "+toStatus}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            {agreeText}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {disagreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
