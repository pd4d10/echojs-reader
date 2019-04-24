import React from 'react'
import { StatusBar, Platform } from 'react-native'
import {
  LayoutProvider,
  ThemeProvider,
  SettingsProvider,
  ThemeConsumer,
  AuthProvider,
  AuthConsumer,
  LayoutContext,
  SettingsContext,
} from './context'
import {
  BottomTabNavigator,
  DrawerNavigator,
  MaterialBottomTabNavigator,
} from './navigators'

const CustomStatusBar = () => (
  <ThemeConsumer>
    {({ colors }) =>
      colors && (
        <SettingsContext.Consumer>
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
        </SettingsContext.Consumer>
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
        <LayoutContext.Consumer>
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
        </LayoutContext.Consumer>
      )
    }
  </AuthConsumer>
)

// const Navigator = () => {
//   const { isLoaded } = React.useContext(AuthContext)
//   // Make sure user auth is loaded
//   // So all fetch in componentDidMount works correctly
//   if (!isLoaded) return null

//   const { layout } = React.useContext(LayoutContext)

//   switch (layout) {
//     case 'drawer':
//       return <DrawerNavigator />
//     case 'bottom-tab':
//       return <BottomTabNavigator />
//     case 'material-bottom-tab':
//       return <MaterialBottomTabNavigator />
//     default:
//       return null
//   }
//   // console.log(isLoaded, layout)
//   // return isLoaded && layout && <BottomTabNavigator />
// }

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
