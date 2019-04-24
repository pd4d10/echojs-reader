import React from 'react'
import {
  createBottomTabNavigator,
  createAppContainer,
  BottomTabBar,
} from 'react-navigation'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './stack'
import { TopIcon, LatestIcon, SettingsIcon } from '../components/icons'
import { ThemeConsumer } from '../context'

const CustomBottomTabBar = props => (
  <ThemeConsumer>
    {({ colors }) => (
      <BottomTabBar
        {...props}
        activeTintColor={colors.tab.active}
        inactiveTintColor={colors.tab.inactive}
        activeBackgroundColor={colors.tab.activeBackground}
        inactiveBackgroundColor={colors.tab.inactiveBackground}
        renderIcon={({ route, focused }) => {
          const props = {
            color: focused ? colors.tab.active : colors.tab.inactive,
            size: 24,
          }

          switch (route.routeName) {
            case 'Top':
              return <TopIcon {...props} />
            case 'Latest':
              return <LatestIcon {...props} />
            case 'Settings':
              return <SettingsIcon {...props} />
          }
        }}
      />
    )}
  </ThemeConsumer>
)

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
)
