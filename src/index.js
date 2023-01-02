import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomTabNavigator } from "./navigators/bottom-tab";
import {
  context as ThemeContext,
  Provider as ThemeProvider,
} from "./ThemeContext.bs";
import { AuthProvider } from "./context/auth";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const AppContent = () => {
  const { colors } = React.useContext(ThemeContext);

  const defaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={defaultTheme}>
      <StatusBar
        barStyle={colors.headerStatusBar}
        backgroundColor={Platform.select({
          android: colors.headerAndroidBar,
        })}
      />
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export const App = () => (
  <AuthProvider>
    <ThemeProvider.make>
      <AppContent />
    </ThemeProvider.make>
  </AuthProvider>
);
