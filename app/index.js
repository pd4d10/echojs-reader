import React from 'react'
import { StatusBar, YellowBox, Platform } from 'react-native'
import {
  LayoutProvider,
  ThemeProvider,
  SettingsProvider,
  SettingsConsumer,
  LayoutConsumer,
  ThemeConsumer,
  AuthProvider,
  AuthConsumer,
} from './context'
import {
  BottomTabNavigator,
  DrawerNavigator,
  MaterialBottomTabNavigator,
} from './navigators'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

const CustomStatusBar = () => (
  <ThemeConsumer>
    {({ colors }) =>
      colors && (
        <SettingsConsumer>
          {({ isInSafariView }) => (
            <StatusBar
              barStyle={Platform.select({
                ios: isInSafariView
                  ? colors.safari.statusBarStyle
                  : colors.header.statusBarStyle,
              })}
              backgroundColor={Platform.select({
                android: colors.header.androidBar,
              })}
            />
          )}
        </SettingsConsumer>
      )
    }
  </ThemeConsumer>
)

const Navigator = () => (
  <AuthConsumer>
    {({ isLoaded }) =>
      // Make sure user auth is loaded
      // So all fetch in componentDidMount works correctly
      isLoaded && (
        <LayoutConsumer>
          {({ layout }) => {
            switch (layout) {
              case 'drawer':
                return <DrawerNavigator />
              case 'bottom-tab':
                return <BottomTabNavigator />
              case 'material-bottom-tab':
                return <MaterialBottomTabNavigator />
            }
          }}
        </LayoutConsumer>
      )
    }
  </AuthConsumer>
)

export default class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <LayoutProvider>
          <ThemeProvider>
            <SettingsProvider>
              <CustomStatusBar />
              <Navigator />
            </SettingsProvider>
          </ThemeProvider>
        </LayoutProvider>
      </AuthProvider>
    )
  }
}
