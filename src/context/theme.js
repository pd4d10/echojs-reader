import React from "react";
import { themeMapping, STORAGE_KEYS } from "../constants";
import { storage } from "../Storage.bs";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, _setTheme] = React.useState();

  const ensureCorrect = React.useCallback((v) => {
    if (Object.keys(themeMapping).includes(v)) {
      return v;
    } else {
      return "light";
    }
  }, []);

  const setTheme = React.useCallback(
    (v) => {
      v = ensureCorrect(v);
      _setTheme(v);
      storage.setItem(STORAGE_KEYS.theme, v);
    },
    [ensureCorrect]
  );

  React.useEffect(() => {
    (async () => {
      const v = await storage.getItem(STORAGE_KEYS.theme);
      _setTheme(ensureCorrect(v));
    })();
  }, [ensureCorrect]);

  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, colors: themeMapping[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
