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
                      {({ layoutDetail }) =>
                        layoutDetail &&
                        React.createElement(layoutDetail.factory({ colors }))
                      }
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
