import React from "react";
import { Box } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import InfoCard from "./informationCards";
import Header from "../../../assets/backgrounds/background.png";
import Automatemarketing from "../../../assets/icons/research/automatemarketing.svg";
import ViewDeliveryReport from "../../../assets/icons/research/viewdeliveryreport.svg";
import Segment from "../../../assets/icons/research/segment.svg";
import SendSms from "../../../assets/icons/research/sendsms.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Header}) no-repeat center center`,
    backgroundSize: "cover",
  },
  title: {
    color: "#2BAF9C",
    fontWeight: 900,
    fontSize: "28px",
    marginBottom: "1rem",
  },
  cardTitle: {
    color: "#1C4F7A",
    fontWeight: 900,
    fontSize: "24px",
    marginBottom: "3rem",
  },
  cardHolder: {
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  },
}));

export default function Api() {
  const classes = useStyles();
  return (
    <Box
      bgcolor="#C4EBFF"
      width="100%"
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        my={7}
        flexWrap="wrap"
        justifyContent="space-evenly"
        maxWidth={700}
      >
        <InfoCard
          Svgs={Automatemarketing}
          title="Automate Your Marketing Campaign"
          hasDescription={false}
          description=""
        />
        <InfoCard
          Svgs={SendSms}
          title="Send Bulk SMS"
          hasDescription={false}
          description=""
        />
        <InfoCard
          Svgs={ViewDeliveryReport}
          title="View your Delivery Report"
          hasDescription={false}
          description=""
        />
        <InfoCard
          Svgs={Segment}
          title="Send Targeted Message"
          hasDescription={false}
          description=""
        />
      </Box>
    </Box>
  );
}
