import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {themeMapping, STORAGE_KEYS} from '../constants';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {
  const [theme, _setTheme] = React.useState();

  const ensureCorrect = React.useCallback(theme => {
    if (Object.keys(themeMapping).includes(theme)) {
      return theme;
    } else {
      return 'echojs';
    }
  }, []);

  const setTheme = React.useCallback(theme => {
    theme = ensureCorrect(theme);
    _setTheme(theme);
    AsyncStorage.setItem(STORAGE_KEYS.theme, theme);
  }, []);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.theme);
      _setTheme(ensureCorrect(theme));
    })();
  }, []);

  if (!theme) return null;

  return (
    <ThemeContext.Provider
      value={{theme, setTheme, colors: themeMapping[theme]}}>
      {children}
    </ThemeContext.Provider>
  );
};
