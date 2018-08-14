import React from 'react'
import { View, Text, AsyncStorage, StatusBar, Platform } from 'react-native'
import { Root } from 'native-base'
import NavigatorIos from './navigator-ios'
import NavigatorAndroid from './navigator-android'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
import { MyActivityIndicator } from './utils'

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

const themeMapping = {
  light: {
    primary: undefined,
    border: '#eee',
    background: '#fff',
    primaryText: '#000',
    secondaryText: '#666',
    greyText: '#999',
  },
  echojs: {
    primary: '#af1d1d',
    border: '#eee',
    background: '#fff',
    primaryText: '#000',
    secondaryText: '#666',
    greyText: '#999',
  },
  dark: {
    primary: '#000',
    border: '#555',
    background: '#222',
    primaryText: '#aaa',
    secondaryText: '#666',
    greyText: '#999',
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
    if (theme !== 'light') {
      StatusBar.setBarStyle('light-content')
    }
  }

  setTheme = async theme => {
    await AsyncStorage.setItem(STORAGE_KEYS.theme, theme)
    await this.getTheme()
  }

  render() {
    const { layout, theme } = this.state
    const { setLayout, setTheme } = this
    const colors = themeMapping[theme]

    return layout && theme ? (
      <LayoutContext.Provider value={{ layout, setLayout }}>
        <ThemeContext.Provider value={{ theme, setTheme, colors }}>
          <Root>
            {layout === 'android' ? <NavigatorAndroid /> : <NavigatorIos />}
          </Root>
        </ThemeContext.Provider>
      </LayoutContext.Provider>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <MyActivityIndicator size="large" />
      </View>
    )
  }
}
