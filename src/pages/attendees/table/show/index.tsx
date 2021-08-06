import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Box, Grid} from "@material-ui/core";
import DisplayText from "../../../../components/shared/DisplayText";
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

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        maxWidth="md"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box fontWeight={700} p={2} id="scroll-dialog-title">
          Order: {viewDialogData?.solutions}
        </Box>
        <DialogContent dividers>
          <DialogContentText
            style={{minWidth: 300, outline: "none"}}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {viewDialogData && (
              <Grid container spacing={2}>
                <DisplayText title={"Client Name"} value={viewDialogData?.clientName} />
                <DisplayText title="Email" value={viewDialogData?.email} />
                <DisplayText title="Solutions" value={viewDialogData?.solutions} />
                <DisplayText title="Company Name" value={viewDialogData?.companyName} />
                <DisplayText title="Company Url" value={viewDialogData?.companyUrl} />
                <DisplayText title="isPayApproved" value={viewDialogData?.isPayApproved ? "Approved" : "Not Approved"} />
                <DisplayText title="Billing Started" value={viewDialogData?.billingStarted ? "Started" : "Not Started"} />
                <DisplayText title="Phone Number" value={viewDialogData?.phoneNumber} />
                <DisplayText title="createdAt" value={viewDialogData &&
                    viewDialogData.updatedAt &&
                    dayjs(viewDialogData.updatedAt.toDate()).format("d-MMM-YYYY")}
                />
              </Grid>
            )}
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
