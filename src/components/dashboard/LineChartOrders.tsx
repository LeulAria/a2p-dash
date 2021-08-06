import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useFireQuery } from "../../FireQuery";

const useStyles = makeStyles((theme: Theme) => createStyles({
  customToolTip: {
    padding: "1rem",
    borderRadius: 10,
    background: theme.palette.type === "dark" ? "#333" : "#DDD",
  },
  label: {
    fontWeight: 900,
    fontSize: "1rem",
    marginRight: "10px",
    lineHeight: "2px",
  },
  intro: {
    fontWeight: 600,
    lineHeight: "4px",
    margin: "1rem 0",
    fontSize: ".92rem",
  },
  desc: {
    marginTop: -2,
  },
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  const classes = useStyles();

  if (active && payload && payload.length) {
    return (
      <div className={classes.customToolTip}>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <p className={classes.label}>{`${label}`}</p>
        </Box>
        <Box>
          <p className={classes.intro}>{`attended: ${payload[0].value}`}</p>
          <p className={classes.intro}>{`payed: ${payload[1].value}`}</p>
          <p className={classes.intro}>{`subscribed: ${payload[2].value}`}</p>
        </Box>
      </div>
    );
  }

  return null;
};

const LineChartOrders = () => {
  const { data: orders, loading } = useFireQuery("orders", {
    orderBy: ["createdAt asc"],
    startAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    snapshotListener: true,
  });
  const [data, setData] = useState<any[]>([]);

  useMemo(() => {
    if (orders) {
      const weeklyDate = [
        {
          name: dayjs(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
        {
          name: dayjs(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)).format(
            "ddd-DD-MMM",
          ),
          attended: 0,
          payed: 0,
          subscribed: 0,
        },
      ];

      orders.forEach((orderData: any) => {
        const orderFmt = {
          ...orderData,
          createdAt: dayjs(orderData.createdAt.toDate()).format("ddd-DD-MMM"),
        };
        const index = weeklyDate.findIndex(
          (d: any) => d.name === orderFmt.createdAt,
        );
        if (index !== -1) {
          if (orderFmt.status === "attended payment") {
            weeklyDate[index].attended += 1;
          }
          if (orderFmt.status === "payed") {
            weeklyDate[index].payed += 1;
          }
          if (orderFmt.status === "subscribed") {
            weeklyDate[index].subscribed += 1;
          }
        }
      });
      setData(weeklyDate);
    }
  }, [orders]);

  return (
    <>
      <Box ml={3}>
        <Box fontWeight={800} fontSize="2rem">
          {orders?.length}
          &nbsp;&nbsp;Orders
        </Box>
        <Box>In this 7 Days</Box>
      </Box>
      {loading ? (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size="50px" />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={10}
            data={data}
            margin={{
              top: 15,
              left: 15,
              right: 15,
              bottom: 5,
            }}
          >
            <XAxis tickLine={false} tick={{ fontSize: 10 }} dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="attended"
              strokeWidth={1}
              stroke="#8884d8"
              activeDot={{ r: 9 }}
            />
            <Line
              type="monotone"
              dataKey="payed"
              strokeWidth={1}
              stroke="#8884d8"
              activeDot={{ r: 9 }}
            />
            <Line
              type="monotone"
              dataKey="subscribed"
              strokeWidth={1}
              stroke="#8884d8"
              activeDot={{ r: 9 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default LineChartOrders;
