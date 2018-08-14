import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import { TopScreen, LatestScreen } from './list'
import SettingsScreen from './settings'
import { TopIcon, LatestIcon, SettingsIcon } from './icons'
import { ThemeContext } from './App'

const MyTabBar = props => (
  <ThemeContext.Consumer>
    {({ colors }) => (
      <BottomTabBar
        {...props}
        activeTintColor={colors.tab.active}
        inactiveTintColor={colors.tab.inactive}
      />
    )}
  </ThemeContext.Consumer>
)

export default createBottomTabNavigator(
  {
    Top: TopScreen,
    Latest: LatestScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const props = {
          color: focused ? tintColor : 'gray', // TODO:
          size: 24,
        }

        switch (navigation.state.routeName) {
          case 'Top':
            return <TopIcon {...props} />
          case 'Latest':
            return <LatestIcon {...props} />
          case 'Settings':
            return <SettingsIcon {...props} />
        }
      },
    }),
    tabBarComponent: MyTabBar,
  },
)
