import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CreateNewStuff from "./CreateNewStuff";
import useSearch from "../../hooks/useSearch";
import InspectionsPointsDisplay from "./table";
import { useFireQuery } from "../../FireQuery";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    maxWidth: 2024,
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
  statusBtn: {
    marginRight: theme.spacing(1),
    borderRadius: 20,
    padding: "5px 15px",
  },
  contentWrapper: {
    margin: "20px 16px",
  },
  btnActive: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.primary.main,
      color: "#fff",
    },
  },
}));

const InspectionDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState<any[]>([]);
  const [approve, setApprove] = useState(false);
  const [filterSearchKey, setFilterSearchKey] = useState("");
  const { filtered, reFilter } = useSearch(users, filterSearchKey);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: dataSets,
    loading,
    refetch,
  } = useFireQuery("users", {
    query: [
      ["isStuff ==", true],
      ["accountStatus ==", "approved"],
    ],
    snapshotListener: true,
  });

  // const [loading, setLoading] = useState(false);
  // const [dataSets, setdataSets] = useState<any[]>([]);
  // useEffect(() => {
  //   setLoading(true)
  //   firebase.firestore().collection("users").where("id", "!=", user?.id).where("isStuff", "==", true).onSnapshot((snap) => {
  //     setdataSets(snap.docs.map((d) => d.data()))
  //     setLoading(false)
  //   }, (err) => {
  //     setLoading(false)
  //   });
  // }, [])

  useEffect(() => {
    if (dataSets) {
      setUsers(
        dataSets.map((data: any) => ({
          id: data.id,
          block: { data: { ...data }, id: data.id },
          accept: { data: { ...data }, id: data.id },
          userName: data.userName,
          email: data.email,
          UserRole: data.role,
          isEmailVerified: data.isEmailVerified ? "Verified" : "Not Verified",
          password: data.password,
          role: data.role,
          view: { id: data.id, data: { ...data } },
          edit: { id: data.id, data: { ...data } },
          delete: { id: data.id, data: { ...data } },
        })),
      );
    }
  }, [dataSets]);

  const handleSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    reFilter(e.currentTarget.value);
    setFilterSearchKey(e.currentTarget.value);
  };

  return (
    <Box>
      <Box fontWeight={800} fontSize="1.4rem" mb={2}>
        Stuff Employees
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
            <Box ml={2} my={1} display="flex" alignItems="center">
              <Box>
                <SearchIcon className={classes.block} color="inherit" />
              </Box>
              <Box ml={1}>
                <TextField
                  fullWidth
                  placeholder="Search orders from attendees ..."
                  value={filterSearchKey}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                  onChange={handleSearchKey}
                />
              </Box>
            </Box>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                {/* <Grid item xs> */}
                {/* Add new button funtionality */}
                {/* <Button
                  disableElevation
                  onClick={handleClickOpen}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.statusBtn}
                >
                  Add New Stuff
                </Button> */}
                {/* </Grid> */}
                {/* <Grid item xs></Grid> */}
                <Grid item xs>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          ["isStuff ==", true],
                          ["accountStatus ==", "approved"],
                        ],
                        snapshotListener: true,
                      });
                      setApprove(false);
                    }}
                    size="small"
                    variant="contained"
                    className={`${classes.statusBtn} ${
                      !approve && classes.btnActive
                    }`}
                  >
                    <FilterListRoundedIcon />
                    Stuffs
                  </Button>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          ["isStuff ==", true],
                          ["accountStatus ==", "pending"],
                        ],
                        snapshotListener: true,
                      });
                      setApprove(true);
                    }}
                    size="small"
                    variant="contained"
                    className={`${classes.statusBtn} ${
                      approve && classes.btnActive
                    }`}
                  >
                    <FilterListRoundedIcon />
                    Pending Stuffs
                  </Button>
                </Grid>
                <Grid item xs />

                <Grid item>
                  <Button
                    disableElevation
                    onClick={() => history.goBack()}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.statusBtn}
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
        <CreateNewStuff
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </Paper>
    </Box>
  );
};

export default InspectionDetail;
