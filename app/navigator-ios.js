import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './navigators'
import { TopIcon, LatestIcon, SettingsIcon } from './components/icons'
import { ThemeContext } from './context'

const CustomBottomTabBar = props => (
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
    Top: TopNavigator,
    Latest: LatestNavigator,
    Settings: SettingsNavigator,
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
    tabBarComponent: CustomBottomTabBar,
  },
)
