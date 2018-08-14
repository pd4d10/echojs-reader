import React from 'react'
import { AsyncStorage, StatusBar, Platform } from 'react-native'
import NavigatorIos from './navigator-ios'
import NavigatorAndroid from './navigator-android'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

const STORAGE_KEYS = {
  auth: 'echojs-auth',
  layout: 'layout',
  theme: 'theme',
}

const layouts = ['android', 'ios']

// undefined means use default value
const themeMapping = {
  light: {
    header: {
      statusBarStyle: 'dark-content',
      text: undefined,
      background: undefined,
    },
    content: {
      title: '#000',
      url: '#999',
      user: '#666',
      border: '#eee',
      background: '#fff',
      icon: '#222',
      loading: '#aaa',
    },
    tab: {
      active: undefined,
      inactive: undefined,
      background: undefined,
    },
    drawer: {
      active: undefined,
      inactive: undefined,
      background: undefined,
    },
  },
  echojs: {
    header: {
      statusBarStyle: 'light-content',
      text: '#fff',
      background: '#af1d1d',
    },
    content: {
      title: '#000',
      url: '#999',
      user: '#666',
      border: '#fee',
      background: '#fff',
      icon: '#222',
      loading: '#af1d1d',
    },
    tab: {
      active: '#af1d1d',
      inactive: undefined,
      background: undefined,
    },
    drawer: {
      active: '#af1d1d',
      inactive: undefined,
      background: undefined,
    },
  },
  dark: {
    header: {
      statusBarStyle: 'light-content',
      text: '#aaa',
      background: '#222',
    },
    content: {
      title: '#00f',
      url: '#aaa',
      user: '#aaa',
      border: '#aaa',
      background: '#222',
      icon: '#aaa',
      loading: '#fff',
    },
    tab: {
      active: '#aaa',
      inactive: '#222',
      background: '#000',
    },
    drawer: {
      active: '#af1d1d',
      inactive: undefined,
      background: undefined,
    },
  },
}

export const LayoutContext = React.createContext()
export const ThemeContext = React.createContext()

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
    if (!layouts.includes(layout)) {
      layout = Platform.OS
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
    const { setLayout, setTheme } = this
    const colors = themeMapping[theme]

    return (
      layout &&
      theme && (
        <LayoutContext.Provider value={{ layout, setLayout }}>
          <ThemeContext.Provider value={{ theme, setTheme, colors }}>
            <StatusBar barStyle={colors.header.statusBarStyle} />
            {layout === 'android' ? <NavigatorAndroid /> : <NavigatorIos />}
          </ThemeContext.Provider>
        </LayoutContext.Provider>
      )
    )
  }
}
