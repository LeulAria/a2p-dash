import React, { useContext } from 'react';
import {
  Avatar, Box, Card, Chip, Theme, makeStyles,
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ExtensionIcon from '@material-ui/icons/Extension';
import { useFireQueryData } from '../../../FireQuery';
import { AuthContext } from '../../../contexts/auth/AuthProvider';
import OrderDetailForm from './OrderDetailForm';

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  parent: {
    width: '80%',
    padding: '0 5%',
    margin: 'auto',
    borderRadius: 10,
  },
  regBtn: {
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    color: 'white',
    fontSize: '14px',
    textTransform: 'none',
    letterSpacing: '1px',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonProgress: {
    color: 'yellow',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  checkBoxContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '7rem',
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
    marginLeft: '-0.2rem',
  },
  orderLogo: {
    background: theme.palette.primary.main,
    color: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  chipStyle: {
    margin: '10px',
  },
  chipStyleStatus: {
    padding: '1rem',
    fontWeight: 'bolder',
  },
}));

export const orderForm = [
  {
    name: 'clientName',
    label: 'Client Name',
    variant: 'outlined',
    size: 'small',
    type: 'text',
    rules: {
      required: 'this field is required',
    },
  },
  {
    name: 'companyName',
    label: 'Company Name',
    variant: 'outlined',
    size: 'small',
    type: 'text',
    rules: {
      required: 'this field is required',
    },
  },
  {
    name: 'companyUrl',
    label: 'Company Url',
    variant: 'outlined',
    size: 'small',
    type: 'text',
    rules: {
      required: 'this field is required',
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    variant: 'outlined',
    size: 'small',
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
    name: 'phoneNumber',
    label: 'Tel',
    variant: 'outlined',
    size: 'small',
    type: 'tel',
    rules: {
      required: 'this field is required',
      pattern: {
        value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
        message: 'invalid format',
      },
    },
  },
];

export default function OrderDetail() {
  const classes = useStyles();
  // const {
  //   error: errorOrder,
  //   loading,
  //   success,
  //   mutate: mutateOrder,
  // } = useFireMutation("orders");
  const { user } = useContext(AuthContext);
  const {
    data,
    // loading: loadingOrder,
    // error: orderError
  } = useFireQueryData('orders', user.uid);

  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  //   reset,
  // } = useForm({
  //   defaultValues: {
  //     clientName: data?.clientName,
  //     companyName: data?.companyName,
  //     companyUrl: data?.companyUrl,
  //     email: data?.email,
  //     phoneNumber: data?.phoneNumber,
  //     solutions: data?.solutions,
  //   },
  // });

  return (
    <div>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        width="100%"
        height="100%"
        mt={4}
        className={classes.parentBox}
      >
        <Card className={classes.parent} variant="outlined">
          <Box display="flex" flexDirection="column" justifyContent="center" p={5}>
            <Card className={classes.orderLogo} variant="outlined">
              <Box m={3} display="flex" flexDirection="column" alignItems="center">
                <Avatar style={{ width: '100px', height: '100px' }}>
                  <ExtensionIcon style={{ fontSize: '3rem' }} />
                </Avatar>
                <Box mt={2} fontWeight={700} fontSize="1.4rem">
                  {data?.solutions}
                </Box>
                <Box>
                  <Chip
                    color="primary"
                    size="medium"
                    className={classes.chipStyleStatus}
                    avatar={(
                      <Avatar>
                        <AutorenewIcon />
                      </Avatar>
                    )}
                    label={data?.status}
                  />
                </Box>
              </Box>
            </Card>
            <Box
              mb={2}
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              flexDirection={{ sm: 'flex', xs: 'flex' }}
            >
              <Chip
                className={classes.chipStyle}
                avatar={<Avatar>M</Avatar>}
                label={`Created: ${data?.createdAt.toDate().toDateString()}`}
              />
              <Chip
                avatar={<Avatar>M</Avatar>}
                label={`Updated: ${data?.updatedAt.toDate().toDateString()}`}
              />
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box fontWeight={800} mx={1}>
                {data?.billingStarted ? 'Billing Not Started' : 'Billing Started'}
                <br />
              </Box>
              <Box fontWeight={800} mx={1}>
                {data?.currentSalesReviewer
                  ? 'Sales Reviewer Name'
                  : 'No Sales Reviewer'}
                <br />
              </Box>
              <Box fontWeight={800} mx={1}>
                {data?.currentTechReviewer
                  ? 'Tech Reviewer Name'
                  : 'No Tech Reviewer'}
                <br />
              </Box>
              <Box fontWeight={800} mx={1}>
                {data?.isPayApproved ? 'Payed' : 'Not Payed'}
                <br />
                {/* {data?.currentSalesReviewerRef}<br />
                {data?.currentTechReviewerRef}<br /> */}
              </Box>
            </Box>
            {data && <OrderDetailForm data={data} />}
          </Box>
        </Card>
      </Box>
    </div>
  );
}
