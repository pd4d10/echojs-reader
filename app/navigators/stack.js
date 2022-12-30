import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  TopScreen,
  LatestScreen,
  DetailScreen,
  SettingsScreen,
} from "../screens";
import { LoginScreen } from "../screens/login";
import { ThemeContext } from "../context";

const TopStack = createNativeStackNavigator();

export const TopNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <TopStack.Navigator
      screenOptions={{
        headerTitleStyle: { color: colors.header.text },
        headerStyle: { backgroundColor: colors.header.background },
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
        headerTitleStyle: { color: colors.header.text },
        headerStyle: { backgroundColor: colors.header.background },
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
        headerTitleStyle: { color: colors.header.text },
        headerStyle: { backgroundColor: colors.header.background },
      }}
    >
      <LatestStack.Screen name="Settings" component={SettingsScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </LatestStack.Navigator>
  );
};
