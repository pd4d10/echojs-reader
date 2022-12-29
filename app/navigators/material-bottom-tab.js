import React from "react";
import { BottomNavigation } from "react-native-paper";
import { createTabNavigator } from "react-navigation-tabs";
import { TopIcon, LatestIcon, SettingsIcon } from "../components/icons";
import { TopNavigator, LatestNavigator, SettingsNavigator } from "./stack";
import { ThemeContext } from "../context";
import { createAppContainer } from "react-navigation";

const BottomNavigationView = props => {
  const { colors } = React.useContext(ThemeContext);

  const _isVisible = () => {
    const { navigation, descriptors } = props;
    const { state } = navigation;
    const route = state.routes[state.index];
    const options = descriptors[route.key].options;
    return options.tabBarVisible;
  };

  const {
    activeTintColor,
    inactiveTintColor,
    navigation,
    descriptors,
    barStyle,
    ...rest
  } = props;

  const isVisible = _isVisible();
  const extraStyle =
    typeof isVisible === "boolean"
      ? { display: isVisible ? null : "none" }
      : null;

  return (
    <BottomNavigation
      // Pass these for backward compaibility
      activeColor={colors.tab.active}
      inactiveColor={colors.tab.inactive}
      {...rest}
      renderIcon={({ route, focused }) => {
        const p = {
          color: focused ? colors.tab.active : colors.tab.inactive,
          size: 24
        };

        switch (route.routeName) {
          case "Top":
            return <TopIcon {...p} />;
          case "Latest":
            return <LatestIcon {...p} />;
          case "Settings":
            return <SettingsIcon {...p} />;
        }
      }}
      barStyle={[barStyle, extraStyle]}
      navigationState={navigation.state}
      getColor={({ route }) => {
        const descriptor = props.descriptors[route.key];
        const options = descriptor.options;

        return options.tabBarColor;
      }}
    />
  );
};

export const MaterialBottomTabNavigator = createAppContainer(
  createTabNavigator(BottomNavigationView)(
    {
      Top: TopNavigator,
      Latest: LatestNavigator,
      Settings: SettingsNavigator
    },
    {
      barStyle: { backgroundColor: "#fff" }
    }
  )
);
