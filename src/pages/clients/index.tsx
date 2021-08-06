import React from "react";
import "firebase/firestore";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Box, Divider } from "@material-ui/core";
import UsersTable from "../users/UsersTable";

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    maxWidth: 2024,
    flex: 1,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
}));

function Clients() {
  const classes = useStyles();

  return (
    <Box flexDirection="column">
      <Box my={1} width="90%" margin="auto">
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Clients
        </Typography>
      </Box>
      <Divider />
      <Box my={4} />
      <Paper className={classes.paper}>
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
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                {/* <Button variant="contained" color="primary" className={classes.addUser}>
                  All customers
              </Button> */}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <UsersTable status rows={[]} />
        </div>
      </Paper>
    </Box>
  );
}

export default Clients;
