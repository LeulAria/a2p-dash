import React from "react";
import { Box } from "@material-ui/core";

export default function Footer() {
  return (
    <Box>
      {"Copyright © "}
      {/* <Link to="/"> */}
      XYZ User Support
      {/* </Link> */}
      {new Date().getFullYear()}
      {/* . */}
    </Box>
  );
}
