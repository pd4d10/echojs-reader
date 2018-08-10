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

class TopScreenAndroid extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Top News',
    headerLeft: <MenuLeft navigation={navigation} />,
  })

  render() {
    return <TopScreen />
  }
}

class LatestScreenAndroid extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Latest News',
    headerLeft: <MenuLeft navigation={navigation} />,
  })

  render() {
    return <LatestScreen />
  }
}

class SettingsScreenAndroid extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerLeft: <MenuLeft navigation={navigation} />,
  })

  render() {
    return <SettingsScreen />
  }
}

const TopContainerScreen = createStackNavigator(
  {
    Top: TopScreenAndroid,
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
    Latest: LatestScreenAndroid,
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
  { Settings: SettingsScreenAndroid },
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

export default createDrawerNavigator(
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
