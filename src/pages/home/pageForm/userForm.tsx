import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Theme,
  makeStyles,
} from "@material-ui/core";
import uuid from "../../../utils/uuid";
import firebase from '../../../firebase';
import { Controller, useForm } from "react-hook-form";
import TextComponent from "../../../components/shared/TextComponent";
import Safe from "../../../assets/icons/registration/wekeepyourdatasafe.svg";
import EmailConfirmationPopup from "../../../components/home/Hero/EmailConfirmationPopup";

export const landingPageForm = [
  {
    name: "companyName",
    label: "Company Name",
    variant: "standard",
    size: "small",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "email",
    label: "Email Address",
    variant: "standard",
    size: "small",
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
    size: "small",
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
    borderRadius: "8px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.2)",
  },
  regBtn: {
    [theme.breakpoints.up("md")]: {
      width: "95%",
    },
    borderRadius: "5px",
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
    getValues
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data: { companyName: string, email: string, phoneNumber: string }) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .sendSignInLinkToEmail(data.email, {
          url: 
          window.location.hostname === "localhost"
            ? `http://localhost:3000/confirm?email=${data.email}&companyName=${data.companyName}&phoneNumber=${data.phoneNumber}`
            : `https://a2p-teklogix.firebase.app/confirm?email=${data.email}&companyName=${data.companyName}&phoneNumber=${data.phoneNumber}`,
          handleCodeInApp: true,
        })
        .then(() => {
          setEmailSent(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <EmailConfirmationPopup email={getValues('email')} open={emailSent} />
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
              <Box fontWeight={900} fontSize="1.6rem">
                Registration
              </Box>
            </Box>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                        size={value.size}
                        variant={value.variant}
                      />
                    )}
                    control={control}
                    rules={value.rules}
                  />
                </Box>
              ))}

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
                    disabled={loading}
                  >
                    Register
                  </Button>
                  {(loading) && (
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
