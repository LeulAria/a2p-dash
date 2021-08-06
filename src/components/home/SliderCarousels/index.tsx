import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Box, Grid, Paper } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Particles from "react-tsparticles";
import FirstItem from "./firstItem";
import SecondItem from "./secondItem";
import ImageHolder from "../image_container/imageHolder";
import A2PAPI from "../../../assets/images/a2papi.png";
import SMSMarketing from "../../../assets/images/smsmarketing.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#0068BF",
    // backgroundSize: 'cover',
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
    color: "black",
    background: "white",
  },
  parent: {
    width: "100%",
    marginTop: "60px",
    minHeight: "90vh",
    position: "relative",
    background: "#0068BF",
  },
  carousel: {
    position: "absolute",
    top: 0,
    width: "100%",
    minHeight: "100vh",
    zIndex: 200,
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      marginTop: "60px",
    },
  },
  parentBox: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
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
}));

const Gallery = () => {
  const classes = useStyles();
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
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        swipeable
        // transitionTime={2}
        className={classes.carousel}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={4}>
            <FirstItem />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={classes.imageBox} py={10}>
              <ImageHolder Image={A2PAPI} className={classes.imageHolder} />
            </Box>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={4}>
            <SecondItem />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={classes.imageBox} py={10}>
              <ImageHolder Image={SMSMarketing} className={classes.imageHolder} />
            </Box>
          </Grid>
        </Grid>
      </Carousel>
    </Paper>
  );
};

export default Gallery;
