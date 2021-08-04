import React, { createContext, useContext, useState } from 'react';

type SnackBarType = {
  open: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
};

export const initialState = {
  snackBar: {
    open: false,
    type: 'success',
    message: '',
  },
  setSnackbar: (_: SnackBarType) => ({
    open: false,
    type: 'success',
    message: '',
  }),
  resetSnackBar: () => {
  },
};

export const SnackBarContext = createContext(initialState);

export const snackBarReducer = (state: SnackBarType, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const SnackBarProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [snackBar, setAlert] = useState<SnackBarType>({
    open: false,
    type: 'success',
    message: '',
  });

  const setSnackbar = (alert: SnackBarType) => {
    setAlert(alert);
    return alert;
  };

  const resetSnackBar = () => {
    setAlert({
      open: false,
      type: 'success',
      message: '',
    });
  };

  return (
    <SnackBarContext.Provider
      value={{
        snackBar,
        setSnackbar,
        resetSnackBar,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const snackbar = useContext(SnackBarContext);
  return snackbar;
};

export default SnackBarProvider;
