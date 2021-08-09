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
import firebase, { timestamp } from "../../firebase";
import useQuery from "../../hooks/useQuery";
import { useFireMutation } from "../../FireQuery";
import { useHistory, useLocation } from "react-router";
import { redirectUserHome } from "../../utils/userRoleUtils";
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion
} from "../../zion";

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
  const query = useQuery();
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation<any>();
  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();
 
  const zionForm = useZion({
    defaultValues: useMemo(() => ({
      email: query.get("email"),
      password: ""
    }), [query])
  });

  const [loading, setLoading] = useState(false);
  const {
    mutate
  } = useFireMutation("users");
  const { mutate: mutateUser } = useFireMutation("online");

  useMemo(() => {
    setForm({
      skeleton: "grid",
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
              rules: new ZionValidation(zionForm).required("Required Field.").min(6, "Value should be greater than 6 characters.").rules
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
          ],
        }
      ]
    });
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
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
                    setLoading(true);
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

          <Zion
            designSystem="mui"
            form={form}
            noSubmitButton
            zionForm={zionForm}
            submitElement={(element: any) => setSubmitElement(element)}
            onSubmit={(formData: any) => onSubmit(formData)}
          />

          <Box my={3}>
            <div className={classes.wrapper}>
              <Button
                disableElevation
                color="primary"
                fullWidth
                disabled={loading}
                size="large"
                variant="contained"
                onClick={() => submitElement.click()}
              >
                Continue
                {loading && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswords;
