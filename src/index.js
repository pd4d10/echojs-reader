import React from "react";
import { StatusBar, Platform } from "react-native";
import { BottomTabNavigator } from "./navigators/bottom-tab";

import { ThemeProvider, ThemeContext } from "./context/theme";
import { SettingsContext, SettingsProvider } from "./context/settings";
import { AuthProvider } from "./context/auth";

const AppContent = () => {
  const { colors } = React.useContext(ThemeContext);
  const { inSv } = React.useContext(SettingsContext);

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          ios: inSv ? colors.safariStatusBar : colors.headerStatusBar,
        })}
        backgroundColor={Platform.select({
          android: colors.headerAndroidBar,
        })}
      />
      <BottomTabNavigator />
    </>
  );
};

export const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  </AuthProvider>
);
