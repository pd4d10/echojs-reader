import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { TopScreen, LatestScreen } from './list'
import { colors } from './utils'
import DetailScreen from './detail'
import SettingsScreen from './settings'
import { TopIcon, LatestIcon, SettingsIcon } from './icons'

export default createBottomTabNavigator(
  {
    Top: createStackNavigator(
      {
        Top: TopScreen,
        Detail: DetailScreen,
      },
      {
        initialRouteName: 'Top',
        navigationOptions: {
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        },
      },
    ),
    Latest: createStackNavigator(
      {
        Latest: LatestScreen,
        Detail: DetailScreen,
      },
      {
        initialRouteName: 'Latest',
        navigationOptions: {
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        },
      },
    ),
    Settings: createStackNavigator(
      { Settings: SettingsScreen },
      {
        initialRouteName: 'Settings',
        navigationOptions: {
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        },
      },
    ),
  },
  {
    initialRouteName: 'Top',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const props = {
          color: focused ? tintColor : 'gray',
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
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
    },
  },
)
