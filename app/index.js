import React from 'react'
import { AsyncStorage, StatusBar, Platform } from 'react-native'
import { LayoutContext, ThemeContext } from './context'

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
    this.getLayout()
    this.getTheme()
  }

  getLayout = async () => {
    let layout = await AsyncStorage.getItem(STORAGE_KEYS.layout)
    if (!Object.keys(layoutMapping).includes(layout)) {
      layout = Platform.OS === 'android' ? 'drawer' : 'bottom-tab'
    }
    this.setState({ layout })
  }

  setLayout = async layout => {
    await AsyncStorage.setItem(STORAGE_KEYS.layout, layout)
    this.setState({ layout })
  }

  getTheme = async () => {
    let theme = await AsyncStorage.getItem(STORAGE_KEYS.theme)
    if (!Object.keys(themeMapping).includes(theme)) {
      theme = 'light'
    }
    this.setState({ theme })
  }

  setTheme = async theme => {
    await AsyncStorage.setItem(STORAGE_KEYS.theme, theme)
    await this.getTheme()
  }

  render() {
    const { layout, theme } = this.state
    console.log(layout)

    if (!layout || !theme) {
      return null
    }

    const { setLayout, setTheme } = this
    const colors = themeMapping[theme]
    const { component: Layout } = layoutMapping[layout]
    return (
      <LayoutContext.Provider value={{ layout, setLayout }}>
        <ThemeContext.Provider value={{ theme, setTheme, colors }}>
          <StatusBar barStyle={colors.header.statusBarStyle} />
          <Layout />
        </ThemeContext.Provider>
      </LayoutContext.Provider>
    )
  }
}
