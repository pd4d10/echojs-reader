import React from 'react'
import { View, Text, AsyncStorage, Platform } from 'react-native'
import { Root } from 'native-base'
import NavigatorIos from './navigator-ios'
import NavigatorAndroid from './navigator-android'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
import { STORAGE_KEYS } from './utils'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

export default class App extends React.Component {
  state = {
    style: null,
  }

  componentDidMount() {
    this.getStyle()
  }

  getStyle = async () => {
    let style = await AsyncStorage.getItem(STORAGE_KEYS.style)
    if (!style) {
      style = Platform.OS
    }
    this.setState({ style })
  }

  render() {
    const { style } = this.state

    if (!style) {
      return (
        <View>
          <Text>asdb</Text>
        </View>
      )
    }

    return (
      <Root>
        {style === 'android' ? <NavigatorAndroid /> : <NavigatorIos />}
      </Root>
    )
  }
}
