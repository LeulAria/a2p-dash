import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  title2: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '10px',
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  card: {
    borderRadius: '0.5rem',
    marginBottom: '3rem',
    backgroundColor: '#0093F7',
    minHeight: '8.5rem',
    maxWidth: '300px',
    margin: 'auto',
    heigh: '200px',
  },
  cardContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  cardContainerIcon: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  cardContainerTitle: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1rem',
    },
  },
}));

export default function Api({ Svgs, title, hasDescription = false }: any) {
  const classes = useStyles();

  return (
    <Paper className={classes.card} elevation={0}>
      <Box
        display="flex"
        flexDirection="row"
        py={3}
        className={classes.cardContainer}
        height="100%"
      >
        <Box
          px={2}
          width="40%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.cardContainerIcon}
        >
          <img src={Svgs} alt="paper card img" />
        </Box>
        <Box
          width="60%"
          className={classes.cardContainerTitle}
          style={{
            display: !hasDescription ? 'flex' : '',
            justifyContent: !hasDescription ? 'flex-start' : 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" align="center" className={classes.title2}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
