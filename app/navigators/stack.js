import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DetailScreen from '../screens/detail'
import SettingsScreen from '../screens/settings'
import TopScreen from '../screens/top'
import LatestScreen from '../screens/latest'
import WebViewScreen from '../screens/web'

const createNavigatorFactory = (
  routeConfigMap,
  { title, initialRouteName },
) => ({ colors, hasDrawer }) => {
  return createStackNavigator(routeConfigMap, {
    navigationOptions: ({ navigation }) => ({
      title,
      headerTintColor: colors.header.text,
      headerStyle: {
        backgroundColor: colors.header.background,
      },
      headerLeft:
        hasDrawer && navigation.state.routeName === initialRouteName ? (
          <MaterialIcons
            name="menu"
            size={24}
            color={colors.header.text}
            style={{ paddingLeft: 16 }}
            onPress={() => {
              navigation.openDrawer()
            }}
          />
        ) : (
          undefined
        ),
    }),
  })
}

export const createTopNavigator = createNavigatorFactory(
  {
    Top: TopScreen,
    Detail: DetailScreen,
    WebView: WebViewScreen,
  },
  {
    initialRouteName: 'Top',
    title: 'Top news',
  },
)

export const createLatestNavigator = createNavigatorFactory(
  {
    Latest: LatestScreen,
    Detail: DetailScreen,
    WebView: WebViewScreen,
  },
  {
    initialRouteName: 'Latest',
    title: 'Latest news',
  },
)

export const createSettingsNavigator = createNavigatorFactory(
  {
    Settings: SettingsScreen,
    WebView: WebViewScreen,
  },
  {
    initialRouteName: 'Settings',
    title: 'Settings',
  },
)
