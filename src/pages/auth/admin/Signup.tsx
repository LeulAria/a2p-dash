import React, { useMemo, useState } from "react";

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
import firebase from "firebase";
import { useFireMutation } from "../../../FireQuery";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion
} from "../../../zion";

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

  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();
 
  const zionForm = useZion({});

  const { loading, success, mutate } = useFireMutation("users");
  const { mutate: mutateUser } = useFireMutation("online");

  useMemo(() => {
    setForm({
      stepperSuccess: "All Done.",
      gridContainer: { spacing: 2, justify: "space-around" },
      formSchemas: [
        {
          title: "Company details",
          grid: { xs: 12 },
          gridContainer: { spacing: 2, justify: "center" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={2} />
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "userName",
              type: "userName",
              variant: "outlined",
              label: "User Name",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "Should be greater than 2.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "email",
              type: "email",
              variant: "outlined",
              label: "Email Address",
              rules: new ZionValidation(zionForm).required("Required Field.").email("Invalid email address.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "password",
              type: "password",
              variant: "outlined",
              label: "Password",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(6, "Value should be greater than 6 characters.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "confirmPassword",
              type: "password",
              variant: "outlined",
              label: "Confirm New Password",
              rules: new ZionValidation(zionForm).required("Required Field.").equals("password", "Confirm password must me same as password").rules
            },
            {
              grid: { xs: 12 },
              widget: "select",
              name: "role",
              type: "password",
              variant: "outlined",
              options: [
                {
                  value: "TECH_SUPPORT",
                  label: "TECH SUPPORT"
                },
                {
                  value: "SALES_SUPPORT",
                  label: "SALES SUPPORT"
                }
              ],
              label: "UserRole",
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
          ],
        }
      ]
    });
  }, []);

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
        <Box maxWidth={400}>
          <Typography>
            <Box fontWeight={900} fontSize="2.5rem" textAlign="center">
              Signup A2P
            </Box>
          </Typography>

          <Zion
            designSystem="mui"
            form={form}
            noSubmitButton
            zionForm={zionForm}
            submitElement={(element: any) => setSubmitElement(element)}
            onSubmit={(formData: any) => onSubmit(formData)}
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
                onClick={() => submitElement.click()}
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
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
