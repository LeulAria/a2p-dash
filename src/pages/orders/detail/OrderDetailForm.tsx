import React, { useContext, useEffect } from "react";
import {
  Box, Button, CircularProgress, Theme, makeStyles,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import Solutions from "./solutionTypes";
import { useFireMutation } from "../../../FireQuery";
import TextComponent from "../../../components/shared/TextComponent";
import { useSnackBar } from "../../../contexts/snackbar/SnackBarContext";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import uuid from "../../../utils/uuid";

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  parent: {
    width: "80%",
    padding: "0 5%",
    margin: "auto",
    borderRadius: 10,
  },
  regBtn: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
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
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginLeft: "-0.2rem",
  },
  orderLogo: {
    background: theme.palette.primary.main,
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
}));

export const orderForm = [
  {
    name: "clientName",
    label: "Client Name",
    variant: "outlined",
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "companyName",
    label: "Company Name",
    variant: "outlined",
    disabled: true,
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "companyUrl",
    label: "Company Url",
    variant: "outlined",
    type: "text",
    rules: {
      required: "this field is required",
    },
  },
  {
    name: "email",
    label: "Email Address",
    variant: "outlined",
    disabled: true,
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
    variant: "outlined",
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

export default function OrderDetailForm({ data }: any) {
  const classes = useStyles();
  const { setSnackbar } = useSnackBar();
  const {
    error: errorOrder,
    loading,
    success,
    mutate: mutateOrder,
  } = useFireMutation("orders");
  const { user } = useContext(AuthContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      clientName: data?.clientName,
      companyName: data?.companyName,
      companyUrl: data?.companyUrl,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      solutions: data?.solutions,
    },
  });

  const onSubmit = (data: any) => {
    mutateOrder(
      "UPDATE",
      user.uid,
      {
        ...user,
        ...data,
      },
      {
        createdAt: true,
        updatedAt: true,
      },
    );
  };

  useEffect(() => {
    if (success) {
      setSnackbar({
        open: true,
        message: "Order updated successfully.",
        type: "success",
      });
    }
  }, [success]);

  useEffect(() => {
    if (errorOrder) {
      setSnackbar({
        open: true,
        message: "Error occurred please try again!",
        type: "error",
      });
    }
  }, [errorOrder]);

  return (
    <div>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        width="100%"
        height="100%"
        className={classes.parentBox}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" p={1}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {orderForm.map((value: any) => (
              <Controller
                key={uuid()}
                name={value.name}
                render={({ field }) => (
                  <TextComponent
                    label={value.label}
                    field={field}
                    errors={errors}
                    size={value.size}
                    name={value.name}
                    disabled={value.disabled}
                    value={field.value}
                    type={value.type}
                    variant={value.variant}
                  />
                )}
                control={control}
                rules={value.rules}
              />
            ))}
            <Box mt={2} />
            <Controller
              name="solutions"
              render={({ field }) => (
                <Solutions field={field} disabled errors={errors} />
              )}
              control={control}
              rules={{
                required: "this field is required",
              }}
            />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              my={3}
              mb={5}
              px={10}
            >
              <div className={classes.wrapper}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading && !success}
                >
                  Update Service
                </Button>
                {loading && !success && (
                  <CircularProgress size={30} className={classes.buttonProgress} />
                )}
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}
