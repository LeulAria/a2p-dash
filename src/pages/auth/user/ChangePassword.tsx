import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import TextComponent from '../../../components/shared/TextComponent';
import firebase from '../../../firebase';
import { useSnackBar } from '../../../contexts/snackbar/SnackBarContext';
import { redirectUserHome } from '../../../utils/userRoleUtils';
import { useFireMutation } from '../../../FireQuery';
import uuid from '../../../utils/uuid';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formInput: {
    fontWeight: 600,
  },
}));

const ChangePasswords: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation<any>();
  const [userEmail] = useState(location.state?.email || '');
  const [pass] = useState(location.state?.password || '');
  const { setSnackbar } = useSnackBar();
  const [sendingMsg, setSendingMsg] = useState(false);
  const { mutate: mutateUser } = useFireMutation('online');

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: userEmail,
      password: pass,
    },
  });

  const changePassword = [
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
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      variant: 'outlined',
      type: 'password',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '6',
          message: 'password must be at least 6 characters',
        },
        validate: (value: string) => (value !== getValues('password')
          ? 'Confirm password must me same as password'
          : true),
      },
    },
  ];

  const onSubmit = (data: any) => {
    setSendingMsg(true);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        mutateUser('ADD', user?.uid, {
          isOnline: true,
          id: user?.uid,
        });
      }

      user
        ?.updatePassword(data.password)
        .then(() => {
          setSendingMsg(false);

          return firebase.firestore().collection('users').doc(user.uid).update({
            isPassChanged: true,
          });
        })
        .then(() => firebase.firestore().collection('users').doc(user.uid).get())
        .then((userData: any) => {
          const userRoles = userData.data();
          history.push(redirectUserHome(userRoles?.roles));
        })
        .catch((error: any) => {
          setSnackbar({
            open: true,
            message: error.code,
            type: 'error',
          });
          setSendingMsg(false);
        });
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Change Password | A2P</title>
      </Helmet>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="90vh"
      >
        <Box maxWidth={450}>
          <Typography>
            <Box fontWeight={900} fontSize="2.5rem" textAlign="center">
              Change Password
            </Box>
          </Typography>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {changePassword.map((value: any) => (
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

            <Box my={3}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  disableElevation
                  color="primary"
                  fullWidth
                  disabled={sendingMsg}
                  size="large"
                  variant="contained"
                >
                  Change Password
                </Button>
                {sendingMsg && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswords;
