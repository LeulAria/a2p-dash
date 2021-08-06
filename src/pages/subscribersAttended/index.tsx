import React, { useContext, useEffect, useState } from "react";
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
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SearchIcon from "@material-ui/icons/Search";
import InspectionsPointsDisplay from "./table";
import { useFireQuery } from "../../FireQuery";
import { AuthContext } from "../../contexts/auth/AuthProvider";
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
  const [approve, setApprove] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const [filterSearchKey, setFilterSearchKey] = useState("");
  const { filtered, reFilter } = useSearch(orders, filterSearchKey);

  const { data, loading, refetch } = useFireQuery("orders", {
    query: [
      ["status in", ["pending subscription", "pending subscription approval"]],
      ["hasSalesReviewer ==", true],
      ["hasTechReviewer ==", true],
      ["currentTechReviewer ==", user.uid],
      ["isPayApproved ==", true],
    ],
    snapshotListener: true,
  });

  useEffect(() => {
    if (data) {
      setOrders(
        data.map((order: any) => ({
          id: order.id,
          start_billing: { id: order.id, data: { ...order } },
          // restore: { id: order.id, data: { ...order } },
          email: order.email,
          clientName: order.clientName,
          companyName: order.companyName,
          solutions: order.solutions,
          reviewd: order.reviewd,
          isPayed: order.isPayed,
          billingStarted: order.billingStarted,
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
        Attended Payed Orders
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
                <Grid item xs>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          ["isPayApproved ==", true],
                          ["payApproval ==", "done"],
                          ["currentTechReviewer ==", user.uid],
                        ],
                      });
                      setApprove(false);
                    }}
                    variant="outlined"
                    size="small"
                    className={`${classes.addInspection} ${
                      !approve && classes.btnActive
                    }`}
                  >
                    <FilterListRoundedIcon />
                    Subscribed
                  </Button>
                  <Button
                    disableElevation
                    onClick={() => {
                      refetch({
                        query: [
                          [
                            "status in",
                            [
                              "pending subscription",
                              "pending subscription approval",
                            ],
                          ],
                          ["hasSalesReviewer ==", true],
                          ["hasTechReviewer ==", true],
                          ["currentTechReviewer ==", user.uid],
                          ["isPayApproved ==", true],
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
                    Pending Subscription
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
              // approve={approve}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InspectionDetail;
