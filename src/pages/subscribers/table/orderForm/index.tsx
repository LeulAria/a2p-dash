import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Box, Card, CircularProgress, Container, Grid,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import TextComponent from '../../../../components/shared/TextComponent';
import SelectComponent from '../../../../components/shared/SelectComponent';
import RadioGroupComponent from '../../../../components/shared/RadioGroupComponent';
import { useFireMutation } from '../../../../FireQuery';
// import MiniChat from "./MiniChat";
import { useSnackBar } from '../../../../contexts/snackbar/SnackBarContext';
import uuid from '../../../../utils/uuid';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formInput: {
    fontWeight: 600,
  },
  userInfoSideBar: {
    position: 'sticky',
    minHeight: 'calc(100vh - 300px)',
    top: '10vh',
    left: '3rem',
  },
  positionAbsolute: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: '100%',
  },
  hide: {
    left: '-200vw',
    transition: 'all .4s ease-in-out',
  },
  show: {
    left: 0,
    transition: 'all .4s ease-in-out',
  },
  legend: {
    color: theme.palette.type === 'dark' ? '#999' : '#667',
  },
  legendPrimary: {
    color: theme.palette.type === 'dark' ? '#bbb' : '#545454',
  },
}));

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function OrderForm({
  open,
  handleCloseOrderFormDialog,
  orderDialogData,
}: {
  open: boolean;
  handleCloseOrderFormDialog: () => void;
  orderDialogData: any;
}) {
  const classes = useStyles();
  const [openChat] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      adress_1: '',
      adress_2: '',
      billingCycle: 'Monthly',
      city: '',
      company_name: '',
      conditionType: 'IPSec',
      country: '',
      creditLimit: '',
      currency: 'ETB',
      dueDate: '15 days',
      emailBusinessManager: '',
      emailCommercial: '',
      emailFinanceBilling: '',
      emailReportPortal: '',
      emailTechnical: '',
      fullNameBusinessManager: '',
      fullNameCommercial: '',
      fullNameFinanceBilling: '',
      fullNameReportPortal: '',
      fullNameTechnical: '',
      isBusnessManager: 'yes',
      isReportPortal: 'yes',
      passwordBusinessManager: '',
      passwordReportPortal: '',
      phoneNumberBusinessManager: '',
      phoneNumberCommercial: '',
      phoneNumberFinanceBilling: '',
      phoneNumberReportPortal: '',
      phoneNumberTechnical: '',
      protocol: 'SOAP',
      senderIDAlphanumeric1: '',
      senderIDAlphanumeric2: '',
      senderIDAlphanumeric3: '',
      senderIDAlphanumeric4: '',
      senderIDAlphanumeric5: '',
      senderIDNumeric1: '',
      senderIDNumeric2: '',
      senderIDNumeric3: '',
      senderIDNumeric4: '',
      senderIDNumeric5: '',
      signalling: 'SMPP',
      state: '',
      terms: 'Prepaid',
      tinNumber: '',
      userNameBusinessManager: '',
      userNameReportPortal: '',
      vatNumber: '',
      ...orderDialogData?.user?.userInfo,
    },
  });

  // Radio button terms watcher to set credit limit value ""
  const watchTerms = watch('terms', 'Prepaid');
  useEffect(() => {
    if (watchTerms === 'Prepaid') {
      setValue('creditLimit', '', { shouldValidate: false });
    }
  }, [watchTerms]);

  const signUpFields = [
    {
      input: 'legend primary',
      name: 'Order',
    },
    {
      input: 'legend',
      name: 'Account Address',
    },
    {
      input: 'text',
      name: 'company_name',
      label: 'Company Name',
      variant: 'outlined',
      type: 'text',
      autofocus: true,
      rules: {
        required: 'this field is required',
        minLength: {
          value: '3',
          message: 'company name should not be lessthan 3 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'adress_1',
      label: 'Adress 1',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '2',
          message: 'adress name should not be lessthan 2 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'adress_2',
      label: 'Address 2',
      variant: 'outlined',
      type: 'text',
      rules: {
        minLength: {
          value: '2',
          message: 'adress name should not be lessthan 2 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'city',
      label: 'City',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '2',
          message: 'city should not be lessthan 2 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'state',
      label: 'State',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '2',
          message: 'State should not be lessthan 2 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'country',
      label: 'Country',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '2',
          message: 'Country name should not be lessthan 2 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'city',
      label: 'Post Code',
      variant: 'outlined',
      type: 'number',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'post code should not be lessthan 4 characters',
        },
      },
    },

    {
      input: 'legend',
      name: 'Billing',
    },
    {
      input: 'select',
      name: 'billingCycle',
      label: 'Billing Cycle',
      variant: 'outlined',
      menus: [
        {
          name: 'Monthly',
          value: 'Monthly',
        },
        {
          name: 'Yearly',
          value: 'Yearly',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'select',
      name: 'currency',
      label: 'Currency',
      variant: 'outlined',
      menus: [
        {
          name: 'Ehtiopian Birr',
          value: 'ETB',
        },
        {
          name: 'United States Dollar',
          value: 'USD',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'text',
      name: 'vatNumber',
      label: 'Vat Number',
      variant: 'outlined',
      type: 'number',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'vat number should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'tinNumber',
      label: 'TIN Number',
      variant: 'outlined',
      type: 'number',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'tin number should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'radio',
      name: 'dueDate',
      label: 'Due Date',
      variant: 'outlined',
      menus: [
        {
          label: '15 days',
          value: '15 days',
        },
        {
          label: '30 days',
          value: '30 days',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'radio',
      name: 'terms',
      label: 'Terms',
      variant: 'outlined',
      menus: [
        {
          label: 'Postpaid',
          value: 'Postpaid',
        },
        {
          label: 'Prepaid',
          value: 'Prepaid',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'text',
      name: 'creditLimit',
      label: 'Credit Limit',
      variant: 'outlined',
      type: 'number',
      disabled: watchTerms === 'Prepaid',
    },

    {
      input: 'legend primary',
      name: 'Account Contact',
    },
    {
      input: 'legend',
      name: 'Commercial',
    },
    {
      input: 'text',
      name: 'fullNameCommercial',
      label: 'Full Name',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'Full name should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'emailCommercial',
      label: 'Email Address',
      variant: 'outlined',
      type: 'email',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      input: 'text',
      name: 'phoneNumberCommercial',
      label: 'Phone Number',
      variant: 'outlined',
      type: 'tel',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: 'invalid format',
        },
      },
    },

    {
      input: 'legend',
      name: 'Finance Billing',
    },
    {
      input: 'text',
      name: 'fullNameFinanceBilling',
      label: 'Full Name',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'FullName name should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'emailFinanceBilling',
      label: 'Email Address',
      variant: 'outlined',
      type: 'email',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      input: 'text',
      name: 'phoneNumberFinanceBilling',
      label: 'Phone Number',
      variant: 'outlined',
      type: 'tel',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: 'invalid format',
        },
      },
    },

    {
      input: 'legend',
      name: 'Technical',
    },
    {
      input: 'text',
      name: 'fullNameTechnical',
      label: 'Full Name',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'FullName name should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'emailTechnical',
      label: 'Email Address',
      variant: 'outlined',
      type: 'email',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      input: 'text',
      name: 'phoneNumberTechnical',
      label: 'Phone Number',
      variant: 'outlined',
      type: 'tel',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: 'invalid format',
        },
      },
    },

    {
      input: 'legend',
      name: 'Connection',
    },
    {
      input: 'radio',
      name: 'conditionType',
      label: 'Connection Type',
      variant: 'outlined',
      menus: [
        {
          label: 'Public IP',
          value: 'Public IP',
        },
        {
          label: 'IPSec',
          value: 'IPSec',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'radio',
      name: 'signalling',
      label: 'Signalling',
      variant: 'outlined',
      menus: [
        {
          label: 'SMPP',
          value: 'SMPP',
        },
        {
          label: 'HTTP',
          value: 'HTTP',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'radio',
      name: 'protocol',
      label: 'Protocol',
      variant: 'outlined',
      menus: [
        {
          label: 'SOAP',
          value: 'SOAP',
        },
        {
          label: 'REST',
          value: 'REST',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'text',
      name: 'senderIDAlphanumeric1',
      label: 'Sender ID Alphanumeric',
      size: 'small',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDAlphanumeric2',
      label: 'Sender ID Alphanumeric',
      size: 'small',
      variant: 'outlined',
      type: 'text',
      rules: {
        minLength: {
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDAlphanumeric3',
      label: 'Sender ID Alphanumeric',
      size: 'small',
      variant: 'outlined',
      type: 'text',
      rules: {
        minLength: {
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDAlphanumeric4',
      label: 'Sender ID Alphanumeric',
      size: 'small',
      variant: 'outlined',
      type: 'text',
      rules: {
        minLength: {
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDAlphanumeric5',
      label: 'Sender ID Alphanumeric',
      size: 'small',
      variant: 'outlined',
      type: 'text',
      rules: {
        minLength: {
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDNumeric1',
      label: 'Sender ID Numeric',
      size: 'small',
      variant: 'outlined',
      type: 'number',
      rules: {
        required: 'this field is required.',
        minLength: {
          required: 'this field is required',
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDNumeric2',
      label: 'Sender ID Numeric',
      size: 'small',
      variant: 'outlined',
      type: 'number',
      rules: {
        minLength: {
          required: 'this field is required',
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDNumeric3',
      label: 'Sender ID Numeric',
      size: 'small',
      variant: 'outlined',
      type: 'number',
      rules: {
        minLength: {
          required: 'this field is required',
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDNumeric4',
      label: 'Sender ID Numeric',
      size: 'small',
      variant: 'outlined',
      type: 'number',
      rules: {
        minLength: {
          required: 'this field is required',
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'senderIDNumeric5',
      label: 'Sender ID Numeric',
      size: 'small',
      variant: 'outlined',
      type: 'number',
      rules: {
        minLength: {
          required: 'this field is required',
          value: '4',
          message: 'Senders Id should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'legend primary',
      name: 'Report Portal',
    },
    {
      input: 'radio',
      name: 'isBusnessManager',
      label: 'Report Portal',
      variant: 'outlined',
      menus: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'legend',
      name: 'User 1',
    },
    {
      input: 'text',
      name: 'fullNameReportPortal',
      label: 'Full Name',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'FullName name should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'emailReportPortal',
      label: 'Email Address',
      variant: 'outlined',
      type: 'email',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      input: 'text',
      name: 'phoneNumberReportPortal',
      label: 'Phone Number',
      variant: 'outlined',
      type: 'tel',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: 'invalid format',
        },
      },
    },
    {
      input: 'text',
      name: 'userNameReportPortal',
      label: 'Username',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'username should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'passwordReportPortal',
      label: 'Password',
      variant: 'outlined',
      type: 'password',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '6',
          message: 'Password sould not be lessthan 6 characters',
        },
      },
    },
    {
      input: 'legend primary',
      name: 'Business Manager',
    },
    {
      input: 'radio',
      name: 'isBusnessManager',
      label: 'Busness Manager',
      variant: 'outlined',
      menus: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      rules: {
        required: 'this field is required',
      },
    },
    {
      input: 'legend',
      name: 'User 1',
    },
    {
      input: 'text',
      name: 'fullNameBusinessManager',
      label: 'Full Name',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'FullName name should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'emailBusinessManager',
      label: 'Email Address',
      variant: 'outlined',
      type: 'email',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'invalid email address',
        },
      },
    },
    {
      input: 'text',
      name: 'phoneNumberBusinessManager',
      label: 'Phone Number',
      variant: 'outlined',
      type: 'tel',
      rules: {
        required: 'this field is required',
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: 'invalid format',
        },
      },
    },
    {
      input: 'text',
      name: 'userNameBusinessManager',
      label: 'Username',
      variant: 'outlined',
      type: 'text',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '4',
          message: 'username should not be lessthan 4 characters',
        },
      },
    },
    {
      input: 'text',
      name: 'passwordBusinessManager',
      label: 'Password',
      variant: 'outlined',
      type: 'password',
      rules: {
        required: 'this field is required',
        minLength: {
          value: '6',
          message: 'Password sould not be lessthan 6 characters',
        },
      },
    },
  ];

  const { setSnackbar } = useSnackBar();

  const {
    loading: loadingUser,
    mutate: mutateUser,
  } = useFireMutation('users');

  const {
    loading: loadingOrder,
    mutate: mutateOrder,
  } = useFireMutation('orders');

  // const handleCloseChat = () => {
  //   setOpenChat(false);
  // };

  const onSubmit = (data: any) => {
    mutateUser('UPDATE', orderDialogData?.data.uid, {
      userInfo: {
        ...data,
      },
      isDetailFilled: true,
    })
      .then(() => {
        console.log('ORDER ID: ', orderDialogData?.data?.id);
        mutateOrder('UPDATE', orderDialogData?.data?.id, {
          isDetailFilled: true,
        })
          .then(() => {
            handleCloseOrderFormDialog();
            setSnackbar({
              open: true,
              message: 'Order detail updated successfully!',
              type: 'success',
            });
          })
          .catch((err) => {
            console.log('ERROR HERE: ', err);
            if (err) {
              if (typeof err !== 'string') {
                setSnackbar({
                  open: true,
                  message: err.code,
                  type: 'error',
                });
              } else {
                setSnackbar({
                  open: true,
                  message: err,
                  type: 'error',
                });
              }
            }
          });
      })
      .catch((err) => {
        if (err) {
          if (typeof err !== 'string') {
            setSnackbar({
              open: true,
              message: err.code,
              type: 'error',
            });
          } else {
            setSnackbar({
              open: true,
              message: err,
              type: 'error',
            });
          }
        }
      });
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseOrderFormDialog}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseOrderFormDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Order Form
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={5} />
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Box className={classes.userInfoSideBar}>
              <Box ml={1} mb={1} fontWeight={900} fontSize="1.3rem">
                Customer Order
              </Box>
              <Card
                variant="outlined"
                className={`${classes.positionAbsolute} ${
                  openChat ? classes.hide : classes.show
                }`}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Service Type"
                      secondary={orderDialogData?.solutions}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Order Status"
                      secondary={orderDialogData?.status}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {orderDialogData && orderDialogData?.user ? (
                      <>
                        <ListItemText
                          primary={orderDialogData.user.clientName}
                          secondary={orderDialogData.user.email}
                        />
                        <ListItemText
                          primary="Company"
                          secondary={orderDialogData.user.companyName}
                        />
                        {/* Chat on side bar loads here */}
                        {/* <Button disableElevation variant="contained" color="primary" onClick={() => setOpenChat(true)}> <ChatIcon /> &nbsp;&nbsp;Chat</Button> */}
                      </>
                    ) : (
                      <Box
                        p={3}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </ListItem>
                </List>
              </Card>
              {/* {customer && (
                <Box
                  className={`${classes.positionAbsolute} ${openChat ? classes.show : classes.hide
                    }`}
                >
                  <MiniChat
                    clientName={customer.clientName}
                    customerEmail={customer.email}
                    closeChat={handleCloseChat}
                  />
                </Box>
              )} */}
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box ml={1} mb={1} fontWeight={900} fontSize="1.3rem">
              Order Form
            </Box>
            <Card variant="outlined">
              <Box p={5} py={0}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  {signUpFields.map((value: any) => {
                    switch (value.input) {
                      case 'legend primary':
                        return (
                          <Box
                            mt={5}
                            key={uuid()}
                          >
                            <Box
                              mb={1}
                              ml={-2}
                              fontWeight={900}
                              fontSize="1.36rem"
                              className={classes.legendPrimary}
                            >
                              {value.name}
                            </Box>
                          </Box>
                        );
                      case 'legend':
                        return (
                          <Box
                            key={uuid()}
                            mt={5}
                            mb={1}
                            ml={2}
                            fontWeight={500}
                            fontSize="1rem"
                            className={classes.legend}
                          >
                            {value.name}
                          </Box>
                        );
                      case 'radio':
                        return (
                          <Controller
                            key={uuid()}
                            name={value.name}
                            render={({ field }) => (
                              <RadioGroupComponent
                                field={field}
                                errors={errors}
                                label={value.label}
                                menus={value.menus}
                              />
                            )}
                            control={control}
                            rules={value.rules}
                          />
                        );
                      case 'select':
                        return (
                          <Box
                            key={uuid()}
                          >
                            <Box mt={2} />
                            <Controller
                              name={value.name}
                              render={({ field }) => (
                                <SelectComponent
                                  field={field}
                                  errors={errors}
                                  name={value.label}
                                  menus={value.menus}
                                />
                              )}
                              control={control}
                              rules={value.rules}
                            />
                          </Box>
                        );
                      case 'text':
                        return (
                          <Controller
                            key={uuid()}
                            name={value.name}
                            render={({ field }) => (
                              <TextComponent
                                label={value?.label}
                                field={field}
                                errors={errors}
                                name={value?.name}
                                autofocus={value?.autofocus}
                                size={value?.size}
                                type={value?.type}
                                value={field?.value}
                                variant={value?.variant}
                                disabled={value?.disabled}
                                hidden={value?.hidden}
                              />
                            )}
                            control={control}
                            rules={value.rules}
                          />
                        );
                      default:
                        return <></>;
                    }
                  })}

                  <Box my={3} mx={1}>
                    <div className={classes.wrapper}>
                      <Button
                        type="submit"
                        disableElevation
                        disabled={loadingUser}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => {
                          if (isValid) {
                            setSnackbar({
                              open: true,
                              message:
                                'Please fill the specified errors in the form.',
                              type: 'error',
                            });
                          }
                        }}
                      >
                        Submit
                      </Button>
                      {loadingOrder && (
                        <CircularProgress
                          size={30}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </Box>
                </form>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box mb={20} />
    </Dialog>
  );
}
