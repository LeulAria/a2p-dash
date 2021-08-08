import React from "react";
import {
  Box, Container, Grid, Typography,
} from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import SMSManager from "../../assets/images/smsmarketing.svg";

const useStyles = makeStyles((theme: Theme) => ({
  topography: {
    color: "#0F0F1B",
    fontWeight: 800,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  topography2: {
    // color: '#28287D',
    fontWeight: 400,
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  listItem: {
    // display: 'inline'
  },
  cardTitle: {
    color: "#101218",
    fontWeight: 900,
    fontSize: "28px",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      textAlign: "center",
      lineHeight: 1.334,
      letterSpacing: "0em",
      marginTop: "2rem",
    },
  },
  cardSubTitle: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "250px",
      margin: "auto",
      textAlign: "center",
    },
  },
  smsImg: {
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      maxWidth: "300px",
      margin: "auto",
    },
  },
}));

export default function Sms() {
  const classes = useStyles();
  return (
    <div style={{ height: "70vh", paddingTop: "20vh", overflowX: "hidden" }}>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={5} md={4}>
            <Typography className={classes.cardTitle}>
              Easy to Use
              {' '}
              <br />
              SMS Marketing Platform
            </Typography>
            <Box className={classes.cardSubTitle}>
              <Typography
                align="center"
                variant="subtitle2"
                display="inline"
                className={classes.topography2}
              >
                Empower your business with easy to use SMS customer engagement
                platform
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display="flex" alignItems="center">
              <img src={SMSManager} alt="SMS Marketing" style={{ maxWidth: "400px" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
