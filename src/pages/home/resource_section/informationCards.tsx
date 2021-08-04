import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  title2: {
    color: '#040734',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  subTitle: {
    fontSize: '16px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  card: {
    borderRadius: '0.5rem',
    margin: '1rem',
    display: 'flex',
    flexBasis: '300px',
    alignItems: 'center',
    minHeight: '8.5rem',
  },
  cardContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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

// C4EBFF

export default function Api({
  Svgs,
  title,
  description,
  hasDescription = false,
}: any) {
  const classes = useStyles();
  return (
    <Paper className={classes.card} elevation={0}>
      <Box
        display="flex"
        flexDirection="row"
        px={2}
        py={3}
        className={classes.cardContainer}
        height="100%"
        alignItems="center"
        width="100%"
      >
        <Box
          width="20%"
          height="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          className={classes.cardContainerIcon}
        >
          <img src={Svgs} alt="info view" />
        </Box>
        <Box
          className={classes.cardContainerTitle}
          style={{
            display: !hasDescription ? 'flex' : '',
            justifyContent: !hasDescription ? 'flex-start' : 'center',
            alignItems: 'center',
          }}
          pl={4}
        >
          <Typography
            variant="h4"
            className={classes.title2}
            // style={{fontSize: hasDescription ? "20px": "17px"}}
          >
            {title}
          </Typography>
          {hasDescription && (
            <Typography className={classes.subTitle}>{description}</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
