import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Gallery from "../../components/home/SliderCarousels/index";
// import { makeStyles } from '@material-ui/core/styles';
import SMSMADE from "./sms_made_simple/index";
import Sms from "./sms";
import Res from "./resource_section";
import Ease from "./ease_use";
import Form from "./pageForm";
import Navbar from "../../components/home/Navigationbar/Navbar";
import theme from "../../pages/home/Theme/landingForm";
import { Helmet } from "react-helmet";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Home = () => (
  <div>
    <Helmet>
      <title>A2P | Home</title>
    </Helmet>

    <ThemeProvider theme={theme}>
      <ElevationScroll>
        <Navbar />
      </ElevationScroll>
      <Gallery />
      <SMSMADE />
      <Sms />
      <Res />
      <Ease />
      <Form />
    </ThemeProvider>
  </div>
);

export default Home;
