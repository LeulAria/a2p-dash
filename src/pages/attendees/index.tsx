import React, {useContext, useEffect, useState} from "react";
import {
  AppBar,
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import {useHistory} from "react-router-dom";
import InspectionsPointsDisplay from "./table";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useFireQuery} from "../../FireQuery";
import {AuthContext} from "../../contexts/auth/AuthProvider";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SearchIcon from "@material-ui/icons/Search";
import useSearch from "../../hooks/useSearch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const InspectionDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [approve, setApprove] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const {user} = useContext(AuthContext);
  const [filterSearchKey, setFilterSearchKey] = useState("");
  const {
    filtered,
    loading: loadingFilter,
    reFilter,
  } = useSearch(orders, filterSearchKey);

  const {data, loading, error, refetch} = useFireQuery("orders", {
    query: [
      ["status in", ["attended payment", "payment approval"]],
      ["currentSalesReviewer ==", user.uid],
      ["hasSalesReviewer ==", true],
      ["isPayApproved ==", false],
    ],
    snapshotListener: true,
  });

  useEffect(() => {
    if (data) {
      setOrders(
        data.map((order: any) => ({
          id: order.id,
          paid: {id: order.id, data: {...order}},
          // restore: { id: order.id, data: { ...order } },
          order_form: {id: order.id, data: {...order}},
          companyName: order.companyName,
          solutions: order.solutions,
          view: {id: order.id, data: {...order}},
        }))
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
        Attendees
      </Box>
      <Divider />
      <Box my={2}></Box>

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
                <Grid item xs>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          ["isPayApproved ==", true],
                          ["hasSalesReviewer ==", true],
                          ["payApproval ==", "done"],
                        ],
                      });
                      setApprove(false);
                    }}
                    variant="outlined"
                    size="small"
                    className={clsx(classes.addInspection, {
                      [classes.btnActive]: !approve,
                    })}
                  >
                    <FilterListRoundedIcon />
                    Paid
                  </Button>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          ["status in", ["attended payment", "payment approval"]],
                          ["currentSalesReviewer ==", user.uid],
                          ["hasSalesReviewer ==", true],
                          ["isPayApproved ==", false],
                        ],
                      });
                      setApprove(true);
                    }}
                    variant="outlined"
                    size="small"
                    className={`${classes.addInspection} ${
                      approve && classes.btnActive
                    }`}
                  >
                    <FilterListRoundedIcon />
                    Pending Payment
                  </Button>
                </Grid>
                <Grid item xs></Grid>
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
