import React from 'react'
import { createStackNavigator, Header } from 'react-navigation'
import DetailScreen from '../screens/detail'
import ListScreen from '../screens/list'
import Settings from '../screens/settings'
import CustomHeader from '../components/header'

export const TopNavigator = createStackNavigator(
  {
    Top: props => <ListScreen {...props} sort="top" />,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      title: 'Top news',
      header: CustomHeader,
    },
  },
)

export const LatestNavigator = createStackNavigator(
  {
    Top: props => <ListScreen {...props} sort="latest" />,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      title: 'Latest news',
      header: CustomHeader,
    },
  },
)

export const SettingsNavigator = createStackNavigator(
  {
    Settings: Settings,
  },
  {
    navigationOptions: {
      title: 'Settings',
      header: CustomHeader,
    },
  },
)
