import React from "react";
import {
  Box,
  Button,
  Container,
  Hidden,
  Paper,
} from "@material-ui/core";
import Particles from "react-tsparticles";
import { useHistory } from "react-router";
import { Theme, makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import AppToPeer from '../../../assets/images/application_to_peer.png';

import ethiotelecomLogo from '../../../assets/logos/ethiotelecom.svg';
import teclogixLogo from '../../../assets/logos/teclogix.png';
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#0068BF",
    // backgroundSize: 'cover',
  },
  appHeroTitle: {
    width: "72%",
    color: "#FFF",
    fontWeight: 900,
    fontSize: "2.8rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "1.8rem",
      textAlign: "center",
      marginTop: "4rem"
    },
  },
  appHeroDescription: {
    width: "70%",
    color: "#FFF",
    fontWeight: 400,
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "1rem",
      textAlign: "center",
      marginTop: "1rem"
    },
  },
  a2pTitle: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  text: {
    color: "white",
    textAlign: "start",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  btn: {
    color: "#222",
    fontWeight: 800,
    background: "white",
    borderRadius: "40px",
    padding: "1rem 3rem",
    marginTop: "1.3rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1.3rem auto auto 10%"
    },
  },
  parent: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    background: "#0068BF",
  },
  imageBox: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: "4rem 2rem",
    },
  },
  imageHolder: {
    position: "absolute",
    top: "150px",
    left: "20px",
    width: "80%",
    height: "100%",
  },
  logosContainer: {
    position: "absolute",
    padding: "10px",
    borderRadius: 15,
    top: 10,
    left: 10,
    zIndex: 100,
  },
  navBarContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      top: 80,
      left: "10%"
    },
  },
  navBarButtons: {
    fontWeight: 600,
    fontSize: "13.3px",
    borderRadius: "20px",
    background: "#FFF",
    padding: "5px 2rem",
    margin: "10px",
  },
  navBarButtonLogin: {
    background: "transparent",
    color: "#FFF",
    "&:hover": {
      background: "rgba(0,0,0,0.2)"
    }
  },
}));

const Hero = ({ data }: any) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event: any) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Paper className={classes.parent}>
      <Particles
        id="tsparticles-caroucel"
        // init={}
        // loaded={this.particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0068BF",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            modes: {
              bubble: {
                distance: 200,
                duration: 20,
                opacity: 0.8,
                size: 20,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.6,
              },
            },
          },
          particles: {
            color: {
              value: "#E6C3DA83",
            },
            links: {
              color: "#A2BDE6CE",
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
      <Box className={classes.logosContainer} display="flex" alignItems="center">
        <Box>
          <a href="https://www.ethiotelecom.et/" target="_blank" rel="noreferrer">
            <img width="120px" src={ethiotelecomLogo} alt="ethio-telecom" />
          </a>
        </Box>
        <Box ml={2}>
          <a href="https://www.teklogixinc.com/" target="_blank" rel="noreferrer">
            <img width="90px" src={teclogixLogo} alt="teclogix" />
          </a>
        </Box>
      </Box>
      <Box className={classes.navBarContainer}>
        <Button
          className={classes.navBarButtons}
          onClick={(e: any) => {
            handleClick(e);
          }}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={`${classes.navBarButtons} ${classes.navBarButtonLogin}`}
          onClick={() => history.push("/user/login")}
        >
          Login
        </Button>
      </Box>
      <Box display="flex" alignItems="center" width="100%" height="100%" style={{ position: 'absolute', top: 0 }}>
        <Container>
          <Box mx="10%" display="flex" alignItems="center" justifyContent="space-between">
            <Box flex={2}>
              <motion.div
                initial={{
                  y: 100,
                  opacity: 0
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 1,
                  delay: 1,
                  type: "spring"
                }}
              >
                {
                  data 
                    ? (
                      <Box className={classes.appHeroTitle}>
                        { data?.app_hero_title }
                      </Box>
                    )
                    : (
                      <>
                        <Skeleton width="45%" height={80} />
                        <Skeleton width="65%" height={80} />
                      </>
                    )
                }
              </motion.div>
              <motion.div
                initial={{
                  y: 50,
                  opacity: 0
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 1,
                  delay: 1.5,
                  type: "spring"
                }}
              >
                {
                  data 
                    ? (
                      <Box className={classes.appHeroDescription}>
                        {data?.app_hero_body}
                      </Box>
                    )
                    : (
                      <>
                        <Skeleton width="80%" height={20} />
                        <Skeleton width="65%" height={20} />
                        <Skeleton width="75%" height={20} />
                      </>
                    )
                }
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.8,
                  type: "spring"
                }}
              >
                <Button
                  className={classes.btn}
                  onClick={(e: any) => {
                    handleClick(e);
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>
            <Hidden mdDown>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.6
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.8,
                  type: "spring"
                }}
              >
                <Box flex={1}>
                  <img style={{ maxWidth: 350 }} src={AppToPeer} alt="sms marketing png" />
                </Box>
              </motion.div>
            </Hidden>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default Hero;
