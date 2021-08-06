import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import { useFireQuery } from "../../FireQuery";

const OrdersStat = () => {
  const { data: orders } = useFireQuery("orders", {
    snapshotListener: true,
  });
  const [data, setData] = useState<any[]>([]);

  useMemo(() => {
    // initial values for month
    const byMonth: any = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
    const dataOrderPerMonth: any = [];

    if (orders) {
      orders.forEach((order: any) => {
        const orderFmt = {
          ...order,
          // change firebase timestamp to month date
          createdAt: dayjs(order.createdAt?.toDate()).format("MMM"),
        };
        // increment by one on ordered date
        byMonth[orderFmt.createdAt] += 1;
      });

      // loop over the order months obj to map value for graph
      Object.entries(byMonth).forEach((ord) => {
        const order = {
          date: ord[0],
          value: ord[1],
        };
        dataOrderPerMonth.push(order);
      });

      setData(dataOrderPerMonth);
    }
  }, orders);

  return (
    <>
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        {/* {false ? (
          <CircularProgress />
        ) : ( */}
        <ResponsiveBar
          data={data}
          keys={["value"]}
          indexBy="date"
          margin={{
            top: 50,
            right: 130,
            bottom: 50,
            left: 60,
          }}
          padding={0.48}
          innerPadding={5}
          enableLabel={false}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "category10" }}
          borderRadius={8}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "date",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "date",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
        />
        {/* )} */}
      </Box>
    </>
  );
};
export default OrdersStat;
