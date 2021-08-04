import React, { useContext, useEffect, useState } from 'react';

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
import { Link } from 'react-router-dom';
import TextComponent from '../../../components/shared/TextComponent';
import firebase from '../../../firebase';
import { AuthContext } from '../../../contexts/auth/AuthProvider';
import { useSnackBar } from '../../../contexts/snackbar/SnackBarContext';
import { getUserRoles, redirectUserHome } from '../../../utils/userRoleUtils';
import { useFireMutation } from '../../../FireQuery';
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

const Signup: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation<any>();
  const [userEmail, setUserEmail] = useState(location.state?.email || '');
  const [pass, setPass] = useState(location.state?.password || '');
  const { user, dispatch } = useContext(AuthContext);
  const { setSnackbar } = useSnackBar();
  const [isLoggingIn, setIsLogginIn] = useState(false);

  const { mutate: mutateUser } = useFireMutation('online');

  useEffect(() => {
    if (user?.UserRole) {
      if (user?.UserRole.length > 0) {
        const redirect = redirectUserHome(user?.roles);
        history.push(redirect);
      }
    }
  }, [user]);

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
    setIsLogginIn(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (res.user) {
          firebase
            .firestore()
            .collection('users')
            .doc(res.user.uid)
            .get()
            .then((res) => {
              const user = res.data();
              setIsLogginIn(false);
              setSnackbar({
                open: true,
                type: 'success',
                message: `Welcome ${data.email}!`,
              });
              firebase
                .firestore()
                .collection('users')
                .doc(user?.id)
                .onSnapshot((res) => {
                  const userData: any = res.data();
                  const userRole: string[] = getUserRoles(userData.roles);
                  dispatch({
                    type: 'SET_USER',
                    payload: { ...user, UserRole: userRole },
                  });

                  firebase.firestore().doc(`/users/${userData.id}`).update({
                    isOnline: true,
                  });

                  mutateUser('ADD', user?.id, {
                    isOnline: true,
                    id: user?.id,
                  });
                });
            })
            .catch((err) => {
              setSnackbar({
                open: true,
                type: 'error',
                message: err.code,
              });
            });
        }
      })
      .catch((err) => {
        setIsLogginIn(false);
        setSnackbar({
          open: true,
          type: 'error',
          message: err.code,
        });
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Signup | A2P</title>
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
              Login A2P
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
                  disabled={isLoggingIn}
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
                {isLoggingIn && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </div>
              <Box mt={2} textAlign="end">
                <Link to="/auth-admin/signup">Don&apos;t have account Signup</Link>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
