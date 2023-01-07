import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/login";
import { context as ThemeContext } from "../ThemeContext.bs";

import { LatestScreen, TopScreen } from "../screens/list";
import { make as SettingsScreen } from "../screens/SettingsScreen.bs";
import { make as DetailScreen } from "../screens/DetailScreen.bs";

const TopStack = createNativeStackNavigator();

export const TopNavigator = () => {
  return (
    <TopStack.Navigator>
      <TopStack.Screen name="Top news" component={TopScreen} />
      <TopStack.Screen name="Detail" component={DetailScreen} />
      <TopStack.Screen name="Login" component={LoginScreen} />
    </TopStack.Navigator>
  );
};

const LatestStack = createNativeStackNavigator();

export const LatestNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <LatestStack.Navigator>
      <LatestStack.Screen name="Latest news" component={LatestScreen} />
      <LatestStack.Screen name="Detail" component={DetailScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </LatestStack.Navigator>
  );
};

export const SettingsNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <LatestStack.Navigator>
      <LatestStack.Screen name="Settings" component={SettingsScreen} />
      <LatestStack.Screen name="Login" component={LoginScreen} />
    </LatestStack.Navigator>
  );
};
