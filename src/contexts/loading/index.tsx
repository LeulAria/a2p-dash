import React, {
  createContext, useContext, useState,
} from 'react';

export const initialState = {
  loading: false,
  toggleLoading: (loading: boolean) => { console.log(loading); },
};

export const LoadingContext = createContext(initialState);

const LoadingOverlayProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = (loading: boolean): void => {
    setLoading(loading);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        toggleLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const context = useContext(LoadingContext);
  return context;
};

export default LoadingOverlayProvider;
