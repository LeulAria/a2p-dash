import React, { useState } from "react";

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
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import firebase from "firebase";
import TextComponent from "../../../components/shared/TextComponent";
import { useFireMutation } from "../../../FireQuery";
import AuthSelectors from "../../../components/auth/AuthSelectors";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
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
    name: "userName",
    label: "User Name",
    variant: "outlined",
    type: "text",
    rules: {
      required: "this field is required",
      message: "user name must be at least 4 characters",
    },
  },
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
  const [isAtuthing, setIsAtuthing] = useState(false);
  const { setSnackbar } = useSnackBar();

  const { loading, success, mutate } = useFireMutation("users");
  const { mutate: mutateUser } = useFireMutation("online");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    setIsAtuthing(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCred) => {
        if (userCred) {
          mutate(
            "ADD",
            userCred.user?.uid,
            {
              id: userCred.user?.uid,
              ...data,
              isOnline: true,
              roles: {
                isTechSupport: data.role === "TECH_SUPPORT",
                isSalesSupport: data.role === "SALES_SUPPORT",
              },
              isEmailVerified: userCred.user?.emailVerified,
              accountStatus: "pending",
              isStuff: true,
            },
            {
              createdAt: true,
              updatedAt: true,
            },
          );

          mutateUser("ADD", userCred.user?.uid, {
            isOnline: true,
            id: userCred.user?.uid,
          });
        }
        return success;
      })
      .then(() => {
        setIsAtuthing(false);
        setSnackbar({
          open: true,
          message: "Account created successfully...",
          type: "success",
        });
        history.push("/auth-admin/login", {
          email: data.email,
        });
      })
      .catch((err) => {
        console.error(err);
        setTimeout(() => setIsAtuthing(false), 300);
        setSnackbar({
          open: true,
          message: err.code,
          type: "error",
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
        <Box maxWidth={350}>
          <Typography>
            <Box fontWeight={900} fontSize="2.5rem" textAlign="center">
              Signup A2P
            </Box>
          </Typography>

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
            <Box mt={1} />
            <Controller
              name="role"
              render={({ field }) => <AuthSelectors {...field} />}
              control={control}
              rules={{
                required: "this field is required",
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
                  disabled={loading || isAtuthing}
                >
                  SIGNUP
                </Button>
                {loading
                  || (isAtuthing && (
                    <CircularProgress size={30} className={classes.buttonProgress} />
                  ))}
              </div>
              <Box mt={2} textAlign="end">
                <Link to="/auth-admin/login">Already meber Login?</Link>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
