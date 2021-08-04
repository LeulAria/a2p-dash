import React from 'react';
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import FireQueryProvider from './FireQuery';
import firebase from './firebase';
import Router from './Router';
import AuthProvider from './contexts/auth/AuthProvider';
import SnackBarProvider from './contexts/snackbar/SnackBarContext';
import NavBadgeProvider from './contexts/navBadgeCount';
import { useAppTheme } from './contexts/theme';
import LoadingOverlayProvider from './contexts/loading';

const App: React.FC = () => {
  const notistackRef = React.createRef<any>();
  const onClickDismiss = (key: number | string) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  const { theme: appTheme } = useAppTheme();

  const theme = createTheme({
    palette: {
      type: appTheme === 'light' ? 'light' : 'dark',
      primary: {
        light: '#0068BF',
        main: '#0068BF',
        dark: '#0068BF',
      },
      secondary: {
        light: '#33F',
        main: '#11F',
        dark: '#0505FF',
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });

  return (
    <FireQueryProvider devtools={false} firebase={firebase}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            ref={notistackRef}
            iconVariant={{
              success: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 6 }}
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
              ),
              error: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 6 }}
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-bug"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z" />
                </svg>
              ),
              warning: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 6 }}
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
              ),
              info: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 6 }}
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              ),
            }}
            action={(key) => (
              <IconButton color="primary" onClick={onClickDismiss(key)}>
                <CloseIcon style={{ color: '#FFF' }} />
              </IconButton>
            )}
            maxSnack={5}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            dense
          >
            <SnackBarProvider>
              <AuthProvider>
                <LoadingOverlayProvider>
                  <NavBadgeProvider>
                    <Router />
                  </NavBadgeProvider>
                </LoadingOverlayProvider>
              </AuthProvider>
            </SnackBarProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </FireQueryProvider>
  );
};

export default App;
