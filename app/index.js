import React from "react";
import { StatusBar, Platform } from "react-native";
import {
  ThemeProvider,
  SettingsProvider,
  AuthProvider,
  SettingsContext,
  ThemeContext
} from "./context";
import { BottomTabNavigator, MaterialBottomTabNavigator } from "./navigators";

const AppContent = () => {
  const { colors } = React.useContext(ThemeContext);
  const { inSv } = React.useContext(SettingsContext);

  const Navigator = Platform.select({
    ios: BottomTabNavigator,
    android: MaterialBottomTabNavigator
  });

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          ios: inSv
            ? colors.safari.statusBarStyle
            : colors.header.statusBarStyle
        })}
        backgroundColor={Platform.select({
          android: colors.header.androidBar
        })}
      />
      <Navigator />
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
