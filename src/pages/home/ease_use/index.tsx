import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import PaperCards from './paperCards';
import ImageContainer from './imageHolder';
// import CODE from "../../../assets/images/sampleCode.jpg";
import ClientsSection from './ClientsSection';
import CODE from '../../../assets/images/samplecode.jpg';
import NoDelay from '../../../assets/icons/ease_use/nodelay.svg';
import NoCable from '../../../assets/icons/ease_use/nocable.svg';
import A2PAPI from '../../../assets/images/applicationtopeermessaging.png';
import NoComplexity from '../../../assets/icons/ease_use/nocomplexity.svg';
import uuid from '../../../utils/uuid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '5rem 0',
  },
  contain: {
    marginTop: '3%',
  },
  topography: {
    color: '#072E5C',
  },
  imageBox: {
    position: 'relative',
  },
  imageHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 'auto',
    width: '80%',
    height: '80%',
  },
  gridItems: {
    padding: '1% 10%',
    //   marginLeft: '3%'
  },
  cardTitle: {
    color: '#13141A',
    fontWeight: 900,
    fontSize: '28px',
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0 2rem',
      fontSize: '26px',
    },
  },
}));

const items = [
  {
    title: 'No Cable',
    icon: NoCable,
  },
  {
    title: 'No Delay',
    icon: NoDelay,
  },
  {
    title: 'No Complexity',
    icon: NoComplexity,
  },
];

export default function Sms() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12} sm={9}>
          <Box>
            <Typography className={classes.cardTitle}>
              Application-to-Peer messaging (A2P)
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container justifyContent="center">
            {items.map((content) => (
              <Grid item xs={10} md={4} key={uuid()}>
                <Box width="100%" px={2}>
                  <PaperCards title={content.title} Svgs={content.icon} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5} spacing={2}>
          <Box>
            <ImageContainer Image={A2PAPI} className={classes.imageHolder} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Box
              my={2}
              fontWeight={1000}
              textAlign="center"
              color="#364F91"
              fontSize="22px"
            >
              Just A Few Lines of Code
            </Box>
            <ImageContainer Image={CODE} className={classes.imageHolder} />
          </Box>
        </Grid>
      </Grid>

      <ClientsSection />
    </div>
  );
}
