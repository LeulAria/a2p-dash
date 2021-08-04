import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, CircularProgress } from '@material-ui/core';
import { useFireQuery } from '../../FireQuery';

interface PiChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const PiChartGraph = () => {
  const {
    data: orders,
    loading,
  } = useFireQuery('orders', {
    snapshotListener: true,
  });
  const [data, setData] = useState<PiChartData[]>([]);

  useEffect(() => {
    let payed = 0;
    let subscribed = 0;
    let attended = 0;
    let unattended = 0;

    if (orders) {
      orders.forEach((order: any) => {
        if (order.status === 'pending') {
          unattended += 1;
        } else if (order.status === 'attended payment') {
          attended += 1;
        } else if (order.status === 'attended payment') {
          attended += 1;
        } else if (order.status === 'subscribed') {
          subscribed += 1;
        } else if (order?.payApproval === 'done') {
          payed += 1;
        }
      });

      setData([
        {
          id: 'subscribed',
          label: 'Subscribed',
          value: subscribed,
          color: 'hsl(149, 70%, 50%)',
        },
        {
          id: 'attended',
          label: 'Attended',
          value: attended,
          color: 'hsl(104, 70%, 50%)',
        },
        {
          id: 'unattended',
          label: 'Unattended',
          value: unattended,
          color: 'hsl(204, 70%, 50%)',
        },
        {
          id: 'payed',
          label: 'Payed',
          value: payed,
          color: 'hsl(311, 70%, 50%)',
        },
      ]);
    }
  }, [orders]);

  return (
    <>
      <Box fontSize=".8rem">Chart data for all orders status.</Box>
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {loading && data.length === 0 ? (
          <CircularProgress />
        ) : (
          <ResponsivePie
            data={data}
            margin={{
              top: 40, right: 80, bottom: 80, left: 80,
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            tooltip={({ datum: { id, value, color } }) => (
              <div
                style={{
                  borderRadius: '5px !important',
                  padding: 12,
                  color,
                  background: '#222222',
                  width: 150,
                  fontWeight: 500,
                  fontSize: '.8rem',
                  textAlign: 'center',
                }}
              >
                <span>
                  Orders
                  {' '}
                  <span style={{ textTransform: 'capitalize' }}>{id}</span>
                </span>
                <br />
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    width: '100%',
                    textShadow: `0 0px 1px ${color}`,
                    textAlign: 'center',
                  }}
                >
                  {value}
                </div>
              </div>
            )}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'ruby',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'c',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'go',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'python',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'scala',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'lisp',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'elixir',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'javascript',
                },
                id: 'lines',
              },
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Box>
    </>
  );
};
export default PiChartGraph;
