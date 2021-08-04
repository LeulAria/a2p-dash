import React, { useContext } from 'react';
import firebase from 'firebase';
import Alert from '@material-ui/lab/Alert';
import { Controller, useForm } from 'react-hook-form';
import {
  Box, Button, CircularProgress, Theme, makeStyles,
} from '@material-ui/core';
import { useFireMutation } from '../../FireQuery';
import { AuthContext } from '../../contexts/auth/AuthProvider';
import TextComponent from '../../components/shared/TextComponent';
import { useSnackBar } from '../../contexts/snackbar/SnackBarContext';
import uuid from '../../utils/uuid';

export const landingPageForm = [
  {
    name: 'clientName',
    label: 'Client Name',
    variant: 'outlined',
    type: 'text',
    rules: {
      required: 'this field is required',
    },
  },
  {
    name: 'companyName',
    label: 'Company Name',
    variant: 'outlined',
    type: 'text',
    rules: {
      required: 'this field is required',
    },
  },
  {
    name: 'companyUrl',
    label: 'Company Url',
    variant: 'outlined',
    type: 'text',
    rules: {
      required: 'this field is required',
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
    name: 'phoneNumber',
    label: 'Tel',
    variant: 'outlined',
    type: 'tel',
    rules: {
      required: 'this field is required',
      pattern: {
        value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
        message: 'invalid format',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
    variant: 'outlined',
    type: 'password',
    rules: {
      minLength: {
        value: '6',
        message: 'password must be at least 6 characters',
      },
    },
  },
];

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

export default function UserForm({ handleClose }: any) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { setSnackbar } = useSnackBar();
  const { loading, mutate } = useFireMutation('users');
  const { error: errorOrder, loading: loadingOrder } = useFireMutation('orders');

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      clientName: user.clientName,
      companyName: user.companyName,
      companyUrl: user.companyUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password || '',
    },
  });

  const onSubmit = (data: any) => {
    mutate(
      'UPDATE',
      user?.uid,
      {
        clientName: data.clientName,
        companyName: data.companyName,
        companyUrl: data.companyUrl,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
      {
        updatedAt: true,
      },
    );

    const curUser = firebase.auth().currentUser;
    if (curUser) {
      curUser
        .updatePassword(data.password)
        .then(() => {
          setSnackbar({
            open: true,
            message: 'Profile updated successfully!',
            type: 'success',
          });
          handleClose();
        })
        .catch((error: any) => {
          setSnackbar({
            open: true,
            message: error.code,
            type: 'error',
          });
        });
    }
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        width="100%"
        height="100%"
        className={classes.parentBox}
      >
        {errorOrder && (
          <Alert security="error">
            {typeof errorOrder === 'string' ? errorOrder : errorOrder.code}
          </Alert>
        )}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {landingPageForm.map((value: any) => (
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
                  value={field.value}
                  variant={value.variant}
                />
              )}
              control={control}
              rules={value.rules}
            />
          ))}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mt={3}
            px={10}
          >
            <div className={classes.wrapper}>
              <Button
                disableElevation
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                type="submit"
                disabled={loading && loadingOrder}
              >
                Update
              </Button>
              {loading && loadingOrder && (
                <CircularProgress size={30} className={classes.buttonProgress} />
              )}
            </div>
          </Box>
        </form>
      </Box>
    </div>
  );
}
