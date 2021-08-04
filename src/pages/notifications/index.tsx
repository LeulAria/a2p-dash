import React, { useContext, useEffect, useState } from 'react';
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

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthContext } from '../../contexts/auth/AuthProvider';
import { useFireQuery } from '../../FireQuery';
import InspectionsPointsDisplay from './table';
import useSearch from '../../hooks/useSearch';

dayjs.extend(relativeTime);

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
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const [filterSearchKey, setFilterSearchKey] = useState('');
  const {
    filtered,
    reFilter,
  } = useSearch(notifications, filterSearchKey);

  const {
    data, loading,
  } = useFireQuery(
    `notifications/${user.uid}/notifications`,
    {
      orderBy: ['createdAt desc'],
      snapshotListener: true,
    },
  );

  useEffect(() => {
    if (data) {
      setNotifications(
        data.map((notification: any) => ({
          id: notification.id,
          msg: notification.msg,
          createdAt: dayjs().to(dayjs(notification.createdAt.toDate().toString())),
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
        Notifications
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
                    placeholder="Search notifications ..."
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
