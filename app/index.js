import React from 'react'
import { AsyncStorage, StatusBar, Platform } from 'react-native'
import {
  LayoutContext,
  ThemeContext,
  SettingsProvider,
  SettingsConsumer,
} from './context'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
import { STORAGE_KEYS, layoutMapping, themeMapping } from './constants'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

export default class App extends React.Component {
  state = {
    layout: null,
    theme: null,
  }

  componentDidMount() {
    this.getInitialSettings()
  }

  getInitialSettings = async () => {
    let [[, layout], [, theme]] = await AsyncStorage.multiGet([
      STORAGE_KEYS.layout,
      STORAGE_KEYS.theme,
    ])
    // console.log(layout, theme)

    layout = this.ensureLayoutCorrect(layout)
    theme = this.ensureThemeCorrect(theme)

    this.setState({
      layout,
      theme,
    })
  }

  ensureLayoutCorrect = layout => {
    if (Object.keys(layoutMapping).includes(layout)) {
      return layout
    } else {
      return Platform.OS === 'android' ? 'drawer' : 'bottom-tab'
    }
  }

  ensureThemeCorrect = theme => {
    if (Object.keys(themeMapping).includes(theme)) {
      return theme
    } else {
      return 'light'
    }
  }

  setLayout = async layout => {
    await AsyncStorage.setItem(STORAGE_KEYS.layout, layout)
    layout = this.ensureLayoutCorrect(layout)
    this.setState({ layout })
  }

  setTheme = async theme => {
    if (this.state.theme === theme) {
      return
    }
    await AsyncStorage.setItem(STORAGE_KEYS.theme, theme)
    theme = this.ensureThemeCorrect(theme)
    this.setState({ theme })
  }

  render() {
    const { layout, theme } = this.state

    if (!layout || !theme) {
      return null
    }

    const { setLayout, setTheme } = this
    const colors = themeMapping[this.state.theme]
    const LayoutContainer = layoutMapping[layout].factory({ colors })

    return (
      <LayoutContext.Provider value={{ layout, setLayout }}>
        <ThemeContext.Provider value={{ theme, setTheme, colors }}>
          <SettingsProvider>
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
            <LayoutContainer />
          </SettingsProvider>
        </ThemeContext.Provider>
      </LayoutContext.Provider>
    )
  }
}
