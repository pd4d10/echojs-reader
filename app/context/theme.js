import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {themeMapping, STORAGE_KEYS} from '../constants';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {
  const [theme, _setTheme] = React.useState();

  const ensureCorrect = React.useCallback(v => {
    if (Object.keys(themeMapping).includes(v)) {
      return v;
    } else {
      return 'echojs';
    }
  }, []);

  const setTheme = React.useCallback(
    v => {
      v = ensureCorrect(v);
      _setTheme(v);
      AsyncStorage.setItem(STORAGE_KEYS.theme, v);
    },
    [ensureCorrect],
  );

  React.useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem(STORAGE_KEYS.theme);
      _setTheme(ensureCorrect(v));
    })();
  }, [ensureCorrect]);

  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{theme, setTheme, colors: themeMapping[theme]}}>
      {children}
    </ThemeContext.Provider>
  );
};
