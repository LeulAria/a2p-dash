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
  Grid,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFireMutation } from "../../../FireQuery";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import { redirectUserHome } from "../../../utils/userRoleUtils";
import Navbar from "../../../components/home/Navigationbar/Navbar";
import firebase from '../../../firebase';
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion
} from "../../../zion";
import AppToPeer from "../../../assets/images/application_to_peer.png";

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

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const [loadingCred, setLoadingCred] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();
 
  const zionForm = useZion({});

  const { mutate: mutateUser } = useFireMutation("online");
  const [loggingIn, setLoggedIn] = useState(false);
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
    setLoggedIn(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (res.user) {
          setLoggedIn(false);
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
        setLoggedIn(false);
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
        width="100%"
        minHeight="100vh"
      >
        <Grid container justify="space-between" spacing={5}>
          <Grid item xs={false} md={5} lg={6}>
            <img
              style={{ maxWidth: 350 }}
              src={AppToPeer}
              alt='sms marketing png'
            />
          </Grid>
          <Grid item xs={false} md={5} lg={5}>
            <Box maxWidth={450}>
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
                    disabled={loggingIn}
                    size="large"
                    variant="contained"
                    onClick={() => submitElement.click()}
                  >
                    Login
                  </Button>
                  {(loggingIn || loadingCred) && (
                    <CircularProgress size={30} className={classes.buttonProgress} />
                  )}
                </div>
              </Box>

              <Box textAlign="right" mr={1}>
                <Link to="/forgot-password">Forgot Password ?</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
