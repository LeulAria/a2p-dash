import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Box, Divider, LinearProgress } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import { useSnackbar } from 'notistack';
import { useFireMutation, useFireQuery } from '../../FireQuery';
import { AuthContext } from '../../contexts/auth/AuthProvider';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function ChooseSolution(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open } = props;
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading } = useFireQuery('orders', {
    query: [['uid ==', user.uid]],
    snapshotListener: true,
  });

  const {
    loading: loadingOrder,
    mutate: mutateOrder,
  } = useFireMutation('orders');

  useEffect(() => {
    if (data) {
      setUserOrders(data);
    }
  }, [data]);

  const orders = ['A2P API', 'SMS Campaign'];

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (order: string, orderExisted: boolean) => {
    if (!orderExisted) {
      mutateOrder(
        'ADD',
        null,
        {
          ...user,
          status: 'pending',
          isPayed: false,
          reviewd: false,
          isStuff: false,
          isDetailFilled: false,
          hasSalesReviewer: false,
          hasTechReviewer: false,
          isPayApproved: false,
          approedByAdmin: false,
          billingStarted: false,
          uid: user?.uid,
          currentTechReviewer: null,
          currentSalesReviewer: null,
          currentTechReviewerRef: null,
          currentSalesReviewerRef: null,
          solutions: order,
        },
        {
          createdAt: true,
          updatedAt: true,
        },
      )
        .then(() => {
          enqueueSnackbar(`${order} Order created successfully!`, {
            variant: 'success',
          });
        })
        .catch((err: any) => {
          enqueueSnackbar(err?.code || 'Error occurred please try again.', {
            variant: 'error',
          });
        });
    } else {
      enqueueSnackbar('Order already existed!', {
        variant: 'error',
      });
    }
    onClose();
  };

  const checkIfOrderExits = (order: string) => userOrders.filter((ord: any) => ord.solutions === order).length > 0;

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Box my={2} mx={12} textAlign="center" fontWeight={700}>
        CREATE NEW ORDER
      </Box>
      <Divider />
      {(loadingOrder || loading) && <LinearProgress color="secondary" />}
      <List>
        {orders.map((order: any) => (
          <ListItem
            disabled={checkIfOrderExits(order) || loading || loadingOrder}
            button
            onClick={() => handleListItemClick(order, checkIfOrderExits(order))}
            key={order}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <ExtensionIcon />
              </Avatar>
            </ListItemAvatar>
            <Box fontWeight={600}>{order}</Box>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default ChooseSolution;
