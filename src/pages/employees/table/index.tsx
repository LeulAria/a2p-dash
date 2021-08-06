import React, { useContext, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import ShowDialog from "./show";
import EditDialog from "./edit";
import NoData from "../../util/NoData";
import firebase from "../../../firebase";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import CustomLoadingOverlay from "../../util/CustomLoadingOverlay";

interface IProps {
  loading: boolean;
  rows: any;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    borderRadius: 3,
    "& .MuiDataGrid-toolbarContainer": {
      display: "flex",
      justifyContent: "flex-end",
      borderBottom:
          theme.palette.type === "dark" ? "1px solid #555" : "1px solid #ddd",
    },
    "& .MuiDataGrid-toolbar": {
      display: "flex",
      padding: "0 1rem",
    },
    "& .MuiButton-label": {
      margin: "0 10px",
      color: theme.palette.type === "dark" ? "#999" : "#666",
    },
    "& .MuiButton-root": {
      borderRadius: 0,
      borderLeft:
          theme.palette.type === "dark" ? "1px solid #555" : "1px solid #ddd",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
    "& .MuiDataGridPanelFooter-root": {
      borderRadius: 0,
    },
  },
}));

const DataGridDisplay: React.FC<IProps> = ({ loading, rows }: any) => {
  const classes = useStyles();
  const [viewDialog, setViewDialog] = useState(false);
  const [viewDialogData, setViewDialogData] = useState<any>({});
  const [editDialog, setEditDialog] = useState(false);
  const [editDialogData] = useState<any>({});
  // const { data, loading: loadingMutation, error, mutate } = useFireMutation("users");
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const closeEditDialog = () => {
    setEditDialog(false);
  };
  const closeShowDialog = () => {
    setViewDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Id",
      description: "id of the order",
      width: 130,
    },
    {
      field: "userName",
      headerName: "User Name",
      description: "client name who ordered",
      width: 130,
    },
    {
      field: "email",
      headerName: "email",
      description: "email of the user who ordered",
      width: 130,
    },
    {
      field: "UserRole",
      headerName: "User Role",
      description: "user role type",
      width: 180,
    },
    {
      field: "isEmailVerified",
      headerName: "Email Verified",
      description: "the ordered solution type",
      width: 130,
    },
    {
      field: "block",
      headerName: "Block",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridCellParams) => {
        const { id, data } = params.value?.valueOf() as {
          id: string;
          data: any;
        };
        const [loading, setLoading] = useState(false);

        const button = (
          <Box>
            <Button
              disableElevation
              size="small"
              variant="outlined"
              color="primary"
              disabled={loading || user.id === data.id}
              style={{
                width: 100,
                borderRadius: 20,
                fontWeight: 700,
                position: "relative",
              }}
              onClick={() => {
                setLoading(true);
                firebase
                  .firestore()
                  .collection("users")
                  .doc(id)
                  .update({
                    isBlocked: !data.isBlocked,
                  })
                  .then(() => {
                    console.log("TEST RES HERE");
                    enqueueSnackbar(
                      `${data.userName || data.clientName} ${
                        !data.isBlocked ? "Blocked" : "Unblocked"
                      } Successfully!`,
                      {
                        variant: "success",
                      },
                    );
                    setLoading(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                    enqueueSnackbar(
                      err?.code || "Error occurred please try again!!",
                      {
                        variant: "error",
                      },
                    );
                  });
              }}
            >
              {data.isBlocked ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="90px"
                >
                  <LockOpenIcon />
                  {' '}
                  {" UnBlock"}
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="90px"
                >
                  <LockIcon />
                  {' '}
                  {" Block"}
                </Box>
              )}
              {loading && (
                <CircularProgress size="20px" style={{ position: "absolute" }} />
              )}
            </Button>
          </Box>
        );
        return button;
      },
    },
    {
      field: "accept",
      headerName: "Approved",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params: GridCellParams) => {
        const { id, data } = params.value?.valueOf() as {
          id: string;
          data: any;
        };
        const [loading, setLoading] = useState(false);

        const button = (
          <Box>
            <Button
              disableElevation
              size="small"
              variant="outlined"
              disabled={data.accountStatus === "approved" || loading}
              style={{
                width: 100,
                borderRadius: 20,
                fontWeight: 700,
              }}
              onClick={() => {
                setLoading(true);
                firebase
                  .firestore()
                  .collection("users")
                  .doc(id)
                  .update({
                    accountStatus: "approved",
                  })
                  .then(() => {
                    setLoading(false);
                    enqueueSnackbar("Account approved Successfully!", {
                      variant: "success",
                    });
                  })
                  .catch((err) => {
                    setLoading(false);
                    enqueueSnackbar(
                      err?.code || "Error occurred please try again!!",
                      {
                        variant: "error",
                      },
                    );
                  });
              }}
            >
              {data.accountStatus === "approved" ? "Approved" : "Approve"}
              {loading && (
                <CircularProgress size="20px" style={{ position: "absolute" }} />
              )}
            </Button>
          </Box>
        );
        return button;
      },
    },
    {
      field: "view",
      headerName: "View",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => {
        const { data } = params.value?.valueOf() as {
          id: string;
          data: any;
        };

        const button = (
          <IconButton
            onClick={() => {
              setViewDialog(true);
              setViewDialogData(data);
            }}
          >
            <VisibilityIcon style={{ color: "#666", fontSize: "1.3rem" }} />
          </IconButton>
        );
        return button;
      },
    },
  ];

  return (
    <div style={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        className={classes.root}
        disableSelectionOnClick
        checkboxSelection={false}
        columnBuffer={5}
        density="standard"
        loading={loading}
        scrollbarSize={8}
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: NoData,
          LoadingOverlay: CustomLoadingOverlay,
        }}
      />
      <ShowDialog
        showDialog={viewDialog}
        closeShowDialog={closeShowDialog}
        viewDialogData={viewDialogData}
      />
      <EditDialog
        editDialog={editDialog}
        closeEditDialog={closeEditDialog}
        editDialogData={editDialogData}
      />
    </div>
  );
};

export default DataGridDisplay;
