import React from 'react'
import { Root } from 'native-base'
import { AppNavigator } from './navigator-android'

// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
])

export default () => (
  <Root>
    <AppNavigator />
  </Root>
)
