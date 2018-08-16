import React from 'react'
import { Switch } from 'react-native'
import { isAndroid } from '../utils'
import { ThemeConsumer } from '../context'

export default function CustomSwitch({ ...props }) {
  return (
    <ThemeConsumer>
      {({ colors }) => (
        <Switch
          // iOS: border, Android: inactive background
          tintColor={undefined}
          // iOS: background, Android: active background
          onTintColor={
            isAndroid
              ? colors.settings.androidSwitchActiveBackground
              : colors.settings.active
          }
          // Thumb
          thumbTintColor={
            isAndroid && props.value ? colors.settings.active : undefined
          }
          {...props}
        />
      )}
    </ThemeConsumer>
  )
}
