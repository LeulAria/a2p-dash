import React from "react";
import {
  Box, Grid, Theme, Typography, makeStyles,
} from "@material-ui/core";
import UserForm from "./userForm";
import Particles from "react-tsparticles";

const useStyles = makeStyles((theme: Theme) => ({
  imageBox: {
    position: "relative",
    marginTop: "1rem",
    minHeight: "500px",
  },
  particlesBG: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
  imageHolder: {
    position: "absolute",
    top: "200px",
    right: 0,
    width: "100%",
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
      backgroundColor: "white",
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
  subBox2: {
    marginTop: "6rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  subBox1: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  footerTitle: {
    fontWeight: 800,
    color: "white",
    fontSize: "24px",
  },
  footerText: {
    fontWeight: 700,
    color: "white",
    fontSize: "16px",
    lineHeight: "2rem",
  },
}));

export default function PageForm({ data }: any) {
  const classes = useStyles();

  return (
    <div id="back-to-top-anchor">
      <Box className={classes.imageBox}>
        <Particles
          className={classes.particlesBG}
          id="tsparticlesFooter"
          // init={}
          // loaded={this.particlesLoaded}
          options={{
            // background: {
            // colo/r: {
            // value: "#0068BF00",
            // },
            // },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 10,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 14,
                },
                repulse: {
                  distance: 200,
                  duration: 0.6,
                },
              },
            },
            particles: {
              color: {
                value: "#AAB7FF",
              },
              links: {
                color: "#3E7CC4AD",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 1000,
                },
                value: 30,
              },
              opacity: {
                value: 0.6,
              },
            },
          }}
        />
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
                    {data && data?.app_footer_registration_message}
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
                    marginLeft: "40%",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.footerTitle}
                  >
                    {data && data?.app_footer_title}
                  </Typography>
                  <Box textAlign="center" maxWidth={150} mx="auto" fontWeight={600} mt={2}>
                    {data && data?.app_address}
                  </Box>
                  <Box mt={1} textAlign="center">
                    <span
                      style={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      { data && `phone: ${data?.app_footer_phone}` }
                    </span>
                    <br />
                    <span
                      style={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      { data && `email: ${data?.app_footer_email}` }
                    </span>
                    {" "}
                    <br />
                    <a
                      href="https://www.teklogixinc.com/"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      {data && data?.app_website}
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
                      color: "white",
                      fontWeight: 500,
                      fontSize: "16px",
                    }}
                  >
                    email: a2p@teklogix.et
                  </span>
                  {" "}
                  <br />
                  <a
                    href="https://www.teklogixinc.com/"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "16px",
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
