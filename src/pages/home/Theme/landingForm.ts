import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00CDB8",
      light: "#C5B235",
      dark: "#008DD4",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    text: {
      primary: "#000",
      secondary: "#000",
      // disabled: "rgba(0, 0, 0, 0.87)",
      // hint: "rgba(0, 0, 0, 0.87)",
    },

    divider: "rgba(0, 0, 0, 0.2)",

    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
  typography: {
    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 900,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      color: "#09AE9C",
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
    variant: "contained",
  },
};

theme.overrides = {
  MuiSelect: {},
  MuiInputLabel: {
    root: {
      fontSize: ".9rem",
      fontWeight: 500,
      letterSpacing: "1px",
      color: "#222",
      marginLeft: "10px",
      "&$focused": {
        marginLeft: "10px",
      },
    },
    // marginDense:{
    //     // margin: '1px',
    //     marginBottom: '10px',
    //     padding: '10rem'
    // }
  },
  MuiInput: {
    root: {
      borderRadius: "10px",
      padding: "2px 4px",
    },
    underline: {
      "&:before": {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
      "&:after": {
        borderBottom: `3px solid ${theme.palette.primary.dark}`,
      },
      "&:hover:not($disabled):not($focused):not($error):before": {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    },
  },

  MuiButton: {
    root: {
      borderRadius: "0",
      // color: 'white',
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: "#BFA66D",
      },
    },
    endIcon: {
      marginLeft: "2rem",
    },
    startIcon: {
      marginRight: "0.5rem",
    },
  },
};

export default theme;
