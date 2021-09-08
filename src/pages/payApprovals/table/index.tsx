import React, { useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@material-ui/data-grid";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useSnackbar } from "notistack";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useHistory } from "react-router";
import ShowDialog from "./show";
import EditDialog from "./edit";
import { useFireMutation } from "../../../FireQuery";
import OrderForm from "./orderForm";
import firebase from "../../../firebase";
import NoData from "../../util/NoData";
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
      margin: "5px 10px",
      color: theme.palette.type === "dark" ? "#999" : "#666",
    },
    "& .MuiButton-root": {
      borderRadius: 0,
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
  const { mutate } = useFireMutation("orders");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const closeEditDialog = () => {
    setEditDialog(false);
  };
  const closeShowDialog = () => {
    setViewDialog(false);
  };

  // Order Form Dialog
  const [openOrderForm, setOpenOrderForm] = React.useState(false);
  const [orderDialogData] = useState<any>({});
  const handleCloseOrderFormDialog = () => {
    setOpenOrderForm(false);
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
      field: "email",
      headerName: "Email",
      description: "email of the user who ordered",
      width: 180,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      description: "client name who ordered",
      width: 180,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      description: "company name who ordered",
      width: 180,
    },
    {
      field: "solutions",
      headerName: "Solution",
      description: "the ordered solution type",
      width: 180,
    },
    {
      field: "approve",
      headerName: "Payment",
      sortable: false,
      filterable: false,
      width: 180,
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
              disabled={data.isPayed || loading}
              style={{
                borderRadius: 20,
                fontWeight: 700,
                height: "35px",
              }}
              onClick={() => {
                setLoading(true);
                mutate(
                  "UPDATE",
                  id,
                  {
                    isPayApproved: true,
                    payApproval: "done",
                    status: "paid",
                    isPayed: true,
                  },
                  {
                    updatedAt: true,
                  },
                )
                  .then(() => {
                    enqueueSnackbar("Payment approved", {
                      variant: "success",
                    });
                    setLoading(false);
                  })
                  .catch((err: any) => {
                    enqueueSnackbar(
                      err?.code || "Error occurred please try again!!",
                      {
                        variant: "error",
                      },
                    );
                  });

                const timestamp = firebase.firestore.FieldValue.serverTimestamp;
                firebase
                  .firestore()
                  .collection(`/notifications/${data.uid}/notifications`)
                  .add({
                    msg: `Your ${data.solutions} order payment has been approved.`,
                    type: "success",
                    redirect: null,
                    seen: false,
                    createdAt: timestamp(),
                  });
              }}
            >
              {data.isPayed ? "Order Paid" : "Approve Payment"}
              {loading && <CircularProgress style={{ position: "absolute" }} />}
            </Button>
          </Box>
        );
        return button;
      },
    },
    {
      field: "order_detail",
      headerName: "Order Form",
      description: "Add Order Information.",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => {
        const { data } = params.value?.valueOf() as {
          id: string;
          data: any;
        };

        const button = (
          <Button
            disableElevation
            size="small"
            variant="outlined"
            color="primary"
            style={{
              position: "relative",
              borderRadius: 20,
              fontWeight: 700,
              height: 35,
            }}
            onClick={() => {
              history.push(`/app/order/form/${data.id}`, {
                data: JSON.parse(JSON.stringify({ ...data })),
                view: true,
              });
            }}
          >
            <FormatListBulletedIcon style={{ marginRight: "10px", fontSize: "18px" }} />
            {' '}
            Detail
          </Button>
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
      {openOrderForm && orderDialogData && (
        <OrderForm
          open={openOrderForm}
          handleCloseOrderFormDialog={handleCloseOrderFormDialog}
          orderDialogData={orderDialogData}
        />
      )}
    </div>
  );
};

export default DataGridDisplay;
