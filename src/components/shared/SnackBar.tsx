import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useSnackBar } from '../../contexts/snackbar/SnackBarContext';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

export default function SnackBar() {
  const classes = useStyles();
  const { snackBar, resetSnackBar } = useSnackBar();

  const handleClose = () => {
    resetSnackBar();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackBar.type as Severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
