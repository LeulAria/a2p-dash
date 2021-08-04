import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const EditDialog = ({
  editDialog,
  closeEditDialog,
  editDialogData,
}: {
  editDialog: boolean;
  closeEditDialog: any;
  editDialogData: any;
}) => {
  const handleClose = () => {
    closeEditDialog();
  };

  const handleSave = () => {
    console.log('Save');
  };

  return (
    <div>
      <Dialog
        open={editDialog}
        onClose={() => closeEditDialog()}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Box display="flex" justifyContent="space-between">
            <Box fontWeight={600} ml={2}>
              Point Name
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            style={{ minWidth: 300, outline: 'none' }}
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <pre>{JSON.stringify(editDialogData, null, 2)}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDialog;
