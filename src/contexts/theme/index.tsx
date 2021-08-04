import React, {
  createContext, useContext, useState,
} from 'react';

type ThemeType = 'light' | 'dark';

export const initialState = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' || 'light',
  toggelTheme: (theme: ThemeType) => {
    const t = 'theme';
    console.log(theme, t);
  },
};

export const ThemeContext = createContext(initialState);

const AppThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [theme, setTheme] = useState<ThemeType>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' || 'light',
  );

  const toggelTheme = (theme: ThemeType): void => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggelTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default AppThemeProvider;
