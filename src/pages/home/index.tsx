import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import Sms from "./sms";
import Ease from "./ease_use";
import Form from "./pageForm";
import Res from "./resource_section";
import { Helmet } from "react-helmet";
import SMSMADE from "./sms_made_simple/index";
import { useFireQuery } from "../../FireQuery";
import Hero from "../../components/home/Hero/index";
import theme from "../../pages/home/Theme/landingForm";
import { ThemeProvider } from "@material-ui/core/styles";

const Home = () => {
  const { data } = useFireQuery("cms");

  return (
    <div>
      <Helmet>
        <title>A2P | Home</title>
      </Helmet>

      <ThemeProvider theme={theme}>
        <Hero data={data && data[0]} />
        <SMSMADE />
        <Res />
        <Ease />
        <Form data={data && data[0]} />
      </ThemeProvider>
    </div>
  );
};

export default Home;
