import React, {useEffect, useRef, useState} from "react";
import OrderInput from "./OrderInput";
import {useFireQueryData} from "../../FireQuery";
import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {useHistory, useLocation, useParams} from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderFormContainer: {
      position: "relative",
    },
  })
);

const OrderForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<any>();
  const {id} = useParams<{id: string}>();
  const [dataInput, setDataInput] = useState<any>(null);

  const {
    data: user,
    loading,
    error,
  } = useFireQueryData("users", location?.state?.data.uid);

  useEffect(() => {
    if (location?.state) {
      setDataInput(location?.state?.data);
    }
  }, [location]);

  return (
    <div className={classes.orderFormContainer}>
      {!loading &&
        dataInput &&
        (user ? (
          <OrderInput
            view={location?.state?.view}
            dataInput={dataInput}
            user={user}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="250px"
          >
            <CircularProgress size="60px" thickness={3} />
          </Box>
        ))}
    </div>
  );
};

export default OrderForm;
