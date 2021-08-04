import React from 'react';
import {
  Box, Grid, Theme, Typography, makeStyles,
} from '@material-ui/core';
import UserForm from './userForm';

const useStyles = makeStyles((theme: Theme) => ({
  imageBox: {
    position: 'relative',
    marginTop: '1rem',
    minHeight: '500px',
  },
  imageHolder: {
    position: 'absolute',
    top: '200px',
    right: 0,
    width: '100%',
    minHeight: '60rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  comp: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  a2pTitle2: {
    color: 'white',
    fontWeight: 'bolder',
    letterSpacing: '1px',
  },
  text2: {
    color: 'white',
    textAlign: 'start',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  parentBox: {
    // paddingTop: '8rem',
    width: '100%',
    marginTop: '6rem',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      backgroundColor: 'white',
      marginTop: '0rem',
    },
  },
  parent: {
    width: '100%',
  },
  regBtn: {
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    background: 'linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)',
  },
  checkBoxContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '7rem',
    },
  },
  contactText: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  subBox2: {
    marginTop: '6rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  subBox1: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  footerTitle: {
    fontWeight: 800,
    color: 'white',
    fontSize: '24px',
  },
  footerText: {
    fontWeight: 700,
    color: 'white',
    fontSize: '16px',
    lineHeight: '2rem',
  },
}));

export default function PageForm() {
  const classes = useStyles();
  return (
    <div id="back-to-top-anchor">
      <Box className={classes.imageBox}>
        <svg viewBox="0 0 520 298">
          <path
            fill="#0068BF"
            d="M0,170L1450,-212L1440,9920L-10,320Z"
            className={classes.imageHolder}
          />
        </svg>

        <Grid container className={classes.comp} justifyContent="center">
          <Grid item md={5} xs={10}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              width="100%"
              height="100%"
              className={classes.parentBox}
            >
              <Box textAlign="center" mb={4}>
                <Box fontWeight={900}>
                  <Typography variant="h4">Register Now</Typography>
                </Box>
                <Typography variant="h6">
                  <Box my={1} maxWidth={300} mx="auto">
                    Register now and use our ready made SMS campaign platform or use
                    our API to send SMS from your system.
                  </Box>
                </Typography>
              </Box>

              <Box
                width="100%"
                height="100%"
                className={classes.subBox2}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    marginLeft: '40%',
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.footerTitle}
                  >
                    Africa Regional Office
                  </Typography>
                  <Box textAlign="center" fontWeight={600} mt={2}>
                    Meskel flower,
                  </Box>
                  <Box textAlign="center" fontWeight={600}>
                    Central Bldg, 5th floor
                  </Box>
                  <Box textAlign="center" fontWeight={600} mb={1}>
                    Addis Ababa, Ethiopia
                  </Box>
                  <Box textAlign="center">
                    <span
                      style={{
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '16px',
                      }}
                    >
                      email: a2p@teklogix.et
                    </span>
                    {' '}
                    <br />
                    <a
                      href="https://www.teklogixinc.com/"
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '16px',
                      }}
                    >
                      www.teklogix.et
                    </a>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Box mx="10%">
              <UserForm />
            </Box>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              width="100%"
              bgcolor="#0068BF"
              py={6}
              className={classes.subBox1}
            >
              <Box>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.footerTitle}
                >
                  Africa Regional Office
                </Typography>
                <Box textAlign="center" fontWeight={600} mt={2}>
                  Meskel flower,
                </Box>
                <Box textAlign="center" fontWeight={600}>
                  Central Bldg, 5th floor
                </Box>
                <Box textAlign="center" fontWeight={600} mb={1}>
                  Addis Ababa, Ethiopia
                </Box>
                <Box textAlign="center">
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '16px',
                    }}
                  >
                    email: a2p@teklogix.et
                  </span>
                  {' '}
                  <br />
                  <a
                    href="https://www.teklogixinc.com/"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '16px',
                    }}
                  >
                    www.teklogix.et
                  </a>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* </ThemeProvider> */}
    </div>
  );
}
