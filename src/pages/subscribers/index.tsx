import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import InspectionsPointsDisplay from './table';
import { useFireQuery } from '../../FireQuery';
import useSearch from '../../hooks/useSearch';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    maxWidth: 2024,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addInspection: {
    marginRight: theme.spacing(1),
    borderRadius: 10,
  },
  contentWrapper: {
    margin: '20px 16px',
  },
}));

const InspectionDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [orders, setOrders] = useState<any[]>([]);
  const [filterSearchKey, setFilterSearchKey] = useState('');
  const {
    filtered,
    reFilter,
  } = useSearch(orders, filterSearchKey);

  const {
    data, loading,
  } = useFireQuery('orders', {
    query: [
      ['status ==', 'payed'],
      ['hasSalesReviewer ==', true],
      ['hasTechReviewer ==', false],
      ['isPayApproved ==', true],
    ],
    snapshotListener: true,
  });

  useEffect(() => {
    if (data) {
      setOrders(
        data.map((order: any) => ({
          id: order.id,
          attend: { id: order.id, data: { ...order } },
          email: order.email,
          clientName: order.clientName,
          companyName: order.companyName,
          solutions: order.solutions,
          approedByAdmin: order.approedByAdmin,
          view: { id: order.id, data: { ...order } },
          order_detail: { id: order.id, data: { ...order } },
        })),
      );
    }
  }, [data]);

  const handleSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    reFilter(e.currentTarget.value);
    setFilterSearchKey(e.currentTarget.value);
  };

  return (
    <Box>
      <Box fontWeight={800} fontSize="1.4rem" mb={2}>
        Payed Orders
      </Box>
      <Divider />
      <Box my={2} />

      <Paper className={classes.paper}>
        <Box>
          <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <SearchIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search from payed orders ..."
                    value={filterSearchKey}
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                    onChange={handleSearchKey}
                  />
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    onClick={() => history.goBack()}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.addInspection}
                  >
                    Go Back
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton>
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Box className={classes.contentWrapper}>
            <InspectionsPointsDisplay rows={filtered} loading={loading} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InspectionDetail;
