import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useLocation } from 'react-router';
import OrderInput from './OrderInput';
import { useFireQueryData } from '../../FireQuery';

const useStyles = makeStyles(() => createStyles({
  orderFormContainer: {
    position: 'relative',
  },
}));

const OrderForm = () => {
  const classes = useStyles();
  const location = useLocation<any>();
  const [dataInput, setDataInput] = useState<any>(null);

  const {
    data: user,
    loading,
  } = useFireQueryData('users', location?.state?.data.uid);

  useEffect(() => {
    if (location?.state) {
      setDataInput(location?.state?.data);
    }
  }, [location]);

  return (
    <div className={classes.orderFormContainer}>
      {!loading
        && dataInput
        && (user ? (
          <OrderInput
            view={location?.state?.view}
            dataInput={dataInput}
            user={user}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="250px"
          >
            <CircularProgress size="60px" thickness={3} />
          </Box>
        ))}
    </div>
  );
};

export default OrderForm;
