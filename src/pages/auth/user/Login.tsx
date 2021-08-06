import React, { useContext, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import TextComponent from "../../../components/shared/TextComponent";
import firebase from "../../../firebase";
import { useFireMutation } from "../../../FireQuery";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import { redirectUserHome } from "../../../utils/userRoleUtils";
import Navbar from "../../../components/home/Navigationbar/Navbar";
import uuid from "../../../utils/uuid";

const useStyles = makeStyles(() => createStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formInput: {
    fontWeight: 600,
  },
}));

export const signUpFields = [
  {
    name: "email",
    label: "Email Address",
    variant: "outlined",
    type: "email",
    rules: {
      required: "this field is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    variant: "outlined",
    type: "password",
    rules: {
      required: "this field is required",
      minLength: {
        value: "6",
        message: "password must be at least 6 characters",
      },
    },
  },
];

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const [userEmail, setUserEmail] = useState(location?.state?.email || "");
  const [pass, setPass] = useState(location?.state?.password || "");
  const [loadingCred, setLoadingCred] = useState(false);
  const { mutate } = useFireMutation(
    `/notifications/${location.state ? location.state.uid : ""}/notifications`,
  );
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: mutateUser } = useFireMutation("online");

  const [loggingIn, setLogginIn] = useState(false);
  const { user } = useContext(AuthContext);
  const { setSnackbar } = useSnackBar();

  useEffect(() => {
    if (user?.UserRole) {
      if (user?.UserRole.length > 0) {
        const redirect = redirectUserHome(user?.roles);
        history.push(redirect);
      }
    }
  }, [user]);

  useEffect(() => {
    if (location.state) {
      const {
        isFirstTimeLogin, user, email, password,
      } = location.state;

      if (isFirstTimeLogin) {
        setLoadingCred(true);
        if (isFirstTimeLogin) {
          if (user) {
            setUserEmail(email);
            setPass(password);
            mutate(
              "ADD",
              null,
              {
                msg: "Change your current temporary password!",
                type: "warning",
                redirect: "/app/change-password",
                seen: false,
              },
              {
                createdAt: true,
              },
            );
          }
        } else {
          setSnackbar({
            open: true,
            type: "error",
            message: "Your account was not found try registering again!",
          });
          history.push("/");
        }
      }
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
    setLogginIn(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (res.user) {
          setLogginIn(false);
          firebase.firestore().doc(`/users/${res.user.uid}`).update({
            isOnline: true,
          });

          mutateUser("ADD", res.user.uid, {
            isOnline: true,
            id: res.user.uid,
          });

          setSnackbar({
            open: true,
            type: "success",
            message: `Welcome ${data.email}!`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setLogginIn(false);
        enqueueSnackbar(err.code, {
          variant: "error",
        });
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Login | A2P</title>
      </Helmet>

      <Navbar navs={false} />
      <Box
        display="flex"
        flexDirection="column"
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
                  disabled={loggingIn}
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
                {(loggingIn || loadingCred) && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </div>
            </Box>
          </form>
          <Box textAlign="right" mr={1}>
            <Link to="/forgot-password">Forgot Password ?</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
