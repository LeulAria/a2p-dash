import React, { useEffect, useState } from 'react';

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
import { RouteComponentProps, useHistory, useLocation } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import TextComponent from '../../../components/shared/TextComponent';
import firebase from '../../../firebase';
import { useSnackBar } from '../../../contexts/snackbar/SnackBarContext';
import uuid from '../../../utils/uuid';

interface Props extends RouteComponentProps<{ state?: string }> {
  // props.location.state.myStateProp
  myNormalProp: boolean;
}

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

export const signUpFields = [
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
];

const ForgotPass: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation<any>();
  const [userEmail, setUserEmail] = useState(location.state?.email || '');
  const [pass, setPass] = useState(location.state?.password || '');
  const { setSnackbar } = useSnackBar();
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => {
    if (history) {
      setUserEmail(location.state?.email || '');
      setPass(location.state?.password || '');
    }
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: userEmail,
      password: pass,
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    setSendingMsg(true);
    if (data.email) {
      firebase
        .auth()
        .sendPasswordResetEmail(data.email)
        .then(() => {
          setSnackbar({
            open: true,
            message: 'Email confirmation sent!',
            type: 'success',
          });
          setSendingMsg(false);
          history.push('/user/login');
        })
        .catch((error) => {
          setSnackbar({
            open: true,
            message: error.code,
            type: 'error',
          });
          setSendingMsg(false);
        });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Forgot Password | A2P</title>
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
              Forgot Password
            </Box>
          </Typography>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {signUpFields.map((value: any) => (
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
                  Send Confirmation
                </Button>
                {sendingMsg && (
                  <CircularProgress
                    size={30}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPass;
