import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
} from '@material-ui/core';
import { useFireQuery } from '../../FireQuery';
import PiChartGraph from '../../components/dashboard/PiChartGraph';
import LineChratOrders from '../../components/dashboard/LineChartOrders';
import OrdersStat from '../../components/dashboard/OrdersStat';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  dashboardTopCard: {
    borderRadius: 20,
    boxShadow: '0 1px 10px rgba(0,0,0,0.063)',
  },
  dashboardTopCardData: {
    fontSize: '2rem',
    fontWeight: 900,
  },
  dashboardTopCardTitle: {
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.type === 'dark' ? '#777' : '#AAA',
  },
  dashboardGraphCards: {
    borderRadius: 20,
    boxShadow: '0 1px 10px rgba(0,0,0,0.063)',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  // const { data: payedCount } = useFireQuery('orders', {
  //   query: [['status ==', 'payed']],
  // });
  const { data: subscriptions, loading: loadingSubscriptions } = useFireQuery(
    'orders',
    {
      query: [['status ==', 'subscribed']],
    },
  );
  // const { data: pendingCount } = useFireQuery('orders', {
  //   query: [['status ==', 'pending']],
  // });
  const { data: totalOrders, loading: totalOrderLoading } = useFireQuery('orders', {
    snapshotListener: false,
  });
  const { data: totalUsers, loading: totalUsersLoading } = useFireQuery('users', {
    query: [['roles.isClient ==', true]],
    snapshotListener: false,
  });
  const { data: totalEmployees, loading: totalEmployeesLoading } = useFireQuery(
    'users',
    {
      query: [['isStuff ==', true]],
      snapshotListener: false,
    },
  );

  return (
    <Box>
      <Box fontWeight={800} fontSize="1.4rem" mb={2}>
        Dashboard
      </Box>
      <Divider />
      <Box my={2} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={0} className={classes.dashboardTopCard}>
            <Box display="flex" alignItems="center">
              <Box p={3}>
                {totalOrderLoading ? (
                  <CircularProgress size={35} />
                ) : (
                  <Box className={classes.dashboardTopCardData}>
                    {totalOrders && totalOrders.length}
                  </Box>
                )}
                <Box className={classes.dashboardTopCardTitle}>Total Orders</Box>
              </Box>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                </svg>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={0} className={classes.dashboardTopCard}>
            <Box display="flex" alignItems="center">
              <Box p={3}>
                {totalUsersLoading ? (
                  <CircularProgress size={35} />
                ) : (
                  <Box className={classes.dashboardTopCardData}>
                    {totalUsers && totalUsers.length}
                  </Box>
                )}
                <Box className={classes.dashboardTopCardTitle}>Users</Box>
              </Box>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={0} className={classes.dashboardTopCard}>
            <Box display="flex" alignItems="center">
              <Box p={3}>
                {totalEmployeesLoading ? (
                  <CircularProgress size={35} />
                ) : (
                  <Box className={classes.dashboardTopCardData}>
                    {totalEmployees && totalEmployees.length}
                  </Box>
                )}
                <Box className={classes.dashboardTopCardTitle}>Employees</Box>
              </Box>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={0} className={classes.dashboardTopCard}>
            <Box display="flex" alignItems="center">
              <Box p={3}>
                {loadingSubscriptions ? (
                  <CircularProgress size={35} />
                ) : (
                  <Box className={classes.dashboardTopCardData}>
                    {subscriptions && subscriptions.length}
                  </Box>
                )}
                <Box className={classes.dashboardTopCardTitle}>Users</Box>
              </Box>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Box my={2} />
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} lg={7}>
          <Card elevation={0} className={classes.dashboardGraphCards}>
            <Box minHeight="470px" minWidth={300}>
              <Box height={300}>
                <LineChratOrders />
              </Box>
              <Box p={3}>
                <Box fontWeight={700}>Weekly Orders Stat</Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card elevation={0} className={classes.dashboardGraphCards}>
            <Box minHeight="470px" minWidth={300} p={1}>
              <Box fontWeight={700}>Overall Orders Status.</Box>
              <Box height={400}>
                <PiChartGraph />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box my={4}>
        <Card elevation={0} className={classes.dashboardGraphCards}>
          <Box p={3} style={{ background: '#347', color: '#FFF' }}>
            <Box fontWeight={700}>Monthly Orders Status.</Box>
          </Box>

          <Box height={500} p={2}>
            <OrdersStat />
          </Box>
        </Card>
      </Box>
      {/* <DashboardWeekly
          payedCount={payedCount?.length}
          subscriberCount={subscriberCount?.length}
          pendingCount={pendingCount?.length}
        /> */}
    </Box>
  );
}
