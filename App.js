import React from 'react'
import { StyleSheet } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ListScreen from './list'
import { colors } from './utils'
import DetailScreen from './detail'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class TopScreen extends React.Component {
  static navigationOptions = {
    title: 'Top',
  }
  render() {
    return <ListScreen {...this.props} sort="top" />
  }
}

class LatestScreen extends React.Component {
  static navigationOptions = {
    title: 'Latest',
  }
  render() {
    return <ListScreen {...this.props} sort="latest" />
  }
}

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
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const color = focused ? tintColor : 'gray'
        let icon
        if (routeName === 'Top') {
          icon = (
            <MaterialCommunityIcons name="chart-line" size={24} color={color} />
          )
        } else if (routeName === 'Latest') {
          icon = <Ionicons name="md-time" size={24} color={color} />
        }

        return icon
        // // You can return any component that you like here! We usually use an
        // // icon component from react-native-vector-icons
        // return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
    },
  },
)
