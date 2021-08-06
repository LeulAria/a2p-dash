import React, { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Theme,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router";
import Alert from "@material-ui/lab/Alert";
import { Controller, useForm } from "react-hook-form";
import Solutions from "./solutionTypes";
import firebase from "../../../firebase";
import { useFireMutation } from "../../../FireQuery";
import TextComponent from "../../../components/shared/TextComponent";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import Safe from "../../../assets/icons/registration/wekeepyourdatasafe.svg";
import uuid from "../../../utils/uuid";

export const landingPageForm = [
  {
    name: "clientName",
    label: "Client Name",
    variant: "standard",
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "companyName",
    label: "Company Name",
    variant: "standard",
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "companyUrl",
    label: "Company Url",
    variant: "standard",
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "email",
    label: "Email Address",
    variant: "standard",
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
    name: "phoneNumber",
    label: "Tel",
    variant: "standard",
    type: "tel",
    rules: {
      required: "this field is required",
      pattern: {
        value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
        message: "invalid format",
      },
    },
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    // width: "100%",
    // [theme.breakpoints.down("md")]: {
    //   alignItems: "center",
    // },
  },
  parent: {
    width: "100%",
    borderRadius: "0",
  },
  regBtn: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    background: "linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)",
    color: "white",
    fontSize: "14px",
    textTransform: "none",
    letterSpacing: "1px",
  },
  wrapper: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  buttonProgress: {
    color: "yellow",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  checkBoxContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "7rem",
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  icon: {
    color: "linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)",
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  root: {
    // marginLeft: "-0.2rem",
  },
}));

export default function PageForm() {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const [isAtuthing, setIsAtuthing] = useState(false);
  const { setSnackbar } = useSnackBar();
  const { loading, success, mutate } = useFireMutation("users");
  const {
    error: errorOrder,
    success: successOrder,
    mutate: mutateOrder,
  } = useFireMutation("orders");

  const createSolutionSubscription = async (
    uid: string,
    data: any,
    solutionType?: string,
  ) => mutateOrder(
    "ADD",
    null,
    {
      ...data,
      status: "pending",
      isPayed: false,
      reviewd: false,
      isStuff: false,
      isDetailFilled: false,
      hasSalesReviewer: false,
      hasTechReviewer: false,
      isPayApproved: false,
      approedByAdmin: false,
      billingStarted: false,
      uid,
      currentTechReviewer: null,
      currentSalesReviewer: null,
      currentTechReviewerRef: null,
      currentSalesReviewerRef: null,
      solutions: solutionType || data.solutions,
    },
    {
      createdAt: true,
      updatedAt: true,
    },
  );

  const onSubmit = async (data: any) => {
    try {
      setIsAtuthing(true);
      const temporaryPass = Math.floor(Math.random() * 10000000000000000).toString(
        34,
      );
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, temporaryPass);

      if (userCred) {
        await mutate(
          "ADD",
          userCred.user?.uid,
          {
            ...data,
            temporaryPass,
            isPassChanged: false,
            id: userCred.user?.uid,
            email: userCred.user?.email,
            isOnline: true,
            roles: {
              isClient: true,
            },
            isEmailVerified: userCred.user?.emailVerified,
          },
          {
            createdAt: true,
            updatedAt: true,
          },
        );

        if (data.solutions === "Both") {
          await createSolutionSubscription(
            userCred.user?.uid || "",
            data,
            "A2P API",
          );
          await createSolutionSubscription(
            userCred.user?.uid || "",
            data,
            "SMS Campaign",
          );
        } else {
          await createSolutionSubscription(userCred.user?.uid || "", data);
        }

        const user = firebase.auth().currentUser;

        if (user) {
          const actionCodeSettings = {
            url:
              window.location.hostname === "localhost"
                ? `http://localhost:3000/email-verification-confirmation/${user.email}`
                : `https://customer-support-co-et.web.app/email-verification-confirmation/${user.email}`,
          };

          await user.sendEmailVerification(actionCodeSettings);
          // Email sent.
          history.push(`/email-verification/${user.email}`);
          setSnackbar({
            type: "success",
            open: true,
            message: "Emali Verification Sent...",
          });
          const timestamp = firebase.firestore.FieldValue.serverTimestamp;

          await firebase
            .firestore()
            .collection(`/notifications/${user.uid}/notifications`)
            .add({
              msg: `Your ${
                data.solutions === "Both" ? "A2P API & SMS Campaign" : data.solutions
              } order has been created and is in pending mode.`,
              type: "success",
              redirect: null,
              seen: false,
              createdAt: timestamp(),
            });
        }
      }
      return success;
    } catch (err) {
      setIsAtuthing(false);
      setSnackbar({
        type: "error",
        open: true,
        message: err.code || "Error occurred please try again!",
      });
      return err;
    }
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        className={classes.parentBox}
      >
        <Paper className={classes.parent} elevation={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box mt={4} display="flex" justifyContent="center">
              <Box fontWeight={700} fontSize="1.2rem">
                Registration
              </Box>
            </Box>
            {errorOrder && (
              <Alert security="error">
                {typeof errorOrder === "string" ? errorOrder : errorOrder.code}
              </Alert>
            )}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              {landingPageForm.map((value: any) => (
                <Box px="10%" py={1} key={uuid()}>
                  <Controller
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
                </Box>
              ))}

              <Box px="10%" py={1}>
                <Controller
                  name="solutions"
                  render={({ field }) => <Solutions field={field} errors={errors} />}
                  control={control}
                  rules={{
                    required: "this field is required",
                  }}
                />
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mt={2}
                px={5}
              >
                <div className={classes.wrapper}>
                  <Button
                    className={classes.regBtn}
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={loading || isAtuthing || successOrder}
                  >
                    Register
                  </Button>
                  {(loading || isAtuthing || successOrder) && (
                    <CircularProgress size={30} className={classes.buttonProgress} />
                  )}
                </div>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                my={2}
                px={10}
              >
                <Box mx={1}>
                  <img src={Safe} alt="We keep your data safe. " />
                </Box>
                <Box fontWeight={700} fontSize="13px">
                  We Keep Your Data Safe
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
