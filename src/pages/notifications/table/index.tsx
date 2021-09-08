import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import ShowDialog from "./show";
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
  const [viewDialogData] = useState<any>({});

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
      field: "msg",
      headerName: "Message",
      description: "Notification Message",
      width: 560,
    },
    {
      field: "createdAt",
      headerName: "Time",
      description: "Notification sent time",
      width: 200,
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
    </div>
  );
};

export default DataGridDisplay;
