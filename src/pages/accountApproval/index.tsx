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
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import InspectionsPointsDisplay from "./table";
import { useFireQuery } from "../../FireQuery";
import useSearch from "../../hooks/useSearch";

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    maxWidth: 2024,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.02)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addInspection: {
    marginRight: theme.spacing(1),
    borderRadius: 10,
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
  const [approve] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [filterSearchKey, setFilterSearchKey] = useState("");
  const { filtered, reFilter } = useSearch(users, filterSearchKey);

  const { data: dataSets, loading } = useFireQuery("users", {
    query: [["roles.isClient ==", true]],
    snapshotListener: true,
  });

  useEffect(() => {
    if (dataSets) {
      setUsers(
        dataSets.map((data: any) => ({
          id: data.id,
          block: { data: { ...data }, id: data.id },
          accept: { data: { ...data }, id: data.id },
          companyName: data.userName || data.clientName || data.companyName,
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
        Customer Users
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
                    placeholder="Search orders ..."
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
            <InspectionsPointsDisplay
              rows={filtered}
              loading={loading}
              approve={approve}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InspectionDetail;
