import React from 'react'
import { AsyncStorage, Linking, StatusBar, Platform } from 'react-native'
import SafariView from 'react-native-safari-view'
import { LayoutContext, ThemeContext, SettingsContext } from './context'

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
    openInBrowser: false,
  }

  componentDidMount() {
    this.getInitialSettings()
  }

  getInitialSettings = async () => {
    let [
      [, layout],
      [, theme],
      [, openInBrowser],
    ] = await AsyncStorage.multiGet([
      STORAGE_KEYS.layout,
      STORAGE_KEYS.theme,
      STORAGE_KEYS.openInBrowser,
    ])
    console.log(layout, theme, openInBrowser)

    layout = this.ensureLayoutCorrect(layout)
    theme = this.ensureThemeCorrect(theme)
    openInBrowser = this.ensureOpenInBrowserCorrect(openInBrowser)

    this.setState({
      layout,
      theme,
      openInBrowser,
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

  ensureOpenInBrowserCorrect = openInBrowser => {
    return openInBrowser === 'true'
  }

  setLayout = async layout => {
    await AsyncStorage.setItem(STORAGE_KEYS.layout, layout)
    layout = this.ensureLayoutCorrect(layout)
    this.setState({ layout })
  }

  setTheme = async theme => {
    await AsyncStorage.setItem(STORAGE_KEYS.theme, theme)
    theme = this.ensureThemeCorrect(theme)
    this.setState({ theme })
  }

  setOpenInBrowser = async openInBrowser => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.openInBrowser,
      openInBrowser.toString(),
    )
    openInBrowser = this.ensureOpenInBrowserCorrect(openInBrowser)
    this.setState({ openInBrowser })
  }

  openLink = async (url, openInWebView) => {
    if (this.state.openInBrowser) {
      Linking.openURL(url)
    } else {
      try {
        const isAvailable = await SafariView.isAvailable()
        if (!isAvailable) {
          throw new Error('No Safari View')
        }
        SafariView.show({
          url,
          // tintColor: this.props.colors.primary,
          // barTintColor: this.props.colors.content.background,
        })
      } catch (err) {
        openInWebView()
      }
    }
  }

  render() {
    const { layout, theme, openInBrowser } = this.state

    if (!layout || !theme) {
      return null
    }

    const { setLayout, setTheme, setOpenInBrowser, openLink } = this
    const colors = themeMapping[theme]
    const LayoutContainer = layoutMapping[layout].factory({ colors })

    return (
      <LayoutContext.Provider value={{ layout, setLayout }}>
        <ThemeContext.Provider value={{ theme, setTheme, colors }}>
          <SettingsContext.Provider
            value={{ openInBrowser, setOpenInBrowser, openLink }}
          >
            <StatusBar barStyle={colors.header.statusBarStyle} />
            <LayoutContainer />
          </SettingsContext.Provider>
        </ThemeContext.Provider>
      </LayoutContext.Provider>
    )
  }
}
