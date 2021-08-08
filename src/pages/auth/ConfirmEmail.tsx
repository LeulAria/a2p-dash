import React, { useState } from "react";

import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  // CircularProgress,
  Container,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import uuid from "../../utils/uuid";
import firebase, { timestamp } from "../../firebase";
import useQuery from "../../hooks/useQuery";
import { useFireMutation } from "../../FireQuery";
import { useHistory, useLocation } from "react-router";
import { Controller, useForm } from "react-hook-form";
import TextComponent from "../../components/shared/TextComponent";
import { redirectUserHome } from "../../utils/userRoleUtils";

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

const ChangePasswords: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const location: any = useLocation<any>();
  const [locading, setLocading] = useState(false);
  // const { mutate: mutateUser } = useFireMutation("online");
  const {
    // loading,
    mutate
  } = useFireMutation("users");
  const { mutate: mutateUser } = useFireMutation("online");

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      email: query.get("email"),
      password: ""
    },
  });

  const changePassword = [
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
      label: "New Password",
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
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      variant: "outlined",
      type: "password",
      rules: {
        required: "this field is required",
        minLength: {
          value: "6",
          message: "password must be at least 6 characters",
        },
        validate: (value: string) => (value !== getValues("password")
          ? "Confirm password must me same as password"
          : true),
      },
    },
  ];

  const onSubmit = async (data: any) => {
    try {
      await firebase
        .auth()
        .signInWithEmailLink(data.email, location.search)
        .then((result) => {
          const user = result?.user;

          if (user?.uid && result?.user) {
            result.user.updatePassword(data.password)
              .then(() => {
                mutateUser("ADD", user?.uid, {
                  isOnline: true,
                  uid: user?.uid,
                });

                mutate(
                  "ADD",
                  user?.uid,
                  {
                    id: user?.uid,
                    isOnline: true,
                    phoneNumber: query.get("phoneNumber"),
                    companyName: query.get("companyName"),
                    email: result?.user?.email,
                    roles: {
                      isClient: true,
                    },
                  },
                  {
                    createdAt: true,
                    updatedAt: true,
                  }
                ).then(
                  () => firebase
                    .firestore()
                    .collection(`/notifications/${user.uid}/notifications`)
                    .add({
                      msg: `Welcome, Your account is ready.`,
                      type: "success",
                      redirect: null,
                      seen: false,
                      createdAt: timestamp(),
                    })
                )
                  .then(() => firebase.firestore().collection("users").doc(user.uid).get())
                  .then((userData: any) => {
                    const userRoles = userData.data();
                    history.push(redirectUserHome(userRoles?.roles));
                  })
                  .catch((err) => {
                    console.log("ERROR HERE: ", err);
                  });
              });
          }
        });
    } catch (error) {
      console.log("EMAIL: ", error);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Confirm Email | A2P</title>
      </Helmet>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="90vh"
      >
        <Box width="60%" maxWidth={450} minWidth={300}>
          <Typography>
            <Box fontWeight={900} fontSize="2.5rem" textAlign="center">
              Confirm Email
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
                  // disabled={sendingMsg}
                  size="large"
                  variant="contained"
                >
                  Continue
                </Button>
                {/* {sendingMsg && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )} */}
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswords;
