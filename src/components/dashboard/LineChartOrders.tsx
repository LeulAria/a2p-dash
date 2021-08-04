import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  CircularProgress,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { useFireQuery } from '../../FireQuery';

const dataSample = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const useStyles = makeStyles((theme: Theme) => createStyles({
  customToolTip: {
    padding: '1rem',
    borderRadius: 10,
    background: theme.palette.type === 'dark' ? '#333' : '#DDD',
  },
  label: {
    fontWeight: 700,
  },
  intro: {
    fontWeight: 900,
    lineHeight: '2px',
    fontSize: '1.62rem',
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
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <p className={classes.label}>{`${label}`}</p>
          <p className={classes.intro}>{payload[0].value}</p>
        </Box>
        <p className={classes.desc}>Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

const LineChartOrders = () => {
  const {
    data: orders,
    loading,
  } = useFireQuery('orders', {
    orderBy: ['createdAt asc'],
    startAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    snapshotListener: true,
  });
  // const [data, setData] = useState<any[]>([]);

  useMemo(() => {
    if (orders) {
      const dataOrderPerMonth: any = [];
      const orderGroups = [
        { id: 'payed', color: '#B33' },
        { id: 'subscribed', color: '#3B3' },
        { id: 'attended', color: '#33B' },
      ];

      orderGroups.forEach((orderGroup) => {
        const order: any = {
          id: orderGroup.id,
          color: orderGroup.color,
          data: [
            {
              x: dayjs(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
            {
              x: dayjs(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)).format(
                'ddd-DD-MMM',
              ),
              y: 0,
            },
          ],
        };

        orders.forEach((orderData: any) => {
          const orderFmt = {
            ...orderData,
            createdAt: dayjs(orderData.createdAt.toDate()).format('ddd-DD-MMM'),
          };

          const index = order.data.findIndex((d: any) => d.x === orderFmt.createdAt);
          if (index !== -1) {
            switch (orderGroup.id) {
              case 'attended':
                if (orderFmt.status === 'attended payment') {
                  order.data[index].y += 1;
                }
                break;
              case 'payed':
                if (orderFmt.status === 'payed') {
                  order.data[index].y += 1;
                }
                break;
              case 'subscribed':
                if (orderFmt.status === 'subscribed') {
                  order.data[index].y += 1;
                }
                break;
              default:
            }
          }
        });

        dataOrderPerMonth.push(order);
      });

      // setData(dataOrderPerMonth);
    }
  }, [orders]);

  return (
    <>
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
            data={dataSample}
            margin={{
              top: 15,
              left: 5,
              right: 5,
              bottom: 5,
            }}
          >
            <XAxis tickLine={false} dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
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
