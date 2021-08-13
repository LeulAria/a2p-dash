import React from "react";
import {
  Box, Grid, Theme, makeStyles,
} from "@material-ui/core";
import UserForm from "./userForm";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  footerRegisterFormContainer: {
    padding: "5rem",
    minHeight: "500px",
    background: "#F4F4F4",
    boxShadow: "inset 0 1px 15px rgba(0,0,0,0.1)"
  },
  particlesBG: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 3,
  },
  imageHolder: {
    position: "absolute",
    top: "200px",
    right: 0,
    minHeight: "60rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  comp: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  a2pTitle2: {
    color: "white",
    fontWeight: "bolder",
    letterSpacing: "1px",
  },
  text2: {
    color: "white",
    textAlign: "start",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  parentBox: {
    // paddingTop: '8rem',
    width: "100%",
    marginTop: "6rem",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      marginTop: "0rem",
    },
  },
  parent: {
    width: "100%",
  },
  regBtn: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    background: "linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)",
  },
  checkBoxContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "7rem",
    },
  },
  contactText: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  subBox: {
    marginTop: "6rem"
  },
  footerTitle: {
    fontWeight: 800,
    fontSize: "24px",
  },
  footerText: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "2rem",
  },
  registerDescription: {
    [theme.breakpoints.down("md")]: {
      fontSize: ".8rem",
      fontWeight: 500
    },
  },
  cardTitle: {
    color: "#13141A",
    fontWeight: 900,
    fontSize: "28px",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2rem",
      fontSize: "26px",
    },
  },
  cardDescription: {
    color: "#13141A",
    fontWeight: 400,
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2rem",
      fontSize: "18px",
    },
  }
}));

export default function PageForm({ data }: any) {
  const classes = useStyles();

  return (
    <div id="back-to-top-anchor">
      <Box className={classes.footerRegisterFormContainer}>
        <Grid container justifyContent="center" style={{ zIndex: 5, position: "relative" }}>
          <Grid item xs={10} md={10} lg={5}>
            <Box padding={{ xs: 3, md: 12 }}>
              <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={10} md={10}>
                  <Box mt="2rem">
                    <Box className={classes.cardTitle}>Register Now</Box>
                    {
                      data 
                        ? (
                          <Box className={classes.cardDescription}>
                            { data?.app_footer_registration_message}
                          </Box>
                        )
                        : (
                          <>
                            <Skeleton width="80%" height={20} />
                            <Skeleton width="70%" height={20} />
                            <Skeleton width="80%" height={20} />
                            <Skeleton width="76%" height={20} />
                            <Skeleton width="80%" height={20} />
                            <Skeleton width="65%" height={20} />
                            <Skeleton width="10%" height={20} />
                          </>
                        )
                    }
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Box mx="auto" maxWidth={500} mt={8} mb={10}>
              <UserForm data={data} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        style={{
          background: "#0068BF",
          color: "#444",
        }}
        px={5}
        py={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        {
          data
            ? (
              <Box color="#FFF" mt={2} fontWeight={800} fontSize="1.5rem" textAlign={{ xs: "center", lg: "left" }}>
                { data?.app_footer_title}
              </Box>
            )
            : (
              <>
                <Box width="60%" minWidth={120} maxWidth={250}>
                  <Skeleton height={55} />
                </Box>
              </>
            )
        }

        {
          data 
            ? (
              <Box maxWidth={600} display="flex" mt={1} justifyContent="space-between">
                <Box flex={1} maxWidth={200} textAlign="center" mr={2} fontSize="1rem" color="#FFF">{data && data?.app_address}</Box>
                <Box flex={1} ml={3}>
                  <Box fontSize="1rem" color="#FFF">{data && `phone: ${data?.app_footer_phone}` }</Box>
                  <Box fontSize="1rem" color="#FFF">{data && `email: ${data?.app_footer_email}` }</Box>
                  <Box fontSize="1rem" color="#FFF">{data && data?.app_website}</Box>
                </Box>
              </Box>
            )
            : (
              <Box maxWidth={600} display="flex" mt={1} justifyContent="space-between">
                <Box flex={1} maxWidth={200} textAlign="center" mr={2}>
                  <Skeleton width="140px" height={20} />
                  <Skeleton width="130px" height={20} />
                  <Box ml={3}>
                    <Skeleton width="80px" height={20} />
                  </Box>
                </Box>
                <Box flex={1} ml={3}>
                  <Skeleton width="140px" height={20} />
                  <Skeleton width="110px" height={20} />
                  <Skeleton width="130px" height={20} />
                </Box>
              </Box>
            )
        }

        <Box color="#FFF" mt={3} fontWeight={500}>
          &copy; teklogix &nbsp;
          { new Date().getFullYear() }
        </Box>
      </Box>
    </div>
  );
}
