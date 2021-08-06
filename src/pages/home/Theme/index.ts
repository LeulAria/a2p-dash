import { createTheme } from "@material-ui/core/styles";

export default createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#7367EF",
      light: "#C5B235",
      dark: "#F0F0F0",
    },
    secondary: {
      main: "#2F3A45",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
