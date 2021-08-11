import React from "react";
import { Box, Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import InfoCard from "./informationCards";
import Header from "../../../assets/backgrounds/background.png";
import Automatemarketing from "../../../assets/icons/research/automatemarketing.svg";
import ViewDeliveryReport from "../../../assets/icons/research/viewdeliveryreport.svg";
import Segment from "../../../assets/icons/research/segment.svg";
import SendSms from "../../../assets/icons/research/sendsms.svg";

const useStyles = makeStyles(() => ({
  root: {
    background: `url(${Header}) no-repeat center center`,
    backgroundSize: "cover",
  },
  cards: {
    borderRadius: 10,
    height: 200,
    transition: "all .6s",
    "& :hover": {
      transform: "scale(1.046)"
    } 
  }
}));

export default function Api() {
  const classes = useStyles();

  const cards = [
    {
      svg: Automatemarketing,
      title: "Automate Your Marketing Campaign"
    },
    {
      svg: SendSms,
      title: "  Send Bulk SMS"
    },
    {
      svg: ViewDeliveryReport,
      title: "View your Delivery Report"
    },
    {
      svg: Segment,
      title: "Send Targeted Message"
    },
    {
      svg: SendSms,
      title: "Manage your own sms campaign"
    }
  ];

  const CardComponent = (svg: any, title: string) => (
    <Grid item xs={12} md={4} lg={2}>
      <Box
        className={classes.cards}
      >
        <Box
          p={2}
          pt={3}
          display="flex"
          height="100%"
          flexDirection="column"
          justifyContent="center"
        >
          <img
            style={{
              flex: 1,
              margin: "auto",
              display: "block",
              height: "60px"
            }}
            src={svg}
            alt="automate marketing"
          />
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            height="100%"
            fontSize="1rem"
          >
            <Box fontWeight={500} textAlign="center" mx="auto" style={{ color: "#444" }}>
              {title}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Card elevation={0}>
      <Box my={10} mx="5%">
        <Grid container spacing={4} justify="center">
          {
            cards.map((card) => (CardComponent(card.svg, card.title)))
          }
        </Grid>
      </Box>
    </Card>
  );
}
