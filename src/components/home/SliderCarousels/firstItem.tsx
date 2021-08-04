import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  a2pTitle: {
    color: 'white',
    fontWeight: 900,
    letterSpacing: '1px',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 700,
      textAlign: 'center',
      fontSize: '1.8rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
  },
  text: {
    color: 'white',
    textAlign: 'start',
    fontWeight: 400,
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: 12,
    },
  },
  btn: {
    background: 'white',
    fontSize: '14px',
    fontWeight: 'bolder',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '3rem',
    marginTop: '1rem',
    paddingRight: '3rem',
    borderRadius: '0.4rem',
  },
  parentBox: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '4rem',
      fontSize: 16,
    },
  },
}));

const FirstItem = () => {
  const classes = useStyles();

  const handleClick = (event: any) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      width="100%"
      height="100%"
      className={classes.parentBox}
    >
      <Box maxWidth={350}>
        <Typography className={classes.a2pTitle} variant="h4" align="left">
          Supper Easy A2P API
        </Typography>
      </Box>
      <Box maxWidth={400}>
        <Typography className={classes.text} variant="subtitle2">
          Integrate easily and give your application a human touch
        </Typography>
      </Box>
      <Button
        className={classes.btn}
        onClick={(e: any) => {
          handleClick(e);
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default FirstItem;
