import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Theme,
  makeStyles,
} from "@material-ui/core";
import firebase from '../../../firebase';
import Safe from "../../../assets/icons/registration/wekeepyourdatasafe.svg";
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion
} from "../../../zion";
import EmailConfirmationPopup from "../../../components/home/Hero/EmailConfirmationPopup";

const useStyles = makeStyles((theme: Theme) => ({
  parent: {
    width: "100%",
    borderRadius: "8px",
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

export default function PageForm({ data }: any) {
  const classes = useStyles();
  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();

  const zionForm = useZion({});
 
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
              name: "companyName",
              variant: "outlined",
              label: "Company Name.",
              rules: new ZionValidation(zionForm).required("Required Field.").min(2, "Value should be greater than 2 characters.").rules
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
              name: "phoneNumber",
              variant: "outlined",
              label: "Tel",
              rules: new ZionValidation(zionForm).required("Required Field.").matches(/(^(\+251)+|^0)[9][0-9]{8}\b/, "Invalid Phone number").rules
            },
          ],
        }
      ]
    });
  }, []);

  const onSubmit = async (data: { companyName: string, email: string, phoneNumber: string }) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .sendSignInLinkToEmail(data.email, {
          url: 
            window.location.hostname === "localhost"
              ? `http://localhost:3000/confirm?email=${data.email}&companyName=${data.companyName}&phoneNumber=${data.phoneNumber}`
              : `https://a2p-teklogix.web.app/confirm?email=${data.email}&companyName=${data.companyName}&phoneNumber=${data.phoneNumber}`,
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
      <EmailConfirmationPopup
        data={data}
        open={emailSent}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Paper className={classes.parent} elevation={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box mt={4} display="flex" justifyContent="center">
              <Box fontWeight={900} fontSize="1.6rem">
                Registration
              </Box>
            </Box>
            <Box mx={6} mt={2}>
              <Zion
                designSystem="mui"
                form={form}
                noSubmitButton
                zionForm={zionForm}
                submitElement={(element: any) => setSubmitElement(element)}
                onSubmit={(formData: any) => onSubmit(formData)}
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
                  disabled={loading}
                  onClick={() => submitElement?.click()}
                >
                  Register
                  {(loading) && (
                    <CircularProgress size={30} className={classes.buttonProgress} />
                  )}
                </Button>
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
            <Box mb={2} />
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
