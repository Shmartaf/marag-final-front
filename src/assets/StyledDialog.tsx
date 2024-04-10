import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "30px",
  },
  "& .MuiDialogActions-root": {
    padding: "30px",
  },
}));

export default function StyledDialog({
  button,
  model,
  title,
  closeTrigger,
  onClose,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className="p-0" onClick={handleClickOpen}>
        {button}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="w-[420px] p-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            <IconButton onClick={handleClose} sx={{ p: 0, mr: -0.5 }}>
              <CloseIcon className="w-5" />
            </IconButton>
          </div>
          {model}
          <div onClick={handleClose} className="p-0 w-full flex justify-end">
            {closeTrigger}
          </div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}
