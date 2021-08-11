import React from "react";
import "./style.css";
import {
  Box,
  Theme,
  Typography,
  makeStyles
} from "@material-ui/core";
import awbIMG from "../../../assets/clients/awb.png";
import awtarIMG from "../../../assets/clients/awtar.png";
import enatIMG from "../../../assets/clients/enat.png";
import omniIMG from "../../../assets/clients/omni.png";
import rideIMG from "../../../assets/clients/ride.png";
import unhcrIMG from "../../../assets/clients/unhcr.png";
import weyeIMG from "../../../assets/clients/weye.png";
import uuid from "../../../utils/uuid";

const useStyles = makeStyles((theme: Theme) => ({
  cardTitle: {
    color: "#13141A",
    fontWeight: 900,
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2rem",
      fontSize: "26px",
    },
  }
}));

const ClientsSection = () => {
  const classes = useStyles();

  const clients = [
    rideIMG,
    omniIMG,
    enatIMG,
    weyeIMG,
    awbIMG,
    awtarIMG,
    unhcrIMG,
    rideIMG,
    omniIMG,
    enatIMG,
    weyeIMG,
    awbIMG,
    awtarIMG,
    unhcrIMG,
    rideIMG,
    omniIMG,
    enatIMG,
    weyeIMG,
    awbIMG,
    awtarIMG,
    unhcrIMG,
  ];

  return (
    <Box mx="10%">
      <Box mx="10%" my={5} />

      <Typography className={classes.cardTitle}>
        Clients
      </Typography>

      <div className="clientsSlider">
        <div className="slide-track">
          {clients.map((client: string) => (
            <div key={uuid()} className="slide">
              <img src={client} width="120px" alt="" />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ClientsSection;
