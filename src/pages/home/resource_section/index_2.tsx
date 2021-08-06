import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import InfoCard from "./informationCards";
import Header from "../../../assets/backgrounds/background.png";
import Transportandlogistics from "../../../assets/icons/research/transport.svg";
import MarketingAgency from "../../../assets/icons/research/marketing.svg";
import factorAuthentication from "../../../assets/icons/research/factor.svg";
import FinancialServices_ from "../../../assets/icons/research/financial.svg";
import TravelAgency from "../../../assets/icons/research/travel.svg";
import Ecomerce from "../../../assets/icons/research/ecomerce.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Header}) no-repeat center center`,
    backgroundSize: "cover",
    marginBottom: "10rem",
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
    <div>
      <Box bgcolor="#C4EBFF" pt={11} mb={10} className={classes.root}>
        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={10}
            style={{ padding: "0" }}
          >
            <Grid item md={6} xs={10}>
              <Box width="100%" pr={5} className={classes.cardHolder}>
                <InfoCard
                  Svgs={Ecomerce}
                  title="Ecommerce"
                  hasDescription
                  description="Customer engagement, SMS Campaign"
                />
                <InfoCard
                  Svgs={Transportandlogistics}
                  title="Transport and logistics"
                  hasDescription
                  description="OTP, Customer Engagement"
                />
                <InfoCard
                  Svgs={MarketingAgency}
                  title="Marketing agency"
                  hasDescription
                  description="Help your clients grow with mobile marketing platform"
                />
              </Box>
            </Grid>

            <Grid item md={6} xs={10}>
              <Box width="100%" pl={5} className={classes.cardHolder}>
                <InfoCard
                  Svgs={TravelAgency}
                  title="Travel agency"
                  hasDescription
                  description="Customer Engagement, SMS Campaign"
                />
                <InfoCard
                  Svgs={FinancialServices_}
                  title="Financial Services and Retail"
                  hasDescription
                  description="OTP, Customer Engagement, SMS Campaign"
                />
                <InfoCard
                  Svgs={factorAuthentication}
                  title="2 factor authentication"
                  hasDescription
                  description="Verifying with A one-time passcode [OTP] for Reliable Security"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
