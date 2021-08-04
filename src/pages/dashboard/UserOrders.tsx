import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Theme,
  Toolbar,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ExtensionIcon from '@material-ui/icons/Extension';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useFireQuery } from '../../FireQuery';
import { AuthContext } from '../../contexts/auth/AuthProvider';

import OrderStatus from '../../components/dashboard/orderStatus';
import ChooseSolution from './chooseSolution';

const useStyles = makeStyles((theme: Theme) => createStyles({
  liElement: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  status: {
    position: 'absolute',
    top: 5,
    right: 15,
  },
  orderCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'space-between',
    height: '230px',
    borderRadius: '15px',
    boxShadow: '0 1px 12px rgba(0,0,0,0.3)',
    background: 'linear-gradient(90deg, #78466B 0%, #5E3FFB 100%)',
  },
  orderCardTitle: {
    whiteSpace: 'nowrap',
    fontWeight: 'bolder',
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#FFF',
  },
  orderCardStatus: {
    color: '#FFF',
    fontWeight: 500,
  },
  orderCardBottomAction: {
    display: 'flex',
    background: '#1115',
    padding: '1rem',
    marginTop: 'auto',
  },
  chip: {
    background: theme.palette.type === 'dark' ? '#1114' : '#1116',
    boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
    color: '#FFF',
    cursor: 'pointer',
    padding: '.8rem .6rem',
    margin: '5px',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '110px',
    transition: '.2s all',
    '&:hover': {
      transform: 'scale(1.052)',
    },
  },
}));

const UserOrders = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const {
    data: datas,
    loading,
  } = useFireQuery('orders', {
    query: [['uid ==', user.uid]],
    snapshotListener: true,
  });

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Box
        style={{
          minHeight: '100%',
          padding: '0',
        }}
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Box display="flex" flexWrap="wrap" width="100%">
              <Box fontSize="1.4rem" fontWeight={800}>
                Current Orders
              </Box>
              <Box ml="auto">
                <Button
                  disableElevation
                  variant="outlined"
                  // color="primary"
                  onClick={() => setOpen(true)}
                >
                  <AddCircleOutlineIcon />
                  {' '}
&nbsp; New Order
                </Button>
                <ChooseSolution open={open} onClose={() => setOpen(false)} />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Divider style={{ marginTop: '1.3rem', marginBottom: '2.3rem' }} />
        <Container>
          <Box style={{ paddingTop: 3 }}>
            <Grid container spacing={8}>
              {!loading && datas ? (
                datas.map((data: any) => (data.solutions === 'Both' ? (
                  <>
                    <Grid item key={Math.random()} lg={4} md={6} xs={12}>
                      <OrderStatus
                        apiName="A2P"
                        data={data}
                        icon={<ExtensionIcon />}
                      />
                    </Grid>
                    <Grid item key={Math.random()} lg={4} md={6} xs={12}>
                      <OrderStatus
                        apiName="SMS Campaign"
                        data={data}
                        icon={<ExtensionIcon />}
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item key={Math.random()} lg={4} md={6} xs={12}>
                    <Box position="relative" maxWidth={350}>
                      <Card elevation={0} className={classes.orderCardContainer}>
                        <Box mt={2} px={3} display="flex" alignItems="center">
                          <Box mr={1}>
                            <Avatar style={{ width: 70, height: 70 }}>
                              <ExtensionIcon />
                            </Avatar>
                          </Box>
                          <Box>
                            <Box className={classes.orderCardTitle}>
                              {data.solutions.toUpperCase()}
                            </Box>
                            <Box className={classes.orderCardStatus}>
                              {data.status.charAt(0).toUpperCase()
                                  + data.status.slice(1)}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexWrap="wrap"
                          className={classes.orderCardBottomAction}
                        >
                          <Box fontWeight={500} className={classes.chip}>
                            <Box fontWeight={600} fontSize=".9rem">
                              Payment
                            </Box>
                            <Box fontWeight={300} fontSize=".8rem">
                              {data.isPayed ? 'Payed' : 'Not Payed'}
                            </Box>
                          </Box>
                          <Box fontWeight={500} className={classes.chip}>
                            <Box fontWeight={600} fontSize=".9rem">
                              Subscription
                            </Box>
                            <Box fontWeight={300} fontSize=".8rem">
                              {data.status === 'subscribed'
                                ? 'subscribed'
                                : 'Not Started'}
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  </Grid>
                )))
              ) : (
                <Grid container spacing={8}>
                  <Grid
                    item
                    key={Math.random()}
                    lg={4}
                    md={6}
                    xs={12}
                    style={{ marginTop: '-1rem' }}
                  >
                    <Box position="relative" maxWidth={350}>
                      <Skeleton height={340} />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    key={Math.random()}
                    lg={4}
                    md={6}
                    xs={12}
                    style={{ marginTop: '-1rem' }}
                  >
                    <Box position="relative" maxWidth={350}>
                      <Skeleton height={340} />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    key={Math.random()}
                    lg={4}
                    md={6}
                    xs={12}
                    style={{ marginTop: '-1rem' }}
                  >
                    <Box position="relative" maxWidth={350}>
                      <Skeleton height={340} />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserOrders;
