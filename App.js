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
}

const LAYOUTS = ['android', 'ios']

export const ThemeContext = React.createContext()

export default class App extends React.Component {
  state = {
    layout: null,
    theme: 'light',
  }

  componentDidMount() {
    this.getLayout()
    StatusBar.setBarStyle('light-content')
  }

  getLayout = async () => {
    let layout = await AsyncStorage.getItem(STORAGE_KEYS.layout)
    if (!layout) {
      layout = Platform.OS
    }
    this.setState({ layout })
  }

  setLayout = async layout => {
    await AsyncStorage.setItem(STORAGE_KEYS.layout, layout)
    this.setState({ layout })
  }

  render() {
    const { layout } = this.state
    const { setLayout } = this

    return layout ? (
      <ThemeContext.Provider value={{ ...this.state, setLayout }}>
        <Root>
          {layout === 'android' ? <NavigatorAndroid /> : <NavigatorIos />}
        </Root>
      </ThemeContext.Provider>
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
