import React from 'react'
import { StatusBar, YellowBox } from 'react-native'
import {
  LayoutProvider,
  ThemeProvider,
  SettingsProvider,
  SettingsConsumer,
  LayoutConsumer,
  ThemeConsumer,
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

export default class App extends React.Component {
  render() {
    return (
      <LayoutProvider>
        <ThemeProvider>
          <SettingsProvider>
            <ThemeConsumer>
              {({ colors }) =>
                colors && (
                  <React.Fragment>
                    <SettingsConsumer>
                      {({ isInSafariView }) => (
                        <StatusBar
                          barStyle={
                            isInSafariView
                              ? colors.safari.statusBarStyle
                              : colors.header.statusBarStyle
                          }
                        />
                      )}
                    </SettingsConsumer>

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
                  </React.Fragment>
                )
              }
            </ThemeConsumer>
          </SettingsProvider>
        </ThemeProvider>
      </LayoutProvider>
    )
  }
}
