import React from "react";
import { Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { STORAGE_KEYS } from "../constants";
import { storage } from "../Storage.bs";

export const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
  const svAvailable = Platform.OS === "ios";
  const [svEnable, _setSvEnable] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      let enable = await storage.getItem(STORAGE_KEYS.safariView);
      _setSvEnable(enable === "true");
    })();
  }, []);

  const setSvEnable = React.useCallback((value) => {
    // Set state immediately to avoid switch UI delay
    _setSvEnable(value);
    storage.setItem(STORAGE_KEYS.safariView, value.toString());
  }, []);

  const openLink = React.useCallback(
    async (url, colors) => {
      if (Platform.OS === "ios" && svEnable) {
        // TODO: This is to avoid press multi times
        // if (svStarted) {
        //   return;
        // }

        await WebBrowser.openBrowserAsync(url, {
          controlsColor: colors.safariText,
          toolbarColor: colors.safariBackground,
        });
      } else {
        Linking.openURL(url);
      }
    },
    [svEnable]
  );

  return (
    <SettingsContext.Provider
      value={{
        svAvailable,
        svEnable,
        setSvEnable,
        openLink,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
