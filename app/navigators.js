import React from 'react'
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native'
import { createStackNavigator, Header } from 'react-navigation'
import { ThemeContext, LayoutContext } from './context'
import DetailScreen from './screens/detail'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ListScreen from './screens/list'
import Settings from './screens/settings'

export const MyHeader = props => (
  <LayoutContext.Consumer>
    {({ layout }) => (
      <ThemeContext.Consumer>
        {({ colors }) => {
          // HACK: This is a hack to dynamic change header's style
          const { descriptor } = props.scene
          // console.log(descriptor.options)

          let headerLeft
          if (props.scene.index === 0) {
            if (layout === 'android') {
              headerLeft = (
                <MaterialIcons
                  name="menu"
                  size={24}
                  color={colors.header.text}
                  style={{ paddingLeft: 16 }}
                  onPress={() => {
                    descriptor.navigation.openDrawer()
                  }}
                />
              )
            } else {
              headerLeft = null
            }
          } else {
            // Keep headerLeft to undefined so it will use HeaderBackButton
            // https://github.com/react-navigation/react-navigation-stack/blob/master/src/views/Header/Header.js#L202
          }

          descriptor.options = {
            ...descriptor.options,
            headerTintColor: colors.header.text,
            headerStyle: {
              backgroundColor: colors.header.background,
            },
            headerLeft,
          }
          return <Header {...props} />
        }}
      </ThemeContext.Consumer>
    )}
  </LayoutContext.Consumer>
)

export const TopNavigator = createStackNavigator(
  {
    Top: props => <ListScreen {...props} sort="top" />,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      title: 'Top news',
      header: MyHeader,
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
      header: MyHeader,
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
      header: MyHeader,
    },
  },
)
