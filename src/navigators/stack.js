import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/login";
import { ThemeContext } from "../context/theme";
import { LatestScreen, TopScreen } from "../screens/list";
import { SettingsScreen } from "../screens/settings";
import { DetailScreen } from "../screens/detail";

const TopStack = createNativeStackNavigator();

export const TopNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <TopStack.Navigator
      screenOptions={{
        headerTitleStyle: { color: colors.headerText },
        headerStyle: { backgroundColor: colors.headerBackground },
      }}
    >
      <TopStack.Screen name="Top news" component={TopScreen} />
      <LatestStack.Screen name="Detail" component={DetailScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </TopStack.Navigator>
  );
};

const LatestStack = createNativeStackNavigator();

export const LatestNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <LatestStack.Navigator
      screenOptions={{
        headerTitleStyle: { color: colors.headerText },
        headerStyle: { backgroundColor: colors.headerBackground },
      }}
    >
      <LatestStack.Screen name="Latest news" component={LatestScreen} />
      <LatestStack.Screen name="Detail" component={DetailScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </LatestStack.Navigator>
  );
};

export const SettingsNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <LatestStack.Navigator
      screenOptions={{
        headerTitleStyle: { color: colors.headerText },
        headerStyle: { backgroundColor: colors.headerBackground },
      }}
    >
      <LatestStack.Screen name="Settings" component={SettingsScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </LatestStack.Navigator>
  );
};
