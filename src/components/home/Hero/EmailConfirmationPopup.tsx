import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  createStyles,
  makeStyles
} from '@material-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

const useStyles = makeStyles(() => createStyles({
  popupContainer: {
    position: "fixed",
    bottom: 90,
    right: 20,
    width: "40vw",
    maxWidth: 450,
    borderRadius: 12,
    padding: "1rem 2rem",
    minWidth: 320,
    height: 140,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 200000,
    background: "#FFF",
    color: "#222",
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)"
  },
  closePopupButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    background: "#ddd",
    transition: "background .2s",
    "&:hover": {
      background: "#ccc",
    }
  }
}));

const EmailConfirmationPopup = ({ open, data }: {open: boolean, data: any}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (open) {
      setOpenDialog(true);
    }
  }, [open]);

  console.log("DATA: ", data);

  return (
    <AnimatePresence initial={false}>
      {
        openDialog && (
          <motion.div
            className={classes.popupContainer}
            initial={{ opacity: 1, y: 50, scale: 0.3, }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                duration: 0.3
              },
            }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 0.2 } }}
          >
            <Box fontWeight={900} fontSize="1.5rem" mb={1}>
              { data?.confirmation_popup_message_title }
            </Box>
            <Box fontWeight={500} fontSize="1rem">
              { data?.confirmation_popup_message_description }
            </Box>
            <IconButton
              onClick={() => setOpenDialog(false)}
              className={classes.closePopupButton}
            >
              &times;
            </IconButton>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
};

export default EmailConfirmationPopup;
