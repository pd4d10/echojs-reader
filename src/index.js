import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { make as Navigator } from "./Navigator.bs";
import {
  context as ThemeContext,
  Provider as ThemeProvider,
} from "./contexts/ThemeContext.bs";
import { Provider as AuthProvider } from "./contexts/AuthContext.bs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

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
        style={colors.headerStatusBar}
        backgroundColor={Platform.select({
          android: colors.headerAndroidBar,
        })}
      />
      <Navigator />
    </NavigationContainer>
  );
};

export const App = () => (
  <AuthProvider.make>
    <ThemeProvider.make>
      <ActionSheetProvider>
        <AppContent />
      </ActionSheetProvider>
    </ThemeProvider.make>
  </AuthProvider.make>
);
