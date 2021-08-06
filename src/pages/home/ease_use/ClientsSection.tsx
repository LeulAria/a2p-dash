import React from "react";
import "./style.css";
import { Box, Divider } from "@material-ui/core";
import awbIMG from "../../../assets/clients/awb.png";
import awtarIMG from "../../../assets/clients/awtar.png";
import enatIMG from "../../../assets/clients/enat.png";
import omniIMG from "../../../assets/clients/omni.png";
import rideIMG from "../../../assets/clients/ride.png";
import unhcrIMG from "../../../assets/clients/unhcr.png";
import weyeIMG from "../../../assets/clients/weye.png";
import uuid from "../../../utils/uuid";

const ClientsSection = () => {
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
      <Box mx="10%" my={10}>
        {" "}
        <Divider />
        {" "}
      </Box>
      <Box
        my={2}
        mb={10}
        fontWeight={1000}
        textAlign="center"
        color="#141518"
        fontSize="2rem"
      >
        Clients
      </Box>

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
