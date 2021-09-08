import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
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
import firebase from "../../../firebase";
import { useFireMutation } from "../../../FireQuery";
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion
} from "../../../zion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import { getUserRoles, redirectUserHome } from "../../../utils/userRoleUtils";

interface Props extends RouteComponentProps<{ state?: string }> {
  // props.location.state.myStateProp
  myNormalProp: boolean;
}

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

const Signup: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation<any>();
  const { user, dispatch } = useContext(AuthContext);
  const { setSnackbar } = useSnackBar();
  const [isLoggingIn, setIsLoggedIn] = useState(false);

  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();
 
  const zionForm = useZion({});

  const { mutate: mutateUser } = useFireMutation("online");

  useEffect(() => {
    if (user?.UserRole) {
      if (user?.UserRole.length > 0) {
        const redirect = redirectUserHome(user?.roles);
        history.push(redirect);
      }
    }
  }, [user]);

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
            }
          ],
        }
      ]
    });
  }, []);

  const onSubmit = (data: { email: string; password: string }) => {
    setIsLoggedIn(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (res.user) {
          firebase
            .firestore()
            .collection("users")
            .doc(res.user.uid)
            .get()
            .then((res) => {
              const user = res.data();
              setIsLoggedIn(false);
              setSnackbar({
                open: true,
                type: "success",
                message: `Welcome ${data.email}!`,
              });
              firebase
                .firestore()
                .collection("users")
                .doc(user?.id)
                .onSnapshot((res) => {
                  const userData: any = res.data();
                  const userRole: string[] = getUserRoles(userData.roles);
                  dispatch({
                    type: "SET_USER",
                    payload: { ...user, UserRole: userRole },
                  });

                  firebase.firestore().doc(`/users/${userData.id}`).update({
                    isOnline: true,
                  });

                  mutateUser("ADD", user?.id, {
                    isOnline: true,
                    id: user?.id,
                  });
                });
            })
            .catch((err) => {
              setSnackbar({
                open: true,
                type: "error",
                message: err.code,
              });
            });
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setSnackbar({
          open: true,
          type: "error",
          message: err.code,
        });
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Login | A2P</title>
      </Helmet>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="90vh"
      >
        <Box maxWidth={400}>
          <Typography>
            <Box fontWeight={900} fontSize="2.5rem" textAlign="center" mb="1rem">
              Login A2P
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
                disabled={isLoggingIn}
                size="large"
                variant="contained"
                onClick={() => submitElement.click()}
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
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
