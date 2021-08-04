import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Box, CircularProgress, Theme, makeStyles,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useFireMutation } from '../../FireQuery';
import { useSnackBar } from '../../contexts/snackbar/SnackBarContext';
import TextComponent from '../../components/shared/TextComponent';
import AuthSelectors from '../../components/auth/AuthSelectors';
import UserPassDialog from './UserPassDialog';
import firebase from '../../firebase';
import uuid from '../../utils/uuid';

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  parent: {
    width: '100%',
    borderRadius: '0',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonProgress: {
    color: 'yellow',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  checkBoxContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '7rem',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginLeft: '-0.2rem',
  },
}));

export const signUpFields = [
  {
    name: 'userName',
    label: 'User Name',
    variant: 'outlined',
    type: 'text',
    rules: {
      required: 'this field is required',
      message: 'user name must be at least 4 characters',
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    variant: 'outlined',
    type: 'email',
    rules: {
      required: 'this field is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'invalid email address',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
    variant: 'outlined',
    type: 'password',
    rules: {
      required: 'this field is required',
      minLength: {
        value: '6',
        message: 'password must be at least 6 characters',
      },
    },
  },
];

export default function CreateNewStuff({ open, handleClose }: any) {
  const classes = useStyles();
  const {
    loading, mutate,
  } = useFireMutation('users');
  const { setSnackbar } = useSnackBar();
  const [cred] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [setLoadingUserCreation, setUetLoadingUserCreation] = useState(false);
  const [newUserCred, setNewUserCred] = useState<any>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [openPassDialog, setOpen] = React.useState(false);
  const handleClickOpenPassDialog = () => {
    setOpen(true);
  };
  const handleClosePassDialog = () => {
    setOpen(false);
    reset();
    setUetLoadingUserCreation(false);
  };

  const createNewStuffUser = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (user) => {
          if (user) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                newUserCred.email,
                newUserCred.password,
              )
              .then((userCred) => {
                if (userCred) {
                  console.log('CREATE USER WITH EMAIL: ');
                  mutate(
                    'ADD',
                    userCred.user?.uid,
                    {
                      id: userCred.user?.uid,
                      ...newUserCred,
                      roles: {
                        isTechSupport: newUserCred.role === 'TECH_SUPPORT',
                        isSalesSupport: newUserCred.role === 'SALES_SUPPORT',
                      },
                      isEmailVerified: userCred.user?.emailVerified,
                      accountStatus: 'approved',
                      isStuff: true,
                    },
                    {
                      createdAt: true,
                      updatedAt: true,
                    },
                  );
                }
                return firebase.auth().signOut();
              })
              .then(
                () => {
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(cred.email, cred.password)
                    .then(() => {
                      setSnackbar({
                        type: 'success',
                        message: 'User created successfully!',
                        open: true,
                      });
                      setUetLoadingUserCreation(false);
                      handleClose();
                      reset();
                    });
                },
                (err) => {
                  setSnackbar({
                    open: true,
                    message: err.code,
                    type: 'error',
                  });
                  reset();
                },
              )
              .catch((err) => {
                console.error(err);
                setUetLoadingUserCreation(false);
                reset();
              });
          }
        },
        (err) => {
          setSnackbar({
            type: 'error',
            message: err.code,
            open: true,
          });
        },
      );
  };

  const userEmailAndPass = (email: string, password: string) => {
    handleClosePassDialog();
    createNewStuffUser(email, password);
  };

  const onSubmit = (data: any) => {
    handleClickOpenPassDialog();
    setUetLoadingUserCreation(true);
    setNewUserCred(data);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ textAlign: 'center' }}>
          <Box fontWeight={600}>Create New Stuff User</Box>
        </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {signUpFields.map((value) => (
              <Controller
                key={uuid()}
                name={value.name}
                render={({ field }) => (
                  <TextComponent
                    label={value.label}
                    field={field}
                    errors={errors}
                    name={value.name}
                    type={value.type}
                    variant={value.variant}
                  />
                )}
                control={control}
                rules={value.rules}
              />
            ))}

            <Controller
              name="role"
              render={({ field }) => <AuthSelectors {...field} />}
              control={control}
              rules={{
                required: 'this field is required',
              }}
            />

            <Box my={3} mx={1}>
              <div className={classes.wrapper}>
                <Button
                  disableElevation
                  fullWidth
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading || setLoadingUserCreation}
                >
                  Register As Stuff
                </Button>
                {(loading || setLoadingUserCreation) && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </div>
            </Box>
          </form>
          <UserPassDialog
            open={openPassDialog}
            userEmailAndPass={userEmailAndPass}
            handleClickOpen={handleClosePassDialog}
            handleClose={handleClosePassDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
