import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ShowDialog = ({
  showDialog,
  closeShowDialog,
  viewDialogData,
}: {
  showDialog: boolean;
  closeShowDialog: any;
  viewDialogData: any;
}) => {
  const handleClose = () => {
    closeShowDialog();
  };

  const data = {
    'Client Name': viewDialogData.clientName,
    'Company Name': viewDialogData.companyName,
    'Phone Number': viewDialogData.phoneNumber,
    Email: viewDialogData.email,
    Status: viewDialogData.status,
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Ordered
          {' '}
          {viewDialogData
            && viewDialogData.createdAt
            && dayjs().to(dayjs(viewDialogData.createdAt?.toDate().toString()))}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            style={{ minWidth: 300, outline: 'none' }}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box
              color="#333"
              textAlign="center"
              fontWeight={700}
              fontSize="1.2rem"
              mb={1}
              mr={1}
            >
              {viewDialogData?.solutions}
            </Box>
            {Object.entries(data).map(([key, value]) => (
              <Box key={key} display="flex">
                <Box fontWeight={600} mr={1}>
                  {key}
                  :
                </Box>
                <Box>{value}</Box>
              </Box>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowDialog;
