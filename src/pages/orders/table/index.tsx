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
  CircularProgress,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useSnackbar } from "notistack";
import ShowDialog from "./show";
import { AuthContext } from "../../../contexts/auth/AuthProvider";
import firebase from "../../../firebase";
import NoData from "../../util/NoData";
import CustomLoadingOverlay from "../../util/CustomLoadingOverlay";
import { useFireMutation } from "../../../FireQuery";

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

  const { user } = useContext(AuthContext);
  const [viewDialog, setViewDialog] = useState(false);
  const [viewDialogData, setViewDialogData] = useState<any>({});
  const { mutate } = useFireMutation("orders");

  // const {
  //   data: chatData,
  //   loading: loadingMutationChat,
  //   error: chatsError,
  //   mutate: mutateChats,
  // } = useFireMutation('chats');
  const { enqueueSnackbar } = useSnackbar();

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
      field: "email",
      headerName: "email",
      description: "email of the user who ordered",
      width: 210,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      description: "company name who ordered",
      width: 200,
    },
    {
      field: "solutions",
      headerName: "Solution",
      description: "the ordered solution type",
      width: 180,
    },
    {
      field: "attend",
      headerName: "Attend",
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
              disabled={loading}
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
                    status: "attended payment",
                    currentSalesReviewerRef: `firestore:ref(users/${user.uid})`,
                    currentSalesReviewer: user.uid,
                    hasSalesReviewer: true,
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
                      userName: data.companyName,
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
                    setLoading(false);
                  })
                  .then(() => {
                    enqueueSnackbar("Added to attendees list.", {
                      variant: "success",
                    });
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.error("chat creation err: ", err);
                    setLoading(false);
                  });

                firebase
                  .firestore()
                  .collection(`/notifications/${data.uid}/notifications`)
                  .add({
                    msg: `Your ${data.solutions} is in payment review status.`,
                    type: "info",
                    redirect: null,
                    seen: false,
                    createdAt: timestamp(),
                  });
              }}
            >
              Attend
              {loading && (
                <CircularProgress size="25px" style={{ position: "absolute" }} />
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
    </div>
  );
};

export default DataGridDisplay;
