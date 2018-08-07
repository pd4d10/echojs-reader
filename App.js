import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { Root } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ListScreen from './list'
import { colors } from './utils'
import DetailScreen from './detail'
import SettingsScreen from './settings'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

class TopScreen extends React.Component {
  static navigationOptions = {
    title: 'Top news',
  }
  render() {
    return <ListScreen {...this.props} sort="top" />
  }
}

class LatestScreen extends React.Component {
  static navigationOptions = {
    title: 'Latest news',
  }
  render() {
    return <ListScreen {...this.props} sort="latest" />
  }
}

const AppNavigator = createBottomTabNavigator(
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
    initialRouteName: 'Settings',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const props = {
          color: focused ? tintColor : 'gray',
          size: 24,
        }

        switch (navigation.state.routeName) {
          case 'Top':
            return <MaterialCommunityIcons name="chart-line" {...props} />
          case 'Latest':
            return <Ionicons name="md-time" {...props} />
          case 'Settings':
            return <MaterialIcons name="settings" {...props} />
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
    },
  },
)

export default () => (
  <Root>
    <AppNavigator />
  </Root>
)
