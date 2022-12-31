import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TopNavigator, LatestNavigator, SettingsNavigator } from "./stack";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/theme";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { colors } = React.useContext(ThemeContext);

  const getIconProps = (focused) => ({
    color: focused ? colors.tab.active : colors.tab.inactive,
    size: 24,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.tab.active,
          tabBarInactiveTintColor: colors.tab.inactive,
          tabBarActiveBackgroundColor: colors.tab.activeBackground,
          tabBarInactiveBackgroundColor: colors.tab.inactiveBackground,
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
    </NavigationContainer>
  );
};
