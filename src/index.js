import React from "react";
import { StatusBar, Platform } from "react-native";
import { BottomTabNavigator } from "./navigators/bottom-tab";
import {
  context as ThemeContext,
  Provider as ThemeProvider,
} from "./ThemeContext.bs";
import { AuthProvider } from "./context/auth";

const AppContent = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <>
      <StatusBar
        barStyle={colors.headerStatusBar}
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
    <ThemeProvider.make>
      <AppContent />
    </ThemeProvider.make>
  </AuthProvider>
);
