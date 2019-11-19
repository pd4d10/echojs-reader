import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {TopNavigator, LatestNavigator, SettingsNavigator} from './stack';
import {TopIcon, LatestIcon, SettingsIcon} from '../components/icons';
import {ThemeContext} from '../context';

const CustomBottomTabBar = props => {
  const {colors} = React.useContext(ThemeContext);

  return (
    <BottomTabBar
      {...props}
      activeTintColor={colors.tab.active}
      inactiveTintColor={colors.tab.inactive}
      activeBackgroundColor={colors.tab.activeBackground}
      inactiveBackgroundColor={colors.tab.inactiveBackground}
      renderIcon={({route, focused}) => {
        const p = {
          color: focused ? colors.tab.active : colors.tab.inactive,
          size: 24,
        };

        switch (route.routeName) {
          case 'Top':
            return <TopIcon {...p} />;
          case 'Latest':
            return <LatestIcon {...p} />;
          case 'Settings':
            return <SettingsIcon {...p} />;
        }
      }}
    />
  );
};

export const BottomTabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Top: TopNavigator,
      Latest: LatestNavigator,
      Settings: SettingsNavigator,
    },
    {
      initialRouteName: 'Top',
      tabBarComponent: CustomBottomTabBar,
    },
  ),
);
