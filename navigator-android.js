import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TopScreen, LatestScreen } from './list'
import { colors } from './utils'
import DetailScreen from './detail'
import SettingsScreen from './settings'
import { TopIcon, SettingsIcon, LatestIcon } from './icons'

const MenuLeft = ({ navigation }) => (
  <MaterialIcons
    name="menu"
    size={24}
    color={colors.background}
    style={{ paddingLeft: 8 }}
    onPress={() => {
      navigation.openDrawer()
    }}
  />
)

TopScreen.navigationOptions = ({ navigation }) => ({
  title: 'Top News',
  headerLeft: <MenuLeft navigation={navigation} />,
})

LatestScreen.navigationOptions = ({ navigation }) => ({
  title: 'Latest News',
  headerLeft: <MenuLeft navigation={navigation} />,
})

SettingsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Settings',
  headerLeft: <MenuLeft navigation={navigation} />,
})

const TopContainerScreen = createStackNavigator(
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
)

const LatestContainerScreen = createStackNavigator(
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
)

const SettingsContainerScreen = createStackNavigator(
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
)

TopContainerScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => <TopIcon color={tintColor} size={24} />,
}
LatestContainerScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => <LatestIcon color={tintColor} size={24} />,
}
SettingsContainerScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => <SettingsIcon color={tintColor} size={24} />,
}

export const AppNavigator = createDrawerNavigator(
  {
    Top: TopContainerScreen,
    Latest: LatestContainerScreen,
    Settings: SettingsContainerScreen,
  },
  {
    initialRouteName: 'Top',
    contentOptions: {
      activeTintColor: colors.primary,
    },
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
    }),
  },
)
