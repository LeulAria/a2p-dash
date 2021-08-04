import React, { useContext, useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from '@material-ui/data-grid';
import {
  Box,
  Button,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import ShowDialog from './show';
import { AuthContext } from '../../../contexts/auth/AuthProvider';
import { useFireMutation } from '../../../FireQuery';
import OrderForm from './orderForm';
import NoData from '../../util/NoData';
import CustomLoadingOverlay from '../../util/CustomLoadingOverlay';

interface IProps {
  loading: boolean;
  rows: any;
  approve: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    borderRadius: 3,
    '& .MuiDataGrid-toolbarContainer': {
      display: 'flex',
      justifyContent: 'flex-end',
      borderBottom:
          theme.palette.type === 'dark' ? '1px solid #555' : '1px solid #ddd',
    },
    '& .MuiDataGrid-toolbar': {
      display: 'flex',
      padding: '0 1rem',
    },
    '& .MuiButton-label': {
      margin: '0 10px',
      color: theme.palette.type === 'dark' ? '#999' : '#666',
    },
    '& .MuiButton-root': {
      borderRadius: 0,
      borderLeft:
          theme.palette.type === 'dark' ? '1px solid #555' : '1px solid #ddd',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
    '& .MuiDataGridPanelFooter-root': {
      borderRadius: 0,
    },
  },
}));

const DataGridDisplay: React.FC<IProps> = ({ loading, rows }: any) => {
  const classes = useStyles();
  const [viewDialog, setViewDialog] = useState(false);
  const [viewDialogData, setViewDialogData] = useState<any>({});
  const { user } = useContext(AuthContext);
  const {
    mutate,
  } = useFireMutation('orders');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  // Edit Form Dialog
  const closeShowDialog = () => {
    setViewDialog(false);
  };

  // Order Form Dialog
  const [openOrderForm, setOpenOrderForm] = React.useState(false);
  const [orderDialogData, setOrderDialogData] = useState<any>(null);
  const handleCloseOrderFormDialog = () => {
    setOpenOrderForm(false);
    setOrderDialogData(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      hide: true,
      headerName: 'Id',
      description: 'id of the order',
      width: 130,
    },
    // {
    //   field: "restore",
    //   headerName: "Restore",
    //   sortable: false,
    //   filterable: false,
    //   width: 120,
    //   hide: !approve,
    //   renderCell: (params: GridCellParams) => {
    //     const { data } = params.value?.valueOf() as {
    //       id: string;
    //       data: any;
    //     };

    //     const button = (
    //       <Box>
    //         <Button
    //           disableElevation
    //           size="small"
    //           variant="contained"
    //           color="primary"
    //           style={{
    //             borderRadius: 20,
    //             fontWeight: 700
    //           }}
    //           onClick={() => {
    //             mutateChats(
    //               "DELETE",
    //               data.id
    //             )

    //             mutate("UPDATE", id, {
    //               status: "pending",
    //               currentSalesReviewerRef: null,
    //               currentSalesReviewer: null,
    //               hasSalesReviewer: false,
    //               isPayApproved: false,
    //             })
    //               .then((res) => {
    //                 enqueueSnackbar("Removed Order from attendies list.", {
    //                   variant: "success"
    //                 });
    //               })
    //               .catch((err: any) => {
    //                 enqueueSnackbar(err?.code || "Errro occurred please try atain!", {
    //                   variant: "error"
    //                 });
    //               });
    //           }}
    //         >
    //           Restore
    //         </Button>
    //       </Box>
    //     );
    //     return button;
    //   },
    // },
    {
      field: 'clientName',
      headerName: 'Client Name',
      description: 'client name who ordered',
      width: 150,
    },
    {
      field: 'solutions',
      headerName: 'Solution',
      description: 'the ordered solution type',
      width: 130,
    },
    {
      field: 'payed',
      headerName: 'Has Payed',
      sortable: false,
      filterable: false,
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
              variant="contained"
              color="primary"
              disabled={
                data.status === 'payment approval'
                || data.isPayApproved
                || !data.isDetailFilled
              }
              style={{
                borderRadius: 20,
                fontWeight: 700,
              }}
              onClick={() => {
                mutate('UPDATE', id, {
                  status: 'payment approval',
                  currentReviourRef: `firestore:ref(users/${user.uid})`,
                  currentReviour: user.uid,
                  payApproval: 'pending',
                  isPayApproved: false,
                })
                  .then(() => {
                    enqueueSnackbar('Panging admin approval in payment.', {
                      variant: 'success',
                    });
                  })
                  .catch((err: any) => {
                    enqueueSnackbar(err?.code || 'Error occurred please try attain!', {
                      variant: 'error',
                    });
                  });
              }}
            >
              {data.isPayApproved
                ? 'Order Payed'
                : data.status === 'payment approval'
                  ? 'Pending Approval'
                  : 'Mark as payed'}
            </Button>
          </Box>
        );
        return button;
      },
    },
    {
      field: 'order_form',
      headerName: 'Order Form',
      description: 'Add Order Information.',
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
            variant="contained"
            color="primary"
            style={{
              position: 'relative',
              borderRadius: 20,
              fontWeight: 700,
            }}
            onClick={() => {
              history.push(`/app/order/form/${data.id}`, {
                data: JSON.parse(JSON.stringify({ ...data })),
              });
            }}
          >
            <PostAddIcon />
            {' '}
            Detail
          </Button>
        );
        return button;
      },
    },
    {
      field: 'view',
      headerName: 'View',
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
            <VisibilityIcon style={{ color: '#666', fontSize: '1.3rem' }} />
          </IconButton>
        );
        return button;
      },
    },
  ];

  return (
    <div style={{ height: 480, width: '100%' }}>
      <DataGrid
        rows={rows}
        className={classes.root}
        columns={columns}
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
      {viewDialog && (
        <ShowDialog
          showDialog={viewDialog}
          closeShowDialog={closeShowDialog}
          viewDialogData={viewDialogData}
        />
      )}
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
