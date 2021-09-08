import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@material-ui/data-grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  IconButton, Theme, createStyles, makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NoData from "../util/NoData";
import CustomLoadingOverlay from "../util/CustomLoadingOverlay";

const columns: GridColDef[] = [
  {
    field: "id",
    hide: true,
    headerName: "ID",
    width: 70,
  },
  { field: "companyName", headerName: "Company Name", width: 180 },
  { field: "user_email", headerName: "Email", width: 170 },
  { field: "user_role", headerName: "User Role", width: 170 },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    description: "User Phone number",
    sortable: false,
    width: 170,
  },
  {
    field: "view",
    headerName: "See Detail",
    width: 130,
    renderCell: (params: GridCellParams) => {
      const { id } = params;

      const btn = (
        <Link to={`/users/${id}/detail`}>
          <IconButton>
            <VisibilityIcon style={{ color: "#666", fontSize: "1.6rem" }} />
          </IconButton>
        </Link>
      );

      return btn;
    },
  },
];

interface IProps {
  status: boolean;
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

const UsersTable: React.FC<IProps> = ({ status, rows }: any) => {
  const classes = useStyles();

  return (
    <div style={{ height: 440, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        className={classes.root}
        pageSize={5}
        columnBuffer={5}
        density="standard"
        loading={status}
        checkboxSelection={false}
        scrollbarSize={8}
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: NoData,
          LoadingOverlay: CustomLoadingOverlay,
        }}
      />
    </div>
  );
};

export default UsersTable;
