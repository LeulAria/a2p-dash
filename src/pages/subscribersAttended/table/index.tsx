import React, { useContext, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@material-ui/data-grid";
import {
  Box,
  Button,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import ShowDialog from "./show";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import { useFireMutation } from "../../../FireQuery";
import OrderForm from "./orderForm";
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
  const { user } = useContext(AuthContext);
  const { mutate } = useFireMutation("orders");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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
    // {
    //   field: "restore",
    //   headerName: "Restore Session",
    //   sortable: false,
    //   description: "restore order subscription session.",
    //   filterable: false,
    //   width: 160,
    //   renderCell: (params: GridCellParams) => {
    //     const { data } = params.value?.valueOf() as {
    //       id: string;
    //       data: any;
    //     };

    //     const button = (
    //       <Box>
    //         {data.status !== "subscribed" && !data.isSubscriptionApproved && (
    //           <Button
    //             disableElevation
    //             size="small"
    //             variant="contained"
    //             color="primary"
    //             style={{
    //               borderRadius: 20,
    //               fontWeight: 700,
    //             }}
    //             onClick={() => {
    //               mutate(
    //                 "UPDATE",
    //                 id,
    //                 {
    //                   status: "paid",
    //                   currentTechReviewerRef: null,
    //                   currentTechReviewer: null,
    //                   hasTechReviewer: false
    //                 },
    //                 {
    //                   updatedAt: true,
    //                 }
    //               );

    //               setSnackbar({
    //                 open: true,
    //                 type: "success",
    //                 message: "Removed successfully from subsciption attendied list.",
    //               });
    //             }}
    //           >
    //             Restore
    //           </Button>
    //         )}
    //       </Box>
    //     );
    //     return button;
    //   },
    // },
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
      field: "isPayed",
      headerName: "Paid",
      description: "has the user paid",
      width: 180,
    },
    {
      field: "start_billing",
      headerName: "Start Billing",
      sortable: false,
      description: "start paid billing subscription.",
      filterable: false,
      width: 190,
      renderCell: (params: GridCellParams) => {
        const { id, data } = params.value?.valueOf() as {
          id: string;
          data: any;
        };

        const button = (
          <Box>
            <Button
              disableElevation
              size="small"
              variant="outlined"
              disabled={
                data.status === "pending subscription approval"
                || data.status === "subscribed"
              }
              style={{
                borderRadius: 20,
                fontWeight: 700,
                height: "35px",
              }}
              onClick={() => {
                mutate(
                  "UPDATE",
                  id,
                  {
                    status: "pending subscription approval",
                    currentReviourRef: `firestore:ref(users/${user.uid})`,
                    currentReviour: user.uid,
                    isSubscriptionApproved: false,
                  },
                  {
                    updatedAt: true,
                  },
                )
                  .then(() => {
                    enqueueSnackbar(
                      "Status changed to Star Subscription Pending...",
                      {
                        variant: "success",
                      },
                    );
                  })
                  .catch((err: any) => {
                    enqueueSnackbar(
                      err?.code || "Error occurred please try again!!",
                      {
                        variant: "error",
                      },
                    );
                  });
              }}
            >
              {data.status === "pending subscription approval"
                ? "Pending approval"
                : data.status === "subscribed"
                  ? "Approved"
                  : "Start Subscription"}
            </Button>
          </Box>
        );
        return button;
      },
    },
    {
      field: "order_detail",
      headerName: "Order Detail",
      description: "Add Order Information.",
      width: 180,
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
        className={classes.root}
        pageSize={5}
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
      {/* <EditDialog
        editDialog={editDialog}
        closeEditDialog={closeEditDialog}
        editDialogData={editDialogData}
      /> */}
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
