import React, { ReactNode } from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  liElement: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  status: {
    position: "absolute",
    top: 5,
    right: 15,
  },
  chip: {
    background: theme.palette.type === "dark" ? "#333" : "#cdcdcd",
    padding: ".8rem .6rem",
    margin: "5px",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "110px",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const OrderStatus = ({
  icon,
  data,
  apiName,
}: {
  icon: ReactNode;
  data: any;
  apiName: string;
}) => {
  const classes = useStyles();

  return (
    <div>
      <Box position="relative" maxWidth={350}>
        <Card elevation={0} variant="outlined">
          <Box mt={2} display="flex" alignItems="center" justifyContent="center">
            <Avatar style={{ width: 70, height: 70 }}>{icon}</Avatar>
          </Box>
          <Box
            px={1}
            py={2}
            mt={-1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box fontWeight={700} fontSize="1rem" textAlign="center" mb={1}>
              {apiName}
            </Box>
            <Box fontWeight={600} margin="auto" mb={1}>
              <Chip
                color="primary"
                label={`Status: ${data?.status
                  .charAt(0)
                  .toUpperCase()}${data?.status.slice(1)}`}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box fontWeight={500} className={classes.chip}>
                <Box fontWeight={600} fontSize=".9rem">
                  Payment
                </Box>
                <Box fontWeight={300} fontSize=".8rem">
                  {data?.isPayed ? "Paid" : "Not Paid"}
                </Box>
              </Box>
              <Box fontWeight={500} className={classes.chip}>
                <Box fontWeight={600} fontSize=".9rem">
                  Subscription
                </Box>
                <Box fontWeight={300} fontSize=".8rem">
                  {data?.status === "subscribed" ? "subscribed" : "Not Started"}
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default OrderStatus;
