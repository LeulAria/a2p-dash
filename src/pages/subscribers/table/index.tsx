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
    {
      field: "email",
      headerName: "email",
      description: "email of the user who ordered",
      width: 160,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      description: "client name who ordered",
      width: 130,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      description: "company name who ordered",
      width: 130,
    },
    {
      field: "solutions",
      headerName: "Solution",
      description: "the ordered solution type",
      width: 130,
    },
    {
      field: "attend",
      headerName: "Attend Subscriber",
      sortable: false,
      filterable: false,
      description: "attend subscriber",
      width: 170,
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
              style={{
                borderRadius: 20,
                fontWeight: 700,
              }}
              onClick={() => {
                mutate(
                  "UPDATE",
                  id,
                  {
                    status: "pending subscription",
                    currentTechReviewerRef: `firestore:ref(users/${user.uid})`,
                    currentTechReviewer: user.uid,
                    hasTechReviewer: true,
                  },
                  {
                    updatedAt: true,
                  },
                );

                const db = firebase.firestore();
                const ChatRef = db.collection("chats");
                const timestamp = firebase.firestore.FieldValue.serverTimestamp;
                const createdAt = timestamp();
                ChatRef.doc(`${data.uid}${user.uid}`)
                  .set({
                    id: `${data.uid}${user.uid}`,
                    msgs: [],
                    uid: data.uid,
                    sid: user.uid,
                    user: {
                      uid: data.uid,
                      email: data.email,
                      userName: data.clientName,
                      isTyping: false,
                    },
                    stuff: {
                      sid: user.uid,
                      userName: user.userName,
                      email: user.email,
                      isTyping: false,
                    },
                    createdAt,
                  })
                  .then(() => {
                    db.collection("chats")
                      .where("uid", "==", data.uid)
                      .where("sid", "==", user.uid)
                      .get()
                      .then((res) => {
                        const { id } = res.docs.map((d) => d.data())[0];
                        firebase
                          .firestore()
                          .collection("chats")
                          .doc(id)
                          .collection("messages")
                          .add({
                            uid: "Server",
                            msg: createdAt,
                            seen: false,
                            createdAt,
                          })
                          .then((res) => {
                            console.log("SUCCESS: ", res);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      });
                  })
                  .then(() => {
                    enqueueSnackbar("Order Added to attendies list.", {
                      variant: "success",
                    });
                  })
                  .catch((err) => {
                    console.error("chat creation err: ", err);
                  });

                firebase
                  .firestore()
                  .collection(`/notifications/${data.uid}/notifications`)
                  .add({
                    msg: `Your ${data.solutions} order is in subscription review.`,
                    type: "info",
                    redirect: null,
                    seen: false,
                    createdAt: timestamp(),
                  });
              }}
            >
              Attend
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
      width: 130,
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
            }}
            onClick={() => {
              history.push(`/app/order/form/${data.id}`, {
                data: JSON.parse(JSON.stringify({ ...data })),
                view: true,
              });
            }}
          >
            <FormatListBulletedIcon />
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
