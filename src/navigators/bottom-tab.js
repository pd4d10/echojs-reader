import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TopNavigator, LatestNavigator, SettingsNavigator } from "./stack";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { context as ThemeContext } from "../ThemeContext.bs";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  const getIconProps = (focused) => ({
    color: focused ? colors.primary : colors.tabInactive,
    size: 24,
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabInactive,
        }}
      >
        <Tab.Screen
          name="Top"
          component={TopNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo name="bar-graph" {...getIconProps(focused)} />
            ),
          }}
        />
        <Tab.Screen
          name="Latest"
          component={LatestNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="md-time" {...getIconProps(focused)} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="settings" {...getIconProps(focused)} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
