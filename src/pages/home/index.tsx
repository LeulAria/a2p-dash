import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Hero from "../../components/home/Hero/index";
// import { makeStyles } from '@material-ui/core/styles';
import SMSMADE from "./sms_made_simple/index";
import Sms from "./sms";
import Res from "./resource_section";
import Ease from "./ease_use";
import Form from "./pageForm";
import theme from "../../pages/home/Theme/landingForm";
import { Helmet } from "react-helmet";

const Home = () => (
  <div>
    <Helmet>
      <title>A2P | Home</title>
    </Helmet>

    <ThemeProvider theme={theme}>
      <Hero />
      <Sms />
      <SMSMADE />
      <Res />
      <Ease />
      <Form />
    </ThemeProvider>
  </div>
);

export default Home;
