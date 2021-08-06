import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Box, Theme, makeStyles } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import TextComponent from "../../components/shared/TextComponent";
import { AuthContext } from "../../contexts/auth/AuthProvider";
import uuid from "../../utils/uuid";

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  parent: {
    width: "100%",
    borderRadius: "0",
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
}));

export const signUpFields = [
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

export default function UserPassDialog({
  open,
  handleClose,
  userEmailAndPass,
}: any) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    userEmailAndPass(user.email, data.password);
    reset();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ textAlign: "center" }}>
          <Box fontWeight={600}>Enter Confirmation Password</Box>
        </DialogTitle>
        <DialogContent>
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

            <Box my={3} mx={1}>
              <div className={classes.wrapper}>
                <Button
                  disableElevation
                  fullWidth
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
